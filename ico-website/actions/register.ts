"use server";
import prisma from "../backend/client/client";
import bcrypt from "bcryptjs";

export async function register(formData: FormData) {
  const password = formData.get("password");

  if (typeof password !== "string") {
    throw new Error("Password must be a valid string.");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.user.create({
    data: {
      email: formData.get("email") as string,
      password: hashedPassword,
    },
  });
}
