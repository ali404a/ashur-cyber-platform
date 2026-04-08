import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRole = request.cookies.get("user_role")?.value;
  const userPhone = request.cookies.get("user_phone")?.value;

  // 1. Prevent logged-in users from seeing login/register pages
  const authPaths = ["/login", "/register", "/staff"];
  if (authPaths.includes(pathname)) {
    if (userPhone && userRole) {
      if (userRole === "admin") return NextResponse.redirect(new URL("/admins", request.url));
      if (userRole === "management") return NextResponse.redirect(new URL("/dashboard/manage", request.url));
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 2. Protection for /admins (Admin Only)
  if (pathname.startsWith("/admins")) {
    if (!userPhone || userRole !== "admin") {
      return NextResponse.redirect(new URL("/staff", request.url));
    }
  }

  // 3. Protection for /dashboard/manage (Admin & Management Only)
  if (pathname.startsWith("/dashboard/manage")) {
    if (!userPhone || (userRole !== "admin" && userRole !== "management")) {
      return NextResponse.redirect(new URL("/staff", request.url));
    }
  }

  // 4. Protection for student-only areas within /dashboard
  // Redirect staff and admins to their respective dashboards if they hit ANY student route
  if (pathname.startsWith("/dashboard") && !pathname.startsWith("/dashboard/manage")) {
    if (!userPhone) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    // Cross-role protection: If Staff/Admin is in student territory, push back to their zone
    if (userRole === "admin") return NextResponse.redirect(new URL("/admins", request.url));
    if (userRole === "management") return NextResponse.redirect(new URL("/dashboard/manage", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admins/:path*", "/dashboard/:path*", "/login", "/register", "/staff"],
};
