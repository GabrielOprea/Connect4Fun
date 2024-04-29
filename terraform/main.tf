terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.0"
    }
  }
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

resource "kubernetes_secret" "mysql-secret" {
  metadata {
    name = "mysql-secret"
  }

  data = {
    MYSQL_ROOT_PASSWORD = "cm9vdA=="
    MYSQL_USER          = "YWRtaW4="
    MYSQL_PASSWORD      = "YWRtaW4xMjM0"
  }
}

resource "kubernetes_config_map" "mysql-configmap" {
  metadata {
    name = "mysql-configmap"
  }

  data = {
    MYSQL_DATABASE = "connect"
  }
}

resource "kubernetes_persistent_volume_claim" "mysql-pvc" {
  metadata {
    name = "mysql-pvc"
  }
  spec {
    storage_class_name = "manual"
    access_modes       = ["ReadWriteMany"]
    resources {
      requests = {
        storage = "750Mi"
      }
    }
  }
}

resource "kubernetes_persistent_volume" "mysql-pv" {
  metadata {
    name = "mysql-pv"
    labels = {
      type = "local"
    }
  }
  spec {
    capacity = {
      storage = "750Mi"
    }
    storage_class_name = "manual"
    access_modes       = ["ReadWriteMany"]
    persistent_volume_source {
      host_path {
        path = "/mnt/data"
      }
    }
  }
}

resource "kubernetes_pod" "mysql-deployment" {
  metadata {
    name = "mysql-deployment"
    labels = {
      app = "mysql"
    }
  }

  spec {
    container {
      image = "mysql:8.0.35"
      name  = "mysql-container"
      volume_mount {
        name       = "mysql-vol"
        mount_path = "/var/lib/mysql"
      }
      port {
        container_port = 3306
      }
      env_from {
        secret_ref {
          name = "mysql-secret"
        }
      }
      env_from {
        config_map_ref {
          name = "mysql-configmap"
        }
      }

    }
    volume {
      name = "mysql-vol"
      persistent_volume_claim {
        claim_name = "mysql-pvc"
      }
    }
  }

}

resource "kubernetes_service" "mysql-service" {
  metadata {
    name = "mysql-service"
  }
  spec {
    selector = {
      app = "mysql"
    }
    type = "ClusterIP"
    port {
      port        = 3306
      target_port = 3306
    }
  }
}

resource "kubernetes_config_map" "adminer-configmap" {
  metadata {
    name = "adminer-configmap"
  }

  data = {
    ADMINER_DESIGN         = "pepa-linha"
    ADMINER_DEFAULT_SERVER = "mysql-service"
  }
}

resource "kubernetes_deployment" "adminer" {
  metadata {
    name = "adminer"
    labels = {
      app = "adminer"
    }
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "adminer"
      }
    }

    template {
      metadata {
        labels = {
          app = "adminer"
        }
      }

      spec {
        container {
          image = "adminer:4.7.6-standalone"
          name  = "adminer"
          port {
            container_port = 8080
          }

          env_from {
            config_map_ref {
              name = "adminer-configmap"
            }
          }

          resources {
            limits = {
              memory = "750Mi"
              cpu    = "500m"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "adminer" {
  metadata {
    name = "adminer"
  }
  spec {
    selector = {
      app = "adminer"
    }
    type = "NodePort"
    port {
      port        = 8080
      target_port = 8080
      node_port   = 30001
    }
  }
}

resource "kubernetes_deployment" "react-deployment" {
  metadata {
    name = "react-deployment"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "react"
      }
    }

    template {
      metadata {
        labels = {
          app = "react"
        }
      }

      spec {
        container {
          image = "extremegabryel/connect_backend-react_service:latest"
          name  = "react"
          port {
            container_port = 3000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "react-service" {
  metadata {
    name = "react-service"
  }
  spec {
    selector = {
      app = "react"
    }
    type = "NodePort"
    port {
      port        = 3000
      target_port = 3000
      node_port   = 30002
    }
  }
}

resource "kubernetes_secret" "mysqlauth-secret" {
  metadata {
    name = "mysqlauth-secret"
  }

  data = {
    MYSQL_ROOT_PASSWORD = "cm9vdA=="
    MYSQL_USER          = "YWRtaW4="
    MYSQL_PASSWORD      = "YWRtaW4xMjM0"
  }
}

resource "kubernetes_config_map" "mysqlauth-configmap" {
  metadata {
    name = "mysqlauth-configmap"
  }

  data = {
    MYSQL_DATABASE = "connect"
  }
}

resource "kubernetes_persistent_volume" "mysqlauth-pv" {
  metadata {
    name = "mysqlauth-pv"
    labels = {
      type = "local"
    }
  }
  spec {
    capacity = {
      storage = "750Mi"
    }
    storage_class_name = "manual"
    access_modes       = ["ReadWriteMany"]
    persistent_volume_source {
      host_path {
        path = "/mnt/data/mysql-auth"
      }
    }
  }
}

resource "kubernetes_persistent_volume_claim" "mysqlauth-pvc" {
  metadata {
    name = "mysqlauth-pvc"
  }
  spec {
    storage_class_name = "manual"
    access_modes       = ["ReadWriteMany"]
    resources {
      requests = {
        storage = "750Mi"
      }
    }
  }
}

resource "kubernetes_pod" "mysqlauth-deployment" {
  metadata {
    name = "mysqlauth-deployment"
    labels = {
      app = "mysqlauth"
    }
  }

  spec {
    container {
      image = "mysql:8.0.35"
      name  = "mysqlauth-container"
      volume_mount {
        name       = "mysqlauth-vol"
        mount_path = "/var/lib/mysql"
      }
      port {
        container_port = 3306
      }
      env_from {
        secret_ref {
          name = "mysqlauth-secret"
        }
      }
      env_from {
        config_map_ref {
          name = "mysqlauth-configmap"
        }
      }

    }
    volume {
      name = "mysqlauth-vol"
      persistent_volume_claim {
        claim_name = "mysqlauth-pvc"
      }
    }
  }

}

resource "kubernetes_service" "mysqlauth-service" {
  metadata {
    name = "mysqlauth-service"
  }
  spec {
    selector = {
      app = "mysqlauth"
    }
    type = "ClusterIP"
    port {
      port        = 3306
      target_port = 3306
    }
  }
}

resource "kubernetes_deployment" "auth-deployment" {
  metadata {
    name = "auth-deployment"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "auth"
      }
    }

    template {
      metadata {
        labels = {
          app = "auth"
        }
      }

      spec {
        container {
          image = "extremegabryel/connect_backend-djangoauth:latest"
          name  = "auth"
          port {
            container_port = 8000
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "auth-service" {
  metadata {
    name = "auth-service"
  }
  spec {
    selector = {
      app = "auth"
    }
    type = "ClusterIP"
    port {
      port        = 8001
      target_port = 8000
    }
  }
}

resource "kubernetes_config_map" "django-configmap" {
  metadata {
    name = "mysql-configmap"
  }

  data = {
    MYSQL_DATABASE = "connect"
    DB_HOST        = "mysql-service"
    DB_PORT        = "3306"
    DB_NAME        = "connect"
    DB_USER        = "admin"
    DB_PASSWORD    = "admin1234"
  }
}

resource "kubernetes_deployment" "django-deployment" {
  metadata {
    name = "django-deployment"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "django"
      }
    }

    template {
      metadata {
        labels = {
          app = "django"
        }
      }

      spec {
        container {
          image = "extremegabryel/connect_backend-djangoservice:latest"
          name  = "django"
          port {
            container_port = 8000
          }
          env_from {
            config_map_ref {
              name = "django-configmap"
            }
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "django-service" {
  metadata {
    name = "django-service"
  }
  spec {
    selector = {
      app = "django"
    }
    type = "ClusterIP"
    port {
      port        = 8000
      target_port = 8000
    }
  }
}
