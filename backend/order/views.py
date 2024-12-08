# views.py
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer
from rest_framework.pagination import PageNumberPagination


class OrderPagination(PageNumberPagination):
    page_size = 10  # Number of orders per page
    page_size_query_param = 'page_size'  # Allow clients to specify a custom page size
    max_page_size = 100  # Maximum number of orders per page

class OrderListView(generics.ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = OrderPagination  # Set the pagination class

    def get_queryset(self):
        user = self.request.user
        return Order.objects.filter(client=user)
