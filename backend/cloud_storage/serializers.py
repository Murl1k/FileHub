from rest_framework import serializers

from .models import Folder, CloudStorage


class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('id', 'created_at', 'updated_at', 'title', 'size', 'parent_folder')
        model = Folder


class FolderCreateEditSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('title', 'parent_folder')
        model = Folder

    def validate_parent_folder(self, value):
        request = self.get_request_obj()

        if value is None:
            return value

        # Checking if the user is the storage owner
        if request.user != value.storage.owner:
            raise serializers.ValidationError("You can't use other people's folders")

        return value

    def create(self, validated_data):
        request = self.get_request_obj()
        storage = CloudStorage.objects.get(owner=request.user)

        validated_data['storage'] = storage

        return Folder.objects.create(**validated_data)

    def to_representation(self, instance):
        return FolderSerializer(instance, context=self.context).data

    def get_request_obj(self):
        return self.context.get('request')
