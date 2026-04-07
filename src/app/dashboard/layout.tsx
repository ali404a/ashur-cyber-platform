"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "react-transition-group";
import { 
  BarChart3, 
  Calendar, 
  FileText, 
  Bell, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Clock,
  BookOpen,
  Mail
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const menuItems = [
    { name: "المنشورات", icon: <Bell className="w-5 h-5" />, href: "/dashboard" },
    { name: "جدول المحاضرات", icon: <Calendar className="w-5 h-5" />, href: "/dashboard/schedule" },
    { name: "جدول الامتحانات", icon: <FileText className="w-5 h-5" />, href: "/dashboard/exams" },
    { name: "الملفات الدراسية", icon: <BookOpen className="w-5 h-5" />, href: "/dashboard/files" },
    { name: "سشن الدراسة", icon: <Clock className="w-5 h-5" />, href: "/dashboard/study" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden glass-morphism flex items-center justify-between p-4 sticky top-0 z-50">
        <span className="font-bold text-primary">لوحة الطالب</span>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } transition-all duration-300 glass-morphism border-r border-white/5 flex flex-col p-4 fixed h-full z-40 hidden md:flex`}
      >
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-black text-background">
            CY
          </div>
          {isSidebarOpen && <span className="font-bold text-lg">الأمن السيبراني</span>}
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all ${
                pathname === item.href
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
              {isSidebarOpen && <span className="font-medium">{item.name}</span>}
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-white/5 space-y-2">
          <button className="w-full flex items-center gap-4 p-3 text-slate-400 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
            {isSidebarOpen && <span>الإعدادات</span>}
          </button>
          <Link href="/" className="w-full flex items-center gap-4 p-3 text-red-400 hover:text-red-300 transition-colors">
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span>خروج</span>}
          </Link>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Main Content Area */}
      <main className={`flex-1 md:mr-${isSidebarOpen ? "64" : "20"} transition-all duration-300 p-4 md:p-8`}>
        {/* Top Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">مرحباً، علي! 👋</h1>
            <p className="text-sm text-slate-500">المرحلة الثالثة | طالب</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 glass-morphism rounded-full flex items-center justify-center border border-primary/20">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div className="h-12 w-12 rounded-2xl bg-slate-800 border border-white/10" />
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
