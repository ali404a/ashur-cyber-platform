"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, Menu, X, LogIn, Cpu } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import DataStream from "@/components/DataStream";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "الرئيسية", href: "/" },
    { name: "عن القسم", href: "#about" },
    { name: "المواد الدراسية", href: "#subjects" },
    { name: "تواصل معنا", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-primary/20 py-3 shadow-[0_0_20px_rgba(0,255,65,0.05)]" : "bg-transparent py-6"
      } px-4 md:px-8`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Legendary Logo */}
        <Link href="/" className="flex items-center space-x-3 group relative">
          <motion.div 
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
            className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 group-hover:border-primary/50 transition-colors shadow-[0_0_15px_rgba(0,255,65,0.1)]"
          >
            <ShieldAlert className="w-8 h-8 text-primary" />
          </motion.div>
          <div className="flex flex-col -space-y-1 ml-3">
            <span className="text-xl font-black tracking-tighter text-white uppercase font-sans">جامعة أشور</span>
            <span className="text-[9px] font-mono text-secondary uppercase tracking-[0.3em] font-black">Cyber_Systems_Core</span>
          </div>
          
          {/* Subtle Scan Line on Logo */}
          <div className="absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>

        {/* Desktop Ops-Center Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[11px] font-mono font-bold text-slate-400 hover:text-primary transition-all uppercase tracking-widest relative group"
              >
                <span className="mr-6">{link.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300 mr-6" />
              </Link>
            ))}
          </div>
          
          <div className="h-8 w-px bg-white/10 mx-2" />

          <Link
            href="/login"
            className="flex items-center gap-3 px-6 py-2.5 rounded-sm bg-primary/5 border border-primary/30 hover:bg-primary hover:text-background transition-all text-primary font-black text-[11px] font-mono tracking-tighter uppercase tech-border"
          >
            <LogIn className="w-4 h-4 ml-1" />
            System_Access
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Legendary Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 top-[72px] bg-black/95 backdrop-blur-3xl md:hidden z-50 border-l border-primary/20"
          >
            <div className="flex flex-col p-12 space-y-8 h-full relative">
              <DataStream />
              {navLinks.map((link, idx) => (
                <motion.div
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: idx * 0.1 }}
                   key={link.name}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-black text-slate-300 hover:text-primary transition-colors block text-right"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              <div className="pt-10 mt-auto">
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-4 px-8 py-5 rounded-sm bg-primary text-background font-black text-xl uppercase tracking-tighter w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn className="w-6 h-6 ml-2" />
                  System_Access
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
