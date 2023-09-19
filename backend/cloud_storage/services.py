from .models import Folder, File, CloudStorage


def get_child_folders(folder: Folder):
    """Gets child folders of a given folder"""
    return Folder.objects.filter(parent_folder=folder)


def get_child_files(folder: Folder):
    """Gets child files of a given folder"""
    return File.objects.filter(folder=folder)


def get_root_folders(cloud_storage: CloudStorage):
    """Gets root folders of the storage"""
    return Folder.objects.filter(folder=None, storage=cloud_storage)


def get_root_files(cloud_storage: CloudStorage):
    """Gets files in main directory of the storage"""
    return File.objects.filter(folder=None, storage=cloud_storage)
