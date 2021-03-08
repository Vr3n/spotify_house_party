from django.urls import path
from .views import AuthURL, spotify_callback, IsAuthenticated

app_name = 'spotify'

urlpatterns = [
    path('is-spotify-authenticated', IsAuthenticated.as_view(), name="is_spotify_authenticated"),
    path('get-auth-url', AuthURL.as_view(), name="get_auth_url"),
    path('redirect/', spotify_callback, name="spotify_callback"),
]