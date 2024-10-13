from rest_framework import serializers
from .models import User, Attempt, Feedback, ContactInfo

class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'full_name', 'contact_number', 'address']
        extra_kwargs = {'password': {'write_only': True}}

    def get_full_name(self, obj):
        return obj.get_full_name()

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class AttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attempt
        fields = ['id', 'user', 'number', 'is_armstrong', 'timestamp']
        read_only_fields = ['user', 'is_armstrong', 'timestamp']

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ['id', 'user', 'content', 'timestamp']
        read_only_fields = ['user', 'timestamp']

class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ['email', 'address', 'contact_number']