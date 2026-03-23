import { z } from "zod";

export const createBatchSchema = z.object({
  name: z.string().min(3, "Batch name must be at least 3 characters"),
  subject: z.string().min(2, "Subject is required"),
  description: z.string().optional().or(z.literal("")),
  teacher_id: z.string().min(1, "Please select an instructor"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  status: z.enum(["active", "completed"]).optional(),
  enrolled_students: z.array(z.string()).optional(),
});

export const updateBatchSchema = createBatchSchema.partial();

export type CreateBatchFormValues = z.infer<typeof createBatchSchema>;
export type UpdateBatchFormValues = z.infer<typeof updateBatchSchema>;
