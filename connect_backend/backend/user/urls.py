from django.urls import path
from . import views

urlpatterns = [
    path('users/login/', views.get_user_by_username_and_password, name="get_user_by_username_and_password"),
    path('users/add/', views.create_user, name='create_user'),
    path('users/', views.get_all_users, name='get_all_users'),
    path('users/<int:user_id>/', views.get_user_by_id, name='get_user_by_id'),
    path('users/update/<int:user_id>/', views.update_user_by_id, name='update_user_by_id'),
    path('users/delete/<int:user_id>/', views.delete_user_by_id, name='delete_user_by_id'),
]