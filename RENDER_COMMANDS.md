# 🛠️ Comandos Útiles para Render

## 📝 Comandos Locales (Antes de Desplegar)

### Desarrollo Local

```bash
# Instalar dependencias
npm install

# Generar cliente de Prisma
npx prisma generate

# Iniciar servidor de desarrollo
npm run dev

# Ejecutar migraciones (local)
npx prisma migrate dev

# Poblar base de datos (local)
npm run seed
```

### Build y Testing

```bash
# Construir la aplicación (simula el build de producción)
npm run build

# Iniciar en modo producción (después del build)
npm start

# Verificar sintaxis
npm run lint
```

### Git

```bash
# Ver estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "Tu mensaje"

# Push (esto desencadenará el despliegue automático en Render)
git push
```

## 🌐 Comandos en Render Shell

Para ejecutar estos comandos, ve a tu servicio en Render → pestaña **Shell**

### Migraciones de Base de Datos

```bash
# Ejecutar migraciones pendientes
npx prisma migrate deploy

# Ver estado de migraciones
npx prisma migrate status

# Resetear base de datos (¡CUIDADO! Elimina todos los datos)
npx prisma migrate reset
```

### Gestión de Datos

```bash
# Poblar base de datos con datos de ejemplo
npm run seed

# Abrir Prisma Studio (para ver/editar datos)
npx prisma studio
```

### Debugging

```bash
# Ver variables de entorno
printenv | grep DATABASE_URL
printenv | grep NODE_ENV

# Verificar versión de Node
node --version

# Verificar versión de npm
npm --version

# Ver logs de la aplicación
# (Esto se hace mejor desde la pestaña Logs en el dashboard)
```

### Mantenimiento

```bash
# Limpiar caché de npm
npm cache clean --force

# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Verificar espacio en disco
df -h
```

## 🔧 Render CLI (Comandos desde tu Terminal Local)

Primero instala el CLI de Render:

```bash
npm install -g render-cli
# o
yarn global add render-cli
```

### Autenticación

```bash
# Login
render login

# Ver servicios
render services list
```

### Gestión de Servicios

```bash
# Ver logs en tiempo real
render logs --service=ventas-compras-leo --follow

# Reiniciar servicio
render services restart ventas-compras-leo

# Ver información del servicio
render services get ventas-compras-leo

# Abrir shell remota
render shell ventas-compras-leo
```

### Deploys

```bash
# Ver historial de deploys
render deploys list --service=ventas-compras-leo

# Desplegar manualmente (sin esperar a git push)
render deploy --service=ventas-compras-leo

# Cancelar deploy en progreso
render deploy cancel --service=ventas-compras-leo
```

### Variables de Entorno

```bash
# Listar variables de entorno
render env-vars list --service=ventas-compras-leo

# Agregar variable de entorno
render env-vars set --service=ventas-compras-leo KEY=VALUE

# Eliminar variable de entorno
render env-vars unset --service=ventas-compras-leo KEY
```

## 🗄️ Gestión de Base de Datos PostgreSQL

### Desde Render Dashboard

1. Ve a tu base de datos en el dashboard
2. Click en **Connect** → **External Connection**
3. Copia la conexión string

### Conectar con psql (PostgreSQL CLI)

```bash
# Conectar a la base de datos
psql "postgresql://user:password@host:5432/database"

# Dentro de psql:
\dt          # Listar tablas
\d Vendor    # Describir tabla Vendor
\d Product   # Describir tabla Product

SELECT * FROM "Vendor";   # Ver todos los vendedores
SELECT * FROM "Product";  # Ver todos los productos

\q           # Salir
```

### Backup de Base de Datos

```bash
# Exportar base de datos (backup)
pg_dump "postgresql://user:password@host:5432/database" > backup.sql

# Importar base de datos (restore)
psql "postgresql://user:password@host:5432/database" < backup.sql
```

### Limpieza de Datos

```bash
# Desde Render Shell o psql
npx prisma db seed  # Re-poblar con datos de ejemplo

# Eliminar todos los datos (mantiene estructura)
npx prisma migrate reset --skip-seed
```

## 📊 Monitoreo

### Ver Métricas

```bash
# Desde el Dashboard de Render:
# 1. Ve a tu servicio
# 2. Click en la pestaña "Metrics"
# 3. Verás: CPU, Memoria, Requests, Response Time
```

### Logs

```bash
# Logs en tiempo real (desde tu terminal)
render logs --service=ventas-compras-leo --follow

# Logs con filtro
render logs --service=ventas-compras-leo --search="error"

# Logs de una cantidad específica de líneas
render logs --service=ventas-compras-leo --tail=100
```

## 🔄 Rollback (Volver a una Versión Anterior)

### Desde Dashboard

1. Ve a tu servicio → pestaña **Deploys**
2. Encuentra el deploy exitoso anterior
3. Click en **Redeploy**

### Desde Git

```bash
# Ver historial de commits
git log --oneline

# Volver a un commit específico
git reset --hard COMMIT_HASH

# Forzar push (esto desencadenará re-deploy)
git push --force
```

## 🚨 Comandos de Emergencia

### Si la aplicación está caída

```bash
# 1. Reiniciar servicio
render services restart ventas-compras-leo

# 2. Ver logs para identificar el problema
render logs --service=ventas-compras-leo --tail=200

# 3. Si es necesario, hacer rollback al deploy anterior
# (desde el dashboard)
```

### Si la base de datos tiene problemas

```bash
# 1. Verificar conectividad
npx prisma db pull

# 2. Verificar migraciones
npx prisma migrate status

# 3. Reparar migraciones
npx prisma migrate resolve --applied "MIGRATION_NAME"
```

## 💡 Tips de Productividad

### Alias útiles para .bashrc o .zshrc

```bash
# Agregar a tu archivo .bashrc o .zshrc:
alias render-logs='render logs --service=ventas-compras-leo --follow'
alias render-restart='render services restart ventas-compras-leo'
alias render-deploy='render deploy --service=ventas-compras-leo'
alias render-shell='render shell ventas-compras-leo'
```

### Scripts npm personalizados

Agrega estos al `package.json`:

```json
{
  "scripts": {
    "deploy:render": "git push origin main",
    "logs:render": "render logs --service=ventas-compras-leo --follow",
    "db:migrate": "npx prisma migrate deploy",
    "db:seed": "npx prisma db seed",
    "db:studio": "npx prisma studio"
  }
}
```

## 📚 Recursos

- [Documentación Render CLI](https://render.com/docs/cli)
- [Documentación PostgreSQL](https://www.postgresql.org/docs/)
- [Documentación Prisma](https://www.prisma.io/docs/)
- [Guía de Troubleshooting](https://render.com/docs/troubleshooting)

---

**Nota**: Reemplaza `ventas-compras-leo` con el nombre real de tu servicio si es diferente.
