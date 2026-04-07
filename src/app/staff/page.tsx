"use client";

import React, { useState } from "react";
import { 
  ShieldCheck, 
  Lock, 
  Phone, 
  ArrowLeft, 
  Zap, 
  Loader2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { loginStaff } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";

export default function StaffLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      router.push("/dashboard/admin");
    } else {
      setError(result.error || "فشل التحقق الأمني. يرجى التأكد من البيانات.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 font-arabic selection:bg-primary/30">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="w-full max-w-lg relative">
        {/* Navigation Escape */}
        <div className="absolute -top-20 left-0">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            العودة للرئيسية_CAMPUS
          </Link>
        </div>

        {/* Tactical Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.02)] mb-6">
            <ShieldCheck className="w-10 h-10 text-primary animate-pulse" />
          </div>
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
              مركز_قيادة_الكادر
            </h1>
            <p className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.4em]">SECURITY_AUTHENTICATION_V2.0</p>
          </div>
        </div>

        {/* Authentication Core */}
        <div className="glass-morphism p-10 md:p-12 rounded-[3.5rem] border-white/5 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            {/* Input Node: Phone */}
            <div className="space-y-3">
              <label className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">رقم الهاتف الإداري</span>
                <Phone className="w-3 h-3 text-slate-700" />
              </label>
              <div className="relative group">
                <input 
                  name="phone"
                  required
                  type="text" 
                  placeholder="077XXXXXXXX"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg font-mono focus:border-primary/50 outline-none transition-all placeholder:text-slate-800 group-hover:bg-white/[0.07]"
                />
                <div className="absolute inset-0 rounded-2xl border border-primary/20 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Input Node: Password */}
            <div className="space-y-3">
              <label className="flex items-center justify-between px-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">كلمة المرور السرية</span>
                <Lock className="w-3 h-3 text-slate-700" />
              </label>
              <div className="relative group">
                <input 
                  name="password"
                  required
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-lg focus:border-primary/50 outline-none transition-all placeholder:text-slate-800 group-hover:bg-white/[0.07]"
                />
                <div className="absolute inset-0 rounded-2xl border border-primary/20 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-start gap-3 animate-shake">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs font-bold text-red-200 leading-relaxed">{error}</p>
              </div>
            )}

            {/* Access Trigger */}
            <button 
              disabled={loading}
              className="w-full group relative overflow-hidden bg-primary text-background font-black py-5 rounded-[1.8rem] transition-all hover:scale-[1.02] active:scale-95 shadow-[0_20px_40px_rgba(0,255,65,0.1)] disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <div className="relative flex items-center justify-center gap-3">
                {loading ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <>
                    <Zap className="w-5 h-5 fill-current" />
                    <span className="text-xl tracking-tight">تسجيل الدخول للمركز</span>
                  </>
                )}
              </div>
            </button>
          </form>
        </div>

        {/* Footer Cryptography */}
        <div className="mt-12 flex items-center justify-between px-6 opacity-30 group">
           <div className="text-[8px] font-mono tracking-widest text-slate-500">
             V2.4.9 // PROTOCOL_RTL_SECURE
           </div>
           <div className="w-12 h-px bg-slate-800 group-hover:w-20 transition-all" />
           <div className="text-[8px] font-mono tracking-widest text-slate-500 uppercase">
             Ashur_Academic_Core
           </div>
        </div>
      </div>
    </div>
  );
}
