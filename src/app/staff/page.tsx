"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginStaff } from "@/app/actions/authActions";
import { 
  ShieldCheck, 
  Lock, 
  Phone, 
  ArrowRight, 
  Zap, 
  ArrowLeft,
  Loader2,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";

export default function StaffLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginStaff(formData);

    if (result.success) {
      // Direct routing based on staff role
      if (result.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/manage");
      }
    } else {
      setError(result.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />

      {/* Main Terminal Box */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-black text-slate-500 hover:text-white transition-colors mb-8 group uppercase tracking-widest">
           <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
           Back_To_Campus
        </Link>

        {/* Branding */}
        <div className="mb-12 text-center">
           <div className="w-20 h-20 bg-white/5 border border-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl relative">
              <ShieldCheck className="w-10 h-10 text-primary animate-pulse" />
              <div className="absolute inset-0 border-2 border-primary/20 rounded-3xl animate-ping opacity-20" />
           </div>
           <h1 className="text-3xl font-black tracking-tighter leading-tight mb-2">
              Staff_Command_Center
           </h1>
           <p className="text-[10px] text-slate-600 font-mono uppercase tracking-[0.4em]">
              Security_Authentication_v2.0
           </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="glass-morphism p-8 rounded-[2.5rem] border-white/5 space-y-5">
              
              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block pr-2 italic">Access_ID (Phone)</label>
                 <div className="relative">
                    <input 
                      name="phone"
                      required
                      type="text" 
                      placeholder="07XXXXXXXX" 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl px-12 py-4 text-sm focus:border-primary outline-none transition-all placeholder:text-slate-800 font-mono" 
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest block pr-2 italic">Secure_Passkey</label>
                 <div className="relative">
                    <input 
                      name="password"
                      required
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full bg-black/40 border border-white/5 rounded-2xl px-12 py-4 text-sm focus:border-primary outline-none transition-all placeholder:text-slate-800" 
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700" />
                 </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 text-xs font-bold animate-in fade-in slide-in-from-top-2">
                   <ShieldAlert className="w-4 h-4" />
                   {error}
                </div>
              )}

              <button 
                disabled={loading}
                className="w-full bg-primary text-background font-black py-5 rounded-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 shadow-[0_0_40px_rgba(0,255,65,0.2)] disabled:opacity-50"
              >
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                    <>
                      ENTER_OPERATIONS
                      <Zap className="w-4 h-4 fill-current" />
                    </>
                 )}
              </button>
           </div>
        </form>

        {/* Footer Notes */}
        <div className="mt-12 text-center space-y-4">
           <p className="text-[10px] text-slate-800 font-mono uppercase tracking-[0.2em] leading-relaxed">
              Authorized Personnel Only. <br />
              All Access Signals Are Logged and Traced.
           </p>
           <div className="flex items-center justify-center gap-2 opacity-20">
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="w-1 h-1 bg-primary rounded-full animate-pulse" />
           </div>
        </div>

      </div>
    </div>
  );
}
