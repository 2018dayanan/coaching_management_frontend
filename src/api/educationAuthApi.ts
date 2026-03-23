import { api } from "./axios";


export type AdminLoginBody = {
  email: string;
  password: string;
};

export type AdminLoginResponse = {
  status: boolean;
  token: string;
  admin: {
    id: string;
    name: string;
    username: string;
    email: string;
    role: string;
  };
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

export { loginEducationAdmin };
