from django.contrib.auth.models import AbstractUser
from django.db import models
from django_minio_backend import MinioBackend

import os


def user_avatar_path(instance, filename):
    return f"user_avatars/{instance.username}/{filename}"


class CustomUser(AbstractUser):
    """Custom User model

    avatar - image of the user
    """

    avatar = models.ImageField(
        verbose_name='User Avatar',
        upload_to=user_avatar_path,
        storage=MinioBackend(bucket_name=os.environ.get('MINIO_BUCKET'))
    )

    def delete(self, *args, **kwargs):
        """
        Delete must be overridden because the inherited delete method does not call `self.image.delete()`.
        """
        self.avatar.delete()
        super(CustomUser, self).delete(*args, **kwargs)
