from django.contrib.auth import get_user_model
from django.db import models

from tools.abstract_models import TimeStampedModel, ShortUUIDModel

User = get_user_model()


class CloudStorage(TimeStampedModel):
    """
    Cloud storage (main root) for every user. Created when the user registers.

    owner (User) - owner of the storage
    used_size - used size in bytes. It will be updated on every File creation.

    """

    owner = models.OneToOneField(User, on_delete=models.CASCADE)
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
