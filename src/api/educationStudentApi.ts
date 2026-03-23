import { api } from "./axios";

const BASE_PATH = "/user";

// --- Types ---

export type StudentProfile = {
  _id: string;
  name: string;
  email: string;
  unique_id: string;
  profile_picture?: string;
  mobile?: string;
  gender?: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type UpdateProfileBody = {
  name?: string;
  mobile?: string;
  gender?: string;
  profile_picture?: File | string;
};

export type StudentTask = {
  _id: string;
  title: string;
  description: string;
  subject: string;
  batch_id: {
    _id: string;
    name: string;
  };
  assigned_date: string;
  due_date: string;
  attachment_url?: string;
  createdAt: string;
};

export type TaskSubmission = {
  _id: string;
  task_id: string;
  student_id: string;
  submission_text?: string;
  content_html?: string;
  attachments?: string[];
  review_status: "pending" | "reviewed";
  marks?: number;
  remark?: string;
  submitted_at: string;
  updatedAt: string;
};

export type SubmitTaskBody = {
  submission_text?: string;
  content_html?: string;
  attachments?: File[];
};

export type AcademicDetail = {
  _id: string;
  user_id: string;
  educationLevel: string;
  degreeName: string;
  boardOrUniversity: string;
  startYear: number;
  endYear?: number;
  isCurrentlyStudying: boolean;
  percentage?: number;
  documents?: string[];
  createdAt: string;
};

export type CreateAcademicBody = {
  educationLevel: string;
  degreeName: string;
  boardOrUniversity: string;
  startYear: number;
  endYear?: number;
  isCurrentlyStudying: boolean;
  percentage?: number;
  documents?: File[];
};

export type GuardianDetail = {
  _id: string;
  user_id: string;
  guardianName: string;
  guardianPhone: string;
  guardianRelationship: string;
  isPrimary: boolean;
};

export type Notification = {
  _id: string;
  title: string;
  message: string;
  is_read: boolean;
  createdAt: string;
};

export type EnrolledCourse = {
  _id: string;
  name: string;
  subject: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  teacher_id: {
    _id: string;
    name: string;
  };
};

// --- API Functions ---

// Profile Management
export const getMyProfile = async (): Promise<StudentProfile> => {
  const { data } = await api.get(`${BASE_PATH}/profile`);
  return data.data;
};

export const updateStudentProfile = async (body: FormData | UpdateProfileBody): Promise<any> => {
  const { data } = await api.patch(`${BASE_PATH}/profile`, body);
  return data;
};

// Task & Submissions
export const getMyTasks = async (): Promise<StudentTask[]> => {
  const { data } = await api.get(`${BASE_PATH}/tasks`);
  return data.data;
};

export const getTaskDetail = async (id: string): Promise<StudentTask> => {
  const { data } = await api.get(`${BASE_PATH}/tasks/${id}`);
  return data.data;
};

export const submitTask = async (taskId: string, body: FormData | SubmitTaskBody): Promise<any> => {
  const { data } = await api.post(`${BASE_PATH}/tasks/submit/${taskId}`, body);
  return data;
};

export const getMySubmission = async (taskId: string): Promise<TaskSubmission> => {
  const { data } = await api.get(`${BASE_PATH}/tasks/submission/${taskId}`);
  return data.data;
};

export const updateSubmission = async (taskId: string, body: FormData | Partial<SubmitTaskBody>): Promise<any> => {
  const { data } = await api.patch(`${BASE_PATH}/tasks/submission/${taskId}`, body);
  return data;
};

export const getMySubmissionsHistory = async (): Promise<TaskSubmission[]> => {
  const { data } = await api.get(`${BASE_PATH}/tasks/submissions`);
  return data.data;
};

// Academic Details
export const addAcademicDetail = async (body: FormData | CreateAcademicBody): Promise<any> => {
  const { data } = await api.post(`${BASE_PATH}/academic`, body);
  return data;
};

export const updateAcademicDetail = async (id: string, body: FormData | Partial<CreateAcademicBody>): Promise<any> => {
  const { data } = await api.patch(`${BASE_PATH}/academic/${id}`, body);
  return data;
};

export const getMyAcademicDetails = async (): Promise<AcademicDetail[]> => {
  const { data } = await api.get(`${BASE_PATH}/academic`);
  return data.data;
};

// Guardian Details
export const addGuardianDetail = async (body: any): Promise<any> => {
  const { data } = await api.post(`${BASE_PATH}/guardian`, body);
  return data;
};

export const getMyGuardianDetails = async (): Promise<GuardianDetail[]> => {
  const { data } = await api.get(`${BASE_PATH}/guardian`);
  return data.data;
};

// Notifications
export const getMyNotifications = async (): Promise<Notification[]> => {
  const { data } = await api.get(`${BASE_PATH}/notifications`);
  return data.data;
};

export const markNotificationAsRead = async (id: string): Promise<any> => {
  const { data } = await api.patch(`${BASE_PATH}/notifications/read/${id}`);
  return data;
};

export const markAllNotificationsAsRead = async (): Promise<any> => {
  const { data } = await api.patch(`${BASE_PATH}/notifications/read-all`);
  return data;
};

// Courses & Batches
export const getMyEnrolledCourses = async (): Promise<EnrolledCourse[]> => {
  const { data } = await api.get(`${BASE_PATH}/courses`);
  return data.data;
};
