import React from "react";
import StaffLayoutClient from "@/components/staff/StaffLayoutClient";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StaffLayoutClient>{children}</StaffLayoutClient>;
}
