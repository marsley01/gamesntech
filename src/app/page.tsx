import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { StatsBanner } from "@/components/home/StatsBanner";
import { CategoriesShowcase } from "@/components/home/CategoriesShowcase";
import { CTABanner } from "@/components/home/CTABanner";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <StatsBanner />
      <CategoriesShowcase />
      <CTABanner />
    </main>
  );
}
