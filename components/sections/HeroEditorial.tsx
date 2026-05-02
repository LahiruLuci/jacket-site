"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, ArrowRight, CornerRightDown } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroEditorial = () => {
  return (
    <section className="relative min-h-screen w-full bg-background grid grid-cols-1 lg:grid-cols-12 overflow-hidden border-b border-white/5">
      {/* Editorial Grid Base */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Left Column: Narrative & Intro */}
      <div className="lg:col-span-3 border-r border-white/5 px-8 py-24 flex flex-col justify-between relative z-10 bg-background">
        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 border border-accent flex items-center justify-center mb-12"
          >
            <Plus size={16} className="text-accent" />
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-6"
          >
            The Inaugural Collection
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl font-light italic leading-tight text-white mb-8"
          >
            Defying the norms of <br />
            <span className="font-bold gold-gradient">modern protection.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-sm text-white/50 leading-relaxed font-light max-w-[240px]"
          >
            Jacket Junction archives the intersection of high-fashion drape and 
            industrial-grade structural integrity.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col gap-4"
        >
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-8 h-[1px] bg-white/20 group-hover:w-12 group-hover:bg-accent transition-all duration-500" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white">View Narrative</span>
          </div>
        </motion.div>
      </div>

      {/* Middle Column: The Masterpiece */}
      <div className="lg:col-span-6 relative h-[600px] lg:h-full overflow-hidden border-r border-white/5 bg-[#0e0e0e]">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full"
        >
          <Image
            src="/assets/sohag_hawlader-ai-generated-9034981_1920.webp"
            alt="Masterpiece Jacket"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        {/* Center Title - The Heart of the Design */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
          <motion.div
            className="overflow-hidden"
          >
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10vw] font-black tracking-tighter text-white leading-none whitespace-nowrap"
            >
              JUNCTION
            </motion.h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-4 mt-4"
          >
            <div className="h-[1px] w-20 bg-accent" />
            <span className="text-xs font-bold uppercase tracking-[0.8em] text-accent">Archive No. 001</span>
            <div className="h-[1px] w-20 bg-accent" />
          </motion.div>
        </div>
      </div>

      {/* Right Column: Detail & Shop */}
      <div className="lg:col-span-3 px-8 py-24 flex flex-col justify-between bg-background relative z-10">
        <div className="flex flex-col items-end text-right">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full aspect-[4/5] relative mb-12 border border-white/5 bg-[#181A1C]"
          >
            <Image
              src="/assets/stocksnap-dark-2598357_1920.webp"
              alt="Detail Texture"
              fill
              className="object-cover opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/20 rotate-90">Texture Study</span>
            </div>
          </motion.div>
          
          <h3 className="text-xl font-bold italic text-white mb-2">Artisanal Cut</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-widest max-w-[200px] leading-loose">
            Hand-burnished edges meets laser-cut precision venting for perfect thermoregulation.
          </p>
        </div>

        <div className="flex flex-col items-start pt-12">
          <motion.button
            whileHover={{ scale: 1.02 }}
            className="w-full h-20 bg-accent flex items-center justify-between px-8 text-black group transition-all duration-500"
          >
            <span className="text-xs font-black uppercase tracking-[0.3em]">Acquire Now</span>
            <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
          
          <div className="mt-8 flex items-center gap-6">
            <span className="text-[9px] font-bold uppercase tracking-widest text-white/30 italic">Limited Edition // 50 Units</span>
          </div>
        </div>
      </div>

      {/* Modern Floating Decorative Element */}
      <div className="absolute right-0 bottom-0 w-32 h-32 border-l border-t border-white/5 flex items-center justify-center lg:flex hidden">
        <CornerRightDown className="text-white/10" size={32} strokeWidth={1} />
      </div>
    </section>
  );
};

export default HeroEditorial;
