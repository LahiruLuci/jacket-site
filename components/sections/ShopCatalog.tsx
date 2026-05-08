"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, Plus, SlidersHorizontal } from "lucide-react";

// Massive high-end mockup data referencing the Jacket Junction theme
const products = [
  { 
    id: 1, 
    slug: "junction-titan-racing-suit",
    name: "Junction Titan Racing Suit", 
    price: 1450, 
    category: "Race", 
    material: "Leather", 
    season: "All Season", 
    img: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
    badge: "Bestseller"
  },
  { 
    id: 2, 
    slug: "stealth-commuter-shell",
    name: "Stealth Commuter Shell", 
    price: 850, 
    category: "Urban", 
    material: "Synthetic", 
    season: "Summer", 
    img: "/assets/derneuemann-jacket-2821961_1920.webp",
    badge: null
  },
  { 
    id: 3, 
    slug: "apex-kinetic-armor",
    name: "Apex Kinetic Armor", 
    price: 1200, 
    category: "Race", 
    material: "Kevlar", 
    season: "Winter", 
    img: "/assets/image (1).webp",
    badge: "Low Stock"
  },
  { 
    id: 4, 
    slug: "heritage-cafe-racer",
    name: "Heritage Cafe Racer", 
    price: 950, 
    category: "Heritage", 
    material: "Leather", 
    season: "All Season", 
    img: "/assets/peterlesliemorris-motorcycle-1829461_1920.webp",
    badge: null
  },
  { 
    id: 5, 
    slug: "velocity-air-mesh",
    name: "Velocity Air Mesh", 
    price: 600, 
    category: "Urban", 
    material: "Synthetic", 
    season: "Summer", 
    img: "/assets/splitshire-biker-407123_1920.webp",
    badge: null
  },
  { 
    id: 6, 
    slug: "nomad-gore-tex-pro",
    name: "Nomad Gore-Tex Pro", 
    price: 1100, 
    category: "Touring", 
    material: "Gore-Tex", 
    season: "Winter", 
    img: "/assets/stocksnap-dark-2598357_1920.webp",
    badge: "New Arrival"
  },
];

export default function ShopCatalog() {
  const [category, setCategory] = useState("All");
  const [material, setMaterial] = useState("All");
  const [sort, setSort] = useState("Featured");

  // Filter Logic
  let filteredProducts = products.filter(p => {
    if (category !== "All" && p.category !== category) return false;
    if (material !== "All" && p.material !== material) return false;
    return true;
  });

  // Sorting Logic
  if (sort === "Price: Low to High") {
    filteredProducts.sort((a,b) => a.price - b.price);
  } else if (sort === "Price: High to Low") {
    filteredProducts.sort((a,b) => b.price - a.price);
  } else {
    // Featured sort resets to exact ID order
    filteredProducts.sort((a,b) => a.id - b.id);
  }

  return (
    <section className="bg-[#161718] w-full min-h-screen text-white pb-32 relative z-20">
      
      {/* 
        Floating Glass Filter HUD
        Sticks perfectly to the top when the user scrolls down into the grid.
      */}
      <div className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#161718]/80 border-y border-white/10 px-6 md:px-12 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 transition-all duration-300">
        
        {/* Left Side: Filter Nodes */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 text-white/40 mr-4">
             <SlidersHorizontal size={16} />
             <span className="text-[10px] font-bold uppercase tracking-widest">Filters</span>
          </div>
          
          <FilterDropdown 
            label="Category" 
            options={["All", "Race", "Urban", "Heritage", "Touring"]} 
            current={category} 
            onChange={setCategory} 
          />
          <FilterDropdown 
            label="Material" 
            options={["All", "Leather", "Kevlar", "Gore-Tex", "Synthetic"]} 
            current={material} 
            onChange={setMaterial} 
          />
        </div>

        {/* Right Side: Sorting & Metrics */}
        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest hidden md:block">
            {filteredProducts.length} Architectures Found
          </span>
          <FilterDropdown 
            label="Sort" 
            options={["Featured", "Price: Low to High", "Price: High to Low"]} 
            current={sort} 
            onChange={setSort} 
          />
        </div>
      </div>

      {/* 
        Masonry / Grid Catalog 
        Utilizes AnimatePresence and specialized layout transitions for perfect filtering fluidity.
      */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-24 min-h-[50vh]">
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 md:gap-x-12 md:gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="col-span-full flex flex-col items-center justify-center py-32 text-center"
              >
                 <span className="text-[150px] font-black text-white/5 leading-none">0</span>
                 <h3 className="text-2xl font-bold uppercase tracking-widest text-white mt-4">No Schematics Found</h3>
                 <p className="text-white/40 mt-2 text-sm max-w-sm">
                   The parameters you have set resulted in zero kinetic armor matches. Please refine your filter parameters.
                 </p>
                 <button 
                   onClick={() => { setCategory("All"); setMaterial("All"); }}
                   className="mt-8 px-6 py-3 border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
                 >
                   Reset Matrices
                 </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

    </section>
  );
}


/* -------------------------------------------------------------------------- */
/* SUBCOMPONENTS                                                              */
/* -------------------------------------------------------------------------- */

// High-End Product Card Component
function ProductCard({ product }: { product: any }) {
  return (
    <Link href={`/jacket/${product.slug}`} className="block">
      <motion.div 
        layout
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="group flex flex-col gap-6 cursor-pointer"
      >
      {/* Immersive Image Canvas */}
      <div className="relative w-full aspect-[4/5] bg-[#1F2022] rounded-[24px] overflow-hidden border border-white/5">
         
         <Image 
           src={product.img} 
           fill 
           alt={product.name}
           className="object-cover grayscale-[0.2] transition-transform duration-[2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110" 
         />
         
         {/* Atmospheric Darkening to make text pop */}
         <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
         
         {/* Dynamic Float Badge */}
         <div className="absolute top-5 left-5 flex flex-col gap-2">
           <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-lg">
             {product.category}
           </div>
            {product.badge && (
             <div className="bg-accent text-white text-[9px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-lg">
               {product.badge}
             </div>
            )}
         </div>

         {/* Interventional Hover CTA (Action Drawer) */}
         <div className="absolute inset-x-4 bottom-4 flex translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] z-20">
            <button className="w-full bg-white backdrop-blur-xl text-[#161718] font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs py-4 md:py-5 flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-colors rounded-[16px] shadow-2xl">
               Acquire Piece <Plus size={16} />
            </button>
         </div>
      </div>

      {/* High Contrast Typography Block */}
      <div className="flex justify-between items-start px-2">
         <div className="flex flex-col gap-1.5">
            <h3 className="text-base md:text-lg lg:text-xl font-bold uppercase tracking-tight text-white group-hover:text-accent transition-colors">
              {product.name}
            </h3>
            <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase">
              {product.material} <span className="mx-2 text-white/20">/</span> {product.season}
            </span>
         </div>
         <span className="text-white font-mono text-lg md:text-xl font-bold mt-1">
           ${product.price}
         </span>
      </div>
      </motion.div>
    </Link>
  );
}

// Sophisticated Glass Dropdown Component
function FilterDropdown({ label, options, current, onChange }: { label: string, options: string[], current: string, onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button 
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setOpen(true)}
        className={`flex items-center gap-2 px-4 py-2 border rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-colors ${open || current !== "All" && current !== "Featured" ? "bg-white/10 text-white border-white/30" : "bg-transparent text-white/50 border-white/10 hover:text-white hover:border-white/30"}`}
      >
        <span className="hidden sm:inline">{label} //</span> <span className="text-white">{current}</span>
        <ChevronDown size={14} className={`text-white transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
           <motion.div 
             initial={{ opacity: 0, y: 15, scale: 0.95 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 15, scale: 0.95 }}
             transition={{ duration: 0.2, ease: "easeOut" }}
             className="absolute top-full mt-3 left-0 w-[220px] bg-[#1F2022]/95 backdrop-blur-2xl border border-white/10 rounded-[16px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-2 z-50 overflow-hidden"
           >
             {options.map(opt => (
                <button 
                  key={opt}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={`w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest font-bold rounded-xl transition-all flex justify-between items-center ${
                    current === opt 
                      ? 'bg-accent text-white shadow-md' 
                      : 'text-white/60 hover:text-white hover:bg-white/5 hover:pl-6'
                  }`}
                >
                  {opt}
                  {current === opt && <Check size={14} />}
                </button>
             ))}
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
