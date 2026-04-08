"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide Navbar on staff, admin, and dashboard routes
  const shouldHide =
    pathname.startsWith("/staff") ||
    pathname.startsWith("/admins") ||
    pathname.startsWith("/management") ||
    pathname.startsWith("/dashboard");

  if (shouldHide) return null;


  return <Navbar />;
}
