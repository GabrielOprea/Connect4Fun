from django.urls import path
from . import views

urlpatterns = [
    path('activities/add/', views.create_activity, name='create_activity'),
    path('activities/', views.get_all_activities, name='get_all_activities'),
    path('activities/<int:activity_id>/', views.get_activity_by_id, name='get_activity_by_id'),
    path('activities/update/<int:activity_id>/', views.update_activity_by_id, name='update_activity_by_id'),
    path('activities/delete/<int:activity_id>/', views.delete_activity_by_id, name='delete_activity_by_id'),
]