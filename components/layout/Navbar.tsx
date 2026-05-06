"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/#featured-products" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Technology", href: "/technology" },
    { name: "Sizing", href: "/sizing" },
    { name: "Journal", href: "/journal" },
  ];

  const formatCount = (count: number) => {
    return count < 10 ? `0${count}` : count;
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled 
          ? "py-3 bg-[#0B0B0B]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl" 
          : "py-6 md:py-8 bg-gradient-to-b from-black/90 via-black/40 to-transparent backdrop-blur-[2px]"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo - Premium Typography */}
        <Link href="/#featured-products" className="flex flex-col group border-l-2 border-accent pl-4 md:pl-6 py-1 relative">
          <span className="text-base sm:text-lg md:text-2xl font-black tracking-[0.1em] md:tracking-[0.2em] text-white leading-none uppercase">
            Jacket <span className="text-accent">Junction</span>
          </span>
          <div className="flex items-center gap-2 mt-1 md:mt-2">
            <span className="text-[6px] md:text-[8px] font-bold tracking-[0.4em] text-white/40 uppercase">Archives // MMXXIV</span>
          </div>
        </Link>

        {/* Desktop Links - Refined & High Contrast */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <React.Fragment key={link.name}>
                <Link
                  href={link.href}
                  className="px-6 py-2 group relative overflow-hidden"
                >
                  <span className={cn(
                    "text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 relative z-10",
                    isActive ? "text-white" : "text-white/70 group-hover:text-white"
                  )}>
                    {link.name}
                  </span>
                  <motion.div 
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-[1px] bg-accent transition-transform duration-500 origin-left",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
                {idx !== navLinks.length - 1 && <div className="h-3 w-[1px] bg-white/10" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Action Icons - Premium Detailing */}
        <div className="flex items-center gap-3 md:gap-8">
          <button className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center text-white/60 hover:text-accent transition-all duration-300 hover:bg-white/5 rounded-full">
            <Search strokeWidth={2} className="w-5 h-5 md:w-5.5 md:h-5.5" />
          </button>
          
          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

          <Link 
            href="/cart"
            className="flex items-center gap-3 md:gap-5 group bg-white/10 md:bg-white/5 hover:bg-white/10 px-4 md:px-6 py-2.5 md:py-3 rounded-full border border-white/10 md:border-white/5 transition-all duration-300"
          >
            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[11px] md:text-xs font-black uppercase tracking-widest text-white">Cart</span>
              <span className="text-[9px] md:text-[11px] text-accent font-bold">{formatCount(cartCount)} UNITS</span>
            </div>
            <div className="relative">
              <ShoppingCart strokeWidth={2} className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:text-accent transition-colors" />
              <span className="absolute -top-3 -right-3 w-5.5 h-5.5 md:w-6 md:h-6 bg-accent text-black text-[10px] md:text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-[#0B0B0B]">{cartCount}</span>
            </div>
          </Link>

          <button 
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors z-[210]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full Screen Solid Luxury Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ type: "tween", duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black z-[200] flex flex-col lg:hidden"
          >
            {/* Background Texture for Menu */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
            </div>

            {/* Header Area inside Mobile Menu */}
            <div className="p-8 flex justify-between items-center border-b border-white/5 bg-black z-10">
              <span className="text-lg font-black tracking-[0.2em] text-white uppercase">Menu</span>
              <div className="w-10 h-10" /> 
            </div>

            {/* Navigation Links Area - Solid Background to prevent transparency issues */}
            <div className="flex-1 flex flex-col justify-center p-8 gap-8 bg-black z-10">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.1 }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-end gap-4"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className={cn(
                        "text-[10px] font-mono",
                        isActive ? "text-white" : "text-accent"
                      )}>0{idx + 1}</span>
                      <span className={cn(
                        "text-3xl md:text-5xl font-black uppercase tracking-tighter transition-all duration-300",
                        isActive ? "text-accent" : "text-white group-hover:text-accent"
                      )}>
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              {/* Added Cart to Mobile Menu for better visibility */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + navLinks.length * 0.1 }}
                className="mt-4 pt-8 border-t border-white/10"
              >
                <Link
                  href="/cart"
                  className={cn(
                    "group flex items-center gap-6 transition-all duration-500",
                    pathname === "/cart" ? "opacity-100" : "opacity-70 hover:opacity-100"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center transition-colors duration-500",
                    pathname === "/cart" ? "bg-white text-black" : "bg-accent text-black"
                  )}>
                    <ShoppingCart size={32} strokeWidth={2.5} />
                  </div>
                  <div className="flex flex-col">
                    <span className={cn(
                      "text-4xl md:text-6xl font-black uppercase tracking-tighter transition-all duration-300",
                      pathname === "/cart" ? "text-accent" : "text-white group-hover:text-accent"
                    )}>
                      Cart
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.3em] text-accent uppercase">
                      {pathname === "/cart" ? "Currently Viewing" : `${formatCount(cartCount)} Items // View Bag`}
                    </span>
                  </div>
                </Link>
              </motion.div>
            </div>

            {/* Bottom Footer Area inside Mobile Menu */}
            <div className="p-8 border-t border-white/5 bg-black z-10">
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Connect</span>
                  <Link href="/account" className="text-sm font-bold text-white hover:text-accent transition-colors">My Account</Link>
                  <Link href="/support" className="text-sm font-bold text-white hover:text-accent transition-colors">Support</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Location</span>
                  <span className="text-sm font-bold text-white">Archives // NYC</span>
                  <span className="text-sm font-bold text-white">Global Dispatch</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-[8px] tracking-[0.5em] text-white/20 uppercase font-bold">Archives // 2024</p>
                <div className="w-12 h-[1px] bg-accent/30" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
