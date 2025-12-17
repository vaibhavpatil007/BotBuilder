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
        
        # Generate JWT Tokens
        from rest_framework_simplejwt.tokens import RefreshToken
        refresh = RefreshToken.for_user(user)
        
        return Response(
            {
                "message": "Login successful",
                "data": serializer.data,
                "token": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            },
            status=status.HTTP_200_OK
        )
    # merge successfull

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
import random

class DashboardStatsView(APIView):
    def get(self, request, user_id):
        # In a real app, we'd use request.user, but for now using user_id from path or query
        try:
            user = User.objects.get(id=user_id)
            agents = Agent.objects.filter(user=user)
            active_agents = agents.filter(status='Active').count()
            total_conversations = 0 # sum([a.conversations.count() for a in agents])
            
            # Mock stats
            return Response({
                "requestsUsed": 1250,
                "requestsLimit": 5000,
                "plan": "Pro Plan",
                "active_agents": active_agents,
                "total_agents": agents.count()
            })
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

class AgentViewSet(viewsets.ModelViewSet):
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        if user_id:
            return self.queryset.filter(user_id=user_id)
        return self.queryset

    @action(detail=True, methods=['get'])
    def analytics(self, request, pk=None):
        agent = self.get_object()
        conversations = agent.conversations.all()
        return Response({
            "conversations": conversations.count(),
            "avgRating": 4.7, # Mock
            "responseTime": "2.3s",
            "questions_answered": conversations.count() * 4  # Mock estimate
        })

class KnowledgeBaseViewSet(viewsets.ModelViewSet):
    queryset = KnowledgeBase.objects.all()
    serializer_class = KnowledgeBaseSerializer

    def get_queryset(self):
        agent_id = self.request.query_params.get('agent_id')
        if agent_id:
            return self.queryset.filter(agent_id=agent_id)
        return self.queryset

    def perform_create(self, serializer):
        instance = serializer.save()
        # Rebuild vector store for the agent
        try:
            from .utils.knowledge_loader import load_agent_knowledge
            from .utils.vector_store import build_agent_vector_store
            
            agent = instance.agent
            documents = load_agent_knowledge(agent)
            build_agent_vector_store(agent, documents)
        except Exception as e:
            print(f"Error rebuilding vector store: {e}")

class ConversationViewSet(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer

class NotificationViewSet(viewsets.ViewSet):
    def list(self, request):
        # Mock Notifications
        notifications = [
            {"id": 1, "title": "Welcome!", "message": "Welcome to BotBuilder.", "read": False, "created_at": "2024-03-10T10:00:00Z"},
            {"id": 2, "title": "Agent Deployed", "message": "Your agent 'Support Bot' is active.", "read": True, "created_at": "2024-03-09T14:30:00Z"},
            {"id": 3, "title": "System Update", "message": "Scheduled maintenance tonight.", "read": False, "created_at": "2024-03-08T09:00:00Z"},
        ]
        return Response(notifications)

    def get_queryset(self):
        agent_id = self.request.query_params.get('agent_id')
        if agent_id:
            return self.queryset.filter(agent_id=agent_id)
        return self.queryset

class ChatView(APIView):
    def post(self, request, agent_id):
        try:
            agent = Agent.objects.get(id=agent_id)
            message_content = request.data.get('message')
            user_identifier = request.data.get('user_identifier', 'anonymous')
            conversation_id = request.data.get('conversation_id')

            if conversation_id:
                conversation = Conversation.objects.get(id=conversation_id)
            else:
                conversation = Conversation.objects.create(agent=agent, user_identifier=user_identifier)

            # User message
            Message.objects.create(conversation=conversation, sender='user', content=message_content)

            # Real Bot Response using RAG
            from .utils.chat_engine import get_bot_response
            
            response_content = get_bot_response(
                agent_id=agent.id,
                user_message=message_content
            )
            
            # Bot message
            bot_msg = Message.objects.create(conversation=conversation, sender='bot', content=response_content)

            return Response({
                "conversation_id": conversation.id,
                "message": response_content,
                "timestamp": bot_msg.timestamp
            })

        except Agent.DoesNotExist:
            return Response({"error": "Agent not found"}, status=status.HTTP_404_NOT_FOUND)

class CompanyProfileView(APIView):
    def get(self, request, user_id):
        try:
            profile = CompanyProfile.objects.get(user_id=user_id)
            serializer = CompanyProfileSerializer(profile)
            return Response(serializer.data)
        except CompanyProfile.DoesNotExist:
            return Response({}) # Empty profile

    def post(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            profile, created = CompanyProfile.objects.get_or_create(user=user)
            serializer = CompanyProfileSerializer(profile, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
