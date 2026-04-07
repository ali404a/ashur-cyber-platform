"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Network, 
  Terminal, 
  Cpu, 
  Database,
  ChevronRight,
  Fingerprint,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-morphism border-primary/30 mb-8"
          >
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-sm font-mono text-primary uppercase tracking-widest">
              Securing the Future of Ashur University
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-8xl font-black mb-6 tracking-tighter"
          >
            هندسة <span className="text-primary neon-text">الأمن</span> <br /> 
            <span className="text-secondary neon-text">السيبراني</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            نحن نعد الجيل القادم من مهندسي الأمن السيبراني لمواجهة التحديات الرقمية المعاصرة وحماية البنية التحتية المعلوماتية.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/register" 
              className="px-8 py-4 bg-primary text-background font-bold rounded-lg hover:scale-105 transition-transform flex items-center gap-2 group"
            >
              تسجيل حساب طالب
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-8 py-4 glass-morphism border-slate-700 hover:border-secondary transition-all rounded-lg text-secondary font-bold">
              استكشف المختبرات
            </button>
          </motion.div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 px-4 md:px-8 bg-slate-900/50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Lock className="w-10 h-10 text-primary" />,
                title: "التشفير المتقدم",
                desc: "دراسة أحدث خوارزميات التشفير لحماية البيانات الحساسة."
              },
              {
                icon: <Network className="w-10 h-10 text-secondary" />,
                title: "أمن الشبكات",
                desc: "بناء وإدارة شبكات آمنة مقاومة للهجمات الخارجية."
              },
              {
                icon: <Terminal className="w-10 h-10 text-primary" />,
                title: "اختبار الاختراق",
                desc: "محاكاة الهجمات الحقيقية لاكتشاف الثغرات وإصلاحها."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-8 glass-morphism rounded-2xl border-white/5 hover:border-primary/50 transition-all cursor-default"
              >
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-32 px-4 md:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-4xl font-bold flex items-center gap-3">
              <Zap className="text-primary" />
              تعريف بقسمنا
            </h2>
            <p className="text-slate-300 text-lg leading-loose">
              تخصص الأمن السيبراني في جامعة أشور يركز على حماية الأنظمة الرقمية والشبكات من الهجمات. 
              يجمع المنهج بين الأسس الرياضية، وبرمجة الأنظمة، وأخلاقيات الهكر، لضمان تخريج مهندسين 
              قادرين على العمل في كبرى المؤسسات الأمنية والتقنية.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <span className="text-3xl font-black text-primary">95%</span>
                <p className="text-sm text-slate-500 uppercase tracking-widest">معدل التوظيف</p>
              </div>
              <div className="space-y-2">
                <span className="text-3xl font-black text-secondary">24/7</span>
                <p className="text-sm text-slate-500 uppercase tracking-widest">الدعم والمراقبة</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[400px] glass-morphism rounded-3xl border-primary/20 flex items-center justify-center group overflow-hidden"
          >
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
            <Fingerprint className="w-48 h-48 text-primary/20 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-4 left-4 p-4 glass-morphism rounded-xl border-white/10">
              <Terminal className="w-6 h-6 text-primary mb-2" />
              <div className="w-24 h-1 bg-primary/30 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 px-4 md:px-8 text-center">
        <p className="text-slate-500 font-mono text-sm tracking-widest">
          © {new Date().getFullYear()} ASHUR CYBERSECURITY DEPARTMENT | ALL RIGHTS OBSERVED
        </p>
      </footer>
    </main>
  );
}
