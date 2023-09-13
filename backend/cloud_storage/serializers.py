from rest_framework import serializers

from .models import Folder


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'created_at', 'updated_at', 'title', 'size', 'parent_folder')
        model = Folder


class FolderCreateSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('title', 'parent_folder', 'storage')
        model = Folder

    def to_representation(self, instance):
        return FolderSerializer(instance, context=self.context).data
