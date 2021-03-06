from .serializers import ProfileSerializer,UserSerializer,ForgotPasswordSerializer,ResetPasswordSeriliazer
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import permissions,status
from .models import User
from api.email import EmailSender

import os

@api_view(['GET'])
@permission_classes((permissions.IsAuthenticated,))
def get_current_user(request):
    serializer = ProfileSerializer(request.user)
    return Response(serializer.data)

class CreateUserView(APIView):

    def post(self, request):
        user = request.data
        if not user:
            return Response(data={'type': 'error', 'content': 'No data found'},status= status.HTTP_417_EXPECTATION_FAILED)
        serializer = UserSerializer(data=user)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(data={"type": "error", "content": serializer.errors},status= status.HTTP_417_EXPECTATION_FAILED)
        return Response(data= serializer.data,status= status.HTTP_201_CREATED)

@api_view(['POST'])
def forgot_password(request):

    serializer = ForgotPasswordSerializer(data= request.data)

    if not serializer.is_valid():
        return Response(data={"type": "error", "content": serializer.errors},status= status.HTTP_417_EXPECTATION_FAILED)
    
    user = None
    try:
        user = User.objects.get(email= serializer.data["email"])
    except Exception:
        user = None
    if not user:
        return Response(data={"type": "error", "content": "Não foi possivel encontrar usuário"},status= status.HTTP_417_EXPECTATION_FAILED)
    
    user.forgot_password_token = user.generate_forgot_password_token()

    user.save()

    data_email = {
        "name": user.first_name,
        "forgotPasswordUrl": "%s/forgot?token=%s" %(os.getenv("FRONTEND_URL"),user.forgot_password_token)
    }

    EmailSender.send(
        tos=[user.email],
        template_path="email/forgot-password.html",
        data=data_email,
        subject="Esqueci Minha Senha")

    return Response("Verifique seu email para resetar a senha")

@api_view(['POST'])
def reset_password(request):
    serializer = ResetPasswordSeriliazer(data= request.data)

    if not serializer.is_valid():
        return Response(data={"type": "error", "content": serializer.errors},status= status.HTTP_417_EXPECTATION_FAILED)
    
    if not serializer.data['password'] == serializer.data['password_confirmed']:
        return Response(data={"type": "error", "content": "As senhas precisam ser iguais!"},status= status.HTTP_417_EXPECTATION_FAILED)

    user = None 
    try :
        user = User.objects.get(forgot_password_token= serializer.data["token"])
    except :
        user = None

    if not user:
        return Response(data={"type": "error", "content": "Token ínvalido"},status= status.HTTP_417_EXPECTATION_FAILED)
    
    user.set_password(serializer.data['password'])
    user.forgot_password_token = None
    user.save()

    return Response("Password was reset successfully")  

@api_view(['GET'])
def verify_email_alredy_exists(request):
    query_params = request.query_params

    if 'email' not in query_params.keys():
        return Response(data={"type": "error", "content": "Email é obrigatório"},status=status.HTTP_400_BAD_REQUEST)

    email = query_params['email']

    try:
        User.objects.get(email = email)
    except:
        return Response(status=status.HTTP_417_EXPECTATION_FAILED)

    return Response(status=status.HTTP_204_NO_CONTENT)

