import prisma from "@/lib/prisma";
import React from "react";
import Navbar from "@/components/layout/Navbar";
import { 
  Package, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Force dynamic to get latest orders
export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    include: {
      items: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white pt-32 pb-24 px-6">
      <Navbar />
      
      <div className="max-w-[1400px] mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.5em]">Command Center</span>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Archive <span className="text-white/20">Manifests.</span>
            </h1>
          </div>
          <div className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl">
             <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block mb-1">Total Acquisitions</span>
             <span className="text-2xl font-black">{orders.length}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-[#111111] border border-white/10 rounded-[2.5rem] p-8 md:p-12 hover:border-accent/30 transition-all group overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
                {/* Order Header / Status */}
                <div className="lg:col-span-3 space-y-6">
                   <div className="space-y-2">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Order ID</span>
                      <p className="text-[10px] font-mono text-white/60 truncate">{order.id}</p>
                   </div>
                   
                   <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent">
                      <Clock size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{order.status}</span>
                   </div>

                   <div className="space-y-1">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Acquisition Total</span>
                      <p className="text-3xl font-black">${order.totalAmount.toLocaleString()}</p>
                   </div>
                </div>

                {/* Customer Details */}
                <div className="lg:col-span-4 space-y-6 bg-white/5 p-8 rounded-3xl border border-white/5">
                   <h3 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4 mb-4">Customer Manifest</h3>
                   <div className="space-y-4">
                      <div className="flex items-center gap-4">
                         <User size={16} className="text-accent" />
                         <span className="text-sm font-bold">{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <Mail size={16} className="text-white/20" />
                         <span className="text-sm text-white/60">{order.customerEmail}</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <Phone size={16} className="text-white/20" />
                         <span className="text-sm text-white/60">{order.customerPhone}</span>
                      </div>
                      <div className="flex items-start gap-4">
                         <MapPin size={16} className="text-white/20 mt-1" />
                         <span className="text-sm text-white/60 leading-relaxed">{order.customerAddress}</span>
                      </div>
                   </div>
                </div>

                {/* Items */}
                <div className="lg:col-span-5 space-y-6">
                   <h3 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-4 mb-4">Archived Items</h3>
                   <div className="space-y-6 max-h-[200px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-6">
                           <div className="relative w-12 h-16 rounded-xl overflow-hidden bg-black flex-shrink-0">
                              <Image src={item.productImage} alt={item.productName} fill className="object-cover" />
                           </div>
                           <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Size {item.size}</p>
                              <p className="text-xs font-black uppercase tracking-tight text-white truncate">{item.productName}</p>
                              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">
                                {item.quantity} × ${item.unitPrice.toLocaleString()}
                              </p>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="mt-12 pt-6 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
                 <span>Recorded on: {new Date(order.createdAt).toLocaleString()}</span>
                 <span className="flex items-center gap-2 text-accent group-hover:translate-x-2 transition-transform cursor-pointer">
                    View Manifest Details <ExternalLink size={12} />
                 </span>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-32 space-y-6 bg-white/5 rounded-[3rem] border border-dashed border-white/10">
               <Package size={48} className="mx-auto text-white/10" />
               <p className="text-white/40 font-bold uppercase tracking-widest">No archives acquired yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
