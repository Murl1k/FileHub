from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import File
from .permissions import IsStorageOwner, IsStorageOwnerOrIsFilePublic
from .serializers import FolderSerializer, FolderCreateEditSerializer, FolderCopySerializer, FileSerializer, \
    FileCreateSerializer, FileEditSerializer
from .tasks import copy_folder_task, change_folder_privacy_task


class FolderViewSet(viewsets.ModelViewSet):
    """Folder ViewSet"""
    permission_classes = [IsAuthenticated, IsStorageOwner]

    def get_queryset(self):
        storage = self.request.user.cloud_storage

        if self.action == 'list':
            # getting root folders in the storage
            return storage.get_root_folders()

        return storage.folders

    def list(self, request, *args, **kwargs):
        """Displays folders in the root directory of the storage"""
        return super().list(self, request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action in ('create', 'partial_update', 'update'):
            return FolderCreateEditSerializer
        elif self.action in ('child_files',):
            return FileSerializer
        elif self.action in ('copy', ):
            return FolderCopySerializer

        return FolderSerializer

    @action(detail=True, methods=['get'])
    def child_folders(self, request, pk):
        """Get folder's child folders"""

        folder = self.get_object()
        child_folders = folder.children

        serializer = self.get_serializer_class()(child_folders, many=True)

        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def copy(self, request, pk):
        """Copies folder instance to parent_folder"""

        folder = self.get_object()
        parent_folder_id = request.data.get('parent_folder')

        if parent_folder_id:
            serializer = self.get_serializer_class()(data=request.data, context={'request': self.request})
            serializer.is_valid(raise_exception=True)

        copy_folder_task.delay(folder.id, parent_folder_id)

        return Response(status=status.HTTP_202_ACCEPTED)

    @action(detail=True, methods=['post'])
    def change_privacy(self, request, pk):
        """Changes privacy of the folder and its descendants include files"""

        folder = self.get_object()
        change_folder_privacy_task.delay(folder.id)

        return Response(status=status.HTTP_202_ACCEPTED)


class FileViewSet(viewsets.ModelViewSet):
    """File viewset"""
    permission_classes = [IsAuthenticated, IsStorageOwnerOrIsFilePublic]

    def get_queryset(self):
        cloud_storage = self.request.user.cloud_storage
        queryset = cloud_storage.files

        if self.action != 'list':
            return File.objects.all()

        query_params = self.request.query_params
        folder_id = query_params.get('folder')

        if folder_id:
            return queryset.filter(folder=folder_id)

        return cloud_storage.get_root_files()

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                'folder',
                openapi.IN_QUERY,
                description="The folder id which files you want to get",
                type=openapi.TYPE_STRING,
            ),
        ],
    )
    def list(self, request, *args, **kwargs):
        """Displays files in the root directory of the storage by default"""
        return super().list(self, request, *args, **kwargs)

    def get_serializer_class(self):
        if self.action in ('partial_update', 'update'):
            return FileEditSerializer
        elif self.action in ('create',):
            return FileCreateSerializer

        return FileSerializer
