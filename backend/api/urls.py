from django.urls import path
from api import views
urlpatterns = [
    path("get_chat_token", views.ChatViewToken.as_view(), name="get-chat-token"),
    path('auth-token', views.CustomAuthToken.as_view(), name="get-auth-token"),
]