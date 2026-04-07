"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  FileText, 
  Shield,
  ShieldCheck,
  Zap,
  LayoutDashboard,
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Clock,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/actions/authActions";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState("student");
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/staff");
  }

  useEffect(() => {
    // Get role from cookie on client
    const role = document.cookie.split('; ').find(row => row.startsWith('user_role='))?.split('=')[1];
    if (role) setUserRole(decodeURIComponent(role));
  }, []);

  const menuItems = [
    { name: "المنشورات", icon: <Bell className="w-5 h-5" />, href: "/dashboard" },
    { name: "جدول المحاضرات", icon: <Calendar className="w-5 h-5" />, href: "/dashboard/schedule" },
    { name: "سشن الدراسة", icon: <Clock className="w-5 h-5" />, href: "/dashboard/study" },
    // Admin only items
    ...(userRole === "admin" ? [
      { name: "مركز القيادة", icon: <ShieldCheck className="w-5 h-5 text-primary" />, href: "/admins" },
      { name: "إدارة المحتوى", icon: <Shield className="w-5 h-5 text-secondary" />, href: "/dashboard/manage" },
    ] : []),
    { name: "الملفات الدراسية", icon: <BookOpen className="w-5 h-5" />, href: "/dashboard/files" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden glass-morphism flex items-center justify-between p-4 px-6 sticky top-0 z-50 border-b border-white/5">
        <span className="font-bold text-primary tracking-tighter uppercase text-sm">Command_Center</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 rounded-lg">
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0 w-64" : "translate-x-full md:translate-x-0 w-0 md:w-20"
        } transition-all duration-500 glass-morphism border-l border-white/5 flex flex-col p-4 fixed right-0 h-full z-[60] md:z-40 md:flex overflow-hidden`}
      >
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-black text-background shadow-[0_0_15px_rgba(0,255,65,0.2)]">
            CY
          </div>
          {isSidebarOpen && <span className="font-bold text-lg tracking-tighter">الأمن السيبراني</span>}
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                pathname === item.href
                  ? "bg-primary/10 text-primary border border-primary/20 shadow-[0_0_10px_rgba(0,255,65,0.05)]"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex-shrink-0">{item.icon}</div>
              {isSidebarOpen && <span className="font-medium text-sm whitespace-nowrap">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-1">
          <button className="w-full flex items-center gap-4 p-3 text-slate-400 hover:text-white transition-colors group">
            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            {isSidebarOpen && <span className="text-sm">الإعدادات</span>}
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-4 p-3 text-red-500/60 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm">تسجيل الخروج</span>}
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className={`flex-1 ${isSidebarOpen ? "md:pr-72" : "md:pr-24"} transition-all duration-500 p-5 md:p-10 pt-6 md:pt-10 overflow-x-hidden w-full relative`}>
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-8">
          <div className="space-y-1.5 md:mr-4">
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter leading-tight">مرحباً، علي! 👋</h1>
            <p className="text-[10px] md:text-sm text-slate-500 font-mono uppercase tracking-[0.3em]">System_Active // Privileged_Node</p>
          </div>
          <div className="flex items-center justify-end gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 glass-morphism">
               <div className="text-right">
                  <p className="text-xs font-black text-white leading-none mb-1">علي حسن</p>
                  <p className="text-[8px] font-mono text-primary uppercase tracking-widest">{userRole.toUpperCase()}_AUTHORITY</p>
               </div>
               <div className="h-8 w-8 rounded-lg bg-primary/20 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                  CY
               </div>
            </div>
          </div>
        </header>

        <div className="max-w-[1600px] mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-50" 
            onClick={() => setIsSidebarOpen(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
