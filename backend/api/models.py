from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class PDF(models.Model):
    """
    Model to store the pdfs uploaded for chat interactions

    Attributes:
    user(ForeignKey): User who uploaded the pdf
    file(FileField) : The uploaded pdf
    text(TextField) : Text extracted from the pdf
    created_at(DateTimeField) : Timestamp when the pdf was uploaded
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE , related_name="pdfs")
    file = models.FileField(upload_to="pdfs/")
    text=  models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
    
    def __str__(self):
        return f"{self.file}-{self.user.username}"
    
class Chat(models.Model):
    """
    Models to store chat interactions related to the uploaded PDFs
    
    Attributes: 
    pdf(ForeignKey) : The pdf this chat is associated with
    question(TextField) : The user's question regarding this pdf
    response(TextField) : Study Buddy's response to this question
    created_at(DateTimeField) : Timestamp when chat was created  
    """
    pdf = models.ForeignKey(PDF, on_delete=models.CASCADE , related_name = "chats")
    question = models.TextField()
    response = models.TextField()
    created_at =models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
    
    def __str__(self):
        return f"Chat on {self.pdf.file.name} - {self.question[:30]}..."
    
