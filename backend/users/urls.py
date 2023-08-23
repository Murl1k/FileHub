from rest_framework.routers import DefaultRouter
from djoser import views

app_name = 'users'

router = DefaultRouter()
router.register('', views.UserViewSet)


urlpatterns = [

] + router.urls

