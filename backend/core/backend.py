from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from datetime import datetime

User = get_user_model()


class AccessTokenBackend(JWTAuthentication):
    def authenticate(self, request):
        token = request.COOKIES.get('pg_access','')
        timestamp = request.COOKIES.get('pg_exp','')
        refresh = request.COOKIES.get('pg_refresh','')
        try:
            exp = datetime.fromtimestamp(int(timestamp))
            if not refresh or not token:
                return (None, None)
                
            if exp > datetime.now() and token:
                decoded_token = self.get_validated_token(token)
                user = self.get_user(decoded_token)
                request.user = user
                return (user, None)
            
        except :
            try:
                refresh = RefreshToken(refresh)
                user_id = refresh.payload['user_id']
                user = User.objects.filter(id=user_id).get()
                request.user = user
                return (user, refresh)
            except:
                return (None, None)
        return (None, None)
