"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const reviewsRow1 = [
  {
    name: "Marcus T.",
    role: "Ducati Panigale V4 Rider",
    text: "I've worn gear from every major European brand. Nothing, and I mean absolutely nothing, fits or protects like the Junction Stealth. It's on another planet.",
    rating: 5,
  },
  {
    name: "Elena R.",
    role: "Professional Stunt Rider",
    text: "The D3O matrix is invisible until you need it. I took a 70mph slide on the track and walked away without a scratch. The jacket barely looked scuffed.",
    rating: 5,
  },
  {
    name: "David K.",
    role: "Custom Builder, LA",
    text: "The craftsmanship is absurd. You can smell the Italian leather from across the room. The stitching is surgical. This isn't a jacket, it's an heirloom.",
    rating: 5,
  },
  {
    name: "Julian H.",
    role: "Track Instructor",
    text: "I judge gear by what happens at 150mph. This chassis doesn't flutter, doesn't drag, and breathes perfectly. An absolute aerodynamic triumph.",
    rating: 5,
  },
];

const reviewsRow2 = [
  {
    name: "Sophie M.",
    role: "Cafe Racer Enthusiast",
    text: "Finally, gear that doesn't make me look like a plastic toy. I can step off my bike and walk straight into a high-end restaurant looking incredibly sharp.",
    rating: 5,
  },
  {
    name: "Vincent O.",
    role: "Adventure Tourer",
    text: "Rode through a torrential downpour in the Alps. The nano-ceramic coating laughed at the rain. I remained completely dry and perfectly warm.",
    rating: 5,
  },
  {
    name: "Alexander P.",
    role: "Motorcycle Journalist",
    text: "I review jackets for a living. The attention to detail here sets a completely new industry benchmark. It justifies its price tag within the first 10 seconds.",
    rating: 5,
  },
  {
    name: "Liam C.",
    role: "Daily Commuter",
    text: "The stealth aesthetics are perfect for city riding. Nobody knows you're wearing an armored vault until you tap the shoulder pads.",
    rating: 5,
  },
];

const SpotlightCard = ({ review }: { review: any }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => { setIsFocused(true); setOpacity(1); }}
      onBlur={() => { setIsFocused(false); setOpacity(0); }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative flex flex-col justify-between w-[320px] md:w-[450px] shrink-0 overflow-hidden rounded-2xl bg-[#0F0F0F] border border-white/[0.05] p-8 md:p-10 transition-transform duration-500 hover:-translate-y-2 group"
    >
      {/* Magic Spotlight gradient following mouse */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-0"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(176, 141, 87, 0.12), transparent 40%)`,
        }}
      />
      
      {/* Border Glow line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <div className="flex gap-1">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} size={14} className="fill-accent text-accent" />
            ))}
          </div>
          <Quote size={40} className="text-white/5 opacity-50 rotate-180" />
        </div>

        <p className="text-white/70 text-sm md:text-base leading-relaxed font-light mb-12">
          "{review.text}"
        </p>

        <div className="mt-auto border-t border-white/10 pt-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#1A1A1A] border border-white/10 flex items-center justify-center">
            <span className="text-white text-xs font-bold font-serif">{review.name.charAt(0)}</span>
          </div>
          <div>
            <h4 className="text-white text-sm font-bold uppercase tracking-wide">{review.name}</h4>
            <p className="text-accent text-[10px] font-bold uppercase tracking-widest mt-0.5">
              {review.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Reviews() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={sectionRef} className="relative bg-[#161718] py-32 md:py-48 overflow-hidden z-10">
      
      {/* Dynamic CSS Variables & Keyframes natively injected */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(calc(-50% - 1rem)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left 45s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right 50s linear infinite;
        }
        .marquee-pause:hover .animate-marquee-left,
        .marquee-pause:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}} />

      {/* Background Graphic */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Image
          src="/assets/derneuemann-jacket-2821961_1920.webp"
          alt="Backdrop"
          fill
          className="object-cover opacity-[0.04] grayscale blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#161718] via-transparent to-[#161718]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#161718] via-transparent to-[#161718]" />
      </div>

      <div className="relative z-10 flex flex-col w-full marquee-pause">
        
        {/* Header */}
        <motion.div 
          style={{ y: headerY }}
          className="text-center mb-20 px-6"
        >
          <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-white">
            Client <span className="text-accent">Verdict.</span>
          </h2>
        </motion.div>

        {/* Marquee Row 1 - Moving Left */}
        <div className="flex gap-4 md:gap-8 w-max animate-marquee-left mb-4 md:mb-8 px-4">
          {[...reviewsRow1, ...reviewsRow1].map((review, i) => (
            <SpotlightCard key={`r1-${i}`} review={review} />
          ))}
        </div>

        {/* Marquee Row 2 - Moving Right */}
        <div className="flex gap-4 md:gap-8 w-max animate-marquee-right px-4">
          {[...reviewsRow2, ...reviewsRow2].map((review, i) => (
            <SpotlightCard key={`r2-${i}`} review={review} />
          ))}
        </div>

      </div>
    </section>
  );
}
