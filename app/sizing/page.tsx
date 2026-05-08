"use client";

import React, { useState, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { 
  Ruler, 
  ChevronRight, 
  Info, 
  Maximize2, 
  ArrowRight, 
  Focus,
  Torus,
  Layers,
  Zap,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
type MeasurementNode = {
  id: string;
  label: string;
  instruction: string;
  top: string;
  left: string;
};

// --- Constants ---
const SIZING_DATA = [
  { size: "XS", chest: "88-92", waist: "76-80", sleeve: "60-61" },
  { size: "S", chest: "92-96", waist: "80-84", sleeve: "61-62" },
  { size: "M", chest: "96-100", waist: "84-88", sleeve: "62-63" },
  { size: "L", chest: "100-104", waist: "88-92", sleeve: "63-64" },
  { size: "XL", chest: "104-108", waist: "92-96", sleeve: "64-65" },
  { size: "XXL", chest: "108-112", waist: "96-100", sleeve: "65-66" },
];

const MEASUREMENT_NODES: MeasurementNode[] = [
  { 
    id: "chest", 
    label: "Chest", 
    instruction: "Measure around the fullest part of your chest, keeping the tape horizontal under your arms.", 
    top: "35%", 
    left: "50%" 
  },
  { 
    id: "waist", 
    label: "Waist", 
    instruction: "Measure around your natural waistline, typically the narrowest part of your torso.", 
    top: "55%", 
    left: "50%" 
  },
  { 
    id: "sleeve", 
    label: "Sleeve", 
    instruction: "Measure from the shoulder seam down to your wrist bone with a slight bend in your elbow.", 
    top: "45%", 
    left: "25%" 
  }
];

export default function SizingPage() {
  const [activeUnit, setActiveUnit] = useState<"cm" | "in">("cm");
  const [activeNode, setActiveNode] = useState<MeasurementNode | null>(null);
  
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white selection:bg-accent selection:text-black font-inter overflow-x-hidden">
      <Navbar />

      {/* 01. HERO: KINETIC CALIBRATION */}
      <section className="relative h-auto min-h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden pt-32 md:pt-20">
        {/* Background Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] z-0">
          <h1 className="text-[40vw] md:text-[30vw] font-black uppercase tracking-tighter leading-none select-none">
            Scale
          </h1>
        </div>

        <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-4 md:mb-6 justify-center lg:justify-start">
                <div className="w-8 md:w-12 h-[1px] bg-accent" />
                <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.4em] text-accent">Perfect Fit</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight leading-[0.9] mb-8">
                Mastering <br /> <span className="text-accent">The Fit.</span>
              </h2>
              <p className="text-white/40 max-w-lg text-xs md:text-lg leading-relaxed mb-12 mx-auto lg:mx-0">
                A jacket is only as good as its fit. Our sizing system is meticulously designed to ensure comfort and protection remain perfectly positioned at all times.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-accent text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-500">
                  Calculate My Size
                </button>
                <button className="px-8 py-4 border border-white/10 hover:border-white/30 text-xs font-bold uppercase tracking-widest transition-colors duration-500">
                  Size Chart
                </button>
              </div>
            </motion.div>
          </div>

          <div className="flex-1 relative w-full h-[400px] md:h-[600px] group">
            {/* Technical Diagram Placeholder Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full rounded-3xl overflow-hidden border border-white/5 bg-gradient-to-tr from-white/5 to-transparent flex items-center justify-center p-8"
            >
              <Image 
                src="/assets/splitshire-biker-407123_1920.webp" 
                alt="Technical Fit" 
                fill 
                className="object-cover opacity-40 mix-blend-luminosity grayscale group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-black/20" />
              
              {/* Overlaying Technical Grid */}
              <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

              {/* Interactive Nodes */}
              {MEASUREMENT_NODES.map((node) => (
                <div 
                  key={node.id}
                  style={{ top: node.top, left: node.left }}
                  className="absolute z-20"
                >
                  <button 
                    onMouseEnter={() => setActiveNode(node)}
                    className="w-4 h-4 md:w-6 md:h-6 bg-accent rounded-full animate-pulse shadow-[0_0_20px_rgba(176,141,87,0.4)] flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full" />
                  </button>
                </div>
              ))}

              {/* Node Info Box */}
              <AnimatePresence>
                {activeNode && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                    className="absolute bottom-8 left-8 right-8 p-6 glass-panel z-30 rounded-xl"
                  >
                    <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Focus size={14} /> {activeNode.label} Measurement
                    </h4>
                    <p className="text-[10px] md:text-xs text-white/60 leading-relaxed">
                      {activeNode.instruction}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 02. THE MASTER CHART: DYNAMIC MATRIX */}
      <section className="py-24 md:py-40 bg-[#111213] relative border-y border-white/5">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">The Matrix</span>
              <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tight leading-none mb-6">Global Standards. <br /> Absolute Zero.</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Toggle between Metric and Imperial systems. Our charts are calibrated across EU, US, and Japanese standards to ensure universal fidelity.
              </p>
            </div>
            
            <div className="flex bg-[#1F2022] p-1 rounded-full border border-white/5">
              <button 
                onClick={() => setActiveUnit("cm")}
                className={cn(
                  "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                  activeUnit === "cm" ? "bg-accent text-white" : "text-white/40"
                )}
              >
                Metric (CM)
              </button>
              <button 
                onClick={() => setActiveUnit("in")}
                className={cn(
                  "px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                  activeUnit === "in" ? "bg-accent text-white" : "text-white/40"
                )}
              >
                Imperial (IN)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="py-6 px-4 text-[10px] uppercase font-bold tracking-[0.3em] text-white/30">Size Identifier</th>
                  <th className="py-6 px-4 text-[10px] uppercase font-bold tracking-[0.3em] text-white/30">Chest Circumference</th>
                  <th className="py-6 px-4 text-[10px] uppercase font-bold tracking-[0.3em] text-white/30">Waist / Torso</th>
                  <th className="py-6 px-4 text-[10px] uppercase font-bold tracking-[0.3em] text-white/30">Sleeve Reach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {SIZING_DATA.map((row) => (
                  <tr key={row.size} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="py-8 px-4 text-2xl font-bold text-white group-hover:text-accent transition-colors">{row.size}</td>
                    <td className="py-8 px-4 text-sm font-mono text-white/60">{activeUnit === "cm" ? row.chest : `${(parseInt(row.chest.split('-')[0])*0.39).toFixed(1)}-${(parseInt(row.chest.split('-')[1])*0.39).toFixed(1)}`}</td>
                    <td className="py-8 px-4 text-sm font-mono text-white/60">{activeUnit === "cm" ? row.waist : `${(parseInt(row.waist.split('-')[0])*0.39).toFixed(1)}-${(parseInt(row.waist.split('-')[1])*0.39).toFixed(1)}`}</td>
                    <td className="py-8 px-4 text-sm font-mono text-white/60">{activeUnit === "cm" ? row.sleeve : `${(parseInt(row.sleeve.split('-')[0])*0.39).toFixed(1)}-${(parseInt(row.sleeve.split('-')[1])*0.39).toFixed(1)}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 03. FIT ARCHETYPES: THE VISUAL GUIDE */}
      <section className="py-24 md:py-40">
        <div className="container">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-8xl font-bold uppercase tracking-tight mb-6">Choose Your <span className="text-accent italic font-normal">Stance.</span></h3>
            <div className="w-20 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8">
            {[
              { 
                title: "Race Fit", 
                subtitle: "Second Skin", 
                desc: "Aggressively pre-curved for the tuck position. Snug, zero drag, maximum armor stability.",
                icon: <Zap size={24} />
              },
              { 
                title: "Touring Fit", 
                subtitle: "Extended Comfort", 
                desc: "Balanced for upright riding positions. Room for base layers without sacrificing protection integrity.",
                icon: <Torus size={24} />
              },
              { 
                title: "Urban Fit", 
                subtitle: "Off-Bike Versatility", 
                desc: "A relaxed silhouette that transitions seamlessly from the machine to the street.",
                icon: <Layers size={24} />
              }
            ].map((fit, idx) => (
              <motion.div
                key={fit.title}
                whileHover={{ y: -10 }}
                className="group relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden bg-[#161718] border border-white/5 p-8 flex flex-col justify-end"
              >
                <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                  <Image 
                    src={idx === 0 ? "/assets/sohag_hawlader-ai-generated-9034981_1920.webp" : idx === 1 ? "/assets/derneuemann-jacket-2821961_1920.webp" : "/assets/stocksnap-dark-2598357_1920.webp"} 
                    alt={fit.title} 
                    fill 
                    className="object-cover grayscale group-hover:scale-110 transition-transform duration-[3s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-6 text-accent bg-black/40 backdrop-blur-md">
                    {fit.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent mb-2 block">{fit.subtitle}</span>
                  <h4 className="text-3xl font-bold uppercase tracking-tight text-white mb-4">{fit.title}</h4>
                  <p className="text-white/40 text-xs leading-relaxed max-w-xs group-hover:text-white/80 transition-colors duration-500">
                    {fit.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 04. CALL TO ACTION: TAILORED ASSISTANCE */}
      <section className="py-24 md:py-32 bg-accent">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl text-center md:text-left">
            <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-white leading-none mb-6">
              Need Assistance With <br /> Your Measurements?
            </h3>
            <p className="text-white/80 font-medium text-sm md:text-base max-w-lg">
              Our specialists are available for digital consultation to ensure your jacket fits exactly as intended.
            </p>
          </div>
          <button className="px-10 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 shadow-2xl flex items-center gap-4 group">
            Contact Specialist <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </button>
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

// --- Local Components ---
function Link({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
