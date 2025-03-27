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
  basePremium: z.coerce
    .number()
    .min(1500, "This value cannot be less than 1500")
    .max(100000, "This value cannot be exceed than 100,000"),
  habit: z.preprocess((val) => val == "yes", z.boolean()),
  maritalStatus: z.string(),
});
