import { z } from "zod";

export const registerFormSchema = z
  .object({
    username: z.string().min(4, "Name must be at least 4 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const loginFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const biometricFormSchema = z.object({
  height: z.coerce.number().min(1, "Must be provide valid height"),
  weight: z.coerce.number().min(1, "Must be provide valid weight"),
  bloodType: z.string(),
  salaryRange: z.string(),
});
