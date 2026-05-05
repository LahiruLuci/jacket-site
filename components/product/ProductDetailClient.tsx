"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  ChevronDown, 
  Ruler, 
  ShieldCheck, 
  Wind, 
  Layers,
  Truck,
  RotateCcw,
  ArrowDown
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDetailClientProps {
  product: any;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const scrollToConfig = () => {
    document.getElementById('configuration-bay')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-accent selection:text-black">
      
      {/* 01. THE PRO ARCHIVE HERO */}
      <section className="relative w-full h-[85vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-[#050505]">
        {/* Laboratory Grid Overlay */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '64px 64px' }} 
        />
        
        {/* Kinetic Light Beam */}
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-accent/10 rounded-full blur-[160px] pointer-events-none" 
        />

        {/* The Masterpiece: Isolated Product */}
        <div className="container relative z-10 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[900px] aspect-square md:aspect-[16/10]"
          >
            <Image 
              src={product.images[0] || "/assets/placeholder.webp"} 
              alt={product.name} 
              fill 
              className="object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)] filter grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 p-8" 
              priority
            />
          </motion.div>

          {/* Minimal Meta Branding */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              <span className="text-[10px] font-black tracking-[0.8em] text-accent uppercase mb-6 block">
                {product.category?.name || "Premium Archive"}
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter leading-none mb-8">
                {product.name.split(" ").slice(0, 2).join(" ")}<br />
                <span className="text-white/20 italic font-light text-4xl md:text-6xl tracking-normal">
                  {product.name.split(" ").slice(2).join(" ")}
                </span>
              </h1>
              <motion.button 
                onClick={scrollToConfig}
                className="flex flex-col items-center gap-4 text-white/30 hover:text-accent transition-colors group mt-12"
              >
                <span className="text-[9px] font-bold uppercase tracking-[0.4em]">Initialize Configuration</span>
                <div className="w-px h-16 bg-gradient-to-b from-accent/50 to-transparent group-hover:h-24 transition-all duration-700" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Tech Overlay: Corner Stats */}
        <div className="absolute top-32 left-12 hidden xl:block">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Serial No.</span>
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">JJ-{product.id.slice(0, 8)}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Model Fidelity</span>
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">v2.04 Kinetic Armor</span>
            </div>
          </div>
        </div>
      </section>

      {/* 02. EDITORIAL GALLERY & CONFIGURATION */}
      <section id="configuration-bay" className="container max-w-[1600px] mx-auto px-4 md:px-8 py-20 md:py-32">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/30 mb-12 hidden md:flex">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <span>/</span>
          <a href="/shop" className="hover:text-white transition-colors">Shop</a>
          <span>/</span>
          <span className="text-white/80">{product.name}</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* LEFT: BENTO BOX EDITORIAL GALLERY */}
          <div className="w-full lg:w-[55%]">
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              
              {/* Image 1: Cinematic Wide */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="col-span-2 relative aspect-[16/10] bg-[#0A0A0A] rounded-[2rem] overflow-hidden border border-white/5 group"
              >
                <Image 
                  src={product.images[1] || product.images[0]} 
                  alt={`${product.name} - Angle 1`} 
                  fill 
                  className="object-cover md:object-contain mix-blend-lighten opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s]" 
                />
                <div className="absolute bottom-6 left-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block">
                  <span className="text-[10px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">Rear Architecture</span>
                </div>
              </motion.div>

              {/* Image 2: Detail Square */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="col-span-1 relative aspect-square bg-[#0A0A0A] rounded-[2rem] overflow-hidden border border-white/5 group"
              >
                <Image 
                  src={product.images[2] || product.images[0]} 
                  alt={`${product.name} - Angle 2`} 
                  fill 
                  className="object-contain mix-blend-lighten opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s] p-8" 
                />
              </motion.div>

              {/* Image 3: Detail Square */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="col-span-1 relative aspect-square bg-[#0A0A0A] rounded-[2rem] overflow-hidden border border-white/5 group"
              >
                <Image 
                  src={product.images[3] || product.images[0]} 
                  alt={`${product.name} - Angle 3`} 
                  fill 
                  className="object-contain mix-blend-lighten opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-[1.5s] p-8" 
                />
              </motion.div>

              {/* Image 4: Tall Detail (if available) */}
              {product.images[4] && (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="col-span-2 relative aspect-[21/9] bg-[#0A0A0A] rounded-[2rem] overflow-hidden border border-white/5 group mt-2"
                >
                  <Image 
                    src={product.images[4]} 
                    alt={`${product.name} - Angle 4`} 
                    fill 
                    className="object-cover mix-blend-lighten opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-[1.5s]" 
                  />
                </motion.div>
              )}

            </div>
          </div>

          {/* RIGHT: STICKY PROCUREMENT TERMINAL (CLASSIC UX) */}
          <div className="w-full lg:w-[45%] relative">
            <div className="sticky top-32 flex flex-col">
              
              {/* Header Info */}
              <div className="mb-8">
                <div className="flex items-baseline justify-between mb-6">
                  <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">Configuration</h2>
                  <div className="text-2xl md:text-3xl font-mono font-bold text-accent">
                    ${product.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-6 bg-[#0A0A0A] rounded-2xl border border-white/5 mb-10">
                  <p className="text-white/60 text-sm md:text-base font-light leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-5">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">Select Size</span>
                  <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                    <Ruler size={14} /> View Guide
                  </button>
                </div>
                
                <div className="grid grid-cols-5 gap-3">
                  {["48", "50", "52", "54", "56"].map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-14 md:h-16 rounded-xl border flex items-center justify-center font-mono text-sm md:text-base font-bold transition-all duration-300",
                        selectedSize === size 
                          ? "bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105" 
                          : "bg-[#0A0A0A] border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                   <motion.p 
                     initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                     className="text-accent text-[10px] uppercase tracking-widest mt-4 hidden" 
                     id="size-warning"
                   >
                     Warning: Size Selection Required
                   </motion.p>
                )}
              </div>

              {/* MASSIVE ADD TO CART BUTTON */}
              <button 
                onClick={() => {
                  if (!selectedSize) {
                    document.getElementById('size-warning')?.classList.remove('hidden');
                    return;
                  }
                  // Proceed to cart
                }}
                className="w-full h-18 md:h-24 bg-white text-black rounded-2xl flex items-center justify-center gap-6 font-black uppercase tracking-[0.2em] text-base md:text-xl hover:bg-accent transition-all duration-300 mb-12 shadow-[0_15px_50px_rgba(255,255,255,0.15)] hover:shadow-[0_15px_50px_rgba(201,162,39,0.35)] hover:-translate-y-1"
              >
                <ShoppingBag size={28} />
                Add To Cart
              </button>

              {/* Value Props */}
              <div className="grid grid-cols-2 gap-4 mb-12 border-y border-white/5 py-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-white/40">
                    <Truck size={16} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Free Global Delivery</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-white/40">
                    <RotateCcw size={16} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">30-Day Returns</span>
                </div>
              </div>

              {/* Specs Accordions */}
              <div className="flex flex-col gap-3">
                <Accordion title="Technical Data">
                  <ul className="space-y-5 text-sm font-light text-white/60">
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <Layers size={14} className="text-accent" />
                      </div>
                      <div className="flex flex-col">
                        <strong className="text-white uppercase tracking-wider text-[10px] mb-1">Material</strong>
                        <span>{product.material || "High-tensile ballistic weave"} construction.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <ShieldCheck size={14} className="text-accent" />
                      </div>
                      <div className="flex flex-col">
                        <strong className="text-white uppercase tracking-wider text-[10px] mb-1">Protection</strong>
                        <span>Integrated CE Level 2 armor in critical strike zones.</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                        <Wind size={14} className="text-accent" />
                      </div>
                      <div className="flex flex-col">
                        <strong className="text-white uppercase tracking-wider text-[10px] mb-1">Climate Control</strong>
                        <span>{product.season || "All-Season"} dynamic ventilation system.</span>
                      </div>
                    </li>
                  </ul>
                </Accordion>

                <Accordion title="Care Protocol">
                  <p className="text-sm font-light text-white/60 leading-relaxed">
                    Remove all armor pads before washing. Hand wash only using specialized technical fabric detergent. Do not machine wash or tumble dry. Hang to dry in a well-ventilated area away from direct sunlight.
                  </p>
                </Accordion>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

// --- Subcomponents ---

function Accordion({ title, children }: { title: string, children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-white/5 rounded-2xl bg-[#0A0A0A] overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-[11px] font-bold uppercase tracking-widest text-white/80">{title}</span>
        <ChevronDown size={16} className={cn("text-white/40 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-2 border-t border-white/5">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


