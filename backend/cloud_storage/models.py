import os

from django.contrib.auth import get_user_model
from django.db import models
from django_minio_backend import MinioBackend
from mptt.models import TreeForeignKey, MPTTModel

from tools.abstract_models import TimeStampedModel, ShortUUIDModel

User = get_user_model()


class CloudStorage(TimeStampedModel):
    """
    Cloud storage (main root) for every user. Created when the user registers.

    owner (User) - owner of the storage
    used_size - used size in bytes. It will be updated on every File update.

    """

    owner = models.OneToOneField(User, on_delete=models.CASCADE, related_name='cloud_storage')
    used_size = models.IntegerField(verbose_name='Used size in bytes', default=0)

    class Meta:
        ordering = ('updated_at',)

    def __str__(self):
        return f"{self.owner} storage"

    def update_used_size(self):
        """
        Counts used size of the storage and updates it
        """

        self.used_size = sum([file.file.size for file in File.objects.filter(storage=self)])
        self.save()

    def get_root_folders(self):
        """gets the main folders of the storage"""
        return Folder.objects.filter(parent_folder=None, storage=self)

    def get_root_files(self):
        """Gets files in the main directory of the storage"""
        return File.objects.filter(folder=None, storage=self)


class Folder(MPTTModel, ShortUUIDModel, TimeStampedModel):
    """
    Folder model

    title - folder's title
    parent_folder - parent folder can be blank
    storage - CloudStorage
    size - used size in bytes. It will be updated on every File save or delete.
    """

    title = models.CharField(max_length=256)
    parent_folder = TreeForeignKey('self', on_delete=models.CASCADE, blank=True, null=True,
                                   related_name='children')
    storage = models.ForeignKey(CloudStorage, related_name='folders', on_delete=models.CASCADE)
    size = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.level} Folder in {self.storage.owner} storage ({self.id}). Size: {self.size}"

    class MPTTMeta:
        order_insertion_by = ['title']
        parent_attr = 'parent_folder'

    def count_and_update_size(self):
        """Updating folder size."""

        # folder size = files size + child folders size
        self.size = self.__count_child_files_size() + self.__count_child_folders_size()
        self.save()

    def save(self, *args, **kwargs):
        """Overriding save method to recount the size field if the parent_folder is changed"""
        from .tasks import update_folders_size

        # if folder just created we don't need to do anything else
        if self._state.adding:
            super().save(*args, *kwargs)

        # getting old instance of the folder
        old_instance = Folder.objects.get(id=self.id)
        super().save(*args, *kwargs)

        # if parent_folder didn't change, we don't need to change another folder's size, so just don't do anything
        if self.parent_folder == old_instance.parent_folder:
            return

        # if there are two folders, we need to update all ancestors folders until the common one
        if old_instance.parent_folder and self.parent_folder:
            update_folders_size.delay(old_instance.parent_folder.id, self.parent_folder.id)

        # if there is only one folder, we can update only ancestors of the existing folder
        elif old_instance.parent_folder or self.parent_folder:
            update_folders_size.delay(self.parent_folder.id if self.parent_folder else old_instance.parent_folder.id)

    def delete(self, *args, **kwargs):
        from .tasks import update_folders_size

        folder = self.parent_folder
        super().delete(*args, **kwargs)
        update_folders_size.delay()(folder.id)

    def __count_child_folders_size(self) -> int:
        """Counts size of child folders"""
        return sum([folder.size for folder in Folder.objects.filter(parent_folder=self)])

    def __count_child_files_size(self) -> int:
        """counts size of child files"""
        return sum([file.file.size for file in File.objects.filter(folder=self)])


def get_file_path(instance, filename):
    """Gets filepath for a File model. """

    base_url = f"cloud_storage/{instance.storage.owner.username}/"

    if hasattr(instance.folder, 'id'):
        return base_url + f'{instance.folder.id}/{instance.id}'

    # if there is no folder for file, it will be stored in the root directory
    return base_url + instance.id


class File(TimeStampedModel, ShortUUIDModel):
    """File model

    folder - folder where file will be stored
    storage - root folder of the file
    file - field for the file
    """

    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, blank=True, null=True, related_name='files')
    storage = models.ForeignKey(CloudStorage, related_name='files', on_delete=models.CASCADE)
    file = models.FileField(upload_to=get_file_path, storage=MinioBackend(bucket_name=os.environ.get('MINIO_BUCKET')))

    def delete(self, *args, **kwargs):
        from .tasks import update_folders_size

        # deleting file from minio storage
        self.file.delete()

        super(File, self).delete(*args, **kwargs)

        # updating storage size after file delete
        self.storage.update_used_size()
        update_folders_size.delay(folder=self.folder)

    def save(self, *args, **kwargs):
        from .tasks import update_folders_size

        # if an object is just created, we need to update cloud storage used size.
        if self._state.adding:
            self.storage.update_used_size()

            super().save(*args, **kwargs)

            # if there is folder we also need to update all ancestors
            if self.folder:
                update_folders_size.delay(self.folder.id)

            return

        old_instance = File.objects.get(id=self.id)
        super().save(*args, **kwargs)

        # if the folder didn't change, we don't need to change another folder's size, so just don't do anything
        if self.folder == old_instance.folder:
            return

        # if there are two folders, we need to update all ancestors folders until the common one
        if old_instance.folder and self.folder:
            update_folders_size.delay(old_instance.folder.id, self.folder.id)

        # if there is only one folder, we can update only ancestors of the existing folder
        elif old_instance.folder or self.folder:
            update_folders_size.delay(self.folder.id if self.folder else old_instance.folder.id)
