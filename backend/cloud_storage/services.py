from .models import Folder


def update_ancestors_size_between_two_folders(folder1: Folder, folder2: Folder):
    """Updates the size of the ancestors between two folders until the common ancestor.
    This is more optimized than just updating each ancestor in the hierarchy.
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
    """Updates the size of all ancestors """
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
