"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ShieldAlert, 
  Lock, 
  Cpu, 
  Terminal, 
  ChevronRight,
  Fingerprint,
  Activity,
  Server,
  Radar,
  Zap,
  Globe,
  Database,
  Search,
  Eye,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import DataStream from "@/components/DataStream";
import CyberHUD from "@/components/CyberHUD";
import TechCard from "@/components/TechCard";

export default function LandingPage() {
  const [booted, setBooted] = useState(false);
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setBooted(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-hidden font-arabic selection:bg-primary/30 selection:text-primary">
      {/* Background Layers */}
      <div className="absolute inset-0 legendary-grid opacity-20 pointer-events-none z-0" />
      <div className="absolute inset-0 sub-grid opacity-10 pointer-events-none z-0" />
      <DataStream />
      <div className="absolute inset-0 data-overlay z-10" />

      {/* Cyber HUD Overlays */}
      <CyberHUD />

      {/* Hero / System Access Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 md:px-8 z-20">
        <AnimatePresence>
          {booted && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full max-w-7xl mx-auto text-center"
            >
              {/* Tactical Status Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-lg bg-black/40 border border-secondary/20 mb-8 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                <span className="text-[10px] font-mono text-secondary tracking-[0.4em] uppercase font-bold">
                  System_Status: Optimal // Secure_Handshake_Established
                </span>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
                className="relative inline-block mb-8"
              >
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-white/90">
                  <span className="block font-light text-slate-500 text-3xl md:text-4xl mb-4 tracking-widest uppercase">Cyber_Engineering_Dept</span>
                  جامعة أشور <br /> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-gradient-flow neon-text-cyan leading-tight">
                    قسم هندسة الأمن السيبراني
                  </span>
                </h1>
                
                {/* HUD Decorative Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-10 -left-10 w-32 h-32 border-2 border-dashed border-primary/10 rounded-full pointer-events-none"
                />
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto mb-14 leading-relaxed font-medium bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/5"
              >
                تحويل التحديات الرقمية إلى فرص استراتيجية. نحن نعد النخبة القادمة من خبراء الأمن لحماية البنية التحتية العالمية وتشكيل مستقبل الفضاء السيبراني. 
                <span className="block mt-4 text-primary/60 text-xs font-mono uppercase tracking-widest">
                  {"[ Protocol_Established: 100%_Integrity ]"}
                </span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="flex flex-col md:flex-row items-center justify-center gap-6"
              >
                <Link 
                  href="/register" 
                  className="px-12 py-5 bg-primary text-background font-black rounded-sm hover:translate-y-[-4px] transition-all shadow-[0_0_40px_rgba(0,255,65,0.3)] flex items-center gap-4 group text-xl uppercase tracking-tighter tech-border"
                >
                  <Fingerprint className="w-6 h-6 ml-2" />
                  بدء التسجيل الرقمي
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform mr-2" />
                </Link>
                <button className="px-12 py-5 glass-morphism border-secondary/20 hover:border-secondary hover:text-secondary transition-all rounded-sm text-white font-bold text-xl relative group">
                   <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 flex items-center gap-3">
                    <Zap className="w-5 h-5 ml-2 text-primary" />
                    كن متميزاً
                  </span>
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Tactical Modules (Features) */}
      <section id="subjects" className="relative py-40 px-4 md:px-8 bg-black/60 backdrop-blur-md z-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-24 text-center">
            <h2 className="text-[10px] font-mono text-primary tracking-[0.8em] uppercase font-bold mb-4">Tactical_Capabilities</h2>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">وحدات تقنية متقدمة</h3>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mt-8 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <TechCard 
              delay={0.1}
              tag="SEC_MOD_01"
              icon={<ShieldAlert className="w-10 h-10 text-primary" />}
              title="الدفاع النشط"
              description="تطوير استراتيجيات الاستجابة السريعة واكتشاف التهديدات قبل وقوعها باستخدام تقنيات الذكاء الاصطناعي."
            />
            <TechCard 
              delay={0.3}
              tag="SEC_MOD_02"
              icon={<Terminal className="w-10 h-10 text-secondary" />}
              title="الهجوم الأخلاقي"
              description="محاكاة سيناريوهات الاختراق المتقدمة لتحديد نقاط الضعف في الأنظمة الحكومية والخاصة."
            />
            <TechCard 
              delay={0.5}
              tag="SEC_MOD_03"
              icon={<Globe className="w-10 h-10 text-primary" />}
              title="تشفير البيانات"
              description="دراسة آليات التشفير المتقدمة وحماية البيانات فائقة السرية من الاختراقات المعاصرة."
            />
          </div>
        </div>
      </section>

      {/* Strategic Overview (About) */}
      <section id="about" className="relative py-40 px-4 md:px-8 z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[650px] hologram-card rounded-[3rem] p-1 flex items-center justify-center group overflow-hidden"
          >
             {/* Dynamic Scan Line inside card */}
             <div className="absolute inset-0 scanline opacity-20" />
            
             <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-12">
                <Radar className="w-64 h-64 text-secondary/10 group-hover:text-primary/20 transition-colors duration-1000 animate-pulse" />
                <div className="space-y-4">
                  <p className="text-secondary/60 font-mono text-[10px] tracking-widest uppercase">Scanning_University_Core_Architecture...</p>
                  <Activity className="w-12 h-12 text-primary/40 mx-auto" />
                </div>
             </div>

             <div className="absolute bottom-10 left-10 p-8 glass-morphism border-primary/20 rounded-2xl max-w-[280px]">
                <div className="flex gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_var(--primary)]" />
                  <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_var(--secondary)]" />
                </div>
                <h4 className="text-xs font-mono text-white mb-2 tracking-tighter uppercase font-bold">System_Log: 12-04-2026</h4>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  // Established global research parameters. <br />
                  // Synchronizing student neural databases... <br />
                  // Encryption Protocol: 256-AES/XTS.
                </p>
             </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="inline-block p-2 px-4 rounded-md border border-primary/20 bg-primary/5 text-[10px] font-mono text-primary font-bold tracking-widest uppercase">
              Operational_Report: 001/ASHUR
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tighter">
              نحو استقلال <br /> <span className="text-secondary neon-text-cyan">رقمي كامل</span>
            </h2>
            
            <p className="text-slate-300 text-xl leading-[2] font-medium border-l-4 border-primary/40 pl-8 ml-2">
              في جامعة أشور، لا نكتفي بتدريس النظريات. نحن نقوم ببناء بيئة استخباراتية تفاعلية تحاكي الواقع وتدرب الطلاب على التعامل مع الهجمات السيبرانية الحية، لضمان استقلالية وأمن البيئة الرقمية في المنطقة.
            </p>

            <div className="grid grid-cols-2 gap-10 pt-10">
              <div className="space-y-3 p-6 glass-morphism rounded-3xl border-primary/10">
                 <div className="flex items-center gap-3 text-primary">
                    <Database className="w-5 h-5" />
                    <span className="text-2xl font-black">95%</span>
                 </div>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">معدل التوظيف الاستراتيجي</p>
              </div>
              <div className="space-y-3 p-6 glass-morphism rounded-3xl border-secondary/10">
                 <div className="flex items-center gap-3 text-secondary">
                    <Globe className="w-5 h-5" />
                    <span className="text-2xl font-black">INTL</span>
                 </div>
                 <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">اعتمادات دولية مرموقة</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Access Terminal Footer */}
      <footer id="contact" className="relative py-32 border-t border-white/5 px-4 md:px-8 bg-black/40 backdrop-blur-2xl z-20">
        <DataStream />
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-12">
           <div className="flex items-center gap-4 text-slate-700 font-mono text-xs font-bold">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex gap-1">
                   <div className="w-1 h-1 rounded-full bg-slate-800" />
                   <div className="w-1 h-3 bg-slate-800" />
                </div>
              ))}
           </div>

           <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-slate-400 font-mono text-xs font-bold uppercase tracking-widest">
              <Link href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                 <Terminal className="w-4 h-4" /> // About_Core
              </Link>
              <Link href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                 <Zap className="w-4 h-4" /> // Features_Log
              </Link>
              <Link href="#" className="hover:text-primary transition-colors flex items-center gap-2">
                 <Search className="w-4 h-4" /> // Intelligence
              </Link>
           </div>

           <div className="pt-20">
              <p className="text-slate-600 font-mono text-[9px] tracking-[0.8em] font-black opacity-60 uppercase">
                © {new Date().getFullYear()} ASHUR UNIVERSITY // CYBERSECURITY SYSTEMS // SEC_LEVEL: ALPHA
              </p>
           </div>
        </div>
      </footer>
    </main>
  );
}
