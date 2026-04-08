import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const runtime = 'experimental-edge';
export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isLoginRoute = req.nextUrl.pathname.startsWith("/admin/login");

  if (isLoginRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", req.nextUrl));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn && req.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  // @ts-ignore
  if (req.nextUrl.pathname.startsWith("/admin") && req.auth?.user?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
