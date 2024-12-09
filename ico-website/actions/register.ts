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
