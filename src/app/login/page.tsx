"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [selectedUser, setSelectedUser] = useState<"admin" | "guest" | null>(
    null
  );
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!selectedUser) {
      setError(t("Por favor selecciona un usuario"));
      setIsLoading(false);
      return;
    }

    // For guest user, no password is needed
    if (selectedUser === "guest") {
      const success = login("invitado");
      if (success) {
        router.push("/dashboard");
      }
      setIsLoading(false);
      return;
    }

    // For admin user, password is required
    const success = login(selectedUser, password);

    if (success) {
      router.push("/dashboard");
    } else {
      setError(t("Contraseña incorrecta"));
      setPassword("");
    }

    setIsLoading(false);
  };

  const handleUserSelect = (userType: "admin" | "guest") => {
    setSelectedUser(userType);
    setPassword("");
    setError("");
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      }`}>
      {/* Fondo animado */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-blue-500" : "bg-blue-300"
          }`}
          style={{ animation: "pulse 8s ease-in-out infinite" }}></div>
        <div
          className={`absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl opacity-20 ${
            isDark ? "bg-purple-500" : "bg-purple-300"
          }`}
          style={{ animation: "pulse 10s ease-in-out infinite" }}></div>
      </div>

      {/* Contenedor principal */}
      <div className="relative w-full max-w-5xl">
        <div
          className={`rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm ${
            isDark
              ? "bg-gray-800/80 border border-gray-700"
              : "bg-white/80 border border-white"
          }`}>
          <div className="grid md:grid-cols-2 gap-0">
            {/* Panel izquierdo - Información */}
            <div
              className={`p-12 flex flex-col justify-center ${
                isDark
                  ? "bg-gradient-to-br from-blue-600 to-purple-700"
                  : "bg-gradient-to-br from-blue-600 to-indigo-700"
              } text-white`}>
              <div className="space-y-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>

                <h1 className="text-4xl font-bold leading-tight">
                  {t("Sistema de Gestión")}
                  <br />
                  <span className="text-blue-200">
                    {t("Productos y Vendedores")}
                  </span>
                </h1>

                <p className="text-blue-100 text-lg">
                  {t(
                    "Accede a tu cuenta para gestionar productos, vendedores y generar reportes profesionales."
                  )}
                </p>

                <div className="space-y-3 pt-4">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{t("Gestión completa de inventario")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{t("Reportes y exportación a PDF")}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-6 h-6 mt-1 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{t("Interfaz multiidioma")}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel derecho - Login */}
            <div className="p-12">
              <div className="max-w-md mx-auto">
                <h2
                  className={`text-3xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-gray-800"
                  }`}>
                  {t("Bienvenido")}
                </h2>
                <p
                  className={`mb-8 ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}>
                  {t("Selecciona tu tipo de usuario para continuar")}
                </p>

                <form onSubmit={handleLogin} className="space-y-6">
                  {/* Selección de usuario */}
                  <div className="space-y-4">
                    <label
                      className={`block text-sm font-medium mb-3 ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      }`}>
                      {t("Tipo de Usuario")}
                    </label>

                    {/* Tarjeta Admin */}
                    <button
                      type="button"
                      onClick={() => handleUserSelect("admin")}
                      className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedUser === "admin"
                          ? isDark
                            ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                            : "border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20"
                          : isDark
                          ? "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300"
                      }`}>
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            selectedUser === "admin"
                              ? "bg-blue-500 text-white"
                              : isDark
                              ? "bg-gray-700 text-gray-400"
                              : "bg-gray-200 text-gray-600"
                          }`}>
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-semibold text-lg ${
                              isDark ? "text-white" : "text-gray-800"
                            }`}>
                            {t("Administrador")}
                          </h3>
                          <p
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}>
                            {t("Acceso completo al sistema")}
                          </p>
                        </div>
                        {selectedUser === "admin" && (
                          <svg
                            className="w-6 h-6 text-blue-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </button>

                    {/* Tarjeta Invitado */}
                    <button
                      type="button"
                      onClick={() => handleUserSelect("guest")}
                      className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedUser === "guest"
                          ? isDark
                            ? "border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20"
                            : "border-green-500 bg-green-50 shadow-lg shadow-green-500/20"
                          : isDark
                          ? "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300"
                      }`}>
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            selectedUser === "guest"
                              ? "bg-green-500 text-white"
                              : isDark
                              ? "bg-gray-700 text-gray-400"
                              : "bg-gray-200 text-gray-600"
                          }`}>
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-semibold text-lg ${
                              isDark ? "text-white" : "text-gray-800"
                            }`}>
                            {t("Invitado")}
                          </h3>
                          <p
                            className={`text-sm ${
                              isDark ? "text-gray-400" : "text-gray-600"
                            }`}>
                            {t("Solo visualización")}
                          </p>
                        </div>
                        {selectedUser === "guest" && (
                          <svg
                            className="w-6 h-6 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Campo de contraseña (solo para admin) */}
                  {selectedUser === "admin" && (
                    <div className="space-y-2">
                      <label
                        className={`block text-sm font-medium ${
                          isDark ? "text-gray-300" : "text-gray-700"
                        }`}>
                        {t("Contraseña")}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className={`w-full px-4 py-3 pr-14 sm:pr-12 rounded-xl border-2 transition-all duration-300 ${
                            isDark
                              ? "bg-gray-800 border-gray-700 text-white focus:border-blue-500 focus:bg-gray-750"
                              : "bg-white border-gray-200 text-gray-900 focus:border-blue-500 focus:bg-blue-50"
                          } focus:outline-none focus:ring-4 focus:ring-blue-500/20`}
                          placeholder={t("Ingresa tu contraseña")}
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className={`absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2.5 sm:p-2 rounded-lg transition-all duration-200 touch-manipulation ${
                            isDark
                              ? "hover:bg-gray-700 active:bg-gray-600 text-gray-400 hover:text-gray-200"
                              : "hover:bg-gray-100 active:bg-gray-200 text-gray-500 hover:text-gray-700"
                          }`}
                          title={
                            showPassword
                              ? t("Ocultar contraseña")
                              : t("Mostrar contraseña")
                          }
                          aria-label={
                            showPassword
                              ? t("Ocultar contraseña")
                              : t("Mostrar contraseña")
                          }>
                          {showPassword ? (
                            <EyeOff size={22} className="sm:w-5 sm:h-5" />
                          ) : (
                            <Eye size={22} className="sm:w-5 sm:h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Error */}
                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <p className="text-red-500 text-sm flex items-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        {error}
                      </p>
                    </div>
                  )}

                  {/* Botón de login */}
                  <button
                    type="submit"
                    disabled={!selectedUser || isLoading}
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                      !selectedUser || isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:scale-105 active:scale-95"
                    }`}>
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t("Ingresando...")}
                      </span>
                    ) : (
                      t("Ingresar al Sistema")
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            © 2025 {t("Sistema de Gestión")} -{" "}
            {t("Todos los derechos reservados")}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
