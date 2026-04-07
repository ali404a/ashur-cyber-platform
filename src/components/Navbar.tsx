"use client";

import React, { useState, useEffect } from "react";
import { Shield, Menu, X, LogIn } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-morphism py-3" : "bg-transparent py-5"
      } px-4 md:px-8`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <div className="flex flex-col -space-y-1">
            <span className="text-xl font-bold tracking-tight text-white mr-2">جامعة أشور</span>
            <span className="text-[10px] font-mono text-primary mr-2 uppercase tracking-widest">Cybersecurity Dept</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-primary transition-colors mr-6"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/login"
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg neon-border bg-primary/5 hover:bg-primary/10 transition-all text-primary font-bold text-sm"
          >
            <LogIn className="w-4 h-4 ml-2" />
            تسجيل الدخول
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-morphism mt-4 rounded-2xl border-white/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-slate-300 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-primary text-background font-bold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="w-5 h-5 ml-2" />
                تسجيل الدخول
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
