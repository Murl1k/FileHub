from rest_framework import serializers

from .models import Folder, CloudStorage, File
from .mixins import ValidateFolderSerializerMixin


class FileCharacteristicsSerializer(serializers.Serializer):
    """Characteristics for FileField"""
    name = serializers.SerializerMethodField()
    size = serializers.IntegerField()
    path = serializers.CharField(source='file.name')
    url = serializers.CharField()

    def get_name(self, instance):
        # getting file name because the default one looks like "folder/inner_folder/file.exe"
        return instance.name.split('/')[-1]


class FileSerializer(serializers.ModelSerializer, ValidateFolderSerializerMixin):
    file = FileCharacteristicsSerializer(read_only=True)

    class Meta:
        fields = ('id', 'folder', 'file', 'created_at', 'updated_at')
        model = File


class FileCreateSerializer(serializers.ModelSerializer, ValidateFolderSerializerMixin):
    class Meta:
        fields = ('folder', 'file')
        model = File

    def create(self, validated_data):
        request = self.get_request_obj()
        storage, created = CloudStorage.objects.get_or_create(owner=request.user)

        validated_data['storage'] = storage

        return File.objects.create(**validated_data)

    def to_representation(self, instance):
        return FileSerializer(instance, context=self.context).data


class FileEditSerializer(serializers.ModelSerializer, ValidateFolderSerializerMixin):
    class Meta:
        fields = ('folder',)
        model = File

    def update(self, instance, validated_data):
        old_folder = instance.folder
        new_instance = super().update(instance, validated_data)

        # updating old folder size
        if old_folder:
            old_folder.update_size()

        return new_instance

    def to_representation(self, instance):
        return FileSerializer(instance, context=self.context).data


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'created_at', 'updated_at', 'title', 'size', 'parent_folder')
        model = Folder


class FolderCreateEditSerializer(serializers.ModelSerializer, ValidateFolderSerializerMixin):
    class Meta:
        fields = ('title', 'parent_folder')
        model = Folder

    def validate_parent_folder(self, value):
        return self.validate_folder(value)

    def create(self, validated_data):
        request = self.get_request_obj()
        storage, created = CloudStorage.objects.get_or_create(owner=request.user)

        validated_data['storage'] = storage

        return Folder.objects.create(**validated_data)

    def to_representation(self, instance):
        return FolderSerializer(instance, context=self.context).data
