"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  SlidersHorizontal, 
  Check, 
  X,
  Eye,
  Plus,
  ShoppingBag,
  ArrowRight,
  Filter,
  Search,
  AlertCircle,
  CheckCircle2,
  Mail,
  ChevronRight
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
      result.sort((a, b) => (a.isFeatured ? -1 : 1));
    } else {
      result.sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime());
    }

    return result;
  }, [initialProducts, activeCategory, inStockOnly, priceRange, sortOrder]);

  const bestSellers = filteredProducts.filter(p => p.isFeatured).slice(0, 4);
  const regularProducts = filteredProducts;

  return (
    <div className="bg-[#F5F5F3] min-h-screen text-[#111111] selection:bg-accent selection:text-white font-inter cursor-default">
      
      {/* 1. SHOP HERO BANNER */}
      <section className="relative h-[60vh] lg:h-screen w-full overflow-hidden bg-[#161616]">
        <Image 
          src="/assets/stocksnap-dark-2598357_1920.webp" 
          alt="Premium Collection" 
          fill 
          className="object-cover opacity-50 grayscale-[0.3]" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#161616]" />
        
        <div className="container relative z-10 h-full flex flex-col justify-center px-6 pt-24 md:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <span className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-[0.5em] mb-4 block">Archive Collection</span>
            <h1 className="text-4xl md:text-[56px] font-bold uppercase tracking-tighter text-white mb-6 leading-[0.95]">
              Technical <br /> Mastery.
            </h1>
            <p className="text-white/60 text-sm md:text-base font-light leading-relaxed mb-8 max-w-sm">
              Discover our latest iterations in performance outerwear. Engineered for movement, refined for the urban landscape.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER + SORT SECTION */}
      <div className="sticky top-[64px] md:top-[73px] z-[80] w-full bg-white/95 backdrop-blur-xl border-b border-black/5">
        <div className="container py-2.5 md:py-4 flex items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsFilterDrawerOpen(true)}
              className="flex items-center gap-3 px-5 py-2.5 bg-black text-white hover:bg-accent rounded-full transition-all cursor-pointer lg:hidden"
            >
              <SlidersHorizontal size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Filters</span>
            </button>
            
            <div className="hidden lg:flex items-center gap-3">
              <Filter size={14} className="text-black/40" />
              <span className="text-[10px] font-black uppercase tracking-widest italic text-black/40">
                Refining {filteredProducts.length} Results
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest hidden sm:inline">Sort By:</span>
              <div className="relative group">
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-transparent border-none text-[10px] font-black uppercase tracking-widest focus:ring-0 cursor-pointer text-[#111111] pr-6"
                >
                  <option value="Newest">Newest</option>
                  <option value="Best Selling">Best Selling</option>
                  <option value="Price: Low to High">Price: Low to High</option>
                  <option value="Price: High to Low">Price: High to Low</option>
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ChevronRight size={12} className="rotate-90 text-black/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-6 py-16 md:py-24 scroll-mt-40" id="collection">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* DESKTOP SIDEBAR FILTER */}
          <aside className="hidden lg:block w-64 space-y-16 shrink-0 sticky top-[160px] h-fit">
            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#111111] border-b border-black/5 pb-4">Categories</h4>
              <div className="flex flex-col gap-4">
                {["All", ...categories.map(c => c.name)].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "text-[10px] font-bold text-left transition-all uppercase tracking-widest cursor-pointer",
                      activeCategory === cat ? "text-accent pl-2 border-l-2 border-accent" : "text-black/40 hover:text-black hover:pl-2"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#111111] border-b border-black/5 pb-4">Availability</h4>
              <button 
                onClick={() => setInStockOnly(!inStockOnly)}
                className="flex items-center gap-4 cursor-pointer group w-full"
              >
                <div className={cn(
                  "w-5 h-5 rounded-sm border flex items-center justify-center transition-all",
                  inStockOnly ? "bg-accent border-accent" : "border-black/10 group-hover:border-black"
                )}>
                  {inStockOnly && <Check size={12} className="text-white" />}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest transition-colors",
                  inStockOnly ? "text-black" : "text-black/40 group-hover:text-black"
                )}>In Stock Only</span>
              </button>
            </div>

            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#111111] border-b border-black/5 pb-4">Price Range</h4>
              <div className="space-y-6">
                 <div className="flex justify-between text-[10px] font-black text-black/40 uppercase tracking-widest">
                   <span>$0</span>
                   <span className="text-accent">${priceRange[1]}</span>
                 </div>
                 <input 
                   type="range" 
                   min="0" 
                   max="2000" 
                   step="50"
                   value={priceRange[1]}
                   onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                   className="w-full accent-accent h-0.5 bg-black/5 appearance-none cursor-pointer"
                 />
              </div>
            </div>
            
            <div className="space-y-8">
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#111111] border-b border-black/5 pb-4">Selection</h4>
              <div className="grid grid-cols-4 gap-2">
                {["S", "M", "L", "XL"].map(sz => (
                  <button 
                    key={sz}
                    className="h-10 border border-black/5 rounded flex items-center justify-center text-[10px] font-bold text-black/40 hover:border-black hover:text-black transition-all cursor-pointer"
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 space-y-24 md:space-y-32">
            
            {/* 3. FEATURED COLLECTION */}
            {bestSellers.length > 0 && activeCategory === "All" && (
              <section className="space-y-12 bg-[#EFEDE8] -mx-6 px-6 py-16 md:rounded-[2.5rem] md:mx-0 md:px-12">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Curated Spotlight</span>
                  <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-[#111111]">The Elite Series</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
                   {bestSellers.map(p => (
                     <ProductCard 
                       key={p.id} 
                       product={p} 
                       onQuickView={() => setQuickViewProduct(p)} 
                     />
                   ))}
                </div>
              </section>
            )}

            {/* 4. MAIN PRODUCT GRID */}
            <section className="space-y-12">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Full Archives</span>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter text-[#111111]">
                  {activeCategory === "All" ? "All Collections" : `${activeCategory} Series`}
                </h2>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="py-32 flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-16 h-16 bg-black/5 rounded-full flex items-center justify-center">
                    <Search size={24} className="text-black/20" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold uppercase tracking-tighter">No Results</h3>
                    <p className="text-sm text-black/40 max-w-xs">Adjust your filters to discover other pieces in the collection.</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-12 md:gap-y-20">
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

            {/* 5. COLLECTION HIGHLIGHT BANNER */}
            <section className="relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden group border border-black/5">
               <Image 
                 src="/assets/sohag_hawlader-ai-generated-9034981_1920.webp" 
                 alt="Collection Highlight" 
                 fill 
                 className="object-cover transition-transform duration-[3s] group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-black/40" />
               <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] mb-4">Innovation Series</span>
                  <h3 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-8">Engineering <br /> The Future.</h3>
                  <Link href="/technology" className="px-10 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-accent hover:text-white transition-all shadow-xl">
                    Explore Technology
                  </Link>
               </div>
            </section>
          </div>
        </div>
      </div>

      {/* 6. NEWSLETTER SECTION */}
      <section className="py-24 bg-[#161616] text-white">
        <div className="container px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-md">
            <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter mb-4">Join the Archives.</h3>
            <p className="text-white/40 text-sm md:text-base font-light">Stay informed on limited drops, technical breakthroughs, and editorial field notes.</p>
          </div>
          <div className="w-full max-w-md flex flex-col gap-4">
            <div className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-5 text-[10px] font-bold tracking-widest focus:border-accent focus:ring-0 transition-all outline-none"
              />
              <button className="absolute right-2 top-2 bottom-2 px-8 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-black/5 flex flex-col items-center gap-4 bg-[#F5F5F3]">
         <h4 className="text-xl font-bold uppercase tracking-tighter">Jacket Junction</h4>
         <p className="text-[10px] text-black/20 uppercase tracking-[0.4em] font-bold">Archives // MMXXV Edition</p>
      </footer>

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
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[210] p-10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-16">
                <h2 className="text-2xl font-bold uppercase tracking-tighter">Refine Selection</h2>
                <button onClick={() => setIsFilterDrawerOpen(false)} className="cursor-pointer hover:rotate-90 transition-transform"><X size={24} /></button>
              </div>
              
              <div className="flex-1 space-y-12 overflow-y-auto pr-4">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Collections</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["All", ...categories.map(c => c.name)].map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={cn(
                          "px-4 py-4 border rounded text-[10px] font-bold uppercase tracking-widest transition-all cursor-pointer",
                          activeCategory === cat ? "bg-black text-white border-black" : "border-black/5 text-black/40"
                        )}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Status</h4>
                  <button 
                    onClick={() => setInStockOnly(!inStockOnly)}
                    className={cn(
                      "w-full px-5 py-4 border rounded text-[10px] font-bold uppercase tracking-widest flex items-center justify-between cursor-pointer",
                      inStockOnly ? "bg-accent/10 border-accent text-accent" : "border-black/5 text-black/40"
                    )}
                  >
                    Available Now {inStockOnly && <Check size={14} />}
                  </button>
                </div>

                <div className="space-y-6">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Maximum Budget: ${priceRange[1]}</h4>
                  <input 
                    type="range" 
                    min="0" 
                    max="2000" 
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-accent cursor-pointer"
                  />
                </div>
              </div>

              <div className="pt-8 mt-8 border-t border-black/5">
                <button 
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="w-full py-5 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-full cursor-pointer hover:bg-accent transition-all shadow-xl"
                >
                  Show {filteredProducts.length} Results
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

function ProductCard({ product, onQuickView }: { product: Product, onQuickView: () => void }) {
  const [selectedSize, setSelectedSize] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!selectedSize) return;
    
    addItem(product, selectedSize);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const mainImage = product.images[0] || "/assets/placeholder.webp";
  const categoryName = product.category.name || "Jacket Archive";

  return (
    <motion.div
      className="group flex flex-col h-full bg-[#FBFBFA] border border-black/[0.03] rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      {/* Image Area */}
      <div className="relative aspect-[4/5] overflow-hidden bg-white/50">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
        />
        
        {/* Quick View Button */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors duration-500 flex items-center justify-center">
          <button 
            onClick={(e) => { e.stopPropagation(); onQuickView(); }}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg hover:bg-accent hover:text-white cursor-pointer"
          >
            <Eye size={18} />
          </button>
        </div>

        {/* Floating Size Badge */}
        {selectedSize && (
          <div className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
            Size: {selectedSize}
          </div>
        )}
      </div>

      {/* Info Area */}
      <div className="p-5 md:p-6 flex flex-col flex-1">
        <div className="mb-5">
          <span className="text-[9px] font-bold text-accent uppercase tracking-widest block mb-1.5">{categoryName} Archive</span>
          <div className="flex justify-between items-start gap-4">
            <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-primary leading-tight flex-1">
              {product.name}
            </h3>
            <span className="text-lg font-bold text-primary shrink-0">${product.price.toLocaleString()}</span>
          </div>
          <p className="text-[12px] text-black/40 mt-1.5">
            {product.material || "Premium technical outerwear"}
          </p>
        </div>

        {/* Interaction Area */}
        <div className="mt-auto pt-5 border-t border-black/5">
          <div className="flex flex-col gap-4">
            {/* Size Selector */}
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-black/30 uppercase tracking-wider">Sizes:</span>
              <div className="flex gap-1.5">
                {["S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedSize(size); }}
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
                "w-full py-3.5 rounded-full flex items-center justify-center gap-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 shadow-sm cursor-pointer",
                isAdded 
                  ? "bg-green-600 text-white cursor-default" 
                  : !selectedSize
                    ? "bg-black/10 text-black/40 border border-black/5 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-accent"
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
        className="fixed inset-0 bg-black/60 backdrop-blur-xl z-[300] cursor-pointer"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="fixed top-[5%] bottom-[5%] left-[5%] right-[5%] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-5xl md:h-auto md:max-h-[80vh] bg-white z-[310] rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-black/5 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Modal Image */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto relative bg-[#EFEDE8]">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
        </div>

        {/* Modal Content */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col overflow-y-auto">
          <div className="mb-10">
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-4 block">{product.category.name} // Spec</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter text-[#111111] mb-6 leading-none">{product.name}</h2>
            <p className="text-sm text-black/40 leading-relaxed max-w-sm font-light">
              {product.description}
            </p>
          </div>

          <div className="mt-auto space-y-12">
             <div className="space-y-6">
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-black/30">
                  <span>Anatomical Fit</span>
                  <span className="italic">Global Scale</span>
                </div>
                <div className="grid grid-cols-4 gap-3">
                   {["S", "M", "L", "XL"].map(sz => (
                     <button 
                       key={sz}
                       onClick={() => setSelectedSize(sz)}
                       className={cn(
                         "h-14 border rounded-xl flex items-center justify-center text-xs font-bold transition-all cursor-pointer",
                         selectedSize === sz ? "bg-black text-white border-black shadow-xl" : "border-black/5 text-black/40 hover:border-black hover:text-black"
                       )}
                     >
                       {sz}
                     </button>
                   ))}
                </div>
             </div>

             <div className="space-y-6">
               <div className="flex justify-between items-end mb-4">
                 <span className="text-3xl font-bold tracking-tighter text-[#111111]">${product.price.toLocaleString()}</span>
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-[9px] font-bold text-black/40 uppercase tracking-widest">Allocation Ready</span>
                 </div>
               </div>
               <button 
                 onClick={handleAddToCart}
                 disabled={!selectedSize && !isAdded}
                 className={cn(
                   "w-full h-16 rounded-full flex items-center justify-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 shadow-xl cursor-pointer",
                   isAdded 
                    ? "bg-green-600 text-white cursor-default" 
                    : !selectedSize
                      ? "bg-black/5 text-black/20 border border-black/5 cursor-not-allowed"
                      : "bg-accent text-white hover:bg-black cursor-pointer"
                 )}
               >
                 {isAdded ? (
                   <>Added to Bag <CheckCircle2 size={16} /></>
                 ) : !selectedSize ? (
                   <>Select Size <AlertCircle size={16} /></>
                 ) : (
                   <>Acquire Piece <ShoppingBag size={16} /></>
                 )}
               </button>
               <Link 
                 href={`/jacket/${product.slug}`} 
                 onClick={onClose}
                 className="block text-center text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors pt-4 border-t border-black/5"
               >
                 Full Archival View
               </Link>
             </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
