"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Shield,
  ShieldCheck,
  Zap,
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Users,
  BookOpen,
  Layout,
  Activity,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/actions/authActions";

interface StaffLayoutClientProps {
  children: React.ReactNode;
}

export default function StaffLayoutClient({ children }: StaffLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState("management");
  const [userName, setUserName] = useState("عضو الكادر");
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push("/staff");
  }

  useEffect(() => {
    // Immediate cookie check on client
    const cookiesArray = document.cookie.split('; ');
    const role = cookiesArray.find(row => row.startsWith('user_role='))?.split('=')[1];
    const name = cookiesArray.find(row => row.startsWith('user_name='))?.split('=')[1];
    
    if (role) setUserRole(decodeURIComponent(role));
    if (name) setUserName(decodeURIComponent(name));
  }, []);

  const menuItems = [
    { id: "manage", name: "مركز التحكم الشامل", icon: <Layout className="w-5 h-5" />, href: "/management" },
    { id: "bulletins", name: "إدارة البلاغات", icon: <Bell className="w-5 h-5 text-blue-400" />, href: "/management#news" },
    ...(userRole === "admin" ? [
      { id: "admin", name: "غرفة القيادة العليا", icon: <ShieldCheck className="w-5 h-5 text-primary" />, href: "/admins" }
    ] : []),
    { id: "files", name: "المواد والأرشيف", icon: <BookOpen className="w-5 h-5 text-cyan-400" />, href: "/management#subjects" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex flex-col md:flex-row font-arabic" dir="rtl">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#050b1d] border-b border-white/5 flex items-center justify-between p-4 z-[70]">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
               <Shield className="w-4 h-4 text-blue-400" />
            </div>
            <span className="text-sm font-black tracking-tight text-white">مركز القيادة</span>
         </div>
         <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 rounded-lg text-blue-400">
           {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
         </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0 w-72" : "translate-x-full md:translate-x-0 w-0 md:w-20"
        } transition-all duration-500 bg-[#050b1d]/80 backdrop-blur-3xl border-l border-white/5 flex flex-col p-4 fixed right-0 h-full z-[60] md:z-40 md:flex overflow-hidden`}
      >
        <div className="mb-12 flex items-center gap-4 px-2 mt-2">
          <div className="relative group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform">
              OC
            </div>
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#050b1d] animate-pulse" />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col">
              <span className="font-black text-white text-base tracking-tight leading-none mb-1">مركز العمليات</span>
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">v2.0_Academic_Lvl</span>
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all group ${
                pathname === item.href
                  ? "bg-blue-500/10 text-white border border-blue-500/20 shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                  : "text-slate-500 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <div className={`flex-shrink-0 transition-transform group-hover:scale-110 ${pathname === item.href ? "text-blue-400" : ""}`}>
                {item.icon}
              </div>
              {isSidebarOpen && <span className="font-bold text-sm tracking-tight">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
           {isSidebarOpen && (
             <div className="px-4 py-3 mb-4 bg-white/5 rounded-2xl border border-white/5">
                <div className="flex items-center gap-2 mb-2">
                   <Activity className="w-3 h-3 text-green-500" />
                   <span className="text-[9px] font-mono text-slate-500">SYSTEM_HEALTH: 100%</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: "95%" }}
                     transition={{ duration: 2 }}
                     className="bg-blue-500 h-full" 
                   />
                </div>
             </div>
           )}
          <button className="w-full flex items-center gap-4 p-3 text-slate-500 hover:text-white transition-colors group">
            <Settings className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            {isSidebarOpen && <span className="text-sm font-bold">إعدادات النظام</span>}
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-4 p-3 text-red-500/40 hover:text-red-400 transition-colors">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm font-bold">خروج آمن</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 ${isSidebarOpen ? "md:pr-72" : "md:pr-24"} transition-all duration-500 p-6 md:p-12 pt-8 md:pt-14 relative`}>
        
        {/* Dynamic Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style={{
           backgroundImage: `radial-gradient(circle at 2px 2px, rgba(37,99,235,0.4) 1px, transparent 0)`,
           backgroundSize: "40px 40px"
        }} />

        <header className="flex flex-col lg:flex-row lg:items-center justify-between mb-16 gap-10 relative z-10">
          <div className="space-y-3">
             <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 w-fit rounded-full text-[10px] font-mono font-bold text-blue-400 tracking-widest uppercase">
                Academic_Node // Secure_Auth
             </div>
             <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                تحية طيبة، {userName} <span className="text-blue-500">.</span>
             </h1>
          </div>

          <div className="flex items-center gap-6">
             <div className="flex flex-col items-end">
                <span className="text-xs font-black text-white">{userName}</span>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]" />
                   <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">{userRole}_IDENTITY</span>
                </div>
             </div>
             <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center text-blue-400 shadow-xl overflow-hidden relative group cursor-pointer">
                <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-xl font-black relative z-10">{userName[0]}</span>
             </div>
          </div>
        </header>

        <div className="max-w-[1700px] mx-auto relative z-10">
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
