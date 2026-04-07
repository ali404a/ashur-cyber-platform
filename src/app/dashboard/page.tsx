import React from "react";
import { 
  Tag,
  Shield,
  Zap,
  ArrowRight,
  ChevronRight,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { getStudentSubjects, seedInitialSubjects } from "@/app/actions/academicActions";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userPhone = cookieStore.get("user_phone")?.value;

  if (!userPhone) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Shield className="w-16 h-16 text-slate-800 mb-4" />
        <h2 className="text-xl font-bold text-slate-500">يرجى تسجيل الدخول للوصول إلى بياناتك</h2>
      </div>
    );
  }

  // Fetch real subjects for the student
  let { subjects, success } = await getStudentSubjects(userPhone);

  // Auto-seed if no data exists (Demo purposes)
  if (success && subjects.length === 0) {
    await seedInitialSubjects();
    const reFetch = await getStudentSubjects(userPhone);
    subjects = reFetch.subjects;
  }

  return (
    <div className="space-y-10">
      {/* Subject Access Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-black flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            المواد الدراسية النشطة
          </h2>
          <p className="text-sm text-slate-500 font-medium font-mono uppercase tracking-wider">
            Accessing_Active_Modules_v2.0
          </p>
        </div>
        
        <Link href="/dashboard/files" className="text-sm font-bold text-primary hover:underline flex items-center gap-2">
           عرض كافة الملفات
           <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Tactical Subject Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects && subjects.map((subject: any) => (
          <Link 
            key={subject._id} 
            href={`/dashboard/subjects/${subject._id}`}
            className="group"
          >
            <div className="hologram-card p-8 rounded-[2rem] border-white/5 hover:border-primary/40 transition-all relative overflow-hidden group">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Module ID */}
              <div className="absolute top-6 right-8 text-[8px] font-mono text-slate-600 group-hover:text-primary/60 tracking-widest uppercase">
                {subject.nameEn}
              </div>

              {/* Icon Area */}
              <div className="mb-8 p-5 rounded-2xl bg-white/5 w-fit border border-white/5 group-hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all">
                <BookOpen className="w-8 h-8 text-primary/80 group-hover:text-primary transition-colors" />
              </div>

              <h3 className="text-2xl font-black mb-3 text-white group-hover:text-primary transition-colors tracking-tighter">
                {subject.nameAr}
              </h3>
              
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                {subject.description || "منهج أكاديمي متخصص في تطبيقات الأمن السيبراني المتقدمة."}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">
                  Status: <span className="text-primary/60">Operational</span>
                </span>
                <ChevronRight className="w-5 h-5 text-slate-800 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}

        {subjects && subjects.length === 0 && (
          <div className="col-span-full py-20 text-center glass-morphism rounded-3xl border-dashed border-white/5">
            <p className="text-slate-500 font-mono text-sm uppercase tracking-widest leading-relaxed">
              {"// No_Active_Modules_Found_For_This_Phase"} <br />
              {"// Initiating_System_Check..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
