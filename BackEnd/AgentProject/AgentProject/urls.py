
from django.contrib import admin
from django.urls import path
from AgentApp.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('registeruser/', RegisterUserView.as_view(), name='register'),
    path('userlogin/',UserLoginView.as_view(), name='login')
]
