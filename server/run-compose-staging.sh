#!/bin/bash

# Define las variables de entorno 
export NOMBRE_IMAGEN_BACKEND=erp-new-backend-staging
export PUERTO_BACKEND=5073

# Detener y eliminar contenedores existentes antes de reconstruirlos
#sudo docker compose down

# Reconstruir y levantar los contenedores
sudo docker compose -f ./docker-compose-staging.yml up --build -d



