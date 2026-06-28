import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-pathname", nextUrl.pathname);

  const isAdminPath = nextUrl.pathname.startsWith("/admin");
  const isLoginPath = nextUrl.pathname.startsWith("/admin/login");
  const isMaintenancePage = nextUrl.pathname === "/maintenance";

  // 1. Maintenance Mode Check for Public Pages
  if (!isAdminPath && !nextUrl.pathname.startsWith("/api") && !isMaintenancePage) {
    try {
      const { data: settings } = await supabaseAdmin
        .from("website_settings")
        .select("maintenance_enabled, website_password_hash")
        .eq("id", "default")
        .single();

      if (settings?.maintenance_enabled) {
        const bypassCookie = req.cookies.get("whoknows_maintenance_bypass")?.value;
        const secret = process.env.AUTH_SECRET || "default_secret";
        const passwordHash = settings.website_password_hash || "";
        
        // Generate expected token
        const msgUint8 = new TextEncoder().encode(passwordHash + secret);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const expectedToken = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

        if (bypassCookie !== expectedToken) {
          return NextResponse.redirect(new URL("/maintenance", nextUrl));
        }
      }
    } catch (err) {
      console.error("Middleware maintenance check error:", err);
    }
  }

  // 2. Admin Auth Protection
  if (isAdminPath) {
    // If not logged in and trying to access any admin page (except login), redirect to login
    if (!isLoginPath && !isLoggedIn) {
       return NextResponse.redirect(new URL("/admin/login", nextUrl));
    }

    // If logged in and trying to access login, redirect to dashboard
    if (isLoginPath && isLoggedIn) {
      return NextResponse.redirect(new URL("/admin", nextUrl));
    }

    // Role-based protection: non-admin users redirected to home
    // @ts-ignore
    if (isLoggedIn && req.auth?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/", nextUrl));
    }
  }
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - design (public assets folder)
     * - og-image.jpg (og image)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|design|og-image.jpg|Hero-optimized.webm).*)",
  ],
};
