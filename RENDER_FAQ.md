# ❓ Preguntas Frecuentes - Despliegue en Render

## General

### ¿Por qué Render?

Render es una excelente opción para aplicaciones Next.js porque:

- ✅ Es más simple que AWS o Google Cloud
- ✅ Tiene un plan gratuito generoso
- ✅ Incluye PostgreSQL gratis
- ✅ Despliegues automáticos desde Git
- ✅ SSL/HTTPS gratis
- ✅ No necesitas tarjeta de crédito para el plan gratuito

### ¿Cuánto cuesta?

**Plan Gratuito:**

- Web Service: 750 horas/mes (suficiente para un servicio)
- PostgreSQL: 1GB de almacenamiento
- Limitación: El servicio se "duerme" después de 15 minutos sin uso

**Plan Starter ($7/mes):**

- Sin "sleep" automático
- Mejor rendimiento
- Base de datos persistente

### ¿Necesito tarjeta de crédito?

No, el plan gratuito no requiere tarjeta de crédito.

## Base de Datos

### ¿Qué es la diferencia entre Internal y External Database URL?

- **Internal URL**: Úsala para conectar desde servicios dentro de Render (tu app web)

  - Más rápida
  - No consume bandwidth externo
  - Formato: `postgresql://...@dpg-xxx-a:5432/...`

- **External URL**: Úsala para conectar desde tu computadora local
  - Accesible desde internet
  - Formato: `postgresql://...@dpg-xxx-a.oregon-postgres.render.com:5432/...`

**Para tu aplicación en Render, SIEMPRE usa la Internal URL.**

### ¿Los datos se eliminan en el plan gratuito?

- La base de datos gratuita se elimina después de **90 días de inactividad**
- Si accedes regularmente, los datos se mantienen
- Haz backups periódicos para estar seguro

### ¿Cómo hago backup de mi base de datos?

```bash
# Desde tu terminal local (con la External URL)
pg_dump "postgresql://user:password@host:5432/database" > backup-$(date +%Y%m%d).sql

# Para restaurar
psql "postgresql://user:password@host:5432/database" < backup-20240115.sql
```

## Despliegue

### ¿Por qué mi primer deploy tarda tanto?

El primer deploy puede tardar 3-5 minutos porque:

1. Instala todas las dependencias de Node
2. Genera el cliente de Prisma
3. Ejecuta las migraciones
4. Construye la aplicación Next.js

Los siguientes deploys son más rápidos (1-2 minutos).

### ¿Por qué mi aplicación está lenta?

En el plan gratuito:

- El servicio se "duerme" después de 15 minutos sin tráfico
- La primera petición después del "sleep" tarda 30-60 segundos
- Las peticiones subsiguientes son normales

**Solución**: Actualiza al plan Starter ($7/mes) para eliminar el "sleep".

### ¿Cómo evito que mi app se "duerma"?

Opciones:

1. Actualizar al plan de pago
2. Usar un servicio de "ping" gratuito como [UptimeRobot](https://uptimerobot.com/)
3. Crear un cron job que haga peticiones cada 10 minutos

### ¿Los despliegues son automáticos?

Sí, por defecto Render despliega automáticamente cuando:

- Haces `git push` a la rama configurada (usualmente `main`)

Puedes desactivar esto en: Settings → Build & Deploy → Auto-Deploy

### ¿Puedo hacer un deploy manual?

Sí, hay varias formas:

1. Desde el Dashboard: Click en "Manual Deploy" → "Deploy latest commit"
2. Usando Render CLI: `render deploy --service=tu-servicio`
3. Haciendo un push a Git (si auto-deploy está activado)

## Migraciones y Prisma

### ¿Necesito ejecutar migraciones manualmente?

Con nuestra configuración actual:

- Las migraciones se ejecutan **automáticamente** durante el build
- Esto está en el `buildCommand` del `render.yaml`

Sin embargo, para el primer deploy o para poblar datos:

```bash
# Conectar a Render Shell y ejecutar
npm run seed
```

### ¿Cómo actualizo el schema de la base de datos?

1. Modifica `prisma/schema.prisma` localmente
2. Crea la migración:
   ```bash
   npx prisma migrate dev --name tu-cambio
   ```
3. Commit y push:
   ```bash
   git add .
   git commit -m "Update database schema"
   git push
   ```
4. Render automáticamente aplicará la migración durante el deploy

### Error: "Migration failed"

Causas comunes:

1. **Conflicto de migraciones**: Reset y volver a ejecutar

   ```bash
   npx prisma migrate reset
   npx prisma migrate deploy
   ```

2. **Base de datos no vacía**: Si hay datos que no son compatibles con la nueva migración
   - Haz backup de los datos
   - Modifica la migración para ser compatible
   - O limpia la base de datos y vuelve a poblar

## Variables de Entorno

### ¿Dónde configuro las variables de entorno?

Dashboard de Render → Tu servicio → Environment

O en el archivo `render.yaml`:

```yaml
envVars:
  - key: MI_VARIABLE
    value: mi_valor
```

### ¿Cuándo se aplican los cambios de variables?

Los cambios en variables de entorno requieren un **restart** del servicio:

- Render automáticamente reinicia cuando guardas cambios en el Dashboard
- Esto causa ~30 segundos de downtime

### ¿Cómo guardo secretos de forma segura?

En el Dashboard:

1. Ve a Environment
2. Agrega la variable
3. NO la incluyas en `render.yaml` si es un secreto
4. Usa `sync: false` para variables sensibles

## Errores Comunes

### Error: "Port already in use"

Render automáticamente asigna un puerto. **NO** especifiques un puerto fijo.

Next.js automáticamente usa el puerto de la variable `PORT` que Render provee.

### Error: "Module not found"

1. Verifica que la dependencia esté en `package.json`
2. Asegúrate de que esté en `dependencies` y NO en `devDependencies`
3. Elimina `node_modules` y `package-lock.json`, luego `npm install`
4. Commit y push

### Error: "Database connection failed"

Verifica:

1. ✅ Usas la **Internal** Database URL (no la External)
2. ✅ La variable se llama exactamente `DATABASE_URL`
3. ✅ No hay espacios extra en la URL
4. ✅ La base de datos está en la misma región que el servicio web

### La aplicación no carga (página en blanco)

1. Revisa los logs del navegador (F12 → Console)
2. Revisa los logs de Render (pestaña Logs)
3. Verifica que el build completó exitosamente
4. Asegúrate de que todas las variables de entorno estén configuradas

### Error 503: Service Unavailable

Esto significa que la aplicación falló al iniciar. Revisa:

1. Logs de la aplicación
2. Que `DATABASE_URL` esté configurada
3. Que las migraciones se ejecutaron
4. Que el `start` command sea correcto: `npm start`

## Performance

### ¿Cómo mejoro el rendimiento?

1. **Actualiza al plan de pago** - Elimina el "sleep" y da más recursos
2. **Optimiza la aplicación**:
   - Reduce el tamaño del bundle
   - Usa `next/image` para imágenes
   - Implementa caching
3. **Usa una CDN** para assets estáticos
4. **Optimiza queries de base de datos**:
   - Agrega índices en Prisma
   - Usa `select` para traer solo los campos necesarios

### ¿Puedo usar un CDN?

Sí, Render tiene CDN integrado para assets estáticos.

Para mejor performance, considera:

- Cloudflare (gratis) como proxy
- Vercel para el frontend + Render para el backend
- AWS CloudFront

## Monitoreo

### ¿Cómo monitoreo mi aplicación?

Render ofrece:

1. **Logs**: Tiempo real en el Dashboard
2. **Metrics**: CPU, memoria, requests/segundo
3. **Alerts**: Notificaciones por email

Para monitoreo avanzado:

- [Sentry](https://sentry.io/) - Tracking de errores
- [LogRocket](https://logrocket.com/) - Session replay
- [New Relic](https://newrelic.com/) - APM completo

### ¿Cómo configuro alertas?

Settings → Health & Alerts → Add Alert

Tipos de alertas:

- Service down
- High CPU usage
- High memory usage
- Failed deploys

## Costos y Límites

### ¿Cuáles son los límites del plan gratuito?

**Web Service:**

- 750 horas/mes (1 servicio 24/7)
- RAM: 512MB
- CPU: Compartida
- Sleep después de 15 min de inactividad

**PostgreSQL:**

- 1GB de almacenamiento
- 100 conexiones simultáneas
- Se elimina después de 90 días de inactividad

### ¿Cuándo debería actualizar al plan de pago?

Actualiza cuando:

- ✅ El "sleep" afecta la experiencia de usuario
- ✅ Necesitas más de 1GB en la base de datos
- ✅ Tienes muchos usuarios simultáneos
- ✅ Necesitas mejor performance
- ✅ Necesitas bases de datos persistentes sin límite de tiempo

### ¿Puedo cambiar de plan después?

Sí, puedes actualizar o downgrade en cualquier momento:

- Dashboard → Settings → Plan
- Los cambios se aplican inmediatamente
- Se factura proporcionalmente

## Migración

### ¿Puedo migrar desde otra plataforma?

Sí, fácilmente:

1. Exporta tu base de datos de la plataforma actual
2. Crea nueva base de datos en Render
3. Importa los datos
4. Actualiza `DATABASE_URL`
5. Despliega la aplicación

### ¿Cómo migro de SQLite a PostgreSQL?

1. Actualiza `prisma/schema.prisma`:

   ```prisma
   datasource db {
     provider = "postgresql"  // Era "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

2. Genera nueva migración:

   ```bash
   npx prisma migrate dev
   ```

3. Deploy en Render con la nueva configuración

**Nota**: Los datos de SQLite NO se migran automáticamente. Necesitas exportar/importar manualmente.

## Troubleshooting

### Mi aplicación funciona local pero no en Render

Verifica:

1. ✅ Variables de entorno estén configuradas
2. ✅ El `build` command sea correcto
3. ✅ Todas las dependencias estén en `package.json`
4. ✅ No uses puertos fijos (usa `process.env.PORT || 3000`)
5. ✅ Paths de archivos usen rutas relativas correctas

### ¿Cómo depuro en producción?

1. **Logs detallados**: Agrega `console.log` estratégicamente
2. **Source maps**: Next.js los genera automáticamente
3. **Render Shell**: Ejecuta comandos directamente en el servidor
4. **Error tracking**: Integra Sentry o similar

### ¿Dónde consigo ayuda?

1. [Documentación de Render](https://render.com/docs)
2. [Community Forum](https://community.render.com/)
3. [Discord de Render](https://discord.gg/render)
4. [Soporte directo](https://render.com/support) (planes de pago tienen prioridad)

## 🎓 Recursos Adicionales

- [Guía Completa de Despliegue](./RENDER_DEPLOY.md)
- [Guía Rápida](./QUICK_DEPLOY_RENDER.md)
- [Checklist de Despliegue](./RENDER_CHECKLIST.md)
- [Comandos Útiles](./RENDER_COMMANDS.md)
- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)

---

¿No encontraste tu pregunta? Abre un issue o contáctanos. 📧
