import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { 
  Layout, 
  ShieldCheck,
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

export default async function ManagementPage() {
  const cookieStore = await cookies();
  const userPhone = cookieStore.get("user_phone")?.value;

  // Simple auth check
  if (!userPhone) redirect("/");

  const { subjects } = await getAllSubjects();
  const { posts } = await getLatestPosts();

  // Calculate some stats for the command center feel
  const stats = [
    { label: "المواد النشطة", value: subjects?.length || 0, icon: <Layers className="w-4 h-4" /> },
    { label: "المحاضرات", value: subjects?.reduce((acc: number, s: any) => acc + (s.materials?.length || 0), 0) || 0, icon: <BookOpen className="w-4 h-4" /> },
    { label: "البلاغات", value: posts?.length || 0, icon: <MessageSquare className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20 px-4 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* Tactical Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-morphism p-6 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-secondary/30 transition-all">
            <div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-3xl font-black text-white">{stat.value}</h4>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        
        {/* Left Column: Command & Deployment (4/12) */}
        <div className="xl:col-span-4 space-y-8">
           
           <div className="space-y-2 mb-8">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                 <Zap className="w-5 h-5 text-secondary" />
                 قمرة القيادة
              </h3>
              <p className="text-xs text-slate-500 font-mono">CORE_OPERATIONS // SYSTEM_DEPLOYMENT</p>
           </div>

           {/* Add New Subject Module */}
           <AddSubjectForm />

           {/* Post News Bulletin */}
           <AddPostForm />

           {/* Recent Bulletins */}
           <div className="pt-4">
              <PostsList posts={posts || []} />
           </div>
        </div>

        {/* Right Column: Intelligence & Storage (8/12) */}
        <div className="xl:col-span-8 space-y-12">
           
           <div className="space-y-2 mb-8">
              <h3 className="text-xl font-black text-white flex items-center gap-3">
                 <Layers className="w-5 h-5 text-primary" />
                 قاعدة البيانات والمحاضرات
              </h3>
              <p className="text-xs text-slate-500 font-mono">ACADEMIC_INTELLIGENCE // CONTENT_HUB</p>
           </div>

           {/* Lecture Upload Station */}
           <AddMaterialForm subjects={subjects || []} />

           {/* Active Subjects Summary */}
           <SubjectsList subjects={subjects || []} />

        </div>
      </div>
    </div>
  );
}
