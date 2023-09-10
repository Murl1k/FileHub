from django.contrib import admin
from .models import CloudStorage, Folder

# Register your models here.
admin.site.register(CloudStorage)
admin.site.register(Folder)
