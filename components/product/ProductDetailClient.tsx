"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { 
  ShoppingBag, 
  Ruler, 
  Droplets,
  Shield,
  Layout,
  Package,
  ChevronDown,
  CheckCircle2,
  Clock,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductDetailClientProps {
  product: any;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Safety checks
  const productName = product?.name || "Premium Jacket";
  const productPrice = product?.price || 0;
  const productDesc = product?.description || "This jacket is built for daily wear with durable, water-resistant fabric and a comfortable fit that adapts to your movement.";
  
  const { scrollY } = useScroll();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsubscribe = scrollY.onChange((latest) => {
      setShowStickyBar(latest > 800);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Desktop Only Parallax Values
  const imageScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const contentOpacity = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.05, 0.2], [50, 0]);

  const images = product?.images && product.images.length > 0 
    ? product.images 
    : ["/assets/placeholder.webp"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      document.getElementById('buy-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div ref={containerRef} className="bg-[#0B0B0B] text-white min-h-[200vh] selection:bg-accent selection:text-black font-inter overflow-x-hidden">
      
      {/* 01. THE IMMERSIVE HERO */}
      <section className="relative lg:sticky lg:top-0 h-[80vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-accent/10 rounded-full blur-[160px] opacity-40" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0B0B0B_85%)]" />
        </div>

        {/* Massive Background Typography */}
        <motion.div 
          style={{ y: bgTextY } as any}
          className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none whitespace-nowrap hidden lg:flex"
        >
          <h2 className="text-[18vw] font-black uppercase tracking-tighter text-white/[0.03] leading-none select-none">
            {productName.split(" ").slice(0, 2).join(" ")}
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

        <div className="absolute bottom-12 md:bottom-20 inset-x-8 md:inset-x-24 flex flex-col md:flex-row items-end justify-between z-20 gap-6">
           <div className="flex flex-col w-full md:w-auto">
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black uppercase tracking-tighter leading-[0.8] text-white"
             >
               {productName.split(" ").slice(0, 2).join(" ")}
             </motion.h1>
           </div>
           
           <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="flex flex-col items-end"
           >
             <span className="text-2xl md:text-5xl font-black text-white tracking-tighter">${productPrice}</span>
           </motion.div>
        </div>
      </section>

      {/* 02. PRODUCT DETAILS SECTION */}
      <section className="relative z-30 container max-w-[1500px] mx-auto px-6 py-16 md:py-32">
        <motion.div 
          style={{ 
            y: mounted && typeof window !== 'undefined' && window.innerWidth > 1024 ? contentY : 0 
          } as any}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24"
        >
          
          {/* Left Side: Content Block */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
                Built for Everyday Performance
              </h2>
              <p className="text-accent text-lg md:text-2xl font-medium tracking-tight">
                Designed for comfort. Made to last.
              </p>
              <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                {productDesc}
                <br /><br />
                Crafted for durability and designed to adapt to your daily movement, this piece offers reliable protection and timeless style.
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

            {/* Gallery Preview */}
            <div className="grid grid-cols-2 gap-4 pt-12">
              {images.slice(1, 3).map((img: string, i: number) => (
                <div key={i} className="relative aspect-[4/3] bg-[#1A1A1A] rounded-[2rem] overflow-hidden border border-white/5">
                  <Image src={img} alt="Detail" fill className="object-cover opacity-80" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Action Panel */}
          <div className="lg:col-span-5 relative" id="buy-panel">
            <div className="lg:sticky lg:top-32 space-y-10 bg-[#1A1A1A] p-10 md:p-14 rounded-[3rem] border border-white/10 shadow-2xl">
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
                  className={cn(
                    "w-full h-20 rounded-[2rem] flex items-center justify-center gap-4 text-base font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl",
                    isAdded 
                      ? "bg-green-500 text-white" 
                      : selectedSize 
                        ? "bg-accent text-black hover:-translate-y-1" 
                        : "bg-white text-black opacity-90 hover:bg-white/100"
                  )}
                >
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                  <ShoppingBag size={22} />
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
        </motion.div>
      </section>

      {/* STICKY BAR */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 md:bottom-6 inset-x-4 md:inset-x-6 z-[100] flex justify-center"
          >
            <div className="w-full max-w-3xl bg-[#1A1A1A]/90 backdrop-blur-3xl border border-white/20 rounded-[1.5rem] md:rounded-[2rem] p-2 md:p-4 flex items-center justify-between shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 md:gap-4 px-2 md:px-4 min-w-0">
                <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
                  <Image src={images[0]} alt={productName} fill className="object-cover" />
                </div>
                <div className="flex flex-col min-w-0">
                   <span className="text-[10px] md:text-sm font-black uppercase tracking-tight text-white truncate w-full max-w-[120px] sm:max-w-[200px]">
                     {productName.split(" ").slice(0, 2).join(" ")}
                   </span>
                   <span className="text-[10px] md:text-sm font-bold text-accent">${productPrice}</span>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className={cn(
                  "px-4 md:px-8 h-10 md:h-12 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 text-[9px] md:text-xs font-black uppercase tracking-widest transition-all flex-shrink-0 whitespace-nowrap",
                  isAdded ? "bg-green-500 text-white" : "bg-white text-black hover:bg-accent"
                )}
              >
                <span className="hidden sm:inline">{isAdded ? "Added" : "Add to Cart"}</span>
                <span className="sm:hidden">{isAdded ? "Added" : "Add"}</span>
                <ShoppingBag size={14} className="md:size-[16px]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-24 border-t border-white/10 flex flex-col items-center gap-4 bg-black relative z-40">
         <h4 className="text-xl font-black uppercase tracking-tighter">Jacket Junction</h4>
         <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-bold">Premium Everyday Essentials</p>
      </footer>
    </div>
  );
}
