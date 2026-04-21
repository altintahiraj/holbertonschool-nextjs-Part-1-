import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { query } from "@/lib/db";
import { authConfig } from "@/auth.config";

type DBUser = { id: string; email: string; name: string; password: string };

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = z
          .object({ email: z.string().email(), password: z.string().min(1) })
          .safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const rows = await query<DBUser>(
          "SELECT id, email, name, password FROM users WHERE email = ?",
          [email]
        );
        const user = rows[0];
        if (!user) return null;

        const match = await bcryptjs.compare(password, user.password);
        if (!match) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
});
