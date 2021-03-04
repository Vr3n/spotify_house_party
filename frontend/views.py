from django.shortcuts import render

# Create your views here.

def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def join_room(request, *args, **kwargs):
    return render(request, 'frontend/index.html')

def create_room(request, *args, **kwargs):
    return render(request, 'frontend/index.html')
