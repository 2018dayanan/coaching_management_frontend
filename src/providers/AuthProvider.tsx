import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { type AdminLoginResponse, type LoggedUser } from "../api/educationAuthApi";
import { useNavigate } from "react-router-dom";

type Admin = LoggedUser;

type AuthContextType = {
  admin: Admin | null;
  isAuthenticated: boolean;
  login: (token: string, data: Admin) => void;
  logout: () => void;
  token: string | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [admin, setAdmin] = useState<Admin | null>(() => {
    const data = localStorage.getItem("adminData");
    try {
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  });

  const qc = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  const login = (newToken: string, adminData: Admin) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("adminData", JSON.stringify(adminData));
    setToken(newToken);
    setAdmin(adminData);
    qc.invalidateQueries({ queryKey: ["admin"] });
    
    // Role-based navigation
    if (adminData.role.toUpperCase() === "TEACHER") {
      navigate("/teacher/dashboard", { replace: true });
    } else {
      navigate("/admin", { replace: true });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminData");
    setToken(null);
    setAdmin(null);
    qc.clear();
    const isTeacherPortal = 
      window.location.pathname === "/auth/login" || 
      window.location.pathname === "/teacher/auth/login" || 
      window.location.pathname.startsWith("/teacher");
    navigate(isTeacherPortal ? "/auth/login" : "/admin/auth/login", { replace: true });
  };

  useEffect(() => {
    // Redirect logic: if tokens are present and we're at a login page, go to appropriate dashboard
    const loginPaths = ["/admin/auth/login", "/auth/login", "/teacher/auth/login"];
    if (token && admin && loginPaths.includes(window.location.pathname)) {
      if (admin.role.toUpperCase() === "TEACHER") {
        navigate("/teacher/dashboard", { replace: true });
      } else {
        navigate("/admin", { replace: true });
      }
    }
  }, [token, admin, navigate]);

  return (
    <AuthContext.Provider
      value={{
        admin,
        isAuthenticated: !!token,
        login,
        token,
        logout,
        loading: isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
