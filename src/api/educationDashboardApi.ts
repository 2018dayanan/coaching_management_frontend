import { api } from "./axios";

export interface DashboardStats {
  total_students: number;
  total_teachers: number;
  total_batches: number;
  active_batches: number;
  total_classes: number;
  total_active_enrollments: number;
  total_tasks: number;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get("/admin/dashboard");
  return data.data;
};
