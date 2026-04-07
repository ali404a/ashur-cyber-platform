"use client";

import React from "react";
import { motion } from "framer-motion";

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tag?: string;
  delay?: number;
}

export default function TechCard({ icon, title, description, tag = "MODULE_01", delay = 0 }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ scale: 1.02 }}
      className="hologram-card p-8 rounded-2xl group border-l-2 border-primary/20 hover:border-primary/60 transition-all overflow-hidden"
    >
      {/* Module Tag */}
      <div className="absolute top-4 right-4 text-[8px] font-mono text-secondary/40 tracking-widest uppercase">
        {tag}
      </div>

      {/* Decorative Line */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none group-hover:from-primary/10 transition-colors" />

      {/* Icon Wrapper */}
      <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit border border-white/5 group-hover:border-primary/40 group-hover:shadow-[0_0_20px_rgba(0,255,65,0.2)] transition-all">
        {icon}
      </div>

      <h3 className="text-2xl font-black mb-4 text-white group-hover:text-primary transition-colors tracking-tighter">
        {title}
      </h3>
      
      <p className="text-slate-400 font-medium leading-relaxed text-sm">
        {description}
      </p>

      {/* Inner Decorative Tech Lines */}
      <div className="mt-8 flex items-center gap-2 opacity-20">
        <div className="h-px w-full bg-slate-700" />
        <div className="w-2 h-2 rounded-full bg-secondary" />
      </div>
    </motion.div>
  );
}
