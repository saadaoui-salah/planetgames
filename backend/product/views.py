# views.py
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Product, Review, Category
from .serializers import ProductSerializer, ReviewSerializer, CategorySerializer
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import FilterSet, BaseInFilter
from rest_framework.exceptions import NotFound
from rest_framework.response import Response

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

    def retrieve(self, request, *args, **kwargs):
        product_id = kwargs.get('id')
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise NotFound("Product not found.")
        serializer = self.get_serializer(product)
        return Response(serializer.data)


class PDPView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_object(self):
        try:
            return super().get_object()
        except Product.DoesNotExist:
            raise NotFound("Product not found.")

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
