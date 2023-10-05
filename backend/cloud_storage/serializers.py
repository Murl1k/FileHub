from rest_framework import serializers

from .mixins import ValidateFolderSerializerMixin
from .models import Folder, CloudStorage, File


class FileSerializer(serializers.ModelSerializer, ValidateFolderSerializerMixin):
    name = serializers.SerializerMethodField()
    size = serializers.IntegerField(source='file.size')
    url = serializers.CharField(source='file.url')

    class Meta:
        fields = ('id', 'folder', 'size', 'name', 'url', 'created_at', 'updated_at', 'is_public')
        model = File

    def get_name(self, instance):
        # getting file name because the default one looks like "folder/inner_folder/file.exe"
        return instance.file.name.split('/')[-1]


class FileCreateSerializer(serializers.ModelSerializer, ValidateFolderSerializerMixin):
    class Meta:
        fields = ('folder', 'file', 'is_public')
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
        fields = ('folder', 'is_public')
        model = File

    def to_representation(self, instance):
        return FileSerializer(instance, context=self.context).data


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'created_at', 'updated_at', 'title', 'size', 'parent_folder', 'is_public')
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


class FolderCopySerializer(serializers.ModelSerializer, ValidateFolderSerializerMixin):
    class Meta:
        fields = ('parent_folder', )
        model = Folder

    def validate_parent_folder(self, value):
        return self.validate_folder(value)
