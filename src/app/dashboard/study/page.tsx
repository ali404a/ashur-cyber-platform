"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, Pause, RotateCcw, Video, Music, Settings, Maximize2, Minimize2,
  Brain, Coffee, Zap, Volume2, ExternalLink, ChevronRight, Monitor,
  Infinity as InfinityIcon, Timer as TimerIcon, ArrowRight
} from "lucide-react";

export default function StudySessionPage() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("pomodoro"); // pomodoro, shortBreak, longBreak, infinite
  const [isZenMode, setIsZenMode] = useState(false);
  const [ytLink, setYtLink] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isInfinite, setIsInfinite] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        if (isInfinite) {
          setElapsedTime(prev => prev + 1);
        } else {
          if (timeLeft > 0) {
            setTimeLeft(prev => prev - 1);
          } else {
            setIsActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            alert("انتهى الوقت! خذ قسطاً من الراحة.");
          }
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, timeLeft, isInfinite]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleModeChange = (newMode: string, time: number) => {
    setIsInfinite(false);
    setMode(newMode);
    setTimeLeft(time * 60);
    setIsActive(false);
  };

  const toggleInfinite = () => {
    setIsInfinite(!isInfinite);
    setIsActive(false);
    setElapsedTime(0);
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
    <div className={`transition-all duration-700 ${isZenMode ? "bg-black fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 md:p-8" : "space-y-6 md:space-y-8 pb-10"}`}>
      
      {/* Zen Mode Toggle */}
      <button 
        onClick={() => setIsZenMode(!isZenMode)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 p-3 md:p-4 rounded-full glass-morphism border-primary/20 z-[110] hover:scale-110 transition-transform ${isZenMode ? "bg-primary text-background" : "text-primary"}`}
      >
        {isZenMode ? <Minimize2 className="w-5 h-5 md:w-6 md:h-6" /> : <Maximize2 className="w-5 h-5 md:w-6 md:h-6" />}
      </button>

      {/* Main Container */}
      <div className={`flex flex-col ${isZenMode ? "max-w-5xl w-full" : "lg:flex-row gap-6 md:gap-8"}`}>
        
        {/* Timer Section */}
        <div className={`w-full lg:w-80 shrink-0 flex flex-col gap-6 ${isZenMode ? "items-center" : ""}`}>
          <div className="glass-morphism p-6 md:p-8 rounded-[2.5rem] border-primary/20 flex flex-col items-center relative overflow-hidden">
            <div className={`absolute inset-0 bg-primary/5 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
            
            <div className="flex gap-1.5 mb-8 relative z-10 w-full overflow-x-auto pb-2 scrollbar-none">
              <button 
                onClick={() => handleModeChange("pomodoro", 25)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all shrink-0 uppercase tracking-tighter ${!isInfinite && mode === "pomodoro" ? "bg-primary text-background" : "bg-white/5 text-slate-400 hover:text-white"}`}
              >
                Focus
              </button>
              <button 
                onClick={() => handleModeChange("shortBreak", 5)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all shrink-0 uppercase tracking-tighter ${!isInfinite && mode === "shortBreak" ? "bg-secondary text-background" : "bg-white/5 text-slate-400 hover:text-white"}`}
              >
                Break
              </button>
              <button 
                onClick={toggleInfinite}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black transition-all shrink-0 uppercase tracking-tighter ${isInfinite ? "bg-blue-500 text-white" : "bg-white/5 text-slate-400 hover:text-white"}`}
              >
                <InfinityIcon className="w-3 h-3" />
                Infinite
              </button>
            </div>

            <motion.div 
              key={isInfinite ? elapsedTime : timeLeft}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="text-6xl md:text-7xl font-black font-mono tracking-tighter mb-8 text-white relative z-10 flex flex-col items-center"
            >
              <span className="text-primary text-[10px] uppercase tracking-[0.4em] mb-2 font-black">{isInfinite ? "Elapsed_Time" : "System_Countdown"}</span>
              {formatTime(isInfinite ? elapsedTime : timeLeft)}
            </motion.div>

            <div className="flex items-center gap-4 relative z-10">
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all ${isActive ? "bg-slate-800 text-white" : "bg-primary text-background shadow-[0_0_20px_rgba(0,255,65,0.4)] hover:scale-105"}`}
              >
                {isActive ? <Pause className="w-6 h-6 md:w-8 md:h-8" /> : <Play className="w-6 h-6 md:w-8 md:h-8 translate-x-0.5" />}
              </button>
              <button 
                onClick={() => { 
                  setIsActive(false); 
                  if (isInfinite) setElapsedTime(0);
                  else setTimeLeft(mode === "pomodoro" ? 25*60 : mode === "shortBreak" ? 5*60 : 15*60); 
                }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full glass-morphism border-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>

          <div className="glass-morphism p-5 md:p-6 rounded-[2rem] border-white/5 space-y-4">
            <h3 className="text-xs font-black flex items-center gap-2 uppercase tracking-widest text-slate-400">
              <Zap className="text-secondary w-4 h-4" />
              Stats_Log
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 md:p-4 rounded-2xl bg-white/5 border border-white/5 text-right">
                <span className="text-[8px] text-slate-600 uppercase font-black">Completed</span>
                <p className="text-lg md:text-xl font-black text-primary">02</p>
              </div>
              <div className="p-3 md:p-4 rounded-2xl bg-white/5 border border-white/5 text-right">
                <span className="text-[8px] text-slate-600 uppercase font-black">Total_Session</span>
                <p className="text-lg md:text-xl font-black text-secondary">50m</p>
              </div>
            </div>
          </div>
        </div>

        {/* Video Player Section - Now Smaller and More Tactical */}
        <div className="flex-1 space-y-6">
          <div className="glass-morphism p-4 md:p-6 rounded-[2.5rem] border-secondary/20 flex flex-col">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h3 className="text-xs font-black flex items-center gap-2 uppercase tracking-widest text-slate-400">
                <Video className="text-red-500 w-4 h-4" />
                Lecture_Node_Player
              </h3>
              <form onSubmit={handleLinkSubmit} className="flex-1 max-w-md relative">
                <input 
                  type="text" 
                  placeholder="Insert_YT_Link..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-secondary transition-all font-mono"
                  value={ytLink}
                  onChange={(e) => setYtLink(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-secondary hover:text-white transition-colors">
                  <ArrowRight className="w-4 h-4 rotate-180" />
                </button>
              </form>
            </div>

            <div className="bg-black rounded-2xl overflow-hidden relative border border-white/5 aspect-video max-w-3xl mx-auto w-full shadow-2xl">
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800 gap-4">
                  <Monitor className="w-16 h-16 opacity-20" />
                  <p className="text-[10px] font-black uppercase tracking-[0.3em]">Awaiting_Intelligence_Stream...</p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass-morphism p-5 rounded-2xl border-white/5 flex items-center gap-4 hover:border-blue-500/20 transition-all cursor-pointer">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Music className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-xs">Lofi_Beats</h4>
                <p className="text-[10px] text-slate-600">Deep_Focus_Mode</p>
              </div>
              <button className="mr-auto p-2 glass-morphism rounded-lg hover:text-blue-400">
                <Play className="w-3 h-3" />
              </button>
            </div>
            <div className="glass-morphism p-5 rounded-2xl border-white/5 flex items-center gap-4 hover:border-purple-500/20 transition-all cursor-pointer">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                <Brain className="w-5 h-5" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-xs">White_Noise</h4>
                <p className="text-[10px] text-slate-600">Distraction_Isolation</p>
              </div>
              <button className="mr-auto p-2 glass-morphism rounded-lg hover:text-purple-400">
                <Play className="w-3 h-3" />
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
