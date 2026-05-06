import Navbar from "@/components/layout/Navbar";
import prisma from "@/lib/prisma";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const product = await (prisma as any).product.findFirst({
      where: { slug: slug },
      include: { category: true }
    });

    if (!product) return { title: "Product Not Found" };

    return {
      title: `${(product as any).name} | Jacket Junction Archives`,
      description: (product as any).description,
    };
  } catch (error) {
    console.error("Metadata Database Error:", error);
    return { title: "Jacket Details | Jacket Junction Archives" };
  }
}

export async function generateStaticParams() {
  try {
    const products = await (prisma as any).product.findMany({
      select: { slug: true },
    });

    return products.map((product: any) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error("Build-time database fetch failed. Falling back to dynamic rendering.", error);
    return [];
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const product = await (prisma as any).product.findFirst({
      where: { slug: slug },
      include: {
        category: true,
      },
    });

    // Fetch related products from the same category
    const relatedProducts = await (prisma as any).product.findMany({
      where: {
        categoryId: (product as any).categoryId,
        NOT: {
          id: (product as any).id,
        },
      },
      take: 4,
      include: {
        category: true,
      },
    });

    return (
      <main className="min-h-screen bg-[#0B0B0B] text-white selection:bg-accent selection:text-black font-inter">
        <Navbar />
        <ProductDetailClient product={product} relatedProducts={relatedProducts} />
      </main>
    );
  } catch (error) {
    console.error("Runtime Database Error:", error);
    notFound();
  }
}
