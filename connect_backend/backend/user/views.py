import json
from ..models import User
import requests

from django.shortcuts import get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseNotAllowed
from django.core import serializers

def create_user(request):
    json_data = json.loads(request.body.decode('utf-8'))

    register_url = 'http://auth-service:8001/auth/register/'

    response = requests.post(register_url, json=json_data, verify=False)

    # Check if the request was successful (status code 200)
    if response.status_code != 401:
        del json_data['Password']
        user = User.objects.create(**json_data)
        user.save()

    return HttpResponse("Register success", status=200)


def get_user_by_username_and_password(request):
    json_data = json.loads(request.body.decode('utf-8'))

    login_url = 'http://auth-service:8001/auth/login/'
    
    username = json_data.get('Username')

    response = requests.post(login_url, json=json_data, verify=False)

    # Check if the request was successful (status code 200)
    if response.status_code != 401:
        query_set = User.objects.filter(Username=username)
        data = serializers.serialize("json", query_set)
        return HttpResponse(data, status=200)
    
    return HttpResponse("Login failed", status=400)


def get_user_by_id(request, user_id):
    try:
        query_set = User.objects.filter(pk=user_id)
    except User.DoesNotExist:
        raise Http404("User does not exist")
    data = serializers.serialize("json", query_set)
    return HttpResponse(data, status=200)

def get_all_users(request):
    query_set = User.objects.all()
    data = serializers.serialize("json", query_set)
    return HttpResponse(data, status=200)

def update_user_by_id(request, user_id):
    user = get_object_or_404(User, id=user_id)

    try:
        data = json.loads(request.body)
    except json.JSONDecodeError:
        return HttpResponse(status=400)

    for key, value in data.items():
        setattr(user, key, value)

    user.save()

    return HttpResponse(status=200)

def delete_user_by_id(request, user_id):
    if request.method == 'DELETE':
        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            raise Http404("User does not exist")
        
        user.delete()
        return HttpResponse(status=200)
    else:
        raise HttpResponseNotAllowed("Method is not supported")