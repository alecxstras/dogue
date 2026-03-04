import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const protectedPaths = ["/upload", "/profile"];
      const isProtected = protectedPaths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );
      if (isProtected) return isLoggedIn;
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
