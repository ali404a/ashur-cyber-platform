"use client";

import { useState } from "react";
import { updateUserStatus, deleteUser } from "@/app/actions/adminActions";
import { 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  User as UserIcon, 
  ShieldCheck,
  ShieldAlert,
  Loader2,
  Clock,
  UserCheck,
  UserX
} from "lucide-react";

export default function UserApprovalList({ users }: { users: any[] }) {
  const [processing, setProcessing] = useState<string | null>(null);

  async function handleStatusUpdate(userId: string, status: "approved" | "rejected") {
    setProcessing(userId);
    await updateUserStatus(userId, status);
    setProcessing(null);
  }

  async function handleDelete(userId: string) {
    if (!confirm("هل أنت متأكد من حذف هذا الحساب نهائياً؟")) return;
    setProcessing(userId);
    await deleteUser(userId);
    setProcessing(null);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-arabic selection:bg-primary/20">
      {users.map((user: any) => (
        <div 
          key={user._id}
          className={`glass-morphism p-6 rounded-[2.2rem] border-white/5 relative overflow-hidden group hover:border-white/10 transition-all shadow-xl ${processing === user._id ? "opacity-40 pointer-events-none" : ""}`}
        >
          {/* Dashboard Badge: Status */}
          <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/5">
             <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'approved' ? 'bg-primary shadow-[0_0_8px_rgba(0,255,65,0.5)]' : user.status === 'pending' ? 'bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
             <span className="text-[9px] uppercase font-black tracking-widest text-slate-400 italic">
               {user.status === 'approved' ? 'تم القبول' : user.status === 'pending' ? 'قيد الانتظار' : 'مرفوض'}
             </span>
          </div>

          {/* User Tactical Identity */}
          <div className="flex items-center gap-4 mb-6">
             <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-primary transition-all duration-500 shadow-inner">
                <UserIcon className="w-6 h-6" />
             </div>
             <div className="text-right">
                <h3 className="text-lg font-black text-white tracking-tight leading-none mb-1">
                   {user.fullName}
                </h3>
                <p className="text-[10px] text-slate-500 font-mono font-bold tracking-widest uppercase">
                   Ph: {user.phoneNumber}
                </p>
             </div>
          </div>

          {/* Academic Profile Badge */}
          <div className="flex items-center gap-3 p-3 mb-6 rounded-2xl bg-white/[0.02] border border-white/5">
             <Clock className="w-3.5 h-3.5 text-slate-700" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
               المستوى الدراسي: {user.gradeLevel}
             </span>
          </div>

          {/* Command Triggers */}
          <div className="grid grid-cols-2 gap-2.5 pt-6 border-t border-white/5">
             {user.status !== "approved" && (
                <button 
                  onClick={() => handleStatusUpdate(user._id, "approved")}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-black font-black text-xs transition-all shadow-md active:scale-95"
                >
                   <UserCheck className="w-4 h-4" />
                   تفعيل القبول
                </button>
             )}
             {user.status !== "rejected" && (
                <button 
                  onClick={() => handleStatusUpdate(user._id, "rejected")}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 text-slate-500 border border-white/5 hover:bg-red-500/10 hover:text-red-500 font-black text-xs transition-all active:scale-95"
                >
                   <UserX className="w-4 h-4" />
                   رفض الطلب
                </button>
             )}
             <button 
                onClick={() => handleDelete(user._id)}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-transparent text-slate-800 hover:text-red-400 font-black text-[9px] uppercase tracking-widest transition-all md:col-span-2 border border-transparent hover:border-red-500/10"
             >
                <Trash2 className="w-3.5 h-3.5" />
                تصفية الحساب (Delete)
             </button>
          </div>

          {/* Loader Overlay */}
          {processing === user._id && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-20">
               <Loader2 className="w-10 h-10 text-primary animate-spin" />
            </div>
          )}
        </div>
      ))}

      {/* Empty Queue State */}
      {users.length === 0 && (
        <div className="md:col-span-2 lg:col-span-3 p-20 rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-30 grayscale saturate-0">
           <ShieldCheck className="w-16 h-16 mb-6 text-slate-800" />
           <p className="text-[10px] font-mono font-black uppercase tracking-[0.4em] italic pl-2">All_Signals_Verified // Buffer_Empty</p>
        </div>
      )}
    </div>
  );
}
