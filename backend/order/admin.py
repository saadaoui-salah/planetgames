from django.contrib import admin
from order.models import Order

class OrderAdmin(admin.ModelAdmin):
    search_fields = [
        'client__full_name', 
        'seller__full_name', 
        'seller__phone_number', 
        'client__phone_number', 
        'price', 
        'category__name'
    ]
    list_display = ['id', 'client__full_name', 'seller__full_name', 'price', 'product__name']
    exclude = ('seller',)
    def save_model(self, request, obj, form, change):
        # Set the seller field to the logged-in user
        if not obj.pk:  # Only set seller for new objects
            obj.seller = request.user
        super().save_model(request, obj, form, change)

admin.site.register(Order, OrderAdmin)