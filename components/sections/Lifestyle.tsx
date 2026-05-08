"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Lifestyle() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const py1 = isMobile ? 0 : y1;
  const py2 = isMobile ? 0 : y2;
  const py3 = isMobile ? 0 : y3;
  const pyText = isMobile ? 0 : yText;

  return (
    <section 
      ref={containerRef} 
      className="py-12 md:py-20 bg-background relative overflow-hidden"
    >
      {/* Massive Background Typography */}
      <motion.div
        style={{ y: pyText }}
        className="absolute inset-0 flex justify-center pointer-events-none opacity-[0.03] select-none z-0 overflow-hidden"
      >
        <h2 className="text-[15vw] font-bold leading-none whitespace-nowrap mt-20 text-primary">
          JOURNEY
        </h2>
      </motion.div>

      <div className="w-full max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 lg:mb-32">
          <div className="mb-8 lg:mb-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-accent" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
                Our Community
              </span>
            </div>
            <h3 className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-primary leading-[0.95]">
              Beyond <br />
              <span className="text-accent">The Road.</span>
            </h3>
          </div>

          <p className="text-text-muted max-w-sm text-base leading-relaxed">
            More than just equipment—it's a commitment to a life well-traveled. We design for those who value quality, durability, and the freedom of the open highway.
          </p>
        </div>

        {/* Asymmetrical Parallax Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start relative">
          
          {/* Column 1: The Core Foundation */}
          <motion.div 
            style={{ y: py1 }} 
            className="md:col-span-5 flex flex-col gap-10"
          >
            <div className="relative w-full aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 group shadow-lg">
              <Image
                src="/assets/derneuemann-jacket-2821961_1920.webp"
                alt="Lifestyle Portrait"
                fill
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent opacity-60" />
            </div>

            <div className="pl-6 md:pl-10 border-l-2 border-accent">
              <h4 className="text-2xl font-bold uppercase text-primary mb-4 tracking-tight">
                Authentic Craft
              </h4>
              <p className="text-text-muted text-sm leading-relaxed max-w-[320px]">
                We prioritize substance over flash. Every stitch serves a purpose, and every detail is refined for the modern rider.
              </p>
            </div>
          </motion.div>

          {/* Column 2: Details (Moves Opposite) */}
          <motion.div 
            style={{ y: py3 }} 
            className="md:col-span-3 flex flex-col pt-10 md:pt-40 hidden md:flex"
          >
            <div className="relative w-full aspect-[2/3] overflow-hidden rounded-2xl border border-black/5 group bg-secondary">
              <Image
                src="/assets/splitshire-biker-407123_1920.webp"
                alt="Action Texture"
                fill
                className="object-cover opacity-80 transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
              />
            </div>
            <div className="mt-12 text-center md:text-left">
              <Link
                href="/journal"
                className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-accent hover:text-primary transition-all duration-300 group/btn"
              >
                Read the Journal
                <span className="w-8 h-[2px] bg-accent group-hover/btn:w-12 transition-all duration-300" />
              </Link>
            </div>
          </motion.div>

          {/* Column 3: The Action Shot (Moves fast up) */}
          <motion.div 
            style={{ y: py2 }} 
            className="md:col-span-4 flex flex-col pt-8 md:pt-0"
          >
            <div className="relative w-full aspect-square md:aspect-[4/5] overflow-hidden rounded-2xl border border-black/5 group shadow-lg">
              <Image
                src="/assets/sohag_hawlader-ai-generated-9034981_1920.webp"
                alt="Action Shot"
                fill
                className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white border border-white/20 px-4 py-1.5 bg-black/30 backdrop-blur-md rounded-full">
                  Performance Testing
                </span>
                <ArrowUpRight size={20} className="text-white" />
              </div>
            </div>
            
            <p className="text-text-muted text-[11px] tracking-[0.3em] font-bold leading-loose uppercase mt-8 md:text-right hidden md:block">
              Designed for the long road. <br /> Built to last.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
