"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Ruler, 
  Droplets,
  Shield,
  CheckCircle2,
  RotateCcw,
  X,
  Maximize2,
  AlertCircle,
  Star,
  ShieldCheck,
  Truck,
  Mail
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
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const { addItem, openDrawer } = useCart();

  // Safety checks
  const productName = product?.name || "Premium Jacket";
  const productPrice = product?.price || 0;
  const productSubtitle = product?.subtitle || "All-Weather Jacket";
  
  // Ensure images is always an array of strings
  const rawImages: string[] = product?.images && product.images.length > 0 
    ? product.images 
    : ["/assets/placeholder.webp"];

  // Create gallery array (virtual crops if only one image)
  const galleryImages: string[] = rawImages.length > 1 ? rawImages : [rawImages[0], rawImages[0], rawImages[0]];

  const handleAddToCart = () => {
    if (!selectedSize) return;
    
    addItem(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      openDrawer();
    }, 1500);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="bg-[#F5F5F3] text-[#111111] min-h-screen selection:bg-accent selection:text-white font-inter">
      
      {/* PURCHASE SECTION */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24">
        <div className="container max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* LEFT: IMAGE GALLERY */}
            <div className="space-y-6">
              <div 
                className="relative aspect-square md:aspect-[4/5] bg-white rounded-3xl overflow-hidden cursor-zoom-in border border-black/5 group shadow-sm"
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <Image 
                  src={galleryImages[activeImageIndex]} 
                  alt={productName} 
                  fill 
                  className={cn(
                    "object-cover transition-transform duration-500 ease-out",
                    isZoomed ? "scale-[2]" : "scale-100"
                  )}
                  style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                  priority
                />
                {!isZoomed && (
                   <div className="absolute bottom-6 right-6 p-3 rounded-full bg-white/80 backdrop-blur-md border border-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 size={16} className="text-[#111111]" />
                   </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {galleryImages.map((img: string, i: number) => (
                  <button 
                    key={`thumb-${i}`}
                    onClick={() => setActiveImageIndex(i)}
                    className={cn(
                      "relative w-20 h-24 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer",
                      activeImageIndex === i ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
                    )}
                  >
                    <Image src={img} alt={`Thumbnail ${i}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: PURCHASE INFO */}
            <div className="flex flex-col h-full py-2">
              <div className="mb-10">
                <div className="flex flex-col gap-2 mb-4">
                  <span className="text-xs md:text-sm font-bold text-accent uppercase tracking-[0.3em]">{productSubtitle}</span>
                  <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-[1.1]">
                    {productName}
                  </h1>
                </div>
                <div className="flex items-center gap-4">
                   <span className="text-2xl md:text-3xl font-bold tracking-tighter">${productPrice}</span>
                   <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={`star-${i}`} size={12} className="fill-accent text-accent" />
                      ))}
                      <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest ml-2">12 Reviews</span>
                   </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-6 mb-10">
                <div className="flex justify-between items-center">
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-black/40">Select Size</h3>
                  <button 
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black hover:text-accent transition-colors cursor-pointer"
                  >
                    <Ruler size={14} /> Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {["S", "M", "L", "XL"].map(size => (
                    <button 
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-14 rounded-2xl border flex items-center justify-center transition-all duration-300 text-sm font-black cursor-pointer",
                        selectedSize === size 
                          ? "bg-accent text-white border-accent shadow-lg shadow-accent/20" 
                          : "bg-white border-black/5 text-black hover:border-accent hover:text-accent"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart */}
              <div className="space-y-6 mb-12">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "w-full h-14 md:h-16 rounded-full flex items-center justify-center gap-4 text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-xl cursor-pointer",
                    isAdded 
                      ? "bg-green-600 text-white cursor-default" 
                      : !selectedSize 
                        ? "bg-black/5 text-black/20 border border-black/5"
                        : "bg-[#111111] text-white hover:bg-accent"
                  )}
                >
                  {isAdded ? (
                    <>Added to Cart <CheckCircle2 size={18} /></>
                  ) : !selectedSize ? (
                    <>Please Select a Size <AlertCircle size={18} /></>
                  ) : (
                    <>Add to Cart <ShoppingBag size={18} /></>
                  )}
                </button>

                {/* Trust Row */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 pt-6 border-t border-black/5">
                   <div className="flex items-center gap-3 text-black/60">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">In Stock</span>
                   </div>
                   <div className="flex items-center gap-3 text-black/60">
                      <Truck size={16} className="text-accent" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Delivery in 2–4 days</span>
                   </div>
                   <div className="flex items-center gap-3 text-black/60">
                      <RotateCcw size={16} className="text-black/40" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">7-Day Size Exchange</span>
                   </div>
                   <div className="flex items-center gap-3 text-black/60">
                      <ShieldCheck size={16} className="text-accent" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Secure Checkout</span>
                   </div>
                </div>
              </div>

              {/* Product Brief */}
              <div className="space-y-8">
                <div className="bg-[#EFEDE8] p-8 rounded-3xl border border-black/5">
                   <h4 className="text-[10px] font-black uppercase tracking-widest text-accent mb-4">Product Brief</h4>
                   <p className="text-sm font-light leading-relaxed text-black/70">
                     Built for daily wear, the {productName} combines a clean modern look with practical protection. Its water-resistant outer layer helps protect against light rain and wind, while the lightweight construction keeps it comfortable for everyday use.
                   </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIFICATIONS */}
      <section className="py-24 bg-white">
        <div className="container max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-16">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Full Specifications</h2>
                <p className="text-base text-black/60 leading-relaxed font-light">
                  {product?.description || "The epitome of technical outerwear, designed for those who demand both form and function. Every stitch is engineered for durability, and every detail is refined for a modern, high-end aesthetic."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                   <h4 className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2">
                     <Shield size={16} /> Key Features
                   </h4>
                   <ul className="space-y-3">
                      {["Water-resistant outer layer", "Lightweight daily comfort", "Durable stitching", "Practical pocket design"].map(item => (
                        <li key={item} className="flex items-center gap-3 text-sm text-black/70">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" /> {item}
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="space-y-4">
                   <h4 className="text-xs font-black uppercase tracking-widest text-accent flex items-center gap-2">
                     <Droplets size={16} /> Material & Care
                   </h4>
                   <div className="space-y-2">
                      <p className="text-sm text-black/70 font-medium">Material: Durable polyester blend</p>
                      <p className="text-sm text-black/70">Care: Machine wash cold, do not bleach, hang dry</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F5F3] p-10 md:p-14 rounded-[2.5rem] border border-black/5 h-fit">
               <h4 className="text-xl font-black uppercase tracking-tighter mb-10">Delivery & Returns</h4>
               <div className="space-y-8">
                  <div className="flex flex-col gap-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Standard Delivery</span>
                     <p className="text-sm font-bold">2–4 working days via premium courier partners.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                     <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Easy Exchange</span>
                     <p className="text-sm font-bold">7-day size exchange available for all archival pieces.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONFIDENCE */}
      <section className="py-20 bg-[#EFEDE8]">
        <div className="container max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
             {[
               { icon: ShieldCheck, title: "Quality Checked", desc: "Before every delivery" },
               { icon: RotateCcw, title: "Easy Exchange", desc: "Hassle-free size swaps" },
               { icon: CheckCircle2, title: "Secure Checkout", desc: "Encrypted payments" },
               { icon: Mail, title: "Expert Support", desc: "Available for your gear" }
             ].map((item, i) => (
               <div key={`trust-${i}`} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-black/5 shadow-sm">
                    <item.icon size={20} className="text-accent" />
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-[10px] font-black uppercase tracking-widest">{item.title}</h5>
                    <p className="text-[9px] text-black/40 font-bold uppercase tracking-widest">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* SIZE GUIDE MODAL */}
      <AnimatePresence>
        {isSizeGuideOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-xl p-6" onClick={() => setIsSizeGuideOpen(false)}>
             <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-[600px] bg-white rounded-[2.5rem] p-10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
               <button onClick={() => setIsSizeGuideOpen(false)} className="absolute top-8 right-8 cursor-pointer hover:rotate-90 transition-transform"><X size={24}/></button>
               <div className="space-y-8">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Archives Fit Guide</h2>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-black/5">
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-black/40">Size</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-black/40">Chest</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-black/40">Sleeve</th>
                        <th className="py-4 text-[10px] font-black uppercase tracking-widest text-black/40">Length</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm font-medium">
                      {[{ s: "S", c: "38-40", sl: "33", l: "26" }, { s: "M", c: "41-43", sl: "34", l: "27" }, { s: "L", c: "44-46", sl: "35", l: "28" }, { s: "XL", c: "47-49", sl: "36", l: "29" }].map((row, i) => (
                        <tr key={`size-${i}`} className="border-b border-black/[0.03] last:border-0">
                          <td className="py-5 font-black">{row.s}</td>
                          <td className="py-5 text-black/60">{row.c}"</td>
                          <td className="py-5 text-black/60">{row.sl}"</td>
                          <td className="py-5 text-black/60">{row.l}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
