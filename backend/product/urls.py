from django.urls import path, re_path
from .views import ProductListView, ReviewListView, CategoryListView


urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('', ProductListView.as_view(), name='product-list'),
    re_path(r'^(?:(?P<product_id>\d+)/)?reviews/$', ReviewListView.as_view(), name='product-review-list'),
]
