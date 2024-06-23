from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import *

router = DefaultRouter()
router.register(r'productlist', ProductViewSet, basename='productlist')
router.register(r'categories', CategoryViewSet, basename='categories')


urlpatterns = [
    path('', index),
    path('api/v1/', include(router.urls)),
    path('api/v1/check_post', CheckPost.as_view())

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)