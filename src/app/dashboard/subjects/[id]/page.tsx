import React from "react";
import { 
  ArrowLeft, 
  FileText, 
  PlayCircle, 
  Download, 
  Lock,
  ChevronLeft,
  Calendar,
  CloudDownload
} from "lucide-react";
import Link from "next/link";
import { getSubjectMaterials } from "@/app/actions/academicActions";
import Subject from "@/models/Subject";
import dbConnect from "@/lib/db";

export default async function SubjectDetailsPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const subject = await Subject.findById(params.id).lean();
  const { materials, success } = await getSubjectMaterials(params.id);

  if (!subject) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-bold text-slate-500">المادة غير موجودة</h2>
        <Link href="/dashboard" className="mt-4 text-primary hover:underline">العودة للوحة التحكم</Link>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Subject Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors font-mono uppercase tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" />
            {"// Back_To_Command_Center"}
          </Link>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              {subject.nameAr}
            </h1>
            <p className="text-secondary font-mono text-xs uppercase tracking-[0.3em] font-bold">
              Subject_ID: {subject.nameEn} // SEMESTER: {subject.semester}
            </p>
          </div>
        </div>

        <div className="px-6 py-4 glass-morphism rounded-2xl border-white/5 flex items-center gap-6">
           <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Materials</p>
              <p className="text-2xl font-black text-white">{materials?.length || 0}</p>
           </div>
           <div className="w-px h-10 bg-white/10" />
           <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Status</p>
              <p className="text-xs font-mono text-primary font-black uppercase">Active</p>
           </div>
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 gap-6">
        {materials && materials.map((material: any, idx: number) => (
          <div 
            key={material._id}
            className="hologram-card p-6 md:p-8 rounded-3xl border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
          >
             <div className="flex items-start gap-6">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-primary/20 transition-all">
                   {material.type === "PDF" ? (
                     <FileText className="w-8 h-8 text-primary" />
                   ) : (
                     <PlayCircle className="w-8 h-8 text-secondary" />
                   )}
                </div>
                <div className="space-y-1">
                   <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                      {material.title}
                   </h3>
                   <p className="text-slate-500 text-sm max-w-xl">
                      {material.description || "لا يوجد وصف لهذه المحاضرة."}
                   </p>
                   <div className="flex items-center gap-4 pt-2">
                      <span className="text-[9px] font-mono font-bold text-slate-600 bg-black/40 px-2 py-1 rounded tracking-widest uppercase">
                         Type: {material.type}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-slate-600 flex items-center gap-1">
                         <Calendar className="w-3 h-3" />
                         {new Date(material.createdAt).toLocaleDateString("ar-EG")}
                      </span>
                   </div>
                </div>
             </div>

             <a 
               href={material.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="px-8 py-4 glass-morphism border-primary/20 hover:bg-primary hover:text-background transition-all rounded-xl font-black text-xs uppercase flex items-center gap-3 tracking-tighter"
             >
                <CloudDownload className="w-5 h-5 ml-1" />
                تحميل المحاضرة
             </a>
          </div>
        ))}

        {materials && materials.length === 0 && (
          <div className="py-20 text-center glass-morphism rounded-[3rem] border-dashed border-white/5">
             <div className="inline-flex p-6 rounded-full bg-white/2 mb-6">
                <Lock className="w-12 h-12 text-slate-800" />
             </div>
             <h3 className="text-lg font-bold text-slate-500 mb-2">لا توجد محاضرات حالياً</h3>
             <p className="text-sm text-slate-600 font-mono uppercase tracking-[0.2em]">{"// Access_Pending // Waiting_For_Sync"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
