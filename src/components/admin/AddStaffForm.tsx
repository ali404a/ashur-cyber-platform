"use client";

import { useState } from "react";
import { createStaffAccount } from "@/app/actions/adminActions";
import { 
  UserPlus, ShieldCheck, Key, Phone, User, Briefcase,
  Shield, Loader2, GraduationCap, ChevronDown
} from "lucide-react";

const ACADEMIC_TITLES = [
  "أ.د.", "د.", "م.د.", "أ.م.د.", "أستاذ", "مدرس", "مدرس مساعد", "معيد"
];

const POSITIONS = [
  "عميد الكلية", "معاون العميد", "رئيس القسم", "عضو هيئة تدريس",
  "مشرف الامتحانات", "مسؤول القبول", "مسؤول تقنية المعلومات", "إداري"
];

export default function AddStaffForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await createStaffAccount(formData);

    if (result.success) {
      setMessage(result.message || "تم إنشاء الحساب بنجاح 🛡️");
      (e.target as HTMLFormElement).reset();
    } else {
      setError(result.error || "فشل إنشاء الحساب");
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-arabic text-right">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* Academic Title */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">المسمى العلمي</label>
          <div className="relative">
            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <select name="academicTitle" required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-sm text-white focus:outline-none focus:border-primary/40 transition-all appearance-none">
              <option value="" disabled selected className="bg-slate-900">اختر المسمى العلمي</option>
              {ACADEMIC_TITLES.map(t => <option key={t} value={t} className="bg-slate-900">{t}</option>)}
            </select>
            <ChevronDown className="absolute left-10 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600 pointer-events-none" />
          </div>
        </div>

        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">الاسم الثلاثي</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input name="fullName" type="text" required placeholder="الاسم الأول والأوسط والأخير"
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/40 transition-all" />
          </div>
        </div>

        {/* Position */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">المسمى الوظيفي</label>
          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <select name="position" required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-sm text-white focus:outline-none focus:border-primary/40 transition-all appearance-none">
              <option value="" disabled selected className="bg-slate-900">اختر المسمى الوظيفي</option>
              {POSITIONS.map(p => <option key={p} value={p} className="bg-slate-900">{p}</option>)}
            </select>
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">رقم الهاتف</label>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input name="phoneNumber" type="text" required placeholder="07XXXXXXXXX"
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/40 transition-all font-mono" />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">كلمة السر</label>
          <div className="relative">
            <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <input name="password" type={showPassword ? "text" : "password"} required placeholder="••••••••"
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/40 transition-all" />
            <button type="button" onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-white transition-colors text-xs">
              {showPassword ? "إخفاء" : "إظهار"}
            </button>
          </div>
        </div>

        {/* Role */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block">رتبة الصلاحيات</label>
          <div className="relative">
            <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
            <select name="role" required className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-5 text-sm text-white focus:outline-none focus:border-primary/40 transition-all appearance-none">
              <option value="management" className="bg-slate-900">كادر تدريسي — نشر البلاغات</option>
              <option value="admin" className="bg-slate-900">مسؤول أعلى — تحكم كامل</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-2xl text-xs font-black flex items-center gap-3">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />{message}
        </div>
      )}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl text-xs font-black flex items-center gap-3">
          <Shield className="w-4 h-4 flex-shrink-0" />{error}
        </div>
      )}

      <button type="submit" disabled={loading}
        className="w-full py-5 rounded-[1.8rem] bg-primary text-background font-black text-sm flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-[0_0_30px_rgba(0,255,65,0.15)] disabled:opacity-50">
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><UserPlus className="w-5 h-5" />تفعيل الحساب ومنح الصلاحيات</>}
      </button>
    </form>
  );
}
