#!/bin/bash

# Detener y eliminar contenedores existentes antes de reconstruirlos
sudo docker compose down

# Reconstruir y levantar los contenedores
sudo docker compose up --build -d
