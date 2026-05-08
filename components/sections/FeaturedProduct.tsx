"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShoppingBag, Ruler, ArrowRight, ShieldCheck } from "lucide-react";

interface FeaturedProductProps {
  product?: {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category?: { name: string };
  };
}

export default function FeaturedProduct({ product }: FeaturedProductProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  
  // Default data for fallback
  const defaultProduct = {
    id: "interceptor-nv",
    slug: "navy-guard-water-resistant-utility-jacket",
    name: "Navy Guard Water-Resistant Utility Jacket",
    description: "The ultimate aquatic-inspired defense layer. Engineered with 1000D Navy Ballistic Weave and integrated carbon-silicate sliders for high-velocity urban deployment.",
    price: 799,
    images: ["/assets/navy-blue-jacket/navy-blue-jacket.webp"],
    category: { name: "Elite Series" }
  };

  const activeProduct = product || defaultProduct;
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const auraY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section 
      ref={containerRef} 
      className="relative bg-[#111213] min-h-screen py-24 md:py-32 overflow-hidden z-10"
    >
      {/* Dynamic Aura Background */}
      <motion.div 
        style={{ y: auraY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent blur-[250px] opacity-[0.03] pointer-events-none"
      />

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center mb-20 md:mb-32">
          <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">
            The Masterpiece
          </span>
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-white">
            Featured <span className="text-accent">Archive.</span>
          </h2>
        </div>

        {/* The Mega Bento Layout */}
        <motion.div 
          style={{ y: cardY }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 max-w-[1400px] mx-auto"
        >
          
          {/* Main Product Image - The Gallery Pane */}
          <Link 
            href={`/jacket/${activeProduct.slug}`}
            className="lg:col-span-7 relative h-[60vh] md:h-[800px] rounded-2xl overflow-hidden group bg-dark-bg border border-white/5 shadow-2xl"
          >
            <Image
              src={activeProduct.images[0] || "/assets/placeholder.webp"}
              alt={activeProduct.name}
              fill
              className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            />
            {/* Elegant lighting gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div>
                <span className="bg-white/10 backdrop-blur-md border border-white/10 text-white/70 text-[9px] uppercase tracking-[0.3em] font-bold px-3 py-1 rounded-sm mb-3 inline-block">
                  Limited Allocation
                </span>
                <p className="text-white/40 text-xs tracking-widest hidden md:block">
                  London HQ // Dispatch Archives
                </p>
              </div>
              
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <ShieldCheck size={20} className="text-accent" />
              </div>
            </div>
          </Link>

          {/* Right Column: Interaction & Detail Panes */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:gap-8">
            
            {/* The Purchase / Specs Module */}
            <div className="flex-1 rounded-2xl bg-dark-bg-alt border border-white/5 p-8 md:p-12 relative overflow-hidden group">
              <span className="text-white/30 text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">
                Archive No. 001
              </span>
              
              <Link href={`/jacket/${activeProduct.slug}`}>
                <h3 className="text-3xl md:text-4xl text-white font-bold uppercase tracking-tight leading-[1.1] mb-5 hover:text-accent transition-colors">
                  {activeProduct.name.split(" ").slice(0, 2).join(" ")} <br />
                  <span className="text-accent italic font-normal text-xl md:text-2xl block mt-1">
                    {activeProduct.name.split(" ").slice(2).join(" ")}
                  </span>
                </h3>
              </Link>
              
              <p className="text-white/50 text-sm leading-relaxed mb-8 line-clamp-3">
                {activeProduct.description}
              </p>

              <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/10">
                <span className="text-3xl tracking-tighter font-bold text-white">${activeProduct.price}</span>
                <span className="text-accent text-[10px] font-bold uppercase tracking-widest border border-accent/20 bg-accent/5 px-3 py-1 rounded-sm">
                  In Stock
                </span>
              </div>

              {/* Size Selector */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-white/50 font-bold uppercase tracking-widest">Size</span>
                  <button className="flex items-center gap-2 text-white/30 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-widest">
                    <Ruler size={12} />
                    Size Guide
                  </button>
                </div>
                
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 h-12 flex items-center justify-center text-xs font-bold transition-all duration-300 border cursor-pointer ${
                        selectedSize === size 
                          ? "bg-white text-black border-white" 
                          : "bg-transparent text-white/60 border-white/10 hover:border-white/40"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart Button */}
              <button className="w-full h-18 md:h-20 bg-accent hover:bg-white text-white hover:text-black flex items-center justify-between px-8 md:px-10 font-bold uppercase tracking-widest text-sm transition-all duration-500 group/btn shadow-xl cursor-pointer rounded-lg">
                <span className="relative z-10">Acquire Piece</span>
                <div className="relative z-10 flex items-center gap-4">
                  <span className="w-[1px] h-6 bg-white/20 group-hover:bg-black/20 transition-colors" />
                  <ShoppingBag size={20} className="group-hover:scale-110 transition-transform duration-300" />
                </div>
              </button>
            </div>

            {/* The Detail / Material Pane */}
            <div className="h-[250px] md:h-[300px] rounded-2xl bg-dark-bg-alt border border-white/5 relative overflow-hidden group">
              <Image
                src={activeProduct.images[0] || "/assets/stocksnap-dark-2598357_1920.webp"}
                alt="Material Texture"
                fill
                className="object-cover opacity-20 grayscale transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
              
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h4 className="text-white text-xl font-bold uppercase tracking-tight mb-2">
                  Premium Materials
                </h4>
                <p className="text-white/50 text-sm leading-relaxed max-w-[280px]">
                  Engineered with uncompromised precision and sourced from elite heritage hides.
                </p>
                <div className="mt-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-accent">
                  Explore Heritage <ArrowRight size={14} />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
