"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShoppingBag, Home, ArrowRight, Package, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col items-center justify-center px-6 pt-24 text-center relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full space-y-12 relative z-10"
      >
        {/* Success Icon */}
        <div className="relative inline-block">
          <motion.div 
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", damping: 15 }}
            className="w-24 h-24 md:w-32 md:h-32 bg-accent rounded-full flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(201,162,39,0.4)]"
          >
            <CheckCircle2 size={48} className="text-black md:hidden" />
            <CheckCircle2 size={64} className="text-black hidden md:block" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute -bottom-2 -right-2 bg-[#1A1A1A] border border-white/10 px-4 py-2 rounded-full shadow-2xl"
          >
             <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Validated</span>
             </div>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            Order Placed <br />
            <span className="text-accent">Successfully.</span>
          </h1>
          
          <div className="space-y-4 max-w-md mx-auto">
            <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
              Your archive acquisition has been recorded. Our specialist team will contact you soon via phone or email to confirm your dispatch details.
            </p>
            
            <AnimatePresence>
              {orderId && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 mt-8"
                >
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-2">Manifest Reference</p>
                  <p className="text-sm md:text-lg font-mono font-black text-white break-all">{orderId}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
           <Link 
            href="/shop"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-white text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-accent transition-all duration-500 cursor-pointer"
           >
            Continue Shopping <ShoppingBag size={20} className="group-hover:-translate-y-1 transition-transform" />
           </Link>
           
           <Link 
            href="/"
            className="group w-full sm:w-auto flex items-center justify-center gap-3 bg-transparent text-white border border-white/10 px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white/5 transition-all duration-500 cursor-pointer"
           >
            Back to Home <Home size={20} />
           </Link>
        </div>

        {/* Brand Values */}
        <div className="pt-16 grid grid-cols-2 md:grid-cols-2 gap-8 max-w-lg mx-auto">
           <div className="flex flex-col items-center gap-3 text-white/20">
              <Package size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Insured Logistics</span>
           </div>
           <div className="flex flex-col items-center gap-3 text-white/20">
              <ShieldCheck size={20} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Archive Quality</span>
           </div>
        </div>
      </motion.div>

      {/* Side Label */}
      <div className="hidden lg:block absolute left-12 bottom-12 text-[10px] font-bold uppercase tracking-[0.8em] text-white/10 [writing-mode:vertical-lr] rotate-180">
        Jacket Junction Archive Manifest // MMXXIV
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
