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

/**
 * Ei file e amra amader loginSchema and registerSchema set kore rakhsi
 * jate amra user er input field validate korte pari
 * loginSchema e amra email and password validate korsi
 * email hocce string and email type hote hobe
 * password hocce string and minimum 1 character hote hobe
 * registerSchema e amra email, password and confirmPassword validate korsi
 * minimum password length 6 hote hobe
 * confirmPassword hocce password confirm korte hobe
 * jodi password and confirmPassword na match kore tahole error show korbe
 * jate user ta password confirm kore
 * */
