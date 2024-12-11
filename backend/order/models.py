from django.db import models 
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver
from chat.models import Room

User = get_user_model()

class Order(models.Model):
    price = models.FloatField()
    client = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type':'client'}, related_name='client')
    product = models.ForeignKey("product.Product", on_delete=models.CASCADE, null=True, blank=True)
    product_title = models.CharField(max_length=9000, null=True, blank=True)
    seller = models.ForeignKey(User, on_delete=models.CASCADE, limit_choices_to={'user_type': 'seller'}, related_name='seller', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    

@receiver(post_save, sender=Order)
def detect_updated_fields(sender, instance, created,**kwargs):
    if created:  # Ensure this is not a new instance
        # Fetch the original instance from the database
        room = Room.objects.filter(user_id=instance.client.id)
        if room.exists():
            room = room.get()
            room.status = 'Order Created'
            room.save()