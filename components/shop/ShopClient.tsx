"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { 
  SlidersHorizontal, 
  ChevronDown, 
  Check, 
  Plus, 
  ArrowUpRight,
  Zap,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from "lucide-react";
import { cn } from "@/lib/utils";

// --- Types ---
type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string;
  price: number;
  images: string[];
  stock: number;
  material: string | null;
  season: string | null;
  isFeatured: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

interface ShopClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ShopClient({ initialProducts, categories }: ShopClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeMaterial, setActiveMaterial] = useState("All");
  const [sortOrder, setSortOrder] = useState("Featured");

  const materials = useMemo(() => {
    const m = new Set(initialProducts.map(p => p.material).filter(Boolean) as string[]);
    return ["All", ...Array.from(m)];
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (activeCategory !== "All") {
      result = result.filter(p => p.category.name === activeCategory);
    }

    if (activeMaterial !== "All") {
      result = result.filter(p => p.material === activeMaterial);
    }

    if (sortOrder === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [initialProducts, activeCategory, activeMaterial, sortOrder]);

  return (
    <section className="relative pt-36 md:pt-32 pb-16 md:pb-40 bg-[#0B0B0B]">
      {/* Background Decorative Mesh */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#2A2A2A_0%,transparent_70%)]" />
      </div>

      {/* 01. SHOP HERO: KINETIC ARCHIVES */}
      <div className="container relative z-10 mb-8 md:mb-20 px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 md:gap-12 border-b border-white/5 pb-6 md:pb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <div className="flex items-center gap-4 mb-4 md:mb-8">
              <div className="w-12 md:w-16 h-[1px] bg-accent" />
              <span className="text-[9px] md:text-xs font-bold uppercase tracking-[0.6em] text-accent">Deployment Portal</span>
            </div>
            <h1 className="text-4xl md:text-8xl lg:text-[140px] font-black uppercase tracking-tighter leading-[0.8] mb-2 md:mb-4">
              Vanguard <br /> <span className="text-stroke" style={{ WebkitTextStroke: "1px rgba(201,162,39,0.6)", color: "rgba(201,162,39,0.05)" }}>Arsenal.</span>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-sm text-left lg:text-right"
          >
            <div className="flex items-center justify-start lg:justify-end gap-4 mb-3 md:mb-4">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-[0.4em]">Protocol 2024.04</span>
              <div className="w-8 h-[1px] bg-white/10" />
            </div>
            <p className="text-white/50 text-[11px] md:text-base font-light leading-relaxed">
              Synthesizing ballistic intelligence with structural anatomy. Every unit in the Archives is vetted for extreme environmental fidelity.
            </p>
          </motion.div>
        </div>
      </div>

      {/* 02. FLOATING HUD: GLASS FILTERS */}
      <div className="sticky top-[70px] md:top-[80px] z-[80] w-full border-y border-white/5 backdrop-blur-3xl bg-black/60 shadow-2xl">
        <div className="container py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 px-6">
          
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto overflow-x-auto no-scrollbar py-2 md:py-0">
            <div className="flex items-center gap-3 mr-2 text-white/20 whitespace-nowrap shrink-0">
              <SlidersHorizontal size={14} />
              <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.4em]">Matrix Filter</span>
            </div>
            
            <FilterPill 
              label="Series" 
              options={["All", ...categories.map(c => c.name)]} 
              active={activeCategory} 
              onSelect={setActiveCategory} 
            />
            <FilterPill 
              label="Material" 
              options={materials} 
              active={activeMaterial} 
              onSelect={setActiveMaterial} 
            />
            {/* Sort pill inside scrollable on mobile */}
            <div className="md:hidden">
              <FilterPill 
                label="Sort" 
                options={["Featured", "Price: Low to High", "Price: High to Low"]} 
                active={sortOrder} 
                onSelect={setSortOrder} 
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">
                {filteredProducts.length} Architectures Online
              </span>
            </div>
            <FilterPill 
              label="Sort" 
              options={["Featured", "Price: Low to High", "Price: High to Low"]} 
              active={sortOrder} 
              onSelect={setSortOrder} 
            />
          </div>
        </div>
      </div>

      {/* 03. ASYMMETRICAL CATALOG GRID */}
      <div className="container mt-12 md:mt-24 px-6">
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-40"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-24 md:py-48 flex flex-col items-center justify-center text-center"
          >
            <div className="relative mb-8 md:mb-12">
              <span className="text-[100px] md:text-[180px] font-black text-white/[0.03] select-none tracking-tighter leading-none">Null</span>
              <div className="absolute inset-0 flex items-center justify-center">
                <Maximize2 size={48} className="text-white/10 md:w-16 md:h-16" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4 md:mb-6">Inventory Depleted</h3>
            <p className="text-white/40 max-w-sm text-sm md:text-base font-light mb-8 md:mb-12">The requested operational parameters returned zero results. Recalibrate the matrix filters.</p>
            <button 
              onClick={() => { setActiveCategory("All"); setActiveMaterial("All"); }}
              className="px-10 py-4 md:px-12 md:py-5 bg-accent text-black text-[10px] font-bold uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-[0_0_30px_rgba(201,162,39,0.3)]"
            >
              Reset Protocol
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// --- Subcomponents ---

function FilterPill({ label, options, active, onSelect }: { label: string, options: string[], active: string, onSelect: (v: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button 
        onMouseEnter={() => setOpen(true)}
        onClick={() => setOpen(!open)}
        className={cn(
          "px-4 md:px-6 py-2 md:py-2.5 rounded-full border text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-700 flex items-center gap-3 md:gap-4 group whitespace-nowrap",
          active !== "All" && active !== "Featured" 
            ? "bg-accent border-accent text-black shadow-[0_0_20px_rgba(201,162,39,0.2)]" 
            : "bg-white/[0.03] border-white/5 text-white/40 hover:text-white hover:border-white/20"
        )}
      >
        <span>{label} <span className="text-white/20">/</span> <span className={cn("transition-colors", active !== "All" && active !== "Featured" ? "text-black" : "text-white")}>{active}</span></span>
        <ChevronDown size={12} className={cn("transition-transform duration-700", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-full left-0 mt-4 w-56 md:w-64 bg-[#111111]/95 backdrop-blur-3xl border border-white/10 p-2 rounded-2xl md:rounded-3xl shadow-[0_40px_80px_rgba(0,0,0,0.9)] z-[110] overflow-hidden"
          >
            <div className="p-2 md:p-3 mb-1 md:mb-2 border-b border-white/5">
              <span className="text-[8px] font-black uppercase tracking-widest text-white/20">Select Parameter</span>
            </div>
            <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => { onSelect(opt); setOpen(false); }}
                  className={cn(
                    "w-full text-left px-4 md:px-5 py-3 md:py-4 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] font-bold uppercase tracking-widest transition-all flex justify-between items-center group/opt",
                    active === opt 
                      ? "bg-accent text-black" 
                      : "text-white/40 hover:text-white hover:bg-white/5 hover:pl-6 md:hover:pl-8"
                  )}
                >
                  {opt}
                  {active === opt ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <ArrowUpRight size={14} className="opacity-0 group-hover/opt:opacity-100 transition-opacity" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({ product, index }: { product: Product, index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* 01. IMAGE ARCHIVE: CAROUSEL ON HOVER */}
      <div className="relative aspect-[4/5.5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-[#161718] border border-white/5 mb-6 md:mb-10">
        
        {/* Multi-Image Carousel */}
        <div className="absolute inset-0 z-0 p-6 md:p-12">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            loop={true}
            speed={1200}
            autoplay={isHovered ? { delay: 1800, disableOnInteraction: false } : false}
            className="h-full w-full"
          >
            {product.images.map((img, i) => (
              <SwiperSlide key={i}>
                <Image 
                  src={img} 
                  alt={`${product.name} View ${i + 1}`} 
                  fill 
                  className={cn(
                    "object-contain transition-transform duration-[4s] grayscale-[0.4] group-hover:grayscale-0",
                    isHovered ? "scale-110" : "scale-100"
                  )}
                  priority={i === 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
        
        {/* Kinetic HUD: Active Tech Overlay */}
        <div className="absolute inset-0 p-6 md:p-10 z-20 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start opacity-0 lg:group-hover:opacity-100 transition-all duration-700 translate-y-[-10px] lg:group-hover:translate-y-0">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 px-3 py-1.5 bg-accent/90 backdrop-blur-md rounded-sm">
                <Zap size={10} className="text-black" />
                <span className="text-[8px] font-black uppercase tracking-widest text-black">Molecular Reactive</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-sm border border-white/10">
                <ShieldCheck size={10} className="text-white" />
                <span className="text-[8px] font-bold uppercase tracking-widest text-white">Ballistic CE L2</span>
              </div>
            </div>
            
            <div className="p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
              <ArrowUpRight size={20} className="text-white" />
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-6">
            {/* Featured Badge */}
            {product.isFeatured && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-fit px-3 py-1 md:px-4 md:py-1.5 bg-accent text-black text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] rounded-sm shadow-2xl"
              >
                Elite Operational Unit
              </motion.div>
            )}
            
            {/* HUD Status Line */}
            <div className="flex items-center gap-4 md:gap-6 opacity-40">
              <div className="flex-1 h-[1px] bg-white/20" />
              <span className="text-[7px] md:text-[8px] font-mono tracking-[0.5em] text-white">JJ-SYS-ARCHIVE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Action: Equip Button - Visible on mobile/touch, Hover on desktop */}
        <div className={cn(
          "absolute bottom-6 md:bottom-10 inset-x-6 md:inset-x-10 z-30 transition-all duration-700 pointer-events-auto",
          "opacity-100 lg:opacity-0 lg:translate-y-10 lg:group-hover:opacity-100 lg:group-hover:translate-y-0"
        )}>
          <button className="w-full py-4 md:py-6 bg-white text-black text-[10px] md:text-xs font-black uppercase tracking-[0.4em] hover:bg-accent transition-all duration-500 rounded-xl md:rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] md:shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex items-center justify-center gap-4 md:gap-6">
            Equip <span className="hidden xs:inline">To Arsenal</span> <Plus size={16} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      {/* 02. METADATA: CLEAN EDITORIAL */}
      <Link href={`/jacket/${product.slug}`} className="block px-2 md:px-4">
        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[9px] md:text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-2 md:mb-3 block">{product.category.name}</span>
              <h3 className="text-xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] md:leading-[0.8] group-hover:text-accent transition-all duration-500">
                {product.name}
              </h3>
              {product.subtitle && (
                <p className="text-[10px] md:text-sm font-bold text-white/40 uppercase tracking-[0.3em] mt-2 group-hover:text-white/60 transition-colors">
                  {product.subtitle}
                </p>
              )}
            </div>
            <div className="text-right whitespace-nowrap">
              <span className="text-lg md:text-3xl font-black text-white block mb-1">
                ${product.price.toLocaleString()}
              </span>
              <span className="text-[8px] md:text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">JJ-ID-{product.id.slice(0, 4)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 border-t border-white/5 pt-4 md:pt-6">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/20" />
              <span className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{product.material}</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-white/20" />
              <span className="text-[9px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{product.season}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
