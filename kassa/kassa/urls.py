
from django.contrib import admin
from django.urls import path, include
import kassaApi.urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',include(kassaApi.urls)),
]
