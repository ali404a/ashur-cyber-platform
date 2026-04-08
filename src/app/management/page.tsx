import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  Zap,
  Layers,
  MessageSquare,
  BookOpen
} from "lucide-react";
import { getAllSubjects, getLatestPosts } from "@/app/actions/managementActions";
import AddSubjectForm from "@/components/management/AddSubjectForm";
import AddMaterialForm from "@/components/management/AddMaterialForm";
import SubjectsList from "@/components/management/SubjectsList";
import AddPostForm from "@/components/management/AddPostForm";
import PostsList from "@/components/management/PostsList";

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
    { label: "المواد النشطة", value: subjects?.length || 0, icon: <Layers className="w-4 h-4" /> },
    { label: "المحاضرات", value: subjects?.reduce((acc: number, s: any) => acc + (s.materials?.length || 0), 0) || 0, icon: <BookOpen className="w-4 h-4" /> },
    { label: "البلاغات المنشورة", value: posts?.length || 0, icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-12 pb-32 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* Tactical Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#0f172a]/40 backdrop-blur-3xl p-8 rounded-[2rem] border border-white/5 flex items-center justify-between group hover:border-blue-500/30 transition-all shadow-2xl">
            <div>
              <p className="text-[10px] font-mono text-blue-400/60 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
              <h4 className="text-4xl font-black text-white italic">{stat.value}</h4>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:rotate-6 transition-all">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Left Column: Communications Hub (4/12) */}
        <div id="news" className="xl:col-span-4 space-y-10 scroll-mt-32">
           
           <div className="space-y-3 mb-8 border-r-4 border-blue-600 pr-6">
              <h3 className="text-2xl font-black text-white flex items-center gap-4">
                 <Zap className="w-6 h-6 text-blue-500" />
                 قمرة الاتصالات
              </h3>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest italic">COMMAND_HUB // GLOBAL_BULLETINS</p>
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
           
           <div className="space-y-3 mb-8 border-r-4 border-blue-400 pr-6">
              <h3 className="text-2xl font-black text-white flex items-center gap-4">
                 <Layers className="w-6 h-6 text-blue-400" />
                 إدارة المناهج والأرشيف
              </h3>
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest italic">ACADEMIC_OPS // CONTENT_DEPLOYMENT</p>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
              {/* Add New Subject Module */}
              <AddSubjectForm />

              {/* Lecture Upload Station */}
              <AddMaterialForm subjects={subjects || []} />
           </div>

           {/* Active Subjects Database */}
           <SubjectsList subjects={subjects || []} />

        </div>
      </div>
    </div>
  );
}
