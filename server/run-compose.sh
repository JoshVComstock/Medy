#!/bin/bash

DOCKER_PROJECT_DIR="/home/administrador/dockers/new-medisync/server/"
LOCAL_PROJECT_DIR="/home/administrador/medisync-react/server/"

# Detener y eliminar contenedores existentes antes de reconstruirlos
sudo docker compose down

# Reconstruir y levantar los contenedores
sudo docker compose up --build -d

# Borrar carpetas fuentes
sudo rm -Rf "$DOCKER_PROJECT_DIR"
sudo rm -Rf "$LOCAL_PROJECT_DIR"

