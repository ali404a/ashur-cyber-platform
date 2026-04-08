"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { logout } from "@/app/actions/authActions";
import {
  ShieldCheck, LayoutDashboard, UserPlus, Users,
  GraduationCap, ShieldAlert, LogOut, Menu, X, Activity
} from "lucide-react";

const navItems = [
  { id: "add-staff",  label: "إضافة كادر",         icon: UserPlus,      badge: null },
  { id: "pending",    label: "طلبات الانضمام",      icon: ShieldAlert,   badge: "pending" },
  { id: "students",   label: "الطلاب المُفعّلون",   icon: GraduationCap, badge: null },
  { id: "staff",      label: "أعضاء الكادر",        icon: Users,         badge: null },
];

interface AdminLayoutClientProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  stats: { total: number; pending: number; approved: number; staff: number; rejected: number };
  adminName: string;
}

export default function AdminLayoutClient({ children, activeTab, onTabChange, stats, adminName }: AdminLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/staff");
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex font-arabic" dir="rtl">
      
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-72" : "w-20"} flex-shrink-0 bg-white/[0.02] border-l border-white/5 flex flex-col transition-all duration-300 fixed top-0 right-0 h-full z-50`}>
        
        {/* Logo */}
        <div className="p-6 border-b border-white/5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-primary" />
          </div>
          {sidebarOpen && (
            <div className="overflow-hidden">
              <p className="font-black text-sm text-white leading-none">جامعة أشور</p>
              <p className="text-[10px] text-primary font-mono mt-0.5">ADMIN_PORTAL</p>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-auto text-slate-600 hover:text-white transition-colors flex-shrink-0"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const badgeCount = item.badge === "pending" ? stats.pending : null;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-bold ${
                  activeTab === item.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-slate-500 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-right">{item.label}</span>
                    {badgeCount ? (
                      <span className="bg-yellow-500 text-black text-[9px] font-black rounded-full w-5 h-5 flex items-center justify-center">
                        {badgeCount}
                      </span>
                    ) : null}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* User + Logout */}
        <div className="p-4 border-t border-white/5">
          {sidebarOpen && (
            <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white/[0.03] rounded-xl">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary text-xs font-black">
                A
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-black text-white truncate">{adminName}</p>
                <p className="text-[10px] text-slate-600">مسؤول النظام</p>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500/60 hover:text-red-400 hover:bg-red-500/5 transition-all text-sm font-bold"
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {sidebarOpen && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${sidebarOpen ? "mr-72" : "mr-20"} transition-all duration-300 min-h-screen flex flex-col`}>
        
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] text-slate-500 font-mono uppercase tracking-widest">System_Online</span>
            </div>
          </div>
          <h1 className="text-base font-black text-white tracking-tight">مركز عمليات القيادة</h1>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
