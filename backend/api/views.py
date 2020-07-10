from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

import stream_chat
import os

# Create your views here.
class ChatViewToken(APIView):

    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, format=None):
        username = request.user.username
        if username:
            chat_client = stream_chat.StreamChat(api_key=os.getenv("CHAT_APP_KEY"), api_secret=os.getenv("CHAT_APP_SECRET"))
            token = chat_client.create_token(username)
            return Response({'token': token})
        else:
            return Response({'token': 'null'})

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'username': user.username,
        })