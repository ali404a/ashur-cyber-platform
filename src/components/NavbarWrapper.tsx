"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide Navbar on /staff, /dashboard/admin, and /dashboard/manage to maintain focus
  const hidePaths = ["/staff", "/dashboard/admin", "/dashboard/manage", "/staff/genesis-activate"];
  
  if (hidePaths.includes(pathname) || pathname.startsWith("/dashboard")) {
    return null; 
  }

  return <Navbar />;
}
