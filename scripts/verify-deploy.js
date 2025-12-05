#!/usr/bin/env node

/**
 * Script de verificación pre-despliegue
 * Verifica que todos los requisitos estén cumplidos antes de desplegar en Render
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Verificando requisitos para despliegue en Render...\n");

let errors = 0;
let warnings = 0;

// Verificar que existan archivos necesarios
const requiredFiles = [
  "package.json",
  "prisma/schema.prisma",
  "prisma/migrations/migration_lock.toml",
  "render.yaml",
  ".gitignore",
];

console.log("📁 Verificando archivos requeridos...");
requiredFiles.forEach((file) => {
  if (fs.existsSync(path.join(__dirname, "..", file))) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - NO ENCONTRADO`);
    errors++;
  }
});

// Verificar package.json
console.log("\n📦 Verificando package.json...");
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "..", "package.json"), "utf8")
);

// Verificar scripts necesarios
const requiredScripts = ["build", "start"];
requiredScripts.forEach((script) => {
  if (packageJson.scripts && packageJson.scripts[script]) {
    console.log(`  ✅ Script "${script}" encontrado`);
  } else {
    console.log(`  ❌ Script "${script}" faltante`);
    errors++;
  }
});

// Verificar dependencias críticas
const requiredDeps = ["next", "react", "react-dom", "@prisma/client", "prisma"];
requiredDeps.forEach((dep) => {
  if (packageJson.dependencies && packageJson.dependencies[dep]) {
    console.log(`  ✅ Dependencia "${dep}" encontrada`);
  } else {
    console.log(`  ❌ Dependencia "${dep}" faltante`);
    errors++;
  }
});

// Verificar Prisma schema
console.log("\n🗄️ Verificando schema de Prisma...");
const schemaContent = fs.readFileSync(
  path.join(__dirname, "..", "prisma", "schema.prisma"),
  "utf8"
);

if (schemaContent.includes('provider = "postgresql"')) {
  console.log("  ✅ Provider configurado como PostgreSQL");
} else if (schemaContent.includes('provider = "sqlite"')) {
  console.log(
    "  ⚠️  Provider configurado como SQLite - cámbialo a PostgreSQL para producción"
  );
  warnings++;
} else {
  console.log("  ❌ Provider no encontrado en schema.prisma");
  errors++;
}

if (schemaContent.includes('env("DATABASE_URL")')) {
  console.log("  ✅ DATABASE_URL configurada en schema");
} else {
  console.log("  ❌ DATABASE_URL no configurada en schema");
  errors++;
}

// Verificar migraciones
console.log("\n🔄 Verificando migraciones...");
const migrationsPath = path.join(__dirname, "..", "prisma", "migrations");
if (fs.existsSync(migrationsPath)) {
  const migrations = fs
    .readdirSync(migrationsPath)
    .filter((f) => fs.statSync(path.join(migrationsPath, f)).isDirectory());
  if (migrations.length > 0) {
    console.log(`  ✅ ${migrations.length} migración(es) encontrada(s)`);
  } else {
    console.log("  ⚠️  No se encontraron migraciones");
    warnings++;
  }
} else {
  console.log("  ⚠️  Carpeta de migraciones no existe");
  warnings++;
}

// Verificar render.yaml
console.log("\n🚀 Verificando configuración de Render...");
const renderYaml = fs.readFileSync(
  path.join(__dirname, "..", "render.yaml"),
  "utf8"
);

if (renderYaml.includes("type: web")) {
  console.log("  ✅ Tipo de servicio web configurado");
} else {
  console.log("  ❌ Tipo de servicio no configurado en render.yaml");
  errors++;
}

if (renderYaml.includes("buildCommand:")) {
  console.log("  ✅ Build command configurado");
} else {
  console.log("  ❌ Build command no configurado");
  errors++;
}

if (renderYaml.includes("startCommand:")) {
  console.log("  ✅ Start command configurado");
} else {
  console.log("  ❌ Start command no configurado");
  errors++;
}

if (renderYaml.includes("DATABASE_URL")) {
  console.log("  ✅ DATABASE_URL en variables de entorno");
} else {
  console.log(
    "  ⚠️  DATABASE_URL no configurada en render.yaml (deberás configurarla manualmente)"
  );
  warnings++;
}

// Verificar .gitignore
console.log("\n🔒 Verificando .gitignore...");
const gitignoreContent = fs.readFileSync(
  path.join(__dirname, "..", ".gitignore"),
  "utf8"
);

const shouldIgnore = [".env", "node_modules", ".next"];
shouldIgnore.forEach((pattern) => {
  if (gitignoreContent.includes(pattern)) {
    console.log(`  ✅ "${pattern}" en .gitignore`);
  } else {
    console.log(`  ⚠️  "${pattern}" no está en .gitignore`);
    warnings++;
  }
});

// Verificar que no haya .env en el repo
if (fs.existsSync(path.join(__dirname, "..", ".env"))) {
  console.log("  ⚠️  Archivo .env encontrado - asegúrate de NO subirlo a Git");
  warnings++;
}

// Resumen final
console.log("\n" + "=".repeat(60));
console.log("📊 RESUMEN DE VERIFICACIÓN");
console.log("=".repeat(60));

if (errors === 0 && warnings === 0) {
  console.log("✅ ¡Todo está listo para desplegar en Render!");
  console.log("\n📚 Próximos pasos:");
  console.log("  1. Sube tu código a GitHub/GitLab");
  console.log("  2. Sigue la guía: QUICK_DEPLOY_RENDER.md");
  console.log("  3. Crea tu base de datos PostgreSQL en Render");
  console.log("  4. Despliega tu aplicación");
  process.exit(0);
} else {
  if (errors > 0) {
    console.log(
      `❌ ${errors} error(es) encontrado(s) - DEBE corregir antes de desplegar`
    );
  }
  if (warnings > 0) {
    console.log(`⚠️  ${warnings} advertencia(s) - Revisa pero no bloqueante`);
  }
  console.log("\n🔧 Corrige los errores y vuelve a ejecutar este script.");
  process.exit(errors > 0 ? 1 : 0);
}
