from django.urls import path
from . import views

urlpatterns = [
    path('messages/add/', views.create_message, name='create_message'),
    path('messages/', views.get_all_messages, name='get_all_messages'),
    path('messages/<int:message_id>/', views.get_message_by_id, name='get_message_by_id'),
    path('messages/update/<int:message_id>/', views.update_message_by_id, name='update_message_by_id'),
    path('messages/delete/<int:message_id>/', views.delete_message_by_id, name='delete_message_by_id'),
]