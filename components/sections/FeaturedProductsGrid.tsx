"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Plus, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";

const featuredProducts = [
  {
    id: "shadow-black",
    slug: "shadow-guard-all-weather-performance-jacket",
    name: "Shadow Guard",
    subtitle: "All-Weather Jacket",
    price: 599,
    image: "/assets/black-jacket/black-jacket.webp",
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Urban Series"
  },
  {
    id: "interceptor-nv",
    slug: "navy-guard-water-resistant-utility-jacket",
    name: "Navy Guard",
    subtitle: "Utility Jacket",
    price: 799,
    image: "/assets/navy-blue-jacket/navy-blue-jacket.webp",
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "Elite Series"
  },
  {
    id: "junction-titan",
    slug: "junction-titan-racing",
    name: "Junction Titan",
    subtitle: "Racing Grade",
    price: 1450,
    image: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
    sizes: ["S", "M", "L", "XL"],
    category: "Race Series"
  },
  {
    id: "stealth-commuter",
    slug: "stealth-commuter-shell",
    name: "Stealth Commuter",
    subtitle: "City Shell",
    price: 850,
    image: "/assets/derneuemann-jacket-2821961_1920.webp",
    sizes: ["M", "L", "XL"],
    category: "Urban"
  },
  {
    id: "apex-kinetic",
    slug: "apex-kinetic-armor",
    name: "Apex Kinetic",
    subtitle: "Kinetic Armor",
    price: 1200,
    image: "/assets/image (1).webp",
    sizes: ["S", "M", "L", "XL"],
    category: "Race Series"
  },
  {
    id: "heritage-cafe",
    slug: "heritage-cafe-racer",
    name: "Heritage Cafe",
    subtitle: "Classic Leather",
    price: 950,
    image: "/assets/peterlesliemorris-motorcycle-1829461_1920.webp",
    sizes: ["S", "M", "L"],
    category: "Heritage"
  },
  {
    id: "velocity-air",
    slug: "velocity-air-mesh",
    name: "Velocity Air",
    subtitle: "Mesh Performance",
    price: 600,
    image: "/assets/splitshire-biker-407123_1920.webp",
    sizes: ["S", "M", "L", "XL"],
    category: "Urban"
  },
  {
    id: "nomad-goretex",
    slug: "nomad-gore-tex-pro",
    name: "Nomad Gore-Tex",
    subtitle: "All-Terrain Pro",
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
  subtitle?: string;
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
    <section id="featured-products" className="bg-secondary py-20 md:py-32 px-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px] bg-accent" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-accent">
              Curated Selection
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-primary mb-6"
          >
            Featured <span className="text-accent">Products.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-muted text-sm md:text-base max-w-2xl leading-relaxed"
          >
            Explore our most sought-after pieces, where technical precision meets timeless aesthetic. Engineered for performance.
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-16">
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
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const productImage = product.image || (product.images && product.images[0]) || "/assets/placeholder.webp";
  const productSizes = product.sizes || ["S", "M", "L", "XL"];
  const categoryName = typeof product.category === 'string' ? product.category : product.category?.name || "Jacket";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col h-full bg-[#FBFBFA] border border-black/[0.03] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-white/50">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
        />
        
        {/* Quick View Button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors duration-500 flex items-center justify-center">
          <Link 
            href={`/jacket/${product.slug}`}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg hover:bg-accent hover:text-white"
          >
            <Eye size={18} />
          </Link>
        </div>

        {/* Floating Size Badge on Mobile/Hover */}
        {selectedSize && (
          <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
            Size: {selectedSize}
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="mb-5">
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest block mb-1.5">{categoryName}</span>
          <div className="flex justify-between items-start">
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-primary leading-tight">
              {product.name}
            </h3>
            <span className="text-lg font-bold text-primary">${product.price}</span>
          </div>
          <p className="text-[12px] text-text-muted mt-1.5">
            {product.subtitle || "Premium technical outerwear"}
          </p>
        </div>

        {/* Interaction Area */}
        <div className="mt-auto pt-5 border-t border-black/5">
          <div className="flex flex-col gap-4">
            {/* Size Selector */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-text-muted uppercase tracking-wider">Sizes:</span>
              <div className="flex gap-1.5">
                {productSizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                    className={cn(
                      "w-7 h-7 rounded-full border text-[9px] font-bold transition-all flex items-center justify-center cursor-pointer",
                      selectedSize === size 
                        ? "bg-primary border-primary text-white" 
                        : "bg-transparent border-black/10 text-primary hover:border-accent hover:text-accent"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize && !isAdded}
              className={cn(
                "w-full py-3.5 rounded-full flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                isAdded 
                  ? "bg-green-600 text-white cursor-default" 
                  : !selectedSize
                    ? "bg-black/10 text-black/40 border border-black/5 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-accent cursor-pointer"
              )}
            >
              {isAdded ? (
                <>Added <Check size={14} /></>
              ) : !selectedSize ? (
                <>Select Size <AlertCircle size={14} /></>
              ) : (
                <>Add to Cart <Plus size={14} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProductsGrid;
