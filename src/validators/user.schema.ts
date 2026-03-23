import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  password: z.string().min(8, "Password must be at least 8 characters").optional().or(z.literal("")),
  role: z.enum(["student", "teacher"], {
    message: "Please select a role",
  }),
  gender: z.enum(["male", "female", "other"], {
    message: "Please select a gender",
  }),
});

export const updateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits").optional(),
  role: z.enum(["student", "teacher"]).optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
