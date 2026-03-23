import { api } from "./axios";


export type AdminLoginBody = {
  email: string;
  password: string;
};

export type LoggedUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
};

export type AdminLoginResponse = {
  status: boolean;
  token: string;
  admin?: LoggedUser;
  teacher?: LoggedUser;
  user?: LoggedUser;
  message?: string;
};

export type AdminProfile = {
  _id: string;
  name: string;
  role: string;
  username: string;
  email: string;
  phone: number;
  createdAt: string;
  updatedAt: string;
};

const loginEducationAdmin = async (
  body: AdminLoginBody
): Promise<AdminLoginResponse> => {
  const { data } = await api.post<AdminLoginResponse>("/admin/auth/login", body, {
    headers: { "Content-Type": "application/json" },
  });
  // Persist token for subsequent requests
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

/**
 * POST /teacher/auth/login
 * Authenticate a teacher
 */
const loginEducationTeacher = async (
  body: AdminLoginBody
): Promise<AdminLoginResponse> => {
  const { data } = await api.post<AdminLoginResponse>("/auth/login", body, {
    headers: { "Content-Type": "application/json" },
  });
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  return data;
};

/**
 * GET /admin/auth/profile
 * Fetch the authenticated admin's profile
 */
const getAdminProfile = async (): Promise<AdminProfile> => {
  const { data } = await api.get("/admin/auth/profile");
  return data.data;
};

export { loginEducationAdmin, loginEducationTeacher, getAdminProfile };

