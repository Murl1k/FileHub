from rest_framework import serializers

from .models import Folder


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Folder
