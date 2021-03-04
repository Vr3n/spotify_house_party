from django.urls import path

from .views import index, join_room, create_room, room

urlpatterns = [
    path('room/<str:code>/', room, name="room"),
    path('create_room/', create_room, name="create_room"),
    path('join_room/', join_room, name="join_room"),
    path('', index, name="home_page"),
]