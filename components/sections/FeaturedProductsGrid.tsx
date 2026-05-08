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
    id: "vanguard-titan",
    slug: "vanguard-titan-racing",
    name: "Vanguard Titan",
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
    <section id="featured-products" className="bg-secondary py-24 md:py-32 px-6">
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
            className="text-4xl md:text-6xl font-bold uppercase tracking-tight text-primary mb-6"
          >
            Featured <span className="text-accent">Products.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-text-muted text-base md:text-lg max-w-2xl leading-relaxed"
          >
            Explore our most sought-after pieces, where technical precision meets timeless aesthetic. Engineered for performance, designed for the modern individual.
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 md:gap-y-16">
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
  const [showError, setShowError] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!selectedSize) {
      setShowError(true);
      setTimeout(() => setShowError(false), 2000);
      return;
    }
    
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
      className="group flex flex-col h-full bg-white border border-black/5 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
        />
        
        {/* Quick View Button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
          <Link 
            href={`/jacket/${product.slug}`}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg hover:bg-accent hover:text-white"
          >
            <Eye size={20} />
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
      <div className="p-6 md:p-8 flex flex-col flex-1">
        <div className="mb-6">
          <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-2">{categoryName}</span>
          <div className="flex justify-between items-start">
            <h3 className="text-xl md:text-2xl font-bold uppercase tracking-tight text-primary leading-tight">
              {product.name}
            </h3>
            <span className="text-xl font-bold text-primary">${product.price}</span>
          </div>
          <p className="text-sm text-text-muted mt-2">
            {product.subtitle || "Premium technical outerwear"}
          </p>
        </div>

        {/* Interaction Area */}
        <div className="mt-auto pt-6 border-t border-black/5">
          <div className="flex flex-col gap-4">
            {/* Size Selector */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Sizes:</span>
              <div className="flex gap-2">
                {productSizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={(e) => { e.preventDefault(); setSelectedSize(size); }}
                    className={cn(
                      "w-8 h-8 rounded-full border text-[10px] font-bold transition-all flex items-center justify-center cursor-pointer",
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
              className={cn(
                "w-full py-4 rounded-lg flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer",
                isAdded 
                  ? "bg-green-600 text-white" 
                  : showError
                    ? "bg-red-500 text-white"
                    : "bg-primary text-white hover:bg-accent"
              )}
            >
              {isAdded ? (
                <>Added to Cart <Check size={16} /></>
              ) : showError ? (
                <>Select Size First <AlertCircle size={16} /></>
              ) : (
                <>Add to Cart <Plus size={16} /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProductsGrid;
