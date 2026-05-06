"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const values = [
  {
    num: "01",
    title: "Quality First",
    subtitle: "Built to Last",
    desc: "We focus on creating jackets that balance durability, comfort, and clean design. We use durable materials and reinforced construction to ensure long-term use in real-world conditions.",
    image: "/assets/peterlesliemorris-motorcycle-1829461_1920.webp",
  },
  {
    num: "02",
    title: "Practical Design",
    subtitle: "Real-World Use",
    desc: "Every detail is designed for everyday functionality, from pocket placement to fit and comfort. No unnecessary features. No overdesign. Just reliable jackets that work in real life.",
    image: "/assets/derneuemann-jacket-2821961_1920.webp",
  },
  {
    num: "03",
    title: "Everyday Comfort",
    subtitle: "Daily Travel",
    desc: "Lightweight and easy to wear, suitable for daily travel and changing conditions. Our jackets are made to handle daily wear while staying practical and easy to use.",
    image: "/assets/splitshire-biker-407123_1920.webp",
  },
];

export default function BrandValues() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Track the scroll progress within this 300vh target section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map progress to Horizontal translation.
  // Since we have 3 screens total (300vw), we only shift left by 2 screens (-66.666% of the 300vw width).
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#161718]">
      {/* Sticky container that locks during scroll */}
      <div className="sticky top-0 h-screen flex items-center pt-24 md:pt-32 overflow-hidden bg-[#1F2022]">
                {/* Absolute Section Header - Gold Badge Only */}
        <div className="absolute top-12 md:top-20 left-8 md:left-16 lg:left-24 z-[30] pointer-events-none">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 md:w-16 h-[2px] bg-[#C9A227]" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[#C9A227]">
              Built with Purpose
            </span>
          </div>
        </div>
        {/* The Sliding Track */}
        <motion.div style={{ x }} className="flex w-[300vw] h-full items-center">
          {values.map((val, index) => {
            return (
              <div
                key={index}
                className="w-[100vw] h-full flex items-center justify-center p-4 md:p-12 lg:p-24 relative"
              >
                {/* 
                  The Premium "Glass Box" layout using Flexbox for rock-solid stability. 
                  Images are massive and text overlaps them beautifully. 
                */}
                <div className="w-full max-w-[1400px] h-[80vh] lg:h-[75vh] min-h-[500px] md:min-h-[600px] max-h-[850px] flex flex-col lg:flex-row relative items-center mt-8 md:mt-12 lg:mt-16">
                  
                  {/* Left Column: Huge Image */}
                  <div className="w-full lg:w-[65%] relative h-[35vh] lg:h-full overflow-hidden rounded-t-2xl lg:rounded-none lg:rounded-l-2xl">
                    <Image
                      src={val.image}
                      alt={val.title}
                      fill
                      className="object-cover grayscale-[0.3]"
                    />
                    {/* Strong darkened overlay to blend harsh white backgrounds of images with the dark theme */}
                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                    
                    {/* Gradient to darken the edge connecting to the text */}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1F2022] via-transparent to-transparent opacity-80 lg:opacity-60" />
                  </div>

                  {/* Right Column: Content overlapping back into the image space slightly */}
                  <div className="w-full lg:w-[45%] relative z-10 flex flex-col justify-center h-auto lg:h-auto lg:-ml-[10%] bg-[#1F2022] lg:bg-transparent px-6 lg:px-0">
                    <div className="p-0 lg:p-12 lg:bg-[#0A0B0C]/70 lg:backdrop-blur-xl lg:border lg:border-white/5 space-y-4 md:space-y-6 lg:rounded-2xl">
                      {/* Number Callout */}
                      <span className="text-5xl md:text-8xl lg:text-[130px] font-black text-transparent leading-none" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}>
                        {val.num}
                      </span>
                      
                      {/* Text details */}
                      <div>
                        <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#C9A227] mb-2 md:mb-4">
                          {val.subtitle}
                        </h4>
                        <h3 className="text-3xl md:text-5xl lg:text-7xl font-black uppercase tracking-tighter text-white mb-2 lg:mb-8 leading-[0.9]">
                          {val.title.split(" ")[0]} <br />
                          {val.title.split(" ")[1]}
                        </h3>
                        <p className="text-white/60 text-xs md:text-base leading-relaxed font-light max-w-md">
                          {val.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Scroll Indicator at the bottom fixed to the viewport */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-20 mix-blend-difference pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest text-white/50">Keep Scrolling</span>
          <div className="w-16 h-[1px] bg-white/20 relative overflow-hidden">
            <motion.div 
               className="absolute top-0 left-0 bottom-0 bg-white"
               style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
