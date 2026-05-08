"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, Award, RotateCcw, Star, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Award,
    title: "Quality Materials",
    desc: "Built with durable, long-lasting fabric designed for everyday use.",
    label: "Quality"
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Island-wide delivery within 2–4 days across Sri Lanka.",
    label: "Logistic"
  },
  {
    icon: RotateCcw,
    title: "Easy Exchange",
    desc: "7-day size exchange available for a perfect fit.",
    label: "Policy"
  },
  {
    icon: ShieldCheck,
    title: "Secure Checkout",
    desc: "Safe and reliable payment process for all your acquisitions.",
    label: "Security"
  }
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-24 md:py-32 bg-secondary overflow-hidden" id="protocol">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full opacity-40 animate-pulse" />
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
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[2px] bg-accent" />
                <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
                  Why Choose Our Jackets
                </span>
              </div>
              
              <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-primary leading-[0.95] mb-8">
                Engineered <br />
                For The <br />
                <span className="text-accent">Modern Road.</span>
              </h2>
              
              <p className="text-text-muted text-base md:text-lg leading-relaxed mb-12 max-w-md">
                We bridge the gap between technical protection and contemporary aesthetic. Every piece is built to handle the elements while maintaining a clean, premium silhouette.
              </p>

              <Link 
                href="/shop"
                className="group inline-flex items-center gap-4 bg-primary text-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all duration-300 rounded-lg shadow-lg"
              >
                Shop the Collection
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: FEATURE CARDS */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
      className="group relative p-8 md:p-10 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
    >
      {/* Icon Area */}
      <div className="relative z-10 mb-8">
        <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-secondary border border-black/5 group-hover:bg-accent group-hover:text-white transition-all duration-500 text-primary">
          <feature.icon size={24} className="group-hover:scale-110 transition-transform" />
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent mb-3 block">
          {feature.label}
        </span>
        <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-primary mb-4 leading-tight">
          {feature.title}
        </h3>
        <p className="text-text-muted text-sm md:text-base leading-relaxed">
          {feature.desc}
        </p>
      </div>

      {/* Hover Decoration */}
      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-accent group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
};

export default WhyChooseUs;
