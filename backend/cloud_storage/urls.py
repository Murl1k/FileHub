from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register('folders', views.FolderViewSet, basename='folders')
router.register('files', views.FileViewSet, basename='files')

urlpatterns = [

              ] + router.urls
