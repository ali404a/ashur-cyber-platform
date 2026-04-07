"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Youtube, 
  Music, 
  Settings, 
  Maximize2, 
  Minimize2,
  Brain,
  Coffee,
  Zap,
  Volume2,
  ExternalLink,
  ChevronRight
} from "lucide-react";

export default function StudySessionPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("pomodoro"); // pomodoro, shortBreak, longBreak
  const [isZenMode, setIsZenMode] = useState(false);
  const [ytLink, setYtLink] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Play alert sound logic here
      alert("انتهى الوقت! خذ قسطاً من الراحة.");
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleModeChange = (newMode: string, time: number) => {
    setMode(newMode);
    setTimeLeft(time * 60);
    setIsActive(false);
  };

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = extractVideoId(ytLink);
    if (id) setVideoId(id);
    else alert("يرجى إدخال رابط يوتيوب صحيح.");
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${isZenMode ? "bg-black fixed inset-0 z-[100] flex flex-col items-center justify-center p-8" : "space-y-8 pb-10"}`}>
      
      {/* Zen Mode Toggle */}
      <button 
        onClick={() => setIsZenMode(!isZenMode)}
        className={`fixed bottom-8 right-8 p-4 rounded-full glass-morphism border-primary/20 z-[110] hover:scale-110 transition-transform ${isZenMode ? "bg-primary text-background" : "text-primary"}`}
      >
        {isZenMode ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
      </button>

      {/* Main Container */}
      <div className={`grid grid-cols-1 ${isZenMode ? "max-w-5xl w-full" : "lg:grid-cols-3 gap-8"}`}>
        
        {/* Timer Section */}
        <div className={`lg:col-span-1 flex flex-col gap-6 ${isZenMode ? "items-center" : ""}`}>
          <div className="glass-morphism p-8 rounded-3xl border-primary/20 flex flex-col items-center relative overflow-hidden">
            {/* Background Glow */}
            <div className={`absolute inset-0 bg-primary/5 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
            
            <div className="flex gap-2 mb-8 relative z-10">
              <button 
                onClick={() => handleModeChange("pomodoro", 25)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === "pomodoro" ? "bg-primary text-background" : "text-slate-400 hover:text-white"}`}
              >
                تركيز
              </button>
              <button 
                onClick={() => handleModeChange("shortBreak", 5)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === "shortBreak" ? "bg-secondary text-background" : "text-slate-400 hover:text-white"}`}
              >
                راحة قصيرة
              </button>
              <button 
                onClick={() => handleModeChange("longBreak", 15)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === "longBreak" ? "bg-slate-700 text-white" : "text-slate-400 hover:text-white"}`}
              >
                راحة طويلة
              </button>
            </div>

            <motion.div 
              key={timeLeft}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-8xl font-black font-mono tracking-tighter mb-8 text-white relative z-10"
            >
              {formatTime(timeLeft)}
            </motion.div>

            <div className="flex items-center gap-4 relative z-10">
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isActive ? "bg-slate-800 text-white" : "bg-primary text-background shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:scale-105"}`}
              >
                {isActive ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 translate-x-0.5" />}
              </button>
              <button 
                onClick={() => { setIsActive(false); setTimeLeft(mode === "pomodoro" ? 25*60 : mode === "shortBreak" ? 5*60 : 15*60); }}
                className="w-12 h-12 rounded-full glass-morphism border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="glass-morphism p-6 rounded-3xl border-white/5 space-y-4">
            <h3 className="font-bold flex items-center gap-2">
              <Zap className="text-secondary w-5 h-5" />
              إحصائيات الجلسة
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5">
                <span className="text-[10px] text-slate-500 uppercase">تم إنجازه</span>
                <p className="text-xl font-bold">02</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5">
                <span className="text-[10px] text-slate-500 uppercase">الوقت الكلي</span>
                <p className="text-xl font-bold">50 د</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-morphism p-6 rounded-3xl border-secondary/20 min-h-[400px] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold flex items-center gap-2">
                <Youtube className="text-red-500 w-6 h-6" />
                المشغل التعليمي
              </h3>
              <form onSubmit={handleLinkSubmit} className="flex-1 max-w-sm mx-4 relative">
                <input 
                  type="text" 
                  placeholder="ألصق رابط يوتيوب هنا..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-secondary transition-all"
                  value={ytLink}
                  onChange={(e) => setYtLink(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-secondary hover:text-white">
                  <ChevronRight className="w-4 h-4 rotate-180" />
                </button>
              </form>
            </div>

            <div className="flex-1 bg-black rounded-2xl overflow-hidden relative border border-white/5 aspect-video">
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 gap-4">
                  <Monitor className="w-20 h-20 opacity-20" />
                  <p className="text-sm font-medium">بانتظار إضافة رابط المحاضرة...</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-morphism p-6 rounded-3xl border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">موسيقى هادئة (Lofi)</h4>
                <p className="text-xs text-slate-500">مفيدة لزيادة التركيز العميق</p>
              </div>
              <button className="mr-auto p-2 glass-morphism rounded-lg hover:text-blue-400">
                <Play className="w-4 h-4" />
              </button>
            </div>
            <div className="glass-morphism p-6 rounded-3xl border-white/5 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">أصوات ضوضاء بيضاء</h4>
                <p className="text-xs text-slate-500">للتقليل من التشتت الخارجي</p>
              </div>
              <button className="mr-auto p-2 glass-morphism rounded-lg hover:text-purple-400">
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isZenMode && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.05)_0%,transparent_70%)] pointer-events-none"
        />
      )}
    </div>
  );
}
