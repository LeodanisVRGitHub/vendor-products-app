# ✅ Checklist de Despliegue en Render

## 📦 Antes de Desplegar

- [ ] Tu código está en un repositorio Git (GitHub/GitLab/Bitbucket)
- [ ] Has probado la aplicación localmente
- [ ] Tienes una cuenta en [Render.com](https://render.com)

## 🗄️ Configuración de Base de Datos

- [ ] Has creado una base de datos PostgreSQL en Render
- [ ] Has copiado la **Internal Database URL**
- [ ] Has guardado la URL en un lugar seguro

## 🌐 Configuración del Servicio Web

- [ ] Has creado un Web Service en Render
- [ ] Has conectado tu repositorio Git
- [ ] Has configurado el **Root Directory** como `vendor-products-app`
- [ ] Has configurado el **Build Command**:
  ```
  npm install && npx prisma generate && npx prisma migrate deploy && npm run build
  ```
- [ ] Has configurado el **Start Command**:
  ```
  npm start
  ```

## 🔐 Variables de Entorno

Asegúrate de haber agregado estas variables de entorno:

- [ ] `DATABASE_URL` - La Internal Database URL de tu PostgreSQL
- [ ] `NODE_ENV` - `production`
- [ ] `NODE_VERSION` - `20.11.0`

Opcional:

- [ ] `SEED_DATABASE` - `true` (solo si quieres poblar con datos de ejemplo)

## 🚀 Despliegue

- [ ] Has hecho click en **Create Web Service**
- [ ] El build ha completado exitosamente (revisa los logs)
- [ ] La aplicación ha iniciado sin errores

## 🗃️ Migraciones y Datos

Después del primer despliegue:

- [ ] Has ejecutado las migraciones:
  ```bash
  npx prisma migrate deploy
  ```
- [ ] Has poblado la base de datos (opcional):
  ```bash
  npm run seed
  ```

## ✨ Verificación Final

- [ ] La aplicación carga correctamente en `https://tu-app.onrender.com`
- [ ] Puedes ver la página principal
- [ ] Puedes navegar entre las páginas (Dashboard, Vendors, Products)
- [ ] No hay errores en la consola del navegador
- [ ] Puedes crear, editar y eliminar vendedores
- [ ] Puedes crear, editar y eliminar productos

## 🔄 Actualizaciones Futuras

Para desplegar actualizaciones:

1. Haz cambios en tu código
2. Commit y push a tu repositorio:
   ```bash
   git add .
   git commit -m "Tu mensaje de commit"
   git push
   ```
3. Render automáticamente detectará los cambios y desplegará

## 🐛 Si Algo Sale Mal

### Build Failed

1. Ve a la pestaña **Logs** en Render
2. Busca el error específico
3. Verifica que todas las dependencias estén en `package.json`
4. Asegúrate de que el build command sea correcto

### Application Failed to Start

1. Revisa los logs de la aplicación
2. Verifica que `DATABASE_URL` esté configurada correctamente
3. Asegúrate de que las migraciones se ejecutaron
4. Revisa que el puerto esté configurado correctamente (Render usa el puerto de la variable `PORT`)

### Database Connection Error

1. Verifica que la `DATABASE_URL` sea la **Internal** y no la External
2. Asegúrate de que la base de datos esté en el mismo region que el servicio web
3. Revisa que la base de datos esté activa

### Slow Performance

- Esto es normal en el plan gratuito
- El servicio se "duerme" después de 15 minutos sin actividad
- La primera petición después del "sleep" será lenta
- Considera actualizar a un plan de pago para mejor rendimiento

## 💡 Tips

- **Revisa los logs regularmente**: Te ayudarán a identificar problemas rápidamente
- **Usa la Shell de Render**: Para ejecutar comandos directamente en el servidor
- **Configura notificaciones**: Para recibir alertas de errores por email
- **Monitorea el uso de la base de datos**: El plan gratuito tiene límite de 1GB
- **Haz backups regulares**: Aunque Render hace backups, es bueno tener los propios

## 📚 Recursos

- [Guía Completa de Despliegue](./RENDER_DEPLOY.md)
- [Guía Rápida](./QUICK_DEPLOY_RENDER.md)
- [Documentación de Render](https://render.com/docs)
- [Documentación de Prisma](https://www.prisma.io/docs)

## 🎉 ¡Éxito!

Una vez completado este checklist, tu aplicación **Ventas y Compras Leo** estará disponible en producción y lista para usar. 🚀
