import Navbar from "@/components/layout/Navbar";
import prisma from "@/lib/prisma";
import ShopClient from "@/components/shop/ShopClient";
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
      <main className="min-h-screen bg-[#0B0B0B] text-white selection:bg-accent selection:text-black font-inter overflow-x-hidden">
        <Navbar />
        
        <ShopClient initialProducts={products} categories={categories} />

        {/* Footer Mini */}
        <footer className="py-12 bg-black border-t border-white/5 mt-auto">
          <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-[8px] tracking-[0.5em] text-white/20 uppercase font-bold">Archives // 2024 Edition</p>
            <div className="flex gap-8">
              <span className="text-[8px] tracking-[0.3em] uppercase text-white/40">Privacy Policy</span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-white/40">Global Dispatch</span>
            </div>
          </div>
        </footer>
      </main>
    );
  } catch (error) {
    console.error("Database Connection Error:", error);
    return (
      <main className="min-h-screen bg-[#0B0B0B] text-white flex flex-col items-center justify-center p-8 text-center min-h-screen pt-32">
        <Navbar />
        <div className="max-w-md">
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">System <span className="text-accent">Offline.</span></h1>
          <p className="text-white/40 text-sm md:text-lg leading-relaxed mb-8">
            The Armory database is currently disconnected. We are unable to initialize the kinetic inventory at this moment.
          </p>
          <div className="flex flex-col gap-4">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4">Connection Required:</p>
              <ul className="text-[11px] text-white/60 space-y-3 list-none">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" /> 
                  Add Neon <code className="text-white font-mono">DATABASE_URL</code> to .env
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" /> 
                  Run <code className="text-white font-mono">npx prisma db push</code>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full" /> 
                  Run <code className="text-white font-mono">node prisma/seed.js</code>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
