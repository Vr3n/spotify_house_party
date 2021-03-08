from django.urls import path
from .views import AuthURL, spotify_callback

app_name = 'spotify'

urlpatterns = [
    path('get-auth-url', AuthURL.as_view(), name="get_auth_url"),
    path('redirect', spotify_callback, name="spotify_callback"),
]