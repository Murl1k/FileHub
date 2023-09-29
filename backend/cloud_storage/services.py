from mptt.utils import get_cached_trees

from .models import Folder


def update_ancestors_size_between_two_folders(folder1: Folder, folder2: Folder):
    """Updates size of all ancestors between two folders"""
    # getting the highest folder (which lvl is lower)
    if folder1.level < folder2.level:
        lowest_folder, highest_folder = folder2, folder1
    else:
        lowest_folder, highest_folder = folder1, folder2

    common_parent = find_common_parent(lowest_folder, highest_folder)

    # updating every folder in the tree from the lowest one to the common parent
    while lowest_folder:
        lowest_folder.count_and_update_size()
        lowest_folder = lowest_folder.parent_folder

        if lowest_folder == common_parent:
            break


def update_ancestors_folders_size(folder: Folder):
    """Updates the size of all ancestors """
    while folder:
        folder.count_and_update_size()
        folder = folder.parent_folder


def find_common_parent(lowest_folder: Folder, highest_folder: Folder):
    """Finds first common parent of two folders. If there is not, it will return None"""
    tree = get_cached_trees((highest_folder, lowest_folder))

    if not tree:
        return None

    common_ancestor = tree[0]

    return common_ancestor
