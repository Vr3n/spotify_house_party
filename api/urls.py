from api.models import Room
from django.urls import path, include
from .views import RoomView, CreateRoomView

urlpatterns = [
    path('', RoomView.as_view(), name="list_rooms"),
    path('create-room/', CreateRoomView.as_view(), name="create_rooms"),
]