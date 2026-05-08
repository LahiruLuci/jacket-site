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

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.666%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-secondary">
      {/* Sticky container that locks during scroll */}
      <div className="sticky top-0 h-screen flex items-center pt-24 md:pt-32 overflow-hidden bg-secondary">
        {/* Absolute Section Header */}
        <div className="absolute top-12 md:top-20 left-8 md:left-16 lg:left-24 z-[30] pointer-events-none">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 md:w-16 h-[2px] bg-accent" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-accent">
              Our Core Values
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
                <div className="w-full max-w-[1400px] h-[80vh] lg:h-[75vh] min-h-[500px] md:min-h-[600px] max-h-[850px] flex flex-col lg:flex-row relative items-center mt-8 md:mt-12 lg:mt-16">
                  
                  {/* Left Column: Huge Image */}
                  <div className="w-full lg:w-[65%] relative h-[35vh] lg:h-full overflow-hidden rounded-2xl lg:rounded-none lg:rounded-l-2xl shadow-2xl z-0">
                    <Image
                      src={val.image}
                      alt={val.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>

                  {/* Right Column: Content */}
                  <div className="w-full lg:w-[45%] relative z-10 flex flex-col justify-center h-auto lg:h-auto lg:-ml-[10%] px-6 lg:px-0">
                    <div className="p-8 md:p-12 bg-white/90 backdrop-blur-xl border border-black/5 space-y-4 md:space-y-6 rounded-2xl shadow-2xl">
                      {/* Number Callout */}
                      <span className="text-5xl md:text-8xl lg:text-[110px] font-bold text-accent/5 leading-none absolute -top-10 -right-4 select-none pointer-events-none">
                        {val.num}
                      </span>
                      
                      {/* Text details */}
                      <div>
                        <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent mb-2 md:mb-4">
                          {val.subtitle}
                        </h4>
                        <h3 className="text-3xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tight text-primary mb-2 lg:mb-8 leading-[0.95]">
                          {val.title.split(" ")[0]} <br />
                          {val.title.split(" ")[1]}
                        </h3>
                        <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-md">
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 z-20 pointer-events-none">
          <span className="text-[10px] uppercase tracking-widest text-text-muted font-bold">Slide to Explore</span>
          <div className="w-16 h-[2px] bg-black/10 relative overflow-hidden">
            <motion.div 
               className="absolute top-0 left-0 bottom-0 bg-accent"
               style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
