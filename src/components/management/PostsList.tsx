"use client";

import { useState } from "react";
import { deletePost } from "@/app/actions/managementActions";
import { 
  MessageSquare, 
  Trash2, 
  Clock, 
  User as UserIcon,
  AlertCircle
} from "lucide-react";

export default function PostsList({ posts }: { posts: any[] }) {
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا المنشور؟")) return;
    setDeleting(id);
    await deletePost(id);
    setDeleting(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
         <h3 className="text-xl font-black tracking-tight">سجل البلاغات الصادرة</h3>
         <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{posts?.length} Broadcast_Signals</span>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
         {posts?.map((post: any) => (
            <div key={post._id} className="p-6 rounded-[2rem] glass-morphism border-white/5 flex items-center justify-between hover:border-white/10 transition-all group relative overflow-hidden">
               <div className={`absolute left-0 top-0 bottom-0 w-1 ${post.type === 'important' ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.5)]'}`} />
               
               <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-blue-400 group-hover:scale-110 transition-all">
                     <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                     <h4 className="font-bold text-[13px] text-white/90 line-clamp-1 group-hover:text-white transition-colors">{post.title}</h4>
                     <p className="text-[10px] text-slate-500 font-mono flex items-center gap-2 mt-1">
                        <UserIcon className="w-3 h-3 text-blue-500/50" /> {post.author} <span className="text-slate-700">//</span> <span className={post.type === 'important' ? 'text-red-400/70' : 'text-blue-400/70'}>{post.type}</span>
                     </p>
                  </div>
               </div>
               
               <button 
                 disabled={deleting === post._id}
                 onClick={() => handleDelete(post._id)}
                 className="p-3.5 rounded-xl bg-white/5 text-slate-800 hover:bg-red-500 hover:text-white transition-all disabled:opacity-50 shadow-lg"
               >
                  <Trash2 className="w-4 h-4" />
               </button>
            </div>
         ))}
         
         {posts?.length === 0 && (
           <div className="p-8 rounded-[2rem] border border-dashed border-white/5 flex flex-col items-center justify-center text-center opacity-40">
              <MessageSquare className="w-8 h-8 mb-3" />
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-700">No_Active_Signals</p>
           </div>
         )}
      </div>
    </div>
  );
}
