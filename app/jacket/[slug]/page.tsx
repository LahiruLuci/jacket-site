import Navbar from "@/components/layout/Navbar";
import prisma from "@/lib/prisma";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  });

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | Jacket Junction Archives`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white selection:bg-accent selection:text-black font-inter overflow-x-hidden">
      <Navbar />
      
      {/* 
        ProductDetailClient is the "Next Level" interactive product viewer.
        It handles all image carousels, size selection, and cinematic parallax.
      */}
      <ProductDetailClient product={product} />

      {/* Global Footer */}
      <footer className="py-20 bg-black border-t border-white/5 relative z-10">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col gap-4 items-center md:items-start">
             <h4 className="text-xl font-black uppercase tracking-tighter">Jacket Junction</h4>
             <p className="text-[9px] tracking-[0.4em] text-white/20 uppercase font-bold">Archives // 2024 Engineering</p>
          </div>
          <div className="flex gap-12">
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-accent cursor-pointer transition-colors">Operational Terms</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-accent cursor-pointer transition-colors">Secure Logistics</span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-accent cursor-pointer transition-colors">Blueprint Support</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
