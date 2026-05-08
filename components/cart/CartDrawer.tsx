"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  ShieldCheck,
  Truck
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { cn } from "@/lib/utils";

export default function CartDrawer() {
  const { 
    items, 
    isDrawerOpen, 
    closeDrawer, 
    removeItem, 
    increaseQuantity, 
    decreaseQuantity, 
    getCartTotal,
    getCartCount
  } = useCart();

  const total = getCartTotal();
  const count = getCartCount();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#EAE8E4] border-l border-black/5 z-[210] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 flex items-center justify-between border-b border-black/5 bg-white/20 backdrop-blur-3xl sticky top-0 z-20">
              <div className="flex flex-col">
                <span className="text-2xl font-bold uppercase tracking-tighter text-[#2D2D2D]">Your Collection</span>
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest mt-1">
                  {count} {count === 1 ? 'Item' : 'Items'} // <span className="italic font-normal opacity-60 text-[#2D2D2D]">Procured</span>
                </span>
              </div>
              <button 
                onClick={closeDrawer}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 text-[#2D2D2D] transition-all duration-300 border border-black/10 hover:border-black/20 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-black/5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} className="text-black/10" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-widest text-[#2D2D2D]">Your cart is empty</p>
                    <p className="text-xs text-black/40 font-medium">Acquire your first archive piece.</p>
                  </div>
                  <button 
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer"
                  >
                    Continue Shopping <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 group relative pb-8 border-b border-black/5 last:border-0 last:pb-0">
                    {/* Image Container */}
                    <div className="relative w-28 h-36 bg-white rounded-2xl overflow-hidden border border-black/5 flex-shrink-0 shadow-lg">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" 
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
 
                    {/* Details Container */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="text-[9px] font-bold text-accent uppercase tracking-[0.2em] px-2 py-1 bg-accent/5 rounded-md border border-accent/10">Size {item.size}</span>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-black/20 hover:text-red-500 transition-all duration-300 hover:scale-110 cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <h4 className="text-base font-bold uppercase tracking-tight leading-tight text-[#2D2D2D]/80 group-hover:text-[#2D2D2D] transition-colors">
                          {item.name}
                        </h4>
                        {item.subtitle && (
                          <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest italic">
                            {item.subtitle}
                          </p>
                        )}
                      </div>
 
                      {/* Controls & Price */}
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-black/5 shadow-sm">
                          <button 
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-black/40 hover:text-[#2D2D2D] transition-all cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold w-6 text-center text-[#2D2D2D]">{item.quantity}</span>
                          <button 
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/5 text-black/40 hover:text-[#2D2D2D] transition-all cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-base font-bold tracking-tighter text-[#2D2D2D]">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-black/5 bg-[#EAE8E4] space-y-6">
                <div className="space-y-5">
                  <div className="flex justify-between items-end">
                    <span className="text-[11px] font-bold text-black/40 uppercase tracking-[0.3em]">Acquisition Total</span>
                    <span className="text-2xl font-bold tracking-tighter text-[#2D2D2D] leading-none">${total.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-black/[0.03] border border-black/5">
                     <div className="flex items-center gap-3 text-accent">
                        <Truck size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest italic">Complimentary Shipping</span>
                     </div>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  onClick={closeDrawer}
                  className="group w-full h-20 bg-accent text-white rounded-[2rem] flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-[0.2em] hover:-translate-y-1 active:scale-[0.98] transition-all shadow-[0_30px_60px_rgba(176,141,87,0.3)] cursor-pointer"
                >
                  Secure Checkout <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                </Link>

                <div className="flex justify-center pt-2">
                  <button 
                    onClick={closeDrawer}
                    className="text-[11px] font-bold text-black/30 uppercase tracking-[0.3em] hover:text-[#2D2D2D] transition-all duration-300 relative group/btn"
                  >
                    Continue Shopping
                    <div className="absolute -bottom-1 left-0 w-full h-[1px] bg-black/10 origin-right scale-x-0 group-hover/btn:scale-x-100 group-hover/btn:origin-left transition-transform duration-500" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
