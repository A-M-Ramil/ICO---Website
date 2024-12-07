"use server";
import * as z from "zod";
import { loginSchema } from "../schemas";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validation = loginSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid login details" };
  }

  return { success: "Login successful" };
};
