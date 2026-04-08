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
    <div className={`transition-all duration-700 ${isZenMode ? "bg-black fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 md:p-8" : "max-w-4xl mx-auto space-y-6 md:space-y-8 pb-10 px-4"}`}>
      
      {/* Zen Mode Toggle */}
      <button 
        onClick={() => setIsZenMode(!isZenMode)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 p-3 md:p-4 rounded-full glass-morphism border-primary/20 z-[110] hover:scale-110 transition-transform ${isZenMode ? "bg-primary text-background" : "text-primary"}`}
      >
        {isZenMode ? <Minimize2 className="w-5 h-5 md:w-6 md:h-6" /> : <Maximize2 className="w-5 h-5 md:w-6 md:h-6" />}
      </button>

      {/* Main Focus Container */}
      <div className="flex flex-col items-center gap-12 pt-10">
        
        {/* Timer Section - THE CHAMPION */}
        <div className="w-full flex flex-col items-center gap-6">
          <div className="glass-morphism p-10 md:p-14 rounded-[3.5rem] border-primary/20 flex flex-col items-center relative overflow-hidden w-full max-w-xl shadow-[0_0_50px_rgba(0,255,65,0.05)]">
            <div className={`absolute inset-0 bg-primary/5 transition-opacity ${isActive ? "opacity-100" : "opacity-0"}`} />
            
            <div className="flex bg-white/5 p-1 rounded-2xl mb-12 relative z-10">
              <button 
                onClick={() => handleModeChange("pomodoro", 25)}
                className={`px-6 py-2 rounded-xl text-xs font-black transition-all shrink-0 uppercase tracking-tighter ${!isInfinite && mode === "pomodoro" ? "bg-primary text-background" : "text-slate-500 hover:text-white"}`}
              >
                Focus
              </button>
              <button 
                onClick={toggleInfinite}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-black transition-all shrink-0 uppercase tracking-tighter ${isInfinite ? "bg-blue-500 text-white" : "text-slate-500 hover:text-white"}`}
              >
                <InfinityIcon className="w-4 h-4" />
                Infinite
              </button>
            </div>

            <motion.div 
              key={isInfinite ? elapsedTime : timeLeft}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-7xl md:text-9xl font-black font-mono tracking-tighter mb-12 text-white relative z-10 flex flex-col items-center"
            >
              <span className="text-primary text-xs uppercase tracking-[0.5em] mb-4 font-black opacity-50">{isInfinite ? "Tracking_Time" : "Deep_Focus"}</span>
              {formatTime(isInfinite ? elapsedTime : timeLeft)}
            </motion.div>

            <div className="flex items-center gap-6 relative z-10">
              <button 
                onClick={() => setIsActive(!isActive)}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isActive ? "bg-slate-800 text-white" : "bg-primary text-background shadow-[0_0_30px_rgba(0,255,65,0.5)] hover:scale-105 active:scale-95"}`}
              >
                {isActive ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 translate-x-1" />}
              </button>
              <button 
                onClick={() => { 
                  setIsActive(false); 
                  if (isInfinite) setElapsedTime(0);
                  else setTimeLeft(mode === "pomodoro" ? 25*60 : mode === "shortBreak" ? 5*60 : 15*60); 
                }}
                className="w-14 h-14 rounded-full glass-morphism border-white/5 flex items-center justify-center text-slate-500 hover:text-white transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Mini-Player & Controls - SIDEKICK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          {/* Mini-Video Node */}
          <div className="glass-morphism p-5 rounded-[2rem] border-secondary/20 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-secondary flex items-center gap-2">
                <Video className="w-3 h-3" />
                Mini_Node
              </h3>
              {!videoId && (
                 <form onSubmit={handleLinkSubmit} className="relative">
                    <input 
                      type="text" 
                      placeholder="YT_Link..."
                      className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[8px] outline-none focus:border-secondary transition-all font-mono w-24"
                      value={ytLink}
                      onChange={(e) => setYtLink(e.target.value)}
                    />
                 </form>
              )}
            </div>

            <div className="bg-black rounded-xl overflow-hidden relative border border-white/5 aspect-video w-full shadow-lg">
              {videoId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-800 gap-2">
                  <Monitor className="w-8 h-8 opacity-20" />
                  <p className="text-[8px] font-black uppercase tracking-widest">Awaiting_Signal</p>
                </div>
              )}
            </div>
          </div>

          {/* Sound & Music Controls */}
          <div className="grid grid-cols-1 gap-3">
            <div className="glass-morphism p-4 rounded-2xl border-white/5 flex items-center gap-4 hover:border-blue-500/20 transition-all cursor-pointer group">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Music className="w-4 h-4" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-[10px] group-hover:text-blue-400 transition-colors">Lofi_Ambient</h4>
              </div>
              <Play className="mr-auto w-3 h-3 text-slate-600 group-hover:text-blue-400" />
            </div>
            <div className="glass-morphism p-4 rounded-2xl border-white/5 flex items-center gap-4 hover:border-purple-500/20 transition-all cursor-pointer group">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Brain className="w-4 h-4" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-[10px] group-hover:text-purple-400 transition-colors">Neural_Focus</h4>
              </div>
              <Play className="mr-auto w-3 h-3 text-slate-600 group-hover:text-purple-400" />
            </div>
            <div className="glass-morphism p-4 rounded-2xl border-white/5 flex items-center gap-4 hover:border-secondary/20 transition-all cursor-pointer group">
              <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                <Coffee className="w-4 h-4" />
              </div>
              <div className="text-right">
                <h4 className="font-bold text-[10px] group-hover:text-secondary transition-colors">Session_Stats</h4>
              </div>
              <span className="mr-auto text-[10px] font-mono text-secondary">02/05</span>
            </div>
          </div>
        </div>
      </div>

      {isZenMode && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.08)_0%,transparent_70%)] pointer-events-none"
        />
      )}
    </div>
  );
}
