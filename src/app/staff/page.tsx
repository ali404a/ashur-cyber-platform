"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginStaff } from "@/app/actions/authActions";
import { ShieldCheck, Lock, Phone, Eye, EyeOff, Loader2, ArrowRight, AlertCircle, Shield, Users } from "lucide-react";
import Link from "next/link";

type LoginMode = "admin" | "staff";

export default function StaffLoginPage() {
  const [mode, setMode] = useState<LoginMode>("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await loginStaff(formData);

    if (result.success) {
      // Validate role matches selected mode
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
      }, 800);
    } else {
      setError(result.message || "بيانات الدخول غير صحيحة");
      setLoading(false);
    }
  }

  const isAdmin = mode === "admin";

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center relative overflow-hidden font-arabic"
      style={{ background: "linear-gradient(135deg, #020617 0%, #0a0f1e 50%, #020617 100%)" }}
    >
      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(0,255,65,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,65,1) 1px, transparent 1px)",
        backgroundSize: "60px 60px"
      }} />

      {/* Glow */}
      <div className={`absolute top-1/4 right-1/4 w-96 h-96 blur-[150px] rounded-full pointer-events-none transition-all duration-700 ${isAdmin ? "bg-primary/8" : "bg-blue-500/8"}`} />
      <div className={`absolute bottom-1/4 left-1/4 w-72 h-72 blur-[120px] rounded-full pointer-events-none transition-all duration-700 ${isAdmin ? "bg-blue-600/5" : "bg-primary/5"}`} />

      <div className="relative z-10 w-full max-w-lg mx-4">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isAdmin ? "bg-primary" : "bg-blue-400"}`} />
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.3em]">جامعة_أشور // الأمن_السيبراني</span>
          </div>

          <div className="flex items-center justify-center mb-5">
            <div className="relative">
              <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(0,255,65,0.15)] transition-all duration-500 ${
                isAdmin
                  ? "bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30"
                  : "bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30"
              }`}>
                {isAdmin
                  ? <Shield className="w-10 h-10 text-primary" />
                  : <Users className="w-10 h-10 text-blue-400" />
                }
              </div>
              <div className={`absolute inset-0 rounded-3xl border animate-ping opacity-20 ${isAdmin ? "border-primary/30" : "border-blue-400/30"}`} />
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1">
            {isAdmin ? "بوابة المسؤول الإداري" : "بوابة الكادر التدريسي"}
          </h1>
          <p className="text-xs text-slate-500 font-mono tracking-widest">
            {isAdmin ? "ADMIN_ACCESS • GLOBAL_AUTHORITY" : "STAFF_ACCESS • TEACHING_PORTAL"}
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex gap-2 p-1.5 bg-white/[0.03] border border-white/8 rounded-2xl mb-6 backdrop-blur-xl">
          <button
            type="button"
            onClick={() => { setMode("admin"); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all duration-300 ${
              isAdmin
                ? "bg-primary text-black shadow-[0_0_20px_rgba(0,255,65,0.2)]"
                : "text-slate-500 hover:text-white"
            }`}
          >
            <Shield className="w-4 h-4" />
            مسؤول النظام
          </button>
          <button
            type="button"
            onClick={() => { setMode("staff"); setError(""); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all duration-300 ${
              !isAdmin
                ? "bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                : "text-slate-500 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            كادر تدريسي
          </button>
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-5">

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
                  className={`w-full bg-white/[0.04] border rounded-xl py-4 pr-12 pl-4 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all font-mono ${
                    isAdmin ? "border-white/10 focus:border-primary/50" : "border-white/10 focus:border-blue-500/50"
                  }`}
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
                  className={`w-full bg-white/[0.04] border rounded-xl py-4 pr-12 pl-12 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all ${
                    isAdmin ? "border-white/10 focus:border-primary/50" : "border-white/10 focus:border-blue-500/50"
                  }`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-red-400 font-medium">{error}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading || success}
              className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-3 transition-all duration-300 mt-2 disabled:opacity-70 ${
                success
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : isAdmin
                  ? "bg-primary text-black hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(0,255,65,0.3)] active:scale-[0.99]"
                  : "bg-blue-500 text-white hover:bg-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] active:scale-[0.99]"
              }`}
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" />جاري التحقق...</>
              ) : success ? (
                <><ShieldCheck className="w-4 h-4" />تم التحقق، جاري الدخول...</>
              ) : (
                <><ArrowRight className="w-4 h-4" />
                  {isAdmin ? "دخول لوحة القيادة" : "دخول بوابة الكادر"}
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/5 text-center">
            <p className="text-[11px] text-slate-600">
              {isAdmin ? "مخصص للمسؤولين الإداريين المعتمدين فقط" : "مخصص للكادر التدريسي المعتمد فقط"}
            </p>
          </div>
        </div>

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
