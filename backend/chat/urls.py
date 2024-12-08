from django.urls import path, re_path

urlpatterns = [
]
from .consumers import ChatConsumer, RoomConsumer

websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<user_id>\w+)/$', ChatConsumer.as_asgi()),
    path('ws/rooms/', RoomConsumer.as_asgi()),
]