from django.contrib.auth import get_user_model
from tools.abstract_models import TimeStampedModel
from django.db import models

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
