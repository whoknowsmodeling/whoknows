import { auth } from "@/auth";
import { NextResponse } from "next/server";



export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const isAdminPath = nextUrl.pathname.startsWith("/admin");
  const isLoginPath = nextUrl.pathname.startsWith("/admin/login");

  // If not logged in and trying to access any admin page (except login), redirect to login
  if (isAdminPath && !isLoginPath && !isLoggedIn) {
     return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }

  // If logged in and trying to access login, redirect to dashboard
  if (isLoginPath && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  // Role-based protection: non-admin users redirected to home
  // @ts-ignore
  if (isAdminPath && isLoggedIn && req.auth?.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/", nextUrl));
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
