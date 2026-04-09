"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { loginStaff } from "@/app/actions/authActions";
import { 
  ShieldCheck, 
  Lock, 
  Phone, 
  Eye, 
  EyeOff, 
  Loader2, 
  ArrowRight, 
  AlertCircle, 
  Shield, 
  Users,
  Activity,
  Binary
} from "lucide-react";
import Link from "next/link";

type LoginMode = "admin" | "staff";

export default function StaffLoginPage() {
  const [mode, setMode] = useState<LoginMode>("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await loginStaff(formData);

    if (result.success) {
      if (mode === "admin" && result.role !== "admin") {
        setError("هذا الحساب ليس حساب مسؤول. جرّب الدخول كـ 'كادر تدريسي'.");
        setLoading(false);
        return;
      }
      if (mode === "staff" && result.role === "admin") {
        setError("هذا حساب مسؤول. جرّب الدخول كـ 'مسؤول النظام'.");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        if (result.role === "admin") {
          router.push("/admins");
        } else {
          router.push("/management");
        }
      }, 1000);
    } else {
      setError(result.message || "بيانات الدخول غير صحيحة");
      setLoading(false);
    }
  }

  const isAdmin = mode === "admin";

  if (!mounted) return null;

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center relative overflow-hidden font-arabic bg-[#020617] text-white"
    >
      {/* --- PREMIUM DEPTH BACKGROUND --- */}
      <div className="absolute inset-0 z-0">
         {/* Deep Gradient */}
         <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#050b1d] to-[#010413]" />
         
         {/* Animated Glows - Behind and pointer-events-none */}
         <motion.div 
           animate={{ 
             scale: [1, 1.1, 1],
             opacity: [0.3, 0.4, 0.3],
             x: ["-10%", "5%", "-10%"] 
           }}
           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"
         />
         
         {/* HUD Gridlines - Barely visible, strictly decorative */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: `linear-gradient(rgba(37,99,235,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px"
         }} />
      </div>

      {/* --- INTERACTIVE CONTAINER --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 w-full max-w-[500px] mx-4"
      >
        
        {/* Terminal Header */}
        <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-8">
               <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-blue-500/50" />
               <div className={`p-4 rounded-2xl bg-white/5 border border-white/10 ${isAdmin ? "text-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]" : "text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.2)]"} transition-all duration-500`}>
                  {isAdmin ? <Shield className="w-10 h-10" /> : <Users className="w-10 h-10" />}
               </div>
               <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-blue-500/50" />
            </div>
            
            <h1 className="text-4xl font-black tracking-tighter mb-2 italic">
               {isAdmin ? "مسؤول النظام" : "لوحة الكادر التدريسي"}
            </h1>
            <p className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-blue-500/60">
               Secured // Academic_Authority // v3.0
            </p>
        </div>

        {/* Main Card */}
        <div className="glass-morphism-strong p-10 md:p-14 rounded-[3rem] border-white/10 shadow-2xl relative">
           
           {/* Mode Switcher */}
           <div className="flex p-1.5 bg-black/40 rounded-2xl mb-10 border border-white/5 relative">
              <motion.div 
                animate={{ x: isAdmin ? "0%" : "-100%" }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="absolute inset-y-1.5 right-1.5 w-[calc(50%-6px)] bg-blue-600 rounded-xl shadow-lg"
              />
              <button 
                onClick={() => { setMode("admin"); setError(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black relative z-10 transition-colors ${isAdmin ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
              >
                 <Lock className="w-3.5 h-3.5" />
                 مسؤول
              </button>
              <button 
                onClick={() => { setMode("staff"); setError(""); }}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black relative z-10 transition-colors ${!isAdmin ? "text-white" : "text-slate-500 hover:text-slate-300"}`}
              >
                 <Users className="w-3.5 h-3.5" />
                 كادر تدريسي
              </button>
           </div>

           <form onSubmit={handleSubmit} className="space-y-8">
              {/* Phone Input */}
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pr-2">رقم الهاتف</label>
                 <div className="relative group">
                    <Phone className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      name="phone"
                      type="text"
                      required
                      placeholder="07XXXXXXXXX"
                      className="w-full bg-[#030712] border border-white/10 rounded-2xl py-5 pr-14 pl-6 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all font-mono"
                    />
                 </div>
              </div>

              {/* Password Input */}
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block pr-2">كلمة المرور</label>
                 <div className="relative group">
                    <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                    <input 
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      className="w-full bg-[#030712] border border-white/10 rounded-2xl py-5 pr-14 pl-14 text-sm text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 outline-none transition-all font-mono"
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                    >
                       {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                 </div>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                 {error && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: "auto" }}
                     exit={{ opacity: 0, height: 0 }}
                     className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold"
                   >
                     <AlertCircle className="w-4 h-4" />
                     {error}
                   </motion.div>
                 )}
              </AnimatePresence>

              {/* Action Button */}
              <button 
                type="submit"
                disabled={loading || success}
                className={`w-full py-5 rounded-2xl font-black text-sm tracking-widest uppercase flex items-center justify-center gap-4 transition-all duration-300 disabled:opacity-50 ${
                   success 
                   ? "bg-green-600 text-white" 
                   : "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_10px_30px_rgba(37,99,235,0.2)] hover:shadow-blue-500/40 active:scale-[0.98]"
                }`}
              >
                 {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : success ? <ShieldCheck className="w-5 h-5" /> : <><ShieldCheck className="w-5 h-5" /> تسجيل الدخول</>}
              </button>
           </form>
        </div>

        {/* Back navigation */}
        <div className="text-center mt-12 pb-10">
           <Link href="https://ashur.alsadim.xyz" className="inline-flex items-center gap-3 text-xs font-bold text-slate-500 hover:text-blue-500 transition-colors group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              العودة للمنصة الرئيسية للطلاب
           </Link>
        </div>
      </motion.div>

      {/* Decorative Assets - Strictly behind and non-interactive */}
      <div className="absolute top-10 left-10 opacity-20 pointer-events-none hidden xl:block">
         <div className="flex flex-col gap-2 scale-75">
            <div className="flex items-center gap-4">
               <Activity className="w-4 h-4 text-blue-500" />
               <span className="text-[10px] font-mono">NODE: ONLINE</span>
            </div>
            <div className="flex items-center gap-4">
               <Binary className="w-4 h-4 text-blue-500" />
               <span className="text-[10px] font-mono">AUTH: AES_256</span>
            </div>
         </div>
      </div>
    </div>
  );
}
