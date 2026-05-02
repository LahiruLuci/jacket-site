"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronRight, ArrowRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const HeroLuxe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#161718] overflow-hidden flex items-center"
    >
      {/* Background - Elegant Depth */}
      <motion.div 
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/hero-lifestyle.png"
          alt="Luxury Leather"
          fill
          className="object-cover opacity-30 grayscale contrast-125"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161718] via-[#161718]/40 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Side - Typography */}
        <div className="flex flex-col items-start pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="flex gap-1 text-accent">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" />)}
            </div>
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-white/50">Establish 1988</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-light tracking-tight text-white leading-none">
              THE <span className="font-bold italic gold-gradient">COLLECTION</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-white/60 max-w-lg leading-relaxed mb-12 font-light tracking-wide"
          >
            Meticulously crafted for the modern rider who demands 
            nothing but the absolute peak of luxury and protection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap items-center gap-10"
          >
            <button className="group relative px-10 py-5 bg-accent text-black font-bold uppercase tracking-[0.2em] text-[10px] transition-all hover:bg-white overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                Shop the Look <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>

            <button className="text-white font-bold uppercase tracking-[0.2em] text-[10px] border-b border-white/20 pb-1 hover:border-accent transition-all">
              Discover Craftsmanship
            </button>
          </motion.div>
        </div>

        {/* Right Side - Product Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative group"
        >
          {/* Elegant Circular Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[120px] rounded-full group-hover:bg-accent/10 transition-colors duration-1000" />
          
          <motion.div
            style={{ y }}
            className="relative z-10"
          >
            <Image
              src="/hero-jacket.png"
              alt="Elite Jacket"
              width={800}
              height={800}
              priority
              className="object-contain drop-shadow-[0_20px_80px_rgba(0,0,0,0.8)] saturate-[1.1]"
            />
          </motion.div>

          {/* Minimal Info Floating */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute -bottom-10 -left-10 glass-panel p-8 backdrop-blur-3xl border border-white/5"
          >
            <p className="text-[9px] font-bold text-accent uppercase tracking-[0.4em] mb-2">Model 01 // Midnight</p>
            <p className="text-2xl font-bold text-white mb-4">$1,299</p>
            <div className="w-10 h-[1px] bg-accent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant Side Text */}
      <div className="absolute left-10 bottom-20 z-20 flex flex-col gap-10">
        <div className="h-20 w-[1px] bg-gradient-to-t from-accent to-transparent" />
        <span className="text-[8px] font-bold text-white/30 tracking-[0.8em] uppercase rotate-[-90deg] origin-left">Luxury Reborn</span>
      </div>
    </section>
  );
};

export default HeroLuxe;
