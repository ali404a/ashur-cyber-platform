"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginStaff } from "@/app/actions/authActions";
import { 
  ShieldCheck, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  Loader2,
  ChevronLeft,
  Activity,
  UserCheck
} from "lucide-react";
import Link from "next/link";

export default function StaffLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await loginStaff(formData);
    
    if (result.success) {
      if (result.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/manage");
      }
    } else {
      setError(result.message || "بيانات الدخول غير صحيحة. يرجى مراجعة الإدارة.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-arabic selection:bg-primary/20">
      
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Floating Shield Icon */}
      <div className="relative z-10 mb-10 group">
        <div className="w-24 h-24 bg-primary/20 rounded-[2.8rem] flex items-center justify-center border border-primary/30 shadow-[0_0_50px_rgba(0,255,65,0.2)] group-hover:shadow-[0_0_70px_rgba(0,255,65,0.4)] transition-all duration-700 active:scale-95">
           <ShieldCheck className="w-12 h-12 text-primary drop-shadow-[0_0_15px_rgba(0,255,65,1)]" />
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-primary/10 border border-primary/20 p-1 rounded-full px-3 backdrop-blur-xl">
           <Activity className="w-3 h-3 text-primary animate-pulse" />
        </div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-12 space-y-3">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent italic uppercase pr-2">
           مركز_قيادة_الكادر
        </h1>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-primary/40" />
          <p className="text-[10px] md:text-sm text-slate-500 font-mono tracking-[0.5em] uppercase">Auth_Protocol_v4.2</p>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-primary/40" />
        </div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="glass-morphism p-10 md:p-12 rounded-[3.5rem] border-white/5 shadow-2xl relative group">
          
          <form onSubmit={handleSubmit} className="space-y-8 text-right">
            
            {/* Phone Input */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block pr-4">رقم الهوية الإداري (الهاتف)</label>
              <div className="relative group/field">
                <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/field:text-primary transition-all duration-500" />
                <input 
                  name="phone"
                  type="text"
                  required
                  placeholder="07XXXXXXXXX"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[1.8rem] py-5 px-8 pl-14 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all duration-500 font-mono italic"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block pr-4">رمز المرور الأمني</label>
              <div className="relative group/field">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 group-focus-within/field:text-primary transition-all duration-500" />
                <input 
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[1.8rem] py-5 px-8 pl-14 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all duration-500"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-700 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-5 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center gap-3 animate-shake">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                 <span className="text-[11px] font-black text-red-500/80">{error}</span>
              </div>
            )}

            {/* Action Triggers */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-6 rounded-[2rem] bg-primary text-background font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 shadow-[0_0_40px_rgba(0,255,65,0.2)] disabled:opacity-50 group/btn"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <UserCheck className="w-5 h-5 group-hover/btn:rotate-12 transition-transform" />
                  بدء الجلسة الإدارية
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="relative z-10 mt-12 flex flex-col items-center gap-6">
        <Link 
          href="/" 
          className="flex items-center gap-3 text-[10px] text-slate-600 hover:text-primary transition-all font-mono uppercase tracking-[0.3em] group"
        >
          <ChevronLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
          Back_To_Campus_Interface
        </Link>
      </div>

    </div>
  );
}
