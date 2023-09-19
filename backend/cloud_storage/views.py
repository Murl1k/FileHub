from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .permissions import IsStorageOwner
from .serializers import FolderSerializer, FolderCreateEditSerializer, FileSerializer
from .services import get_child_folders, get_child_files, get_root_folders


class FolderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsStorageOwner]

    def get_queryset(self):
        # getting root folders in the storage
        storage = self.request.user.cloud_storage
        return get_root_folders(storage)

    def get_serializer_class(self):
        if self.action in ('create', 'partial_update', 'update'):
            return FolderCreateEditSerializer
        elif self.action in ('child_files',):
            return FileSerializer

        return FolderSerializer

    @action(detail=True, methods=['get'])
    def child_folders(self, request, pk):
        """Get folder's child items (folders, files)"""

        folder = self.get_object()
        child_folders = get_child_folders(folder)

        serializer = self.get_serializer_class()(child_folders, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def child_files(self, request, pk):
        """Get files in this folder"""

        folder = self.get_object()
        child_files = get_child_files(folder)

        serializer = self.get_serializer_class()(child_files, many=True)

        return Response(serializer.data)
