"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SlidersHorizontal, 
  ChevronDown, 
  Check, 
  Plus, 
  X,
  Eye,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Search,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";

// --- Types ---
type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string | null;
  description: string;
  price: number;
  images: string[];
  stock: number;
  material: string | null;
  season: string | null;
  isFeatured: boolean;
  category: {
    id: string;
    name: string;
    slug: string;
  };
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

interface ShopClientProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ShopClient({ initialProducts, categories }: ShopClientProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSize, setActiveSize] = useState("All");
  const [activeColor, setActiveColor] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (activeCategory !== "All") {
      result = result.filter(p => p.category.name === activeCategory);
    }
    
    if (inStockOnly) {
      result = result.filter(p => p.stock > 0);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortOrder === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "Best Selling") {
      // Mock best selling for now
      result.sort((a, b) => (a.isFeatured ? -1 : 1));
    } else {
      // Newest
      result.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
    }

    return result;
  }, [initialProducts, activeCategory, inStockOnly, priceRange, sortOrder]);

  const bestSellers = filteredProducts.filter(p => p.isFeatured).slice(0, 4);
  const regularProducts = filteredProducts.filter(p => !p.isFeatured || filteredProducts.length < 5);

  return (
    <div className="bg-[#F5F5F3] min-h-screen text-[#111111] selection:bg-accent selection:text-white font-inter">
      
      {/* 1. SHOP HERO BANNER */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-[#161616]">
        <Image 
          src="/assets/stocksnap-dark-2598357_1920.webp" 
          alt="Premium Collection" 
          fill 
          className="object-cover opacity-60" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-black/20" />
        <div className="container relative z-10 h-full flex flex-col justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <span className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-[0.5em] mb-4 block">New Season Arrival</span>
            <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tighter text-white mb-6 leading-none">
              Premium <br /> Utility Jackets
            </h1>
            <p className="text-white/70 text-sm md:text-xl font-light leading-relaxed mb-10 max-w-lg">
              Designed for daily comfort, durability, and modern style. Engineered for the urban landscape.
            </p>
            <div className="flex gap-4">
               <button onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all rounded-sm shadow-xl">
                 Explore Archives
               </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER + SORT BAR (STICKY) */}
      <div className="sticky top-[80px] z-[80] w-full bg-white/80 backdrop-blur-3xl border-y border-black/5 shadow-sm">
        <div className="container py-4 flex items-center justify-between px-6">
          <button 
            onClick={() => setIsFilterDrawerOpen(true)}
            className="flex items-center gap-3 px-4 py-2 hover:bg-black/5 rounded-full transition-all md:hidden"
          >
            <SlidersHorizontal size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Filters</span>
          </button>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Collection:</span>
               <select 
                 value={activeCategory}
                 onChange={(e) => setActiveCategory(e.target.value)}
                 className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest focus:ring-0 cursor-pointer text-[#111111]"
               >
                 <option value="All">All Items</option>
                 {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
               </select>
            </div>
            <div className="w-[1px] h-4 bg-black/10" />
            <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest italic">{filteredProducts.length} Results</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest">Sort by:</span>
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest focus:ring-0 cursor-pointer text-[#111111]"
              >
                <option value="Newest">Newest</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
                <option value="Best Selling">Best Selling</option>
              </select>
            </div>
            <button 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-accent transition-colors"
            >
              <Filter size={14} /> Full Filters
            </button>
          </div>
        </div>
      </div>

      <div className="container px-6 py-16 md:py-24" id="collection">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* DESKTOP SIDEBAR FILTER */}
          <aside className="hidden lg:block w-64 space-y-12 shrink-0">
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">Categories</h4>
              <div className="flex flex-col gap-3">
                {["All", ...categories.map(c => c.name)].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "text-xs text-left transition-colors uppercase tracking-widest",
                      activeCategory === cat ? "text-accent font-bold" : "text-black/40 hover:text-black"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">Availability</h4>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className={cn(
                  "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                  inStockOnly ? "bg-accent border-accent" : "border-black/20 group-hover:border-black"
                )} onClick={() => setInStockOnly(!inStockOnly)}>
                  {inStockOnly && <Check size={10} className="text-white" />}
                </div>
                <span className="text-xs uppercase tracking-widest text-black/60 group-hover:text-black transition-colors">In Stock Only</span>
              </label>
            </div>

            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">Price Range</h4>
              <div className="space-y-4">
                 <div className="flex justify-between text-[10px] font-bold text-black/40 uppercase tracking-widest">
                   <span>$0</span>
                   <span>${priceRange[1]}</span>
                 </div>
                 <input 
                   type="range" 
                   min="0" 
                   max="2000" 
                   step="50"
                   value={priceRange[1]}
                   onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                   className="w-full accent-accent h-1 bg-black/5 rounded-lg appearance-none cursor-pointer"
                 />
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">Size</h4>
              <div className="grid grid-cols-4 gap-2">
                {["S", "M", "L", "XL"].map(sz => (
                  <button 
                    key={sz}
                    onClick={() => setActiveSize(sz)}
                    className={cn(
                      "h-10 border rounded flex items-center justify-center text-[10px] font-bold transition-all",
                      activeSize === sz ? "bg-black text-white border-black" : "border-black/10 text-black/40 hover:border-black hover:text-black"
                    )}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 space-y-24 md:space-y-40">
            
            {/* 3. FEATURED COLLECTION (Curated Grid) */}
            {bestSellers.length > 0 && activeCategory === "All" && (
              <section className="space-y-12">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Curated // Elite</span>
                  <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-[#111111]">Best Sellers</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 md:gap-12">
                   {bestSellers.map(p => (
                     <ProductCard 
                       key={p.id} 
                       product={p} 
                       onQuickView={() => setQuickViewProduct(p)} 
                       isLarge={true}
                     />
                   ))}
                </div>
              </section>
            )}

            {/* 4. MAIN PRODUCT GRID */}
            <section className="space-y-12">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Full Archives</span>
                <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-[#111111]">
                  {activeCategory === "All" ? "All Collections" : `${activeCategory} Series`}
                </h2>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="py-32 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center">
                    <Search size={24} className="text-black/20" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold uppercase tracking-tighter">No Products Found</h3>
                    <p className="text-sm text-black/40 max-w-xs">The selected filters yielded zero results. Try adjusting your parameters.</p>
                  </div>
                  <button 
                    onClick={() => { setActiveCategory("All"); setPriceRange([0, 2000]); setInStockOnly(false); }}
                    className="px-8 py-3 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-colors rounded-sm"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                  {regularProducts.map(p => (
                    <ProductCard 
                      key={p.id} 
                      product={p} 
                      onQuickView={() => setQuickViewProduct(p)} 
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </div>

      {/* QUICK VIEW MODAL */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal 
            product={quickViewProduct} 
            onClose={() => setQuickViewProduct(null)} 
          />
        )}
      </AnimatePresence>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isFilterDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[210] p-8 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-bold uppercase tracking-tighter">Filters</h2>
                <button onClick={() => setIsFilterDrawerOpen(false)}><X size={24} /></button>
              </div>
              
              <div className="space-y-12">
                <div className="space-y-6">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">Categories</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["All", ...categories.map(c => c.name)].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "px-4 py-3 border rounded text-[10px] font-bold uppercase tracking-widest transition-all",
                          activeCategory === cat ? "bg-black text-white border-black" : "border-black/5 text-black/40"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">Availability</h4>
                  <button 
                    onClick={() => setInStockOnly(!inStockOnly)}
                    className={cn(
                      "w-full px-4 py-3 border rounded text-[10px] font-bold uppercase tracking-widest flex items-center justify-between",
                      inStockOnly ? "bg-accent/10 border-accent text-accent" : "border-black/5 text-black/40"
                    )}
                  >
                    In Stock Only {inStockOnly && <Check size={14} />}
                  </button>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-black/40">Price Under: ${priceRange[1]}</h4>
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-accent"
                  />
                </div>

                <button 
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-sm mt-12"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}

// --- Subcomponents ---

function ProductCard({ product, onQuickView, isLarge = false }: { product: Product, onQuickView: () => void, isLarge?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const mainImage = product.images[0] || "/assets/placeholder.webp";

  return (
    <div 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col gap-6"
    >
      {/* Image Canvas */}
      <div className={cn(
        "relative rounded-2xl overflow-hidden bg-[#EFEDE8] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        isLarge ? "aspect-[4/5]" : "aspect-[3/4]",
        isHovered ? "shadow-2xl -translate-y-2" : "shadow-sm"
      )}>
        <Image 
          src={mainImage} 
          alt={product.name} 
          fill 
          className={cn(
            "object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]",
            isHovered ? "scale-110" : "scale-100"
          )} 
        />
        
        {/* Hover Overlay Actions */}
        <div className={cn(
          "absolute inset-0 bg-black/10 transition-opacity duration-700",
          isHovered ? "opacity-100" : "opacity-0"
        )} />
        
        <div className={cn(
          "absolute bottom-6 inset-x-6 flex flex-col gap-3 transition-all duration-700",
          isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        )}>
          <button 
            onClick={onQuickView}
            className="w-full h-12 bg-white text-black text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-all shadow-xl"
          >
            Quick View <Eye size={14} />
          </button>
          <Link 
            href={`/jacket/${product.slug}`}
            className="w-full h-12 bg-black/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-xl"
          >
            View Details <ArrowRight size={14} />
          </Link>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           {product.isFeatured && (
             <span className="px-3 py-1 bg-black text-white text-[8px] font-bold uppercase tracking-widest rounded-full">Best Seller</span>
           )}
           {new Date(product.id).getTime() > Date.now() - 604800000 && (
             <span className="px-3 py-1 bg-accent text-white text-[8px] font-bold uppercase tracking-widest rounded-full">New</span>
           )}
        </div>
      </div>

      {/* Info Block */}
      <div className="space-y-2 px-1">
        <div className="flex justify-between items-start gap-4">
           <div className="space-y-1">
              <span className="text-[9px] font-bold text-accent uppercase tracking-widest block">{product.category.name}</span>
              <h3 className="text-lg md:text-xl font-bold uppercase tracking-tighter text-[#111111] group-hover:text-accent transition-colors leading-tight">
                {product.name}
              </h3>
              <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest">{product.material || "Technical Gear"}</p>
           </div>
           <span className="text-lg font-bold tracking-tighter text-[#111111]">${product.price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function QuickViewModal({ product, onClose }: { product: Product, onClose: () => void }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] cursor-pointer"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-white z-[310] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-black/5 flex items-center justify-center transition-colors"
        >
          <X size={20} />
        </button>

        {/* Modal Image */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-[#EFEDE8]">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        </div>

        {/* Modal Content */}
        <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col">
          <div className="mb-10">
            <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-4 block">{product.category.name}</span>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-[#111111] mb-6 leading-none">{product.name}</h2>
            <p className="text-sm text-black/60 leading-relaxed max-w-sm">
              {product.description.slice(0, 180)}...
            </p>
          </div>

          <div className="mt-auto space-y-10">
             <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-black/40">
                  <span>Select Size</span>
                  <span className="text-black/20 italic">Global Scale</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                   {["S", "M", "L", "XL"].map(sz => (
                     <button 
                       key={sz}
                       onClick={() => setSelectedSize(sz)}
                       className={cn(
                         "h-12 border rounded-xl flex items-center justify-center text-xs font-bold transition-all",
                         selectedSize === sz ? "bg-black text-white border-black shadow-lg" : "border-black/5 text-black/40 hover:border-black hover:text-black"
                       )}
                     >
                       {sz}
                     </button>
                   ))}
                </div>
             </div>

             <div className="space-y-4">
               <div className="flex justify-between items-end mb-4">
                 <span className="text-3xl font-bold tracking-tighter text-[#111111]">${product.price}</span>
                 <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">In Stock</span>
               </div>
               <button 
                 onClick={handleAddToCart}
                 disabled={!selectedSize && !isAdded}
                 className={cn(
                   "w-full h-16 rounded-2xl flex items-center justify-center gap-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-xl",
                   isAdded 
                    ? "bg-green-600 text-white cursor-default" 
                    : !selectedSize
                      ? "bg-black/5 text-black/20 border border-black/5 cursor-not-allowed"
                      : "bg-accent text-white hover:bg-[#967648] cursor-pointer"
                 )}
               >
                 {isAdded ? (
                   <>Added to Cart <CheckCircle2 size={18} /></>
                 ) : !selectedSize ? (
                   <>Select Size First <AlertCircle size={18} /></>
                 ) : (
                   <>Add to Cart <ShoppingBag size={18} /></>
                 )}
               </button>
               <Link href={`/jacket/${product.slug}`} className="block text-center text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors pt-2">Full Specifications</Link>
             </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
