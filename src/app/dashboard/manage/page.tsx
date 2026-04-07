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

  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-20 px-4">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight flex items-center gap-4 text-white">
             <Layout className="w-8 h-8 text-secondary" />
             مركز الإدارة التعليمية
          </h1>
          <p className="text-[10px] md:text-xs text-slate-500 font-mono uppercase tracking-[0.4em]">
             Academic_Command_Center // Node_v01.0
          </p>
        </div>
        <div className="flex items-center gap-3 bg-secondary/10 px-6 py-3 rounded-2xl border border-secondary/20 w-fit">
           <ShieldCheck className="w-5 h-5 text-secondary" />
           <span className="text-xs font-black text-secondary uppercase tracking-widest">Admin_Access_LvL_01</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Post Center & New Subjects */}
        <div className="lg:col-span-1 space-y-8">
           
           {/* Add New Subject Module */}
           <AddSubjectForm />

           {/* Post News Bulletin */}
           <AddPostForm />

           {/* Posts Inventory */}
           <PostsList posts={posts || []} />
        </div>

        {/* Right Column: Upload Hub & Subjects Inventory */}
        <div className="lg:col-span-2 space-y-12">
           
           {/* Lecture Upload Station */}
           <AddMaterialForm subjects={subjects || []} />

           {/* Active Subjects Summary */}
           <SubjectsList subjects={subjects || []} />

        </div>
      </div>
    </div>
  );
}
