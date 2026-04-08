import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname } = request.nextUrl;
  const userRole = request.cookies.get("user_role")?.value;
  const userPhone = request.cookies.get("user_phone")?.value;

  const STAFF_SUBDOMAIN = "staff.ashur.alsadim.xyz";
  const MAIN_DOMAIN = "ashur.alsadim.xyz";
  const isStaffDomain = host === STAFF_SUBDOMAIN;

  // 1. ABSOLUTE PURGE & ROUTING LOGIC
  if (isStaffDomain) {
    // PURGE: If a STUDENT tries to use the Staff Subdomain, wipe their cookies and kick them to Main
    if (userRole === "student") {
        const response = NextResponse.redirect(new URL(`https://${MAIN_DOMAIN}${pathname}`, request.url));
        response.cookies.delete("user_role");
        response.cookies.delete("user_phone");
        response.cookies.delete("user_name");
        return response;
    }

    if (pathname === "/") {
      return NextResponse.rewrite(new URL("/staff", request.url));
    }
    
    // Block student paths on staff domain
    if (pathname.startsWith("/login") || pathname.startsWith("/register") || (pathname.startsWith("/dashboard") && !pathname.startsWith("/dashboard/manage"))) {
        return NextResponse.redirect(new URL(`https://${MAIN_DOMAIN}${pathname}`, request.url));
    }
  } else {
    // PURGE: If an ADMIN/STAFF tries to use the Main Domain, wipe their cookies and kick them to Subdomain
    if (userRole === "admin" || userRole === "management") {
        const response = NextResponse.redirect(new URL(`https://${STAFF_SUBDOMAIN}${pathname === "/" ? "" : pathname}`, request.url));
        response.cookies.delete("user_role");
        response.cookies.delete("user_phone");
        response.cookies.delete("user_name");
        return response;
    }

    // Hide staff paths on main domain
    if (pathname === "/staff" || pathname.startsWith("/management") || pathname.startsWith("/admins")) {
        return NextResponse.redirect(new URL(`https://${STAFF_SUBDOMAIN}${pathname}`, request.url));
    }
  }

  // 2. Prevent logged-in users from seeing login/register pages
  const authPaths = ["/login", "/register", "/staff"];
  if (authPaths.includes(pathname)) {
    if (userPhone && userRole) {
      if (userRole === "admin") return NextResponse.redirect(new URL("/admins", request.url));
      if (userRole === "management") return NextResponse.redirect(new URL("/management", request.url));
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 3. Protection for /admins (Admin Only)
  if (pathname.startsWith("/admins")) {
    if (!userPhone || userRole !== "admin") {
      const target = isStaffDomain ? "/" : `https://${STAFF_SUBDOMAIN}/`;
      return NextResponse.redirect(new URL(target, request.url));
    }
  }

  // 4. Protection for /dashboard (Student Only)
  if (pathname.startsWith("/dashboard")) {
    if (!userPhone) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // Student territory protection (Sanitary backup)
    if (userRole === "admin" || userRole === "management") {
        return NextResponse.redirect(new URL(`https://${STAFF_SUBDOMAIN}`, request.url));
    }
  }

  // 5. Protection for /management (Staff Only)
  if (pathname.startsWith("/management")) {
    if (!userPhone) {
      const target = isStaffDomain ? "/" : `https://${STAFF_SUBDOMAIN}/`;
      return NextResponse.redirect(new URL(target, request.url));
    }
    if (userRole === "student") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admins/:path*", "/dashboard/:path*", "/management/:path*", "/login", "/register", "/staff"],
};
