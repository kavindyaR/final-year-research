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

export const biometricFormSchema = z
  .object({
    height_m: z.coerce.number().min(1.0, "Must be provide valid height"),
    weight_kg: z.coerce.number().min(1, "Must be provide valid weight"),
    age: z.coerce.number().min(1, "Must be provide valid age"),
    gender: z.string(),
    blood_type: z.string(),
    marital_status: z.string(),
    occupation: z.string(),
    monthly_income: z.coerce.number().min(1, "Must be provide valid income"),
    base_premium: z.coerce
      .number()
      .min(1500, "This value cannot be less than 1500")
      .max(100000, "This value cannot be exceed than 100,000"),
    membership_months: z.coerce.number().min(1),
    habit: z.string(),
    // habit: z.preprocess((val) => val == "yes", z.boolean()),
  })
  .transform((data) => ({
    ...data,
    bmi: +(data.weight_kg / data.height_m ** 2).toFixed(2),
  }));
