from rest_framework.permissions import BasePermission


class IsStorageOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user == obj.storage.owner:
            return True
        return False
