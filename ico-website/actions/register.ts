"use server";
import prisma from "../backend/client/client";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { registerSchema } from "@/schemas";
import { getUserByEmail } from "@/utils/user";

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = values;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "User already exists" };
  }
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  return { success: "User created" };
};

/**
 * User registration function.
 *
 * @param values - User input values, validated against `registerSchema`.
 * @returns An object indicating success or error message.
 *
 * @description
 * Ei function ta user registration er jonno use hoy.
 * Prothome, input values `registerSchema` diye validate kora hoy.
 * Jodi validation fail kore, tahole "Invalid fields" error return kore.
 * Tarpor, email ar password input theke extract kora hoy.
 * Password ta hash kora hoy bcrypt use kore.
 * Email diye existing user check kora hoy.
 * Jodi user already exist kore, tahole "User already exists" error return kore.
 * Jodi user na thake, tahole new user create kora hoy database e.
 * Shesh e, "User created" success message return kore.
 *
 */
