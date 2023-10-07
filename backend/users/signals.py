from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

from cloud_storage.models import CloudStorage

User = get_user_model()


@receiver(post_save, sender=User)
def create_cloud_storage(sender, instance, created, **kwargs):
    if created:
        storage, new = CloudStorage.objects.get_or_create(owner=instance)
