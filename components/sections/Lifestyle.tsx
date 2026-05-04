"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Lifestyle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Unique parallax speeds for the ultimate asymmetric grid effect
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  
  // Parallax for the massive background text
  const yText = useTransform(scrollYProgress, [0, 1], [100, -100]);

  // Disable parallax on mobile for stability - using state to avoid hydration errors
  const py1 = isMobile ? 0 : y1;
  const py2 = isMobile ? 0 : y2;
  const py3 = isMobile ? 0 : y3;
  const pyText = isMobile ? 0 : yText;

  return (
    <section 
      ref={containerRef} 
      className="py-12 md:py-32 bg-[#161718] relative overflow-hidden"
    >
      {/* Massive Background Typography */}
      <motion.div
        style={{ y: pyText }}
        className="absolute inset-0 flex justify-center pointer-events-none opacity-[0.02] select-none z-0 overflow-hidden"
      >
        <h2 className="text-[25vw] font-black leading-none whitespace-nowrap mt-20">
          CULTURE
        </h2>
      </motion.div>

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 lg:mb-40">
          <div className="mb-8 lg:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#C9A227]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#C9A227]">
                The Syndicate
              </span>
            </div>
            <h3 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              Beyond <br />
              <span 
                className="text-transparent" 
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.3)" }}
              >
                The Ride.
              </span>
            </h3>
          </div>

          <p className="text-white/50 max-w-sm text-sm md:text-base leading-relaxed font-light">
            It is not just about the destination. It is the obsessive curation of the journey. A lifestyle reserved exclusively for those who refuse to blend in with the grid.
          </p>
        </div>

        {/* Asymmetrical Parallax Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          
          {/* Column 1: The Core Foundation */}
          <motion.div 
            style={{ y: py1 }} 
            className="md:col-span-5 flex flex-col gap-10"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-xl border border-white/5 group">
              <Image
                src="/assets/derneuemann-jacket-2821961_1920.webp"
                alt="Lifestyle Portrait"
                fill
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />
              {/* Luxury gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-transparent opacity-80" />
            </div>

            <div className="pl-6 md:pl-10 border-l border-[#C9A227]/30">
              <h4 className="text-2xl font-black uppercase text-white mb-4 tracking-tight">
                No Compromise
              </h4>
              <p className="text-white/40 text-sm leading-relaxed max-w-[300px]">
                We exist for the purists. The ones who wake up at 4 AM just to hear the engine echo violently through empty city streets.
              </p>
            </div>
          </motion.div>

          {/* Column 2: The Texture / Details (Moves Opposite) */}
          <motion.div 
            style={{ y: py3 }} 
            className="md:col-span-3 flex flex-col pt-10 md:pt-40 hidden md:flex"
          >
            <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl border border-white/5 group bg-[#181A1C]">
              <Image
                src="/assets/splitshire-biker-407123_1920.webp"
                alt="Action Texture"
                fill
                className="object-cover opacity-60 mix-blend-screen transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110 grayscale"
              />
            </div>
            <div className="mt-12 text-center md:text-left">
              <Link
                href="/community"
                className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-[#C9A227] hover:text-white transition-colors duration-300 group/btn"
              >
                Join The Syndicate
                <span className="w-8 h-[1px] bg-[#C9A227] group-hover/btn:w-12 transition-all duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Column 3: The Action / Wide Shot (Moves fast up) */}
          <motion.div 
            style={{ y: py2 }} 
            className="md:col-span-4 flex flex-col pt-8 md:pt-0"
          >
            <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden rounded-xl border border-white/5 group">
              <Image
                src="/assets/sohag_hawlader-ai-generated-9034981_1920.webp"
                alt="Action Shot"
                fill
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/50 border border-white/10 px-3 py-1 bg-[#0A0B0C]/40 backdrop-blur-md">
                  Global Presence
                </span>
                <ArrowUpRight size={20} className="text-white/30" />
              </div>
            </div>
            
            <p className="text-white/30 text-[10px] tracking-[0.4em] leading-loose uppercase mt-8 md:text-right hidden md:block">
              Built in the shadows. <br /> Respected globally.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
