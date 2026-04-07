"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Folder, 
  FileText, 
  Search, 
  ArrowRight, 
  ExternalLink, 
  Download,
  ShieldCheck,
  Lock,
  Network,
  Cpu,
  Database,
  ChevronLeft
} from "lucide-react";

const subjects = [
  { id: "net-sec", name: "أمن الشبكات", icon: <Network className="w-8 h-8" />, count: 12, color: "primary" },
  { id: "crypto", name: "تشفير البيانات", icon: <Lock className="w-8 h-8" />, count: 8, color: "secondary" },
  { id: "os-sec", name: "أنظمة التشغيل الآمنة", icon: <Cpu className="w-8 h-8" />, count: 15, color: "primary" },
  { id: "ai-sec", name: "الذكاء الاصطناعي", icon: <ShieldCheck className="w-8 h-8" />, count: 6, color: "secondary" },
  { id: "db-sec", name: "أمن قواعد البيانات", icon: <Database className="w-8 h-8" />, count: 10, color: "primary" },
];

const filesData: Record<string, any[]> = {
  "net-sec": [
    { id: 1, name: "المحاضرة 1: مقدمة في أمن الشبكات", size: "2.4 MB", date: "2024-03-01", link: "https://drive.google.com" },
    { id: 2, name: "المحاضرة 2: بروتوكولات الحماية", size: "1.8 MB", date: "2024-03-08", link: "https://drive.google.com" },
    { id: 3, name: "المحاضرة 3: جدران الحماية (Firewalls)", size: "3.1 MB", date: "2024-03-15", link: "https://drive.google.com" },
  ],
  "crypto": [
    { id: 4, name: "المحاضرة 1: تاريخ التشفير", size: "1.2 MB", date: "2024-03-02", link: "https://drive.google.com" },
    { id: 5, name: "المحاضرة 2: Symmetric Encryption", size: "2.5 MB", date: "2024-03-09", link: "https://drive.google.com" },
  ]
};

export default function FilesPage() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const currentFiles = selectedSubject ? filesData[selectedSubject] || [] : [];
  const subjectName = subjects.find(s => s.id === selectedSubject)?.name;

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            {selectedSubject ? (
              <button 
                onClick={() => setSelectedSubject(null)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-6 h-6 rotate-180" />
              </button>
            ) : (
              <Folder className="text-primary" />
            )}
            {selectedSubject ? subjectName : "الملفات الدراسية"}
          </h2>
          <p className="text-slate-500 text-sm">
            {selectedSubject ? "استعرض المحاضرات والملفات لهذا التخصص" : "اختر المادة الدراسية للوصول إلى المحاضرات (Google Drive)"}
          </p>
        </div>

        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="بحث عن ملف أو مادة..."
            className="glass-morphism pr-10 pl-4 py-2.5 rounded-xl outline-none text-sm border-white/5 w-full md:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <AnimatePresence mode="wait">
        {!selectedSubject ? (
          <motion.div 
            key="folders"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {subjects.filter(s => s.name.includes(searchQuery)).map((subject) => (
              <motion.button
                key={subject.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedSubject(subject.id)}
                className="group p-6 glass-morphism rounded-3xl border-transparent hover:border-primary/20 transition-all text-right flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl bg-${subject.color}/10 text-${subject.color} group-hover:scale-110 transition-transform`}>
                    {subject.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{subject.name}</h3>
                    <span className="text-xs text-slate-500">{subject.count} ملف متوفر</span>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-700 group-hover:text-primary transition-colors rotate-180" />
              </motion.button>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="files"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {currentFiles.length > 0 ? (
              currentFiles.map((file, idx) => (
                <div 
                  key={file.id}
                  className="glass-morphism p-5 rounded-2xl border-transparent hover:border-white/10 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/5 text-slate-400 group-hover:text-primary transition-colors">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-200">{file.name}</h4>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                        <span>الحجم: {file.size}</span>
                        <span>تاريخ الرفع: {file.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <a 
                      href={file.link} 
                      target="_blank" 
                      className="p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary hover:text-background transition-all"
                      title="فتح في Google Drive"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center glass-morphism rounded-3xl border-dashed border-white/10">
                <FileText className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500 font-bold">لا توجد ملفات مرفوعة لهذه المادة حتى الآن</p>
              </div>
            )}
            
            <button 
              onClick={() => setSelectedSubject(null)}
              className="mt-6 flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
              العودة لقائمة المواد
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Card */}
      <div className="glass-morphism p-6 rounded-3xl border-primary/20 bg-primary/5">
        <div className="flex items-center gap-4">
          <ShieldCheck className="w-8 h-8 text-primary" />
          <div>
            <h4 className="font-bold text-primary">تمت مزامنة الملفات بنجاح</h4>
            <p className="text-sm text-slate-400">جميع الملفات يتم تدقيقها أمنياً قبل الرفع لضمان سلامة الأجهزة الخاصة بالطلاب.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
