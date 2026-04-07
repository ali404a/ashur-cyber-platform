"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Network, 
  Terminal, 
  ChevronRight,
  Fingerprint,
  Zap,
  Globe,
  Database
} from "lucide-react";
import Link from "next/link";
import NebulaBackground from "@/components/NebulaBackground";
import NebulaSlider from "@/components/NebulaSlider";

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden font-arabic">
      <NebulaBackground />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 px-4 md:px-8 flex flex-col items-center justify-center min-h-[90vh]">
        <motion.div style={{ opacity, scale }} className="w-full max-w-7xl mx-auto text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-morphism border-primary/40 mb-10 shadow-[0_0_20px_rgba(0,255,65,0.1)]"
          >
            <ShieldCheck className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-xs md:text-sm font-mono text-primary uppercase tracking-[0.3em] font-bold">
              Securing the Future of Ashur University
            </span>
          </motion.div>

          <motion.div className="mb-12">
            <NebulaSlider />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-5xl md:text-7xl font-light mb-4 tracking-tight leading-tight text-white/90"
          >
            هندسة <span className="font-black text-primary neon-text tracking-tighter">الأمن السيبراني</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col items-center gap-4 mb-14"
          >
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
              نعد الجيل القادم من المهندسين لمواجهة التحديات الرقمية المعاصرة وحماية البنية التحتية المعلوماتية.
            </p>
            <div className="flex items-center gap-2 text-primary/60 text-sm font-mono tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              <span>SECURE_CORE_v2.0</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <Link 
              href="/register" 
              className="px-10 py-5 bg-primary text-background font-black rounded-2xl hover:scale-105 transition-all shadow-[0_0_30px_rgba(0,255,65,0.3)] flex items-center gap-3 group text-xl"
            >
              تسجيل حساب طالب
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform ml-2" />
            </Link>
            <button className="px-10 py-5 glass-morphism border-slate-700 hover:border-secondary hover:text-secondary transition-all rounded-2xl text-white font-bold text-xl relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <Database className="w-5 h-5 ml-2" />
                استكشف المختبرات
              </span>
              <div className="absolute inset-0 bg-secondary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Feature Section (Subjects) */}
      <section id="subjects" className="py-32 px-4 md:px-8 bg-black/40 backdrop-blur-md relative z-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Lock className="w-12 h-12 text-primary" />,
                title: "التشفير المتقدم",
                desc: "دراسة أحدث خوارزميات التشفير لحماية البيانات الحساسة."
              },
              {
                icon: <Network className="w-12 h-12 text-secondary" />,
                title: "أمن الشبكات",
                desc: "بناء وإدارة شبكات آمنة مقاومة للهجمات الخارجية."
              },
              {
                icon: <Terminal className="w-12 h-12 text-primary" />,
                title: "اختبار الاختراق",
                desc: "محاكاة الهجمات الحقيقية لاكتشاف الثغرات وإصلاحها."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -15, borderColor: "rgba(0, 255, 65, 0.4)" }}
                className="p-10 glass-morphism rounded-[2.5rem] border-white/5 transition-all duration-500 cursor-default group"
              >
                <div className="mb-8 p-4 rounded-3xl bg-white/5 border border-white/5 w-fit group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-3xl font-black mb-5 text-white">{feature.title}</h3>
                <p className="text-slate-400 text-lg leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/About Section */}
      <section id="about" className="py-40 px-4 md:px-8 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 text-primary">
              <div className="h-px w-12 bg-primary/50" />
              <span className="font-mono uppercase tracking-widest text-sm font-bold">University Status</span>
            </div>
            <h2 className="text-5xl font-black flex items-center gap-4 leading-tight">
              <Zap className="text-primary w-10 h-10" />
              تعريف بقسمنا الرقمي 🛰️
            </h2>
            <p className="text-slate-300 text-xl leading-[2] font-medium">
              تخصص الأمن السيبراني في جامعة أشور يركز على حماية الأنظمة الرقمية والشبكات من الهجمات. 
              يجمع المنهج بين الأسس الرياضية، وبرمجة الأنظمة، وأخلاقيات الهكر، لضمان تخريج مهندسين 
              قادرين على العمل في كبرى المؤسسات الأمنية والتقنية.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="p-6 glass-morphism rounded-3xl border-primary/20 space-y-3">
                <span className="text-4xl font-black text-primary drop-shadow-sm">95%</span>
                <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-bold">معدل التوظيف</p>
              </div>
              <div className="p-6 glass-morphism rounded-3xl border-secondary/20 space-y-3">
                <span className="text-4xl font-black text-secondary drop-shadow-sm">24/7</span>
                <p className="text-xs text-slate-500 uppercase tracking-[0.2em] font-bold">الدعم والمراقبة</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[550px] glass-morphism rounded-[3rem] border-primary/10 flex items-center justify-center group overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-700" />
            <Fingerprint className="w-56 h-56 text-primary/15 group-hover:scale-110 transition-transform duration-1000 group-hover:rotate-12" />
            
            {/* Decrypting Text Animation Mock */}
            <div className="absolute bottom-10 left-10 p-6 glass-morphism rounded-2xl border-white/10 max-w-[200px]">
              <div className="flex gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse delay-150" />
              </div>
              <p className="font-mono text-[10px] text-primary/60 uppercase tracking-tighter overflow-hidden whitespace-nowrap">
                ACCESSING_ENCRYPTED_DATA...
                <br />
                $ sudo decrypt -f ashur_core
              </p>
            </div>

            <div className="absolute top-10 left-10 p-6 glass-morphism rounded-2xl border-white/10">
              <Terminal className="w-8 h-8 text-primary mb-3" />
              <div className="w-32 h-2 bg-primary/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary shadow-[0_0_10px_var(--primary)]"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer (Contact) */}
      <footer id="contact" className="py-20 border-t border-white/5 px-4 md:px-8 text-center bg-black/20 backdrop-blur-xl relative z-10">
        <div className="flex items-center justify-center gap-6 mb-8 text-slate-500 font-bold">
           <Link href="#" className="hover:text-primary transition-colors">عن القسم</Link>
           <Link href="#" className="hover:text-primary transition-colors">الشروط</Link>
           <Link href="#" className="hover:text-primary transition-colors">اتصل بنا</Link>
        </div>
        <p className="text-slate-500 font-mono text-xs md:text-sm tracking-[0.5em] font-bold opacity-80 uppercase">
          © {new Date().getFullYear()} ASHUR CYBERSECURITY | FORGING THE DIGITAL FRONTIER
        </p>
      </footer>
    </main>
  );
}
