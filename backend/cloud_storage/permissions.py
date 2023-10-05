from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsStorageOwner(BasePermission):
    """Checks if the user is the storage owner"""

    def has_object_permission(self, request, view, obj):
        if request.user == obj.storage.owner:
            return True
        return False


class IsStorageOwnerOrIsObjectPublic(IsStorageOwner):
    """Checks if the user is the storage owner or the file is public"""

    def has_object_permission(self, request, view, obj):
        # allowing object reading if it's the public object
        if request.method in SAFE_METHODS:
            return obj.is_public

        return super().has_object_permission(request, view, obj)
