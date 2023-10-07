from celery_app import app
from django.db import transaction

from .services import update_ancestors_size_between_two_folders, update_ancestors_folders_size, copy_folder_tree, \
    change_folder_descendants_privacy, make_zip_from_folder
from .models import Folder, File


@app.task()
@transaction.atomic
def update_folders_size_task(folder1_id: str, folder2_id: str = None):
    """This task is used to update the size of all used folders in the hierarchy"""
    if not folder1_id or not folder2_id:
        folder = Folder.objects.get(id=folder1_id or folder2_id)
        update_ancestors_folders_size(folder)

        return

    folder1 = Folder.objects.get(id=folder1_id)
    folder2 = Folder.objects.get(id=folder2_id)

    update_ancestors_size_between_two_folders(folder1, folder2)


@app.task()
@transaction.atomic
def copy_folder_task(folder_to_copy_id: str, parent_folder_id: str = None):
    """Used to copy folder """

    folder_to_copy = Folder.objects.get(id=folder_to_copy_id)

    if parent_folder_id:
        parent_folder = Folder.objects.get(id=parent_folder_id)
        copy_folder_tree(folder_to_copy, parent_folder)
    else:
        copy_folder_tree(folder_to_copy)


@app.task()
@transaction.atomic
def change_folder_privacy_task(folder_id: str):
    """changes privacy for all folders descendants"""
    folder = Folder.objects.get(id=folder_id)
    change_folder_descendants_privacy(folder)


@app.task()
def get_zip_from_folder_task(folder_id: str):
    """makes zip archive from folder"""
    folder = Folder.objects.get(id=folder_id)
    return make_zip_from_folder(folder)


@app.task()
@transaction.atomic
def copy_file_task(file_id: str, new_folder_id: str):
    """copies file into given folder"""
    file = File.objects.get(id=file_id)

    if new_folder_id:
        folder = Folder.objects.get(id=new_folder_id)
    else:
        folder = file.folder

    copied_file = File(folder=folder, file=file.file, storage=file.storage)
    copied_file.save()

