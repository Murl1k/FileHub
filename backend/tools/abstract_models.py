import shortuuid
from django.db import models


class TimeStampedModel(models.Model):
    """
    Simple abstract django model that has two timestamps field.

    updated_at - time when model was updated
    created_at - time when model was created
    """

    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        abstract = True


class ShortUUIDModel(models.Model):
    """
    Abstract model that has shortuuid field as id

    id - shortuuid.uuid
    """
    id = models.CharField(max_length=22, default=shortuuid.uuid, unique=True, primary_key=True, editable=False)

    class Meta:
        abstract = True
