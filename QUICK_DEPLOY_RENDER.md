# ⚡ Despliegue Rápido en Render

## 🎯 Pasos Rápidos (5 minutos)

### 1. Preparar el Repositorio

```bash
# Si aún no has inicializado git
git init
git add .
git commit -m "Initial commit"

# Sube a GitHub
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

### 2. Crear Base de Datos en Render

1. Ve a [Render Dashboard](https://dashboard.render.com/)
2. **New +** → **PostgreSQL**
3. Nombre: `ventas-compras-leo-db`
4. Plan: **Free**
5. Click **Create Database**
6. **Copia la "Internal Database URL"** 📋

### 3. Crear Web Service

1. **New +** → **Web Service**
2. Conecta tu repositorio de GitHub
3. Configuración:
   ```
   Name: ventas-compras-leo
   Root Directory: vendor-products-app
   Runtime: Node
   Build Command: npm install && npx prisma generate && npm run build
   Start Command: npm start
   Plan: Free
   ```

### 4. Variables de Entorno

En **Advanced**, agrega:

```
DATABASE_URL = [pega aquí la Internal Database URL]
NODE_ENV = production
NODE_VERSION = 20.11.0
```

### 5. Click **Create Web Service** 🚀

### 6. Ejecutar Migraciones

Una vez desplegado, ve a **Shell** en tu servicio y ejecuta:

```bash
npx prisma migrate deploy
npx prisma db seed
```

### 7. ¡Listo! 🎉

Tu app estará disponible en: `https://ventas-compras-leo.onrender.com`

## 🔄 Actualizaciones Futuras

Solo haz `git push` y Render desplegará automáticamente.

## 📚 Guía Completa

Para más detalles, lee: [RENDER_DEPLOY.md](./RENDER_DEPLOY.md)
