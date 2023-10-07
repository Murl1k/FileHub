import io
import os
import zipfile

from django_minio_backend import MinioBackend

from .models import Folder, File

FILES_STORAGE = MinioBackend(bucket_name=os.environ.get('MINIO_BUCKET'))


def update_ancestors_size_between_two_folders(folder1: Folder, folder2: Folder):
    """Updates the size of the ancestors between two folders until the common ancestor.
    This is more optimized than just updating each ancestor in the hierarchy.

    This is used when we move folder or file between two folders
    """
    # getting the highest folder (which lvl is lower)
    if folder1.level < folder2.level:
        lowest_folder, highest_folder = folder2, folder1
    else:
        lowest_folder, highest_folder = folder1, folder2

    common_ancestor = find_first_common_ancestor(lowest_folder, highest_folder)

    # updating every folder in the tree from the lowest one until the common ancestor
    while lowest_folder and lowest_folder != common_ancestor:
        lowest_folder.count_and_update_size()
        lowest_folder = lowest_folder.parent_folder

    # if there is no common_ancestor, it means folders don't have the same ancestor, and we need to update
    # the highest folder's ancestors, because the lowest folder ancestors were already updated in the previous cycle
    if not common_ancestor:
        update_ancestors_folders_size(highest_folder)


def update_ancestors_folders_size(folder: Folder):
    """Updates the size of all ancestors

    Used when we create or copy the folder
    """
    ancestors = folder.get_ancestors(include_self=True, ascending=True)

    for folder in ancestors:
        folder.count_and_update_size()


def find_first_common_ancestor(lowest_folder: Folder, highest_folder: Folder):
    """Finds the first common ancestor of two folders. If there is not, it will return None"""
    highest_folder_tree = highest_folder.get_ancestors(include_self=True, ascending=True)
    lowest_folder_tree = lowest_folder.get_ancestors(include_self=True, ascending=True)

    try:
        # getting the intersection of two lists and getting the first element which is the first common parent
        return list(set(lowest_folder_tree) & set(highest_folder_tree))[0]
    except IndexError:
        return None


def clone_folder_files(old_folder: Folder, new_folder: Folder):
    """Clones every file from the old folder to the new one """
    File.objects.bulk_create(
        [
            File(folder=new_folder,
                 storage=new_folder.storage,
                 file=file.file,
                 ) for file in File.objects.filter(folder=old_folder)
        ]
    )


def copy_folder_tree(folder_to_copy: Folder, new_parent_folder: Folder = None, __is_main_folder: bool = True):
    """Recursively copies folder instance with all it descendants such as files and child folders

    folder_to_copy - folder that will be copied with all its descendants
    new_parent_folder - new folder's parent
    __is_main_folder - Boolean to track it the first iteration or not.

    """

    children = folder_to_copy.get_children()
    new_folder = Folder.objects.create(
        title=folder_to_copy.title,
        parent_folder=new_parent_folder,
        storage=new_parent_folder.storage if new_parent_folder else folder_to_copy.storage,
        size=folder_to_copy.size
    )
    clone_folder_files(folder_to_copy, new_folder)

    for child in children:
        copy_folder_tree(child, new_folder, __is_main_folder=False)

    # after all operations, we need to update ancestors and the storage
    if __is_main_folder:
        storage = new_parent_folder.storage if new_parent_folder else folder_to_copy.storage

        update_ancestors_folders_size(folder=new_folder)
        storage.update_used_size()


def change_folder_files_privacy(folder: Folder, is_public: bool):
    """changes privacy of all files in folder"""
    files = File.objects.filter(folder=folder)
    files.update(is_public=is_public)


def change_folder_descendants_privacy(folder: Folder):
    """Changes is_private field for all descendants of the folder includes itself"""

    descendants = folder.get_descendants(include_self=True)
    new_privacy_value = not folder.is_public

    for folder in descendants:
        folder.is_public = new_privacy_value
        change_folder_files_privacy(folder, is_public=new_privacy_value)
        folder.save()


def make_zip_from_folder(folder: Folder) -> bytes:
    """makes zip file for the folder, returns zip file in bytes"""
    zip_buffer = io.BytesIO()

    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as archive:
        add_folder_tree_with_files_into_zip(folder, archive)

    return zip_buffer.getvalue()


def add_folder_tree_with_files_into_zip(folder: Folder, archive: zipfile.ZipFile, path: str = ''):
    """
    Recursive adds folder with all it files and descendants into given archive.

    folder - Folder object
    archive - zip archive zipfile.ZipFile
    path - path in 'folder/folder1/folder2/' format
    """

    children = folder.get_children()
    folder_name = folder.title
    add_files_into_zip(folder, archive, path)

    for child_folder in children:
        add_folder_tree_with_files_into_zip(
            child_folder, archive, path + folder_name + '/'
        )


def add_files_into_zip(folder: Folder, archive: zipfile.ZipFile, path: str):
    """Adds all folder files into given archive"""
    for file in folder.files.all():
        file_name = file.file.name.split('/')[-1]
        minio_file = FILES_STORAGE.open(file.file.name)
        archive.writestr(path + file_name, minio_file.read())
