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
  const featuredProducts = await prisma.product.findMany({
    where: {
      isFeatured: true,
    },
    include: {
      category: true,
    },
    take: 8,
  });

  // Map to the format expected by the component
  const formattedProducts = featuredProducts.map(p => ({
    ...p,
    category: p.category.name,
  }));

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
      <FeaturedProduct />
      <Reviews />
      <CommunityFeed />
      <Newsletter />
    </main>
  );
}
