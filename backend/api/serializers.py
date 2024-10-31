from rest_framework import serializers
from .models import PDF , Chat

class PDFSerializer(serializers.ModelSerializer):
    """
    This serializer converts PDF model instance to JSON Format and handles the mentioned fields
    This serializer will be used in the API to allow users to view and upload PDFs
    """
    class Meta:
        model = PDF
        #Fields to include in JSON
        fields = ["id", "user", "file", "text", "created_at"]

class ChatSerializer(serializers.ModelSerializer):
    """
    This serializer converts Chat Model instance to JSON format
    This serializer is used to manage chat interactions in the API, allowing users to view past chats
    or submit new questions to Study Buddy.
    """
    class Meta:
        model = Chat
        #Fields to Include in JSON
        fields = ["id", "pdf", "question" , "response" , "created_at"]

