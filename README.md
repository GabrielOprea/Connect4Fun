Titlu: Connect4Fun - Platforma web de socializare

Membrii:
Robert-Andrei Ledezeu
Gabriel Oprea-Groza
Alexandra Mara Smau

Github: https://github.com/AlexandraMaraSmau/CC

Aplicatia

Aplicatia contine trei componente (backend, frontend, autentficare si autorizare)
care sunt integrate fiecare pe un microserviciu propriu.

MySQL

Aplicatia contine doua baze de date, una pentru autentificare si autorizare si
cealalta pentru backend. MySQL in kubernetis contine secrete, o mapa de configurare, tipul serviciului este ClusterIP.

Adminer

Adminer interactioneaza si gestioneaza tabelele din baza de date. Acesta in kubernetis contine o mapa de configurare si tipul serviciului este NodePort.

Grafana

Grafana este un instrument puternic pentru monitorizarea și vizualizarea datelor si se foloseste de Prometheus. In kubernetis tipul serviciului este ClusterIP.


Portnainer

Portainer este o aplicatie care gestioneaza reteaua de dockere din configuratie. In kubernetis tipul serviciului este NodePort.

Prometheus

Prometheus este un sistem de monitorizare. In kubernetis contine o mapa de configurare si tipul serviciului este NodePort.

Docker Images:
Bussiness Logic: extremegabryel/connect_backend-djangoservice:latest
Auth: extremegabryel/connect_backend-djangoauth:latest
UI: extremegabryel/connect_backend-react_service:latest

Docker(file docker-compose.yml):
Set up: docker-compose -f docker-compose.yml up

Kubernetes:

Au fost folosite dockere ce sunt reprezentate de microserviciile pentru cele backend, frontend, autentificare si autorizare. Utilitarele folosite au fost configurare tot pe Dockere. Toate acestea au fost configurate sa ruleze pe un cluster Kubernetes ce contine un panou de control si workeri.

Set up:
minikube start -n 3 or kubectl apply -f kind-config.yaml
kubectl apply -f adminer-configmap.yaml
kubectl apply -f adminer.yaml
kubectl apply -f auth.yaml
kubectl apply -f bussines-logic.yaml
kubectl apply -f …..

Terraform (file - main.tf):

A fost folosit pentru a crea infrastructura de Kubernetes.

Contain: 2 x MySql, Bussines Logic, UI, Auth, Adminer
Set up:
terraform apply
terraform file: main.tf


