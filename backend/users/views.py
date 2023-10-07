from djoser.views import UserViewSet
from drf_yasg.openapi import Schema, TYPE_OBJECT, TYPE_NUMBER
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response

from .services import get_cached_users_count


class CustomUserViewSet(UserViewSet):
    def get_permissions(self):
        if self.action == 'count_all':
            return []
        return super().get_permissions()

    @swagger_auto_schema(operation_description='Counts all users (updates every 60 seconds)',
                         responses={
                             status.HTTP_200_OK: Schema(
                                 type=TYPE_OBJECT,
                                 properties={
                                     'users_count': Schema(type=TYPE_NUMBER)
                                 }
                             )
                         })
    @action(detail=False, methods=['get'])
    def count_all(self, request):
        users_count = get_cached_users_count()

        return Response({'users_count': users_count})
