from django.db import models

# Create your models here.
class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    company_name = models.CharField(max_length=200)
    password = models.CharField(max_length=255)
    phone_no = models.CharField(max_length=20, null=True, blank=True, default=None)
    model = models.CharField(max_length=255, null=True, blank=True, default=None)
    role = models.BooleanField(default=False, null=True)   # True/False

    def __str__(self):
        return self.email

class CompanyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='company_profile')
    name = models.CharField(max_length=200)
    website = models.URLField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    logo = models.ImageField(upload_to='company_logos/', blank=True, null=True)

    def __str__(self):
        return self.name

class Agent(models.Model):
    ROLE_CHOICES = [
        ('hr', 'HR Assistant'),
        ('it', 'IT Support'),
        ('general', 'General Assistant'),
        ('custom', 'Custom'),
    ]
    TONE_CHOICES = [
        ('friendly', 'Friendly'),
        ('formal', 'Formal'),
        ('playful', 'Playful'),
        ('custom', 'Custom'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='agents')
    name = models.CharField(max_length=100)
    role_type = models.CharField(max_length=20, choices=ROLE_CHOICES, default='general')
    tone = models.CharField(max_length=20, choices=TONE_CHOICES, default='friendly')
    status = models.CharField(max_length=20, default='Active') # Active, Inactive
    subdomain = models.CharField(max_length=100, blank=True, null=True, unique=True)
    avatar = models.ImageField(upload_to='agent_avatars/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class KnowledgeBase(models.Model):
    TYPE_CHOICES = [
        ('document', 'Document'),
        ('faq', 'FAQ'),
    ]
    
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='knowledge_base')
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    # For Document
    file = models.FileField(upload_to='knowledge_docs/', blank=True, null=True)
    file_name = models.CharField(max_length=255, blank=True, null=True)
    file_size = models.CharField(max_length=50, blank=True, null=True)
    
    # For FAQ
    question = models.TextField(blank=True, null=True)
    answer = models.TextField(blank=True, null=True)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.type == 'document':
            return self.file_name or "Document"
        return self.question[:50] or "FAQ"

class Conversation(models.Model):
    STATUS_CHOICES = [
        ('active', 'Active'),
        ('resolved', 'Resolved'),
    ]
    
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='conversations')
    user_identifier = models.CharField(max_length=255) # Email or visitor ID
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    rating = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.agent.name} - {self.user_identifier}"

class Message(models.Model):
    SENDER_CHOICES = [
        ('user', 'User'),
        ('bot', 'Bot'),
    ]
    
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length=10, choices=SENDER_CHOICES)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    rating = models.CharField(max_length=10, null=True, blank=True) # positive, negative

    def __str__(self):
        return f"{self.sender}: {self.content[:20]}"
