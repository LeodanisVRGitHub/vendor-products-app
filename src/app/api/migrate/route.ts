import { NextRequest, NextResponse } from "next/server";
import { execSync } from "child_process";

/**
 * ENDPOINT TEMPORAL PARA EJECUTAR MIGRACIONES
 *
 * ⚠️ IMPORTANTE: Este endpoint debe ser ELIMINADO después de usarlo
 * ya que permite ejecutar comandos en el servidor.
 *
 * USO:
 * 1. Deploy este archivo
 * 2. Visita: https://tu-app.onrender.com/api/migrate
 * 3. Las migraciones se ejecutarán automáticamente
 * 4. ELIMINA este archivo después de usarlo
 */

// Clave secreta para proteger el endpoint (cámbiala por una única)
const SECRET_KEY =
  process.env.MIGRATION_SECRET || "cambiar-esto-por-algo-seguro-123";

export async function POST(request: NextRequest) {
  try {
    // Verificar clave secreta
    const { secret } = await request.json();

    if (secret !== SECRET_KEY) {
      return NextResponse.json(
        { error: "Acceso no autorizado" },
        { status: 403 }
      );
    }

    console.log("🔧 Ejecutando migraciones desde endpoint temporal...");

    const results = {
      generate: "",
      migrate: "",
      seed: "",
    };

    try {
      // 1. Generar cliente de Prisma
      console.log("📦 Generando cliente de Prisma...");
      results.generate = execSync("npx prisma generate", {
        encoding: "utf-8",
        stdio: "pipe",
      });
      console.log("✅ Cliente generado");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      console.error("❌ Error generando cliente:", errorMessage);
      results.generate = `Error: ${errorMessage}`;
    }

    try {
      // 2. Ejecutar migraciones
      console.log("🗄️ Ejecutando migraciones...");
      results.migrate = execSync("npx prisma migrate deploy", {
        encoding: "utf-8",
        stdio: "pipe",
      });
      console.log("✅ Migraciones completadas");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      console.error("❌ Error en migraciones:", errorMessage);
      results.migrate = `Error: ${errorMessage}`;
    }

    try {
      // 3. Poblar base de datos (opcional)
      if (process.env.SEED_DATABASE === "true") {
        console.log("🌱 Poblando base de datos...");
        results.seed = execSync("npm run seed", {
          encoding: "utf-8",
          stdio: "pipe",
        });
        console.log("✅ Base de datos poblada");
      } else {
        results.seed = "Omitido (SEED_DATABASE no es true)";
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Error desconocido";
      console.error("❌ Error poblando BD:", errorMessage);
      results.seed = `Error: ${errorMessage}`;
    }

    return NextResponse.json(
      {
        success: true,
        message: "✅ Migraciones ejecutadas exitosamente",
        results,
        warning:
          "⚠️ IMPORTANTE: Elimina este endpoint (/api/migrate) después de usarlo por seguridad",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error general:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}

// También permitir GET para facilitar el uso desde el navegador
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== SECRET_KEY) {
    return NextResponse.json(
      {
        error: "Acceso no autorizado",
        hint: "Usa: /api/migrate?secret=TU_CLAVE_SECRETA",
      },
      { status: 403 }
    );
  }

  // Redirigir a POST
  return POST(request);
}
