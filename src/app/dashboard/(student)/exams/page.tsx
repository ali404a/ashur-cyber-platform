"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  MapPin, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Search,
  Activity,
  Monitor,
  Loader2,
  ShieldAlert,
  Info
} from "lucide-react";
import { getSchedule } from "@/app/actions/managementActions";

export default function ExamsPage() {
  const [filter, setFilter] = useState("all");
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userStage, setUserStage] = useState<string>("1");

  useEffect(() => {
    // Get user stage from cookies
    const cookiesArray = document.cookie.split('; ');
    const stage = cookiesArray.find(row => row.startsWith('user_grade='))?.split('=')[1] || "1";
    setUserStage(stage);
    loadExams(stage);
  }, []);

  async function loadExams(stage: string) {
    setLoading(true);
    const result = await getSchedule(stage, "exam");
    if (result.success && result.schedule) {
      setExams(result.schedule.examData || []);
    }
    setLoading(false);
  }

  const processedExams = exams.map(exam => {
    const examDate = new Date(exam.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let status = "upcoming";
    if (diffDays < 0) status = "completed";
    
    return { ...exam, status, daysLeft: diffDays };
  });

  const filteredExams = processedExams.filter(e => {
    if (filter === "all") return true;
    return e.status === filter;
  });

  const nextExam = processedExams.find(e => e.status === "upcoming");
  const completedCount = processedExams.filter(e => e.status === "completed").length;

  return (
    <div className="space-y-8 pb-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Activity className="text-secondary" />
            جدول الامتحانات
          </h2>
          <p className="text-slate-500 text-sm">المرحلة {userStage} | العام الدراسي 2024-2025</p>
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
            <span className="text-xl font-bold text-white">{nextExam ? nextExam.subject : "لا يوجد امتحانات قادمة"}</span>
            {nextExam && <p className="text-xs text-secondary font-mono mt-1">المتبقي: {nextExam.daysLeft} أيام</p>}
          </div>
        </div>
        <div className="glass-morphism p-6 rounded-3xl border-white/10 flex items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-slate-500" />
          </div>
          <div>
            <span className="text-slate-500 text-xs uppercase tracking-widest block">الامتحانات المكتملة</span>
            <span className="text-2xl font-bold text-white">{completedCount < 10 ? `0${completedCount}` : completedCount} امتحان</span>
            <p className="text-xs text-slate-600 font-mono mt-1">تم إكمال {completedCount} من أصل {exams.length}</p>
          </div>
        </div>
      </div>

      {/* Exams List */}
      <div className="space-y-4">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-4 text-secondary">
             <Loader2 className="w-10 h-10 animate-spin" />
             <p className="text-[10px] font-mono uppercase tracking-widest">Loading_Exam_Protocols...</p>
          </div>
        ) : filteredExams.length === 0 ? (
          <div className="py-20 text-center glass-morphism rounded-3xl border-dashed border-white/10">
            <ShieldAlert className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 font-bold">لا يوجد امتحانات لعرضها حالياً</p>
          </div>
        ) : (
          filteredExams.map((exam, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={exam.id || idx}
              className={`glass-morphism p-6 rounded-3xl border-transparent hover:border-white/10 transition-all group relative ${exam.status === "completed" ? "opacity-60 grayscale" : ""}`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-black ${
                    exam.status === "completed" ? "bg-slate-800 text-slate-500" : "bg-secondary/10 text-secondary border border-secondary/20"
                  }`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-secondary transition-colors">{exam.subject}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exam.date ? new Date(exam.date).toLocaleDateString('ar-IQ', { weekday: 'long', day: 'numeric', month: 'long' }) : "غير محدد"}
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
              </div>

              {exam.notes && (
                <div className="mt-6 pt-4 border-t border-white/5 flex items-start gap-3">
                   <Info className="w-4 h-4 text-blue-400 mt-0.5" />
                   <p className="text-xs font-bold text-slate-500 leading-relaxed">{exam.notes}</p>
                </div>
              )}

              {/* Indicator */}
              {exam.daysLeft <= 3 && exam.status === "upcoming" && (
                <div className="absolute top-0 right-0 p-2">
                  <div className="px-2 py-1 bg-red-500 text-white text-[8px] font-black uppercase rounded-lg animate-pulse">قريب جداً</div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
