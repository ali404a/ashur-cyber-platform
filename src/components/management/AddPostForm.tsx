"use client";

import { useState } from "react";
import { createPost } from "@/app/actions/managementActions";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function AddPostForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      author: formData.get("author") as string,
      position: formData.get("position") as string,
      type: formData.get("type") as any,
    };

    const result = await createPost(data);
    setLoading(false);

    if (result.success) {
      setStatus({ type: 'success', msg: "تم نشر البلاغ الأكاديمي بنجاح 🛰️" });
      e.currentTarget.reset();
    } else {
      setStatus({ type: 'error', msg: result.error || "فشل في عملية النشر" });
    }
  }

  return (
    <div className="glass-morphism p-8 rounded-[2.5rem] border-white/5 relative overflow-hidden group shadow-2xl">
      <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-3">
         <Send className="w-4 h-4 text-primary" />
         Post_Command_Bulletin
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
         <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block pr-2">Bulletin_Title</label>
            <input name="title" required type="text" placeholder="عنوان البلاغ..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:border-primary outline-none transition-all placeholder:text-slate-500" />
         </div>
         
         <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
               <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block pr-2">Author_Name</label>
               <input name="author" required type="text" placeholder="أ.د. علي حسن" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:border-primary outline-none transition-all placeholder:text-slate-500" />
            </div>
            <div className="space-y-1.5">
               <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block pr-2">Position</label>
               <input name="position" required type="text" placeholder="عميد الكلية" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:border-primary outline-none transition-all placeholder:text-slate-500" />
            </div>
         </div>

          <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block pr-2">Bulletin_Template</label>
            <select name="type" className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:border-primary outline-none transition-all text-slate-300 appearance-none">
               <option value="general">📢 تبليغ عام (General)</option>
               <option value="exam">🚨 تبليغ امتحان (Exam)</option>
               <option value="lecture">🎓 تبليغ محاضرة (Lecture)</option>
               <option value="assignment">📌 تبليغ واجبات (Assignment)</option>
            </select>
         </div>

         <div className="space-y-1.5">
            <label className="text-[9px] font-black text-slate-600 uppercase tracking-widest block pr-2">Detailed_Intelligence</label>
            <textarea name="content" required placeholder="اكتب نص المنشور هنا..." rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-sm text-white focus:border-primary outline-none transition-all resize-none placeholder:text-slate-500 font-medium" />
         </div>

         {status && (
           <div className={`p-4 rounded-xl text-xs font-bold flex items-center gap-2 ${status.type === 'success' ? 'bg-primary/10 text-primary' : 'bg-red-500/10 text-red-500'}`}>
             {status.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
             {status.msg}
           </div>
         )}

         <button 
           disabled={loading}
           className="w-full bg-primary/10 text-primary border border-primary/20 font-black py-4 rounded-2xl hover:bg-primary hover:text-background transition-all shadow-[0_0_40px_rgba(0,255,65,0.1)] active:scale-95 disabled:opacity-50"
         >
           {loading ? "جاري البث..." : "نشر البلاغ المباشر"}
         </button>
      </form>
    </div>
  );
}
