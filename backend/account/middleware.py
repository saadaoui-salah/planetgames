from django.contrib.auth import get_user_model
import json
from core.backend import AccessTokenBackend
from account.models import Visit, Visitor
from utils import set_cookies
from urllib.parse import urlparse
from user_agents import parse

class TokenToUserMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if 'admin' in request.path:
            return self.get_response(request)
        refresh = False
        user, refresh = AccessTokenBackend().authenticate(request)

        try:
            if request.body:
                request.data = json.loads(request.body)
        except:
            pass
        
        response = self.get_response(request)
        if refresh:
            set_cookies(refresh,response)


        referer = request.META.get('HTTP_REFERER')
        user_agent = request.META.get('HTTP_USER_AGENT', 'Unknown')
        user_agent_parsed = parse(user_agent)
        
        browser = user_agent_parsed.browser.family  # e.g., 'Chrome', 'Safari'
        browser_version = user_agent_parsed.browser.version_string
        if user_agent_parsed.is_mobile:
            device_type = 'Mobile'
        elif user_agent_parsed.is_tablet:
            device_type = 'Tablet'
        elif user_agent_parsed.is_pc:
            device_type = 'PC'
        else:
            device_type = 'Other'

        os_name = user_agent_parsed.os.family  # e.g., 'iOS', 'Windows', 'Android'
        os_version = user_agent_parsed.os.version_string 
        visitor_id = request.COOKIES.get('v_id','')
        

        v_created = False
        visitor = None
        if visitor_id:
            visitor = Visitor.objects.filter(id=visitor_id)
            if visitor.exists():
                visitor = visitor.get()
        else:
            visitor = Visitor.objects.create()
            v_created = True
            
        visit = Visit.objects.create(
            visitor=visitor,
            path=urlparse(referer).path,
            os=f"{os_name} {os_version}",
            browser=f"{browser} {browser_version}",
            device=device_type
        )
        if user :
            visit.logged_in = True
            visit.save()
        
        if not visitor.user:
            visitor.user = user
            visitor.save()
        if v_created:
            response.set_cookie(
                'v_id',
                visitor.id,
                max_age = 10 * 365 * 24 * 60 * 60,
                httponly=True,
                secure=True,
                samesite='None'
            )

        return response


#class CookieAuthMiddleware(BaseMiddleware):
#    """
#    Custom middleware to authenticate users based on a token stored in cookies.
#    """
#    async def __call__(self, scope, receive, send):
#        # Get the cookies from the scope headers
#        print(scope)
#
#        return await super().__call__(scope, receive, send)
#