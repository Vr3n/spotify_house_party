from api.models import Room
from django.urls import path, include
from .views import RoomView

urlpatterns = [
    path('', RoomView.as_view(), name="create_rooms"),
]