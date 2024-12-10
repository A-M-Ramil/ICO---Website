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

/**
 * ei file er main kaj hcce user er login kora
 * ei file er moddhe amra login function use korsi
 * login function er moddhe amra zod use kore validation korsi je user ta asoleo valid kina
 * erpr amra signIn function use korsi jate user ta login kore
 * signIn function er moddhe credentials use kore email and password pass korsi
 * then redirectTo use kore user ta login korar por kothay redirect hobe seta pass korsi
 * erpr amra return korlam success true
 * erpr amra try catch use kore error handle korlam
 * jodi error AuthError hoy tahole amra switch use kore error handle korlam
 * jodi error CredentialsSignin hoy tahole amra return korlam Invalid credentials
 * jodi onno kono error hoy tahole amra return korlam An error occurred
 * jodi Autherror na hoy and unknown error hoi tahole amra throw korlam error a eta catch
 * block er vetor er kisu unknown case jeta hoite pare but
 * amra jani na tai oi diker sommsa o amra diye rakhlam jate sob
 * case e handle kora jai
 */
