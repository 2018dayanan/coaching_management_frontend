import { api } from "./axios";

const BASE_PATH = "/admin";


export type BatchStatus = "active" | "completed";

export type CreateBatchBody = {
  name: string;
  subject: string;
  description?: string;
  teacher_id: string;
  start_date: string; 
  end_date: string;   
  status?: BatchStatus;
  enrolled_students?: string[];
};

export type UpdateBatchBody = {
  name?: string;
  subject?: string;
  description?: string;
  teacher_id?: string;
  start_date?: string;
  end_date?: string;
  status?: BatchStatus;
  enrolled_students?: string[];
};

export type GetAllBatchesParams = {
  status?: BatchStatus;
  search?: string;
  page?: number;
  limit?: number;
};


/**
 * POST /admin/batches
 * Create a new batch
 */
const createBatch = async (body: CreateBatchBody) => {
  const { data } = await api.post(`${BASE_PATH}/batches`, body, {
    headers: { "Content-Type": "application/json" },
  });
  return data.data;
};

/**
 * GET /admin/batches?status=&search=&page=&limit=
 * Get all batches with optional filters
 */
const getAllBatches = async (params: GetAllBatchesParams = {}) => {
  const { data } = await api.get(`${BASE_PATH}/batches`, { params });
  return data.data;
};

/**
 * GET /admin/batches/:id
 * Get a single batch by ID
 */
const getBatchById = async (id: string) => {
  const { data } = await api.get(`${BASE_PATH}/batches/${id}`);
  return data.data;
};

/**
 * PATCH /admin/batches/:id
 * Update batch details (all fields optional)
 */
const updateBatch = async (id: string, body: UpdateBatchBody) => {
  const { data } = await api.patch(`${BASE_PATH}/batches/${id}`, body, {
    headers: { "Content-Type": "application/json" },
  });
  return data.data;
};

/**
 * DELETE /admin/batches/:id
 * Delete a batch
 */
const deleteBatch = async (id: string) => {
  const { data } = await api.delete(`${BASE_PATH}/batches/${id}`);
  return data.data;
};

export { createBatch, getAllBatches, getBatchById, updateBatch, deleteBatch };
