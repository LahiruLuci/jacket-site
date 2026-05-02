import Navbar from "@/components/layout/Navbar";
import JournalDetailClient from "@/components/journal/JournalDetailClient";
import Link from "next/link";
import { ARTICLES } from "@/lib/journal-data";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = ARTICLES.find((a) => a.id === params.id);
  
  if (!article) {
    return {
      title: "Article Not Found | Jacket Junction",
    };
  }

  return {
    title: `${article.title} | Jacket Junction Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default function JournalDetailPage({ params }: Props) {
  const article = ARTICLES.find((a) => a.id === params.id);

  if (!article) {
    return (
      <div className="min-h-screen bg-[#0B0B0B] text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Article Not Found</h1>
        <Link href="/journal" className="px-8 py-4 bg-accent text-black text-xs font-bold uppercase tracking-widest">
          Back to Journal
        </Link>
      </div>
    );
  }

  const relatedArticles = ARTICLES.filter((a) => a.id !== article.id).slice(0, 2);

  return (
    <main className="min-h-screen bg-[#0B0B0B] text-white selection:bg-accent selection:text-black font-inter overflow-x-hidden">
      <Navbar />

      <JournalDetailClient article={article} relatedArticles={relatedArticles} />

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
