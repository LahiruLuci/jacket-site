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
    <section className="relative bg-secondary py-12 md:py-20 border-y border-black/5 overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative z-10 items-start">
        {/* Left Side: Technical Specifications List */}
        <div className="lg:col-span-5 flex flex-col">
          <div className="mb-10 md:mb-24">
            <span className="text-accent text-[11px] font-bold uppercase tracking-[0.4em] mb-4 md:mb-6 block">
              Advanced Engineering
            </span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-primary leading-[0.95]">
              Technical <br />
              <span className="text-accent">Precision.</span>
            </h2>
          </div>

          <div className="flex flex-col w-full border-t border-black/10">
            {techData.map((tech, i) => {
              const isActive = active === i;
              return (
                <div
                  key={tech.id}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`border-b border-black/5 py-6 md:py-8 lg:py-10 cursor-pointer transition-all duration-500 group ${
                    isActive ? "bg-white shadow-lg z-10 scale-[1.02] rounded-xl my-2 border-none" : "hover:bg-white/40"
                  }`}
                >
                  <div className="flex items-start gap-4 md:gap-8 px-6 md:px-8">
                    <span
                      className={`text-xs md:text-sm font-bold font-mono mt-1 md:mt-2 transition-colors duration-500 ${
                        isActive ? "text-accent" : "text-text-muted/30"
                      }`}
                    >
                      {tech.id}
                    </span>

                    <div className="flex-1 w-full">
                      <h3
                        className={`text-lg md:text-2xl font-bold uppercase tracking-tight transition-all duration-500 transform ${
                          isActive
                            ? "text-primary translate-x-0"
                            : "text-text-muted group-hover:text-primary"
                        }`}
                      >
                        {tech.title}
                      </h3>

                      {/* Expandable Body */}
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
                          <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-[440px]">
                            {tech.desc}
                          </p>

                          {/* Tech Metrics */}
                          <div className="grid grid-cols-2 gap-4 md:gap-8 w-full max-w-sm">
                            {tech.metrics.map((metric) => (
                              <div
                                key={metric.label}
                                className="border-l-2 border-accent/20 pl-4"
                              >
                                <div className="text-[10px] uppercase font-bold tracking-widest text-accent mb-1">
                                  {metric.label}
                                </div>
                                <div className="text-xl md:text-2xl font-bold text-primary font-mono">
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

        {/* Right Side: Product Visualizer */}
        <div className="lg:col-span-7 relative h-[60vh] md:h-[700px] lg:h-[800px] w-full bg-white rounded-3xl border border-black/5 lg:sticky lg:top-24 mt-8 lg:mt-0 shadow-2xl overflow-hidden">
          
          <div className="absolute inset-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 z-0"
              >
                <Image
                  src={techData[active].img}
                  alt={techData[active].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Technical Specification Overlays */}
          <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center p-8 md:p-12">
            <div className="w-full h-full relative">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent" />

              {/* Status Display */}
              <div className="absolute bottom-0 left-0 bg-white/90 backdrop-blur-md p-6 border border-black/5 rounded-tr-2xl shadow-xl max-w-xs">
                <motion.div
                  key={`status-${active}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-accent font-bold text-[10px] uppercase tracking-widest mb-1">
                    Component Details
                  </div>
                  <div className="text-primary font-bold text-lg uppercase tracking-tight leading-tight">
                    {techData[active].category}
                  </div>
                  <div className="w-full h-[2px] bg-accent/20 mt-3 mb-2" />
                  <div className="text-text-muted text-[10px] uppercase font-bold tracking-widest">
                    Safety Certification: CE-LEVEL 2
                  </div>
                </motion.div>
              </div>

              {/* Top Right Reference */}
              <div className="absolute top-0 right-0 text-right bg-white/90 backdrop-blur-md px-6 py-3 border border-black/5 rounded-bl-2xl">
                <div className="text-primary font-mono text-[10px] font-bold tracking-widest">
                  SERIES: PERFORMANCE // REV 04
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
