from api.models import Room
from django.urls import path, include
from .views import JoinRoom, RoomView, CreateRoomView, GetRoom, UserInRoom, LeaveRoom

urlpatterns = [
    path('leave-room/', LeaveRoom.as_view(), name="leave_room"),
    path('user-in-room/', UserInRoom.as_view(), name="user_in_room"),
    path('create-room/', CreateRoomView.as_view(), name="create_rooms"),
    path('join-room/', JoinRoom.as_view(), name="join_room"),
    path('get-room', GetRoom.as_view(), name="get_room"),
    path('', RoomView.as_view(), name="list_rooms"),
]