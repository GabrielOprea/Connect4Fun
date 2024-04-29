from django.urls import include, path

urlpatterns = [
    path('api/', include('backend.user.urls')),
    path('api/', include('backend.review.urls')),
    path('api/', include('backend.message.urls')),
    path('api/', include('backend.conversation.urls')),
    path('api/', include('backend.activity.urls')),
    path('api/', include('backend.event.urls')),
]
