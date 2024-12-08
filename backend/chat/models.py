from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_save
from django.dispatch import receiver
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
User = get_user_model()

class Room(models.Model):
    STATUS_CHOICES = [
        ('New Message', 'New Message'),
        ('Order Created', 'Order Created'),
        ('In progress', 'In progress'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_2', null=True)
    status = models.CharField(max_length=200, choices=STATUS_CHOICES)

    
class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    message = models.TextField()
    reciever = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='reciever', null=True)
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, related_name='sender', null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    seen = models.BooleanField(default=False)



@receiver(pre_save, sender=Room)
def detect_updated_fields(sender, instance, **kwargs):
    if instance.pk:  # Ensure this is not a new instance
        # Fetch the original instance from the database
        original = Room.objects.get(pk=instance.pk)

        original_value = getattr(original, 'status')
        new_value = getattr(instance, 'status')

        if original_value != new_value:
            channel_layer = get_channel_layer()
            # Extract data from kwargs
            # Send the message to the group
            async_to_sync(channel_layer.group_send)(
                'rooms',
                {
                    "type": "room_message",
                    "data": {
                        "id":instance.id,
                        "status": instance.status,
                        "user__full_name": instance.user.full_name,
                    }
                },
            )