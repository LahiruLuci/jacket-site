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

  // Map mouse percentage [0, 1] to rotation degrees [-20, 20]
  const rotateX = useTransform(springY, [0, 1], [20, -20]);
  const rotateY = useTransform(springX, [0, 1], [-20, 20]);

  // Lighting reflex based on mouse
  const reflexX = useTransform(springX, [0, 1], ["0%", "100%"]);
  const reflexY = useTransform(springY, [0, 1], ["0%", "100%"]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${reflexX} ${reflexY}, rgba(255,255,255,0.3) 0%, transparent 60%)`;

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

  // Handle Form Submission
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
      className="relative bg-[#111213] py-24 md:py-32 overflow-hidden border-t border-white/5 flex items-center justify-center"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <Image 
          src="/assets/stocksnap-dark-2598357_1920.webp" 
          alt="Texture" 
          fill 
          className="object-cover grayscale"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#111213_80%)]" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-12 relative z-10 items-center">
        
        {/* Left Side: Editorial Typography & Form */}
        <div className="flex flex-col z-20 max-w-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-[#C9A227]" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] text-[#C9A227]">
              Priority Allocation
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-[0.9] mb-8">
            Join The <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}>
              Elite.
            </span>
          </h2>

          <p className="text-white/50 text-sm md:text-base leading-relaxed font-light mb-12">
            Get early access to new collection drops, exclusive offers, and the latest in motorcycle safety technology delivered straight to your inbox.
          </p>

          <div className="relative">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-4 p-6 border border-[#C9A227]/30 bg-[#C9A227]/5 rounded-xl backdrop-blur-md"
                >
                  <div className="w-12 h-12 rounded-full bg-[#C9A227]/20 flex items-center justify-center">
                    <ShieldCheck className="text-[#C9A227]" size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-1">Access Granted</h4>
                    <p className="text-white/50 text-xs">Your coordinates have been securely encrypted.</p>
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
                  <div className="relative flex items-center border-b border-white/20 pb-4 group-hover:border-white/50 transition-colors duration-500 overflow-hidden">
                    
                    {/* Animated Line Focus */}
                    <div className="absolute bottom-0 left-0 h-[1px] bg-[#C9A227] w-0 group-focus-within:w-full transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]" />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="ENTER YOUR EMAIL IDENTIFIER //..."
                      disabled={status === "loading"}
                      className="w-full bg-transparent outline-none text-white text-lg md:text-2xl font-black uppercase tracking-tight placeholder:text-white/20 disabled:opacity-50"
                    />
                    
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="ml-4 p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all duration-300 disabled:opacity-50 flex-shrink-0"
                    >
                      {status === "loading" ? (
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-6 h-6 border-2 border-white/20 border-t-[#C9A227] rounded-full"
                        />
                      ) : (
                        <ArrowRight size={28} />
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Floating 3D Dark Card */}
        <div className="flex items-center justify-center lg:justify-end perspective-[1200px] h-full w-full">
          <motion.div
            style={{ 
              rotateX, 
              rotateY, 
              transformStyle: "preserve-3d" 
            }}
            className="relative w-[320px] md:w-[420px] aspect-[1.586] rounded-2xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0A0B0C] shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex-shrink-0 cursor-crosshair group z-30 overflow-hidden"
          >
            {/* Dynamic Light Glare */}
            <motion.div 
              style={{ background: glareBackground }}
              className="absolute inset-0 z-20 mix-blend-overlay pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60"
            />
            
            {/* Texture background inside card */}
            <div className="absolute inset-0 z-0 opacity-20 mix-blend-color-dodge">
              <Image 
                src="/assets/stocksnap-dark-2598357_1920.webp" 
                alt="Card Texture" 
                fill 
                className="object-cover grayscale" 
              />
            </div>

            {/* Content inside the card - using preserve-3d to float text */}
            <div 
              className="relative z-10 w-full h-full p-6 md:p-8 flex flex-col justify-between transform-gpu"
              style={{ transform: "translateZ(30px)" }} // Make text float above the card background
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1 text-[#C9A227]">
                  <h4 className="text-xl font-bold italic tracking-tighter" style={{ fontFamily: "var(--font-serif)" }}>Vanguard</h4>
                  <span className="text-[6px] tracking-[0.4em] uppercase font-black">Authorized Member</span>
                </div>
                <Fingerprint size={28} className="text-white/20" />
              </div>

              <div className="space-y-4">
                <div className="text-[10px] text-white/30 font-mono tracking-[0.3em]">
                  ID: 0004-9812-XX-SYND
                </div>
                <div className="text-sm md:text-xl font-black text-white tracking-[0.3em] uppercase">
                  Classified Access
                </div>
              </div>
            </div>

            {/* Glowing Edge on Hover */}
            <div className="absolute inset-0 border border-[#C9A227]/0 group-hover:border-[#C9A227]/30 transition-colors duration-700 rounded-2xl z-20 pointer-events-none mask-image-gradient" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
