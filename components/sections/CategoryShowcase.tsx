"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    id: "daily",
    title: "Daily Wear",
    short: "Daily",
    number: "01",
    desc: "Clean, comfortable jackets designed for everyday use. Perfect for work, travel, and casual outings.",
    image: "/assets/derneuemann-jacket-2821961_1920.webp",
  },
  {
    id: "weather",
    title: "Weather Protection",
    short: "Weather",
    number: "02",
    desc: "Water-resistant jackets built to handle light rain and wind while keeping you comfortable throughout the day.",
    image: "/assets/splitshire-biker-407123_1920.webp",
  },
  {
    id: "outdoor",
    title: "Outdoor & Riding",
    short: "Riding",
    number: "03",
    desc: "Durable jackets designed for movement and changing conditions, ideal for rides and outdoor activities.",
    image: "/assets/peterlesliemorris-motorcycle-1829461_1920.webp",
  },
  {
    id: "utility",
    title: "Utility Jackets",
    short: "Utility",
    number: "04",
    desc: "Functional designs with multiple pockets and practical features for everyday convenience.",
    image: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
  },
];

export default function CategoryShowcase() {
  const [active, setActive] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  return (
    <section className="w-full bg-[#161718] py-24 md:py-32 relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#C9A227]/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Header Area */}
      <div className="px-8 md:px-16 lg:px-24 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-[#C9A227]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#C9A227]">
                Purpose Built
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9]">
              Built for Every <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>Situation.</span>
            </h2>
          </div>

          <p className="text-white/50 max-w-md text-sm md:text-base leading-relaxed font-light">
            Functional gear for your daily life. Whether you are commuting, riding, or exploring the outdoors, we have the perfect jacket for you.
          </p>
        </motion.div>
      </div>

      {/* Accordion Flex Grid */}
      <div className="px-4 md:px-8 lg:px-16 lg:h-[700px] h-[900px] md:h-[600px] max-w-[1800px] mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row w-full h-full gap-2 md:gap-4 lg:gap-4">
          {categories.map((cat, index) => {
            const isActive = active === index;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActive(index)}
                onClick={() => setActive(index)}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="relative overflow-hidden cursor-pointer group transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  flex: isActive ? 6 : 1,
                  minHeight: isActive ? "350px" : "140px",
                }}
              >
                {/* Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className={`object-cover transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isActive
                      ? "scale-105 opacity-100"
                      : "scale-100 opacity-40 grayscale blur-[2px]"
                  } lg:group-hover:grayscale-0 lg:group-hover:blur-none lg:group-hover:opacity-70`}
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 pointer-events-none" />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 md:p-8 lg:p-10 flex flex-col justify-between pointer-events-none">
                  {/* Top: Number & Arrow */}
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-black text-white/50 tracking-widest border border-white/10 px-3 py-1 bg-[#0A0B0C]/20 backdrop-blur-sm">
                      {cat.number}
                    </span>

                    <div
                      className={`w-12 h-12 rounded-full bg-[#C9A227] text-black flex items-center justify-center transition-all duration-500 transform ${
                        isActive ? "scale-100 opacity-100" : "scale-50 opacity-0"
                      }`}
                    >
                      <ArrowUpRight size={24} />
                    </div>
                  </div>

                  {/* Bottom: Title & Details */}
                  <div className="flex flex-col justify-end">
                    {/* Horizontal Title - Visible when active */}
                    <div className="relative">
                      <h3
                        className={`text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white whitespace-nowrap transition-all duration-500 transform ${
                          isActive
                            ? "translate-y-0 opacity-100"
                            : "translate-y-8 opacity-0 hidden lg:block"
                        }`}
                      >
                        {cat.title}
                      </h3>

                      {/* Vertical Title - Visible when INACTIVE on Desktop */}
                      <h3
                        className={`absolute left-0 bottom-0 text-2xl font-black uppercase text-white/50 tracking-widest origin-bottom-left -rotate-90 transition-all duration-500 hidden lg:block ${
                          !isActive ? "opacity-100 visible" : "opacity-0 invisible"
                        }`}
                        style={{ whiteSpace: "nowrap", bottom: "-20px" }}
                      >
                        {cat.short}
                      </h3>
                      
                      {/* Mobile title when inactive */}
                      <h3
                        className={`text-2xl font-black uppercase text-white/70 transition-all duration-300 lg:hidden pb-4 ${
                          !isActive ? "block" : "hidden"
                        }`}
                      >
                        {cat.short}
                      </h3>
                    </div>

                    {/* Expandable Details */}
                    <div
                      className={`overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                        isActive ? "max-h-[200px] mt-4 opacity-100" : "max-h-0 mt-0 opacity-0"
                      }`}
                    >
                      <p className="text-white/60 text-sm md:text-base max-w-[400px] leading-relaxed mb-6 hidden md:block">
                        {cat.desc}
                      </p>

                      <Link
                        href={`/shop?category=${cat.id}`}
                        className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#C9A227] hover:text-white transition-colors duration-300 pointer-events-auto group/btn"
                      >
                        Explore Collection
                        <span className="w-8 h-[1px] bg-[#C9A227] group-hover/btn:w-12 transition-all duration-300" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
