from django.contrib import admin
from .models import User, Attempt, Feedback, ContactInfo

# Register your models here.
admin.site.register(User)
admin.site.register(Attempt)
admin.site.register(Feedback)
admin.site.register(ContactInfo)
