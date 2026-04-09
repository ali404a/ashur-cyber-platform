"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/authActions";
import AddStaffForm from "@/components/admin/AddStaffForm";
import UserApprovalList from "@/components/admin/UserApprovalList";
import {
  ShieldCheck, UserPlus, Users, GraduationCap, ShieldAlert,
  LogOut, Menu, X, TrendingUp, Clock, CheckCircle, XCircle
} from "lucide-react";

type Tab = "add-staff" | "pending" | "students" | "staff" | "rejected";

interface Props {
  stats: { total: number; pending: number; approved: number; rejected: number; staff: number };
  adminName: string;
  pendingUsers: any[];
  approvedUsers: any[];
  staffUsers: any[];
  rejectedUsers: any[];
}

export default function AdminDashboard({ stats, adminName, pendingUsers, approvedUsers, staffUsers, rejectedUsers }: Props) {
  const [tab, setTab] = useState<Tab>("add-staff");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  async function handleLogout() {
    await logout();
    window.location.href = "/";
  }

  const navItems: { id: Tab; label: string; Icon: any; badge?: number }[] = [
    { id: "add-staff", label: "إضافة كادر جديد",    Icon: UserPlus },
    { id: "pending",   label: "طلبات الانضمام",      Icon: ShieldAlert, badge: stats.pending },
    { id: "students",  label: "الطلاب المُفعّلون",   Icon: GraduationCap },
    { id: "staff",     label: "أعضاء الكادر",        Icon: Users },
  ];

  const statCards = [
    { label: "إجمالي المسجلين", value: stats.total,    Icon: TrendingUp,   color: "text-white",       bg: "border-white/10" },
    { label: "بانتظار الموافقة", value: stats.pending,  Icon: Clock,        color: "text-yellow-400",  bg: "border-yellow-500/20" },
    { label: "طلاب مُفعّلون",   value: stats.approved, Icon: CheckCircle,  color: "text-primary",     bg: "border-primary/20" },
    { label: "أعضاء الكادر",    value: stats.staff,    Icon: Users,        color: "text-blue-400",    bg: "border-blue-500/20" },
    { label: "طلبات مرفوضة",   value: stats.rejected, Icon: XCircle,      color: "text-red-400",     bg: "border-red-500/20" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex font-arabic" dir="rtl">

      {/* ─── Sidebar ─── */}
      <aside className={`${sidebarOpen ? "w-64" : "w-[72px]"} flex-shrink-0 bg-white/[0.015] border-l border-white/[0.06] flex flex-col transition-all duration-300 fixed top-0 right-0 h-full z-50 overflow-hidden`}>

        {/* Brand */}
        <div className="px-4 py-5 border-b border-white/[0.06] flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(0,255,65,0.1)]">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          {sidebarOpen && (
            <div className="flex-1 min-w-0">
              <p className="font-black text-sm text-white truncate">جامعة أشور</p>
              <p className="text-[9px] text-primary/70 font-mono tracking-widest">ADMIN_PORTAL</p>
            </div>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-600 hover:text-slate-400 transition-colors flex-shrink-0 mr-auto">
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ id, label, Icon, badge }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              title={!sidebarOpen ? label : undefined}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-sm ${
                tab === id
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-slate-500 hover:text-white hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-right text-xs font-bold truncate">{label}</span>
                  {badge && badge > 0 && (
                    <span className="bg-yellow-500 text-black text-[9px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                      {badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </nav>

        {/* User Info + Logout */}
        <div className="px-3 py-4 border-t border-white/[0.06] space-y-2">
          {sidebarOpen && (
            <div className="flex items-center gap-3 px-3 py-2.5 bg-white/[0.03] rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center text-primary text-xs font-black flex-shrink-0">
                {adminName[0] || "A"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{adminName}</p>
                <p className="text-[9px] text-slate-600 font-mono">ADMIN</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            title="تسجيل الخروج"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500/50 hover:text-red-400 hover:bg-red-500/5 transition-all border border-transparent hover:border-red-500/10"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span className="text-xs font-bold">تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* ─── Main ─── */}
      <main className={`flex-1 min-h-screen flex flex-col transition-all duration-300 ${sidebarOpen ? "mr-64" : "mr-[72px]"}`}>

        {/* Header */}
        <header className="sticky top-0 z-40 bg-[#020617]/90 backdrop-blur-xl border-b border-white/[0.06] px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">System_Active</span>
          </div>
          <h2 className="text-sm font-black text-slate-300 tracking-tight">مركز عمليات القيادة</h2>
        </header>

        {/* Body */}
        <div className="flex-1 p-6 md:p-8 space-y-8 max-w-6xl w-full mx-auto">

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {statCards.map(({ label, value, Icon, color, bg }) => (
              <div key={label} className={`bg-white/[0.02] border ${bg} rounded-2xl p-5 flex flex-col gap-3`}>
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${color} opacity-60`} />
                </div>
                <p className={`text-3xl font-black ${color}`}>{value}</p>
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-wider leading-tight">{label}</p>
              </div>
            ))}
          </div>

          {/* Content Card */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">

            {/* Tab Bar */}
            <div className="border-b border-white/[0.06] px-6 py-4 flex items-center gap-2 overflow-x-auto">
              {navItems.map(({ id, label, Icon, badge }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all ${
                    tab === id
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-slate-500 hover:text-white border border-transparent hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                  {badge && badge > 0 && (
                    <span className="bg-yellow-500 text-black text-[9px] font-black rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                      {badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 md:p-8">

              {tab === "add-staff" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <UserPlus className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-base">إضافة عضو كادر جديد</h3>
                      <p className="text-[10px] text-slate-600 font-mono">STAFF_PROVISIONING_PROTOCOL</p>
                    </div>
                  </div>
                  <AddStaffForm />
                </div>
              )}

              {tab === "pending" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                      <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-base">طلبات الانضمام</h3>
                      <p className="text-[10px] text-slate-600 font-mono">{pendingUsers.length} طلب بانتظار المراجعة</p>
                    </div>
                  </div>
                  {pendingUsers.length === 0
                    ? <EmptyState icon={<ShieldCheck className="w-10 h-10" />} text="لا توجد طلبات معلقة" />
                    : <UserApprovalList users={pendingUsers} />}
                </div>
              )}

              {tab === "students" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-base">الطلاب المُفعّلون</h3>
                      <p className="text-[10px] text-slate-600 font-mono">{approvedUsers.length} طالب مُفعَّل</p>
                    </div>
                  </div>
                  {approvedUsers.length === 0
                    ? <EmptyState icon={<GraduationCap className="w-10 h-10" />} text="لا يوجد طلاب مُفعّلون" />
                    : <UserApprovalList users={approvedUsers} />}
                </div>
              )}

              {tab === "staff" && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-black text-white text-base">أعضاء الكادر</h3>
                      <p className="text-[10px] text-slate-600 font-mono">{staffUsers.length} عضو</p>
                    </div>
                  </div>
                  {staffUsers.length === 0
                    ? <EmptyState icon={<Users className="w-10 h-10" />} text="لم يتم إضافة أعضاء كادر بعد" />
                    : (
                      <div className="space-y-3">
                        {staffUsers.map((user: any) => (
                          <div key={user._id} className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-3xl gap-4 hover:border-white/10 transition-all">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black ${user.role === "admin" ? "bg-primary/10 text-primary border border-primary/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"}`}>
                                {user.role === "admin" ? "A" : "S"}
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-white text-sm">{user.fullName}</p>
                                <p className="text-xs text-slate-500">{user.position || "بدون منصب"}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                               <div className="flex flex-col items-end">
                                  <span className="text-[9px] font-mono text-slate-600 mb-1">{user.phoneNumber}</span>
                                  <div className="flex items-center gap-2">
                                     <span className={`text-[8px] font-black px-2 py-0.5 rounded-full ${user.role === "admin" ? "bg-primary/20 text-primary" : "bg-blue-500/20 text-blue-400"}`}>
                                       {user.role === "admin" ? "SUPER_ADMIN" : "PORTAL_STAFF"}
                                     </span>
                                  </div>
                               </div>

                               <div className="flex items-center gap-2">
                                  <select 
                                    className="bg-black/40 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] font-bold text-white focus:outline-none focus:border-primary/50"
                                    defaultValue={user.role}
                                    onChange={async (e) => {
                                      const { updateStaffInfo } = await import("@/app/actions/adminActions");
                                      await updateStaffInfo(user._id, { 
                                        role: e.target.value, 
                                        position: user.position,
                                        fullName: user.fullName 
                                      });
                                    }}
                                  >
                                    <option value="management" className="bg-slate-900">كادر تدريسي</option>
                                    <option value="admin" className="bg-slate-900">مسؤول نظام</option>
                                  </select>

                                  <button
                                    onClick={async () => {
                                      if (confirm("هل أنت متأكد من حذف هذا الحساب؟ لا يمكن التراجع.")) {
                                        const { deleteUser } = await import("@/app/actions/adminActions");
                                        await deleteUser(user._id);
                                      }
                                    }}
                                    className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                               </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="text-center py-16 text-slate-700">
      <div className="flex justify-center mb-4 opacity-30">{icon}</div>
      <p className="font-bold text-sm">{text}</p>
    </div>
  );
}
