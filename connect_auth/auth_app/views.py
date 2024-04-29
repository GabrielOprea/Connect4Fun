
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt
import json
from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseNotAllowed
from django.core import serializers
from django.contrib.auth.models import User

@csrf_exempt
def custom_login(request):
    if request.method == 'POST':

        json_data = json.loads(request.body.decode('utf-8'))
        username = json_data.get('Username')
        password = json_data.get('Password')

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'})
        else:
            return JsonResponse({'message': 'Invalid credentials'}, status=401)


@csrf_exempt
def register(request):
    json_data = json.loads(request.body.decode('utf-8'))

    username = json_data.get('Username')
    email = json_data.get('Email')
    password = json_data.get('Password')

    if not username or not password or not email:
        return JsonResponse({'message': 'Please provide credentials'}, status=401)

    user = User.objects.create_user( username=username, email=email, password=password)
    auth_user = authenticate(request, username=username, password=password)
    login(request, auth_user)


    # user = UserEntity.objects.create(**json_data)
    # user.save()
    return JsonResponse({'message': 'Register successful'})