# 🔐 Sistema de Cierre de Sesión Automático

## 📋 Descripción

El sistema ahora incluye un mecanismo completo de gestión de sesiones que cierra automáticamente la sesión del usuario por inactividad, protegiendo la aplicación cuando no está en uso.

## ⚙️ Configuración

### Tiempo de inactividad

- **Tiempo máximo de inactividad:** 15 minutos
- **Aviso previo:** 2 minutos antes de cerrar
- **Frecuencia de verificación:** Cada 1 minuto

### Personalización

Para cambiar estos valores, edita en `src/contexts/AuthContext.tsx`:

```typescript
const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutos
const WARNING_TIME = 2 * 60 * 1000; // Aviso 2 minutos antes
```

## 🎯 Funcionalidades Implementadas

### 1. **Detección de Actividad del Usuario**

El sistema detecta automáticamente cuando el usuario está activo mediante:

- ✅ Movimientos del mouse
- ✅ Clics
- ✅ Teclas presionadas
- ✅ Scroll
- ✅ Toques en pantalla (móvil)

### 2. **Cierre de Sesión por Inactividad**

- ⏱️ Después de 15 minutos sin actividad, la sesión se cierra automáticamente
- 🔄 Se redirige al usuario a la página de login
- 🧹 Se limpian todos los datos de sesión del navegador

### 3. **Aviso de Expiración**

- ⚠️ 2 minutos antes de cerrar, aparece un modal de advertencia
- ⏲️ Muestra un contador regresivo en tiempo real
- 🎨 Diseño profesional y responsive

### 4. **Opciones del Usuario**

Cuando aparece el aviso, el usuario puede:

- **"Continuar sesión"**: Extiende la sesión otros 15 minutos
- **"Salir"**: Cierra sesión inmediatamente

### 5. **Persistencia entre Sesiones**

- 💾 Guarda el timestamp de última actividad en `localStorage`
- 🔍 Al volver a abrir la aplicación, verifica si pasó el tiempo límite
- 🚪 Si pasó mucho tiempo, requiere login nuevamente

### 6. **Detección de Cambio de Pestaña**

- 👁️ Detecta cuando el usuario cambia de pestaña del navegador
- 📱 Detecta cuando la aplicación pasa a segundo plano
- ⏰ Al regresar, verifica si se excedió el tiempo de inactividad

### 7. **Detección de Cierre de Ventana**

- 🚪 Guarda el timestamp cuando el usuario cierra la pestaña/ventana
- 🔄 Al volver a abrir, verifica el tiempo transcurrido
- 🔒 Cierra sesión si pasó más de 15 minutos

## 🛠️ Archivos Modificados/Creados

### 1. **`src/contexts/AuthContext.tsx`**

Funcionalidades agregadas:

- Estado `lastActivity` para rastrear última actividad
- Detectores de eventos de usuario (mouse, teclado, touch)
- Timer de verificación de inactividad
- Listeners para cambio de visibilidad y cierre de ventana
- Guardado de timestamps en localStorage

### 2. **`src/components/SessionTimeout.tsx`** (NUEVO)

Componente modal que:

- Muestra advertencia 2 minutos antes de expirar
- Cuenta regresiva visual
- Botones para extender o cerrar sesión
- Diseño responsive con dark mode

### 3. **`src/components/ClientLayout.tsx`**

- Integración del componente `SessionTimeout`
- Disponible en todas las páginas de la aplicación

## 📱 Experiencia del Usuario

### Escenario 1: Usuario Activo

```
Usuario trabaja normalmente
└─> Sistema detecta actividad constantemente
    └─> Actualiza timestamp cada 30 segundos
        └─> Sesión permanece activa indefinidamente
```

### Escenario 2: Usuario Inactivo

```
Usuario deja la aplicación abierta
└─> [13 minutos después]
    └─> Modal de advertencia aparece
        └─> Opción A: "Continuar sesión"
        │   └─> Sesión extendida otros 15 minutos
        └─> Opción B: "Salir"
        │   └─> Cierre de sesión inmediato
        └─> Opción C: No hacer nada
            └─> [2 minutos después] Cierre automático
```

### Escenario 3: Usuario Cierra Pestaña

```
Usuario cierra la pestaña/ventana
└─> Sistema guarda timestamp de cierre
    └─> [Usuario vuelve después de 20 minutos]
        └─> Sistema detecta tiempo excedido
            └─> Redirige a login automáticamente
```

### Escenario 4: Usuario Cambia de Pestaña

```
Usuario cambia a otra pestaña
└─> Sistema detecta que la app está en background
    └─> Guarda timestamp
        └─> [Usuario vuelve después de 10 minutos]
            └─> Sistema verifica tiempo transcurrido
                └─> Sesión continúa (no superó el límite)
```

## 🎨 Interfaz del Modal de Advertencia

```
╔═══════════════════════════════════════════╗
║  ⏰  Sesión por expirar                  ║
║      Tu sesión está por terminar         ║
╟───────────────────────────────────────────╢
║  Por inactividad, tu sesión se cerrará en:║
║                                           ║
║              ⏲️  1:45                     ║
║                                           ║
║  [   Continuar sesión   ]  [ 🚪 Salir ]  ║
╚═══════════════════════════════════════════╝
```

## 🔒 Seguridad

### Beneficios de Seguridad:

1. **Previene acceso no autorizado**: Si el usuario deja la sesión abierta en un dispositivo público
2. **Limpia datos sensibles**: Elimina tokens y datos de localStorage
3. **Fuerza re-autenticación**: Después del tiempo límite, requiere credenciales nuevamente
4. **Protege en dispositivos compartidos**: Ideal para computadoras familiares o de trabajo

### Mejores Prácticas Implementadas:

- ✅ No almacena contraseñas
- ✅ Solo guarda username y rol
- ✅ Limpia localStorage al cerrar sesión
- ✅ Timestamps para validación de sesión
- ✅ Verificación continua de validez de sesión

## 🧪 Cómo Probar

### Prueba 1: Inactividad

1. Inicia sesión en la aplicación
2. Deja la aplicación sin tocar por 13 minutos
3. Deberías ver el modal de advertencia
4. Espera 2 minutos más sin hacer nada
5. La sesión se cierra automáticamente

### Prueba 2: Continuar Sesión

1. Inicia sesión
2. Espera 13 minutos
3. Cuando aparezca el modal, haz clic en "Continuar sesión"
4. La sesión se extiende otros 15 minutos

### Prueba 3: Cierre de Pestaña

1. Inicia sesión
2. Cierra la pestaña del navegador
3. Espera 20 minutos
4. Vuelve a abrir la aplicación
5. Deberías ser redirigido al login automáticamente

### Prueba 4: Cambio de Pestaña (Rápida)

1. Abre las DevTools del navegador (F12)
2. Ve a la consola y ejecuta:

```javascript
// Simular 16 minutos de inactividad
localStorage.setItem("lastActivity", (Date.now() - 16 * 60 * 1000).toString());
```

3. Cambia a otra pestaña y vuelve
4. Deberías ser cerrado automáticamente

## 📊 Valores Guardados en localStorage

```javascript
{
  "currentUser": {
    "username": "admin",
    "role": "admin",
    "displayName": "Administrador"
  },
  "lastActivity": "1696876543210" // Timestamp en milisegundos
}
```

## 🌐 Compatibilidad

- ✅ Desktop (Windows, macOS, Linux)
- ✅ Móvil (iOS, Android)
- ✅ Tablets
- ✅ Todos los navegadores modernos
- ✅ Funciona con eventos touch para móviles

## 🎯 Casos de Uso

### Ideal para:

- 📍 Oficinas con computadoras compartidas
- 🏠 Dispositivos familiares
- 📱 Aplicaciones móviles
- 🏢 Sistemas empresariales
- 🔐 Aplicaciones con datos sensibles

### Especialmente útil cuando:

- Usuario trabaja en un espacio público
- Computadora compartida entre varios usuarios
- Necesidad de cumplir con políticas de seguridad
- Prevención de acceso no autorizado

## 📝 Notas Adicionales

- **Throttling**: Las actualizaciones de actividad están limitadas a una cada 30 segundos para optimizar rendimiento
- **Batería**: En móviles, el sistema es eficiente con el consumo de batería
- **Red**: No requiere conexión a internet para funcionar
- **Offline**: Funciona completamente offline (sesión local)

## 🔄 Futuras Mejoras (Opcional)

Si deseas extender esta funcionalidad:

1. **Sesión en servidor**: Validar sesión contra un backend
2. **Múltiples dispositivos**: Sincronizar cierre de sesión entre dispositivos
3. **Configuración por usuario**: Permitir que cada usuario configure su timeout
4. **Alertas de audio**: Sonido cuando aparece el modal
5. **Estadísticas**: Registrar patrones de uso

---

## 🚀 ¡Listo para usar!

El sistema está completamente funcional y listo para proteger tu aplicación. Los usuarios ahora están protegidos contra accesos no autorizados cuando dejan su sesión abierta.
