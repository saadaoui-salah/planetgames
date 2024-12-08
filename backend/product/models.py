from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=300)

class Product(models.Model):
    image = models.FileField(upload_to="products/")
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    media_type = models.CharField(max_length=300)
    price = models.FloatField()

class Review(models.Model):
    STARS_CHOICES = [
        (1,1),
        (2,2),
        (3,3),
        (4,4),
        (5,5),
    ]

    review = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    stars = models.IntegerField(choices=STARS_CHOICES)
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)