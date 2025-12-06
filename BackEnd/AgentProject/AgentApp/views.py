from django.shortcuts import render
from .serializers import *
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import check_password

# Create your views here.
class RegisterUserView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully", "data": serializer.data},
                status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response(
                {"error": "Email and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        try:
            user = User.objects.get(email=email)
            print(f"User email:{user.email}")
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid email credentials"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        if not check_password(password, user.password):
            return Response(
                {"error": "Invalid password credentials"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = UserSerializer(user)
        return Response(
            {"message": "Login successful", "data": serializer.data},
            status=status.HTTP_200_OK
        )
    # merge successfull