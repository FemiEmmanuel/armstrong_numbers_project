from django.contrib import admin
from django.urls import path, include
from armstrong_app.views import RegisterView, LogoutView, CustomObtainAuthToken
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('armstrong_app.urls')),
    path('api/login/', CustomObtainAuthToken.as_view(), name='token_obtain_pair'),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', RegisterView.as_view(), name='register'),
]