"use client";

import React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hammer, Ruler, PenTool } from "lucide-react";

const Craftsmanship = () => {
  const containerRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="bg-background py-32 relative overflow-hidden">
      {/* Decorative Large Background Typography */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <h2 className="text-[30vw] font-black tracking-tighter leading-none italic">PRECISION</h2>
      </div>

      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          {/* Left: Imagery Collage */}
          <div className="relative">
            <motion.div 
              style={{ y: y1 }}
              className="relative w-full aspect-[4/5] overflow-hidden border border-white/5"
            >
              <Image
                src="/assets/peterlesliemorris-motorcycle-1829461_1920.webp"
                alt="Workshop Detail"
                fill
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
            </motion.div>

            <motion.div 
              style={{ y: y2 }}
              className="absolute -bottom-20 -right-20 w-2/3 aspect-square border border-white/5 bg-[#0e0e0e] p-8 hidden md:block"
            >
              <div className="relative w-full h-full">
                <Image
                  src="/assets/derneuemann-jacket-2821961_1920.webp"
                  alt="Leather Grain"
                  fill
                  className="object-cover opacity-50 contrast-125"
                />
                <div className="absolute inset-0 flex items-center justify-center border border-accent/20">
                  <span className="text-[9px] font-black uppercase tracking-[0.6em] text-accent rotate-90">Texture Study // 001</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Copy & Features */}
          <div className="flex flex-col items-start lg:pl-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-8"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">The Process</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-light italic leading-none text-white mb-12"
            >
              Crafted with <br />
              <span className="font-bold gold-gradient italic">Silent Obsession.</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
              <div className="flex flex-col gap-4">
                <Hammer className="text-accent" size={24} strokeWidth={1} />
                <h4 className="text-lg font-bold text-white italic">Artisanal Build</h4>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  Every seam is double-reinforced by master tailors with decades of experience in ballistic textile manipulation.
                </p>
              </div>
              
              <div className="flex flex-col gap-4">
                <Ruler className="text-accent" size={24} strokeWidth={1} />
                <h4 className="text-lg font-bold text-white italic">Exact Calibration</h4>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  Anatomical mapping ensures the jacket moves with the rider, eliminating drag while maximizing kinetic protection.
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="mt-16 w-full p-8 border border-white/5 bg-white/5 backdrop-blur-md relative overflow-hidden group hover:border-accent transition-colors duration-500"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
              <p className="text-2xl font-serif italic text-white leading-snug">
                "We don't just build jackets. We curate the last line of defense between the rider and the infinite road."
              </p>
              <p className="text-[10px] font-black uppercase tracking-widest text-accent mt-6">— Jacket Junction Atelier</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Craftsmanship;
