from api.models import Room
from django.urls import path, include
from .views import RoomView, CreateRoomView, GetRoom

urlpatterns = [
    path('get-room', GetRoom.as_view(), name="get_room"),
    path('create-room/', CreateRoomView.as_view(), name="create_rooms"),
    path('', RoomView.as_view(), name="list_rooms"),
]