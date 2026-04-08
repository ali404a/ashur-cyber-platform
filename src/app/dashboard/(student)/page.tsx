import React from "react";
import { 
  MessageSquare, 
  User as UserIcon,
  Calendar,
  Megaphone,
  AlertTriangle,
  MonitorPlay,
  ClipboardList
} from "lucide-react";
import { cookies } from "next/headers";
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
      month: 'short',
      day: 'numeric'
    });
  };

  const displayPosts = (dynamicPosts && dynamicPosts.length > 0) ? dynamicPosts : [
    {
      _id: "demo1",
      title: "موعد الاختبار النهائي لمادة التشفير",
      author: "أ.د. علي حسن",
      position: "عميد الكلية",
      content: "نحيطكم علماً بأن الاختبار النهائي لمادة أنظمة التشفير سيكون يوم الخميس القادم في المختبر المركزي. يرجى الالتزام بالوقت والمكان المحدد.",
      createdAt: new Date().toISOString(),
      type: "exam"
    }
  ];

  // Compact Template Mapping Logic
  const getTemplateTheme = (type: string) => {
    switch(type) {
      case 'exam':
        return { 
          icon: <AlertTriangle className="w-5 h-5 text-red-500" />, 
          color: "border-red-500/20 bg-red-500/[0.01]", 
          label: "تبليغ امتحان",
          badge: "bg-red-500/10 text-red-500",
          accent: "red"
        };
      case 'lecture':
        return { 
          icon: <MonitorPlay className="w-5 h-5 text-primary" />, 
          color: "border-primary/20 bg-primary/[0.01]", 
          label: "تبليغ محاضرة",
          badge: "bg-primary/10 text-primary",
          accent: "emerald"
        };
      case 'assignment':
        return { 
          icon: <ClipboardList className="w-5 h-5 text-amber-500" />, 
          color: "border-amber-500/20 bg-amber-500/[0.01]", 
          label: "تبليغ واجبات",
          badge: "bg-amber-500/10 text-amber-500",
          accent: "amber"
        };
      default:
        return { 
          icon: <Megaphone className="w-5 h-5 text-blue-500" />, 
          color: "border-blue-500/20 bg-blue-500/[0.01]", 
          label: "تبليغ عام",
          badge: "bg-blue-500/10 text-blue-500",
          accent: "blue"
        };
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      {/* Refined Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-black flex items-center gap-3 tracking-tighter text-white uppercase">
            <MessageSquare className="w-8 h-8 text-primary shadow-[0_0_15px_rgba(0,255,65,0.3)]" />
            مركز التبليغات الأساسي
          </h1>
          <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.4em] pl-1">
            Core_Communications_Terminal // v2.1
          </p>
        </div>
      </div>

      {/* Compact Tactical News Grid */}
      <div className="grid grid-cols-1 gap-6">
        {displayPosts.map((post: any) => {
          const theme = getTemplateTheme(post.type);
          return (
            <div 
              key={post._id}
              className={`glass-morphism p-6 md:p-8 rounded-[2rem] border transition-all flex flex-col relative overflow-hidden group shadow-xl hover:shadow-2xl ${theme.color}`}
            >
               {/* Horizontal Header: Type, Author, Date */}
               <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-3">
                     <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner group-hover:scale-105 transition-transform duration-300">
                        {theme.icon}
                     </div>
                     <span className={`text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${theme.badge} border border-white/5 shadow-sm`}>
                        {theme.label}
                     </span>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Compact Author Info */}
                    <div className="flex items-center gap-3 border-l border-white/10 pl-6 last:border-0 last:pl-0">
                       <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-500">
                          <UserIcon className="w-4 h-4" />
                       </div>
                       <div className="text-right">
                          <p className="text-white text-xs font-black tracking-tight">{post.author}</p>
                          <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">{post.position}</p>
                       </div>
                    </div>
                    
                    {/* Date */}
                    <div className="hidden sm:flex items-center gap-2 text-slate-500 font-mono text-[10px] font-bold">
                       <Calendar className="w-3 h-3" />
                       {formatDate(post.createdAt)}
                    </div>
                  </div>
               </div>

               {/* Notice Content: More Compact & Legible */}
               <div className="space-y-4">
                  <h3 className="text-lg md:text-2xl font-black text-slate-100 tracking-tight leading-tight group-hover:text-white transition-colors">
                     {post.title}
                  </h3>
                  <p className="text-sm md:text-md text-slate-400 leading-relaxed font-medium opacity-90 group-hover:opacity-100 transition-opacity whitespace-pre-wrap">
                     {post.content}
                  </p>
               </div>

               {/* Modern Bottom Bar */}
               <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full animate-pulse bg-${theme.accent}-500 shadow-[0_0_8px_rgba(0,255,65,0.5)]`} />
                    <span className="text-[9px] font-mono font-black text-slate-500 uppercase tracking-widest shrink-0">
                      ST_CODE: MSG^{(String(post._id)).substring(0,6).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-[8px] font-mono text-slate-700 uppercase tracking-widest group-hover:text-slate-500 transition-colors">
                    Official_Ashur_Protocol
                  </div>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
