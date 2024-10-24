from rest_framework import serializers
from .models import User, Attempt, Feedback, ContactInfo

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'full_name', 'contact_number', 'address', 'is_active', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def get_full_name(self, obj):
        return obj.get_full_name()

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User.objects.create_user(
            password=password,
            **validated_data
        )
        return user

class AttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attempt
        fields = ['id', 'user', 'attempted_number', 'is_armstrong', 'created_at', 'is_active']
        read_only_fields = ['user', 'is_armstrong', 'created_at', 'is_active']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'user', 'content', 'created_at', 'is_active']
        read_only_fields = ['user', 'created_at', 'is_active']

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['id', 'email', 'address', 'contact_number']