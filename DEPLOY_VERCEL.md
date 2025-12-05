# Despliegue en Vercel — Guía Rápida

Esta guía contiene los pasos mínimos para desplegar esta aplicación en Vercel, añadir las variables necesarias y verificar que la integración con OpenAI use `gpt-5-mini`.

1. Conectar el repositorio a Vercel

- Crea o usa una cuenta en https://vercel.com
- En el dashboard crea un nuevo proyecto → Import Git Repository → selecciona tu repo (GitHub/GitLab)

2. Variables de entorno necesarias (añadir en Vercel Dashboard → Settings → Environment Variables)

- `OPENAI_API_KEY` = (tu clave de OpenAI)
- `OPENAI_MODEL` = `gpt-5-mini`
- `DATABASE_URL` o `POSTGRES_PRISMA_URL` = (cadena de conexión Postgres en producción)

Si usas Vercel Postgres, copia la variable que te provea Vercel y ponla en `POSTGRES_PRISMA_URL`.

3. Ajustes de build

- `Build Command`: `prisma generate && next build`
- `Install Command`: `npm install`
- `Framework`: Next.js (autodetectado)

4. Desplegar con CLI (si prefieres)

```
powershell
npm install -g vercel
vercel login
vercel --prod
```

5. Probar la ruta OpenAI añadida

- Localmente (con `OPENAI_API_KEY` en `.env.local`):

```
powershell
npm install
npm run dev
# En otra terminal:
curl -X POST http://localhost:3000/api/openai -H "Content-Type: application/json" -d "{\"messages\":[{\"role\":\"user\",\"content\":\"Hola, escribe un saludo breve en español.\"}]}"
```

6. Verificación en producción

- Añade las mismas variables en Vercel (Production + Preview según convenga).
- Realiza una petición POST a `https://<tu-proyecto>.vercel.app/api/openai` con el `messages` adecuado.

7. Notas de seguridad y costos

- No subas `OPENAI_API_KEY` a Git.
- Revisa facturación de OpenAI: llamar a `gpt-5-mini` tiene coste — controla uso y límites.

Si quieres, puedo generar un PR con este archivo (ya lo añadí localmente) y otras instrucciones adicionales (por ejemplo: crear workflows, o configurar protección de ramas).
