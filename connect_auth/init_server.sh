#!/bin/sh

while true
do
	nc -z mysqlauth-service 3306 && break;
	sleep 2;
done

python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8001