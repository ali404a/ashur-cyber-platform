"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { loginStaff } from "@/app/actions/authActions";
import { ShieldCheck, Lock, Phone, Eye, EyeOff, Loader2, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function StaffLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await loginStaff(formData);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        if (result.role === "admin") {
          router.push("/admins");
        } else {
          router.push("/dashboard/manage");
        }
      }, 800);
    } else {
      setError(result.message || "بيانات الدخول غير صحيحة");
      setLoading(false);
    }
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center relative overflow-hidden font-arabic"
      style={{ background: "linear-gradient(135deg, #020617 0%, #0a0f1e 50%, #020617 100%)" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,255,65,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/8 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg mx-4">

        {/* University Badge */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.3em]">جامعة_أشور // الأمن_السيبراني</span>
          </div>

          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center shadow-[0_0_40px_rgba(0,255,65,0.15)]">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              {/* Ping effect */}
              <div className="absolute inset-0 rounded-3xl border border-primary/20 animate-ping opacity-30" />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1">
            بوابة الكادر الإداري
          </h1>
          <p className="text-xs text-slate-500 font-mono tracking-widest">STAFF_ACCESS_PORTAL • AUTHENTICATED_ZONE</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 block">رقم الهاتف</label>
              <div className="relative">
                <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  name="phone"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="07XXXXXXXXX"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-4 pr-12 pl-4 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] transition-all font-mono"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 block">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="ادخل كلمة المرور"
                  className="w-full bg-white/[0.04] border border-white/10 rounded-xl py-4 pr-12 pl-12 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-xs text-red-400 font-medium">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-3 transition-all duration-300 mt-2 ${
                success
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] active:scale-[0.99]"
              } disabled:opacity-70`}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />جاري التحقق...</>
              ) : success ? (
                <><ShieldCheck className="w-4 h-4" />تم التحقق، جاري الدخول...</>
              ) : (
                <><ArrowRight className="w-4 h-4" />دخول إلى لوحة التحكم</>
              )}
            </button>

          </form>

          {/* Hint */}
          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-slate-600">
              هذه البوابة مخصصة للكادر الإداري والتدريسي المعتمد فقط
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link href="/" className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-400 transition-colors font-mono">
            <ArrowRight className="w-3 h-3 rotate-180" />
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
