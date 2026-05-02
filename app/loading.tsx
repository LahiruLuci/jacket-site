"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[99999] bg-[#111213] flex flex-col items-center justify-center font-mono">
      {/* 
        This is the "On-Demand" compiler loader for Next.js 16+ 
        It uses a minimal but premium pulse indicator to signal background compilation.
      */}
      <div className="relative flex flex-col items-center gap-12">
        
        {/* Animated Crosshair Center */}
        <div className="relative w-32 h-32 flex items-center justify-center">
             <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
               className="absolute inset-0 border border-white/10 rounded-full"
             />
             <motion.div 
               animate={{ rotate: -360 }}
               transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
               className="absolute inset-4 border border-[#C9A227]/20 rounded-full border-t-[#C9A227]"
             />
             <div className="w-1.5 h-1.5 bg-[#C9A227] rounded-full shadow-[0_0_15px_#C9A227]" />
        </div>

        {/* Textual Feedback */}
        <div className="flex flex-col items-center gap-4">
           <motion.span 
             animate={{ opacity: [0.3, 1, 0.3] }}
             transition={{ duration: 1.5, repeat: Infinity }}
             className="text-[10px] md:text-sm font-bold uppercase tracking-[0.6em] text-white"
           >
             Compiling Terminal
           </motion.span>
           
           <div className="flex items-center gap-3">
              <span className="w-12 h-[1px] bg-white/10" />
              <span className="text-[9px] text-[#C9A227] tracking-widest font-bold">VANGUARD_CORE_V1</span>
              <span className="w-12 h-[1px] bg-white/10" />
           </div>
        </div>

      </div>

      {/* Background CAD Grid */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: `40px 40px`,
          backgroundPosition: `center center`
        }}
      />
    </div>
  );
}
