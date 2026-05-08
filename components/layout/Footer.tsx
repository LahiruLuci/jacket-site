"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Simulating a luxury brand HQ in London
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/London' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-dark-bg text-white pt-24 pb-8 overflow-hidden z-20 mt-[-1px]">
      
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none">
        <Image 
          src="/assets/stocksnap-dark-2598357_1920.webp" 
          alt="Texture" 
          fill 
          className="object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-bg/80 to-dark-bg" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 flex flex-col min-h-[70vh] justify-between">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-16 border-t border-white/10 pt-20">
            
            {/* Brand Intro Column */}
            <div className="lg:col-span-5 flex flex-col justify-between">
               <div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-4 leading-none">
                    Jacket <br />
                    Junction.
                  </h3>
                  <p className="text-white/30 text-[13px] leading-relaxed max-w-xs mb-10">
                     Engineering the absolute pinnacle of motorcycle protection. Technical excellence for the contemporary rider.
                  </p>
               </div>
               
               <div className="flex gap-12">
                   <div>
                       <div className="text-[10px] text-accent font-bold uppercase tracking-widest mb-2">London HQ</div>
                       <div className="text-white/70 font-mono text-sm tracking-wider flex items-center gap-3">
                         <span className="relative flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                         </span>
                         {time} GMT
                       </div>
                   </div>
                   <div className="hidden md:block">
                       <div className="text-[10px] text-accent font-bold uppercase tracking-widest mb-2">Coordinates</div>
                       <div className="text-white/70 font-mono text-sm tracking-wider">51.5074° N, 0.1278° W</div>
                   </div>
               </div>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12 lg:ml-auto">
                <div className="flex flex-col gap-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-2">Shop</h4>
                    <FooterLink href="/shop">The Collection</FooterLink>
                    <FooterLink href="/tech">Technology</FooterLink>
                    <FooterLink href="/about">About Us</FooterLink>
                    <FooterLink href="/journal">Journal</FooterLink>
                </div>

                <div className="flex flex-col gap-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-2">Help</h4>
                    <FooterLink href="/shipping">Shipping</FooterLink>
                    <FooterLink href="/returns">Returns</FooterLink>
                    <FooterLink href="/size">Size Guide</FooterLink>
                    <FooterLink href="/contact">Contact</FooterLink>
                </div>

                <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 mb-2">Follow</h4>
                    <FooterLink href="#">Instagram</FooterLink>
                    <FooterLink href="#">Twitter</FooterLink>
                    <FooterLink href="#">YouTube</FooterLink>
                    <FooterLink href="#">Pinterest</FooterLink>
                </div>
            </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center">
            
            {/* The Massive Cutout Text Parallax Window */}
            <div 
              className="w-full relative overflow-hidden group cursor-pointer select-none mb-10" 
              onClick={scrollToTop}
            >
               <h1 
                 className="text-[10vw] font-bold text-center tracking-tighter uppercase leading-[0.8] bg-clip-text text-transparent bg-[url('/assets/peterlesliemorris-motorcycle-1829461_1920.webp')] bg-cover bg-center bg-no-repeat bg-fixed opacity-40 group-hover:opacity-100 transition-opacity duration-1000"
               >
                  <span className="block transform transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105">
                     Jacket Junction
                  </span>
               </h1>
               
               {/* Hover Overlay Button */}
               <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="bg-white/10 backdrop-blur-md px-8 py-4 rounded-full border border-white/20 flex items-center gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 shadow-2xl">
                     <ArrowUpRight className="text-white w-5 h-5 -rotate-45" />
                     <span className="text-[11px] uppercase tracking-widest font-bold text-white">Back to Top</span>
                  </div>
               </div>
            </div>

            {/* Copyright & Legal */}
            <div className="w-full flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] uppercase tracking-widest text-white/30 font-bold">
               <p>© {new Date().getFullYear()} Jacket Junction. All rights reserved.</p>
               <div className="flex gap-6 mt-4 md:mt-0">
                  <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                  <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
               </div>
            </div>
        </div>

      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className="text-white/60 hover:text-white text-xs md:text-sm font-bold tracking-wide transition-colors relative w-fit group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
