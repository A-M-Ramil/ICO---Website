"use server";
import * as z from "zod";
import { loginSchema } from "../schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validation = loginSchema.safeParse(values);

  if (!validation.success) {
    return { error: "Invalid login details" };
  }

  const { email, password } = validation.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "An error occurred" };
      }
    }
    throw error;
  }
};
