from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from .models import Note
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
# This view Lists all notes or Creates new note. 2 functions.
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """What is queried from the db"""
        user = self.request.user # user object
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer: NoteSerializer):
        if serializer.is_valid(): # If serializer approves data
            # Since read-only request will not pass to us. We must manually write
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() # Look at this to avoid making duplicate users
    serializer_class = UserSerializer  # What data to make a user.
    permission_classes = [AllowAny] # Anyone can use this view to create new user
