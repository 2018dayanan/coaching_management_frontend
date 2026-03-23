import { useAuth } from "@/providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";
import FullscreenLoader from "../FullscreenLoader";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: any[] }) => {
  const { admin, isAuthenticated, loading } = useAuth();
  if (loading) {
    return <FullscreenLoader/>;
  }
  if (!isAuthenticated) {
    return <Navigate to={"/admin/auth/login"} replace />;
  }

  const isAllowedRole = !allowedRoles || allowedRoles.length === 0 || allowedRoles.includes(admin?.role);
  
  if (!isAllowedRole) {
    return <Navigate to={"/admin/auth/login"} replace />;
  }

  return <Outlet />;
};

export { ProtectedRoute };
