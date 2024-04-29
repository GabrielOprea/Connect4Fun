from django.urls import include, path
from . import views

urlpatterns = [
    # Auth functions
    path('login/', views.custom_login, name='create_user'),
    path('register/', views.register, name='get_all_users'),
]
