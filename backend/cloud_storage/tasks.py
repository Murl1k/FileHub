from celery_app import app
from django.db import transaction

from .services import update_ancestors_size_between_two_folders, update_ancestors_folders_size, copy_folder
from .models import Folder


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
        copy_folder(folder_to_copy, parent_folder)
    else:
        copy_folder(folder_to_copy)
