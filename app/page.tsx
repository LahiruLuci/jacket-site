import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import CategoryShowcase from "@/components/sections/CategoryShowcase";
import BrandValues from "@/components/sections/BrandValues";
import Lifestyle from "@/components/sections/Lifestyle";
import Technology from "@/components/sections/Technology";
import FeaturedProduct from "@/components/sections/FeaturedProduct";
import Reviews from "@/components/sections/Reviews";
import CommunityFeed from "@/components/sections/CommunityFeed";
import Newsletter from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#161718] text-white">
      <Navbar />
      <Hero />
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
