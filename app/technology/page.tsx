"use client";

import Navbar from "@/components/layout/Navbar";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Shield, Award, Cpu, Layers, Fingerprint, Box, Sparkles } from "lucide-react";

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <Navbar />

      {/* Hero: The Art of Innovation */}
      <InnovationHero />

      {/* Performance Specifications */}
      <PerformanceSpecs />

      {/* Material Innovation Track */}
      <MaterialInnovationTrack />

      {/* Final Philosophy Panel */}
      <PhilosophyPanel />
      
    </main>
  );
}

function InnovationHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center border-b border-black/5">
      
      {/* Photographic Background */}
      <div className="absolute inset-0 z-0">
         <Image 
           src="/assets/sohag_hawlader-ai-generated-9034981_1920.webp" 
           fill 
           alt="Innovation Concept" 
           className="object-cover opacity-10 grayscale" 
           priority
         />
         <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Subtle Geometric Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
            backgroundSize: `60px 60px`,
            backgroundPosition: `center center`
          }}
        />
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_80%)]" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center max-w-4xl w-full px-6 text-center">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
         >
           <div className="flex items-center gap-4 mb-8 justify-center">
             <div className="w-12 h-[1px] bg-accent" />
             <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
               The Atelier
             </span>
             <div className="w-12 h-[1px] bg-accent" />
           </div>
           
           <h1 className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tight text-primary leading-[0.9] mb-10">
             Innovation <br />
             <span className="text-accent italic font-normal">Refined.</span>
           </h1>
           
           <p className="text-text-muted text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
             We combine heritage craftsmanship with future-proof materials to create the ultimate shield for the modern road.
           </p>

           <div className="mt-12 w-12 h-[1px] bg-accent/30 mx-auto" />
         </motion.div>
      </div>

    </section>
  );
}

function PerformanceSpecs() {
  const specs = [
    {
      icon: Shield,
      label: "Impact Protection",
      value: "94%",
      detail: "Kinetic Dispersal"
    },
    {
      icon: Sparkles,
      label: "Friction Guard",
      value: "Level AAA",
      detail: "Abrasion Resistance"
    },
    {
      icon: Layers,
      label: "Ventilation",
      value: "45CFM",
      detail: "Airflow Optimization"
    },
    {
      icon: Box,
      label: "Material Weight",
      value: "-32%",
      detail: "Lighter Performance"
    }
  ];

  return (
    <section className="relative z-20 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-32 bg-white border-b border-black/5 shadow-sm">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
        {specs.map((spec, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-accent">
               <spec.icon size={18} strokeWidth={1.5} />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{spec.label}</span>
            </div>
            <div className="text-4xl md:text-6xl font-bold text-primary tracking-tighter">{spec.value}</div>
            <div className="text-text-muted text-[10px] uppercase font-bold tracking-widest mt-2 border-t border-black/5 pt-3">
              {spec.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MaterialInnovationTrack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start center", "end center"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const features = [
    {
      title: "Active Protective Matrix",
      desc: "Our intelligent impact system remains flexible during movement but instantly hardens upon impact. This provides unparalleled comfort without sacrificing safety standards.",
      img: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
      align: "left"
    },
    {
      title: "Ballistic Weave Architecture",
      desc: "Utilizing high-tensile aramid fibers, our jackets offer a secondary defense layer that is five times stronger than steel, yet remains breathable and remarkably light.",
      img: "/assets/splitshire-biker-407123_1920.webp",
      align: "right"
    },
    {
      title: "Thermodynamic Venting",
      desc: "Strategic micro-perforations and laser-cut intakes allow for optimal airflow, keeping you cool during high-intensity rides while maintaining structural integrity.",
      img: "/assets/stocksnap-dark-2598357_1920.webp",
      align: "left"
    }
  ];

  return (
    <section ref={containerRef} className="relative w-full py-32 md:py-48 bg-secondary overflow-hidden">
       {/* Background Track */}
       <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[1px] bg-black/5 -translate-x-1/2" />
       
       {/* Animated Accent Track */}
       <motion.div 
         style={{ height: scaleY }} 
         className="absolute left-[30px] md:left-1/2 top-0 w-[2px] bg-accent -translate-x-1/2 origin-top shadow-[0_0_15px_rgba(176,141,87,0.2)]"
       />

       <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col gap-32 md:gap-48">
          {features.map((feature, i) => (
             <FeatureNode key={i} data={feature} index={i} />
          ))}
       </div>
    </section>
  );
}

function FeatureNode({ data, index }: { data: any, index: number }) {
  const isLeft = data.align === "left";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Node Connector Dot */}
      <div className="absolute left-[30px] md:left-1/2 top-1/2 w-3 h-3 bg-white border-2 border-accent rounded-full -translate-x-1/2 -translate-y-1/2 z-20 shadow-lg" />

      {/* Info Block */}
      <div className={`w-full md:w-1/2 flex flex-col ${isLeft ? "md:pr-12 lg:pr-24" : "md:pl-12 lg:pl-24"} pl-[50px] md:pl-0`}>
         <div className="flex items-center gap-4 mb-6">
            <Fingerprint size={16} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              Innovation 0{index + 1}
            </span>
         </div>
         <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-8 leading-tight text-primary">
            {data.title}
         </h2>
         <p className="text-text-muted text-base md:text-lg font-light leading-relaxed">
            {data.desc}
         </p>
      </div>

      {/* Image Block */}
      <div className="w-full md:w-1/2">
         <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-black/5 shadow-xl transition-all duration-[2s]">
            <Image src={data.img} fill alt={data.title} className="object-cover transition-transform duration-[3s] hover:scale-105" />
            <div className="absolute inset-0 bg-black/5" />
         </div>
      </div>
    </motion.div>
  );
}

function PhilosophyPanel() {
  return (
     <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center bg-dark-bg">
        <div className="absolute inset-0 z-0">
           <Image src="/assets/derneuemann-jacket-2821961_1920.webp" fill alt="Detail" className="object-cover opacity-20 grayscale" />
           <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-dark-bg" />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center px-6">
           <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-10 backdrop-blur-md">
              <Award size={24} className="text-accent" />
           </div>
           <h2 className="text-4xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-white mb-8">
             Beyond Human <br /> <span className="text-accent">Engineering.</span>
           </h2>
           <p className="text-white/40 uppercase font-bold tracking-[0.4em] text-[10px] md:text-sm">
             The absolute pinnacle of luxury performance.
           </p>
        </div>
     </section>
  );
}
