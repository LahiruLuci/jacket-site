"use client";

import { useState, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";

// Inline SVG for Instagram since the icon is missing in this version of lucide-react
const Instagram = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
import Link from "next/link";

const feed = [
  {
    id: 1,
    handle: "@jacket_rider",
    likes: "12.4k",
    comments: "342",
    img: "/assets/splitshire-biker-407123_1920.webp",
    gridClass: "md:col-span-8 md:row-span-2 h-[400px] md:h-[600px]",
  },
// ... (rest of feed)
  {
    id: 2,
    handle: "@milan_stealth",
    likes: "4.2k",
    comments: "128",
    img: "/assets/derneuemann-jacket-2821961_1920.webp",
    gridClass: "md:col-span-4 h-[300px] md:h-auto", // Naturally fills the remaining row-span-2 height
  },
  {
    id: 3,
    handle: "@tech_noir",
    likes: "8.1k",
    comments: "512",
    img: "/assets/sohag_hawlader-ai-generated-9034981_1920.webp",
    gridClass: "md:col-span-4 h-[300px] md:h-[400px]",
  },
  {
    id: 4,
    handle: "@apex_chaser",
    likes: "3.7k",
    comments: "89",
    img: "/assets/peterlesliemorris-motorcycle-1829461_1920.webp",
    gridClass: "md:col-span-4 h-[300px] md:h-[400px]",
  },
  {
    id: 5,
    handle: "@carbon_core",
    likes: "5.9k",
    comments: "214",
    img: "/assets/stocksnap-dark-2598357_1920.webp",
    gridClass: "md:col-span-4 h-[300px] md:h-[400px]",
  },
];

export default function CommunityFeed() {
  const [isHoveringGrid, setIsHoveringGrid] = useState(false);

  // Smooth spring physics for the custom magnetic cursor
  const cursorX = useSpring(0, { stiffness: 300, damping: 25 });
  const cursorY = useSpring(0, { stiffness: 300, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 48px offset to perfectly center the 96x96px cursor
      cursorX.set(e.clientX - 48);
      cursorY.set(e.clientY - 48);
    };

    if (isHoveringGrid) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
    }

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHoveringGrid, cursorX, cursorY]);

  return (
    <section className="relative bg-[#111213] py-24 md:py-40 z-10 w-full overflow-hidden border-t border-white/5 cursor-default">
      
      {/* Custom Global Cursor (Only visible when hovering grid) */}
      <AnimatePresence>
        {isHoveringGrid && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ x: cursorX, y: cursorY }}
            className="fixed top-0 left-0 w-24 h-24 bg-white/5 backdrop-blur-md border border-white/20 rounded-full flex flex-col items-center justify-center z-[100] pointer-events-none shadow-[0_0_30px_rgba(255,255,255,0.05)] hidden md:flex"
          >
            <Instagram size={20} className="text-white mb-2" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-white">
              Discover
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-accent" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
              The Jacket Junction Community
            </span>
            <div className="w-12 h-[1px] bg-accent" />
          </div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tight text-white leading-none mb-6">
            Join The <br className="md:hidden" />
            <span className="text-accent">Movement.</span>
          </h2>
          
          <p className="text-white/40 text-sm md:text-base max-w-lg font-light leading-relaxed">
            Tag <span className="text-white font-bold">@JacketJunction</span> to be featured in our permanent digital archive.
          </p>
        </div>

        {/* Bento Masonry Feed */}
        <div 
          className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6"
          onMouseEnter={() => setIsHoveringGrid(true)}
          onMouseLeave={() => setIsHoveringGrid(false)}
        >
          {feed.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden rounded-2xl group ${post.gridClass}`}
            >
              <Image
                src={post.img}
                alt={post.handle}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
              />
              
              {/* Dark Hover Glass Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Hover UI Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#181A1C] border border-white/20 flex items-center justify-center backdrop-blur-sm overflow-hidden">
                    <Image src={post.img} alt="Avatar" width={40} height={40} className="object-cover opacity-50 grayscale" />
                  </div>
                  <span className="text-white font-bold text-sm tracking-wide shadow-black drop-shadow-md">
                    {post.handle}
                  </span>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Heart size={18} className="text-white fill-white/20" />
                    <span className="text-white text-xs font-bold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={18} className="text-white fill-white/20" />
                    <span className="text-white text-xs font-bold">{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Top Right Instagram Icon */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 delay-100 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                <Instagram size={18} className="text-white" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action Button */}
        <div className="mt-16 flex justify-center">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="group flex items-center gap-4 bg-transparent border border-white/20 hover:border-accent px-8 py-5 rounded-full transition-all duration-500 overflow-hidden relative"
          >
            {/* Hover Background Sweep */}
            <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" />
            
            <div className="relative z-10 flex items-center gap-3 group-hover:text-black transition-colors duration-500">
              <Instagram size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.2em]">Explore Community</span>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
