"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ChevronRight, Play, Cpu, Shield, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroAdvanced = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  const techSpecs = [
    { icon: <Shield className="w-4 h-4" />, label: "Ballistic Fiber", value: "Level 2" },
    { icon: <Cpu className="w-4 h-4" />, label: "Smart Sensors", value: "AI Active" },
    { icon: <Zap className="w-4 h-4" />, label: "Impact Flex", value: "0.02s" },
  ];

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[120vh] w-full bg-background overflow-hidden flex flex-col items-center justify-center pt-24"
    >
      {/* Background Layer: Cinematic Texture */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0 opacity-40 grayscale"
      >
        <Image
          src="/hero-lifestyle.png"
          alt="Technical Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </motion.div>

      {/* Decorative Hub Elements */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-1/4 left-10 w-[1px] h-[50vh] bg-accent/20" />
        <div className="absolute top-1/4 right-10 w-[1px] h-[50vh] bg-accent/20" />
        <div className="absolute top-[20%] left-0 w-full h-[1px] bg-accent/10" />
        <div className="absolute bottom-[20%] left-0 w-full h-[1px] bg-accent/10" />
        
        {/* Animated Scanning Line */}
        <motion.div 
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-[2px] bg-accent/10 blur-[2px] z-20"
        />
      </div>

      {/* Main Layout Grid */}
      <div className="container relative z-30 grid grid-cols-1 lg:grid-cols-12 gap-0 items-center">
        
        {/* Left Col: Aggressive Typography */}
        <div className="lg:col-span-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="mb-6"
          >
            <span className="px-5 py-2 border border-accent/30 rounded-full text-[10px] font-black tracking-[0.4em] uppercase text-accent bg-accent/5 backdrop-blur-md">
              Series Carbon 2026
            </span>
          </motion.div>

          {/* Layered Text Effect */}
          <div className="relative group">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] lg:text-[14vw] font-black leading-[0.8] tracking-tighter text-white"
            >
              VELOCITY
            </motion.h1>
            
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] lg:text-[14vw] font-black leading-[0.8] tracking-tighter text-stroke absolute top-0 left-0 translate-x-[5px] translate-y-[5px] -z-10 group-hover:translate-x-[10px] group-hover:translate-y-[10px] transition-transform duration-500"
            >
              VELOCITY
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-8 flex flex-col items-center max-w-2xl"
          >
            <p className="text-xl md:text-2xl text-text-muted font-light leading-relaxed mb-12 tracking-wide">
              Where anatomical precision meets <span className="text-white font-bold italic">ballistic durability</span>. 
              The future of rider defense is here.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-xs overflow-hidden transition-all duration-300 hover:bg-accent hover:text-white"
              >
                Pre-Order Now
                <div className="absolute top-0 left-0 w-full h-full bg-accent -translate-x-full group-hover:translate-x-0 transition-transform duration-500 -z-10" />
              </motion.button>

              <button className="flex items-center gap-4 text-white hover:text-accent transition-all duration-300 group">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent group-hover:scale-110 transition-all">
                  <Play className="w-5 h-5 fill-white group-hover:fill-accent" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Watch Tech Demo</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Product Asset Layer (Parallax) */}
        <motion.div
          style={{ y: springY2 }}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-[20%] z-20 w-full max-w-5xl pointer-events-none"
        >
          <div className="relative aspect-[4/3] w-full">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
              className="w-full h-full flex items-center justify-center"
            >
              <Image
                src="/hero-jacket.png"
                alt="Main Product"
                width={800}
                height={800}
                priority
                className="object-contain drop-shadow-[0_0_100px_rgba(225,6,0,0.3)] saturate-[1.2]"
              />
            </motion.div>

            {/* Floating Spec Cards */}
            {techSpecs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1 + index * 0.2 }}
                className={cn(
                  "absolute z-30 glass-panel p-5 rounded-sm border-l-2 border-accent hidden lg:flex flex-col gap-1",
                  index === 0 && "top-[20%] left-[5%]",
                  index === 1 && "top-[40%] right-[0%]",
                  index === 2 && "bottom-[10%] left-[10%]"
                )}
              >
                <div className="flex items-center gap-2 text-accent">
                  {spec.icon}
                  <span className="text-[8px] font-black uppercase tracking-widest">{spec.label}</span>
                </div>
                <span className="text-lg font-black text-white">{spec.value}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Modern Bottom HUD */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-0 left-0 w-full p-10 z-30 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-10"
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-8 h-1 bg-white/10" />)}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            Active Bio-Response Link Established
          </p>
        </div>

        <div className="flex items-center gap-12">
          <div className="text-right">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Stock Status</p>
            <p className="text-xl font-black text-white italic">LIMITED 200</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-1">Global Launch</p>
            <p className="text-xl font-black text-white">MAY 2026</p>
          </div>
        </div>
      </motion.div>

      {/* Side HUD Elements */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-12 text-white/20 font-black text-[10px] uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
        <span>00 // STARTUP</span>
        <span>01 // READY</span>
        <span className="text-accent">02 // ENGAGE</span>
      </div>
    </section>
  );
};

export default HeroAdvanced;
