"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  MapPin, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Search,
  LayoutPulse,
  Monitor
} from "lucide-react";

const exams = [
  {
    id: 1,
    subject: "أمن الشبكات - النظري",
    date: "2024-04-15",
    time: "09:00 - 11:30",
    hall: "قاعة 301 / الطابق الثالث",
    type: "theoretical",
    status: "upcoming",
    daysLeft: 8
  },
  {
    id: 2,
    subject: "تشفير البيانات - العملي",
    date: "2024-04-17",
    time: "10:00 - 01:00",
    hall: "مختبر الحاسوب 4",
    type: "practical",
    status: "upcoming",
    daysLeft: 10
  },
  {
    id: 3,
    subject: "أنظمة التشغيل - الفصلي",
    date: "2024-04-02",
    time: "08:30 - 10:30",
    hall: "قاعة 105",
    type: "theoretical",
    status: "completed",
    daysLeft: 0
  },
  {
    id: 4,
    subject: "أخلاقيات الهكر - النظري",
    date: "2024-04-20",
    time: "11:00 - 01:00",
    hall: "القاعة الكبرى",
    type: "theoretical",
    status: "upcoming",
    daysLeft: 13
  }
];

export default function ExamsPage() {
  const [filter, setFilter] = useState("all");

  const filteredExams = exams.filter(e => {
    if (filter === "all") return true;
    return e.status === filter;
  });

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <LayoutPulse className="text-secondary" />
            جدول الامتحانات
          </h2>
          <p className="text-slate-500 text-sm">جدول الامتحانات الفصلية والنهائية للمرحلة الثالثة</p>
        </div>
        
        <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/5">
          <button 
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filter === "all" ? "bg-secondary text-background shadow-[0_0_15px_rgba(0,229,255,0.4)]" : "text-slate-400"}`}
          >
            الكل
          </button>
          <button 
            onClick={() => setFilter("upcoming")}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filter === "upcoming" ? "bg-secondary text-background shadow-[0_0_15px_rgba(0,229,255,0.4)]" : "text-slate-400"}`}
          >
            القادمة
          </button>
          <button 
            onClick={() => setFilter("completed")}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filter === "completed" ? "bg-secondary text-background shadow-[0_0_15px_rgba(0,229,255,0.4)]" : "text-slate-400"}`}
          >
            المنتهية
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-morphism p-6 rounded-3xl border-secondary/10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-secondary" />
          </div>
          <div>
            <span className="text-slate-500 text-xs uppercase tracking-widest block">الامتحان القادم</span>
            <span className="text-2xl font-bold text-white">أمن الشبكات - النظري</span>
            <p className="text-xs text-secondary font-mono mt-1">المتبقي: 8 أيام</p>
          </div>
        </div>
        <div className="glass-morphism p-6 rounded-3xl border-white/10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-slate-500" />
          </div>
          <div>
            <span className="text-slate-500 text-xs uppercase tracking-widest block">الامتحانات المكتملة</span>
            <span className="text-2xl font-bold text-white">01 امتحان</span>
            <p className="text-xs text-slate-600 font-mono mt-1">النسبة: 25% من الفصل</p>
          </div>
        </div>
      </div>

      {/* Exams List */}
      <div className="space-y-4">
        {filteredExams.map((exam, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={exam.id}
            className={`glass-morphism p-6 rounded-3xl border-transparent hover:border-white/10 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6 relative ${exam.status === "completed" ? "opacity-60 grayscale" : ""}`}
          >
            <div className="flex items-center gap-6">
              <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black ${
                exam.type === "practical" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
              }`}>
                {exam.type === "practical" ? <Monitor className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
              </div>
              
              <div>
                <h3 className="text-xl font-bold group-hover:text-secondary transition-colors">{exam.subject}</h3>
                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(exam.date).toLocaleDateString('ar-IQ', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {exam.time}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {exam.hall}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-6">
              {exam.status === "upcoming" ? (
                <div className="text-right">
                  <span className="text-xs text-slate-500 uppercase tracking-widest block">متبقي</span>
                  <span className="text-2xl font-black text-secondary font-mono">{exam.daysLeft} <span className="text-sm font-bold text-slate-500">أيام</span></span>
                </div>
              ) : (
                <div className="px-4 py-2 rounded-xl bg-slate-800 text-slate-500 font-bold text-sm">
                  تم الامتحان
                </div>
              )}
            </div>

            {/* Indicator */}
            {exam.daysLeft < 3 && exam.status === "upcoming" && (
              <div className="absolute top-0 right-0 p-2">
                <div className="px-2 py-1 bg-red-500 text-white text-[8px] font-black uppercase rounded-lg animate-pulse">قريب جداً</div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
