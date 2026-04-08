"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  ArrowRight,
  MessageSquare
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    phone: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Hard Reset: Clear any legacy sessions/roles before new login
    document.cookie = "user_role=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "user_phone=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "user_name=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    const { loginStudent } = await import("@/app/actions/authActions");
    const data = new FormData();
    data.append("phone", formData.phone);
    data.append("password", formData.password);
    
    const res = await loginStudent(data);
    setIsLoading(false);

    if (res.success) {
      // Dynamic Redirect based on verified Server Role
      if (res.role === "admin") {
        window.location.href = "/admins";
      } else if (res.role === "management") {
        window.location.href = "/management";
      } else {
        window.location.href = "/dashboard";
      }
    } else {
      alert(res.message);
    }
  };

  const handleForgotPassword = () => {
    const phoneNumber = "YOUR_MANAGEMENT_PHONE"; // Replace with actual phone
    const message = encodeURIComponent(`مرحباً، أريد استعادة كلمة المرور الخاصة بي. رقم الهاتف: ${formData.phone}`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-morphism p-8 md:p-12 rounded-3xl border-secondary/20 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex p-3 rounded-2xl bg-secondary/10 mb-4">
            <Lock className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">تسجيل الدخول</h2>
          <p className="text-slate-400">بوابة الوصول الآمن لطلاب الأمن السيبراني</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Phone className="w-4 h-4 text-secondary" />
              رقم الهاتف
            </label>
            <input
              type="tel"
              required
              placeholder="07XXXXXXXXX"
              className="w-full px-5 py-4 bg-slate-900/50 border border-white/10 rounded-xl focus:border-secondary outline-none transition-all"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Lock className="w-4 h-4 text-secondary" />
                كلمة المرور
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-5 py-4 bg-slate-900/50 border border-white/10 rounded-xl focus:border-secondary outline-none transition-all"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
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

          <div className="flex justify-start">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-xs text-slate-500 hover:text-secondary transition-colors"
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-secondary text-background font-black rounded-xl hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2"
          >
            تأكيد الهوية
            <ShieldCheck className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-slate-400 text-sm">
            ليس لديك حساب بعد؟{" "}
            <Link href="/register" className="text-secondary hover:underline font-bold">
              اطلب إنشاء حساب الآن
            </Link>
          </p>
          <div className="pt-4 border-t border-white/5 flex items-center justify-center gap-2 text-xs text-slate-600">
            <MessageSquare className="w-3 h-3" />
            <span>نظام تسجيل الدخول المؤمن</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
