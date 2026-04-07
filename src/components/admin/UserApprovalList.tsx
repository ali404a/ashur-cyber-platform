"use client";

import { useState } from "react";
import { updateUserStatus, deleteUser } from "@/app/actions/adminActions";
import { 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  User as UserIcon, 
  ShieldCheck,
  ShieldAlert
} from "lucide-react";

export default function UserApprovalList({ users }: { users: any[] }) {
  const [processing, setProcessing] = useState<string | null>(null);

  async function handleStatusUpdate(userId: string, status: "approved" | "rejected") {
    setProcessing(userId);
    await updateUserStatus(userId, status);
    setProcessing(null);
  }

  async function handleDelete(userId: string) {
    if (!confirm("هل أنت متأكد من حذف هذا الحساب؟")) return;
    setProcessing(userId);
    await deleteUser(userId);
    setProcessing(null);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user: any) => (
        <div 
          key={user._id}
          className={`glass-morphism p-6 md:p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all ${processing === user._id ? "opacity-50 pointer-events-none" : ""}`}
        >
          {/* Status Badge */}
          <div className="absolute top-6 left-6 flex items-center gap-2">
             <div className={`w-2 h-2 rounded-full animate-pulse ${user.status === 'approved' ? 'bg-primary' : user.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'}`} />
             <span className="text-[10px] uppercase font-black tracking-widest text-slate-500">{user.status}</span>
          </div>

          <div className="flex flex-col items-center text-center mt-6">
             <div className="w-20 h-20 rounded-[2.2rem] bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-primary transition-all shadow-inner mb-6">
                <UserIcon className="w-8 h-8" />
             </div>
             <h3 className="text-xl font-black text-white tracking-tighter leading-tight mb-2">
                {user.fullName}
             </h3>
             <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.2em] mb-6">
                PH: {user.phoneNumber} // {user.gradeLevel}
             </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-6 border-t border-white/5">
             {user.status !== "approved" && (
                <button 
                  onClick={() => handleStatusUpdate(user._id, "approved")}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-background font-black text-xs transition-all"
                >
                   <ShieldCheck className="w-4 h-4" />
                   موافقة
                </button>
             )}
             {user.status !== "rejected" && (
                <button 
                  onClick={() => handleStatusUpdate(user._id, "rejected")}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 text-slate-500 border border-white/5 hover:bg-red-500/10 hover:text-red-500 font-black text-xs transition-all"
                >
                   <ShieldAlert className="w-4 h-4" />
                   رفض
                </button>
             )}
             <button 
               onClick={() => handleDelete(user._id)}
               className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 text-slate-800 hover:text-white font-black text-xs transition-all md:col-span-2"
             >
                <Trash2 className="w-4 h-4" />
                حذف الحساب
             </button>
          </div>
        </div>
      ))}

      {users.length === 0 && (
        <div className="md:col-span-2 lg:col-span-3 p-20 rounded-[3rem] border border-dashed border-white/5 flex flex-col items-center justify-center text-center opacity-40">
           <ShieldCheck className="w-16 h-16 mb-6 text-slate-800" />
           <p className="text-xs font-mono uppercase tracking-[0.4em]">All_Signals_Verified // No_Pending_Queue</p>
        </div>
      )}
    </div>
  );
}
