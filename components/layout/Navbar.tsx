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
  const { getCartCount, openDrawer } = useCart();
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
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Technology", href: "/technology" },
    { name: "Journal", href: "/journal" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500",
        isScrolled 
          ? "py-3 bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm" 
          : "py-6 md:py-8 bg-gradient-to-b from-black/60 via-black/20 to-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Logo - Jacket Junction */}
        <Link href="/" className="flex flex-col group border-l-2 border-accent pl-4 md:pl-6 py-1 relative">
          <span className={cn(
            "text-lg md:text-2xl font-bold tracking-tight leading-none uppercase transition-colors",
            isScrolled ? "text-primary" : "text-white"
          )}>
            Jacket <span className="text-accent">Junction</span>
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className={cn(
              "text-[8px] font-bold tracking-[0.3em] uppercase transition-colors",
              isScrolled ? "text-text-muted" : "text-white/40"
            )}>EST. 2025 // PREMIUM GEAR</span>
          </div>
        </Link>

        {/* Desktop Links */}
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
                    isActive 
                      ? "text-primary" 
                      : isScrolled ? "text-text-muted group-hover:text-primary" : "text-white group-hover:text-white"
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
                {idx !== navLinks.length - 1 && <div className={cn("h-3 w-[1px]", isScrolled ? "bg-black/10" : "bg-white/20")} />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-3 md:gap-8">
          <button className={cn(
            "w-10 h-10 flex items-center justify-center transition-all duration-300 rounded-full",
            isScrolled ? "text-text-muted hover:text-accent hover:bg-black/5" : "text-white hover:text-accent hover:bg-white/10"
          )}>
            <Search strokeWidth={2} size={20} />
          </button>
          
          <div className={cn("h-8 w-[1px] hidden sm:block", isScrolled ? "bg-black/10" : "bg-white/20")} />

          <button 
            onClick={openDrawer}
            className={cn(
              "flex items-center gap-2 md:gap-3 group px-4 md:px-6 py-2 md:py-2.5 rounded-lg border transition-all duration-300 cursor-pointer flex-shrink-0",
              isScrolled 
                ? "bg-primary text-white border-transparent hover:bg-accent" 
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            )}
          >
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest">
              Cart ({cartCount})
            </span>
            <ShoppingCart strokeWidth={2} className="w-4 h-4 md:w-5 md:h-5" />
          </button>

          <button 
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors z-[210] flex-shrink-0",
              isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 bg-white z-[200] flex flex-col lg:hidden"
          >
            <div className="p-8 flex justify-between items-center border-b border-black/5">
              <span className="text-lg font-bold tracking-tight text-primary uppercase">Navigation</span>
            </div>

            <div className="flex-1 flex flex-col justify-center p-8 gap-8">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <Link
                      href={link.href}
                      className="group flex items-end gap-4"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className={cn(
                        "text-[10px] font-bold tracking-widest",
                        isActive ? "text-accent" : "text-text-muted"
                      )}>0{idx + 1}</span>
                      <span className={cn(
                        "text-4xl md:text-5xl font-bold uppercase tracking-tight transition-all duration-300",
                        isActive ? "text-accent" : "text-primary group-hover:text-accent"
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
                className="mt-8 pt-8 border-t border-black/5"
              >
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openDrawer();
                  }}
                  className="flex items-center gap-6 w-full text-left"
                >
                  <div className="w-16 h-16 rounded-2xl bg-accent text-white flex items-center justify-center shadow-lg">
                    <ShoppingCart size={32} strokeWidth={2} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold uppercase tracking-tight text-primary">
                      Cart ({cartCount})
                    </span>
                    <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
                      View your selection
                    </span>
                  </div>
                </button>
              </motion.div>
            </div>

            <div className="p-8 border-t border-black/5 bg-secondary">
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Connect</span>
                  <Link href="/account" className="text-sm font-bold text-primary hover:text-accent transition-colors">Account</Link>
                  <Link href="/support" className="text-sm font-bold text-primary hover:text-accent transition-colors">Support</Link>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">HQ</span>
                  <span className="text-sm font-bold text-primary">London, UK</span>
                  <span className="text-sm font-bold text-primary">Global Dispatch</span>
                </div>
              </div>
              <p className="text-[9px] tracking-widest text-text-muted uppercase font-bold text-center">Jacket Junction // 2025</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
 };

export default Navbar;
