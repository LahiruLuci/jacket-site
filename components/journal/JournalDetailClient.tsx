"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/lib/journal-data";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Share2, 
  ChevronRight,
  Quote
} from "lucide-react";

export default function JournalDetailClient({ article, relatedArticles }: { article: Article, relatedArticles: Article[] }) {
  return (
    <>
      {/* 01. IMMERSIVE HERO */}
      <section className="relative h-[70vh] md:h-[80vh] w-full flex items-end overflow-hidden pt-32">
        <Image 
          src={article.image} 
          alt={article.title} 
          fill 
          className="object-cover animate-slow-zoom"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="container relative z-10 pb-12 md:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link 
              href="/journal" 
              className="inline-flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-8 hover:translate-x-[-8px] transition-transform"
            >
              <ArrowLeft size={14} /> Back to Archives
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em]">{article.category}</span>
              <div className="w-8 h-[1px] bg-white/20" />
              <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.5em] flex items-center gap-2">
                <Clock size={12} /> {article.readTime}
              </span>
            </div>

            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] max-w-5xl mb-8">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">
              <span className="flex items-center gap-2"><Calendar size={14} /> {article.date}</span>
              <span className="flex items-center gap-2 text-white/60 cursor-pointer hover:text-accent transition-colors">
                <Share2 size={14} /> Share Intel
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 02. ARTICLE CONTENT */}
      <section className="container py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8">
            <article className="prose prose-invert max-w-none">
              <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-12 first-letter:text-7xl first-letter:font-black first-letter:text-accent first-letter:mr-4 first-letter:float-left">
                {article.excerpt}
              </p>
              
              <div className="flex flex-col gap-12">
                {article.content?.map((paragraph, i) => (
                  <motion.p 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="text-white/60 text-lg md:text-xl leading-relaxed font-light"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="my-20 p-8 md:p-12 bg-[#161718] border-l-4 border-accent relative overflow-hidden group"
              >
                <Quote size={80} className="absolute -top-4 -right-4 text-white/5 opacity-20 group-hover:scale-110 transition-transform duration-700" />
                <p className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight italic">
                  "Engineering for the slide means engineering for survival. This is why every seam is a statement of intent."
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-8 h-[1px] bg-accent" />
                  <span className="text-accent text-[10px] font-bold uppercase tracking-widest">Master Technician // Archives 94</span>
                </div>
              </motion.div>

              <div className="text-white/60 text-lg md:text-xl leading-relaxed font-light mb-12">
                As we continue to push the boundaries of what is possible in rider protection, the Journal remains our platform for transparency. Every material choice, every stitch pattern, and every molecular adjustment is documented here for the vanguard.
              </div>
            </article>

            <div className="flex flex-wrap gap-4 mt-20 pt-12 border-t border-white/5">
              {["Ballistic", "Calibration", "Tokyo", "Vanguard"].map(tag => (
                <span key={tag} className="px-4 py-2 bg-white/5 rounded-full text-[9px] font-bold uppercase tracking-widest text-white/40 hover:bg-accent hover:text-black transition-all cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4 flex flex-col gap-12">
            <div className="p-8 bg-[#161718] border border-white/5 rounded-2xl sticky top-32">
              <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-8 pb-4 border-b border-white/10">Technical Specs</h4>
              
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Article ID</span>
                  <span className="text-[10px] font-mono text-white/80 uppercase">JJ-ARCH-{article.id}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Protocol</span>
                  <span className="text-[10px] font-mono text-white/80 uppercase">Classified</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Authority</span>
                  <span className="text-[10px] font-mono text-white/80 uppercase">Vanguard Team</span>
                </div>
              </div>

              <div className="mt-12">
                <p className="text-[10px] text-white/40 italic leading-relaxed">
                  This document is part of the Jacket Junction secure archives. Redistribution without authorization is prohibited.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* 03. RELATED INTEL */}
      <section className="py-24 md:py-40 border-t border-white/5 bg-[#111213]">
        <div className="container">
          <div className="flex justify-between items-end mb-16">
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Related <span className="text-stroke">Intel.</span></h3>
            <Link href="/journal" className="text-accent text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:translate-x-2 transition-transform">
              View All <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {relatedArticles.map((item) => (
              <Link key={item.id} href={`/journal/${item.id}`} className="group flex flex-col md:flex-row gap-8 bg-black/20 p-6 rounded-3xl border border-white/5 hover:border-accent/30 transition-all duration-500">
                <div className="relative w-full md:w-48 aspect-square rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-accent text-[9px] font-bold uppercase tracking-widest mb-2">{item.category}</span>
                  <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none mb-4 group-hover:text-accent transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-white/40 text-xs line-clamp-2 leading-relaxed font-light">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
