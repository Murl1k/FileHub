from rest_framework.permissions import BasePermission


class IsStorageOwner(BasePermission):
    """Checks if the user is the storage owner"""

    def has_object_permission(self, request, view, obj):
        if request.user == obj.storage.owner:
            return True
        return False


class IsStorageOwnerOrIsFilePublic(IsStorageOwner):
    """Checks if the user is the storage owner or the file is public"""
    def has_object_permission(self, request, view, obj):
        return super().has_object_permission(request, view, obj) or obj.is_public
