"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";
import { registerStudent } from "@/app/actions/authActions";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await registerStudent(formData);

    setIsLoading(false);
    if (result.success) {
      setMessage({ type: "success", text: result.message });
      (e.target as HTMLFormElement).reset();
    } else {
      setMessage({ type: "error", text: result.message });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg glass-morphism p-8 md:p-12 rounded-3xl border-primary/20 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-4">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold mb-2">إنشاء حساب طالب</h2>
          <p className="text-slate-400">انضم إلى مجتمع مهندسي المستقبل في جامعة أشور</p>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm font-bold ${
                message.type === "success" ? "bg-primary/10 text-primary border border-primary/20" : "bg-red-500/10 text-red-400 border border-red-500/20"
              }`}
            >
              {message.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              {message.text}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              الاسم الثلاثي (بالعربي)
            </label>
            <input
              name="fullName"
              type="text"
              required
              placeholder="مثال: علي محمد حسن"
              className="w-full px-5 py-4 bg-slate-900/50 border border-white/10 rounded-xl focus:border-primary outline-none transition-all"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Phone className="w-4 h-4 text-secondary" />
              رقم الهاتف
            </label>
            <input
              name="phoneNumber"
              type="tel"
              required
              placeholder="07XXXXXXXXX"
              className="w-full px-5 py-4 bg-slate-900/50 border border-white/10 rounded-xl focus:border-secondary outline-none transition-all"
            />
          </div>

          {/* Grade Level */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <ChevronDown className="w-4 h-4 text-primary" />
              المرحلة الدراسية
            </label>
            <select
              name="gradeLevel"
              required
              className="w-full px-5 py-4 bg-slate-900/50 border border-white/10 rounded-xl focus:border-primary outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="1">المرحلة الأولى</option>
              <option value="2">المرحلة الثانية</option>
              <option value="3">المرحلة الثالثة</option>
              <option value="4">المرحلة الرابعة</option>
            </select>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              كلمة المرور
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-5 py-4 bg-slate-900/50 border border-white/10 rounded-xl focus:border-primary outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 bg-primary text-background font-black rounded-xl hover:shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all flex items-center justify-center gap-2 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-4 border-background/20 border-t-background rounded-full animate-spin" />
            ) : (
              <>
                إرسال طلب التسجيل
                <ArrowRight className="rotate-180 w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-slate-400 text-sm">
            هل لديك حساب بالفعل؟{" "}
            <Link href="/login" className="text-primary hover:underline font-bold">
              سجل دخولك هنا
            </Link>
          </p>
          <a
            href="https://wa.me/XXXXXXXX"
            target="_blank"
            className="block text-xs text-slate-500 hover:text-secondary transition-colors"
          >
            هل تواجه مشكلة؟ تواصل مع الإدارة عبر واتساب
          </a>
        </div>
      </motion.div>
    </div>
  );
}
