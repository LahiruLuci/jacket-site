import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import FeaturedProductsGrid from "@/components/sections/FeaturedProductsGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import BrandValues from "@/components/sections/BrandValues";
import Lifestyle from "@/components/sections/Lifestyle";
import Technology from "@/components/sections/Technology";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import Reviews from "@/components/sections/Reviews";
import CommunityFeed from "@/components/sections/CommunityFeed";
import Newsletter from "@/components/sections/Newsletter";

import prisma from "@/lib/prisma";

export default async function Home() {
  let formattedProducts: any[] = []; // Keeping any[] for the grid as it's complex, but masterpiece is better
  let masterpieceProduct: any | undefined = undefined;

  try {
    // Attempt to fetch featured products for the grid
    const featuredProducts = await prisma.product.findMany({
      where: { isFeatured: true },
      include: { category: true },
      take: 8,
    });

    if (featuredProducts && featuredProducts.length > 0) {
      formattedProducts = featuredProducts.map(p => ({
        ...p,
        category: p.category?.name || "Jacket",
      }));
      
      // Use the first featured product as the masterpiece for now
      masterpieceProduct = featuredProducts[0];
    }
  } catch (err) {
    // Silently fallback to hardcoded data if DB is unreachable
    console.log("Database connection failed. Using sample data instead.");
    formattedProducts = [];
    masterpieceProduct = undefined;
  }

  return (
    <main className="min-h-screen bg-[#161718] text-white">
      <Navbar />
      <Hero />
      <FeaturedProductsGrid products={formattedProducts} />
      <WhyChooseUs />
      <CategoryShowcase />
      <BrandValues />
      <Lifestyle />
      <Technology />
      <FeaturedProduct product={masterpieceProduct} />
      <Reviews />
      <CommunityFeed />
      <Newsletter />
    </main>
  );
}
