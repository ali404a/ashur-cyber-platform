"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function DataStream() {
  const [streams, setStreams] = useState<string[]>([]);

  useEffect(() => {
    const generateStream = () => {
      const chars = "01010101ABCDEF";
      return Array.from({ length: 40 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    };
    setStreams(Array.from({ length: 15 }, () => generateStream()));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 font-mono text-[10px] select-none">
      <div className="flex justify-around w-full h-full">
        {streams.map((stream, i) => (
          <motion.div
            key={i}
            initial={{ y: "-100%" }}
            animate={{ y: "100%" }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 20,
            }}
            className="writing-mode-vertical text-secondary flex flex-col gap-1"
            style={{ writingMode: "vertical-rl" }}
          >
            {stream.split("").map((char, index) => (
              <span key={index} className={index % 5 === 0 ? "text-primary animate-pulse" : ""}>
                {char}
              </span>
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
