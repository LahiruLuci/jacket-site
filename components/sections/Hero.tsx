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
    <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-dark-bg">

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
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/80 via-dark-bg/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-bg to-transparent" />
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
            className="flex items-center gap-2 mb-4"
          >
            <ShieldCheck size={14} className="text-accent" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
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
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase leading-[0.95] tracking-tight text-white mb-6"
          >
            {slide.headline.map((line, i) =>
              line === slide.accent ? (
                <span key={i} className="text-accent block">{line}</span>
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
            className="text-white/60 text-sm md:text-base max-w-[460px] leading-relaxed mb-8 md:mb-10 font-medium"
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
            href="/#featured-products"
            className="group flex items-center gap-3 bg-accent hover:bg-accent/90 text-white font-bold text-xs uppercase tracking-widest px-10 py-5 transition-all duration-300"
          >
            Explore Collection
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            href="/about"
            className="backdrop-blur-md bg-white/5 border border-white/20 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-10 py-5 transition-all duration-300"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Slide Counter + Navigation */}
      <div className="absolute bottom-12 left-8 md:left-16 lg:left-24 z-20 flex items-center gap-6">
        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="w-12 h-12 border border-white/10 hover:border-accent flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="w-12 h-12 border border-white/10 hover:border-accent flex items-center justify-center text-white/40 hover:text-white transition-all duration-300 rounded-full"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Progress dots */}
        <div className="flex items-center gap-3 px-4">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="relative h-[2px] transition-all duration-500 cursor-pointer"
              style={{ width: i === current ? 40 : 16, background: i === current ? "var(--accent)" : "rgba(255,255,255,0.15)" }}
            />
          ))}
        </div>
      </div>

      {/* Right-side autoplay progress bar */}
      <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white/5 z-20 hidden md:block">
        <motion.div
          key={current}
          className="w-full bg-accent"
          initial={{ height: "0%" }}
          animate={{ height: "100%" }}
          transition={{ duration: 5.5, ease: "linear" }}
        />
      </div>
    </section>
  );
}
