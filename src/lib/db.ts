import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configuración mejorada de Prisma con logging
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
    errorFormat: "pretty",
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Verificar conexión a la base de datos al inicializar
if (process.env.NODE_ENV === "production") {
  prisma
    .$connect()
    .then(() => {
      console.log("✅ Conexión a PostgreSQL establecida exitosamente");
    })
    .catch((error) => {
      console.error("❌ Error conectando a la base de datos:", error);
      console.error(
        "DATABASE_URL configurada:",
        process.env.DATABASE_URL ? "Sí" : "No"
      );
    });
}
