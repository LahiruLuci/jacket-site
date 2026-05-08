"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Shield, 
  Zap, 
  Target, 
  Cpu, 
  Globe, 
  ArrowRight,
  Fingerprint
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white selection:bg-accent selection:text-black font-inter overflow-x-hidden">
      <Navbar />

      {/* 01. HERO: THE MANIFESTO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/splitshire-biker-407123_1920.webp" 
            alt="The Vision" 
            fill 
            className="object-cover grayscale opacity-30 scale-110 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        </div>

        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-8 block">Archives // MMXXIV</span>
            <h1 className="text-4xl sm:text-6xl md:text-[120px] lg:text-[160px] font-bold uppercase tracking-tighter leading-[0.9] mb-8 md:mb-12">
              Beyond <br /> <span className="text-accent italic font-normal">Defensive.</span>
            </h1>
            <div className="max-w-2xl mx-auto border-t border-white/10 pt-12">
              <p className="text-white/60 text-lg md:text-2xl font-light leading-relaxed">
                We don't build clothing. We engineer mechanical layers for the high-velocity individual.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[8px] font-bold uppercase tracking-widest">Initiate Descent</span>
          <div className="w-[1px] h-12 bg-white/40" />
        </div>
      </section>

      {/* 02. THE CORE DNA: TECHNICAL GRID */}
      <section className="py-24 md:py-40 bg-[#111213]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/5 blur-[100px]" />
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">01 // Protocol</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
                Born in the <br /> Shadow of <br /> Velocity.
              </h2>
              <p className="text-white/40 text-lg leading-relaxed mb-10 font-light">
                Jacket Junction was founded on a singular obsession: the friction coefficient between survival and catastrophe. Our journey began in a basement lab in 1994, testing carbon weaves against industrial grinders.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                  <Fingerprint size={24} className="text-accent" />
                  <h4 className="text-sm font-bold uppercase tracking-widest">Authenticity</h4>
                  <p className="text-white/30 text-xs leading-relaxed">Every stitch is logged. Every material is traceable. No compromises.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <Target size={24} className="text-accent" />
                  <h4 className="text-sm font-bold uppercase tracking-widest">Precision</h4>
                  <p className="text-white/30 text-xs leading-relaxed">Anatomical calibration ensures armor stays lethal, even at 200km/h.</p>
                </div>
              </div>
            </div>

            <motion.div 
              style={{ y: y1 }}
              className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl"
            >
              <Image 
                src="/assets/sohag_hawlader-ai-generated-9034981_1920.webp" 
                alt="Technical Craft" 
                fill 
                className="object-cover grayscale"
              />
              <div className="absolute inset-0 bg-black/20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 03. THE MISSION: FULL-WIDTH CINEMATIC */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale: 1.1, y: y2 }} className="absolute inset-0">
          <Image 
            src="/assets/derneuemann-jacket-2821961_1920.webp" 
            alt="The Mission" 
            fill 
            className="object-cover grayscale opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        </motion.div>

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">02 // The Mission</span>
            <h3 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-8 md:mb-12">
              Defeating <br /> <span className="text-stroke" style={{ WebkitTextStroke: "1px rgba(201, 162, 39, 0.6)", color: "rgba(201, 162, 39, 0.05)" }}>The Laws</span> <br /> of Friction.
            </h3>
            <p className="text-white/60 text-lg md:text-2xl font-light leading-relaxed mb-12">
              Our mission is to create a seamless interface between the human body and the machine. We believe that true protection shouldn't feel like a burden—it should feel like an upgrade.
            </p>
            <Link href="/technology" className="inline-flex items-center gap-6 group">
              <span className="text-xs font-bold uppercase tracking-[0.3em] group-hover:text-accent transition-colors">Explore the Tech</span>
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all duration-500">
                <ArrowRight size={20} className="group-hover:text-black transition-colors" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 04. GLOBAL FOOTPRINT: STATS GRID */}
      <section className="py-24 md:py-40 border-y border-white/5 bg-[#0B0B0B]">
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center lg:text-left">
            <div className="flex flex-col gap-4">
              <span className="text-accent text-[10px] font-bold uppercase tracking-widest">Global Reach</span>
              <span className="text-4xl md:text-6xl font-black text-white">45+</span>
              <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Operational Hubs</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-accent text-[10px] font-bold uppercase tracking-widest">Engineering</span>
              <span className="text-4xl md:text-6xl font-black text-white">0.01<span className="text-2xl">s</span></span>
              <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Armor Activation</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-accent text-[10px] font-bold uppercase tracking-widest">Heritage</span>
              <span className="text-4xl md:text-6xl font-black text-white">1994</span>
              <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Established Date</span>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-accent text-[10px] font-bold uppercase tracking-widest">Protection</span>
              <span className="text-4xl md:text-6xl font-black text-white">CE<span className="text-2xl">L2</span></span>
              <span className="text-white/20 text-[10px] font-bold uppercase tracking-widest">Standard Fidelity</span>
            </div>
          </div>
        </div>
      </section>

      {/* 05. CALL TO ACTION */}
      <section className="py-24 md:py-40 bg-accent overflow-hidden relative">
        {/* Decorative Grid */}
        <div className="absolute inset-0 grid-pattern opacity-10" />
        
        <div className="container relative z-10 flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-[100px] font-bold uppercase tracking-tighter text-black leading-none mb-12">
            Join The <br /> Community.
          </h2>
          <p className="text-black/60 max-w-xl text-lg font-medium mb-12">
            The Archives are always expanding. Stay informed on the latest ballistic breakthroughs and cultural field notes.
          </p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/shop" className="px-12 py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl">
              Equip Series // MMXXIV
            </Link>
            <Link href="/journal" className="px-12 py-5 border border-black/20 text-black text-xs font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500">
              Read Field Notes
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER MINI */}
      <footer className="py-12 bg-black border-t border-white/5">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[8px] tracking-[0.5em] text-white/20 uppercase font-bold">Archives // 2025 Edition</p>
          <div className="flex gap-8">
            <Link href="#" className="text-[8px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[8px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">Shipping Ops</Link>
            <Link href="#" className="text-[8px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">Global Network</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
