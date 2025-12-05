"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Store,
  Package,
  BarChart3,
  Home,
  Languages,
  LogOut,
  User,
  Shield,
  Eye,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout, isAdmin, isGuest } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const links = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/dashboard", label: t("nav.dashboard"), icon: BarChart3 },
    { href: "/vendors", label: t("nav.vendors"), icon: Store },
    { href: "/products", label: t("nav.products"), icon: Package },
  ];

  return (
    <nav className="bg-slate-900 shadow-lg sticky top-0 z-30 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Store className="text-white" size={24} />
              </motion.div>
              <span className="text-xl font-bold text-white">
                Ventas y Compras Leo
              </span>
            </Link>

            <div className="hidden md:flex space-x-1">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-lg"
                          : "text-slate-300 hover:bg-slate-800"
                      }`}>
                      <Icon size={18} />
                      <span className="font-medium">{link.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* User Info */}
            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isAdmin
                    ? "bg-gradient-to-r from-blue-500 to-purple-600"
                    : "bg-gradient-to-r from-green-500 to-emerald-600"
                }`}>
                {isAdmin ? (
                  <Shield size={16} className="text-white" />
                ) : (
                  <Eye size={16} className="text-white" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">{t("Usuario")}</span>
                <span className="text-sm font-semibold text-white">
                  {user?.displayName}
                </span>
              </div>
              {isGuest && (
                <span className="ml-2 px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-md border border-yellow-500/30">
                  {t("Solo lectura")}
                </span>
              )}
            </div>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLanguage(language === "en" ? "es" : "en")}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
              title={language === "en" ? "Español" : "English"}>
              <Languages size={20} />
            </motion.button>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all"
              title={t("Cerrar sesión")}>
              <LogOut size={18} />
              <span className="font-medium">{t("Salir")}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-slate-700">
        {/* User Info Mobile */}
        <div className="px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isAdmin
                    ? "bg-gradient-to-r from-blue-500 to-purple-600"
                    : "bg-gradient-to-r from-green-500 to-emerald-600"
                }`}>
                {isAdmin ? (
                  <Shield size={16} className="text-white" />
                ) : (
                  <Eye size={16} className="text-white" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">{t("Usuario")}</span>
                <span className="text-sm font-semibold text-white">
                  {user?.displayName}
                </span>
              </div>
              {isGuest && (
                <span className="ml-2 px-2 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-md border border-yellow-500/30">
                  {t("Solo lectura")}
                </span>
              )}
            </div>
            {/* Logout Button Mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-all"
              title={t("Cerrar sesión")}>
              <LogOut size={16} />
              <span className="text-sm font-medium">{t("Salir")}</span>
            </motion.button>
          </div>
        </div>

        {/* Navigation Links Mobile */}
        <div className="flex justify-around py-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className="flex-1">
                <div
                  className={`flex flex-col items-center space-y-1 py-2 ${
                    isActive ? "text-blue-500" : "text-slate-400"
                  }`}>
                  <Icon size={20} />
                  <span className="text-xs font-medium">{link.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
