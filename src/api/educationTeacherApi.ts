import { api } from "./axios";

const BASE_PATH = "/teacher";

// --- Types ---

export type EnrollStudentsBody = {
  batch_id: string;
  student_ids: string[];
};

export type EnrollmentResponse = {
  status: boolean;
  message: string;
  already_enrolled_count: number;
};

export type BatchStudent = {
  enrollment_id: string;
  enrollment_date: string;
  status: string;
  name: string;
  email: string;
  unique_id: string;
  profile_picture?: string;
  gender: string;
};

export type MyStudent = {
  _id: string;
  name: string;
  unique_id: string;
  profile_picture?: string;
  enrolled_batches: {
    enrollment_id: string;
    batch: { name: string; subject: string };
  }[];
};

export type StudentDetail = {
  student: any;
  enrolled_batches: any[];
  tasks_summary: { total: number; submitted: number; pending: number };
  tasks: {
    task_id: string;
    title: string;
    is_submitted: boolean;
    submission?: { marks: number; remark: string; review_status: string };
  }[];
};

export type Submission = {
  _id: string;
  student_id: { name: string; [key: string]: any };
  task_id: { title: string };
  file_url: string;
  submitted_at: string;
};

export type ReviewBody = {
  marks: number;
  remark: string;
};

export type CreateTaskBody = {
  title: string;
  description: string;
  subject: string;
  batch_id: string;
  assigned_date: string;
  due_date: string;
  attachment_url?: string;
};

export type Task = {
  _id: string;
  title: string;
  description: string;
  subject: string;
  batch_id: string | any;
  assigned_date: string;
  due_date: string;
  attachment_url?: string;
  createdAt: string;
};

// --- API Functions ---

// 🤝 Enrollment Management

export const enrollStudentsInBatch = async (body: EnrollStudentsBody): Promise<EnrollmentResponse> => {
  const { data } = await api.post(`${BASE_PATH}/enroll/students`, body);
  return data;
};

export const getStudentsByBatch = async (batchId: string): Promise<BatchStudent[]> => {
  const { data } = await api.get(`${BASE_PATH}/enroll/students/${batchId}`);
  return data.data;
};

// 🧑🎓 Student Management

export const getMyStudents = async (): Promise<MyStudent[]> => {
  const { data } = await api.get(`${BASE_PATH}/students`);
  return data.data;
};

export const getStudentDetail = async (studentId: string): Promise<StudentDetail> => {
  const { data } = await api.get(`${BASE_PATH}/students/${studentId}`);
  return data.data;
};

export const getTaskSubmissions = async (params: { task_id?: string; batch_id?: string } = {}): Promise<Submission[]> => {
  const { data } = await api.get(`${BASE_PATH}/students/submissions`, { params });
  return data.data;
};

export const reviewSubmission = async (submissionId: string, body: ReviewBody): Promise<any> => {
  const { data } = await api.patch(`${BASE_PATH}/students/submissions/review/${submissionId}`, body);
  return data;
};

// 📝 Task & Assignment Management

export const createTeacherTask = async (body: CreateTaskBody): Promise<any> => {
  const { data } = await api.post(`${BASE_PATH}/tasks`, body);
  return data;
};

export const getAllMyTasks = async (batchId?: string): Promise<Task[]> => {
  const params = batchId ? { batch_id: batchId } : {};
  const { data } = await api.get(`${BASE_PATH}/tasks`, { params });
  return data.data;
};

export const updateTeacherTask = async (id: string, body: Partial<CreateTaskBody>): Promise<any> => {
  const { data } = await api.patch(`${BASE_PATH}/tasks/${id}`, body);
  return data;
};

export const deleteTeacherTask = async (id: string): Promise<any> => {
  const { data } = await api.delete(`${BASE_PATH}/tasks/${id}`);
  return data;
};
