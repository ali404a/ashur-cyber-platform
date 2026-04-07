import React from "react";
import { 
  MessageSquare, 
  Clock, 
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
      month: 'long',
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
    },
    {
      _id: "demo2",
      title: "محاضرة إضافية عن الأمن السيبراني",
      author: "أ. محمد ناصر",
      position: "أستاذ المادة",
      content: "تعلن الكلية عن إقامة محاضرة إضافية متخصصة في تحليل الثغرات المتقدمة يوم غدٍ الثلاثاء في تمام الساعة العاشرة صباحاً.",
      createdAt: new Date().toISOString(),
      type: "lecture"
    }
  ];

  // Template Mapping Logic
  const getTemplateTheme = (type: string) => {
    switch(type) {
      case 'exam':
        return { 
          icon: <AlertTriangle className="w-8 h-8 text-red-500" />, 
          color: "border-red-500/30 bg-red-500/[0.02]", 
          label: "🚨 تبليغ امتحان (Exam Alert)",
          badge: "bg-red-500 text-white",
          glow: "shadow-[0_0_30px_rgba(239,68,68,0.15)]"
        };
      case 'lecture':
        return { 
          icon: <MonitorPlay className="w-8 h-8 text-primary" />, 
          color: "border-primary/30 bg-primary/[0.02]", 
          label: "🎓 تبليغ محاضرة (Lecture)",
          badge: "bg-primary text-background",
          glow: "shadow-[0_0_30px_rgba(0,255,65,0.15)]"
        };
      case 'assignment':
        return { 
          icon: <ClipboardList className="w-8 h-8 text-yellow-500" />, 
          color: "border-yellow-500/30 bg-yellow-500/[0.02]", 
          label: "📌 تبليغ واجبات (Task)",
          badge: "bg-yellow-500 text-black",
          glow: "shadow-[0_0_30px_rgba(234,179,8,0.15)]"
        };
      default:
        return { 
          icon: <Megaphone className="w-8 h-8 text-blue-500" />, 
          color: "border-blue-500/30 bg-blue-500/[0.02]", 
          label: "📢 تبليغ عام (General)",
          badge: "bg-blue-500 text-white",
          glow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]"
        };
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Page Command Header */}
      <div className="space-y-1">
        <h1 className="text-3xl md:text-5xl font-black flex items-center gap-4 tracking-tighter text-white uppercase italic">
          <MessageSquare className="w-10 h-10 text-primary shadow-[0_0_20px_rgba(0,255,65,0.4)]" />
          مركز التبليغات الموحد
        </h1>
        <p className="text-[10px] md:text-xs text-slate-500 font-mono uppercase tracking-[0.5em] pl-2">
          Integrated_Communications_Core // Phase_IV
        </p>
      </div>

      {/* High-Fidelity News Feed Section */}
      <div className="space-y-10">
        <div className="grid grid-cols-1 last:mb-0 gap-10">
          {displayPosts.map((post: any) => {
            const theme = getTemplateTheme(post.type);
            return (
              <div 
                key={post._id}
                className={`glass-morphism p-8 md:p-12 rounded-[4rem] border transition-all flex flex-col relative overflow-hidden group shadow-2xl ${theme.color} ${theme.glow}`}
              >
                 {/* Visual Template Indicator */}
                 <div className={`absolute top-0 right-0 w-2 h-full opacity-60 group-hover:opacity-100 transition-opacity ${theme.badge.split(' ')[0]}`} />
                 
                 {/* Header: Template Tag & Date */}
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                       <div className="w-20 h-20 rounded-[2.2rem] bg-white/5 border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                          {theme.icon}
                       </div>
                       <div className="space-y-1">
                          <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-slate-400`}>
                             Bulletin_Type: {post.type.toUpperCase()}
                          </span>
                          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter italic">
                             {theme.label}
                          </h2>
                       </div>
                    </div>

                    <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 w-fit self-end md:self-auto">
                       <Calendar className="w-4 h-4 text-slate-500" />
                       <span className="text-[11px] font-black text-slate-400 font-mono tracking-widest">{formatDate(post.createdAt)}</span>
                    </div>
                 </div>

                 {/* Author Identity Shield */}
                 <div className="flex items-center gap-5 mb-10 p-5 rounded-3xl bg-white/[0.02] border border-white/5 w-fit">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-500">
                       <UserIcon className="w-6 h-6" />
                    </div>
                    <div>
                       <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] italic mb-1">{post.position}</p>
                       <h4 className="text-xl font-black text-white tracking-tight">{post.author}</h4>
                    </div>
                 </div>

                 {/* Notice Contents */}
                 <div className="space-y-6 mb-12">
                    <h3 className="text-2xl md:text-4xl font-black text-white tracking-tight leading-tight">
                       {post.title}
                    </h3>
                    <p className="text-lg text-slate-400 leading-relaxed font-medium opacity-90 max-w-5xl">
                       {post.content}
                    </p>
                 </div>

                 {/* Tactical Footer */}
                 <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/5">
                    <div className="flex items-center gap-4">
                       <div className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${theme.badge}`}>
                          ACTIVE // PRIORITY
                       </div>
                    </div>
                    
                    <div className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.4em] font-black group-hover:text-slate-500 transition-colors">
                      AUTH_ID: #{(String(post._id)).substring(0,10).toUpperCase()}
                    </div>
                 </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
