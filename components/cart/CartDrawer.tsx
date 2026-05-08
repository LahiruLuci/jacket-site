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
            className="fixed top-0 right-0 h-full w-full max-w-[450px] bg-[#0B0B0B] border-l border-white/10 z-[210] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-8 flex items-center justify-between border-b border-white/5 bg-[#0B0B0B]/80 backdrop-blur-xl">
              <div className="flex flex-col">
                <span className="text-xl font-black uppercase tracking-tighter">Your Collection</span>
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{count} Items // Procured</span>
              </div>
              <button 
                onClick={closeDrawer}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                    <ShoppingBag size={32} className="text-white/20" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-black uppercase tracking-widest">Your cart is empty</p>
                    <p className="text-xs text-white/40 font-medium">Acquire your first archive piece.</p>
                  </div>
                  <button 
                    onClick={closeDrawer}
                    className="inline-flex items-center gap-2 bg-accent text-black px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform cursor-pointer"
                  >
                    Continue Shopping <ArrowRight size={14} />
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-6 group">
                    {/* Image */}
                    <div className="relative w-24 h-32 bg-[#111111] rounded-2xl overflow-hidden border border-white/5 flex-shrink-0">
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="space-y-1">
                        <div className="flex justify-between items-start">
                          <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Size {item.size}</p>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-white/20 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-tight leading-tight">{item.name}</h4>
                        {item.subtitle && <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">{item.subtitle}</p>}
                      </div>

                      {/* Controls & Price */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                        <div className="flex items-center gap-3 bg-white/5 p-1 rounded-xl border border-white/5 self-start">
                          <button 
                            onClick={() => decreaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => increaseQuantity(item.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="text-sm font-black tracking-tight">${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-[#0B0B0B] space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-white/40 uppercase tracking-widest">
                    <span>Acquisition Total</span>
                    <span className="text-white text-base font-black tracking-tighter">${total.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/20">
                     <div className="flex items-center gap-2">
                        <Truck size={14} />
                        <span className="text-[9px] font-bold uppercase tracking-widest italic">Complimentary Shipping</span>
                     </div>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  onClick={closeDrawer}
                  className="group w-full h-16 bg-accent text-black rounded-full flex items-center justify-center gap-4 text-sm font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(201,162,39,0.3)] cursor-pointer"
                >
                  Secure Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <div className="flex justify-center">
                  <button 
                    onClick={closeDrawer}
                    className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em] hover:text-white transition-colors cursor-pointer"
                  >
                    Continue Shopping
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
