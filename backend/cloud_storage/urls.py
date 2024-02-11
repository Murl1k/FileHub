from rest_framework.routers import DefaultRouter
from django.urls import path

from . import views

router = DefaultRouter()
router.register('folders', views.FolderViewSet, basename='folders')
router.register('files', views.FileViewSet, basename='files')

urlpatterns = [
    path('info', views.CloudStorageInfo.as_view())
              ] + router.urls
