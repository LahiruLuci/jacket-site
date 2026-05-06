"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Minus, 
  Plus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  RotateCcw 
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";

export default function CartPage() {
  const { 
    items, 
    removeItem, 
    increaseQuantity, 
    decreaseQuantity, 
    getCartTotal, 
    getCartCount 
  } = useCart();

  const subtotal = getCartTotal();
  const shipping = 0; // Free for premium
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col items-center justify-center px-6 pt-24">
        <Navbar />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8"
        >
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
            <ShoppingBag size={40} className="text-white/20" />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Your Bag is Empty</h1>
            <p className="text-white/40 max-w-md mx-auto font-light">
              It seems you haven't added any gear to your collection yet. Discovery awaits in the archives.
            </p>
          </div>
          <Link 
            href="/shop"
            className="inline-flex items-center gap-3 bg-accent text-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer"
          >
            Start Shopping <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pt-24 md:pt-32 pb-24 px-4 md:px-6 relative overflow-x-hidden">
      <Navbar />
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 md:mb-24">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em]">The Procurement Bag</span>
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none break-words">
              Your <span className="text-white/20">Collection.</span>
            </h1>
          </div>
          <div className="flex items-center gap-4 text-white/40 font-mono text-sm uppercase tracking-widest">
            <span>{getCartCount()} items</span>
            <div className="w-12 h-[1px] bg-white/10" />
            <span>Archives // MMXXIV</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-12">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-white/5 pb-12 group"
                >
                  {/* Image */}
                  <div className="md:col-span-3">
                    <Link href={`/jacket/${item.slug}`} className="block relative aspect-[4/5] bg-[#111111] rounded-3xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-colors">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                    </Link>
                  </div>

                  {/* Info */}
                  <div className="md:col-span-4 space-y-2">
                    <span className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Premium Archive</span>
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight group-hover:text-accent transition-colors leading-tight">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-4">
                       <span className="px-3 py-1 bg-white/5 rounded-full border border-white/10 text-[10px] font-bold uppercase tracking-widest">
                         Size: {item.size}
                       </span>
                    </div>
                  </div>

                  {/* Quantity & Price */}
                  <div className="md:col-span-5 flex flex-row md:flex-col lg:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-6 bg-white/5 p-2 rounded-2xl border border-white/10">
                      <button 
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-lg font-black w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => increaseQuantity(item.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Subtotal</span>
                      <span className="text-2xl font-black">${(item.price * item.quantity).toLocaleString()}</span>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="mt-4 flex items-center gap-2 text-[10px] font-bold text-red-500/50 hover:text-red-500 transition-colors uppercase tracking-widest cursor-pointer"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
            <div className="bg-[#111111] border border-white/10 rounded-[3rem] p-10 md:p-12 space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />
               
               <h2 className="text-3xl font-black uppercase tracking-tighter">Order Summary</h2>

               <div className="space-y-6">
                 <div className="flex justify-between items-center text-sm font-bold text-white/40 uppercase tracking-widest">
                   <span>Subtotal</span>
                   <span className="text-white">${subtotal.toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm font-bold text-white/40 uppercase tracking-widest">
                   <span>Shipping</span>
                   <span className="text-accent italic">Complimentary</span>
                 </div>
                 <div className="h-[1px] bg-white/5 w-full" />
                 <div className="flex justify-between items-end">
                   <div className="flex flex-col">
                     <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Total Amount</span>
                     <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                       ${total.toLocaleString()}
                     </span>
                   </div>
                 </div>
               </div>

               <Link 
                 href="/checkout"
                 className="group w-full h-16 md:h-20 bg-accent text-black rounded-full flex items-center justify-center gap-4 text-sm md:text-base font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(201,162,39,0.3)] cursor-pointer"
               >
                 Secure Checkout <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </Link>

               {/* Trust Badges */}
               <div className="grid grid-cols-1 gap-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-3 text-white/40 group hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/30 transition-colors">
                      <ShieldCheck size={14} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Encrypted Secure Payment</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/40 group hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/30 transition-colors">
                      <Truck size={14} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Insured Global Logistics</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/40 group hover:text-white transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-accent/30 transition-colors">
                      <RotateCcw size={14} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest leading-none">Seamless 7-Day Exchange</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
