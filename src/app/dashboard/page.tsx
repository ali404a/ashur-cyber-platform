"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Clock, 
  User, 
  Tag,
  AlertCircle,
  BookMarked,
  Layout
} from "lucide-react";

const posts = [
  {
    id: 1,
    title: "موعد امتحان الشهر الأول - أمن الشبكات",
    desc: "نود إعلام طلبة المرحلة الثالثة أن موعد امتحان الشهر الأول لمادة أمن الشبكات سيكون يوم السبت القادم الساعة 10:00 صباحاً.",
    type: "exam",
    date: "2024-04-10",
    publisher: "أ. علي حسن",
    color: "#EF4444" // Red for exams
  },
  {
    id: 2,
    title: "محاضرة إضافية مادة التشفير",
    desc: "تمت إضافة محاضرة مسجلة جديدة على Google Drive تتناول موضوع RSA Algorithm. يرجى الاطلاع عليها قبل محاضرة الأحد.",
    type: "lecture",
    date: "2024-04-09",
    publisher: "مقرر القسم",
    color: "#10B981" // Green for lectures
  },
  {
    id: 3,
    title: "واجب منزلي: تحليل ثغرات SQL Injection",
    desc: "يرجى حل الواجب المرفق وتسليمه عبر المنصة في موعد أقصاه يوم الخميس.",
    type: "assignment",
    date: "2024-04-08",
    publisher: "أ. محمد علي",
    color: "#3B82F6" // Blue for assignments
  },
  {
    id: 4,
    title: "تبليغ عام: صيانة مختبرات الحاسوب",
    desc: "سيتم إغلاق المختبر رقم 3 للصيانة الدورية لمدة يومين. نعتذر عن الإزعاج.",
    type: "general",
    date: "2024-04-07",
    publisher: "إدارة القسم",
    color: "#F59E0B" // Amber for general
  }
];

export default function DashboardPosts() {
  const [filter, setFilter] = useState("all");

  const filteredPosts = filter === "all" ? posts : posts.filter(p => p.type === filter);

  const getIcon = (type: string) => {
    switch(type) {
      case "exam": return <AlertCircle className="w-5 h-5" />;
      case "lecture": return <BookMarked className="w-5 h-5" />;
      case "assignment": return <Layout className="w-5 h-5" />;
      default: return <MessageSquare className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Tag className="text-primary" />
          أحدث المنشورات
        </h2>
        <div className="flex items-center gap-2">
          <select 
            className="glass-morphism px-4 py-2 rounded-xl outline-none text-sm border-white/5"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">كل المنشورات</option>
            <option value="general">تبليغ عام</option>
            <option value="lecture">محاضرات</option>
            <option value="exam">امتحانات</option>
            <option value="assignment">واجبات</option>
          </select>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="بحث في المنشورات..."
              className="glass-morphism pr-10 pl-4 py-2 rounded-xl outline-none text-sm border-white/5 w-64"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <div 
            key={post.id}
            className="glass-morphism p-6 rounded-3xl border-transparent hover:border-white/10 transition-all flex flex-col group relative overflow-hidden"
          >
            {/* Color Strip */}
            <div 
              className="absolute right-0 top-0 bottom-0 w-1.5" 
              style={{ backgroundColor: post.color }}
            />
            
            <div className="flex items-center justify-between mb-4">
              <div 
                className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-2"
                style={{ backgroundColor: `${post.color}20`, color: post.color }}
              >
                {getIcon(post.type)}
                {post.type === "exam" ? "تبليغ امتحان" : 
                 post.type === "lecture" ? "تبليغ محاضرة" : 
                 post.type === "assignment" ? "تبليغ واجب" : "تبليغ عام"}
              </div>
              <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                <Clock className="w-3 h-3" />
                {post.date}
              </div>
            </div>

            <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
              {post.desc}
            </p>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-6 h-6 rounded-full bg-slate-800" />
                <span>نشر بـواسطة: <span className="text-slate-300 font-medium">{post.publisher}</span></span>
              </div>
              <button className="text-xs font-bold text-primary hover:underline">
                عرض التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
