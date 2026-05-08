"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Lock scrolling
    document.body.style.overflow = "hidden";

    // Timing sequence for the brand reveal
    const timer = setTimeout(() => {
       setIsLoaded(true);
       // Release scroll after animation finishes
       setTimeout(() => {
          document.body.style.overflow = "auto";
       }, 1500);
    }, 2800); 

    return () => {
       clearTimeout(timer);
       document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <div className="fixed inset-0 z-[99999] overflow-hidden pointer-events-none">
           
           {/* 1. SOLID BACKGROUND LAYER */}
           <div className="absolute inset-0 bg-[#111213]" />

           {/* 2. THE HORIZONTAL STRIPES (EXIT LAYERS) */}
           <div className="absolute inset-0 flex flex-col">
              {[...Array(10)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ x: "0%" }}
                  exit={{ x: i % 2 === 0 ? "100%" : "-100%" }} // Opposing directions
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.1 + (i * 0.05), // Rapid staggered sequence
                    ease: [0.87, 0, 0.13, 1] // Brutalist ease curve
                  }}
                  className="w-full grow bg-[#161718] border-y border-white/[0.02]"
                />
              ))}
           </div>

           {/* 3. CENTER BRAND REVEAL CONTENT */}
           <div className="absolute inset-0 flex items-center justify-center z-10">
              
              <div className="relative flex flex-col items-center">
                 
                 {/* Top Word: Slides in from left */}
                 <div className="overflow-hidden">
                     <motion.h1 
                        initial={{ x: "-100%" }}
                        animate={{ x: "0%" }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-white leading-tight"
                     >
                        Jacket
                     </motion.h1>
                  </div>

                  {/* Luxury Scanning Line */}
                  <motion.div 
                     initial={{ scaleX: 0 }}
                     animate={{ scaleX: 1 }}
                     exit={{ scaleX: 0, opacity: 0 }}
                     transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
                     className="w-[40vw] md:w-[250px] h-[2px] bg-accent my-6 shadow-[0_0_15px_rgba(176,141,87,0.3)]"
                  />

                  {/* Bottom Word: Slides in from right */}
                  <div className="overflow-hidden">
                     <motion.h1 
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-white/20 leading-tight"
                     >
                        Junction
                     </motion.h1>
                  </div>

                  {/* Micro Identity Script */}
                  <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ delay: 1.8, duration: 0.5 }}
                     className="mt-12 text-[10px] font-bold uppercase tracking-[0.8em] text-accent flex items-center gap-6"
                  >
                     <div className="w-12 h-[1px] bg-accent/30" />
                     EST. 2025 // PREMIUM GEAR
                     <div className="w-12 h-[1px] bg-accent/30" />
                  </motion.div>

              </div>

           </div>

        </div>
      )}
    </AnimatePresence>
  );
}
