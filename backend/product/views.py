# views.py
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Review, Category
from .serializers import ProductSerializer, ReviewSerializer, CategorySerializer
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import FilterSet, BaseInFilter

class Pagination(PageNumberPagination):
    page_size = 10  # Default number of products per page
    page_size_query_param = 'page_size'  # Allow clients to modify the page size
    max_page_size = 100  # Maximum limit for page size

class ProductFilter(FilterSet):
    category_id = BaseInFilter(field_name='category_id', lookup_expr='in')

    class Meta:
        model = Product
        fields = ['category_id']


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all().order_by('-id')
    serializer_class = ProductSerializer
    pagination_class = Pagination
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_class = ProductFilter
    ordering_fields = ['price', 'created_at']


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ReviewListView(generics.ListAPIView):
    queryset = Review.objects.all().order_by('-id')
    serializer_class = ReviewSerializer
    pagination_class = Pagination

    def get_queryset(self):
        product_id = self.kwargs.get('product_id')
        if product_id:
            product = get_object_or_404(Product, id=product_id)
            return Review.objects.filter(product=product)
        else:
            return Review.objects.all().order_by('-stars')[:10]
