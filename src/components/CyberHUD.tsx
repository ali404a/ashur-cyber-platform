"use client";

import React from "react";
import { motion } from "framer-motion";

export default function CyberHUD() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden select-none">
      {/* Corner Brackets */}
      <div className="absolute top-10 left-10 w-32 h-32 border-t-2 border-l-2 border-primary/40 rounded-tl-3xl shadow-[0_0_20px_rgba(0,255,65,0.1)]" />
      <div className="absolute top-10 right-10 w-32 h-32 border-t-2 border-r-2 border-secondary/40 rounded-tr-3xl shadow-[0_0_20px_rgba(0,229,255,0.1)]" />
      <div className="absolute bottom-10 left-10 w-32 h-32 border-b-2 border-l-2 border-secondary/40 rounded-bl-3xl shadow-[0_0_20px_rgba(0,229,255,0.1)]" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border-b-2 border-r-2 border-primary/40 rounded-br-3xl shadow-[0_0_20px_rgba(0,255,65,0.1)]" />

      {/* Rotating Circle Widget */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-10 -translate-y-1/2 w-64 h-64 border-[1px] border-dashed border-secondary/20 rounded-full flex items-center justify-center"
      >
        <motion.div
           animate={{ rotate: -360 }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
           className="w-48 h-48 border-[1px] border-primary/10 rounded-full"
        />
      </motion.div>

      {/* Vertical Status Line */}
      <div className="absolute top-0 right-20 bottom-0 w-px bg-gradient-to-b from-transparent via-secondary/20 to-transparent" />
      
      {/* Side Status Indicators */}
      <div className="absolute top-1/4 right-24 flex flex-col gap-4 text-[8px] font-mono text-secondary/40">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
             <span>MODULE_ID: 0x{Math.floor(Math.random() * 9999).toString(16)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
