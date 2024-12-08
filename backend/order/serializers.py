from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    
    def get_product(self, obj):
        return obj.product.name

    def get_category(self, obj):
        return obj.product.category.name

    class Meta:
        model = Order
        fields = ['id', 'price', 'product', 'category']