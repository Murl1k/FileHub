import os

from django.contrib.auth import get_user_model
from django.db import models
from django_minio_backend import MinioBackend

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


class Folder(ShortUUIDModel, TimeStampedModel):
    """
    Folder model

    title - folder's title
    parent_folder - parent folder can be blank
    storage - CloudStorage
    size - used size in bytes. It will be updated on every File creation.
    """

    title = models.CharField(max_length=256)
    parent_folder = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True)
    storage = models.ForeignKey(CloudStorage, related_name='folders', on_delete=models.CASCADE)
    size = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.storage.owner} folder ({self.id})"


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
        # deleting file from minio storage
        self.file.delete()

        super(File, self).delete(*args, **kwargs)

        # updating size fields on Folder and Storage
        self.__update_folder_size()
        self.__update_storage_used_size()

    def save(self, *args, **kwargs):
        is_adding = self._state.adding

        super().save(*args, **kwargs)

        self.__update_folder_size()
        # if object is just created, we need to update cloud storage used size
        if is_adding:
            self.__update_storage_used_size()

    def __update_folder_size(self):
        """
        Counts and updates folder size
        """

        # changing folder size
        if self.folder:
            self.folder.size = self._count_size_in_queryset(File.objects.filter(folder=self.folder))
            self.folder.save()

    def __update_storage_used_size(self):
        """
        Counts size of the storage and updates it
        """
        # changing storage used_size
        self.storage.used_size = self._count_size_in_queryset(File.objects.filter(storage=self.storage))
        self.storage.save()

    @staticmethod
    def _count_size_in_queryset(queryset) -> int:
        """ Counts size of all files in queryset"""
        return sum([file.file.size for file in queryset])
