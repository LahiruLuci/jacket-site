import Navbar from "@/components/layout/Navbar";
import JournalClient from "@/components/journal/JournalClient";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal | Jacket Junction Archives",
  description: "Intel, culture, and technical blueprints from the front lines of mechanical defense. Curated for those who ride beyond the grid.",
};

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white selection:bg-accent selection:text-black font-inter overflow-x-hidden">
      <Navbar />

      <JournalClient />

      {/* FOOTER MINI */}
      <footer className="py-12 bg-black border-t border-white/5">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[8px] tracking-[0.5em] text-white/20 uppercase font-bold">Archives // 2024 Edition</p>
          <div className="flex gap-8">
            <Link href="#" className="text-[8px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[8px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">Shipping Ops</Link>
            <Link href="#" className="text-[8px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors">Global Network</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
