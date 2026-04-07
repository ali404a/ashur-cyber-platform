import React from "react";
import { 
  Zap, 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  MessageSquare, 
  Clock, 
  User as UserIcon,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { getStudentSubjects, seedInitialSubjects } from "@/app/actions/academicActions";
import { getLatestPosts } from "@/app/actions/managementActions";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userPhone = cookieStore.get("user_phone")?.value;

  // Fetch real posts from DB
  const { posts: dynamicPosts } = await getLatestPosts();
  
  // Format Date Function for Tactical View
  const formatDate = (dateString: string) => {
    if (!dateString) return "الآن";
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const displayPosts = (dynamicPosts && dynamicPosts.length > 0) ? dynamicPosts : [
    {
      _id: "demo1",
      title: "تحديث: موعد الاختبار المركزي",
      author: "أ.د. علي حسن",
      position: "عميد الكلية",
      content: "تم تحديد موعد الاختبار المركزي لمواد الأمن السيبراني للمرحلة الثالثة يوم الخميس القادم. يرجى مراجعة المختبرات.",
      createdAt: new Date().toISOString(),
      type: "important"
    }
  ];

  // Fetch subjects - No more blocking UI logic
  let subjects: any[] = [];
  try {
    const response = await getStudentSubjects(userPhone || "demo"); 
    subjects = response.subjects || [];

    // Auto-seed if no data exists
    if (subjects.length === 0) {
      await seedInitialSubjects();
      const reFetch = await getStudentSubjects(userPhone || "demo");
      subjects = reFetch.subjects || [];
    }
  } catch (err) {
    console.error("Failed to load subjects");
  }

  return (
    <div className="space-y-12 pb-20">
      {/* Subject Access Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl md:text-3xl font-black flex items-center gap-3 tracking-tighter text-white">
            <Zap className="w-6 h-6 text-primary shadow-[0_0_15px_rgba(0,255,65,0.3)]" />
            المواد النشطة
          </h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.4em]">Active_Tactical_Modules</p>
        </div>
        
        <Link href="/dashboard/files" className="text-xs font-black text-primary hover:bg-primary hover:text-background transition-all flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20">
           المكتبة
           <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Tactical Subject Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {subjects.map((subject: any) => (
          <Link 
            key={subject._id} 
            href={`/dashboard/subjects/${subject._id}`}
            className="group"
          >
            <div className="glass-morphism p-8 md:p-10 rounded-[3rem] border-white/5 hover:border-primary/30 transition-all relative overflow-hidden group shadow-2xl bg-gradient-to-br from-white/[0.02] to-transparent">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute top-8 right-10 text-[9px] font-mono text-slate-600 group-hover:text-primary/60 tracking-[0.3em] uppercase">
                {subject.nameEn}
              </div>

              <div className="mb-8 md:mb-10 p-5 rounded-3xl bg-white/5 w-fit border border-white/5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                <BookOpen className="w-8 h-8 text-primary shadow-inner" />
              </div>

              <h3 className="text-2xl md:text-3xl font-black mb-4 text-white group-hover:text-primary transition-colors tracking-tighter leading-tight italic">
                {subject.nameAr}
              </h3>
              
              <p className="text-slate-400 text-sm md:text-md font-medium leading-relaxed mb-10 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                {subject.description || "منهج أكاديمي متخصص في تطبيقات الأمن السيبراني المتقدمة."}
              </p>

              <div className="flex items-center justify-between pt-8 border-t border-white/5">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                   <span className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">
                     STATUS: <span className="text-primary italic">SECURE</span>
                   </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary transition-all">
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-background transition-colors" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* News Feed Section */}
      <div className="space-y-8 pt-10">
        <div className="space-y-1">
          <h2 className="text-xl md:text-3xl font-black flex items-center gap-3 tracking-tighter text-white">
            <MessageSquare className="w-6 h-6 text-secondary shadow-[0_0_15px_rgba(30,144,255,0.3)]" />
            أحدث المنشورات
          </h2>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.4em]">Latest_Command_Bulletins</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {displayPosts.map((post: any) => (
            <div 
              key={post._id}
              className="glass-morphism p-8 md:p-10 rounded-[3.5rem] border-white/5 hover:border-secondary/30 transition-all flex flex-col relative overflow-hidden group shadow-2xl bg-gradient-to-bl from-white/[0.01] to-transparent"
            >
               {/* Vertical Status Indicator */}
               <div className={`absolute top-0 right-0 w-1.5 h-full ${post.type === 'important' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-secondary shadow-[0_0_15px_rgba(30,144,255,0.5)]'} opacity-50 group-hover:opacity-100 transition-opacity`} />

               <div className="flex items-start justify-between mb-10">
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-[1.8rem] bg-white/5 border border-white/10 flex items-center justify-center text-secondary group-hover:shadow-[0_0_20px_rgba(30,144,255,0.2)] transition-all duration-500">
                        <UserIcon className="w-8 h-8" />
                     </div>
                     <div>
                        <h4 className="text-lg font-black text-white group-hover:text-secondary transition-colors tracking-tight">{post.author}</h4>
                        <p className="text-[11px] text-slate-500 font-black uppercase tracking-widest italic">{post.position}</p>
                     </div>
                  </div>
                  
                  {/* Date Display */}
                  <div className="hidden sm:flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10">
                     <Calendar className="w-3.5 h-3.5 text-secondary" />
                     <span className="text-[10px] font-black text-slate-400 font-mono">{formatDate(post.createdAt)}</span>
                  </div>
               </div>

               <h3 className="text-xl md:text-2xl font-black mb-6 text-white tracking-tighter leading-tight italic">
                  {post.title}
               </h3>
               
               <p className="text-md text-slate-400 leading-relaxed mb-10 font-medium opacity-90">
                  {post.content}
               </p>

               <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                  <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${post.type === 'important' ? 'text-red-500' : 'text-secondary'}`}>
                    <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${post.type === 'important' ? 'bg-red-500' : 'bg-secondary'}`} />
                    {post.type}
                  </div>
                  
                  {/* Mobile Date */}
                  <div className="sm:hidden text-[9px] font-mono text-slate-600 font-black">
                    {formatDate(post.createdAt)}
                  </div>

                  <div className="text-[10px] font-mono text-slate-800 uppercase tracking-[0.3em] font-black group-hover:text-slate-600 transition-colors">
                    REF_ID: #{(String(post._id)).substring(0,8).toUpperCase()}
                  </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
