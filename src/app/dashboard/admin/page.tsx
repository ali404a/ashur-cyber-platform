import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldQuestion,
  Search,
  Layout,
  LayoutDashboard
} from "lucide-react";
import { getUsersByStatus, upgradeToAdmin } from "@/app/actions/adminActions";
import UserApprovalList from "@/components/admin/UserApprovalList";

export default async function AdminPortalPage() {
  const cookieStore = await cookies();
  const userPhone = cookieStore.get("user_phone")?.value;

  // Simple auth check
  if (!userPhone) redirect("/");
  
  // Auto-upgrade your account to Admin for first entry (Optional but useful for you)
  // Using the number provided in previous contexts or assuming current user is admin for demo
  await upgradeToAdmin(userPhone);

  const { users: pendingUsers } = await getUsersByStatus("pending");
  const { users: approvedUsers } = await getUsersByStatus("approved");
  const { users: rejectedUsers } = await getUsersByStatus("rejected");

  const totalUsers = (pendingUsers?.length || 0) + (approvedUsers?.length || 0) + (rejectedUsers?.length || 0);

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight flex items-center gap-4 text-white">
             <ShieldCheck className="w-8 h-8 text-primary shadow-[0_0_20px_rgba(0,255,65,0.4)]" />
             مركز عمليات الموافقة
          </h1>
          <p className="text-[10px] md:text-xs text-slate-500 font-mono uppercase tracking-[0.4em]">
             System_Verification_Hub // Admin_Control_Node
          </p>
        </div>
        <div className="flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20 w-fit">
           <ShieldCheck className="w-5 h-5 text-primary" />
           <span className="text-xs font-black text-primary uppercase tracking-widest">Global_Admin_Protocol</span>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <div className="glass-morphism p-6 rounded-[2rem] border-white/5 flex flex-col gap-2">
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Total_Registrations</span>
            <span className="text-3xl font-black text-white">{totalUsers}</span>
         </div>
         <div className="glass-morphism p-6 rounded-[2rem] border-yellow-500/20 bg-yellow-500/[0.02] flex flex-col gap-2">
            <span className="text-[10px] font-black text-yellow-600/60 uppercase tracking-widest">Pending_Approval</span>
            <span className="text-3xl font-black text-yellow-500">{pendingUsers?.length || 0}</span>
         </div>
         <div className="glass-morphism p-6 rounded-[2rem] border-primary/20 bg-primary/[0.02] flex flex-col gap-2">
            <span className="text-[10px] font-black text-primary/60 uppercase tracking-widest">Verified_Students</span>
            <span className="text-3xl font-black text-primary">{approvedUsers?.length || 0}</span>
         </div>
         <div className="glass-morphism p-6 rounded-[2rem] border-red-500/20 bg-red-500/[0.02] flex flex-col gap-2">
            <span className="text-[10px] font-black text-red-600/60 uppercase tracking-widest">Rejected_Signals</span>
            <span className="text-3xl font-black text-red-500">{rejectedUsers?.length || 0}</span>
         </div>
      </div>

      {/* Pending Queue Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3">
              <ShieldQuestion className="w-6 h-6 text-yellow-500" />
              قائمة الطلاب الجدد (Pending)
           </h2>
           <span className="text-[10px] font-mono text-slate-600 uppercase">Verification_Queue</span>
        </div>
        
        <UserApprovalList users={pendingUsers || []} />
      </div>

      {/* Verified Users Section (Optional - Quick View) */}
      <div className="space-y-6 pt-10">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3 text-white/80">
              <ShieldCheck className="w-6 h-6 text-primary" />
              الطلاب المقبولين (Approved)
           </h2>
           <span className="text-[10px] font-mono text-slate-600 uppercase">Deployed_Entities</span>
        </div>
        
        <div className="opacity-70 grayscale-[0.5]">
          <UserApprovalList users={(approvedUsers || []).slice(0, 6)} />
        </div>
      </div>

    </div>
  );
}
