"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0B0B0B]">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A227]/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Futuristic HUD Loader */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-2 border-r-2 border-[#C9A227]/20 rounded-full"
          />
          
          {/* Inner Pulsing Ring */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-4 border-2 border-[#C9A227] rounded-full"
          />

          {/* Center Point */}
          <div className="absolute inset-[45%] bg-[#C9A227] rounded-full shadow-[0_0_15px_rgba(201,162,39,0.8)]" />
        </div>

        {/* Text Animation */}
        <div className="flex flex-col items-center gap-2">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C9A227]"
          >
            Establishing Connection
          </motion.span>
          
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  height: [4, 12, 4],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  delay: i * 0.2,
                  ease: "easeInOut" 
                }}
                className="w-[2px] bg-[#C9A227]"
              />
            ))}
          </div>
        </div>

        {/* HUD Scanning Line */}
        <motion.div
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-[#C9A227]/20 to-transparent pointer-events-none"
        />
      </div>
    </div>
  );
}
