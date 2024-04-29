from django.urls import path
from . import views

urlpatterns = [
    path('events/add/', views.create_event, name='create_event'),
    path('events/', views.get_all_events, name='get_all_events'),
    path('events/<int:event_id>/', views.get_event_by_id, name='get_event_by_id'),
    path('events/update/<int:event_id>/', views.update_event_by_id, name='update_event_by_id'),
    path('events/delete/<int:event_id>/', views.delete_event_by_id, name='delete_event_by_id'),
]