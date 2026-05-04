"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Award, RotateCcw, Star, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Award,
    title: "Made to Last",
    desc: "Strong fabrics that stay in great shape even after many wears.",
    label: "Quality"
  },
  {
    icon: Zap,
    title: "Look Your Best",
    desc: "Modern designs that help you stand out and feel confident.",
    label: "Style"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Get your new jackets delivered across Sri Lanka within 48 hours.",
    label: "Shipping"
  },
  {
    icon: RotateCcw,
    title: "Shop with Trust",
    desc: "Easy returns and safe payments for a worry-free experience.",
    label: "Returns"
  },
  {
    icon: ShieldCheck,
    title: "Unique Designs",
    desc: "Exclusive styles that help you express your own personality.",
    label: "Exclusivity"
  },
  {
    icon: Star,
    title: "Happy Customers",
    desc: "Join over 10,000 people who love our quality and service.",
    label: "Trust"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 md:py-40 bg-[#0B0B0B] overflow-hidden" id="protocol">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-[#C9A227]/5 blur-[120px] rounded-full opacity-40 animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#C9A227]/5 blur-[100px] rounded-full opacity-30" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: BRAND STATEMENT */}
          <div className="lg:col-span-5 lg:sticky lg:top-40">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-[#C9A227]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9A227]">
                  Why Choose Us
                </span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-8">
                Jackets Built <br />
                For Your <br />
                <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>Real Life.</span>
              </h2>
              
              <p className="text-white/50 text-sm md:text-lg leading-relaxed font-light mb-12 max-w-md">
                We make simple, high-quality fashion jackets that help you look great and feel comfortable every day. Buy jackets online in Sri Lanka with total confidence.
              </p>

              {/* Trust Stats */}
              <div className="grid grid-cols-2 gap-10 mb-12">
                <div>
                  <div className="text-3xl font-black text-white mb-2">10K+</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 italic">Happy Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white mb-2">4.9/5</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 italic">Star Rating</div>
                </div>
              </div>

              <Link 
                href="/shop"
                className="group inline-flex items-center gap-4 bg-white text-black px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-[#C9A227] transition-all duration-500"
              >
                Explore Collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: FEATURE CARDS */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} feature={feature} index={idx} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, index }: { feature: any; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl overflow-hidden hover:border-[#C9A227]/30 transition-all duration-500"
    >
      {/* Card Gradient Glow */}
      <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-[#C9A227]/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Icon Area */}
      <div className="relative z-10 mb-8">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#C9A227] group-hover:text-black transition-all duration-500 text-white">
          <feature.icon size={22} className="group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10">
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C9A227] mb-3 block">
          {feature.label}
        </span>
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white mb-4 leading-none">
          {feature.title}
        </h3>
        <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light">
          {feature.desc}
        </p>
      </div>

      {/* Mobile Interaction Hint (Subtle line at bottom) */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C9A227] group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
};

export default WhyChooseUs;
