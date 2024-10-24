from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator
import uuid

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

    
class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)

class CustomUserManager(BaseUserManager):
    def get_queryset(self):
        return super().get_queryset()

    def get_by_natural_key(self, username):
        return self.get(**{self.model.USERNAME_FIELD: username})

    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, **extra_fields)

class User(AbstractUser, TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_('email address'), unique=True)
    contact_validator = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Contact number must be between 9 to 15 digits."
    )
    contact_number = models.CharField(
        _('contact number'),
        max_length=15,
        unique=True,
        validators=[contact_validator]
    )
    address = models.TextField(_('address'), blank=True)
    
    objects = CustomUserManager()
    active_objects = ActiveManager()

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        indexes = [
            models.Index(fields=['username']),
        ]

    def __str__(self):
        return self.username

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}"

    def soft_delete(self):
        self.is_active = False
        self.save()
        self.attempts.update(is_active=False)
        self.feedbacks.update(is_active=False)

class Attempt(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attempts')
    attempted_number = models.IntegerField(_('attempted number'))
    is_armstrong = models.BooleanField(_('is Armstrong number'))
    is_active = models.BooleanField(_('active'), default=True)

    objects = models.Manager()
    active_objects = ActiveManager()

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('attempt')
        verbose_name_plural = _('attempts')
        unique_together = (('user', 'attempted_number'),)

    def __str__(self):
        return f"{self.user.username} - {self.attempted_number} - {'Armstrong' if self.is_armstrong else 'Not Armstrong'}"

class Feedback(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='feedbacks')
    content = models.TextField(_('content'), max_length=500)
    is_active = models.BooleanField(_('active'), default=True)

    objects = models.Manager()
    active_objects = ActiveManager()

    class Meta:
        ordering = ['-created_at']
        verbose_name = _('feedback')
        verbose_name_plural = _('feedbacks')

    def __str__(self):
        return f"Feedback from {self.user.username} at {self.created_at}"

class ContactInfo(TimeStampedModel):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_('email'), unique=True)
    address = models.TextField(_('address'))
    contact_validator = RegexValidator(
        regex=r'^\+?1?\d{9,15}$',
        message="Contact number must be between 9 to 15 digits."
    )
    contact_number = models.CharField(
        _('contact number'),
        max_length=15,
        unique=True,
        validators=[contact_validator]
    )

    class Meta:
        verbose_name = _('contact information')
        verbose_name_plural = _('contact information')

    def __str__(self):
        return "Organization Contact Information"