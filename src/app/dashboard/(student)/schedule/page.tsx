"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, 
  MapPin, 
  User as UserIcon, 
  BookOpen, 
  Beaker,
  CalendarDays,
  ShieldAlert,
  Loader2
} from "lucide-react";
import { getSchedule } from "@/app/actions/managementActions";

const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"];

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState("السبت");
  const [scheduleData, setScheduleData] = useState<Record<string, any[]>>({});
  const [loading, setLoading] = useState(true);
  const [userStage, setUserStage] = useState<string>("1");

  useEffect(() => {
    // Get user stage from cookies
    const cookiesArray = document.cookie.split('; ');
    const stage = cookiesArray.find(row => row.startsWith('user_grade='))?.split('=')[1] || "1";
    setUserStage(stage);

    const today = new Intl.DateTimeFormat('ar-IQ', { weekday: 'long' }).format(new Date());
    const matchedDay = days.find(d => today.includes(d));
    if (matchedDay) setActiveDay(matchedDay);

    loadSchedule(stage);
  }, []);

  async function loadSchedule(stage: string) {
    setLoading(true);
    const result = await getSchedule(stage, "lecture");
    if (result.success && result.schedule) {
      setScheduleData(result.schedule.weeklyData || {});
    }
    setLoading(false);
  }

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <CalendarDays className="text-primary" />
            جدول المحاضرات الإسبوعي
          </h2>
          <p className="text-slate-500 text-sm">المرحلة {userStage} | العام الدراسي 2024-2025</p>
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
          {loading ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 flex flex-col items-center justify-center gap-4 text-primary"
            >
               <Loader2 className="w-10 h-10 animate-spin" />
               <p className="text-[10px] font-mono uppercase tracking-widest">Fetching_Academic_Schedule...</p>
            </motion.div>
          ) : (
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {scheduleData[activeDay]?.length > 0 ? (
                scheduleData[activeDay].map((item, idx) => (
                  <div 
                    key={item.id || idx}
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
                            <UserIcon className="w-4 h-4" />
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
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
