"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useMotionTemplate, 
  AnimatePresence 
} from "framer-motion";
import { ArrowRight, Fingerprint, ShieldCheck } from "lucide-react";

export default function Newsletter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // 3D Card Physics
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [0, 1], [15, -15]);
  const rotateY = useTransform(springX, [0, 1], [-15, 15]);

  const reflexX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const reflexY = useTransform(springY, [0, 1], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${reflexX} ${reflexY}, rgba(255,255,255,0.2) 0%, transparent 60%)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x);
      mouseY.set(y);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  return (
    <section 
      ref={containerRef} 
      className="relative bg-dark-bg py-24 md:py-32 overflow-hidden border-t border-white/5 flex items-center justify-center"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <Image 
          src="/assets/stocksnap-dark-2598357_1920.webp" 
          alt="Texture" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--dark-bg)_80%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 relative z-10 items-center">
        
        {/* Left Side: Form */}
        <div className="flex flex-col z-20 max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-accent" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
              Exclusive Updates
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight text-white leading-[0.95] mb-8">
            Join The <br />
            <span className="text-accent">Insider.</span>
          </h2>

          <p className="text-white/50 text-base md:text-lg leading-relaxed mb-12">
            Be the first to explore new collection drops, technical innovations, and curated lifestyle content delivered directly to your inbox.
          </p>

          <div className="relative">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 p-8 border border-accent/30 bg-accent/5 rounded-2xl backdrop-blur-md"
                >
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                    <ShieldCheck className="text-accent" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-wider text-sm uppercase mb-1">Subscription Confirmed</h4>
                    <p className="text-white/40 text-xs">You are now part of our exclusive community.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  className="relative group"
                >
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <div className="relative flex items-center border-b border-white/10 pb-6 group-hover:border-accent/50 transition-colors duration-500 overflow-hidden">
                    
                    {/* Animated Line Focus */}
                    <div className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-focus-within:w-full transition-all duration-700" />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter your email address"
                      disabled={status === "loading"}
                      className="w-full bg-transparent outline-none text-white text-xl md:text-3xl font-bold uppercase tracking-tight placeholder:text-white/10 disabled:opacity-50"
                    />
                    
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="ml-4 p-3 bg-accent text-white rounded-full hover:scale-110 transition-all duration-300 disabled:opacity-50 flex-shrink-0"
                    >
                      {status === "loading" ? (
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full"
                        />
                      ) : (
                        <ArrowRight size={24} />
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Floating 3D Card */}
        <div className="flex items-center justify-center lg:justify-end perspective-[1200px] h-full w-full">
          <motion.div
            style={{ 
              rotateX, 
              rotateY, 
              transformStyle: "preserve-3d" 
            }}
            className="relative w-[340px] md:w-[460px] aspect-[1.6] rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0A0B0C] shadow-2xl flex-shrink-0 cursor-crosshair group z-30 overflow-hidden"
          >
            {/* Dynamic Light Glare */}
            <motion.div 
              style={{ background: glareBackground }}
              className="absolute inset-0 z-20 mix-blend-overlay pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-40"
            />
            
            {/* Texture background inside card */}
            <div className="absolute inset-0 z-0 opacity-10">
              <Image 
                src="/assets/stocksnap-dark-2598357_1920.webp" 
                alt="Card Texture" 
                fill 
                className="object-cover" 
              />
            </div>

            {/* Content inside the card */}
            <div 
              className="relative z-10 w-full h-full p-8 md:p-10 flex flex-col justify-between"
              style={{ transform: "translateZ(40px)" }}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1 text-accent">
                  <h4 className="text-2xl font-bold tracking-tight uppercase">Jacket Junction</h4>
                  <span className="text-[8px] tracking-[0.4em] uppercase font-bold text-white/40">Premium Membership</span>
                </div>
                <div className="w-10 h-10 border border-accent/20 rounded-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-accent/10 rounded-full animate-pulse" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-[10px] text-white/20 font-mono tracking-[0.3em]">
                  MEMBER ID: 2025-JJ-PREMIUM
                </div>
                <div className="text-lg md:text-2xl font-bold text-white tracking-[0.1em] uppercase">
                  Exclusive Privilege
                </div>
              </div>
            </div>

            {/* Glowing Edge on Hover */}
            <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/20 transition-all duration-700 rounded-2xl z-20 pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
