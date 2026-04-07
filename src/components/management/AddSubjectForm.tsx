"use client";

import { useState } from "react";
import { createSubject } from "@/app/actions/managementActions";
import { Layers, CheckCircle2, AlertCircle } from "lucide-react";

export default function AddSubjectForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      nameAr: formData.get("nameAr") as string,
      nameEn: formData.get("nameEn") as string,
      gradeLevel: formData.get("gradeLevel") as string,
      semester: "الفصل الأول",
    };

    const result = await createSubject(data);
    setLoading(false);

    if (result.success) {
      setStatus({ type: 'success', msg: "تم تفعيل المادة الدراسية بنجاح 🛡️" });
      e.currentTarget.reset();
    } else {
      setStatus({ type: 'error', msg: result.error || "فشل في تسجيل المادة" });
    }
  }

  return (
    <div className="glass-morphism p-8 rounded-[2.5rem] border-secondary/20 relative overflow-hidden group">
      <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-3">
         <Layers className="w-4 h-4 text-secondary" />
         Create_New_Module
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
         <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block pr-2">Subject_Name_Ar</label>
            <input name="nameAr" required type="text" placeholder="مثلاً: تشفير البيانات" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:border-secondary outline-none transition-all placeholder:text-slate-800" />
         </div>
         <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block pr-2">Subject_Name_En</label>
            <input name="nameEn" required type="text" placeholder="e.g. Cryptography" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:border-secondary outline-none transition-all placeholder:text-slate-800 font-mono" />
         </div>
         <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block pr-2">Grade_Level</label>
            <select name="gradeLevel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:border-secondary outline-none transition-all text-slate-300 appearance-none">
               <option value="المرحلة الأولى">المرحلة الأولى</option>
               <option value="المرحلة الثانية">المرحلة الثانية</option>
               <option value="المرحلة الثالثة">المرحلة الثالثة</option>
               <option value="المرحلة الرابعة">المرحلة الرابعة</option>
            </select>
         </div>
         
         {status && (
           <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${status.type === 'success' ? 'bg-secondary/10 text-secondary' : 'bg-red-500/10 text-red-500'}`}>
             {status.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
             {status.msg}
           </div>
         )}

         <button 
           disabled={loading}
           type="submit"
           className="w-full bg-secondary text-background font-black py-4 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 mt-4 shadow-[0_0_30px_rgba(45,212,191,0.3)] disabled:opacity-50"
         >
            {loading ? "جاري التفعيل..." : (
               <>
                 <Layers className="w-5 h-5" />
                 تفعيل المادة الدراسية
               </>
            )}
         </button>
      </form>
    </div>
  );
}
