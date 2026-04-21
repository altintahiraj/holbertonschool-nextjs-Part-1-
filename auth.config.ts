import type { NextAuthConfig } from "next-auth";

// This config is edge-compatible (no Node.js built-ins like mysql2)
// Used only by middleware for JWT verification
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isUiRoute = nextUrl.pathname.startsWith("/ui");
      if (isUiRoute) return isLoggedIn;
      return true;
    },
  },
  providers: [], // No providers here - they're in auth.ts with DB access
};
