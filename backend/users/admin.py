from typing import Union

from django.contrib import admin
from django.core.handlers.wsgi import WSGIRequest
from django.db.models import QuerySet

from .models import CustomUser


def delete_everywhere(model_admin: Union[CustomUser], request: WSGIRequest, queryset: QuerySet):
    """
    Delete object both in Django and in MinIO too.
    """
    del model_admin, request  # We don't need these
    for obj in queryset:
        obj.delete()


@admin.register(CustomUser)
class ImageAdmin(admin.ModelAdmin):
    model = CustomUser
    actions = [delete_everywhere, ]
