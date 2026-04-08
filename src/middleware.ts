import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userRole = request.cookies.get("user_role")?.value;
  const userPhone = request.cookies.get("user_phone")?.value;

  // 1. Protection for /admins (Admin Only)
  if (pathname.startsWith("/admins")) {
    if (!userPhone || userRole !== "admin") {
      return NextResponse.redirect(new URL("/staff", request.url));
    }
  }

  // 2. Protection for /dashboard/manage (Admin & Management Only)
  if (pathname.startsWith("/dashboard/manage")) {
    if (!userPhone || (userRole !== "admin" && userRole !== "management")) {
      return NextResponse.redirect(new URL("/staff", request.url));
    }
  }

  // 3. Protection for all other /dashboard routes (Any logged in user)
  if (pathname.startsWith("/dashboard") && !pathname.startsWith("/dashboard/manage")) {
    if (!userPhone) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

// Ensure middleware runs on relevant paths
export const config = {
  matcher: ["/admins/:path*", "/dashboard/:path*"],
};
