# 🚀 Guía de Despliegue en Render

Esta guía te ayudará a desplegar tu aplicación **Ventas y Compras Leo** en Render.

## 📋 Prerrequisitos

1. Una cuenta en [Render.com](https://render.com) (gratis)
2. Tu código en un repositorio de GitHub, GitLab o Bitbucket
3. Una base de datos PostgreSQL (Render ofrece una gratis)

## 🗄️ Paso 1: Crear la Base de Datos PostgreSQL

1. Ve a tu [Dashboard de Render](https://dashboard.render.com/)
2. Haz clic en **"New +"** y selecciona **"PostgreSQL"**
3. Configura tu base de datos:
   - **Name**: `ventas-compras-leo-db`
   - **Database**: `vendedorprod`
   - **User**: (se genera automáticamente)
   - **Region**: Elige la más cercana a ti
   - **Plan**: **Free** (suficiente para desarrollo)
4. Haz clic en **"Create Database"**
5. Una vez creada, copia la **Internal Database URL** (la usaremos después)

⚠️ **Importante**: La base de datos gratuita se elimina después de 90 días de inactividad.

## 🌐 Paso 2: Desplegar la Aplicación Web

### Opción A: Usando el Dashboard de Render

1. Ve a tu [Dashboard de Render](https://dashboard.render.com/)
2. Haz clic en **"New +"** y selecciona **"Web Service"**
3. Conecta tu repositorio de Git
4. Configura el servicio:

   - **Name**: `ventas-compras-leo`
   - **Region**: Elige la misma que la base de datos
   - **Branch**: `main` (o tu rama principal)
   - **Root Directory**: `vendor-products-app`
   - **Runtime**: **Node**
   - **Build Command**:
     ```bash
     npm install && npx prisma generate && npm run build
     ```
   - **Start Command**:
     ```bash
     npm start
     ```
   - **Plan**: **Free**

5. Agrega las variables de entorno:

   - Haz clic en **"Advanced"**
   - Agrega las siguientes variables:

     | Key            | Value                                       |
     | -------------- | ------------------------------------------- |
     | `DATABASE_URL` | La Internal Database URL que copiaste antes |
     | `NODE_ENV`     | `production`                                |
     | `NODE_VERSION` | `20.11.0`                                   |

6. Haz clic en **"Create Web Service"**

### Opción B: Usando render.yaml (Infraestructura como Código)

1. Asegúrate de que el archivo `render.yaml` esté en la raíz de tu repositorio
2. En el Dashboard de Render, selecciona **"New +"** → **"Blueprint"**
3. Conecta tu repositorio
4. Render detectará automáticamente el archivo `render.yaml`
5. Configura la variable de entorno `DATABASE_URL` cuando se te solicite

## 🔄 Paso 3: Ejecutar las Migraciones de Prisma

Una vez que tu aplicación esté desplegada, necesitas crear las tablas en la base de datos:

### Método 1: Usando Render Shell

1. Ve a tu servicio web en el Dashboard de Render
2. Haz clic en la pestaña **"Shell"**
3. Ejecuta los siguientes comandos:
   ```bash
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Método 2: Desde tu terminal local

1. Copia la **External Database URL** de tu base de datos en Render
2. En tu terminal local, ejecuta:
   ```bash
   DATABASE_URL="tu-external-database-url" npx prisma migrate deploy
   DATABASE_URL="tu-external-database-url" npx prisma db seed
   ```

## ✅ Paso 4: Verificar el Despliegue

1. Una vez completado el despliegue, Render te dará una URL como:
   ```
   https://ventas-compras-leo.onrender.com
   ```
2. Abre esa URL en tu navegador
3. Deberías ver tu aplicación funcionando

## 🔧 Configuración Avanzada

### Dominios Personalizados

1. Ve a tu servicio web en Render
2. Haz clic en **"Settings"**
3. En la sección **"Custom Domains"**, agrega tu dominio
4. Sigue las instrucciones para configurar los DNS

### Variables de Entorno Adicionales

Si necesitas agregar más variables de entorno:

1. Ve a **"Environment"** en la configuración de tu servicio
2. Agrega las variables necesarias
3. Guarda los cambios (esto reiniciará tu servicio)

### Configurar Health Checks

Render automáticamente verifica que tu aplicación esté funcionando. Si necesitas personalizar:

1. Ve a **"Settings"** → **"Health & Alerts"**
2. Configura la ruta de health check (por defecto es `/`)

## 🔄 Despliegues Automáticos

Render automáticamente despliega tu aplicación cuando:

- Haces push a la rama configurada (por defecto `main`)
- Puedes desactivar esto en **"Settings"** → **"Build & Deploy"**

## 📊 Monitoreo

Render ofrece:

- **Logs**: Pestaña "Logs" en tu servicio
- **Métricas**: Pestaña "Metrics" (CPU, memoria, requests)
- **Alertas**: Configura notificaciones por email

## 🐛 Solución de Problemas

### Error: "Build failed"

- Revisa los logs en la pestaña "Logs"
- Verifica que todas las dependencias estén en `package.json`
- Asegúrate de que el build command sea correcto

### Error: "Application failed to start"

- Verifica que la variable `DATABASE_URL` esté configurada correctamente
- Revisa que las migraciones se hayan ejecutado
- Chequea los logs de la aplicación

### La aplicación es lenta

- El plan gratuito tiene recursos limitados
- Considera actualizar a un plan de pago para mejor rendimiento
- El plan gratuito también se "duerme" después de 15 minutos de inactividad

### Base de datos llena

- El plan gratuito tiene 1GB de almacenamiento
- Monitorea el uso en el dashboard de la base de datos
- Considera limpiar datos antiguos o actualizar el plan

## 📝 Comandos Útiles

```bash
# Ver logs en tiempo real
render logs -f

# Ejecutar comandos en el servidor
render shell

# Reiniciar el servicio
render restart
```

## 💰 Costos

### Plan Gratuito (incluye):

- ✅ 750 horas de servicio web por mes
- ✅ SSL automático
- ✅ Despliegues automáticos desde Git
- ✅ PostgreSQL 1GB
- ⚠️ El servicio se "duerme" después de 15 min de inactividad
- ⚠️ Base de datos se elimina después de 90 días de inactividad

### Planes de Pago (desde $7/mes):

- ✅ Sin "sleep" automático
- ✅ Más recursos (RAM, CPU)
- ✅ Base de datos persistente sin límite de tiempo
- ✅ Soporte prioritario

## 🔗 Enlaces Útiles

- [Documentación de Render](https://render.com/docs)
- [Render con Next.js](https://render.com/docs/deploy-nextjs-app)
- [Prisma en producción](https://www.prisma.io/docs/guides/deployment)
- [Soporte de Render](https://render.com/support)

## 🎉 ¡Listo!

Tu aplicación ahora está en producción y accesible desde cualquier lugar del mundo. 🌍

Para cualquier actualización, solo haz push a tu repositorio y Render automáticamente desplegará los cambios.
