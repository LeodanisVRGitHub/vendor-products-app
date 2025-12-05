"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "es";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.dashboard": "Dashboard",
    "nav.vendors": "Vendors",
    "nav.products": "Products",

    // Landing Page
    "landing.welcome": "Welcome to",
    "landing.subtitle": "Professional Vendor & Product Management System",
    "landing.description":
      "Streamline your business operations with powerful analytics, real-time tracking, and professional reporting tools.",
    "landing.getStarted": "Get Started",
    "landing.exploreFeatures": "Explore Features",
    "landing.fast": "Fast & Efficient",
    "landing.secure": "Secure",
    "landing.responsive": "Responsive",
    "landing.analytics": "Analytics",
    "landing.allDevices": "All Devices",
    "landing.realtime": "Real-time",
    "landing.typeSafe": "Type-Safe",

    // Features
    "features.title": "Powerful Features",
    "features.subtitle":
      "Everything you need to manage vendors and products efficiently",
    "features.vendorManagement": "Vendor Management",
    "features.vendorDesc":
      "Complete control over your vendor database with advanced search and filtering",
    "features.productInventory": "Product Inventory",
    "features.productDesc":
      "Track products, SKUs, pricing, and stock levels in real-time",
    "features.analyticsDashboard": "Analytics Dashboard",
    "features.analyticsDesc":
      "Interactive charts and reports with powerful data visualization",
    "features.pdfExport": "PDF Export",
    "features.pdfDesc": "Generate professional PDF reports with one click",
    "features.realtimeStats": "Real-time Stats",
    "features.realtimeDesc":
      "Monitor inventory value, product counts, and vendor performance",
    "features.fullyResponsive": "Fully Responsive",
    "features.responsiveDesc":
      "Works seamlessly on desktop, tablet, and mobile devices",

    // Benefits
    "benefits.title": "Why Choose Ventas y Compras Leo?",
    "benefits.subtitle":
      "Built with modern technologies for optimal performance",
    "benefits.1": "Complete CRUD operations for vendors and products",
    "benefits.2": "Advanced filtering and search capabilities",
    "benefits.3": "Interactive data visualization with charts",
    "benefits.4": "Dark and Light theme support",
    "benefits.5": "Export reports to PDF format",
    "benefits.6": "Mobile-first responsive design",
    "benefits.7": "Real-time inventory tracking",
    "benefits.8": "Professional UI with smooth animations",

    // CTA
    "cta.title": "Ready to Get Started?",
    "cta.subtitle":
      "Start managing your vendors and products more efficiently today",
    "cta.launch": "Launch Dashboard",

    // Footer
    "footer.builtWith": "Built with ❤️ using Next.js, Prisma, and Tailwind CSS",
    "footer.rights": "© 2025 Ventas y Compras Leo. All rights reserved.",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Overview of vendors, products, and sales analytics",
    "dashboard.filters": "Filters",
    "dashboard.startDate": "Start Date",
    "dashboard.endDate": "End Date",
    "dashboard.vendor": "Vendor",
    "dashboard.category": "Category",
    "dashboard.status": "Status",
    "dashboard.applyFilters": "Apply Filters",
    "dashboard.exportPDF": "Export PDF",
    "dashboard.totalProducts": "Total Products",
    "dashboard.totalVendors": "Total Vendors",
    "dashboard.inventoryValue": "Inventory Value",
    "dashboard.categories": "Categories",
    "dashboard.productsByCategory": "Products by Category",
    "dashboard.productsByStatus": "Products by Status",
    "dashboard.productsByVendor": "Products by Vendor",
    "dashboard.recentProducts": "Recent Products",
    "dashboard.allVendors": "All Vendors",
    "dashboard.allStatus": "All Status",
    "dashboard.available": "Available",
    "dashboard.outOfStock": "Out of Stock",
    "dashboard.discontinued": "Discontinued",
    "dashboard.filterByCategory": "Filter by category",
    "dashboard.name": "Name",
    "dashboard.price": "Price",
    "dashboard.stock": "Stock",
    "dashboard.products": "Products",
    "dashboard.value": "Value",

    // Vendors
    "vendors.title": "Vendors",
    "vendors.subtitle": "Manage your vendor database",
    "vendors.addVendor": "Add Vendor",
    "vendors.editVendor": "Edit Vendor",
    "vendors.search": "Search vendors...",
    "vendors.name": "Name",
    "vendors.email": "Email",
    "vendors.phone": "Phone",
    "vendors.address": "Address",
    "vendors.description": "Description",
    "vendors.status": "Status",
    "vendors.active": "Active",
    "vendors.inactive": "Inactive",
    "vendors.products": "Products",
    "vendors.deleteConfirm": "Are you sure you want to delete this vendor?",
    "vendors.allStatus": "All Status",

    // Products
    "products.title": "Products",
    "products.subtitle": "Manage your product inventory",
    "products.addProduct": "Add Product",
    "products.editProduct": "Edit Product",
    "products.search": "Search products...",
    "products.name": "Name",
    "products.category": "Category",
    "products.price": "Price",
    "products.stock": "Stock",
    "products.status": "Status",
    "products.sku": "SKU",
    "products.description": "Description",
    "products.vendor": "Vendor",
    "products.selectVendor": "Select Vendor",
    "products.categoryFilter": "Category filter",
    "products.available": "Available",
    "products.outOfStock": "Out of Stock",
    "products.discontinued": "Discontinued",
    "products.allStatus": "All Status",
    "products.allVendors": "All Vendors",
    "products.deleteConfirm": "Are you sure you want to delete this product?",

    // Common
    "common.cancel": "Cancel",
    "common.create": "Create",
    "common.update": "Update",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.search": "Search",
    "common.filters": "Filters",
    "common.noData": "No data available",
    "common.loading": "Loading...",
    "common.required": "Required",
    "common.optional": "Optional",

    // Auth & Login
    Bienvenido: "Welcome",
    "Selecciona tu tipo de usuario para continuar":
      "Select your user type to continue",
    "Tipo de Usuario": "User Type",
    Administrador: "Administrator",
    "Acceso completo al sistema": "Full system access",
    Invitado: "Guest",
    "Solo visualización": "View only",
    Contraseña: "Password",
    "Ingresa tu contraseña": "Enter your password",
    "Por favor selecciona un usuario": "Please select a user",
    "Contraseña incorrecta": "Incorrect password",
    "Ingresando...": "Logging in...",
    "Ingresar al Sistema": "Login to System",
    Usuario: "User",
    "Solo lectura": "Read only",
    "Modo claro": "Light mode",
    "Modo oscuro": "Dark mode",
    "Cerrar sesión": "Logout",
    Salir: "Logout",
    "Sistema de Gestión": "Management System",
    "Productos y Vendedores": "Products and Vendors",
    "Accede a tu cuenta para gestionar productos, vendedores y generar reportes profesionales.":
      "Access your account to manage products, vendors and generate professional reports.",
    "Gestión completa de inventario": "Complete inventory management",
    "Reportes y exportación a PDF": "Reports and PDF export",
    "Interfaz multiidioma": "Multi-language interface",
    "Todos los derechos reservados": "All rights reserved",
  },
  es: {
    // Navbar
    "nav.home": "Inicio",
    "nav.dashboard": "Panel",
    "nav.vendors": "Proveedores",
    "nav.products": "Productos",

    // Landing Page
    "landing.welcome": "Bienvenido a",
    "landing.subtitle":
      "Sistema Profesional de Gestión de Proveedores y Productos",
    "landing.description":
      "Optimiza tus operaciones comerciales con análisis potentes, seguimiento en tiempo real y herramientas de informes profesionales.",
    "landing.getStarted": "Comenzar",
    "landing.exploreFeatures": "Explorar Funciones",
    "landing.fast": "Rápido y Eficiente",
    "landing.secure": "Seguro",
    "landing.responsive": "Responsivo",
    "landing.analytics": "Análisis",
    "landing.allDevices": "Todos los Dispositivos",
    "landing.realtime": "Tiempo Real",
    "landing.typeSafe": "Tipado Seguro",

    // Features
    "features.title": "Funciones Potentes",
    "features.subtitle":
      "Todo lo que necesitas para gestionar proveedores y productos eficientemente",
    "features.vendorManagement": "Gestión de Proveedores",
    "features.vendorDesc":
      "Control completo sobre tu base de datos de proveedores con búsqueda y filtrado avanzados",
    "features.productInventory": "Inventario de Productos",
    "features.productDesc":
      "Rastrea productos, SKUs, precios y niveles de stock en tiempo real",
    "features.analyticsDashboard": "Panel de Análisis",
    "features.analyticsDesc":
      "Gráficos e informes interactivos con potente visualización de datos",
    "features.pdfExport": "Exportar PDF",
    "features.pdfDesc": "Genera informes PDF profesionales con un solo clic",
    "features.realtimeStats": "Estadísticas en Tiempo Real",
    "features.realtimeDesc":
      "Monitorea el valor del inventario, conteo de productos y rendimiento de proveedores",
    "features.fullyResponsive": "Totalmente Responsivo",
    "features.responsiveDesc":
      "Funciona perfectamente en escritorio, tablet y dispositivos móviles",

    // Benefits
    "benefits.title": "¿Por qué elegir Ventas y Compras Leo?",
    "benefits.subtitle":
      "Construido con tecnologías modernas para un rendimiento óptimo",
    "benefits.1": "Operaciones CRUD completas para proveedores y productos",
    "benefits.2": "Capacidades avanzadas de filtrado y búsqueda",
    "benefits.3": "Visualización interactiva de datos con gráficos",
    "benefits.4": "Soporte para tema oscuro y claro",
    "benefits.5": "Exportar informes a formato PDF",
    "benefits.6": "Diseño responsivo mobile-first",
    "benefits.7": "Seguimiento de inventario en tiempo real",
    "benefits.8": "UI profesional con animaciones suaves",

    // CTA
    "cta.title": "¿Listo para Comenzar?",
    "cta.subtitle":
      "Comienza a gestionar tus proveedores y productos de manera más eficiente hoy",
    "cta.launch": "Abrir Panel",

    // Footer
    "footer.builtWith":
      "Construido con ❤️ usando Next.js, Prisma y Tailwind CSS",
    "footer.rights":
      "© 2025 Ventas y Compras Leo. Todos los derechos reservados.",

    // Dashboard
    "dashboard.title": "Panel de Control",
    "dashboard.subtitle":
      "Resumen de proveedores, productos y análisis de ventas",
    "dashboard.filters": "Filtros",
    "dashboard.startDate": "Fecha Inicio",
    "dashboard.endDate": "Fecha Fin",
    "dashboard.vendor": "Proveedor",
    "dashboard.category": "Categoría",
    "dashboard.status": "Estado",
    "dashboard.applyFilters": "Aplicar Filtros",
    "dashboard.exportPDF": "Exportar PDF",
    "dashboard.totalProducts": "Total Productos",
    "dashboard.totalVendors": "Total Proveedores",
    "dashboard.inventoryValue": "Valor Inventario",
    "dashboard.categories": "Categorías",
    "dashboard.productsByCategory": "Productos por Categoría",
    "dashboard.productsByStatus": "Productos por Estado",
    "dashboard.productsByVendor": "Productos por Proveedor",
    "dashboard.recentProducts": "Productos Recientes",
    "dashboard.allVendors": "Todos los Proveedores",
    "dashboard.allStatus": "Todos los Estados",
    "dashboard.available": "Disponible",
    "dashboard.outOfStock": "Agotado",
    "dashboard.discontinued": "Descontinuado",
    "dashboard.filterByCategory": "Filtrar por categoría",
    "dashboard.name": "Nombre",
    "dashboard.price": "Precio",
    "dashboard.stock": "Stock",
    "dashboard.products": "Productos",
    "dashboard.value": "Valor",

    // Vendors
    "vendors.title": "Proveedores",
    "vendors.subtitle": "Gestiona tu base de datos de proveedores",
    "vendors.addVendor": "Agregar Proveedor",
    "vendors.editVendor": "Editar Proveedor",
    "vendors.search": "Buscar proveedores...",
    "vendors.name": "Nombre",
    "vendors.email": "Email",
    "vendors.phone": "Teléfono",
    "vendors.address": "Dirección",
    "vendors.description": "Descripción",
    "vendors.status": "Estado",
    "vendors.active": "Activo",
    "vendors.inactive": "Inactivo",
    "vendors.products": "Productos",
    "vendors.deleteConfirm":
      "¿Estás seguro de que quieres eliminar este proveedor?",
    "vendors.allStatus": "Todos los Estados",

    // Products
    "products.title": "Productos",
    "products.subtitle": "Gestiona tu inventario de productos",
    "products.addProduct": "Agregar Producto",
    "products.editProduct": "Editar Producto",
    "products.search": "Buscar productos...",
    "products.name": "Nombre",
    "products.category": "Categoría",
    "products.price": "Precio",
    "products.stock": "Stock",
    "products.status": "Estado",
    "products.sku": "SKU",
    "products.description": "Descripción",
    "products.vendor": "Proveedor",
    "products.selectVendor": "Seleccionar Proveedor",
    "products.categoryFilter": "Filtro por categoría",
    "products.available": "Disponible",
    "products.outOfStock": "Agotado",
    "products.discontinued": "Descontinuado",
    "products.allStatus": "Todos los Estados",
    "products.allVendors": "Todos los Proveedores",
    "products.deleteConfirm":
      "¿Estás seguro de que quieres eliminar este producto?",

    // Common
    "common.cancel": "Cancelar",
    "common.create": "Crear",
    "common.update": "Actualizar",
    "common.edit": "Editar",
    "common.delete": "Eliminar",
    "common.search": "Buscar",
    "common.filters": "Filtros",
    "common.noData": "No hay datos disponibles",
    "common.loading": "Cargando...",
    "common.required": "Requerido",
    "common.optional": "Opcional",

    // Auth & Login
    Bienvenido: "Bienvenido",
    "Selecciona tu tipo de usuario para continuar":
      "Selecciona tu tipo de usuario para continuar",
    "Tipo de Usuario": "Tipo de Usuario",
    Administrador: "Administrador",
    "Acceso completo al sistema": "Acceso completo al sistema",
    Invitado: "Invitado",
    "Solo visualización": "Solo visualización",
    Contraseña: "Contraseña",
    "Ingresa tu contraseña": "Ingresa tu contraseña",
    "Por favor selecciona un usuario": "Por favor selecciona un usuario",
    "Contraseña incorrecta": "Contraseña incorrecta",
    "Ingresando...": "Ingresando...",
    "Ingresar al Sistema": "Ingresar al Sistema",
    Usuario: "Usuario",
    "Solo lectura": "Solo lectura",
    "Modo claro": "Modo claro",
    "Modo oscuro": "Modo oscuro",
    "Cerrar sesión": "Cerrar sesión",
    Salir: "Salir",
    "Sistema de Gestión": "Sistema de Gestión",
    "Productos y Vendedores": "Productos y Vendedores",
    "Accede a tu cuenta para gestionar productos, vendedores y generar reportes profesionales.":
      "Accede a tu cuenta para gestionar productos, vendedores y generar reportes profesionales.",
    "Gestión completa de inventario": "Gestión completa de inventario",
    "Reportes y exportación a PDF": "Reportes y exportación a PDF",
    "Interfaz multiidioma": "Interfaz multiidioma",
    "Todos los derechos reservados": "Todos los derechos reservados",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es"); // Default to Spanish
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (mounted) {
      localStorage.setItem("language", lang);
    }
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  // Always provide the context, even during SSR
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
