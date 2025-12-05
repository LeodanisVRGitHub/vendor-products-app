# 🔴 Guía de Errores de Prisma - PrismaClientKnownRequestError

## 📖 Descripción

Los errores `PrismaClientKnownRequestError` son errores conocidos que Prisma genera cuando hay problemas con las operaciones de base de datos. Cada error tiene un código específico que indica qué salió mal.

## ✅ Solución Implementada

He creado un sistema completo de manejo de errores que:

1. **Detecta automáticamente el tipo de error de Prisma**
2. **Proporciona mensajes descriptivos en español**
3. **Incluye detalles técnicos en desarrollo**
4. **Oculta información sensible en producción**
5. **Registra logs detallados para debugging**

### Archivos Modificados/Creados:

- ✅ **`/src/lib/prismaErrorHandler.ts`** - Manejador centralizado de errores
- ✅ **`/src/lib/db.ts`** - Configuración mejorada con logging
- ✅ **`/src/app/api/vendors/route.ts`** - Usa el manejador de errores
- ✅ **`/src/app/api/products/route.ts`** - Usa el manejador de errores
- ✅ **`/src/app/api/reports/route.ts`** - Usa el manejador de errores
- ✅ **`/src/app/dashboard/page.tsx`** - Manejo de errores en UI
- ✅ **`/src/app/vendors/page.tsx`** - Manejo de errores en UI

## 🔍 Códigos de Error Comunes

### Errores de Conexión (P1xxx)

#### **P1001** - No se puede conectar al servidor de base de datos

```
Error: No se puede conectar a la base de datos
```

**Causas comunes:**

- `DATABASE_URL` no está configurada
- `DATABASE_URL` tiene formato incorrecto
- La base de datos PostgreSQL no está accesible
- Firewall bloqueando la conexión

**Solución:**

1. Verifica que `DATABASE_URL` esté en las variables de entorno de Render
2. Usa la "Internal Database URL" de tu PostgreSQL
3. Formato correcto: `postgresql://user:password@hostname:5432/database`

#### **P1002** - Timeout al conectar

```
Error: Timeout al conectar con la base de datos
```

**Causas:**

- La base de datos está sobrecargada
- Conexión de red lenta
- Base de datos en región diferente

**Solución:**

1. Verifica que Web Service y Database estén en la misma región
2. Revisa el estado de tu PostgreSQL en Render
3. Aumenta el timeout si es necesario

#### **P1003** - La base de datos no existe

```
Error: La base de datos no existe
```

**Causas:**

- Las migraciones no se han ejecutado
- La base de datos fue eliminada
- Nombre de base de datos incorrecto

**Solución:**

```bash
npx prisma migrate deploy
```

#### **P1008** - Operación expiró

```
Error: Operación expiró
```

**Causas:**

- Consulta muy lenta
- Índices faltantes
- Demasiados datos

**Solución:**

1. Optimiza las queries
2. Agrega índices en el schema
3. Implementa paginación

#### **P1017** - Servidor cerró la conexión

```
Error: Conexión cerrada por el servidor
```

**Causas:**

- La base de datos se reinició
- Timeout de conexión
- Límite de conexiones alcanzado

**Solución:**

1. Verifica el estado de tu PostgreSQL
2. Revisa los logs del servidor
3. Considera usar connection pooling

### Errores de Datos (P2xxx)

#### **P2002** - Violación de unique constraint

```
Error: Ya existe un registro con ese email
```

**Causas:**

- Intentando insertar un valor duplicado en campo único
- Email, SKU, o ID ya existe

**Solución:**

- Valida los datos antes de insertar
- Implementa verificación de duplicados
- Usa `upsert` en lugar de `create`

#### **P2003** - Violación de foreign key

```
Error: Referencia inválida a otro registro
```

**Causas:**

- El `vendorId` no existe
- Relación rota
- Registro padre eliminado

**Solución:**

- Verifica que el vendor existe antes de crear product
- Usa `onDelete: Cascade` en el schema
- Valida las relaciones

#### **P2025** - Registro no encontrado

```
Error: Registro no encontrado
```

**Causas:**

- El ID no existe
- Registro fue eliminado
- Filtros incorrectos

**Solución:**

- Verifica que el ID existe
- Maneja el caso de "no encontrado" en el frontend
- Usa `findUnique` con validación

## 🛠️ Cómo Usar el Manejador de Errores

### En las APIs:

```typescript
import { handlePrismaError } from "@/lib/prismaErrorHandler";

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.model.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return handlePrismaError(error); // 👈 Usa esta función
  }
}
```

### Respuesta de Error (Desarrollo):

```json
{
  "error": "No se puede conectar a la base de datos",
  "code": "P1001",
  "details": "Verifica que DATABASE_URL esté configurada correctamente"
}
```

### Respuesta de Error (Producción):

```json
{
  "error": "No se puede conectar a la base de datos",
  "code": "P1001",
  "details": "Error de conexión a la base de datos"
}
```

## 📝 Logs en Consola

El sistema ahora genera logs detallados:

```
🔴 Error de Prisma: PrismaClientKnownRequestError
📋 Error code: P1001
📋 Error meta: {...}
📋 Error message: Can't reach database server at...
```

## 🎯 Checklist de Diagnóstico

Cuando veas un `PrismaClientKnownRequestError`:

1. **Lee el código de error** (P1001, P2002, etc.)
2. **Revisa los logs** en Render
3. **Verifica DATABASE_URL**:
   ```bash
   # En Render Shell
   echo $DATABASE_URL
   ```
4. **Prueba la conexión**:
   ```bash
   npx prisma db push
   ```
5. **Ejecuta las migraciones**:
   ```bash
   npx prisma migrate deploy
   ```
6. **Verifica el estado de PostgreSQL** en Render dashboard

## 🔧 Soluciones Rápidas

### Error P1001 (No conexión)

```bash
# 1. Verifica que DATABASE_URL esté configurada
# 2. En Render: Environment → DATABASE_URL
# 3. Copia la Internal Database URL de tu PostgreSQL
# 4. Pégala en DATABASE_URL
# 5. Redeploy
```

### Error P1003 (BD no existe)

```bash
# En Render Shell o durante build
npx prisma migrate deploy
npm run seed  # Opcional: poblar datos
```

### Error P2002 (Duplicado)

```typescript
// En tu código, maneja duplicados:
try {
  await prisma.vendor.create({ data });
} catch (error) {
  if (error.code === "P2002") {
    // Email ya existe, actualiza en lugar de crear
    await prisma.vendor.update({ where: { email }, data });
  }
}
```

## 📚 Recursos Adicionales

- [Prisma Error Reference](https://www.prisma.io/docs/reference/api-reference/error-reference)
- [DATABASE_FIX.md](./DATABASE_FIX.md) - Guía de configuración de Render
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)

## 💡 Tips de Prevención

1. **Siempre valida la conexión** antes de hacer queries
2. **Usa try/catch** en todas las operaciones de DB
3. **Implementa retry logic** para errores de conexión
4. **Monitorea los logs** regularmente
5. **Configura alertas** en Render para errores 5xx
6. **Usa connection pooling** en producción
7. **Implementa health checks** para la BD

---

**Última actualización**: 2025-10-16

¿Tienes un error específico? Busca su código (P1001, P2002, etc.) en esta guía o revisa los logs de Render para más detalles.
