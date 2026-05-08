"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  CheckCircle2, 
  AlertCircle,
  Loader2,
  ChevronRight
} from "lucide-react";
import { useCart } from "@/lib/cart-store";
import Navbar from "@/components/layout/Navbar";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getCartTotal, clearCart } = useCart();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (items.length === 0 && !isSubmitting) {
      // Small delay to allow hydration
      const timer = setTimeout(() => {
        if (items.length === 0) router.push("/cart");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [items, router, isSubmitting]);

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Full name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.address.trim()) errors.address = "Delivery address is required";
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (items.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          customerAddress: formData.address,
          totalAmount: getCartTotal(),
          items: items.map(item => ({
            productId: item.productId,
            productName: item.name,
            productSlug: item.slug,
            productImage: item.image,
            size: item.size,
            quantity: item.quantity,
            unitPrice: item.price,
            lineTotal: item.price * item.quantity
          }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to process order. Please try again.");
      }

      // Success
      clearCart();
      router.push(`/order-success?orderId=${data.orderId}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const subtotal = getCartTotal();
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pt-32 pb-24 px-6 overflow-x-hidden">
      <Navbar />
      
      <div className="max-w-[1400px] mx-auto">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-4 mb-12 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
           <Link href="/cart" className="hover:text-accent transition-colors">Bag</Link>
           <ChevronRight size={12} />
           <span className="text-white">Checkout</span>
           <ChevronRight size={12} />
           <span className="opacity-50">Confirmation</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          
          {/* Left Side: Form */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Procurement <span className="text-white/20">Details.</span></h1>
              <p className="text-white/40 text-sm md:text-base font-light">Complete the secure manifest to finalize your archive acquisition.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Full Name */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 block px-1">Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={cn(
                      "w-full bg-white/5 border rounded-2xl p-5 text-sm focus:outline-none transition-all duration-300",
                      fieldErrors.name ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-accent focus:bg-white/10"
                    )}
                  />
                  {fieldErrors.name && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider px-1">{fieldErrors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 block px-1">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className={cn(
                      "w-full bg-white/5 border rounded-2xl p-5 text-sm focus:outline-none transition-all duration-300",
                      fieldErrors.email ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-accent focus:bg-white/10"
                    )}
                  />
                  {fieldErrors.email && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider px-1">{fieldErrors.email}</p>}
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 block px-1">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+94 7X XXX XXXX"
                  className={cn(
                    "w-full bg-white/5 border rounded-2xl p-5 text-sm focus:outline-none transition-all duration-300",
                    fieldErrors.phone ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-accent focus:bg-white/10"
                  )}
                />
                {fieldErrors.phone && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider px-1">{fieldErrors.phone}</p>}
              </div>

              {/* Address */}
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 block px-1">Delivery Address</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Street, City, Postcode"
                  className={cn(
                    "w-full bg-white/5 border rounded-2xl p-5 text-sm focus:outline-none transition-all duration-300 resize-none",
                    fieldErrors.address ? "border-red-500/50 bg-red-500/5" : "border-white/10 focus:border-accent focus:bg-white/10"
                  )}
                />
                {fieldErrors.address && <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider px-1">{fieldErrors.address}</p>}
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-center gap-4 text-red-500 text-sm font-bold"
                  >
                    <AlertCircle size={20} />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full h-20 rounded-full flex items-center justify-center gap-4 text-base font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl relative overflow-hidden cursor-pointer",
                  isSubmitting ? "bg-white/10 text-white/20" : "bg-accent text-black hover:scale-[1.02] active:scale-[0.98] shadow-[0_20px_50px_rgba(201,162,39,0.3)]"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={24} className="animate-spin" /> Processing Acquire...
                  </>
                ) : (
                  <>
                    Complete Acquisition <ArrowLeft size={20} className="rotate-180" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-12">
             <div className="bg-[#111111] border border-white/10 rounded-[3rem] p-10 md:p-12 space-y-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="space-y-6">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Acquisition Summary</h2>
                  <div className="max-h-[300px] overflow-y-auto pr-4 space-y-8 scrollbar-thin scrollbar-thumb-white/10">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.size}`} className="flex items-center gap-6 group">
                        <div className="relative w-16 h-20 rounded-xl overflow-hidden bg-black/40 flex-shrink-0 border border-white/5">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Size {item.size}</p>
                          <p className="text-sm font-black uppercase tracking-tight text-white leading-snug">{item.name}</p>
                          {item.subtitle && <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest">{item.subtitle}</p>}
                          <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1">
                            {item.quantity} × ${item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black">${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-white/5">
                  <div className="flex justify-between items-center text-xs font-bold text-white/40 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="text-white">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold text-white/40 uppercase tracking-widest">
                    <span>Logistics</span>
                    <span className="text-accent italic uppercase tracking-tighter">Complimentary</span>
                  </div>
                  <div className="h-[1px] bg-white/5 w-full" />
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Final Amount</span>
                      <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                        ${total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Trust Info */}
                <div className="grid grid-cols-1 gap-6 pt-6">
                  <div className="flex items-center gap-4 text-white/40">
                    <ShieldCheck size={18} className="text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Military Grade Encryption</span>
                  </div>
                  <div className="flex items-center gap-4 text-white/40">
                    <Truck size={18} className="text-white/20" />
                    <span className="text-[10px] font-bold uppercase tracking-widest leading-none">Insured Global Logistics</span>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
