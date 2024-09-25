#!/bin/bash

# Define las variables de entorno 
export NOMBRE_IMAGEN_FRONTEND=erp-new-frontend-staging
export PUERTO_FRONTEND=5021

# Detener y eliminar contenedores existentes antes de reconstruirlos
#sudo docker compose down

# Reconstruir y levantar los contenedores
sudo docker compose -f ./docker-compose-staging.yml up --build -d
