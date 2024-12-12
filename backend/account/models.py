from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.contrib.auth import get_user_model


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get('is_superuser') is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = [
        ('admin', 'Admin'),
        ('seller', 'seller'),
        ('client', 'client'),
    ]
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=30, blank=True)
    image = models.FileField(upload_to='users/', null=True, blank=True)
    user_type = models.CharField(max_length=30, choices=USER_TYPE_CHOICES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    phone_number = models.CharField(max_length=50)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.full_name

User = get_user_model()

class Visitor(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)


class Visit(models.Model):
    visitor = models.ForeignKey(Visitor, on_delete=models.CASCADE)
    logged_in = models.BooleanField(default=False)
    path = models.CharField(max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)
    device = models.CharField(max_length=250)
    os = models.CharField(max_length=250)
    browser = models.CharField(max_length=250)
    

