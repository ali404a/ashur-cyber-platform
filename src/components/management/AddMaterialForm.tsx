"use client";

import { useState } from "react";
import { addMaterial } from "@/app/actions/managementActions";
import { Plus, CheckCircle2, AlertCircle, Zap } from "lucide-react";

export default function AddMaterialForm({ subjects }: { subjects: any[] }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      type: formData.get("type") as any,
      url: formData.get("url") as string,
      subjectId: formData.get("subjectId") as string,
      description: formData.get("description") as string,
    };

    const result = await addMaterial(data);
    setLoading(false);

    if (result.success) {
      setStatus({ type: 'success', msg: "تم بث المحاضرة بنجاح للمنصة 🛰️" });
      e.currentTarget.reset();
    } else {
      setStatus({ type: 'error', msg: result.error || "فشل في بث المحتوى" });
    }
  }

  return (
    <div className="glass-morphism p-8 md:p-10 rounded-[3rem] border-blue-500/20 relative overflow-hidden group">
      <div className="flex items-center justify-between mb-10">
         <div className="space-y-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Content_Deployment_Station</h3>
            <h2 className="text-2xl font-black tracking-tighter">محطة بث المحاضرات</h2>
         </div>
         <Zap className="w-8 h-8 text-blue-500 animate-pulse" />
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block pr-2">Select_Subject</label>
            <select name="subjectId" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 transition-all text-slate-300 appearance-none">
               {subjects?.map((subj: any) => (
                 <option key={subj._id} value={subj._id}>{subj.nameAr} - {subj.gradeLevel}</option>
               ))}
            </select>
         </div>
         <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block pr-2">Content_Type</label>
            <select name="type" required className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 transition-all text-slate-300 appearance-none">
               <option value="PDF">ملف PDF (محاضرة)</option>
               <option value="VIDEO">فيديو (شرح يوتيوب)</option>
               <option value="EXAM">اختبار إلكتروني</option>
            </select>
         </div>
         <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block pr-2">Module_Title</label>
            <input name="title" required type="text" placeholder="عنوان المحاضرة (مثلاً: المحاضرة الأولى - مقدمة)" className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 transition-all" />
         </div>
         <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block pr-2">External_URL</label>
            <input name="url" required type="text" placeholder="https://..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-sm outline-none focus:border-blue-500 transition-all font-mono" />
         </div>

         {status && (
           <div className={`md:col-span-2 p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${status.type === 'success' ? 'bg-blue-500/10 text-blue-400' : 'bg-red-500/10 text-red-500'}`}>
             {status.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
             {status.msg}
           </div>
         )}
         
         <div className="md:col-span-2 pt-4">
            <button 
              disabled={loading}
              type="submit"
              className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(37,99,235,0.2)] disabled:opacity-50"
            >
               {loading ? "جاري البث للقاعدة..." : (
                  <>
                    <Plus className="w-5 h-5" />
                    بث المحتوى للمنصة
                  </>
               )}
            </button>
         </div>
      </form>
    </div>
  );
}
