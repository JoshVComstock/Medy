#!/bin/bash

# Define las variables de entorno 
export NOMBRE_IMAGEN_BACKEND=medisync-new-backend
export PUERTO_BACKEND=5073

# Detener y eliminar contenedores existentes antes de reconstruirlos
#sudo docker compose down

# Reconstruir y levantar los contenedores
sudo docker compose -f ./docker-compose.yml up --build -d



