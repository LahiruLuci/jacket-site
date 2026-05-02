"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    image: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
    title: "MASTER THE ELEMENTS",
    subtitle: "Advanced Weatherproofing",
    description: "Engineered for the most extreme riding conditions on earth.",
  },
  {
    image: "/assets/peterlesliemorris-motorcycle-1829461_1920.webp",
    title: "PURE PERFORMANCE",
    subtitle: "Aerodynamic Excellence",
    description: "Designed in wind tunnels for maximum stability at high velocities.",
  },
  {
    image: "/assets/derneuemann-jacket-2821961_1920.webp",
    title: "TIMELESS STYLE",
    subtitle: "Premium Italian Leather",
    description: "Hand-crafted heritage meets modern ballistic safety standards.",
  },
];

const HeroSlider = () => {
  return (
    <section className="relative h-screen w-full bg-[#0A0B0C] overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
        loop={true}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="relative overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover scale-105 animate-slow-zoom"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="container relative z-10 h-full flex flex-col justify-center px-8 md:px-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-3xl"
              >
                <span className="inline-block text-accent font-black tracking-[0.4em] uppercase text-xs mb-4">
                  {slide.subtitle}
                </span>
                <h1 className="text-6xl md:text-8xl lg:text-[110px] font-black leading-[0.9] text-white tracking-tighter mb-8 italic">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl text-white/60 mb-10 max-w-xl font-light">
                  {slide.description}
                </p>
                <div className="flex items-center gap-6">
                  <button className="px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] hover:bg-accent hover:text-white transition-colors flex items-center gap-3 group">
                    View Product <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="px-10 py-5 border border-white/20 text-white font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/5 transition-colors">
                    The Tech
                  </button>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation */}
      <div className="absolute bottom-10 right-10 z-20 hidden md:flex gap-4">
        <button className="prev-btn w-14 h-14 border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-colors">
          <ChevronLeft size={24} />
        </button>
        <button className="next-btn w-14 h-14 border border-white/10 flex items-center justify-center text-white hover:bg-accent transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>

    </section>
  );
};

export default HeroSlider;

