"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type UserRole = "admin" | "guest" | null;

export interface User {
  username: string;
  role: UserRole;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
  isGuest: boolean;
  isAuthenticated: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canCreate: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS = {
  admin: {
    username: "admin",
    password: "admin123",
    role: "admin" as UserRole,
    displayName: "Administrador",
  },
  guest: {
    username: "invitado",
    password: null,
    role: "guest" as UserRole,
    displayName: "Invitado",
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Configuración: tiempo de inactividad en milisegundos (15 minutos)
  const INACTIVITY_TIMEOUT = 15 * 60 * 1000; // 15 minutos

  useEffect(() => {
    // Verificar si hay sesión guardada
    const savedUser = localStorage.getItem("currentUser");
    const savedTimestamp = localStorage.getItem("lastActivity");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        const lastActivityTime = savedTimestamp
          ? parseInt(savedTimestamp)
          : Date.now();
        const timeSinceLastActivity = Date.now() - lastActivityTime;

        // Si ha pasado más tiempo que el timeout, cerrar sesión
        if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("lastActivity");
          setUser(null);
        } else {
          setUser(parsedUser);
          setLastActivity(lastActivityTime);
        }
      } catch (error) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("lastActivity");
      }
    }
    setIsLoading(false);
  }, []);

  // Detectar actividad del usuario
  useEffect(() => {
    if (!user) return;

    const updateActivity = () => {
      const now = Date.now();
      setLastActivity(now);
      localStorage.setItem("lastActivity", now.toString());
    };

    // Eventos que indican actividad del usuario
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
      "click",
    ];

    // Throttle para evitar demasiadas actualizaciones
    let throttleTimer: NodeJS.Timeout | null = null;
    const throttledUpdate = () => {
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          updateActivity();
          throttleTimer = null;
        }, 30000); // Actualizar cada 30 segundos como máximo
      }
    };

    events.forEach((event) => {
      window.addEventListener(event, throttledUpdate);
    });

    // Verificar inactividad cada minuto
    const inactivityChecker = setInterval(() => {
      const timeSinceLastActivity = Date.now() - lastActivity;
      if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
        logout();
      }
    }, 60000); // Verificar cada minuto

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, throttledUpdate);
      });
      clearInterval(inactivityChecker);
      if (throttleTimer) clearTimeout(throttleTimer);
    };
  }, [user, lastActivity]);

  // Detectar cuando el usuario cierra la pestaña/ventana o cambia de pestaña
  useEffect(() => {
    if (!user) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Usuario cambió de pestaña, guardar timestamp
        localStorage.setItem("lastActivity", Date.now().toString());
      } else {
        // Usuario volvió, verificar si pasó mucho tiempo
        const savedTimestamp = localStorage.getItem("lastActivity");
        if (savedTimestamp) {
          const timeSinceLastActivity = Date.now() - parseInt(savedTimestamp);
          if (timeSinceLastActivity > INACTIVITY_TIMEOUT) {
            logout();
          }
        }
      }
    };

    const handleBeforeUnload = () => {
      // Guardar timestamp al cerrar
      localStorage.setItem("lastActivity", Date.now().toString());
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [user]);

  const login = (username: string, password?: string): boolean => {
    const normalizedUsername = username.toLowerCase().trim();
    const now = Date.now();

    if (normalizedUsername === "admin") {
      if (password === USERS.admin.password) {
        const userData: User = {
          username: USERS.admin.username,
          role: USERS.admin.role,
          displayName: USERS.admin.displayName,
        };
        setUser(userData);
        setLastActivity(now);
        localStorage.setItem("currentUser", JSON.stringify(userData));
        localStorage.setItem("lastActivity", now.toString());
        return true;
      }
      return false;
    }

    if (normalizedUsername === "invitado") {
      const userData: User = {
        username: USERS.guest.username,
        role: USERS.guest.role,
        displayName: USERS.guest.displayName,
      };
      setUser(userData);
      setLastActivity(now);
      localStorage.setItem("currentUser", JSON.stringify(userData));
      localStorage.setItem("lastActivity", now.toString());
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("lastActivity");
    setLastActivity(Date.now());
  };

  const isAdmin = user?.role === "admin";
  const isGuest = user?.role === "guest";
  const isAuthenticated = user !== null;
  const canEdit = isAdmin;
  const canDelete = isAdmin;
  const canCreate = isAdmin;

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAdmin,
        isGuest,
        isAuthenticated,
        canEdit,
        canDelete,
        canCreate,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
