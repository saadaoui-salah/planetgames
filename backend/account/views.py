from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from django.db.models.functions import TruncDay
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from core.backend import AccessTokenBackend
from django.views.decorators.csrf import csrf_exempt
from .models import Visit 
from order.models import Order 
from product.models import Category 
from utils import set_cookies
from rest_framework import generics
from django.shortcuts import render
from django.contrib.admin.views.decorators import staff_member_required
from collections import defaultdict



User = get_user_model()

class UpdateSettingsView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [AccessTokenBackend]

    def get(self, request):
        user = User.objects.filter(id=request.user.id)
        if not user.exists():
            return Response({"type": "error", "message": "user not fount"})
        user = user.get()

        data = {
            "full_name": user.full_name,
            "id": user.id,
            "email": user.email,
            "phone_number": user.phone_number,
            "image": user.image.url if user.image else None,
        }
        return Response({"type": "success", "data": data})

    def post(self, request):
        import json
        user = User.objects.filter(id=request.user.id)
        if not user.exists():
            return Response({"type": "error", "message": "User not found"})
        user = user.get()
        image = request.data.get('file')
        data = None
        if image:
            data = json.loads(request.data.get('json_data'))
        else:
            data = request.data
        full_name = data.get('fullName')
        email = data.get('email')
        phone_number = data.get('phoneNumber')
        old_password = data.get('oldPassword')
        new_password = data.get('password')
        password_confermation = data.get('passwordConfermation')
        if len(request.data.keys()) < 0:
            return Response({'type': 'error', 'message': 'No updates found'})
        if full_name:
            user.full_name = full_name
        if email:
            user.email = email
        if phone_number:
            user.phone_number = phone_number
        if image:
            user.image.delete()
            user.image.save(image.name, image)
        if old_password and new_password and password_confermation:
            if not user.check_password(old_password) or new_password != password_confermation:
                return Response({'type': 'error', 'message': 'password not valid'})
            user.set_password(new_password)
        user.save()
        return Response({'type': 'success', 'message': 'Your account information updated successfully'})


class LoginView(APIView):
    @csrf_exempt
    def post(self, request):
        email = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            response_data = {
                "type": "success",
                "full_name": user.full_name,
                "email": user.email,
                "phone_number": user.phone_number,
                "image": user.image.url if user.image else None,
            }
            response = Response(response_data)
            set_cookies(refresh, response)
            return response
        else:
            return Response({"type": 'error', "message": 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class SignupView(APIView):
    @csrf_exempt
    def post(self, request):
        full_name = request.data.get('fullName')
        password = request.data.get('password')
        password_confermation = request.data.get("passwordConfermation")
        email = request.data.get('email')
        phone_number = request.data.get('phoneNumber')

        if not full_name or not phone_number or not password or not email or not password_confermation:
            return Response({"type": 'error', "message": 'Please provide missing fields'})

        if User.objects.filter(email=email).exists():
            return Response({"type": 'error', "message": 'Username is already taken.'})

        if password != password_confermation:
            return Response({"type": "error", "message": "password not match"})

        user = User.objects.create_user(
            user_type="client",
            full_name=full_name,
            password=password,
            email=email,
            is_active=True,
            phone_number=phone_number
        )
        return Response({'type': 'success', 'message': 'User created successfully.'})


@staff_member_required
def admin_chart_view(request):
    visits = Visit.objects.annotate(day=TruncDay('created_at')) \
                          .values('day') \
                          .annotate(unique_visitors=Count('visitor_id', distinct=True)) \
                          .order_by('day')

    order_data = (
            Order.objects
            .values('product__category__name')
            .annotate(order_count=Count('id'))
            .order_by('product__category__name')
        )

    labels = []
    values = []

    # Group the data by month
    monthly_visits = defaultdict(int)
    for visit in visits:
        # Extract the month name
        month_name = visit['day'].strftime('%B')  # This will return 'January', 'February', etc.
        monthly_visits[month_name] += visit['unique_visitors']

    # Populate labels and values from the aggregated data
    for month in ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']:
        labels.append(month)
        values.append(monthly_visits.get(month, 0))  # Use 0 if no data for that month

    # Group the data by month
    category_stats = {}
    for category in Category.objects.all():
        category_stats[category.name] = Order.objects.filter(product__category_id=category.id).count()

        
    # Transform data to a list of dictionaries
    data = {
        'orders':category_stats,
        'visitors':{
                'date': labels,
                'unique_visitors': values
            }
    }
    return render(request, 'admin/charts.html', {'visitors': data['visitors'], 'orders': data['orders']})




@staff_member_required
def admin_chat_view(request):
    return render(request, 'admin/chat.html', {'rooms': []})