import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ShieldCheck, Activity } from "lucide-react";
import { getUsersByStatus, upgradeToAdmin } from "@/app/actions/adminActions";
import UserApprovalList from "@/components/admin/UserApprovalList";
import AddStaffForm from "@/components/admin/AddStaffForm";
import AdminTabs from "@/components/admin/AdminTabs";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export default async function AdminPortalPage() {
  const cookieStore = await cookies();
  const userPhone = cookieStore.get("user_phone")?.value;

  // Must have a phone cookie at minimum
  if (!userPhone) redirect("/staff");

  // Verify directly from DB — don't trust cookie alone
  await dbConnect();
  const dbUser = await User.findOne({ phoneNumber: userPhone }).lean() as any;

  if (!dbUser || dbUser.role !== "admin") redirect("/staff");

  // Sync cookie if it was stale
  cookieStore.set("user_role", "admin", {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60,
    path: "/",
  });

  const { users: pendingUsers } = await getUsersByStatus("pending");
  const { users: approvedUsers } = await getUsersByStatus("approved");
  const { users: rejectedUsers } = await getUsersByStatus("rejected");

  const staffUsers = (approvedUsers || []).filter(
    (u: any) => u.role === "admin" || u.role === "management"
  );

  const studentUsers = (approvedUsers || []).filter(
    (u: any) => u.role === "student"
  );

  const totalUsers =
    (pendingUsers?.length || 0) +
    (approvedUsers?.length || 0) +
    (rejectedUsers?.length || 0);

  const stats = {
    total: totalUsers,
    pending: pendingUsers?.length || 0,
    approved: studentUsers.length,
    rejected: rejectedUsers?.length || 0,
    staff: staffUsers.length,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 px-4 font-arabic">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-10">
        <div className="space-y-2 text-right">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight flex items-center gap-4 text-white uppercase italic">
            <ShieldCheck className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(0,255,65,0.5)]" />
            مركز عمليات القيادة
          </h1>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.4em]">
            Admin_Control_Node // Global_Authority_Protocol
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-xl w-fit">
          <Activity className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
            System_Online
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { label: "إجمالي المسجلين", value: stats.total, color: "text-white", border: "border-white/10" },
          { label: "بانتظار الموافقة", value: stats.pending, color: "text-yellow-400", border: "border-yellow-500/20" },
          { label: "طلاب مفعّلون", value: stats.approved, color: "text-primary", border: "border-primary/20" },
          { label: "طلبات مرفوضة", value: stats.rejected, color: "text-red-400", border: "border-red-500/20" },
          { label: "أعضاء الكادر", value: stats.staff, color: "text-blue-400", border: "border-blue-500/20" },
        ].map((stat) => (
          <div key={stat.label} className={`glass-morphism p-5 rounded-[1.8rem] border ${stat.border} flex flex-col gap-2`}>
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{stat.label}</span>
            <span className={`text-3xl font-black italic ${stat.color}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Tabbed Content */}
      <AdminTabs
        addStaffForm={<AddStaffForm />}
        pendingUsers={pendingUsers || []}
        approvedUsers={studentUsers}
        staffUsers={staffUsers}
        rejectedUsers={rejectedUsers || []}
      />

    </div>
  );
}
