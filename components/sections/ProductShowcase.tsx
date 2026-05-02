"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, CornerRightDown } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    name: "Aero-Carbon Pilot",
    price: "$2,450",
    image: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
    detail: "Ultra-Light Carbon Weave",
  },
  {
    name: "Nomad Heritage",
    price: "$1,890",
    image: "/assets/derneuemann-jacket-2821961_1920.webp",
    detail: "Hand-Burnished Calfskin",
  },
  {
    name: "Midnight Vanguard",
    price: "$3,100",
    image: "/assets/stocksnap-dark-2598357_1920.webp",
    detail: "Titanium Sub-Structure",
  },
  {
    name: "Lunar Ops v2",
    price: "$2,200",
    image: "/assets/splitshire-biker-407123_1920.webp",
    detail: "Ballistic Nylon Hybrid",
  },
];

const ProductShowcase = () => {
  return (
    <section className="bg-background py-32 px-8 border-t border-white/5 relative">
      <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/5 hidden lg:block" />
      
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 relative z-10">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-10 h-[1px] bg-accent" />
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">Selected Works</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-none mb-4 italic"
            >
              BEST <span className="font-light gold-gradient">SELLERS.</span>
            </motion.h2>
          </div>
          
          <div className="mt-10 md:mt-0 flex flex-col items-end">
            <div className="w-20 h-20 border border-white/10 rounded-full flex items-center justify-center mb-8 rotate-[-15deg] hover:rotate-0 transition-transform duration-700">
              <CornerRightDown className="text-accent" size={24} strokeWidth={1} />
            </div>
            <p className="text-right text-[10px] text-white/30 uppercase tracking-[0.4em] font-medium leading-loose">
              00 // ARCHIVAL QUALITY <br />
              01 // LIMITED RUN <br />
              02 // PEAK ARMOR
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
          {products.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-[#161718] p-8 flex flex-col justify-between h-[600px] hover:z-20 transition-all duration-500"
            >
              <div className="flex justify-between items-start relative z-20">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold text-accent tracking-widest">{product.detail}</span>
                  <p className="text-white font-serif text-xl italic group-hover:text-accent transition-colors duration-500">{product.name}</p>
                </div>
                <button className="text-white/20 hover:text-accent transition-colors">
                  <Heart size={16} strokeWidth={1.5} />
                </button>
              </div>

              <div className="relative aspect-[3/4] w-full mt-8 mb-8 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-40" />
                
                {/* Visual Label */}
                <div className="absolute right-4 bottom-4 flex flex-col items-end gap-2">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/40 rotate-90 origin-right translate-y-[-100%]">Catalog Item No. 00{idx + 1}</span>
                </div>
              </div>

              <div className="flex justify-between items-end relative z-20">
                <div className="flex flex-col leading-none">
                  <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">MSRP</span>
                  <span className="text-2xl font-bold text-white">{product.price}</span>
                </div>
                <button className="px-6 py-3 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:bg-accent hover:text-black hover:border-accent transition-all duration-500">
                  Acquire
                </button>
              </div>

              {/* Reveal Line */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left" />
            </motion.div>
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <button className="group flex items-center gap-8 px-12 py-6 border border-white/5 hover:border-accent transition-all duration-700">
            <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40 group-hover:text-white">View Full Archive</span>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent transition-colors">
              <CornerRightDown className="text-white group-hover:text-accent transition-colors" size={20} strokeWidth={1} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
