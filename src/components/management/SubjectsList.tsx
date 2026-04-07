"use client";

import { useState } from "react";
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
              <div className="p-6 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-between hover:border-white/10 transition-all group overflow-hidden relative">
                 <div className="flex items-center gap-6 relative z-10">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-600 group-hover:text-primary transition-colors">
                       <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="font-black text-lg text-slate-200">{subj.nameAr}</h4>
                       <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest">{subj.nameEn} // {subj.gradeLevel}</p>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-3 relative z-10">
                    <button 
                      onClick={() => setExpanded(expanded === subj._id ? null : subj._id)}
                      className="p-3 rounded-xl bg-white/5 text-slate-500 hover:text-white transition-all"
                    >
                       {expanded === subj._id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                    <button 
                      disabled={deleting === subj._id}
                      onClick={() => handleDeleteSubject(subj._id)}
                      className="p-3 rounded-xl bg-white/5 text-slate-800 hover:bg-red-500/10 hover:text-red-500 transition-all disabled:opacity-50"
                    >
                       <Trash2 className="w-5 h-5" />
                    </button>
                 </div>
              </div>

              {/* Expanded View for deletion of materials would go here */}
              {expanded === subj._id && (
                <div className="mx-6 p-4 bg-white/[0.02] border-x border-b border-white/5 rounded-b-[2rem] space-y-2 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-2 mb-4 px-2">
                       <AlertTriangle className="w-3 h-3 text-slate-800" />
                       <span className="text-[8px] font-black uppercase tracking-widest text-slate-700 italic">Manage_Sub_Nodes</span>
                    </div>
                    <p className="text-[10px] text-slate-600 px-4 py-8 text-center italic">
                       (يمكنك حذف المادة بالكامل بما تحتويه من محاضرات من الزر الأيمن أعلاه)
                    </p>
                </div>
              )}
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
