from django.contrib import admin
from django.urls import path, include
from armstrong_app.views import RegisterView, CustomObtainAuthToken

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('armstrong_app.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', CustomObtainAuthToken.as_view(), name='login'),
]