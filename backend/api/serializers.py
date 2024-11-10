from rest_framework import serializers
from rest_framework.permissions import IsAuthenticated
from .models import PDF , Chat
from django.contrib.auth.models import User

class PDFSerializer(serializers.ModelSerializer):
    """
    This serializer converts PDF model instance to JSON Format and handles the mentioned fields
    This serializer will be used in the API to allow users to view and upload PDFs
    """
    class Meta:
        model = PDF
        #Fields to include in JSON
        fields = ["id", "user", "file", "text", "created_at"]
        permission_classes = [IsAuthenticated]

    def to_internal_value(self, data):

        if 'user' in data:
            data['user'] = int(data['user'])  #convert the user_id from string to int 
        return super().to_internal_value(data)

class ChatSerializer(serializers.ModelSerializer):
    """
    This serializer converts Chat Model instance to JSON format
    This serializer is used to manage chat interactions in the API, allowing users to view past chats
    or submit new questions to Study Buddy.
    """
    class Meta:
        model = Chat
        fields = ["id", "pdf", "question" , "response" , "created_at"]
        permission_classes = [IsAuthenticated]

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password_confirm']

    def validate(self, data):
        if data['password'] != data['password_confirm']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
