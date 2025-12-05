#!/usr/bin/env node

/**
 * Script para verificar y crear las tablas de la base de datos
 * Se ejecuta automáticamente antes de iniciar la aplicación
 */

const { execSync } = require("child_process");

console.log("🔍 Verificando estado de la base de datos...");

try {
  // Intentar generar el cliente de Prisma
  console.log("📦 Generando cliente de Prisma...");
  execSync("npx prisma generate", { stdio: "inherit" });

  // Intentar ejecutar las migraciones
  console.log("🗄️ Ejecutando migraciones...");
  execSync("npx prisma migrate deploy", { stdio: "inherit" });

  console.log("✅ Base de datos lista!");

  // Si SEED_DATABASE está en true, poblar la base de datos
  if (process.env.SEED_DATABASE === "true") {
    console.log("🌱 Poblando base de datos...");
    execSync("npm run seed", { stdio: "inherit" });
    console.log("✅ Base de datos poblada!");
  }

  process.exit(0);
} catch (error) {
  console.error("❌ Error al configurar la base de datos:", error.message);

  // No fallar el inicio de la app, solo advertir
  console.warn("⚠️ La aplicación se iniciará de todas formas...");
  console.warn("⚠️ Si ves errores P2021, contacta al administrador.");

  process.exit(0); // Salir con éxito para que la app pueda iniciar
}
