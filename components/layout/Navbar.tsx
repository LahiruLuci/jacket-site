"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-store";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { getCartCount, openDrawer } = useCart();
  const cartCount = getCartCount();

  const isLightPage = pathname.startsWith("/jacket/") || pathname === "/about" || pathname === "/journal";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Technology", href: "/technology" },
    { name: "Journal", href: "/journal" },
    { name: "About", href: "/about" },
  ];

  return (
    <React.Fragment>
      <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled 
          ? "py-2 bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-sm" 
          : isLightPage
            ? "py-4 md:py-6 bg-white/50 backdrop-blur-sm"
            : "py-4 md:py-6 bg-gradient-to-b from-black/60 via-black/20 to-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex flex-col group border-l-2 border-accent pl-4 md:pl-6 py-1 relative">
          <span className={cn(
            "text-base md:text-xl font-bold tracking-tight leading-none uppercase transition-colors",
            (isScrolled || isLightPage) ? "text-primary" : "text-white"
          )}>
            Jacket <span className="text-accent">Junction</span>
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn(
              "text-[8px] font-bold tracking-[0.3em] uppercase transition-colors",
              (isScrolled || isLightPage) ? "text-text-muted" : "text-white/40"
            )}>EST. 2025 // PREMIUM GEAR</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <React.Fragment key={link.name}>
                <Link
                  href={link.href}
                  className="px-4 py-2 group relative overflow-hidden"
                >
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 relative z-10",
                    isActive 
                      ? (isScrolled || isLightPage ? "text-primary" : "text-accent") 
                      : (isScrolled || isLightPage ? "text-text-muted group-hover:text-primary" : "text-white group-hover:text-accent")
                  )}>
                    {link.name}
                  </span>
                  <motion.div 
                    className={cn(
                      "absolute bottom-0 left-0 w-full h-[2px] bg-accent transition-transform duration-500 origin-left",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
                {idx !== navLinks.length - 1 && <div className={cn("h-3 w-[1px]", (isScrolled || isLightPage) ? "bg-black/10" : "bg-white/20")} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-8">
          <button className={cn(
            "w-10 h-10 flex items-center justify-center transition-all duration-300 rounded-full",
            (isScrolled || isLightPage) ? "text-text-muted hover:text-accent hover:bg-black/5" : "text-white hover:text-accent hover:bg-white/10"
          )}>
            <Search strokeWidth={2} size={20} />
          </button>
          
          <div className={cn("h-8 w-[1px] hidden sm:block", (isScrolled || isLightPage) ? "bg-black/10" : "bg-white/20")} />

          <button 
            onClick={openDrawer}
            className={cn(
              "relative flex items-center justify-center w-10 h-10 md:w-auto md:h-auto md:px-5 md:py-2 rounded-full border transition-all duration-300 cursor-pointer flex-shrink-0",
              (isScrolled || isLightPage)
                ? "bg-primary text-white border-transparent md:hover:bg-accent" 
                : "bg-accent md:bg-white/10 text-white border-transparent md:border-white/20 md:hover:bg-white/20 shadow-lg md:shadow-none"
            )}
          >
            <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest mr-3">
              Cart ({cartCount})
            </span>
            <div className="relative">
              <ShoppingCart strokeWidth={2} className="w-4 h-4 md:w-4 md:h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center md:hidden shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
          </button>

          <button 
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors z-[210] flex-shrink-0",
              isMobileMenuOpen ? "text-white" : (isScrolled || isLightPage) ? "text-primary" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

    </nav>

    {/* Mobile Menu - Moved outside nav container for better viewport reference */}
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-0 bg-[#1A1A1A] z-[300] flex flex-col lg:hidden h-[100dvh] w-full overflow-y-auto"
        >
          <div className="p-6 md:p-8 flex justify-between items-center border-b border-white/10 flex-shrink-0">
            <span className="text-lg font-bold tracking-tight text-white uppercase">Navigation</span>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-white hover:text-accent transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col py-12 px-8 gap-8 overflow-y-auto">
            {(navLinks || []).map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                >
                  <Link
                    href={link.href}
                    className="group flex items-center gap-5 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className={cn(
                      "text-[9px] font-bold tracking-[0.2em] min-w-[30px]",
                      isActive ? "text-accent" : "text-white/30"
                    )}>0{idx + 1}</span>
                    <span className={cn(
                      "text-xl md:text-3xl font-bold uppercase tracking-tight transition-all duration-500",
                      isActive ? "text-accent" : "text-white/90 group-hover:text-accent"
                    )}>
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              );
            })}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 pt-8 border-t border-white/5"
            >
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openDrawer();
                }}
                className="flex items-center gap-6 w-full text-left py-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg">
                  <ShoppingCart size={24} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold uppercase tracking-tight text-white">
                    Cart ({cartCount})
                  </span>
                  <span className="text-[8px] font-bold tracking-widest text-accent uppercase">
                    View your selection
                  </span>
                </div>
              </button>

              <div className="mt-8 grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Connect</span>
                  <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold text-white/60 hover:text-accent transition-colors">Account</Link>
                  <Link href="/support" onClick={() => setIsMobileMenuOpen(false)} className="text-xs font-bold text-white/60 hover:text-accent transition-colors">Support</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">HQ</span>
                  <span className="text-xs font-bold text-white/60">London, UK</span>
                  <span className="text-xs font-bold text-white/60">Global Dispatch</span>
                </div>
              </div>
              <p className="mt-12 text-[8px] tracking-[0.4em] text-white/5 uppercase font-bold text-center pb-8">Jacket Junction // Archival Edition</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </React.Fragment>
  );
};

export default Navbar;
