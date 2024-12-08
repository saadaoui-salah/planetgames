from django.contrib import admin
from account.models import CustomUser, Visit, Visitor
from order.models import Order

class UserAdmin(admin.ModelAdmin):
    search_fields = ['full_name', 'phone_number', 'email']
    list_display = ('full_name', 'phone_number', 'email', 'total_orders')  # Add the custom method to the list display
    list_filter = ['user_type']

    
    def total_orders(self, obj):
        return Order.objects.filter(seller=obj).count()
    
    total_orders.short_description = 'Total Orders'

admin.site.register(CustomUser, UserAdmin)
admin.site.register(Visit)
admin.site.register(Visitor)