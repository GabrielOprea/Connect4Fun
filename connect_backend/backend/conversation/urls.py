from django.urls import path
from . import views

urlpatterns = [
    path('conversations/add/', views.create_conversation, name='create_conversation'),
    path('conversations/', views.get_all_conversations, name='get_all_conversations'),
    path('conversations/<int:conversation_id>/', views.get_conversation_by_id, name='get_conversation_by_id'),
    path('conversations/update/<int:conversation_id>/', views.update_conversation_by_id, name='update_conversation_by_id'),
    path('conversations/delete/<int:conversation_id>/', views.delete_conversation_by_id, name='delete_conversation_by_id'),
]