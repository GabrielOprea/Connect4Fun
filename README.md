Title: Connect4Fun - Socializing Web Platform

Members: Robert-Andrei Ledezeu, Gabriel Oprea-Groza, Alexandra Mara Smau

Github: https://github.com/AlexandraMaraSmau/CC

The Application

The application consists of three components (backend, frontend, authentication, and authorization), each integrated into its own microservice.

MySQL

The application contains two databases, one for authentication and authorization, and the other for the backend. MySQL in Kubernetes contains secrets, a configuration map, and the service type is ClusterIP.

Adminer

Adminer interacts with and manages the tables in the database. It in Kubernetes contains a configuration map, and the service type is NodePort.

Grafana

Grafana is a powerful tool for monitoring and visualizing data and uses Prometheus. In Kubernetes, the service type is ClusterIP.

Portainer

Portainer is an application that manages the Docker network in the configuration. In Kubernetes, the service type is NodePort.

Prometheus

Prometheus is a monitoring system. In Kubernetes, it contains a configuration map, and the service type is NodePort.

Docker Images:

Business Logic: extremegabryel/connect_backend-djangoservice:latest
Auth: extremegabryel/connect_backend-djangoauth:latest
UI: extremegabryel/connect_backend-react_service:latest
Docker (docker-compose.yml file):
Setup: docker-compose -f docker-compose.yml up

Kubernetes:

Docker containers were used, representing the microservices for backend, frontend, authentication, and authorization. The utilities used were also configured on Docker. All of these were configured to run on a Kubernetes cluster containing a control panel and workers.

Setup: minikube start -n 3 or kubectl apply -f kind-config.yaml kubectl apply -f adminer-configmap.yaml kubectl apply -f adminer.yaml kubectl apply -f auth.yaml kubectl apply -f bussines-logic.yaml kubectl apply -f …..

Terraform (main.tf file):

It was used to create the Kubernetes infrastructure.

Contains: 2 x MySQL, Business Logic, UI, Auth, Adminer
Setup: terraform apply
Terraform file: main.tf
