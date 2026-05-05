"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Plus, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const featuredProducts = [
  {
    id: "shadow-black",
    slug: "shadow-guard-all-weather-performance-jacket",
    name: "Shadow Guard All-Weather Performance Jacket",
    price: 599,
    image: "/assets/black-jacket/black-jacket.webp",
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Urban Series"
  },
  {
    id: "interceptor-nv",
    slug: "navy-guard-water-resistant-utility-jacket",
    name: "Navy Guard Water-Resistant Utility Jacket",
    price: 799,
    image: "/assets/navy-blue-jacket/navy-blue-jacket.webp",
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Elite Series"
  },
  {
    id: "vanguard-titan",
    slug: "vanguard-titan-racing",
    name: "Vanguard Titan Racing",
    price: 1450,
    image: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
    sizes: ["S", "M", "L", "XL"],
    category: "Race Series"
  },
  {
    id: "stealth-commuter",
    slug: "stealth-commuter-shell",
    name: "Stealth Commuter Shell",
    price: 850,
    image: "/assets/derneuemann-jacket-2821961_1920.webp",
    sizes: ["M", "L", "XL"],
    category: "Urban"
  },
  {
    id: "apex-kinetic",
    slug: "apex-kinetic-armor",
    name: "Apex Kinetic Armor",
    price: 1200,
    image: "/assets/image (1).webp",
    sizes: ["S", "M", "L", "XL"],
    category: "Race Series"
  },
  {
    id: "heritage-cafe",
    slug: "heritage-cafe-racer",
    name: "Heritage Cafe Racer",
    price: 950,
    image: "/assets/peterlesliemorris-motorcycle-1829461_1920.webp",
    sizes: ["S", "M", "L"],
    category: "Heritage"
  },
  {
    id: "velocity-air",
    slug: "velocity-air-mesh",
    name: "Velocity Air Mesh",
    price: 600,
    image: "/assets/splitshire-biker-407123_1920.webp",
    sizes: ["S", "M", "L", "XL"],
    category: "Urban"
  },
  {
    id: "nomad-goretex",
    slug: "nomad-gore-tex-pro",
    name: "Nomad Gore-Tex Pro",
    price: 1100,
    image: "/assets/stocksnap-dark-2598357_1920.webp",
    sizes: ["M", "L", "XL"],
    category: "Touring"
  }
];

interface ProductType {
  id: string;
  slug: string;
  name: string;
  price: number;
  image?: string;
  images?: string[];
  sizes?: string[];
  category?: any;
  categoryName?: string;
}

interface FeaturedProductsGridProps {
  products?: ProductType[];
}

const FeaturedProductsGrid = ({ products }: FeaturedProductsGridProps) => {
  const displayProducts = products && products.length > 0 ? products : featuredProducts;

  return (
    <section className="bg-[#0B0B0B] py-24 md:py-32 px-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-accent">
              Curated Selection
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4"
          >
            Featured <span className="text-stroke text-white/10" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>Products.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 text-sm md:text-base font-light max-w-lg"
          >
            Top picks built for performance and style. Engineered for the ride, styled for the lifestyle.
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-y-20">
          {displayProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ product, index }: { product: ProductType; index: number }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedSize) return;
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Handle differences between DB schema and hardcoded data
  const productImage = product.image || (product.images && product.images[0]) || "/assets/placeholder.webp";
  const productSizes = product.sizes || ["S", "M", "L", "XL"];
  const categoryName = product.category || (product.category && product.category.name) || "Jacket";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col h-full bg-[#111111] border border-white/5 rounded-3xl overflow-hidden transition-all duration-500 hover:border-white/20 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#161718]">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
        
        {/* Quick Actions (Floating) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 lg:group-hover:opacity-100 transition-all duration-500 translate-x-4 lg:group-hover:translate-x-0">
          <Link 
            href={`/jacket/${product.slug}`}
            className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-black transition-all"
          >
            <Eye size={18} />
          </Link>
        </div>

        {/* Size Selection HUD (Visible on hover or mobile) */}
        <div className="absolute inset-x-4 bottom-4 z-20">
          <div className="flex flex-col gap-3 opacity-100 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500">
            {/* Added Label for clarity */}
            <div className="flex justify-center">
              <span className="text-[8px] font-black tracking-[0.2em] text-white/60 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/5">
                SELECT SIZE
              </span>
            </div>

            <div className="flex gap-2 justify-center">
              {productSizes.map((size: string) => (
                <button
                  key={size}
                  onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                  className={cn(
                    "w-9 h-9 md:w-11 md:h-11 rounded-full border text-[10px] md:text-xs font-bold transition-all flex items-center justify-center relative overflow-hidden cursor-pointer",
                    selectedSize === size 
                      ? "bg-accent border-accent text-black scale-110 shadow-[0_0_15px_rgba(201,162,39,0.5)]" 
                      : "bg-black/60 border-white/20 text-white hover:border-white/50 backdrop-blur-md"
                  )}
                >
                  {size}
                  {selectedSize === size && (
                    <motion.div 
                      layoutId={`active-size-${product.id}`}
                      className="absolute inset-0 bg-accent/20 animate-pulse"
                    />
                  )}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className={cn(
                "w-full py-3 md:py-4 rounded-xl flex items-center justify-center gap-3 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all duration-300 cursor-pointer",
                isAdded 
                  ? "bg-green-500 text-white" 
                  : selectedSize 
                    ? "bg-white text-black hover:bg-accent" 
                    : "bg-white/10 text-white/30 cursor-not-allowed border border-white/5 backdrop-blur-md"
              )}
            >
              {isAdded ? (
                <>Added <Check size={16} /></>
              ) : selectedSize ? (
                <>Add to Cart <Plus size={16} /></>
              ) : (
                <>Select Size to Add <Plus size={16} /></>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[9px] font-bold text-accent uppercase tracking-widest block mb-2">{categoryName}</span>
            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-none text-white group-hover:text-accent transition-colors flex flex-col gap-1">
              <span>{product.name.split(" ").slice(0, 2).join(" ")}</span>
              <span className="text-sm md:text-base font-light text-white/50 lowercase italic tracking-wide">
                {product.name.split(" ").slice(2).join(" ")}
              </span>
            </h3>
          </div>
          <span className="text-lg md:text-xl font-black text-white">${product.price}</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
          <Link 
            href={`/jacket/${product.slug}`}
            className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
          >
            View Details
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Available Now</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProductsGrid;
