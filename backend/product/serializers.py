from rest_framework import serializers
from .models import Product, Review, Category

class ProductSerializer(serializers.ModelSerializer):
    review_count = serializers.SerializerMethodField()

    def get_review_count(self, obj):
        return Review.objects.filter(product=obj).count()
    
    class Meta:
        model = Product
        fields = ['id', 'image', 'category', 'description', 'created_at', 'media_type', 'price', 'name', 'review_count']


class ReviewSerializer(serializers.ModelSerializer):
    client_name = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['id', 'review', 'stars', 'client_name', 'created_at']

    def get_client_name(self, obj):
        return obj.client.full_name


class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['id', 'name']