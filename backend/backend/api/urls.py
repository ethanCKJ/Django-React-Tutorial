from django.urls import path
from .views import NoteDelete, NoteListCreate, NoteUpdate
urlpatterns = [
    path("notes/", NoteListCreate.as_view(), name="note-list"),
    path("notes/<int:pk>", NoteUpdate.as_view(), name="note-list"),
    path("notes/delete/<int:pk>/", NoteDelete.as_view(), name="delete-note"),
]