from django.db import IntegrityError
from django.http import Http404
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.exceptions import ValidationError 
from django.contrib.auth import get_user_model
from .models import Attempt, Feedback, ContactInfo
from .serializers import UserSerializer, AttemptSerializer, FeedbackSerializer, ContactInfoSerializer
from .utils import format_error_messages, get_integrity_error_message

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.active_objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if not obj.is_active:
            raise Http404("User is inactive.")
        return obj
    
    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        if request.method == 'GET':
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = self.get_serializer(request.user, data=request.data, partial=True)
            try:
                serializer.is_valid(raise_exception=True)
                serializer.save()
                return Response(serializer.data)
            except ValidationError as e:
                return Response({"detail": format_error_messages(e.detail)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['POST'], permission_classes=[permissions.IsAuthenticated])
    def soft_delete(self, request, pk=None):
        user = self.get_object()
        if user == request.user or request.user.is_staff:
            user.soft_delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"detail": "You do not have permission to delete this account."}, status=status.HTTP_403_FORBIDDEN)

class AttemptPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class AttemptViewSet(viewsets.ModelViewSet):
    queryset = Attempt.active_objects.all()
    serializer_class = AttemptSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = AttemptPagination

    def get_queryset(self):
        return Attempt.active_objects.filter(user=self.request.user).order_by('-created_at')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        number = serializer.validated_data['attempted_number']
        #check if attempted number has been attempted before by the user
        existing_attempt = Attempt.active_objects.filter(
            user=request.user,
            attempted_number=number
        ).first()
        
        if existing_attempt:
            return Response(
                self.get_serializer(existing_attempt).data,
                status=status.HTTP_200_OK
            )
        #create a new attempt if not created
        try:
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
                headers=headers
            )
        except IntegrityError as e:
            return Response(
                {"detail": get_integrity_error_message(str(e))},
                status=status.HTTP_400_BAD_REQUEST
            )

    def perform_create(self, serializer):
        is_armstrong = self.is_armstrong_number(serializer.validated_data['attempted_number'])
        serializer.save(user=self.request.user, is_armstrong=is_armstrong)


    @staticmethod
    def is_armstrong_number(num):
        order = len(str(num))
        sum = 0
        temp = num
        while temp > 0:
            digit = temp % 10
            sum += digit ** order
            temp //= 10
        return num == sum

    @action(detail=False, methods=['POST'])
    def check_range(self, request):
        min_range = request.data.get('min_range')
        max_range = request.data.get('max_range')

        if not min_range or not max_range:
            return Response({"detail": "Both min_range and max_range are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            min_range, max_range = int(min_range), int(max_range)
        except ValueError:
            return Response({"detail": "min-range and max-range must be valid integers."}, status=status.HTTP_400_BAD_REQUEST)

        if min_range > max_range:
            return Response({"detail": "min-range must be less than max-range."}, status=status.HTTP_400_BAD_REQUEST)

        if max_range - min_range > 5000000:
            return Response({"detail": "Range too large. Please limit to 5,000,000 numbers at a time."}, status=status.HTTP_400_BAD_REQUEST)

        armstrong_numbers = []
        attempts_to_create = []

        for num in range(min_range, max_range + 1):
            if self.is_armstrong_number(num):
                armstrong_numbers.append(num)
                attempts_to_create.append(Attempt(user=request.user, attempted_number=num, is_armstrong=True))

        Attempt.objects.bulk_create(attempts_to_create, ignore_conflicts=True)

        return Response({
            "min_range": min_range,
            "max_range": max_range,
            "armstrong_numbers": armstrong_numbers,
            "count": len(armstrong_numbers)
        }, status=status.HTTP_200_OK)

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.active_objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"detail": format_error_messages(e.detail)}, status=status.HTTP_400_BAD_REQUEST)

class ContactInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    permission_classes = [permissions.AllowAny]

class CustomObtainAuthToken(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
            response = super().post(request, *args, **kwargs)
            if response.status_code == 200:
                user = User.objects.get(username=request.data.get('username'))
                response.data['user'] = UserSerializer(user).data
            return response
        
class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get('refresh_token')
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
                return Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
            else:
                return Response({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': UserSerializer(user).data,
                'tokens': {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
            }, status=status.HTTP_201_CREATED)
        except ValidationError as e:
            return Response({"detail": format_error_messages(e.detail)}, status=status.HTTP_400_BAD_REQUEST)
        except IntegrityError as e:
            return Response({"detail": get_integrity_error_message(str(e))}, status=status.HTTP_409_CONFLICT)
        except Exception as e:
            return Response({"detail": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)