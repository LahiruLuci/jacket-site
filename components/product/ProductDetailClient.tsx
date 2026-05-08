"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { 
  ShoppingBag, 
  Ruler, 
  Droplets,
  Shield,
  Layout,
  Package,
  CheckCircle2,
  Clock,
  RotateCcw,
  X,
  Maximize2,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";

interface ProductDetailClientProps {
  product: any;
  relatedProducts: any[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();

  // Safety checks
  const productName = product?.name || "Premium Jacket";
  const productPrice = product?.price || 0;
  const productDesc = product?.description || "Crafted for durability and designed to adapt to your daily movement.";
  const productSubtitle = product?.subtitle || "";
  
  const { scrollY } = useScroll();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowStickyBar(latest > 800);
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax Values
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentY = useTransform(scrollYProgress, [0.05, 0.2], [50, 0]);

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "start end"]
  });

  // Hero Content Fade/Scale
  const heroContentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroContentScale = useTransform(scrollY, [0, 400], [1, 0.9]);

  const images = product?.images && product.images.length > 0 
    ? product.images 
    : ["/assets/placeholder.webp"];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    // Add to global cart store
    addItem(product, selectedSize);
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div ref={containerRef} className="bg-[#0B0B0B] text-white min-h-[200vh] selection:bg-accent selection:text-black font-inter">
      
      {/* 01. THE IMMERSIVE HERO */}
      <section className="relative lg:sticky lg:top-0 h-[80vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-accent/10 rounded-full blur-[160px] opacity-40" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0B0B_85%)]" />
        </div>

        {/* Massive Background Typography */}
        <motion.div 
          style={{ y: bgTextY, opacity: heroContentOpacity } as any}
          className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none whitespace-nowrap hidden lg:flex"
        >
          <h2 className="text-[18vw] font-black uppercase tracking-tighter text-white/[0.03] leading-none select-none">
            {productName}
          </h2>
        </motion.div>

        {/* Main Product Image */}
        <motion.div 
          style={{ 
            scale: mounted && typeof window !== 'undefined' && window.innerWidth > 1024 ? imageScale : 1, 
            opacity: mounted && typeof window !== 'undefined' && window.innerWidth > 1024 ? imageOpacity : 1 
          } as any}
          className="relative w-full max-w-[1200px] aspect-square md:aspect-[16/10] z-10 flex items-center justify-center p-8"
        >
          <Image 
            src={images[0]} 
            alt={productName} 
            fill 
            className="object-contain drop-shadow-[0_60px_150px_rgba(0,0,0,0.9)]"
            priority
          />
        </motion.div>

        <motion.div 
          style={{ opacity: heroContentOpacity, scale: heroContentScale } as any}
          className="absolute bottom-12 md:bottom-20 inset-x-8 md:inset-x-24 flex flex-col md:flex-row items-end justify-between z-20 gap-6"
        >
           <div className="flex flex-col w-full md:w-auto">
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black uppercase tracking-tighter leading-[0.8] text-white"
             >
               {productName}
             </motion.h1>
             {productSubtitle && (
               <motion.span
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-sm md:text-lg font-bold text-accent uppercase tracking-[0.3em] mt-4 block"
               >
                 {product.subtitle}
               </motion.span>
             )}
           </div>
           
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col items-end"
           >
             <span className="text-2xl md:text-5xl font-black text-white tracking-tighter">${productPrice}</span>
           </motion.div>
        </motion.div>
      </section>

      {/* 02. PRODUCT DETAILS SECTION */}
      <section className="relative z-30 container max-w-[1500px] mx-auto px-6 py-16 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Side: Content Block */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 flex flex-col gap-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                Built for Everyday Performance
              </h2>
              <p className="text-accent text-lg md:text-2xl font-medium tracking-tight">
                Designed for comfort. Made to last.
              </p>
              <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl whitespace-pre-line">
                {productDesc}
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-white/10">
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] flex items-center justify-center border border-white/5 flex-shrink-0">
                   <Droplets className="text-accent" size={20} />
                 </div>
                 <div>
                   <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">Water-Resistant Fabric</h4>
                   <p className="text-sm text-white/50">Protects against light rain and wind</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] flex items-center justify-center border border-white/5 flex-shrink-0">
                   <Shield className="text-accent" size={20} />
                 </div>
                 <div>
                   <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">Durable Stitching</h4>
                   <p className="text-sm text-white/50">Designed for long-term everyday use</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] flex items-center justify-center border border-white/5 flex-shrink-0">
                   <Layout className="text-accent" size={20} />
                 </div>
                 <div>
                   <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">Comfort Fit</h4>
                   <p className="text-sm text-white/50">Lightweight and easy to wear all day</p>
                 </div>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] flex items-center justify-center border border-white/5 flex-shrink-0">
                   <Package className="text-accent" size={20} />
                 </div>
                 <div>
                   <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">Multiple Pockets</h4>
                   <p className="text-sm text-white/50">Practical storage for daily essentials</p>
                 </div>
               </div>
            </div>

            {/* ENHANCED IMAGE GALLERY SECTION */}
            <div className="pt-12 space-y-6">
              <div className="flex items-end justify-between">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em]">Gallery // Perspective</span>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Click to expand</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {images.slice(1, 5).map((img: string, i: number) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 0.98 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(img)}
                    className="group relative aspect-[4/3] bg-[#1A1A1A] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 cursor-zoom-in shadow-2xl"
                  >
                    <Image 
                      src={img} 
                      alt={`Detail ${i}`} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute bottom-6 right-6 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-500">
                      <Maximize2 size={16} className="text-white" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* DIMENSIONAL BLUEPRINT (SIZE TABLE) */}
            <div className="pt-16 md:pt-24 space-y-8">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em]">Dimensional Archive</span>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">Size Blueprint</h3>
              </div>

              <div className="overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-[#151515] shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-white/[0.03] border-b border-white/5">
                        <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Size</th>
                        <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Chest (In)</th>
                        <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Sleeve (In)</th>
                        <th className="px-6 md:px-10 py-6 md:py-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Length (In)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { s: "S", c: "38-40", sl: "33-34", l: "26.5" },
                        { s: "M", c: "41-43", sl: "34-35", l: "27.5" },
                        { s: "L", c: "44-46", sl: "35-36", l: "28.5" },
                        { s: "XL", c: "47-49", sl: "36-37", l: "29.5" }
                      ].map((row, i) => (
                        <motion.tr 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="group border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="px-6 md:px-10 py-6 md:py-8">
                             <span className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 text-sm font-black group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-500">
                               {row.s}
                             </span>
                          </td>
                          <td className="px-6 md:px-10 py-6 md:py-8 text-sm md:text-base font-bold text-white/80">{row.c}</td>
                          <td className="px-6 md:px-10 py-6 md:py-8 text-sm md:text-base font-bold text-white/80">{row.sl}</td>
                          <td className="px-6 md:px-10 py-6 md:py-8 text-sm md:text-base font-bold text-white/80">{row.l}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                <Ruler className="text-accent" size={20} />
                <p className="text-[10px] md:text-xs text-white/40 font-medium uppercase tracking-widest leading-loose">
                  * All measurements are taken in inches with the garment laid flat. For the most accurate fit, we recommend measuring a jacket you already own.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Action Panel */}
          <div className="lg:col-span-5 relative h-full" id="buy-panel">
            <div className="lg:sticky lg:top-32 h-fit space-y-10 bg-[#1A1A1A] p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl">
              <div className="space-y-4">
                <h2 className="text-3xl font-black uppercase tracking-tight text-white">Select Size</h2>
                <div className="h-[1px] w-full bg-white/10" />
              </div>

              {/* Size Selector */}
              <div className="space-y-6">
                <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-white/40">
                  <span>CHOOSE YOUR FIT</span>
                  <button className="flex items-center gap-2 hover:text-white transition-colors">
                    <Ruler size={14} /> Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {["S", "M", "L", "XL"].map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-16 rounded-2xl border flex items-center justify-center transition-all duration-500 text-lg font-black",
                        selectedSize === size 
                          ? "bg-white text-black border-white shadow-xl scale-105" 
                          : "bg-black/40 border-white/10 text-white/40 hover:border-white/40 hover:text-white"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-8">
                <button 
                  onClick={handleAddToCart}
                  disabled={!selectedSize && !isAdded}
                  className={cn(
                    "w-full h-20 rounded-[2rem] flex items-center justify-center gap-4 text-base font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl",
                    isAdded 
                      ? "bg-green-500 text-white cursor-default" 
                      : !selectedSize 
                        ? "bg-white/5 text-white/20 border border-white/10 cursor-not-allowed"
                        : "bg-accent text-black hover:-translate-y-1 cursor-pointer"
                  )}
                >
                  {isAdded ? (
                    <>Added to Cart <CheckCircle2 size={22} /></>
                  ) : !selectedSize ? (
                    <>Select Size First <AlertCircle size={22} /></>
                  ) : (
                    <>Add to Cart <ShoppingBag size={22} /></>
                  )}
                </button>
                
                {/* Trust Info */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                   <div className="flex items-center gap-4 text-white/60">
                      <CheckCircle2 size={18} className="text-green-500" />
                      <span className="text-sm font-medium">In Stock</span>
                   </div>
                   <div className="flex items-center gap-4 text-white/60">
                      <Clock size={18} className="text-accent" />
                      <span className="text-sm font-medium">Delivery: 2–4 days</span>
                   </div>
                   <div className="flex items-center gap-4 text-white/60">
                      <RotateCcw size={18} className="text-white/40" />
                      <span className="text-sm font-medium">7-day easy exchange</span>
                   </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-12"
            onClick={() => setActiveImage(null)}
          >
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-8 right-8 z-[1001] w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 text-white hover:bg-white hover:text-black transition-colors"
              onClick={() => setActiveImage(null)}
            >
              <X size={24} />
            </motion.button>

            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[1200px] aspect-square md:aspect-video rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={activeImage} 
                alt="Enlarged view" 
                fill 
                className="object-contain md:object-cover" 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY BAR (MOBILE ONLY) */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 md:bottom-6 inset-x-4 md:inset-x-6 z-[100] flex lg:hidden justify-center"
          >
            <div className="w-full max-w-3xl bg-[#EAE8E4]/90 backdrop-blur-3xl border border-black/10 rounded-[1.5rem] md:rounded-[2rem] p-2 md:p-4 flex items-center justify-between shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 md:gap-4 px-2 md:px-4 min-w-0">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                  <Image src={images[0]} alt={productName} fill className="object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                   <span className="text-[10px] md:text-sm font-black uppercase tracking-tight text-[#2D2D2D] truncate w-full max-w-[120px] sm:max-w-[200px]">
                     {productName.split(" ").slice(0, 2).join(" ")}
                   </span>
                   <span className="text-[10px] md:text-sm font-bold text-accent">${productPrice}</span>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={!selectedSize && !isAdded}
                className={cn(
                  "px-4 md:px-8 h-10 md:h-12 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 text-[9px] md:text-xs font-black uppercase tracking-widest transition-all flex-shrink-0 whitespace-nowrap",
                  isAdded 
                    ? "bg-green-500 text-white cursor-default" 
                    : !selectedSize
                      ? "bg-black/5 text-black/20 border border-black/5 cursor-not-allowed"
                      : "bg-[#2D2D2D] text-white hover:bg-black cursor-pointer"
                )}
              >
                <span className="hidden sm:inline">
                  {isAdded ? "Added" : !selectedSize ? "Select Size First" : "Add to Cart"}
                </span>
                <span className="sm:hidden">
                  {isAdded ? "Added" : !selectedSize ? "Select Size" : "Add"}
                </span>
                {isAdded ? (
                  <CheckCircle2 size={14} className="md:size-[16px]" />
                ) : !selectedSize ? (
                  <AlertCircle size={14} className="md:size-[16px]" />
                ) : (
                  <ShoppingBag size={14} className="md:size-[16px]" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 03. RELATED PRODUCTS */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="bg-black py-32 md:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(201,162,39,0.05),transparent_70%)]" />
          
          <div className="container max-w-[1500px] mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-24">
              <div className="space-y-4">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em]">You May Also Like</span>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">The Legacy Collection</h2>
              </div>
              <a href="/shop" className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:text-accent transition-colors border-b border-white/10 pb-2">
                View All Gear
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p: any) => (
                <motion.a 
                  key={p.id}
                  href={`/jacket/${p.slug}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group block"
                >
                  <div className="relative aspect-[4/5] bg-[#111111] rounded-[2rem] overflow-hidden border border-white/5 mb-6">
                    <Image 
                      src={p.images?.[0] || "/assets/placeholder.webp"} 
                      alt={p.name} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" 
                    />
                    <div className="absolute top-6 right-6">
                       <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <ShoppingBag size={16} className="text-white" />
                       </div>
                    </div>
                  </div>
                  <div className="space-y-2 px-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black uppercase tracking-tight text-white group-hover:text-accent transition-colors">
                        {p.name.split(" ").slice(0, 2).join(" ")}
                      </h3>
                      <span className="text-sm font-bold text-white/40">${p.price}</span>
                    </div>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                      {p.category?.name || "Gear"} Archive
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}

      <footer className="py-24 border-t border-white/10 flex flex-col items-center gap-4 bg-black relative z-40">
         <h4 className="text-xl font-black uppercase tracking-tighter">Jacket Junction</h4>
         <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">Premium Everyday Essentials</p>
      </footer>
    </div>
  );
}
