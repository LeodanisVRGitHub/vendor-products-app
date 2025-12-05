import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

/**
 * Maneja errores de Prisma y retorna respuestas HTTP apropiadas
 * @param error - El error capturado
 * @returns NextResponse con el mensaje de error apropiado
 */
export function handlePrismaError(error: unknown): NextResponse {
  console.error("🔴 Error de Prisma:", error);

  // Errores conocidos de Prisma (PrismaClientKnownRequestError)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error("📋 Error code:", error.code);
    console.error("📋 Error meta:", error.meta);
    console.error("📋 Error message:", error.message);

    // P1001: No se puede conectar al servidor de BD
    if (error.code === "P1001") {
      return NextResponse.json(
        {
          error: "No se puede conectar a la base de datos",
          code: error.code,
          details:
            process.env.NODE_ENV === "development"
              ? "Verifica que DATABASE_URL esté configurada correctamente y que PostgreSQL esté accesible"
              : "Error de conexión a la base de datos",
        },
        { status: 503 }
      );
    }

    // P1002: El servidor de BD fue alcanzado pero expiró el tiempo
    if (error.code === "P1002") {
      return NextResponse.json(
        {
          error: "Timeout al conectar con la base de datos",
          code: error.code,
          details:
            process.env.NODE_ENV === "development"
              ? "La base de datos no responde en el tiempo esperado"
              : "Error de conexión a la base de datos",
        },
        { status: 503 }
      );
    }

    // P1003: La base de datos no existe
    if (error.code === "P1003") {
      return NextResponse.json(
        {
          error: "La base de datos no existe",
          code: error.code,
          details:
            process.env.NODE_ENV === "development"
              ? "Ejecuta 'npx prisma migrate deploy' para crear las tablas"
              : "Error de configuración de base de datos",
        },
        { status: 503 }
      );
    }

    // P1008: Las operaciones expiraron
    if (error.code === "P1008") {
      return NextResponse.json(
        {
          error: "Operación expiró",
          code: error.code,
          details:
            process.env.NODE_ENV === "development"
              ? "La consulta tomó demasiado tiempo en ejecutarse"
              : "Timeout en la operación",
        },
        { status: 503 }
      );
    }

    // P1017: El servidor cerró la conexión
    if (error.code === "P1017") {
      return NextResponse.json(
        {
          error: "Conexión cerrada por el servidor",
          code: error.code,
          details:
            process.env.NODE_ENV === "development"
              ? "La conexión a la base de datos fue cerrada inesperadamente"
              : "Error de conexión a la base de datos",
        },
        { status: 503 }
      );
    }

    // P2002: Violación de unique constraint
    if (error.code === "P2002") {
      const fields = error.meta?.target as string[] | undefined;
      const fieldNames = fields ? fields.join(", ") : "campo único";

      return NextResponse.json(
        {
          error: `Ya existe un registro con ese ${fieldNames}`,
          code: error.code,
          fields: fields,
        },
        { status: 409 }
      );
    }

    // P2003: Violación de foreign key constraint
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          error: "Referencia inválida a otro registro",
          code: error.code,
          details:
            process.env.NODE_ENV === "development"
              ? error.message
              : "El registro relacionado no existe",
        },
        { status: 400 }
      );
    }

    // P2021: La tabla no existe en la base de datos
    if (error.code === "P2021") {
      const tableName = error.meta?.table as string | undefined;
      return NextResponse.json(
        {
          error: "Las tablas de la base de datos no existen",
          code: error.code,
          table: tableName,
          details:
            process.env.NODE_ENV === "development"
              ? `Ejecuta 'npx prisma migrate deploy' para crear la tabla ${
                  tableName || "requerida"
                }`
              : "La base de datos necesita ser inicializada. Contacta al administrador.",
        },
        { status: 503 }
      );
    }

    // P2025: Registro no encontrado
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          error: "Registro no encontrado",
          code: error.code,
        },
        { status: 404 }
      );
    }

    // Otros errores conocidos de Prisma
    return NextResponse.json(
      {
        error: "Error en la operación de base de datos",
        code: error.code,
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 400 }
    );
  }

  // Error de inicialización de Prisma
  if (error instanceof Prisma.PrismaClientInitializationError) {
    console.error("🔴 Error de inicialización de Prisma:");
    console.error("📋 Error code:", error.errorCode);
    console.error("📋 Error message:", error.message);

    return NextResponse.json(
      {
        error: "Error al inicializar la conexión a la base de datos",
        code: error.errorCode,
        details:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Verifica la configuración de DATABASE_URL en las variables de entorno",
      },
      { status: 503 }
    );
  }

  // Error de validación de Prisma
  if (error instanceof Prisma.PrismaClientValidationError) {
    console.error("🔴 Error de validación de Prisma:");
    console.error("📋 Error message:", error.message);

    return NextResponse.json(
      {
        error: "Error de validación de datos",
        details:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Los datos proporcionados no son válidos",
      },
      { status: 400 }
    );
  }

  // Error de uso incorrecto de Prisma
  if (error instanceof Prisma.PrismaClientRustPanicError) {
    console.error("🔴 Error crítico de Prisma (Rust Panic):");
    console.error("📋 Error message:", error.message);

    return NextResponse.json(
      {
        error: "Error crítico en la base de datos",
        details:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Error interno del servidor",
      },
      { status: 500 }
    );
  }

  // Error genérico
  if (error instanceof Error) {
    console.error("🔴 Error stack:", error.stack);

    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Ocurrió un error inesperado",
      },
      { status: 500 }
    );
  }

  // Error desconocido
  console.error("🔴 Error desconocido:", error);

  return NextResponse.json(
    {
      error: "Error desconocido",
      details:
        process.env.NODE_ENV === "development"
          ? JSON.stringify(error)
          : "Ocurrió un error inesperado",
    },
    { status: 500 }
  );
}
