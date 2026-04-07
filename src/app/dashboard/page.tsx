import React from "react";
import { 
  Tag,
  Shield,
  Zap,
  ArrowRight,
  ChevronRight,
  BookOpen,
  MessageSquare,
  Clock,
  User as UserIcon,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { getStudentSubjects, seedInitialSubjects } from "@/app/actions/academicActions";

const posts = [
  {
    id: 1,
    title: "تحديث: موعد الاختبار المركزي",
    author: "أ.د. علي حسن",
    position: "عميد الكلية",
    content: "تم تحديد موعد الاختبار المركزي لمواد الأمن السيبراني للمرحلة الثالثة يوم الخميس القادم. يرجى مراجعة المختبرات.",
    date: "منذ ساعتين",
    type: "important"
  },
  {
    id: 2,
    title: "فتح باب التسجيل للمختبرات العملية",
    author: "م. محمد جاسم",
    position: "رئيس قسم التقنيات",
    content: "يمكن للطلاب الآن حجز سشنات المختبر العملي لمادة التشفير عبر بوابة المختبرات.",
    date: "منذ 5 ساعات",
    type: "info"
  }
];

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userPhone = cookieStore.get("user_phone")?.value;

  if (!userPhone) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Shield className="w-16 h-16 text-slate-800 mb-4" />
        <h2 className="text-xl font-bold text-slate-500 tracking-tighter">AUTHENTICATION_REQUIRED</h2>
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
    <div className="space-y-12">
      {/* Subject Access Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-black flex items-center gap-3 tracking-tighter">
            <Zap className="w-5 h-5 text-primary" />
            المواد النشطة
          </h2>
          <p className="text-[9px] text-slate-600 font-mono uppercase tracking-[0.2em]">Active_Tactical_Modules</p>
        </div>
        
        <Link href="/dashboard/files" className="text-xs font-bold text-primary hover:underline flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
           المكتبة
           <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Tactical Subject Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {subjects && subjects.map((subject: any) => (
          <Link 
            key={subject._id} 
            href={`/dashboard/subjects/${subject._id}`}
            className="group"
          >
            <div className="hologram-card p-6 md:p-8 rounded-[2rem] border-white/5 hover:border-primary/40 transition-all relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute top-6 right-8 text-[8px] font-mono text-slate-600 group-hover:text-primary/60 tracking-widest uppercase">
                {subject.nameEn}
              </div>

              <div className="mb-6 md:mb-8 p-4 rounded-2xl bg-white/5 w-fit border border-white/5 group-hover:shadow-[0_0_20px_rgba(0,255,65,0.1)] transition-all">
                <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-primary/80 group-hover:text-primary transition-colors" />
              </div>

              <h3 className="text-xl md:text-2xl font-black mb-3 text-white group-hover:text-primary transition-colors tracking-tighter">
                {subject.nameAr}
              </h3>
              
              <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed mb-8 line-clamp-2">
                {subject.description || "منهج أكاديمي متخصص في تطبيقات الأمن السيبراني المتقدمة."}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[9px] font-mono font-black text-slate-600 uppercase tracking-widest shrink-0">
                  Status: <span className="text-primary/60 italic">Online</span>
                </span>
                <ChevronRight className="w-5 h-5 text-slate-800 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* News Feed Section - Name - Position Format */}
      <div className="space-y-6 pt-10">
        <div className="space-y-1">
          <h2 className="text-xl md:text-2xl font-black flex items-center gap-3 tracking-tighter">
            <MessageSquare className="w-5 h-5 text-secondary" />
            أحدث المنشورات
          </h2>
          <p className="text-[9px] text-slate-600 font-mono uppercase tracking-[0.2em]">Latest_Command_Bulletins</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div 
              key={post.id}
              className="glass-morphism p-6 md:p-8 rounded-[2.5rem] border-white/5 hover:border-secondary/20 transition-all flex flex-col relative overflow-hidden"
            >
               <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-secondary">
                        <UserIcon className="w-6 h-6" />
                     </div>
                     <div>
                        <h4 className="text-sm font-black text-white">{post.author}</h4>
                        <p className="text-[10px] text-secondary font-bold uppercase tracking-tighter">{post.position}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-600 font-mono">
                     <Clock className="w-3 h-3" />
                     {post.date}
                  </div>
               </div>

               <h3 className="text-lg font-bold mb-3 text-slate-200">
                  {post.title}
               </h3>
               <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {post.content}
               </p>

               <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                  <div className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest ${post.type === 'important' ? 'text-red-500/80' : 'text-blue-500/80'}`}>
                    <AlertCircle className="w-3 h-3" />
                    {post.type}
                  </div>
                  <button className="text-[10px] font-bold text-slate-500 hover:text-white transition-colors">
                    إغلاق الإشعار
                  </button>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
