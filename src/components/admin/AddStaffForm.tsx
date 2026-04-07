"use client";

import { useState } from "react";
import { createStaffAccount } from "@/app/actions/adminActions";
import { 
  UserPlus, 
  ShieldCheck, 
  Key, 
  Phone, 
  User, 
  Briefcase,
  Shield,
  Loader2
} from "lucide-react";

export default function AddStaffForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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
    <div className="glass-morphism p-8 md:p-10 rounded-[3rem] border-white/5 relative overflow-hidden group">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
      
      <div className="relative space-y-8">
        <div className="flex items-center gap-4 border-b border-white/5 pb-6 text-right">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <UserPlus className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white italic tracking-tighter">إضافة عضو كادر جديد</h2>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.3em]">Staff_Provisioning_Protocol_v2.0</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 font-arabic text-right">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pr-2">الاسم الثلاثي للموظف</label>
            <div className="relative group/field">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/field:text-primary transition-colors" />
              <input 
                name="fullName"
                type="text"
                required
                placeholder="مثلاً: أ.د. رامي أحمد"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all"
              />
            </div>
          </div>

          {/* Position */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pr-2">المسمى الوظيفي (المنصب)</label>
            <div className="relative group/field">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/field:text-primary transition-colors" />
              <input 
                name="position"
                type="text"
                required
                placeholder="مثلاً: عميد الكلية"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pr-2">رقم الهاتف للهوية</label>
            <div className="relative group/field">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/field:text-primary transition-colors" />
              <input 
                name="phoneNumber"
                type="text"
                required
                placeholder="07XXXXXXXXX"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all font-mono"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pr-2">رمز الدخول الآمن</label>
            <div className="relative group/field">
              <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/field:text-primary transition-colors" />
              <input 
                name="password"
                type="password"
                required
                placeholder="********"
                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pr-2">رتبة الوصول للنظام</label>
            <select 
              name="role"
              required
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 px-6 text-sm text-white focus:outline-none focus:border-primary/40 transition-all appearance-none italic"
            >
              <option value="management" className="bg-slate-900">أدارة (Management) - نشر البلاغات فقط</option>
              <option value="admin" className="bg-slate-900">مسؤول أعلى (Global Admin) - تحكم كامل</option>
            </select>
          </div>

          {/* Status Messages */}
          <div className="md:col-span-2">
            {message && (
              <div className="bg-primary/10 border border-primary/20 text-primary p-4 rounded-2xl text-xs font-black flex items-center gap-3 animate-slide-up">
                <ShieldCheck className="w-4 h-4" />
                {message}
              </div>
            )}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-xs font-black flex items-center gap-3 animate-shake">
                <Shield className="w-4 h-4" />
                {error}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            className="md:col-span-2 mt-4 bg-primary text-background font-black py-5 rounded-[1.8rem] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(0,255,65,0.2)]"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Shield className="w-5 h-5" />
                تفعيل حساب الموظف ومنحه الرتبة
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
