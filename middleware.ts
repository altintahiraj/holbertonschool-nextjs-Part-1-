import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

// Use edge-compatible config for middleware (no DB/mysql2 imports)
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
