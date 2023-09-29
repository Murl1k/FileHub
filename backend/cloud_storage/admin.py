from django.contrib import admin
from django_mptt_admin.admin import DjangoMpttAdmin

from .models import CloudStorage, Folder, File

admin.site.register(CloudStorage)
admin.site.register(File)
admin.site.register(Folder, DjangoMpttAdmin)

