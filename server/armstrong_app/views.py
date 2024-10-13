from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from django.contrib.auth import get_user_model
from .models import Attempt, Feedback, ContactInfo
from .serializers import UserSerializer, AttemptSerializer, FeedbackSerializer, ContactInfoSerializer

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['GET', 'PUT'], permission_classes=[permissions.IsAuthenticated])
    def me(self, request):
        if request.method == 'GET':
            serializer = self.get_serializer(request.user)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer = self.get_serializer(request.user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response({'error': 'Invalid data provided', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class AttemptViewSet(viewsets.ModelViewSet):
    queryset = Attempt.objects.all()
    serializer_class = AttemptSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Attempt.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        number = serializer.validated_data['number']
        is_armstrong = self.is_armstrong_number(number)
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
            return Response({"error": "Both min_range and max_range are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            min_range, max_range = int(min_range), int(max_range)
        except ValueError:
            return Response({"error": "min_range and max_range must be valid integers."}, status=status.HTTP_400_BAD_REQUEST)

        if min_range > max_range:
            return Response({"error": "min_range must be less than or equal to max_range."}, status=status.HTTP_400_BAD_REQUEST)

        armstrong_numbers = []
        for num in range(min_range, max_range + 1):
            if self.is_armstrong_number(num):
                armstrong_numbers.append(num)
                Attempt.objects.create(user=request.user, number=num, is_armstrong=True)
        
        return Response({"armstrong_numbers": armstrong_numbers, "count": len(armstrong_numbers)})

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'error': 'Invalid feedback data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ContactInfoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer
    permission_classes = [permissions.AllowAny]

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]  # Allow any user to register

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)
        return Response({'error': 'Invalid registration data', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            })
        return Response({'error': 'Invalid credentials', 'details': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)