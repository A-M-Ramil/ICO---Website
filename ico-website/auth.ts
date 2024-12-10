import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Prisma from "@/backend/client/client";
import { getUserById } from "./utils/user";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      token.email = existingUser.email;

      return token;
    },
  },

  adapter: PrismaAdapter(Prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

/**
 * ei file e amra import korsi NextAuth from "next-auth"; jate amra auth function use korte pari
 * jeta auth js v5 a single function diye sob kaj kora jai
 * erpr amra import korsi authConfig from "./auth.config"; jate amra user logged in kina check kore dekhte pari
 * erpr amra import korsi PrismaAdapter from "@auth/prisma-adapter"; jate amra prisma adapter use korte pari
 *
 * erpr amra import korsi Prisma from "@/backend/client/client"; jate amra prisma use korte pari
 * jehetu amra edge side rendering use kori taile amk prisma kisu modify korte hbe and amra jdi
 * seta acheive korte chai then amdr documanetation follow korte hbe
 * follow kore amra session and middleware routes everything set kore rakhsi
 * then the authentication will acutally work
 * unless that the authentication will not work
 * also amra GET, POST, auth, signIn, signOut export kore rakhsi jate amra use korte pari
 * pore amra egula jekono exsisting file e import kore use korte pari
 * like kono file a amra signout button rakhte chai
 * amra just auth theke signOut import korbo then ekta button assign kor
 * then button e click korle user signout hobe
 * so this function is very useful
 */
