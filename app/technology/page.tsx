"use client";

import Navbar from "@/components/layout/Navbar";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Activity, ShieldAlert, Cpu, Crosshair, Radar, Maximize, Zap } from "lucide-react";

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-[#111213] text-white selection:bg-[#C9A227] selection:text-black">
      <Navbar />

      {/* Hero: Engineering Blueprint Boot Sequence */}
      <EngineeringHero />

      {/* Diagnostics Dashboard */}
      <TelemetryDashboard />

      {/* Core Technology Laser Track */}
      <LaserTrackSystem />

      {/* Deep Dive Microscopic Detail Panel */}
      <MicroscopicAnalysis />
      
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* SUBCOMPONENTS                                                              */
/* -------------------------------------------------------------------------- */

function EngineeringHero() {
  const [bootSequence, setBootSequence] = useState(0);

  useEffect(() => {
    // Simulate a complex militaristic system boot sequence
    const timers = [
      setTimeout(() => setBootSequence(1), 500),
      setTimeout(() => setBootSequence(2), 1200),
      setTimeout(() => setBootSequence(3), 1500),
      setTimeout(() => setBootSequence(4), 2200),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center border-b border-white/10 font-mono">
      
      {/* Cinematic Photographic Background */}
      <div className="absolute inset-0 z-0">
         <Image 
           src="/assets/sohag_hawlader-ai-generated-9034981_1920.webp" 
           fill 
           alt="Technology Blueprint" 
           className="object-cover grayscale" 
           priority
         />
         <div className="absolute inset-0 bg-[#050505]/80 mix-blend-multiply" />
      </div>

      {/* 
        The Engineering Grid Background 
        Matches the exact aesthetic of advanced CAD software or defense contracting HUDs 
      */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: `40px 40px`,
            backgroundPosition: `center center`
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#111213_90%)]" />
      </div>

      {/* Interactive Crosshair & Radar Sweep */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-20">
         <div className="w-[600px] h-[600px] border border-[#C9A227]/30 rounded-full flex items-center justify-center relative">
            <div className="absolute top-0 bottom-0 w-[1px] bg-[#C9A227]/20" />
            <div className="absolute left-0 right-0 h-[1px] bg-[#C9A227]/20" />
            <motion.div 
               animate={{ rotate: 360 }} 
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
               className="absolute w-1/2 h-1/2 origin-bottom-right border-r border-[#C9A227] bg-gradient-to-tr from-transparent to-[#C9A227]/10"
            />
         </div>
      </div>

      {/* Boot Sequence Terminal Output */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl w-full px-6">
         
         <div className="w-full grid grid-cols-3 gap-2 text-[8px] md:text-xs text-[#C9A227] mb-12 font-bold tracking-widest uppercase opacity-70 text-center">
            <div className="flex flex-col gap-1">
              <span className="opacity-50 text-[6px] md:text-[8px]">Latitude:</span>
              <span>45.4642° N</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-50 text-[6px] md:text-[8px]">Auth:</span>
              <span>Classified</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="opacity-50 text-[6px] md:text-[8px]">System:</span>
              <span>Vanguard</span>
            </div>
         </div>

         <div className="h-[200px] flex flex-col items-center justify-center">
           <AnimatePresence mode="wait">
             {bootSequence === 0 && (
               <motion.div key="1" className="text-white/50 text-xs tracking-widest uppercase">Initializing Bio-Mechanic Servers...</motion.div>
             )}
             {bootSequence === 1 && (
               <motion.div key="2" className="text-white/50 text-xs tracking-widest uppercase">Bypassing standard friction protocols...</motion.div>
             )}
             {bootSequence === 2 && (
               <motion.div key="3" className="text-white/50 text-xs tracking-widest uppercase flex items-center gap-4">
                  Loading impact telemetry <Zap size={14} className="text-[#C9A227] animate-pulse" />
               </motion.div>
             )}
             {bootSequence >= 3 && (
               <motion.div 
                 key="4"
                 initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                 animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                 transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                 className="flex flex-col items-center"
               >
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black text-transparent bg-clip-text uppercase tracking-tighter mb-8 md:mb-4" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.8)" }}>
                    Technology
                  </h1>
                  <div className="relative w-full max-w-lg px-4">
                    <p className="text-white text-[10px] md:text-lg tracking-[0.4em] uppercase font-bold text-center leading-loose">
                      Engineered to defeat the <br className="md:hidden" /> laws of physics.
                    </p>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-[#C9A227]/50" />
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
         </div>

      </div>

    </section>
  );
}

function TelemetryDashboard() {
  return (
    <section className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12 md:py-20 bg-[#161718] font-mono border-b border-white/5 shadow-2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-[#C9A227]">
        <div className="flex flex-col gap-2">
           <div className="flex items-center gap-2 opacity-60 text-[10px] tracking-widest uppercase">
              <Activity size={14} /> Kinetic Dispersal
           </div>
           <div className="text-3xl md:text-5xl font-black">94.2%</div>
           <div className="text-white/30 text-[9px] uppercase tracking-widest mt-2 border-t border-white/10 pt-2">CE-AAA Friction Rated</div>
        </div>
        <div className="flex flex-col gap-2">
           <div className="flex items-center gap-2 opacity-60 text-[10px] tracking-widest uppercase">
              <ShieldAlert size={14} /> Impact Hardening
           </div>
           <div className="text-3xl md:text-5xl font-black">0.01s</div>
           <div className="text-white/30 text-[9px] uppercase tracking-widest mt-2 border-t border-white/10 pt-2">D3O® Activation Time</div>
        </div>
        <div className="flex flex-col gap-2">
           <div className="flex items-center gap-2 opacity-60 text-[10px] tracking-widest uppercase">
              <Radar size={14} /> Thermal Exhaust
           </div>
           <div className="text-3xl md:text-5xl font-black">45<span className="text-xl">CFM</span></div>
           <div className="text-white/30 text-[9px] uppercase tracking-widest mt-2 border-t border-white/10 pt-2">Titanium Micro-Venting</div>
        </div>
        <div className="flex flex-col gap-2">
           <div className="flex items-center gap-2 opacity-60 text-[10px] tracking-widest uppercase">
              <Maximize size={14} /> Tensile Drag
           </div>
           <div className="text-3xl md:text-5xl font-black">3.6<span className="text-xl">GPa</span></div>
           <div className="text-white/30 text-[9px] uppercase tracking-widest mt-2 border-t border-white/10 pt-2">Kevlar® Aramid Weave</div>
        </div>
      </div>
    </section>
  );
}

function LaserTrackSystem() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const nodes = [
    {
      title: "D3O® Reactive Armor",
      desc: "In its resting state, the D3O® molecules flow freely, making the armor extremely soft and flexible. Upon high-velocity impact, the molecules instantly lock together, absorbing and brutally dispersing energy before returning to their flexible state.",
      img: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
      align: "left"
    },
    {
      title: "Titanium Skid Architecture",
      desc: "Externally mounted titanium shoulder and elbow plates prevent friction-grip during a slide. Instead of grabbing the asphalt and throwing the rider into a tumble, the titanium ensures a smooth, continuous slide, drastically reducing bone fracture probabilities.",
      img: "/assets/splitshire-biker-407123_1920.webp",
      align: "right"
    },
    {
      title: "Micro-Perforated Kevlar®",
      desc: "To survive extreme abrasion without cooking the rider, we wove an interconnected aramid fiber mesh under the primary leather shell. It allows 360-degree thermodynamic breathing while maintaining a tensile strength 5x greater than steel.",
      img: "/assets/stocksnap-dark-2598357_1920.webp",
      align: "left"
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full py-40 md:py-64 bg-[#111213] overflow-hidden">
       
       {/* Constant Vertical Background Track */}
       <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 -translate-x-1/2" />
       
       {/* Animated Laser Fill Track */}
       <motion.div 
         style={{ height: scaleY }} 
         className="absolute left-[30px] md:left-1/2 top-0 w-[2px] bg-gradient-to-b from-[#C9A227]/0 via-[#C9A227] to-[#C9A227] -translate-x-1/2 origin-top shadow-[0_0_20px_#C9A227]"
       />

       <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col gap-40 md:gap-64">
          {nodes.map((node, i) => (
             <TechNode key={i} data={node} index={i} />
          ))}
       </div>

    </section>
  );
}

function TechNode({ data, index }: { data: any, index: number }) {
  const isLeft = data.align === "left";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-20 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      
      {/* Structural SVG Horizontal Laser connecting to Center Track (Desktop Only) */}
      <div className={`hidden md:block absolute top-[50%] w-[calc(50vw-20px)] h-[1px] bg-white/10 ${isLeft ? "right-[50%]" : "left-[50%]"}`}>
         <motion.div 
           initial={{ scaleX: 0 }}
           whileInView={{ scaleX: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
           className={`w-full h-full bg-[#C9A227]/40 origin-${isLeft ? 'right' : 'left'}`}
         />
      </div>

      {/* Target Node Connector Dot */}
      <div className="absolute left-[30px] md:left-1/2 top-1/2 w-3 h-3 bg-[#0A0B0C] border-2 border-[#C9A227] rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-[0_0_15px_#C9A227]" />

      {/* Info Block */}
      <div className={`w-full md:w-1/2 flex flex-col ${isLeft ? "md:pl-0 md:pr-12 lg:pr-24" : "md:pr-0 md:pl-12 lg:pl-24"} pl-[50px] md:pl-0`}>
         <div className="flex items-center gap-4 mb-6">
            <Crosshair size={16} className="text-[#C9A227]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-[#C9A227]">
              Protocol 0{index + 1}
            </span>
         </div>
         <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-6 leading-[0.9]">
            {data.title}
         </h2>
         <p className="text-white/50 text-sm md:text-base font-light leading-relaxed">
            {data.desc}
         </p>
      </div>

      {/* Image Block */}
      <div className="w-full md:w-1/2 p-[10px] md:p-0">
         <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] filter grayscale hover:grayscale-0 transition-all duration-[2s]">
            <Image src={data.img} fill alt={data.title} className="object-cover transition-transform duration-[3s] hover:scale-110" />
            
            {/* Holographic scanning overlay */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-[#C9A227] opacity-60 shadow-[0_0_20px_#C9A227] animate-scan" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] mix-blend-overlay pointer-events-none" />
         </div>
      </div>

    </motion.div>
  );
}

function MicroscopicAnalysis() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.5, 1]);

  return (
     <section ref={ref} className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-[#111213]">
        <motion.div style={{ scale }} className="absolute inset-0 origin-center">
           <Image src="/assets/derneuemann-jacket-2821961_1920.webp" fill alt="Macro Detail" className="object-cover grayscale-[0.8]" />
           <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
        </motion.div>
        
        <div className="relative z-10 text-center flex flex-col items-center">
           <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center mb-8 backdrop-blur-md">
              <Cpu size={24} className="text-white/60" />
           </div>
           <h2 className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter text-white mb-6">
             Beyond Human <br /> Engineering.
           </h2>
           <p className="text-white/60 uppercase font-mono tracking-widest text-[10px] md:text-xs">
             The absolute pinnacle of mechanical defense.
           </p>
        </div>
     </section>
  );
}
