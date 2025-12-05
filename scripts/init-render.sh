#!/bin/bash
# Script de inicialización para Render

echo "🚀 Iniciando despliegue en Render..."

# Generar el cliente de Prisma
echo "📦 Generando cliente de Prisma..."
npx prisma generate

# Ejecutar migraciones
echo "🗄️ Ejecutando migraciones de base de datos..."
npx prisma migrate deploy

# Poblar la base de datos con datos iniciales (solo si es necesario)
if [ "$SEED_DATABASE" = "true" ]; then
  echo "🌱 Poblando base de datos con datos iniciales..."
  npm run seed
fi

echo "✅ Inicialización completada!"
