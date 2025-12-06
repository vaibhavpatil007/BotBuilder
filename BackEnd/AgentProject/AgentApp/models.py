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