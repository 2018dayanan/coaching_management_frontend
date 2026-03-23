import { Toaster } from "@/components/ui/sonner";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/admin/Index";
import NotFound from "./pages/admin/NotFound";
import Users from "./pages/admin/users/Users";
import Batches from "./pages/admin/Batches";
import Classes from "./pages/admin/Classes";
import Security from "./pages/admin/Security";
import Settings from "./pages/admin/Settings";
import ModelProvider from "./providers/ModelProvider";
import SuperAdminLogin from "./pages/auth/login";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import { SidebarProvider } from "./components/ui/sidebar";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";
import AuthProvider from "./providers/AuthProvider";
import UserDetail from "./pages/admin/users/user_profile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ModelProvider />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth/login" element={<SuperAdminLogin />} />
            <Route element={<ProtectedRoute allowedRoles={["admin", "SUPER_ADMIN"]} />}>
              <Route path="/" element={<Navigate to={"/admin"} />} />
              <Route
                path="/admin"
                element={
                  <SidebarProvider>
                    <DashboardLayout />
                  </SidebarProvider>
                }
              >
                <Route index element={<Index />} />
                <Route path="users" element={<Users />} />
                <Route path="users/:id" element={<UserDetail />} />
                <Route path="batches" element={<Batches />} />
                <Route path="classes" element={<Classes />} />
                <Route path="security" element={<Security />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
