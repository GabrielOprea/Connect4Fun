from django.urls import path
from . import views

urlpatterns = [
    path('reviews/add/', views.create_review, name='create_review'),
    path('reviews/', views.get_all_reviews, name='get_all_reviews'),
    path('reviews/<int:review_id>/', views.get_review_by_id, name='get_review_by_id'),
    path('reviews/update/<int:review_id>/', views.update_review_by_id, name='update_review_by_id'),
    path('reviews/delete/<int:review_id>/', views.delete_review_by_id, name='delete_review_by_id'),
]