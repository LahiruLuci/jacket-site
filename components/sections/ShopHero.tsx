"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { ArrowDownRight, ScanLine } from "lucide-react";

export default function ShopHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Driving the asynchronous parallax of the three images
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -250]); // Moves up fast
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);  // Moves up very slow
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -350]); // Moves up incredibly fast

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#161718] pt-32 md:pt-48 pb-20 md:pb-40 overflow-hidden border-b border-white/5"
    >
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C9A227]/5 blur-[200px] rounded-full pointer-events-none" />

      {/* Hero Header Region */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 mb-16 md:mb-32 flex flex-col lg:flex-row justify-between lg:items-end gap-16">
        
        {/* Massive Offset Typography */}
        <div className="flex flex-col">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#C9A227]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-[#C9A227]">
              Complete Arsenal
            </span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[130px] font-black uppercase tracking-tighter text-white leading-[0.85] flex flex-col">
            <motion.span 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              Shop All
            </motion.span>
            
            <motion.span 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#C9A227] mt-2 md:mt-4 pl-0 md:pl-24" 
              style={{ fontFamily: "var(--font-serif)", fontWeight: "400", fontStyle: "italic", textTransform: "none", letterSpacing: "normal" }}
            >
              Gear.
            </motion.span>
          </h1>
        </div>

        {/* Editorial Paragraph & CTA */}
        <motion.div 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col lg:items-end gap-8 max-w-sm"
        >
          <p className="text-white/50 text-sm md:text-base font-light leading-relaxed lg:text-right">
            Explore the entire uncompromised archive. From titanium-woven track suits to ballistic urban commute shells. Built exclusively for survival.
          </p>
          
          <div className="flex items-center gap-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/30 border border-white/10 px-6 py-4 rounded-full w-fit">
            <ArrowDownRight size={16} /> Scroll to explore
          </div>
        </motion.div>

      </div>

      {/* Editorial Floating Asymmetric Moodboard */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 h-[60vh] md:h-[75vh]">
        
        {/* Left Column - Fast Up Scroll */}
        <motion.div 
          style={{ y: y1 }}
          className="md:col-span-3 relative h-[300px] md:h-[450px] mt-0 md:mt-32 rounded-2xl overflow-hidden group border border-white/5 hidden md:block"
        >
          <Image 
            src="/assets/splitshire-biker-407123_1920.webp" 
            fill 
            alt="Aerodynamics" 
            className="object-cover grayscale transition-all duration-[1s] group-hover:scale-110 group-hover:grayscale-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161718] via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <span className="text-white text-[9px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white/80">
               Apex Series
            </span>
            <ScanLine size={16} className="text-[#C9A227] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </motion.div>

        {/* Center Column - Huge Hero Image - Slow Up Scroll */}
        <motion.div 
          style={{ y: y2 }}
          className="md:col-span-5 relative w-full h-[50vh] md:h-[750px] md:-mt-16 rounded-3xl overflow-hidden group z-20 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        >
          <Image 
            src="/assets/sohag_hawlader-ai-generated-9034981_1920.webp" 
            fill 
            priority
            alt="Stealth Shell" 
            className="object-cover grayscale-[0.2] transition-transform duration-[2.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0A0B0C] via-[#0A0B0C]/40 to-transparent opacity-90" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col gap-2">
             <h3 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tighter">
                Urban Stealth
             </h3>
             <p className="text-white/40 text-xs md:text-sm font-light max-w-[280px]">
                Matte black aesthetics powered by impenetrable nanomesh technology.
             </p>
          </div>
          
          {/* Subtle Frame Corner Markers */}
          <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-white/30" />
          <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/30" />
        </motion.div>

        {/* Right Column - Extremely Fast Up Scroll */}
        <motion.div 
          style={{ y: y3 }}
          className="md:col-span-4 relative h-[350px] md:h-[550px] mt-0 md:mt-64 rounded-2xl overflow-hidden group border border-white/5 hidden md:block"
        >
          <Image 
            src="/assets/derneuemann-jacket-2821961_1920.webp" 
            fill 
            alt="Heritage Custom" 
            className="object-cover grayscale-[0.6] transition-all duration-[1s] group-hover:scale-110 group-hover:grayscale-0" 
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#161718] via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6">
            <span className="text-white text-[9px] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white/80">
               Heritage Collection
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
