from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import Folder
from .permissions import IsStorageOwner
from .serializers import FolderSerializer, FolderCreateEditSerializer


class FolderViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsStorageOwner]

    def get_queryset(self):
        return Folder.objects.filter(storage__owner=self.request.user)

    def get_serializer_class(self):
        if self.action in ('create', 'partial_update', 'update'):
            return FolderCreateEditSerializer
        return FolderSerializer
