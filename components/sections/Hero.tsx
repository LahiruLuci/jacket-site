"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "/assets/splitshire-biker-407123_1920.webp",
    badge: "SS 2025 Collection",
    headline: ["Ride Bold.", "Stay", "Protected."],
    accent: "Protected.",
    sub: "Premium motorcycle jackets engineered for protection and crafted for those who refuse to compromise.",
  },
  {
    image: "/assets/derneuemann-jacket-2821961_1920.webp",
    badge: "Artisan Craftsmanship",
    headline: ["Built For", "The", "Road."],
    accent: "Road.",
    sub: "Every stitch, every panel — designed to perform at the limit while looking effortlessly elite.",
  },
  {
    image: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
    badge: "CE Level 2 Certified",
    headline: ["Where Style", "Meets", "Armor."],
    accent: "Armor.",
    sub: "CE2-certified impact armor meets hand-finished leather in a jacket that lives at the intersection of fashion and function.",
  },
  {
    image: "/assets/peterlesliemorris-motorcycle-1829461_1920.webp",
    badge: "Limited Edition",
    headline: ["Own The", "Open", "Highway."],
    accent: "Highway.",
    sub: "Engineered for the long ride. Designed to be seen. Limited to 50 units worldwide.",
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
    startTimer();
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  const slide = slides[current];

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden bg-[#161718]">

      {/* Background Images */}
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: ease }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.badge}
            fill
            priority
            className="object-cover object-center"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#161718] to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Text Content */}
      <div className="relative z-10 h-full flex flex-col justify-center pt-20 md:pt-0 px-6 sm:px-8 md:px-16 lg:px-24 max-w-5xl">

        {/* Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${current}`}
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1, ease: ease }}
            className="flex items-center gap-2 mb-6"
          >
            <ShieldCheck size={14} className="text-[#C9A227]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#C9A227]">
              {slide.badge}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Headline */}
        <AnimatePresence mode="wait">
          <motion.h1
            key={`headline-${current}`}
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2, ease: ease }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black uppercase leading-[0.9] tracking-tight text-white mb-4 md:mb-6"
          >
            {slide.headline.map((line, i) =>
              line === slide.accent ? (
                <span key={i} className="text-[#C9A227] block">{line}</span>
              ) : (
                <span key={i} className="block">{line}</span>
              )
            )}
          </motion.h1>
        </AnimatePresence>

        {/* Subtext */}
        <AnimatePresence mode="wait">
          <motion.p
            key={`sub-${current}`}
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.35, ease: ease }}
            className="text-white/55 text-xs md:text-base max-w-[420px] leading-relaxed mb-6 md:mb-10"
          >
            {slide.sub}
          </motion.p>
        </AnimatePresence>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: ease }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/shop"
            className="group flex items-center gap-3 bg-[#C9A227] hover:bg-[#b8911e] text-black font-bold text-xs uppercase tracking-widest px-8 py-4 transition-colors duration-300"
          >
            Shop Now
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            href="/about"
            className="border border-white/30 hover:border-white/70 text-white font-semibold text-xs uppercase tracking-widest px-8 py-4 transition-colors duration-300"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Slide Counter + Navigation */}
      <div className="absolute bottom-10 left-8 md:left-16 lg:left-24 z-20 flex items-center gap-6">
        {/* Prev / Next */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-10 h-10 border border-white/20 hover:border-[#C9A227] flex items-center justify-center text-white/50 hover:text-[#C9A227] transition-all duration-300"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="w-10 h-10 border border-white/20 hover:border-[#C9A227] flex items-center justify-center text-white/50 hover:text-[#C9A227] transition-all duration-300"
        >
          <ChevronRight size={18} />
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-[2px] transition-all duration-500 cursor-pointer"
              style={{ width: i === current ? 40 : 20, background: i === current ? "#C9A227" : "rgba(255,255,255,0.2)" }}
            />
          ))}
        </div>

        {/* Slide number */}
        <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* Right-side autoplay progress bar */}
      <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-white/5 z-20 hidden md:block">
        <motion.div
          key={current}
          className="w-full bg-[#C9A227]"
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{ duration: 5.5, ease: "linear" }}
        />
      </div>
    </section>
  );
}
