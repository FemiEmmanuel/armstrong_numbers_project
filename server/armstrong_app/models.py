from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    email = models.EmailField(unique=True)
    contact_number = models.CharField(max_length=15)
    address = models.TextField(blank=True)

    def __str__(self):
        return self.username
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

class Attempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attempts')
    number = models.IntegerField()
    is_armstrong = models.BooleanField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.number} - {'Armstrong' if self.is_armstrong else 'Not Armstrong'}"

class Feedback(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='feedbacks')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback from {self.user.username} at {self.timestamp}"

class ContactInfo(models.Model):
    email = models.EmailField()
    address = models.TextField()
    contact_number = models.CharField(max_length=15)

    def __str__(self):
        return "Organization Contact Information"