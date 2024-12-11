from django.urls import path, re_path
from .views import ProductListView, CategoryListView, PDPView


urlpatterns = [
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('', ProductListView.as_view(), name='product-list'),
    path('<int:pk>/', PDPView.as_view(), name='product-detail'),
]
