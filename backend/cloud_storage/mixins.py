from rest_framework.exceptions import PermissionDenied


class ValidateFolderSerializerMixin:
    """Mixin validates folder in serializer"""
    def validate_folder(self, value):
        request = self.get_request_obj()

        if value is None:
            return value

        # Checking if the user is the folder's storage owner
        if request.user != value.storage.owner:
            raise PermissionDenied("You can't use other people's folders")

        return value

    def get_request_obj(self):
        return self.context.get('request')
