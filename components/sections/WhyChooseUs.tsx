"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { Truck, RotateCcw, Award, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 md:py-64 bg-[#0B0B0B] overflow-hidden"
    >
      {/* Cinematic Background Typography */}
      <motion.div 
        style={{ x: textX }}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none z-0"
      >
        <span className="text-[20vw] font-black text-white/[0.02] leading-none uppercase select-none">
          Superior Logistics Protocol Superior Logistics Protocol
        </span>
      </motion.div>

      {/* Floating Ambient Orbs */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#C9A227]/5 blur-[180px] rounded-full pointer-events-none"
      />
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -300]) }}
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-20 lg:gap-0 items-start">
          
          {/* Sticky Header with Advanced Reveal */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-4 mb-8 overflow-hidden">
                <motion.div 
                  initial={{ x: -100 }}
                  whileInView={{ x: 0 }}
                  transition={{ duration: 0.8, ease: "circOut" }}
                  className="w-12 h-[1px] bg-[#C9A227]" 
                />
                <motion.span 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C9A227]"
                >
                  The Protocol
                </motion.span>
              </div>
              
              <h2 className="text-6xl md:text-[100px] font-black uppercase tracking-tighter text-white leading-[0.75] mb-12">
                <span className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    Superior
                  </motion.span>
                </span>
                <span className="block overflow-hidden text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
                  <motion.span
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="block"
                  >
                    Standard.
                  </motion.span>
                </span>
              </h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-white/40 text-sm md:text-lg font-light leading-relaxed max-w-sm mb-16"
              >
                Engineered to eliminate friction. Every touchpoint is a statement of our obsession with high-performance service.
              </motion.p>

              {/* Data Points with HUD Styling */}
              <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5 relative">
                <div className="absolute top-0 left-0 w-8 h-[1px] bg-[#C9A227]" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-4xl font-black text-white mb-2 font-mono">48H</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A227]">Global Ops</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-4xl font-black text-white mb-2 font-mono">24/7</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A227]">Direct Access</div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* 3D Interactive Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <InteractiveCard 
              icon={<Truck size={32} />}
              title="Sonic Deployment"
              desc="Priority logistics pipeline. Arrives at your terminal within 48 hours."
              index={0}
              className="md:translate-y-20"
            />
            <InteractiveCard 
              icon={<Award size={32} />}
              title="Elite Materials"
              desc="Sourced from heritage tanneries. Ballistic-grade protection."
              index={1}
            />
            <InteractiveCard 
              icon={<RotateCcw size={32} />}
              title="Zero Friction"
              desc="Instant return cycles. Engineered for uncompromised satisfaction."
              index={2}
              className="md:translate-y-20"
            />
            <InteractiveCard 
              icon={<ShieldCheck size={32} />}
              title="Ironclad Security"
              desc="AES-256 encrypted architecture. Absolute data sovereignty."
              index={3}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

const InteractiveCard = ({ icon, title, desc, index, className }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse tracking for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={cn(
        "group relative bg-[#111111]/80 backdrop-blur-md border border-white/5 p-12 md:p-16 rounded-[3rem] overflow-hidden transition-all duration-500 hover:border-[#C9A227]/30",
        className
      )}
    >
      {/* Dynamic Glow Spotlight */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(circle at ${Number(x) * 100 + 50}% ${Number(y) * 100 + 50}%, rgba(201,162,39,0.15) 0%, transparent 80%)`
          )
        }}
      />

      {/* Floating Icon with 3D Depth */}
      <div 
        className="relative z-10 mb-16 inline-block"
        style={{ transform: "translateZ(60px)" }}
      >
        <div className="w-20 h-20 flex items-center justify-center rounded-[1.5rem] bg-white/5 border border-white/10 group-hover:bg-[#C9A227] group-hover:text-black transition-all duration-700 text-white relative">
          {icon}
          {/* Animated Ring */}
          <motion.div 
            animate={isHovered ? { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-[1.5rem] border border-[#C9A227]/50 pointer-events-none"
          />
        </div>
      </div>

      {/* Content with 3D Depth */}
      <div 
        className="relative z-10"
        style={{ transform: "translateZ(40px)" }}
      >
        <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-6 group-hover:text-[#C9A227] transition-colors duration-500">
          {title}
        </h4>
        <p className="text-white/40 text-base leading-relaxed font-light group-hover:text-white/70 transition-colors duration-500">
          {desc}
        </p>
      </div>

      {/* Scanning Line Effect on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div 
            initial={{ top: "-100%" }}
            animate={{ top: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-20 bg-gradient-to-b from-transparent via-[#C9A227]/5 to-transparent pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

      {/* Modernist Accent */}
      <div className="absolute bottom-8 right-8 flex gap-1 items-end pointer-events-none">
        <div className="w-[1px] h-4 bg-white/10" />
        <div className="w-4 h-[1px] bg-white/10" />
      </div>
    </motion.div>
  );
};

export default WhyChooseUs;
