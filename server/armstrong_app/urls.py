from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, AttemptViewSet, FeedbackViewSet, ContactInfoViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'attempts', AttemptViewSet)
router.register(r'feedback', FeedbackViewSet)
router.register(r'contact', ContactInfoViewSet)

urlpatterns = [
    path('', include(router.urls)),
]