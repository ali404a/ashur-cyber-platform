"use client";

import { useState } from "react";
import { UserPlus, Users, ShieldCheck, ShieldAlert, GraduationCap } from "lucide-react";
import UserApprovalList from "./UserApprovalList";

type TabId = "add-staff" | "pending" | "students" | "staff" | "rejected";

interface AdminTabsProps {
  addStaffForm: React.ReactNode;
  pendingUsers: any[];
  approvedUsers: any[];
  staffUsers: any[];
  rejectedUsers: any[];
}

const tabs: { id: TabId; label: string; icon: React.ReactNode; color: string }[] = [
  { id: "add-staff",  label: "إضافة كادر",        icon: <UserPlus className="w-4 h-4" />,     color: "primary" },
  { id: "pending",    label: "طلبات الانضمام",     icon: <ShieldAlert className="w-4 h-4" />,  color: "yellow-400" },
  { id: "students",   label: "الطلاب المُفعّلون",  icon: <GraduationCap className="w-4 h-4" />,color: "primary" },
  { id: "staff",      label: "أعضاء الكادر",       icon: <ShieldCheck className="w-4 h-4" />,  color: "blue-400" },
  { id: "rejected",   label: "الطلبات المرفوضة",   icon: <Users className="w-4 h-4" />,        color: "red-400" },
];

export default function AdminTabs({ addStaffForm, pendingUsers, approvedUsers, staffUsers, rejectedUsers }: AdminTabsProps) {
  const [active, setActive] = useState<TabId>("add-staff");

  return (
    <div className="space-y-6">

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2 p-2 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-[1.5rem] text-xs font-black transition-all duration-300 whitespace-nowrap ${
              active === tab.id
                ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(0,255,65,0.1)]"
                : "text-slate-500 hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.icon}
            {tab.label}
            {tab.id === "pending" && pendingUsers.length > 0 && (
              <span className="bg-yellow-500 text-black text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center">
                {pendingUsers.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="glass-morphism p-8 md:p-10 rounded-[3rem] border-white/5">
        
        {active === "add-staff" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6 text-right">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">إضافة عضو كادر جديد</h2>
                <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">Staff_Provisioning_Protocol</p>
              </div>
            </div>
            {addStaffForm}
          </div>
        )}

        {active === "pending" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6 text-right">
              <div className="w-12 h-12 rounded-2xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">طلبات انضمام الطلاب</h2>
                <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
                  {pendingUsers.length} طلب بانتظار المراجعة
                </p>
              </div>
            </div>
            {pendingUsers.length === 0 ? (
              <div className="text-center py-16 text-slate-600">
                <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-black text-sm">لا توجد طلبات معلقة حالياً</p>
              </div>
            ) : (
              <UserApprovalList users={pendingUsers} />
            )}
          </div>
        )}

        {active === "students" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6 text-right">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">الطلاب المُفعّلون</h2>
                <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
                  {approvedUsers.length} طالب مُفعَّل
                </p>
              </div>
            </div>
            {approvedUsers.length === 0 ? (
              <div className="text-center py-16 text-slate-600">
                <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-black text-sm">لا يوجد طلاب مُفعَّلون حالياً</p>
              </div>
            ) : (
              <UserApprovalList users={approvedUsers} />
            )}
          </div>
        )}

        {active === "staff" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6 text-right">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">أعضاء الكادر</h2>
                <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
                  {staffUsers.length} عضو في الكادر
                </p>
              </div>
            </div>
            {staffUsers.length === 0 ? (
              <div className="text-center py-16 text-slate-600">
                <ShieldCheck className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-black text-sm">لم يتم إضافة أعضاء كادر بعد</p>
              </div>
            ) : (
              <div className="space-y-3">
                {staffUsers.map((user: any) => (
                  <div key={user._id} className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-sm font-black">
                        {user.role === "admin" ? "A" : "M"}
                      </div>
                      <div className="text-right">
                        <p className="font-black text-white text-sm">{user.fullName}</p>
                        <p className="text-xs text-slate-500">{user.position || "بدون منصب"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-slate-600">{user.phoneNumber}</span>
                      <span className={`text-[9px] font-black px-3 py-1 rounded-full ${
                        user.role === "admin"
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      }`}>
                        {user.role === "admin" ? "ADMIN" : "STAFF"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {active === "rejected" && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6 text-right">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white">الطلبات المرفوضة</h2>
                <p className="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
                  {rejectedUsers.length} طلب مرفوض
                </p>
              </div>
            </div>
            {rejectedUsers.length === 0 ? (
              <div className="text-center py-16 text-slate-600">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
                <p className="font-black text-sm">لا توجد طلبات مرفوضة</p>
              </div>
            ) : (
              <UserApprovalList users={rejectedUsers} />
            )}
          </div>
        )}

      </div>
    </div>
  );
}
