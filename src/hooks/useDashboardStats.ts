import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/api/educationDashboardApi";
import { useAuth } from "@/providers/AuthProvider";

export const useDashboardStats = () => {
  const { token } = useAuth();
  
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
    enabled: !!token,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
