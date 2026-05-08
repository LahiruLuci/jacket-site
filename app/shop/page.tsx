import Navbar from "@/components/layout/Navbar";
import prisma from "@/lib/prisma";
import ShopClient from "@/components/shop/ShopClient";
import { AlertCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | Jacket Junction Archives",
  description: "Equip yourself with the latest in ballistic protection and mechanical layers. Browse our race, touring, and urban series.",
};
export const dynamic = 'force-dynamic';

export default async function ShopPage() {
  try {
    // Fetch products and categories from the database
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const categories = await prisma.category.findMany();

    return (
      <main className="min-h-screen bg-[#F5F5F3] text-[#111111] selection:bg-accent selection:text-white font-inter overflow-x-hidden">
        <Navbar />
        
        <ShopClient initialProducts={products} categories={categories} />

        {/* Footer Mini */}
        <footer className="py-16 bg-white border-t border-black/5 mt-auto">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-8 px-6">
            <p className="text-[10px] tracking-[0.4em] text-black/20 uppercase font-bold">Jacket Junction Archives // 2024</p>
            <div className="flex gap-12">
              <span className="text-[10px] tracking-[0.2em] uppercase text-black/40 hover:text-black cursor-pointer transition-colors">Privacy</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-black/40 hover:text-black cursor-pointer transition-colors">Shipping</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-black/40 hover:text-black cursor-pointer transition-colors">Terms</span>
            </div>
          </div>
        </footer>
      </main>
    );
  } catch (error) {
    console.error("Database Connection Error:", error);
    return (
      <main className="min-h-screen bg-[#F5F5F3] text-[#111111] flex flex-col items-center justify-center p-8 text-center pt-32">
        <Navbar />
        <div className="max-w-md">
          <div className="w-20 h-20 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertCircle size={40} className="text-black/20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6">Service <span className="text-accent">Maintenance.</span></h1>
          <p className="text-black/40 text-sm md:text-base leading-relaxed mb-10">
            Our archives are currently undergoing a scheduled synchronization. We'll be back online shortly to provide your premium utility gear.
          </p>
          <div className="p-8 bg-white rounded-3xl border border-black/5 text-left shadow-xl">
            <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-6">Technical Status:</p>
            <ul className="text-[11px] text-black/60 space-y-4 list-none">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1 shrink-0" /> 
                <span>Verify <code className="bg-black/5 px-2 py-0.5 rounded text-black">DATABASE_URL</code> in environment configuration.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1 shrink-0" /> 
                <span>Ensure local schema is synchronized with <code className="bg-black/5 px-2 py-0.5 rounded text-black">prisma db push</code>.</span>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1 shrink-0" /> 
                <span>Initialize primary inventory with <code className="bg-black/5 px-2 py-0.5 rounded text-black">prisma/seed.js</code>.</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    );
  }
}
