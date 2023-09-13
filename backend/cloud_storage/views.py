from rest_framework import viewsets

from .models import Folder
from .serializers import FolderSerializer, FolderCreateSerializer


class FolderViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        return Folder.objects.filter(storage__owner=self.request.user)

    def get_serializer_class(self):
        if self.action in ('create',):
            return FolderCreateSerializer

        return FolderSerializer
