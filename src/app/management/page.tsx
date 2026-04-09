import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  MessageSquare,
  BookOpen,
  Calendar,
  Zap,
  Layers,
  Activity
} from "lucide-react";
import { getAllSubjects, getLatestPosts } from "@/app/actions/managementActions";
import AddSubjectForm from "@/components/management/AddSubjectForm";
import AddMaterialForm from "@/components/management/AddMaterialForm";
import SubjectsList from "@/components/management/SubjectsList";
import AddPostForm from "@/components/management/AddPostForm";
import PostsList from "@/components/management/PostsList";
import ScheduleManager from "@/components/management/ScheduleManager";

export default async function TopLevelManagementPage() {
  const cookieStore = await cookies();
  const userPhone = cookieStore.get("user_phone")?.value;
  const userRole = cookieStore.get("user_role")?.value;

  // SOVEREIGN AUTH CHECK
  if (!userPhone) redirect("/staff");
  if (userRole === "student") redirect("/dashboard");
  if (userRole !== "management" && userRole !== "admin") redirect("/staff");

  const { subjects } = await getAllSubjects();
  const { posts } = await getLatestPosts();

  // Tactical Command Stats
  const stats = [
    { label: "المواد النشطة", value: subjects?.length || 0, icon: <Layers className="w-5 h-5" />, color: "text-blue-400" },
    { label: "المحاضرات", value: subjects?.reduce((acc: number, s: any) => acc + (s.materials?.length || 0), 0) || 0, icon: <BookOpen className="w-5 h-5" />, color: "text-purple-400" },
    { label: "البلاغات المنشورة", value: posts?.length || 0, icon: <MessageSquare className="w-5 h-5" />, color: "text-cyan-400" },
  ];

  return (
    <div className="space-y-16 pb-40 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* Tactical Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {stats.map((stat, i) => (
          <div key={i} className="glass-morphism p-10 rounded-[2.5rem] border-white/5 flex items-center justify-between group hover:border-white/10 transition-all hover:bg-white/[0.03] shadow-2xl">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">{stat.label}</p>
              <h4 className="text-5xl font-black text-white italic tracking-tighter">{stat.value}</h4>
            </div>
            <div className={`w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center ${stat.color} group-hover:scale-110 group-hover:rotate-6 transition-all shadow-xl`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Left Column: Communications Hub (4/12) */}
        <div id="news" className="xl:col-span-4 space-y-10 scroll-mt-32">
           
           <div className="relative mb-10">
              <div className="absolute -right-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-cyan-400 to-transparent rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
              <div className="pr-2">
                 <h3 className="text-3xl font-black text-white tracking-tighter mb-2">قمرة الاتصالات</h3>
                 <p className="text-[10px] text-blue-400/60 font-mono uppercase tracking-[0.3em] font-black italic">COMMAND_HUB // GLOBAL_BULLETINS</p>
              </div>
           </div>

           {/* Post News Bulletin */}
           <AddPostForm />

           {/* Recent Bulletins Inventory */}
           <div className="pt-6">
              <PostsList posts={posts || []} />
           </div>
        </div>

        {/* Right Column: Academic Intelligence (8/12) */}
        <div id="subjects" className="xl:col-span-8 space-y-12 scroll-mt-32">
           
           <div className="relative mb-10">
              <div className="absolute -right-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-600 via-purple-400 to-transparent rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
              <div className="pr-2">
                 <h3 className="text-3xl font-black text-white tracking-tighter mb-2">إدارة المناهج والأرشيف</h3>
                 <p className="text-[10px] text-cyan-400/60 font-mono uppercase tracking-[0.3em] font-black italic">ACADEMIC_OPS // CONTENT_DEPLOYMENT</p>
              </div>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
              {/* Add New Subject Module */}
              <AddSubjectForm />

              {/* Lecture Upload Station */}
              <AddMaterialForm subjects={subjects || []} />
           </div>

            {/* Active Subjects Database */}
            <SubjectsList subjects={subjects || []} />

            <div id="schedule" className="pt-20 border-t border-white/5">
                <div className="relative mb-12">
                   <div className="absolute -right-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-transparent rounded-full" />
                   <div className="pr-2">
                      <h3 className="text-3xl font-black text-white tracking-tighter mb-2">تنظيم الجداول الزمنية</h3>
                      <p className="text-[10px] text-cyan-500/60 font-mono uppercase tracking-[0.3em] font-black italic">TIME_OPS // SCHEDULE_DEPLOYMENT</p>
                   </div>
                </div>
                <ScheduleManager />
            </div>

         </div>
      </div>
    </div>
  );
}
