from django.core.exceptions import ObjectDoesNotExist
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Folder
from .permissions import IsStorageOwner
from .serializers import FolderSerializer, FolderCreateEditSerializer, FileSerializer, FileCreateSerializer, \
    FileEditSerializer


class FolderViewSet(viewsets.ModelViewSet):
    """Folder ViewSet"""
    permission_classes = [IsAuthenticated, IsStorageOwner]

    def get_queryset(self):
        storage = self.request.user.cloud_storage

        if self.action == 'list':
            # getting root folders in the storage
            return storage.get_root_folders()

        return storage.folders

    def get_serializer_class(self):
        if self.action in ('create', 'partial_update', 'update'):
            return FolderCreateEditSerializer
        elif self.action in ('child_files',):
            return FileSerializer

        return FolderSerializer

    @action(detail=True, methods=['get'])
    def child_folders(self, request, pk):
        """Get folder's child folders"""

        folder = self.get_object()
        child_folders = folder.children

        serializer = self.get_serializer_class()(child_folders, many=True)

        return Response(serializer.data)


class FileViewSet(viewsets.ModelViewSet):
    """File viewset"""
    permission_classes = [IsAuthenticated, IsStorageOwner]

    def get_queryset(self):
        cloud_storage = self.request.user.cloud_storage

        if self.action != 'list':
            return cloud_storage.files

        query_params = self.request.query_params
        folder_id = query_params.get('folder')

        if folder_id:
            try:
                folder = Folder.objects.get(id=folder_id)
            except ObjectDoesNotExist:
                raise NotFound(detail='Invalid Folder')

            # Checking if requester user is a folder owner
            if folder.storage.owner != self.request.user:
                raise PermissionDenied(detail='You are not available to watch this folder')

            return folder.files

        return cloud_storage.get_root_files()

    def list(self, request, *args, **kwargs):
        """Displays files in the root directory of the storage by default

        Available query_params: folder
        """
        return super().list(self, request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action in ('partial_update', 'update'):
            return FileEditSerializer
        elif self.action in ('create',):
            return FileCreateSerializer

        return FileSerializer
