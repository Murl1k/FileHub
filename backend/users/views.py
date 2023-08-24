from djoser.views import UserViewSet
from drf_yasg.utils import swagger_auto_schema

from rest_framework.decorators import action
from rest_framework.response import Response

from .services import get_cached_users_count


class CustomUserViewSet(UserViewSet):
    @swagger_auto_schema(operation_description='Counts all users (updates every 60 seconds)')
    @action(detail=False, methods=['get'])
    def users_count(self, request):
        users_count = get_cached_users_count()

        return Response({'users_count': users_count})
