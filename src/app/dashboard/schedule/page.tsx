"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  MapPin, 
  User, 
  BookOpen, 
  Beaker,
  CalendarDays,
  ShieldAlert
} from "lucide-react";

const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"];

const scheduleData: Record<string, any[]> = {
  "السبت": [
    { id: 1, subject: "أمن الشبكات", teacher: "أ. علي حسن", time: "08:30 - 10:30", hall: "مختبر الحاسوب 1", type: "practical" },
    { id: 2, subject: "تشفير البيانات", teacher: "أ. محمد علي", time: "10:30 - 12:30", hall: "قاعة 402", type: "theory" },
  ],
  "الأحد": [
    { id: 3, subject: "هندسة البرمجيات", teacher: "د. سارة عادل", time: "08:30 - 10:30", hall: "قاعة 305", type: "theory" },
    { id: 4, subject: "أنظمة التشغيل الآمنة", teacher: "أ. عمر خالد", time: "11:00 - 01:00", hall: "مختبر 2", type: "practical" },
  ],
  "الاثنين": [
    { id: 5, subject: "أخلاقيات الهكر", teacher: "أ. ليث جاسم", time: "09:00 - 11:00", hall: "القاعة المركزية", type: "theory" },
  ],
  "الثلاثاء": [
    { id: 6, subject: "أمن الشبكات", teacher: "أ. علي حسن", time: "08:30 - 10:30", hall: "قاعة 402", type: "theory" },
    { id: 7, subject: "تشفير البيانات", teacher: "أ. محمد علي", time: "10:30 - 12:30", hall: "مختبر 4", type: "practical" },
  ],
  "الأربعاء": [
    { id: 8, subject: "الذكاء الاصطناعي في الأمن", teacher: "د. نادية كمال", time: "10:00 - 12:00", hall: "قاعة 201", type: "theory" },
  ],
  "الخميس": [
    { id: 9, subject: "مشروع التخرج", teacher: "اللجنة العلمية", time: "09:00 - 12:00", hall: "مختبرات الأقسام", type: "practical" },
  ],
};

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState("السبت");

  // Auto-select current day if it's within the schedule
  useEffect(() => {
    const today = new Intl.DateTimeFormat('ar-IQ', { weekday: 'long' }).format(new Date());
    const matchedDay = days.find(d => today.includes(d));
    if (matchedDay) setActiveDay(matchedDay);
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <CalendarDays className="text-primary" />
            جدول المحاضرات الإسبوعي
          </h2>
          <p className="text-slate-500 text-sm">المرحلة الثالثة | العام الدراسي 2024-2025</p>
        </div>
        <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-6 py-2.5 rounded-xl transition-all whitespace-nowrap text-sm font-bold ${
                activeDay === day 
                ? "bg-primary text-background shadow-[0_0_15px_rgba(0,255,65,0.4)]" 
                : "text-slate-400 hover:text-white"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {scheduleData[activeDay]?.length > 0 ? (
              scheduleData[activeDay].map((item) => (
                <div 
                  key={item.id}
                  className="glass-morphism p-6 rounded-3xl border-transparent hover:border-primary/20 transition-all group flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center font-black ${
                      item.type === "practical" ? "bg-secondary/10 text-secondary border border-secondary/20" : "bg-primary/10 text-primary border border-primary/20"
                    }`}>
                      <span className="text-xs uppercase opacity-60">{item.type === "practical" ? "عملي" : "نظري"}</span>
                      {item.type === "practical" ? <Beaker className="w-6 h-6 mt-1" /> : <BookOpen className="w-6 h-6 mt-1" />}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{item.subject}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {item.teacher}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-secondary" />
                          {item.hall}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 border border-white/5">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-mono font-bold text-lg tracking-tighter">{item.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center glass-morphism rounded-3xl border-dashed border-white/10">
                <ShieldAlert className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">لا يوجد محاضرات في هذا اليوم</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick Stats / Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 glass-morphism rounded-3xl border-primary/10">
          <span className="text-slate-500 text-xs uppercase tracking-widest block mb-2">إجمالي الساعات</span>
          <span className="text-3xl font-black text-primary">24 ساعة</span>
        </div>
        <div className="p-6 glass-morphism rounded-3xl border-secondary/10">
          <span className="text-slate-500 text-xs uppercase tracking-widest block mb-2">المواد العملية</span>
          <span className="text-3xl font-black text-secondary">4 مختبرات</span>
        </div>
        <div className="p-6 glass-morphism rounded-3xl border-white/10">
          <span className="text-slate-500 text-xs uppercase tracking-widest block mb-2">نسبة الحضور</span>
          <span className="text-3xl font-black text-white">92%</span>
        </div>
      </div>
    </div>
  );
}
