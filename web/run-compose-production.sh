#!/bin/bash

# Define las variables de entorno 
export NOMBRE_IMAGEN_FRONTEND=erp-new-frontend-production
export PUERTO_FRONTEND=5121

# Detener y eliminar contenedores existentes antes de reconstruirlos
#sudo docker compose down

# Reconstruir y levantar los contenedores
sudo docker compose -f ./docker-compose-production.yml up --build -d
