from django.urls import path

from .views import index, join_room, create_room

urlpatterns = [
    path('', index, name="home_page"),
    path('join_room/', join_room, name="join_room"),
    path('create_room/', create_room, name="create_room"),
]