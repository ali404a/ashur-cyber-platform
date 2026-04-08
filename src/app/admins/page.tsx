import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUsersByStatus } from "@/app/actions/adminActions";
import AddStaffForm from "@/components/admin/AddStaffForm";
import UserApprovalList from "@/components/admin/UserApprovalList";
import AdminDashboard from "@/components/admin/AdminDashboard";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export default async function AdminPortalPage() {
  const cookieStore = await cookies();
  const userPhone = cookieStore.get("user_phone")?.value;

  if (!userPhone) redirect("/staff");

  await dbConnect();
  const dbUser = await User.findOne({ phoneNumber: userPhone }).lean() as any;

  if (!dbUser || dbUser.role !== "admin") redirect("/staff");

  const { users: pendingUsers } = await getUsersByStatus("pending");
  const { users: approvedUsers } = await getUsersByStatus("approved");
  const { users: rejectedUsers } = await getUsersByStatus("rejected");

  const staffUsers = (approvedUsers || []).filter(
    (u: any) => u.role === "admin" || u.role === "management"
  );
  const studentUsers = (approvedUsers || []).filter(
    (u: any) => u.role === "student"
  );

  const stats = {
    total: (pendingUsers?.length || 0) + (approvedUsers?.length || 0) + (rejectedUsers?.length || 0),
    pending: pendingUsers?.length || 0,
    approved: studentUsers.length,
    rejected: rejectedUsers?.length || 0,
    staff: staffUsers.length,
  };

  return (
    <AdminDashboard
      stats={stats}
      adminName={dbUser.fullName || "المسؤول"}
      pendingUsers={pendingUsers || []}
      approvedUsers={studentUsers}
      staffUsers={staffUsers}
      rejectedUsers={rejectedUsers || []}
    />
  );
}
