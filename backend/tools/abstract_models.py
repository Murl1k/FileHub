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
