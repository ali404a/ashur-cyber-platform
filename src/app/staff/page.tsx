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
  Cpu,
  Activity,
  Globe,
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
      className="min-h-screen flex items-center justify-center relative overflow-hidden font-arabic bg-[#020617]"
    >
      {/* --- CINEMATIC BACKGROUND SYSTEM --- */}
      
      {/* 1. Base Gradient Layer */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-[#020617] via-[#050b1d] to-[#020617]" />

      {/* 2. Dynamic Grid Layer */}
      <div className="absolute inset-0 z-0 opacity-[0.05]" style={{
        backgroundImage: `linear-gradient(rgba(37,99,235,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.4) 1px, transparent 1px)`,
        backgroundSize: "80px 80px"
      }} />

      {/* 3. Glowing Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className={`absolute top-[-10%] right-[-10%] w-[500px] h-[500px] blur-[140px] rounded-full pointer-events-none ${isAdmin ? "bg-blue-600/10" : "bg-cyan-500/10"}`} 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
          x: [0, -40, 0],
          y: [0, 60, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className={`absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] blur-[120px] rounded-full pointer-events-none ${isAdmin ? "bg-indigo-600/15" : "bg-blue-500/10"}`} 
      />

      {/* 4. Scanning lines effect */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(37,99,235,0.1) 3px, transparent 3px)",
        backgroundSize: "100% 4px"
      }} />

      {/* 5. Floating Particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5
            }}
            animate={{ 
              y: [null, Math.random() * -100 - 50 + "%"],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              duration: Math.random() * 10 + 10, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* --- MAIN LOGIN TERMINAL --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg mx-4"
      >
        {/* Terminal Header Info */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-3xl"
          >
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse bg-blue-500`} />
            <span className="text-[10px] text-blue-400 font-mono font-bold uppercase tracking-[0.4em]">Ashur // Operations // Center</span>
          </motion.div>

          <div className="space-y-4">
             <div className="flex items-center justify-center gap-6">
                <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-blue-500/50" />
                <div className={`p-6 rounded-[2rem] bg-[#050b1d]/80 border border-white/10 shadow-[0_0_50px_rgba(37,99,235,0.1)] transition-all duration-500 ${isAdmin ? "text-blue-400 shadow-blue-500/20" : "text-cyan-400 shadow-cyan-500/20"}`}>
                   {isAdmin ? <Shield className="w-12 h-12" /> : <Users className="w-12 h-12" />}
                </div>
                <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-blue-500/50" />
             </div>
             
             <h1 className="text-4xl font-black text-white tracking-tighter leading-none italic">
               {isAdmin ? "مركز التحكم الإداري" : "بوابة الكادر الأكاديمي"}
             </h1>
             <p className="text-[11px] text-slate-500 font-mono tracking-[0.2em] font-bold uppercase">
               {isAdmin ? "MASTER_AUTHORITY // LEVEL_01_ACCESS" : "STAFF_PORTAL // CONTENT_MANAGEMENT"}
             </p>
          </div>
        </div>

        {/* Command Center Card */}
        <div className="bg-[#050b1d]/40 border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-2xl backdrop-blur-3xl relative">
          
          {/* Subtle Corner Accents */}
          <div className="absolute top-8 right-8 w-4 h-4 border-t-2 border-r-2 border-blue-500/30 rounded-tr-lg" />
          <div className="absolute bottom-8 left-8 w-4 h-4 border-b-2 border-l-2 border-blue-500/30 rounded-bl-lg" />

          {/* Role Switcher (Tactical Toggle) */}
          <div className="flex gap-3 p-2 bg-black/40 border border-white/5 rounded-2xl mb-10 overflow-hidden relative">
            <motion.div 
              layout
              animate={{ x: isAdmin ? "0%" : "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute inset-y-2 right-2 w-[calc(50%-8px)] bg-blue-600 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)]"
            />
            <button
              type="button"
              onClick={() => { setMode("admin"); setError(""); }}
              className={`flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl text-xs font-black transition-all relative z-10 ${
                isAdmin ? "text-white" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Cpu className="w-4 h-4" />
              مسؤول النظام
            </button>
            <button
              type="button"
              onClick={() => { setMode("staff"); setError(""); }}
              className={`flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl text-xs font-black transition-all relative z-10 ${
                !isAdmin ? "text-white" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Globe className="w-4 h-4" />
              كادر تدريسي
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Phone Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Phone_Identity</label>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(37,99,235,0.5)]" />
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <Phone className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  name="phone"
                  type="text"
                  required
                  placeholder="07XXXXXXXXX"
                  className="w-full bg-[#020617]/50 border border-white/5 rounded-2xl py-5 pr-14 pl-5 text-sm text-white placeholder:text-slate-700 focus:border-blue-500/30 focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">Access_Key</label>
                <Lock className="w-3 h-3 text-slate-600" />
              </div>
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <Lock className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full bg-[#020617]/50 border border-white/5 rounded-2xl py-5 pr-14 pl-14 text-sm text-white focus:border-blue-500/30 focus:outline-none transition-all font-mono"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-400 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Error Notification */}
            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-4 p-5 bg-red-500/5 border border-red-500/10 rounded-2xl"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-[11px] text-red-500 font-bold leading-relaxed">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Command Action Button */}
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] ${
                success
                  ? "bg-green-500/20 text-green-500 border border-green-500/30"
                  : "bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.2)] hover:shadow-blue-500/40"
              }`}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Authenticating...</>
              ) : success ? (
                <><ShieldCheck className="w-4 h-4" /> Access Granted</>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  {isAdmin ? "INITIATE_ADMIN_SESSION" : "INITIATE_STAFF_SESSION"}
                </>
              )}
            </button>
          </form>

          {/* Tactical Disclaimer */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
             <div className="flex items-center gap-3 grayscale opacity-30">
                <img src="/logo.png" alt="Ashur Logo" className="w-10 h-10 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                <p className="text-[9px] font-mono text-slate-500 text-center leading-tight">
                  PROPERTY OF ASHUR UNIVERSITY // CYBERSECURITY DEPT<br/>
                  UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED
                </p>
             </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-12 pb-10">
          <Link href="https://ashur.alsadim.xyz" className="inline-flex items-center gap-3 text-[10px] font-black text-slate-500 hover:text-blue-400 transition-all group uppercase tracking-widest italic">
            <ArrowRight className="w-3 h-3 rotate-180 group-hover:-translate-x-1 transition-transform" />
            العودة للمنصة الرئيسية للطلاب
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
