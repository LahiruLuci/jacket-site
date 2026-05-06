"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Package, ShieldCheck } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col items-center justify-center px-6 pt-24 text-center">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", damping: 20 }}
        className="max-w-xl space-y-10"
      >
        <div className="relative inline-block">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-32 h-32 bg-accent rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(201,162,39,0.5)]"
          >
            <CheckCircle2 size={64} className="text-black" />
          </motion.div>
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center animate-bounce">
             <ShieldCheck size={20} className="text-accent" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Order <span className="text-accent">Confirmed.</span></h1>
          <p className="text-white/40 font-light max-w-md mx-auto">
            Your acquisition manifest has been validated. Our logistics team is now preparing your archive for dispatch.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-4">
           <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Tracking ID</p>
           <p className="text-xl font-mono font-black text-white">{orderId || "ARCHIVE-ORD-XXXX"}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
           <Link 
            href="/shop"
            className="group inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-black uppercase tracking-widest hover:bg-accent transition-all cursor-pointer"
           >
            Back to Shop <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
           </Link>
           <Link 
            href="/"
            className="inline-flex items-center gap-3 text-white/40 hover:text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest transition-colors cursor-pointer"
           >
            Home
           </Link>
        </div>

        <div className="pt-12 flex items-center justify-center gap-8 text-white/20">
           <div className="flex items-center gap-2">
              <Package size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Insured Delivery</span>
           </div>
           <div className="w-1 h-1 bg-white/10 rounded-full" />
           <div className="flex items-center gap-2">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Genuine Archive</span>
           </div>
        </div>
      </motion.div>
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
