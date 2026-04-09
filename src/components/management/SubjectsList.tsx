"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { deleteSubject, deleteMaterial } from "@/app/actions/managementActions";
import { 
  BookOpen, 
  Trash2, 
  Layers, 
  FileText, 
  Video, 
  ChevronDown, 
  ChevronUp,
  AlertTriangle
} from "lucide-react";

export default function SubjectsList({ subjects }: { subjects: any[] }) {
  const [deleting, setDeleting] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function handleDeleteSubject(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذه المادة وجميع محاضراتها؟")) return;
    setDeleting(id);
    await deleteSubject(id);
    setDeleting(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
         <h3 className="text-xl font-black tracking-tight">قائمة الجرد التعليمي</h3>
         <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{subjects?.length} Active_Nodes</span>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
         {subjects?.map((subj: any) => (
            <div key={subj._id} className="flex flex-col gap-2">
              <div className="p-8 rounded-[3rem] glass-morphism border-white/5 flex items-center justify-between hover:border-white/10 transition-all group overflow-hidden relative shadow-2xl">
                 <div className="flex items-center gap-8 relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 group-hover:scale-110 transition-all shadow-lg">
                       <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                       <h4 className="font-black text-xl text-white italic tracking-tighter">{subj.nameAr}</h4>
                       <p className="text-[11px] text-slate-500 font-mono uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                         <span className="text-cyan-500/50">{subj.nameEn}</span> 
                         <span className="text-slate-800">|</span> 
                         <span className="bg-white/5 px-2 py-0.5 rounded text-slate-600">STAGE_{subj.gradeLevel}</span>
                       </p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-4 relative z-10">
                    <button 
                      onClick={() => setExpanded(expanded === subj._id ? null : subj._id)}
                      className="p-4 rounded-2xl bg-white/5 text-slate-500 hover:text-white transition-all border border-white/5"
                    >
                       {expanded === subj._id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                    <button 
                      disabled={deleting === subj._id}
                      onClick={() => handleDeleteSubject(subj._id)}
                      className="p-4 rounded-2xl bg-white/5 text-slate-800 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 shadow-xl"
                    >
                       <Trash2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              {/* Expanded View */}
              <AnimatePresence>
                {expanded === subj._id && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mx-8 p-10 bg-white/[0.01] border-x border-b border-white/5 rounded-b-[3rem] space-y-2"
                  >
                      <div className="flex items-center gap-2 mb-4">
                         <AlertTriangle className="w-4 h-4 text-slate-800" />
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-700 italic">Manage_Sub_Nodes</span>
                      </div>
                      <p className="text-xs font-bold text-slate-500 px-4 py-8 text-center italic leading-relaxed">
                         المادة مسجلة في النظام وتحتوي على أرشيف المحاضرات الخاص بالمرحلة {subj.gradeLevel}.
                         <br />
                         <span className="text-[10px] opacity-50 font-mono mt-4 block">ID: {subj._id}</span>
                      </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
         ))}
         
         {subjects?.length === 0 && (
           <div className="p-12 rounded-[2.5rem] border border-dashed border-white/5 flex flex-col items-center justify-center text-center opacity-50">
              <Layers className="w-10 h-10 mb-4" />
              <p className="text-xs font-mono uppercase tracking-widest">No_Active_Subjects_Detected</p>
           </div>
         )}
      </div>
    </div>
  );
}
