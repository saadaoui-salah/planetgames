import jmespath
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message, Room
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async
from django.db.models import Q

User = get_user_model() 

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = 'chat_%s' % self.room_name
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        messages = await sync_to_async(self.list_messages)(self.room_name)
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_messages',
                'messages': messages,
            }
        )
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)
        room = await sync_to_async(self.get_room)(data.get('sender') or data.get('reciever'))
        data['room_id'] = room.id
        data = await sync_to_async(self.save_message)(data)
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'data': data

            }
        )

    def save_message(self, data):
        if data.get('sender'):
            msg = Message.objects.create(
                message=data['msg'],
                room_id=data['room_id'],
                sender_id=data['sender']
            )
            msg.room.status = 'New Message'
        else:
            msg = Message.objects.create(
                message=data['msg'],
                room_id=data['room_id'],
                reciever_id=data['reciever']
            )
        msg.room.save()
        msg.save()
        return {'message': msg.message, 'id': msg.id, 'sender_id': msg.sender.id if msg.sender else None, 'reciever_id': msg.reciever.id if msg.reciever else None}
    
    def list_messages(self, user_id):
        try:
            messages = Message.objects.filter(Q(sender_id=user_id) | Q(reciever_id=user_id)).order_by('created_at')
            room = Room.objects.filter(user_id=user_id).get()
            if room.status == 'New Message':
                room.status = 'In progress' 
            if messages.exists():
                return list(messages.values('id','message', 'sender_id', 'reciever_id'))
            return []
        except:
            return []

    def get_room(self, room_id):
        room = Room.objects.filter(
            user_id=room_id
        )
        if room.exists():
            return room.get()
        else:
            room = Room.objects.create(
                user_id=self.room_name
            )
            room.save()
            return room

    # Receive message from room group
    async def chat_message(self, event):
        data = event['data']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'data': data
        }))
    
    async def chat_messages(self, event):
        message = event['messages']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'messages': message
        }))


class RoomConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = 'rooms'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        rooms = await sync_to_async(self.list_rooms)()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_rooms',
                'rooms': rooms,
            }
        )
        await self.accept()

    async def receive(self, text_data):
        data = json.loads(text_data)
        await sync_to_async(self.update_room)(data)
        
    def update_room(self, data):
        room  = Room.objects.filter(user_id=data['user_id']).get()
        if room.status == 'New Message':
            room.status = 'In progress'
        room.save()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    def list_rooms(self):
        rooms = Room.objects.all()
        rooms = list(rooms.values('id', 'status', 'user__full_name', 'user_id'))
        return rooms

    async def chat_rooms(self, event):
        rooms = event['rooms']
        await self.send(text_data=json.dumps({
            'rooms': rooms
        }))
    
    async def room_message(self, event):
        data = event['data']
        await self.send(text_data=json.dumps({
            'data': data
        }))