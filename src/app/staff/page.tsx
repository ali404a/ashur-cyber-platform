"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Phone, 
  ArrowLeft, 
  Zap, 
  Loader2,
  AlertCircle,
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { loginStaff } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";

export default function StaffLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;

    const result = await loginStaff(phone, password);
    
    if (result.success) {
      router.push("/dashboard");
    } else {
      setError(result.error || "بيانات الدخول غير صحيحة. يرجى مراجعة الإدارة.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-arabic selection:bg-primary/30 relative overflow-hidden">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.03)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-lg relative z-10">
        {/* Horizontal Navigation Link */}
        <div className="mb-10 flex justify-start">
          <Link 
            href="/" 
            className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-all group bg-white/5 px-5 py-2.5 rounded-full border border-white/5"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            العودة للمنصة الرئيسية
          </Link>
        </div>

        {/* Tactical Command Header */}
        <div className="text-center mb-10 space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group relative">
            <div className="absolute inset-0 bg-primary/20 rounded-[2.5rem] blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
            <ShieldCheck className="w-12 h-12 text-primary relative z-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-tight">
              مركز_قيادة_الكادر
            </h1>
            <div className="flex items-center justify-center gap-3">
               <div className="h-px w-8 bg-slate-800" />
               <p className="text-[10px] text-slate-500 font-mono uppercase tracking-[0.4em]">Auth_Protocol_v4.2</p>
               <div className="h-px w-8 bg-slate-800" />
            </div>
          </div>
        </div>

        {/* Authenticative Shield Form */}
        <div className="glass-morphism p-10 md:p-14 rounded-[4rem] border-white/5 shadow-2xl relative overflow-hidden backdrop-blur-3xl">
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          
          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            {/* Field: Phone Input */}
            <div className="space-y-4">
              <label className="flex items-center justify-between px-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">رقم الهوية الإداري (الهاتف)</span>
                <Phone className="w-3.5 h-3.5 text-primary/60" />
              </label>
              <div className="relative group">
                <input 
                  name="phone"
                  required
                  type="text" 
                  placeholder="077XXXXXXXX"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[1.8rem] px-8 py-5 text-xl font-mono focus:border-primary/40 outline-none transition-all placeholder:text-slate-800 group-hover:bg-white/[0.06] shadow-inner"
                />
              </div>
            </div>

            {/* Field: Password Input with Toggle */}
            <div className="space-y-4">
              <label className="flex items-center justify-between px-3">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">رمز المرور الأمني</span>
                <Lock className="w-3.5 h-3.5 text-primary/60" />
              </label>
              <div className="relative group">
                <input 
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[1.8rem] px-8 py-5 text-xl focus:border-primary/40 outline-none transition-all placeholder:text-slate-800 group-hover:bg-white/[0.06] shadow-inner"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 hover:text-primary transition-colors p-2"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-3xl flex items-start gap-4 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-red-200 leading-relaxed italic">{error}</p>
              </div>
            )}

            {/* Tactical Access Trigger */}
            <button 
              disabled={loading}
              className="w-full group relative overflow-hidden bg-primary text-background font-black py-6 rounded-[2.2rem] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_60px_rgba(0,255,65,0.15)] disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative flex items-center justify-center gap-4">
                {loading ? (
                  <Loader2 className="w-7 h-7 animate-spin" />
                ) : (
                  <>
                    <Zap className="w-6 h-6 fill-current" />
                    <span className="text-2xl tracking-tighter italic">ولوج_مركز_العمليات</span>
                  </>
                )}
              </div>
            </button>
          </form>
        </div>

        {/* Tactical Metadata Footer */}
        <div className="mt-14 flex items-center justify-between px-8 opacity-40 group hover:opacity-100 transition-opacity">
           <div className="text-[9px] font-mono tracking-[0.3em] text-slate-500 flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             NODE_SECURE // AES_256
           </div>
           <div className="w-16 h-px bg-slate-800" />
           <div className="text-[9px] font-mono tracking-[0.2em] text-slate-500 uppercase font-black">
             ASHUR_CYBER_PLATFORM
           </div>
        </div>
      </div>
    </div>
  );
}
