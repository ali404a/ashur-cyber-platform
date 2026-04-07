import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldQuestion,
  Search,
  Layout,
  LayoutDashboard,
  Activity
} from "lucide-react";
import { getUsersByStatus, upgradeToAdmin } from "@/app/actions/adminActions";
import UserApprovalList from "@/components/admin/UserApprovalList";
import AddStaffForm from "@/components/admin/AddStaffForm";

export default async function AdminPortalPage() {
  const cookieStore = await cookies();
  const userPhone = cookieStore.get("user_phone")?.value;
  const userRole = cookieStore.get("user_role")?.value;

  // Final Authority Guard:
  if (!userPhone) redirect("/staff");
  if (userRole !== "admin") redirect("/dashboard");
  
  await upgradeToAdmin(userPhone);

  const { users: pendingUsers } = await getUsersByStatus("pending");
  const { users: approvedUsers } = await getUsersByStatus("approved");
  const { users: rejectedUsers } = await getUsersByStatus("rejected");

  const totalUsers = (pendingUsers?.length || 0) + (approvedUsers?.length || 0) + (rejectedUsers?.length || 0);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 px-4 font-arabic">
      {/* Admin Command Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-10">
        <div className="space-y-1.5 text-right">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight flex items-center gap-4 text-white uppercase italic">
             <ShieldCheck className="w-10 h-10 text-primary shadow-[0_0_20px_rgba(0,255,65,0.4)]" />
             مركز عمليات القبول
          </h1>
          <p className="text-[10px] md:text-xs text-slate-500 font-mono uppercase tracking-[0.4em] pr-1">
             System_Verification_Hub // Admin_Control_Node
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 w-fit backdrop-blur-xl">
           <Activity className="w-4 h-4 text-primary animate-pulse" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Global_Admin_Protocol_v4.0</span>
        </div>
      </div>

      {/* Stats Command Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
         <div className="glass-morphism p-5 rounded-[1.8rem] border-white/5 flex flex-col gap-1 transition-all hover:bg-white/[0.03]">
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">إجمالي المسجلين</span>
            <span className="text-3xl font-black text-white italic">{totalUsers}</span>
         </div>
         <div className="glass-morphism p-5 rounded-[1.8rem] border-yellow-500/20 bg-yellow-500/[0.01] flex flex-col gap-1">
            <span className="text-[9px] font-black text-yellow-600/60 uppercase tracking-widest block mb-1">بانتظار الموافقة</span>
            <span className="text-3xl font-black text-yellow-500 italic">{pendingUsers?.length || 0}</span>
         </div>
         <div className="glass-morphism p-5 rounded-[1.8rem] border-primary/20 bg-primary/[0.01] flex flex-col gap-1">
            <span className="text-[9px] font-black text-primary/60 uppercase tracking-widest block mb-1">طلاب تم تفعيلهم</span>
            <span className="text-3xl font-black text-primary italic">{approvedUsers?.length || 0}</span>
         </div>
         <div className="glass-morphism p-5 rounded-[1.8rem] border-red-500/20 bg-red-500/[0.01] flex flex-col gap-1">
            <span className="text-[9px] font-black text-red-600/60 uppercase tracking-widest block mb-1">طلبات مرفوضة</span>
            <span className="text-3xl font-black text-red-500 italic">{rejectedUsers?.length || 0}</span>
         </div>
      </div>

      {/* Staff Management Section */}
      <div className="space-y-6 pt-6">
        <AddStaffForm />
      </div>

      {/* Pending Queue Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-ping" />
              <h2 className="text-xl md:text-2xl font-black tracking-tighter flex items-center gap-3 text-white italic">
                 طابور التحقق (Pending)
              </h2>
           </div>
           <span className="text-[9px] font-mono text-slate-700 uppercase tracking-widest">Verification_Queue_Alpha</span>
        </div>
        
        <UserApprovalList users={pendingUsers || []} />
      </div>

      {/* Verified Users Section (Quick View) */}
      <div className="space-y-6 pt-10 border-t border-white/5">
        <div className="flex items-center justify-between px-2">
           <h2 className="text-xl font-black tracking-tighter flex items-center gap-3 text-slate-500 italic">
              <ShieldCheck className="w-5 h-5" />
              المقبولين قريباً (Approved)
           </h2>
           <span className="text-[9px] font-mono text-slate-800 uppercase tracking-widest">Deployed_Entities_Index</span>
        </div>
        
        <div className="opacity-60 grayscale-[0.3]">
          <UserApprovalList users={(approvedUsers || []).slice(0, 6)} />
        </div>
      </div>

    </div>
  );
}
