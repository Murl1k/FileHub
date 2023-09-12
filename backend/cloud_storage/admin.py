from django.contrib import admin
from .models import CloudStorage, Folder, File

admin.site.register(CloudStorage)
admin.site.register(Folder)
admin.site.register(File)
