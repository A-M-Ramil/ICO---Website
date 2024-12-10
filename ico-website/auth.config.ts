import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./schemas";
import { getUserByEmail } from "./utils/user";
import bcrypt from "bcryptjs";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope: "openid email",
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = await loginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

/**
 * ei file er main kaj hcce credentials provider use kore user er login kora
 * like amr email and password diye login korar jonno ei file use kora hbe
 * ekhane Credentials provider ami age import korbo
 * then provider er moddhe async authorize function use korbo
 * authorize function er moddhe credentials pass kore validate korbo je asoleo user ta ache kina
 * erpr amr j existing loginSchema use kore credentials er data ta validate korbo
 * then email and password ta niye user er email diye user ta find korbo
 * then user er password ta bcrypt compare kore dekhbo je user er password ta match kore kina
 * then je user ta match kore se user ta return korbo
 * na hole null return korbo
 *ekhane getUserByEmail function use kora holo je user ta email diye find korbe eita written by me as onek jaigai use kora lage so utility func banai neoa hoice
 
  * then bcrypt.compare use kora holo je password ta match kore kina
  * 
 */
