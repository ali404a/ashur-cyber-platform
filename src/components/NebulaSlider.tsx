"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Lock, Terminal, Radio, Cpu, Zap } from "lucide-react";

const slides = [
  {
    icon: <Shield className="w-16 h-16 text-primary" />,
    title: "حماية المستقبل",
    subtitle: "نحن نبني الجيل القادم من خبراء الأمن",
    emoji: "🚀"
  },
  {
    icon: <Lock className="w-16 h-16 text-secondary" />,
    title: "تشفير البيانات",
    subtitle: "أسراركم في أمان مع أحدث التقنيات",
    emoji: "🔐"
  },
  {
    icon: <Terminal className="w-16 h-16 text-primary" />,
    title: "اختبار الاختراق",
    subtitle: "هجوم أخلاقي لحماية أقوى",
    emoji: "💻"
  }
];

export default function NebulaSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[200px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-4"
        >
          {/* Glowing Animated Icon */}
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="p-4 rounded-full bg-white/5 border border-white/10 shadow-[0_0_30px_rgba(0,255,65,0.2)]"
          >
            {slides[index].icon}
          </motion.div>
          
          <div className="space-y-1">
             <h2 className="text-3xl font-black tracking-tight text-white flex items-center justify-center gap-3">
              {slides[index].title}
              <span className="text-2xl">{slides[index].emoji}</span>
            </h2>
            <p className="text-slate-400 font-medium text-lg">
              {slides[index].subtitle}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-2">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-1000 ${
              i === index ? "w-8 bg-primary shadow-[0_0_10px_var(--primary)]" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
