"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock, LogOut } from "lucide-react";
import Button from "./Button";

export default function SessionTimeout() {
  const { isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const [showWarning, setShowWarning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  // Configuración: tiempo de inactividad en milisegundos (15 minutos)
  const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutos
  const WARNING_TIME = 2 * 60 * 1000; // Mostrar aviso 2 minutos antes

  useEffect(() => {
    if (!isAuthenticated) {
      setShowWarning(false);
      return;
    }

    const checkInactivity = () => {
      const lastActivity = localStorage.getItem("lastActivity");
      if (!lastActivity) return;

      const timeSinceLastActivity = Date.now() - parseInt(lastActivity);
      const remainingTime = INACTIVITY_TIMEOUT - timeSinceLastActivity;

      if (remainingTime <= WARNING_TIME && remainingTime > 0) {
        setShowWarning(true);
        setTimeLeft(Math.ceil(remainingTime / 1000));
      } else if (remainingTime <= 0) {
        handleLogout();
      } else {
        setShowWarning(false);
      }
    };

    const interval = setInterval(checkInactivity, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleStayLoggedIn = () => {
    const now = Date.now();
    localStorage.setItem("lastActivity", now.toString());
    setShowWarning(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
            <Clock className="text-yellow-600 dark:text-yellow-400" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {t("Sesión por expirar")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("Tu sesión está por terminar")}
            </p>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
            {t("Por inactividad, tu sesión se cerrará en:")}
          </p>
          <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 text-center">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleStayLoggedIn}
            variant="primary"
            className="flex-1">
            {t("Continuar sesión")}
          </Button>
          <Button
            onClick={handleLogout}
            variant="danger"
            className="flex items-center gap-2">
            <LogOut size={18} />
            {t("Salir")}
          </Button>
        </div>
      </div>
    </div>
  );
}
