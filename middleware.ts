import { auth } from "@/auth";
import { NextResponse } from "next/server";

const protectedRoutes = ["/"];
const publicRoutes = ["/signup", "/login", "/api/auth"];

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const path = req.nextUrl.pathname;

  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));
  if (isPublicRoute) {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/api/auth/signin", req.nextUrl));
  }

  //allow the request to proceed
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
