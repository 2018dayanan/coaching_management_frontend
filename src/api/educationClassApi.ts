import { api } from "./axios";

const BASE_PATH = "/admin";


export type CreateClassBody = {
  title: string;      
  subject?: string;
  batch_id: string;    
  class_date: string;  
  class_time: string;  
  meeting_link?: string;
  teacher_id?: string;
};

export type UpdateClassBody = {
  title?: string;
  subject?: string;
  batch_id?: string;
  class_date?: string;
  class_time?: string;
  meeting_link?: string;
  teacher_id?: string;
};

export type GetAllClassesParams = {
  batch_id?: string;
  teacher_id?: string;
  search?: string;
  page?: number;
  limit?: number;
};


/**
 * POST /admin/classes
 * Create a new class
 * Required: title, batch_id, class_date, class_time
 */
const createClass = async (body: CreateClassBody) => {
  const { data } = await api.post(`${BASE_PATH}/classes`, body, {
    headers: { "Content-Type": "application/json" },
  });
  return data.data;
};

/**
 * GET /admin/classes?batch_id=&teacher_id=&search=&page=&limit=
 * Get all classes with optional filters
 */
const getAllClasses = async (params: GetAllClassesParams = {}) => {
  const { data } = await api.get(`${BASE_PATH}/classes`, { params });
  return data.data;
};

/**
 * GET /admin/classes/:id
 * Get a single class by ID
 */
const getClassById = async (id: string) => {
  const { data } = await api.get(`${BASE_PATH}/classes/${id}`);
  return data.data;
};

/**
 * GET /admin/classes/teacher/:teacher_id
 * Get all classes for a specific teacher
 */
const getClassesByTeacher = async (teacherId: string) => {
  const { data } = await api.get(`${BASE_PATH}/classes/teacher/${teacherId}`);
  return data.data;
};

/**
 * PATCH /admin/classes/:id
 * Update class details (all fields optional)
 */
const updateClass = async (id: string, body: UpdateClassBody) => {
  const { data } = await api.patch(`${BASE_PATH}/classes/${id}`, body, {
    headers: { "Content-Type": "application/json" },
  });
  return data.data;
};

/**
 * DELETE /admin/classes/:id
 * Delete a class
 */
const deleteClass = async (id: string) => {
  const { data } = await api.delete(`${BASE_PATH}/classes/${id}`);
  return data.data;
};

export {
  createClass,
  getAllClasses,
  getClassById,
  getClassesByTeacher,
  updateClass,
  deleteClass,
};
