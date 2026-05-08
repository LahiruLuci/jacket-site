"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Minimal Premium Loader */}
        <div className="relative w-16 h-16 mb-8">
          {/* Outer Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t border-accent rounded-full"
          />
          
          {/* Inner Pulsing Ring */}
          <motion.div
            animate={{ scale: [0.8, 1, 0.8], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-2 border border-accent/20 rounded-full"
          />

          {/* Center Point */}
          <div className="absolute inset-[46%] bg-accent rounded-full shadow-[0_0_10px_rgba(176,141,87,0.4)]" />
        </div>

        {/* Text Animation */}
        <div className="flex flex-col items-center gap-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-[10px] font-bold uppercase tracking-[0.6em] text-accent pl-[0.6em]"
          >
            Loading
          </motion.span>
          
          <div className="w-24 h-[1px] bg-accent/10 relative overflow-hidden">
            <motion.div
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-accent/40 w-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
