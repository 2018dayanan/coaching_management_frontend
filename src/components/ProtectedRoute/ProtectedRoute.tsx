import { useAuth } from "@/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import FullscreenLoader from "../FullscreenLoader";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: any[] }) => {
  const { admin, isAuthenticated, loading } = useAuth();
  if (loading) {
    return <FullscreenLoader/>;
  }
  if (!isAuthenticated) {
    const isTeacherRoute = window.location.pathname.startsWith("/teacher") || window.location.pathname === "/auth/login";
    return <Navigate to={isTeacherRoute ? "/auth/login" : "/admin/auth/login"} replace />;
  }

  const userRole = admin?.role?.toUpperCase();
  const isAllowedRole = !allowedRoles || allowedRoles.length === 0 || 
    allowedRoles.some(role => role.toUpperCase() === userRole);
  
  if (!isAllowedRole) {
    // If authenticated but unauthorized, send to their own portal
    return <Navigate to={userRole === "TEACHER" ? "/teacher/dashboard" : "/admin"} replace />;
  }

  return <Outlet />;
};

export { ProtectedRoute };
