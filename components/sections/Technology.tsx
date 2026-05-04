"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const techData = [
  {
    id: "01",
    title: "Smart Impact Armor",
    category: "Impact Protection",
    metrics: [
      { label: "Impact Protection", value: "94%" },
      { label: "Lighter Feel", value: "32%" },
    ],
    desc: "Soft padding that stays flexible while you move but instantly hardens to protect you during a fall.",
    img: "/assets/peterlesliemorris-motorcycle-1829461_1920.webp",
  },
  {
    id: "02",
    title: "Cooling Air Vents",
    category: "Temperature Control",
    metrics: [
      { label: "Cooling Power", value: "-12°C" },
      { label: "Fresh Air Flow", value: "45 CFM" },
    ],
    desc: "Smart air vents that pull heat away from your body to keep you cool and fresh while riding.",
    img: "/assets/splitshire-biker-407123_1920.webp",
  },
  {
    id: "03",
    title: "Strong Inner Lining",
    category: "Safety Strength",
    metrics: [
      { label: "Overall Strength", value: "3.6 GPa" },
      { label: "Slide Protection", value: "CE-AAA" },
    ],
    desc: "An extra-strong inner mesh that protects your skin and keeps the jacket tough and safe.",
    img: "/assets/stocksnap-dark-2598357_1920.webp",
  },
  {
    id: "04",
    title: "Weather Proof Coat",
    category: "Rain & Sun Protection",
    metrics: [
      { label: "Water Proof", value: "10K/10K" },
      { label: "Wind Protection", value: "0.42 Cd" },
    ],
    desc: "A special outer layer that keeps you dry in the rain and prevents the color from fading.",
    img: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
  },
];

export default function Technology() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative bg-[#161718] py-12 md:py-32 border-y border-white/5 overflow-hidden">
      {/* Deep Background Matrix Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Engineering Corner Accents */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        <Plus className="absolute top-10 left-10 text-white/10" size={24} strokeWidth={1} />
        <Plus className="absolute top-10 right-10 text-white/10" size={24} strokeWidth={1} />
        <Plus className="absolute bottom-10 left-10 text-white/10" size={24} strokeWidth={1} />
        <Plus className="absolute bottom-10 right-10 text-white/10" size={24} strokeWidth={1} />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10 items-start">
        {/* Left Side: The Interactive Schematic List */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-10 md:mb-24">
            <span className="text-[#C9A227] text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 block">
              Advanced R&D Lab
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              Absolute <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>
                Physics.
              </span>
            </h2>
          </div>

          <div className="flex flex-col w-full border-t border-white/10">
            {techData.map((tech, i) => {
              const isActive = active === i;
              return (
                <div
                  key={tech.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`border-b border-white/10 py-6 md:py-8 lg:py-10 cursor-pointer transition-colors duration-500 group ${
                    isActive ? "bg-white/[0.01]" : "hover:bg-white/[0.01]"
                  }`}
                >
                  <div className="flex items-start gap-4 md:gap-8 px-2 md:px-6">
                    <span
                      className={`text-xs md:text-sm font-black font-mono mt-1 md:mt-2 transition-colors duration-500 ${
                        isActive ? "text-[#C9A227]" : "text-white/20"
                      }`}
                    >
                      {tech.id}
                    </span>

                    <div className="flex-1 w-full">
                      <h3
                        className={`text-xl md:text-3xl font-black uppercase tracking-tight transition-all duration-500 transform ${
                          isActive
                            ? "text-white translate-x-0 md:translate-x-2"
                            : "text-white/40 group-hover:text-white/60"
                        }`}
                      >
                        {tech.title}
                      </h3>

                      {/* Expandable Accordion Body */}
                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 md:pt-6">
                          <p className="text-white/50 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 max-w-[400px]">
                            {tech.desc}
                          </p>

                          {/* Tech HUD Metrics */}
                          <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-sm">
                            {tech.metrics.map((metric) => (
                              <div
                                key={metric.label}
                                className="border-l border-[#C9A227]/30 pl-3 md:pl-4"
                              >
                                <div className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-[#C9A227] mb-1">
                                  {metric.label}
                                </div>
                                <div className="text-lg md:text-2xl font-black text-white font-mono">
                                  {metric.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: The Dynamic Heads-Up Display (HUD) */}
        <div className="lg:col-span-7 relative h-[60vh] md:h-[800px] lg:h-[900px] w-full bg-[#1F2022] rounded-2xl border border-white/10 lg:sticky lg:top-24 mt-8 lg:mt-0">
          
          <div className="absolute inset-2 md:inset-4 rounded-xl overflow-hidden bg-[#0A0B0C]">
            <AnimatePresence>
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={techData[active].img}
                  alt={techData[active].title}
                  fill
                  className="object-cover opacity-50 mix-blend-screen grayscale-[0.2]"
                />
                
                {/* HUD Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-transparent to-black/40" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Futuristic HUD Visualizer Overlays */}
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
            <div className="w-[85%] h-[85%] border border-white/5 relative">
              {/* Corner brackets */}
              <div className="absolute -top-[1px] -left-[1px] w-4 h-4 border-t border-l border-[#C9A227]/50" />
              <div className="absolute -top-[1px] -right-[1px] w-4 h-4 border-t border-r border-[#C9A227]/50" />
              <div className="absolute -bottom-[1px] -left-[1px] w-4 h-4 border-b border-l border-[#C9A227]/50" />
              <div className="absolute -bottom-[1px] -right-[1px] w-4 h-4 border-b border-r border-[#C9A227]/50" />

              {/* Center Targeting Reticle */}
              <motion.div 
                key={`reticle-${active}`}
                initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 border border-white/5 rounded-full flex items-center justify-center border-dashed"
              >
                <div className="w-32 h-32 md:w-48 md:h-48 border border-white/10 rounded-full flex items-center justify-center">
                  <div className="absolute w-full h-[1px] bg-white/5" />
                  <div className="absolute h-full w-[1px] bg-white/5" />
                  <div className="w-2 h-2 bg-[#C9A227] rounded-full shadow-[0_0_15px_rgba(201,162,39,0.8)]" />
                </div>
              </motion.div>

              {/* Dynamic Status Readout */}
              <div className="absolute bottom-6 right-6 text-right overflow-hidden">
                <motion.div
                  key={`text-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="text-[#C9A227] font-mono text-[10px] md:text-xs mb-1 tracking-widest">
                    MODULE_{techData[active].id} __ ACTIVE
                  </div>
                  <div className="text-white/30 font-mono text-[8px] md:text-[10px] tracking-widest">
                    SYS.TYPE // {techData[active].category.toUpperCase()}
                  </div>
                </motion.div>
              </div>

              {/* Top Left Serial Number */}
              <div className="absolute top-6 left-6">
                <div className="text-white/20 font-mono text-[8px] md:text-[10px] tracking-widest">
                  JKT-JNC // {new Date().getFullYear()} // RND
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
