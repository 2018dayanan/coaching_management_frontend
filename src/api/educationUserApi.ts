import { api } from "./axios";

const BASE_PATH = "/admin";


export type UserRole = "student" | "teacher";
export type UserGender = "male" | "female" | "other";
export type UserStatus = "active" | "inactive";

export type CreateUserBody = {
  name: string;
  email: string;
  mobile: string;
  password?: string;
  role: UserRole;
  gender: UserGender;
};

export type UpdateUserBody = {
  name?: string;
  mobile?: string;
  role?: UserRole;
  gender?: UserGender;
  date_of_birth?: string;
  profile_picture?: File;
};

export type GetAllUsersParams = {
  role?: UserRole;
  status?: UserStatus;
  search?: string;
  page?: number;
  limit?: number;
};


/**
 * POST /admin/users
 * Create a new user (student or teacher)
 */
const createUser = async (body: CreateUserBody) => {
  const { data } = await api.post(`${BASE_PATH}/users`, body, {
    headers: { "Content-Type": "application/json" },
  });
  return data.data;
};

/**
 * GET /admin/users?role=&status=&search=&page=&limit=
 * Get all users with optional filters
 */
const getAllEducationUsers = async (params: GetAllUsersParams = {}) => {
  const { data } = await api.get(`${BASE_PATH}/users`, { params });
  return data.data;
};

/**
 * GET /admin/users/:id
 * Get a single user by ID
 */
const getEducationUserById = async (id: string) => {
  const { data } = await api.get(`${BASE_PATH}/users/${id}`);
  return data.data;
};

/**
 * PATCH /admin/users/:id
 * Update user details. Sends FormData when a profile_picture file is included.
 */
const updateEducationUser = async (id: string, body: UpdateUserBody) => {
  if (body.profile_picture) {
    const formData = new FormData();
    (Object.keys(body) as (keyof UpdateUserBody)[]).forEach((key) => {
      const val = body[key];
      if (val !== undefined) {
        formData.append(key, val as string | Blob);
      }
    });
    const { data } = await api.patch(`${BASE_PATH}/users/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.data;
  }

  const { data } = await api.patch(`${BASE_PATH}/users/${id}`, body, {
    headers: { "Content-Type": "application/json" },
  });
  return data.data;
};

/**
 * PATCH /admin/users/status/:id
 * Update user status (active / inactive)
 * ⚡ Activating for the first time sends an activation email automatically.
 */
const updateEducationUserStatus = async (id: string, status: UserStatus) => {
  const { data } = await api.patch(
    `${BASE_PATH}/users/status/${id}`,
    { status },
    { headers: { "Content-Type": "application/json" } }
  );
  return data.data;
};

/**
 * DELETE /admin/users/:id
 * Soft-delete a user (sets is_deleted: true, status: inactive)
 */
const deleteEducationUser = async (id: string) => {
  const { data } = await api.delete(`${BASE_PATH}/users/${id}`);
  return data.data;
};

export {
  createUser,
  getAllEducationUsers,
  getEducationUserById,
  updateEducationUser,
  updateEducationUserStatus,
  deleteEducationUser,
};
