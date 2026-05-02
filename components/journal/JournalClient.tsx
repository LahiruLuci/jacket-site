"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Clock, 
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ARTICLES, Article } from "@/lib/journal-data";

const CATEGORIES = ["All", "Culture", "Technology", "Engineering", "Style", "History"];

export default function JournalClient() {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredArticles = activeCategory === "All" 
    ? ARTICLES 
    : ARTICLES.filter(a => a.category === activeCategory);

  return (
    <>
      {/* 01. EDITORIAL HERO: IMMERSIVE ENTRY */}
      <section className="relative min-h-[70vh] flex items-center pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
        
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-accent" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-accent">The Archives</span>
            </div>
            
            <h1 className="text-5xl md:text-9xl lg:text-[180px] font-black uppercase tracking-tighter leading-[0.8] mb-8 md:mb-12">
              Field <br /> <span className="text-stroke">Notes.</span>
            </h1>

            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-t border-white/5 pt-12">
              <p className="text-white/40 max-w-md text-sm md:text-lg leading-relaxed font-light">
                Intel, culture, and technical blueprints from the front lines of mechanical defense. Curated for those who ride beyond the grid.
              </p>
              
              <div className="flex flex-wrap gap-2 bg-white/[0.03] backdrop-blur-md p-1.5 rounded-full border border-white/5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-500",
                      activeCategory === cat 
                        ? "bg-accent text-black shadow-[0_0_20px_rgba(201,162,39,0.3)]" 
                        : "text-white/40 hover:text-white"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02. FEATURED STORY */}
      <section className="container mb-24 md:mb-40">
        <Link href={`/journal/${ARTICLES[0].id}`} className="group relative block w-full h-[60vh] md:h-[80vh] rounded-[2rem] overflow-hidden border border-white/10">
          <Image 
            src={ARTICLES[0].image} 
            alt={ARTICLES[0].title} 
            fill 
            className="object-cover transition-transform duration-[3s] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-black/20 mix-blend-overlay" />
          
          <div className="absolute bottom-6 md:bottom-12 left-6 md:left-16 right-6 md:right-16 flex flex-col md:flex-row items-end justify-between gap-6 md:gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 bg-accent/90 text-black text-[9px] font-bold uppercase tracking-widest rounded-sm">Featured</span>
                <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/60 flex items-center gap-2">
                  <Clock size={12} /> {ARTICLES[0].readTime} READ
                </span>
              </div>
              <h2 className="text-2xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-4 md:mb-6 group-hover:text-accent transition-colors duration-500">
                {ARTICLES[0].title}
              </h2>
              <p className="text-white/60 text-sm md:text-base leading-relaxed line-clamp-2 font-light">
                {ARTICLES[0].excerpt}
              </p>
            </div>
            
            <div className="w-12 h-12 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-xl group-hover:bg-accent group-hover:border-accent transition-all duration-700">
              <ArrowUpRight size={24} className="text-white md:size-8 group-hover:text-black transition-colors" />
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 h-1 bg-accent w-0 group-hover:w-full transition-all duration-1000 ease-in-out" />
        </Link>
      </section>

      {/* 03. GRID */}
      <section className="container pb-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {filteredArticles.slice(1).map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={cn(
                "group cursor-pointer",
                article.size === "medium" ? "md:col-span-7" : "md:col-span-5"
              )}
            >
              <Link href={`/journal/${article.id}`}>
                <div className={cn(
                  "relative w-full overflow-hidden rounded-2xl mb-8 border border-white/5",
                  article.size === "medium" ? "aspect-[16/10]" : "aspect-[4/5]"
                )}>
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover transition-transform duration-[2s] group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute top-6 left-6 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-sm">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#C9A227]">{article.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">{article.date}</span>
                  <div className="w-6 h-[1px] bg-white/10" />
                  <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">{article.readTime}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-[0.9] mb-4 group-hover:text-accent transition-colors duration-500">
                  {article.title}
                </h3>
                
                <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light line-clamp-3">
                  {article.excerpt}
                </p>
                
                <div className="mt-8 flex items-center gap-2 text-accent text-[9px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  Read Intel <ChevronRight size={12} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
