"use client";

import { useState, useEffect } from "react";
import { getSchedule, updateSchedule } from "@/app/actions/managementActions";
import { 
  Calendar, 
  Clock, 
  Save, 
  Trash2, 
  Plus, 
  BookOpen, 
  User, 
  MapPin, 
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس"];
const stages = ["1", "2", "3", "4"];

interface ScheduleItem {
  id: string;
  subject: string;
  teacher: string;
  time: string;
  hall: string;
  type: "theory" | "practical";
}

export default function ScheduleManager() {
  const [selectedStage, setSelectedStage] = useState("1");
  const [activeTab, setActiveTab] = useState<"lecture" | "exam">("lecture");
  const [activeDay, setActiveDay] = useState("السبت");
  const [scheduleData, setScheduleData] = useState<Record<string, ScheduleItem[]>>({});
  const [examData, setExamData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadSchedule();
  }, [selectedStage, activeTab]);

  async function loadSchedule() {
    setLoading(true);
    const result = await getSchedule(selectedStage, activeTab);
    if (result.success && result.schedule) {
      if (activeTab === "lecture") {
        setScheduleData(result.schedule.weeklyData || {});
      } else {
        setExamData(result.schedule.examData || []);
      }
    } else {
      setScheduleData({});
      setExamData([]);
    }
    setLoading(false);
  }

  const handleAddItem = () => {
    if (activeTab === "lecture") {
      const newItem: ScheduleItem = {
        id: Math.random().toString(36).substr(2, 9),
        subject: "",
        teacher: "",
        time: "",
        hall: "",
        type: "theory"
      };
      setScheduleData(prev => ({
        ...prev,
        [activeDay]: [...(prev[activeDay] || []), newItem]
      }));
    } else {
      const newExam = {
        id: Math.random().toString(36).substr(2, 9),
        subject: "",
        date: "",
        time: "",
        hall: "",
        notes: ""
      };
      setExamData(prev => [...prev, newExam]);
    }
  };

  const handleUpdateItem = (id: string, field: string, value: string) => {
    if (activeTab === "lecture") {
      setScheduleData(prev => ({
        ...prev,
        [activeDay]: prev[activeDay].map(item => item.id === id ? { ...item, [field]: value } : item)
      }));
    } else {
      setExamData(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
    }
  };

  const handleDeleteItem = (id: string) => {
    if (activeTab === "lecture") {
      setScheduleData(prev => ({
        ...prev,
        [activeDay]: prev[activeDay].filter(item => item.id !== id)
      }));
    } else {
      setExamData(prev => prev.filter(item => item.id !== id));
    }
  };

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    const result = await updateSchedule({
      gradeLevel: selectedStage,
      type: activeTab,
      weeklyData: activeTab === "lecture" ? scheduleData : undefined,
      examData: activeTab === "exam" ? examData : undefined
    });
    
    if (result.success) {
      setMessage({ type: 'success', text: "تم حفظ البيانات بنجاح 🛡️" });
    } else {
      setMessage({ type: 'error', text: "فشل الحفظ: " + result.error });
    }
    setSaving(false);
  }

  return (
    <div className="glass-morphism p-8 md:p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div className="space-y-1">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Schedule_Intelligence_Unit</h3>
          <h2 className="text-2xl font-black tracking-tighter">
            {activeTab === "lecture" ? "إدارة جدول المحاضرات" : "إدارة جدول الامتحانات"}
          </h2>
        </div>
        
        <div className="flex flex-wrap gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
           <button 
             onClick={() => setActiveTab("lecture")}
             className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === "lecture" ? "bg-cyan-500 text-black shadow-lg" : "text-slate-500 hover:text-white"}`}
           >
             محاضرات إسبوعية
           </button>
           <button 
             onClick={() => setActiveTab("exam")}
             className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${activeTab === "exam" ? "bg-purple-600 text-white shadow-lg" : "text-slate-500 hover:text-white"}`}
           >
             جدول الامتحانات
           </button>
           <div className="w-px h-8 bg-white/10 mx-2" />
           {stages.map(s => (
             <button
               key={s}
               onClick={() => setSelectedStage(s)}
               className={`px-5 py-2 rounded-xl text-xs font-black transition-all ${selectedStage === s ? "bg-white/10 text-white shadow-lg" : "text-slate-500 hover:text-white"}`}
             >
               المرحلة {s}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {activeTab === "lecture" && (
          <div className="lg:col-span-3 space-y-2">
            {days.map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl border transition-all ${activeDay === day ? "bg-white/10 border-cyan-500/50 text-white" : "bg-transparent border-white/5 text-slate-500 hover:border-white/10"}`}
              >
                <span className="font-bold text-sm">{day}</span>
                <span className="text-[10px] font-mono opacity-50">{(scheduleData[day]?.length || 0)}</span>
              </button>
            ))}
          </div>
        )}

        <div className={activeTab === "lecture" ? "lg:col-span-9 space-y-6" : "lg:col-span-12 space-y-6"}>
           <div className="flex items-center justify-between bg-white/[0.02] p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3">
                 {activeTab === "lecture" ? <Calendar className="w-5 h-5 text-cyan-400" /> : <Shield className="w-5 h-5 text-purple-400" />}
                 <span className="font-black text-sm">
                   {activeTab === "lecture" ? `جدول يوم ${activeDay} — المرحلة ${selectedStage}` : `جدول امتحانات المرحلة ${selectedStage}`}
                 </span>
              </div>
              <button 
                onClick={handleAddItem}
                className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-[10px] font-black transition-all ${activeTab === "lecture" ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500 hover:text-black" : "bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-600 hover:text-white"}`}
              >
                 <Plus className="w-3 h-3" />
                 إضافة {activeTab === "lecture" ? "محاضرة" : "امتحان"}
              </button>
           </div>

           <div className="space-y-4 min-h-[400px]">
              {loading ? (
                <div className="h-full flex items-center justify-center py-20">
                  <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {activeTab === "lecture" ? (
                    (scheduleData[activeDay] || []).length === 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                         <p className="text-slate-600 font-bold">لا توجد محاضرات مضافة لهذا اليوم</p>
                      </motion.div>
                    ) : (
                      scheduleData[activeDay].map((item, idx) => (
                        <motion.div 
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 relative group"
                        >
                           <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                              <div className="md:col-span-4 space-y-2">
                                 <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2"><BookOpen className="w-3 h-3" /> اسم المادة</label>
                                 <input value={item.subject} onChange={(e) => handleUpdateItem(item.id, "subject", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-cyan-500/40" placeholder="أمن الشبكات..." />
                              </div>
                              <div className="md:col-span-3 space-y-2">
                                 <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2"><UserIcon className="w-3 h-3" /> التدريسي</label>
                                 <input value={item.teacher} onChange={(e) => handleUpdateItem(item.id, "teacher", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-cyan-500/40" placeholder="أ.د. علي جاسم..." />
                              </div>
                              <div className="md:col-span-2 space-y-2">
                                 <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2"><Clock className="w-3 h-3" /> الوقت</label>
                                 <input value={item.time} onChange={(e) => handleUpdateItem(item.id, "time", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-cyan-500/40 font-mono" placeholder="08:30 - 10:30" />
                              </div>
                              <div className="md:col-span-2 space-y-2">
                                 <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3" /> القاعة / المختبر</label>
                                 <input value={item.hall} onChange={(e) => handleUpdateItem(item.id, "hall", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-cyan-500/40" placeholder="قاعة 402" />
                              </div>
                              <div className="md:col-span-1 flex items-end pb-1">
                                 <button onClick={() => handleDeleteItem(item.id)} className="w-full h-10 flex items-center justify-center bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg">
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>
                           </div>
                           <div className="mt-4 flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="radio" checked={item.type === "theory"} onChange={() => handleUpdateItem(item.id, "type", "theory")} className="accent-cyan-500" />
                                 <span className="text-[10px] font-bold text-slate-400">نظري</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                 <input type="radio" checked={item.type === "practical"} onChange={() => handleUpdateItem(item.id, "type", "practical")} className="accent-cyan-500" />
                                 <span className="text-[10px] font-bold text-slate-400">عملي</span>
                              </label>
                           </div>
                        </motion.div>
                      ))
                    )
                  ) : (
                    /* Exam Data Manager */
                    examData.length === 0 ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center border-2 border-dashed border-white/5 rounded-[2rem]">
                        <p className="text-slate-600 font-bold">لم يتم تحديد مواعيد امتحانات لهذه المرحلة بعد</p>
                      </motion.div>
                    ) : (
                      examData.map((exam, idx) => (
                        <motion.div 
                          key={exam.id}
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-white/[0.03] border border-white/5 rounded-3xl p-6 relative group"
                        >
                           <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                              <div className="md:col-span-4 space-y-2">
                                 <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2"><BookOpen className="w-3 h-3" /> اسم المادة</label>
                                 <input value={exam.subject} onChange={(e) => handleUpdateItem(exam.id, "subject", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500/40" placeholder="أمن الشبكات..." />
                              </div>
                              <div className="md:col-span-3 space-y-2">
                                 <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2"><Calendar className="w-3 h-3" /> التاريخ</label>
                                 <input type="date" value={exam.date} onChange={(e) => handleUpdateItem(exam.id, "date", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500/40" />
                              </div>
                              <div className="md:col-span-2 space-y-2">
                                 <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2"><Clock className="w-3 h-3" /> الوقت</label>
                                 <input value={exam.time} onChange={(e) => handleUpdateItem(exam.id, "time", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500/40 font-mono" placeholder="09:00 - 12:00" />
                              </div>
                              <div className="md:col-span-2 space-y-2">
                                 <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2"><MapPin className="w-3 h-3" /> القاعة والموقع</label>
                                 <input value={exam.hall} onChange={(e) => handleUpdateItem(exam.id, "hall", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500/40" placeholder="قاعة 301" />
                              </div>
                              <div className="md:col-span-1 flex items-end pb-1">
                                 <button onClick={() => handleDeleteItem(exam.id)} className="w-full h-10 flex items-center justify-center bg-red-500/10 text-red-500 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-lg">
                                    <Trash2 className="w-4 h-4" />
                                 </button>
                              </div>
                           </div>
                           <div className="mt-4 space-y-2">
                              <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest flex items-center gap-2"><Activity className="w-3 h-3" /> ملاحظات إضافية (اختياري)</label>
                              <input value={exam.notes} onChange={(e) => handleUpdateItem(exam.id, "notes", e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-purple-500/40" placeholder="الامتحان حضوري، يرجى إحضار الهوية..." />
                           </div>
                        </motion.div>
                      ))
                    )
                  )}
                </AnimatePresence>
              )}
           </div>

           {/* Save Button */}
           <div className="pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                 {message && (
                   <div className={`p-4 rounded-2xl text-[11px] font-bold flex items-center gap-3 ${message.type === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                      {message.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                      {message.text}
                   </div>
                 )}
              </div>
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className={`w-full md:w-auto px-10 py-4 font-black rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 ${activeTab === "lecture" ? "bg-cyan-600 text-white hover:bg-cyan-500" : "bg-purple-600 text-white hover:bg-purple-500"}`}
              >
                 {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> حفظ التعديلات للقاعدة</>}
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
