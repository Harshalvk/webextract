import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/credentials",
  "/workflows",
  "/workflow",
];
const authRoutes = ["/auth/login", "/api/webhooks/stripe", "/"];

export const { auth } = NextAuth(authConfig);

export default async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isProtectedRoute = protectedRoutes.some(
    (route) =>
      nextUrl.pathname === route || nextUrl.pathname.startsWith(`${route}/`)
  );
  const isAuthRoute = authRoutes.some((route) => nextUrl.pathname === route);

  const session = await auth();

  if (!session && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [...protectedRoutes, ...authRoutes],
};
