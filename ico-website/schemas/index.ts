import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string({ invalid_type_error: "Please enter a valid email address" })
    .email(),
  password: z.string().min(1, {
    message: "Please enter a valid password",
  }),
});

export const registerSchema = z
  .object({
    email: z
      .string({ invalid_type_error: "Please enter a valid email address" })
      .email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });
