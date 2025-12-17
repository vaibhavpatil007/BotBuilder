from django.contrib import admin
from django.urls import path, include
from AgentApp.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'agents', AgentViewSet)
router.register(r'conversations', ConversationViewSet)
router.register(r'knowledge', KnowledgeBaseViewSet)
router.register(r'notifications', NotificationViewSet, basename='notifications')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('registeruser/', RegisterUserView.as_view(), name='register'),
    path('userlogin/', UserLoginView.as_view(), name='login'),
    
    # New API endpoints
    path('api/', include(router.urls)),
    path('api/dashboard/<int:user_id>/', DashboardStatsView.as_view(), name='dashboard-stats'),
    path('api/chat/<int:agent_id>/', ChatView.as_view(), name='chat'),
    path('api/company/<int:user_id>/', CompanyProfileView.as_view(), name='company-profile'),
]

