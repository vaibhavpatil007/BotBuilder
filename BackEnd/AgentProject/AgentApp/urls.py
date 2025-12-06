from django.urls import path
from .views import *

urlpatterns = [
    path('registeruser/', RegisterUserView.as_view(), name='register'),
    
]