#!/bin/bash

APP_NAME="api_donadoce_nestjs"

# Verifica se o aplicativo está em execução
if pm2 list | grep -q $APP_NAME; then
  echo "Reiniciando $APP_NAME..."
  pm2 restart $APP_NAME
else
  echo "Iniciando $APP_NAME..."
  pm2 start dist/main.js --name $APP_NAME
fi
