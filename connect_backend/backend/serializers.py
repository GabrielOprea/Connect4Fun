from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'Username', 'LastName', 'FirstName', 'Role', 'Email', 'Password', 'PhoneNumber', 'ProfilePicture', 'Gender', 'Interests', 'Location', 'Bio']