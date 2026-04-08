import React from "react";
import StaffLayoutClient from "@/components/staff/StaffLayoutClient";

export default function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StaffLayoutClient>{children}</StaffLayoutClient>;
}
