import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { CategoryUniverse } from "@/components/sections/CategoryUniverse";
import { TrendingProducts } from "@/components/sections/TrendingProducts";
import { WhyGNT } from "@/components/sections/WhyGNT";
import { CustomerReviews } from "@/components/sections/CustomerReviews";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { products, categories } from "@/lib/data";

export default function HomePage() {
  const getProductCount = (slug: string) =>
    products.filter((p) => p.category === slug).length;

  const universeData = categories.map((cat) => {
    const accents = {
      gaming: { accent: "blue" as const, gradient: "bg-gradient-to-b from-accent-blue/[0.03] via-transparent to-transparent", glow: "rgba(37,99,235,0.08)", icon: "🎮" },
      software: { accent: "purple" as const, gradient: "bg-gradient-to-b from-accent-purple/[0.03] via-transparent to-transparent", glow: "rgba(124,58,237,0.08)", icon: "💻" },
      ai: { accent: "cyan" as const, gradient: "bg-gradient-to-b from-accent-cyan/[0.03] via-transparent to-transparent", glow: "rgba(34,211,238,0.08)", icon: "🤖" },
      "gift-cards": { accent: "gold" as const, gradient: "bg-gradient-to-b from-accent-gold/[0.03] via-transparent to-transparent", glow: "rgba(250,204,21,0.08)", icon: "🎁" },
      streaming: { accent: "purple" as const, gradient: "bg-gradient-to-b from-accent-purple/[0.02] via-transparent to-transparent", glow: "rgba(124,58,237,0.05)", icon: "📺" },
    };
    return { ...cat, ...accents[cat.slug as keyof typeof accents] };
  });

  return (
    <main>
      <HeroSection />
      <FeaturedProducts />

      {universeData.map((uni, i) => (
        <CategoryUniverse
          key={uni.slug}
          title={`${uni.name} Universe`}
          subtitle={uni.name}
          description={uni.description}
          href={`/store/${uni.slug}`}
          accent={uni.accent}
          icon={uni.icon}
          gradient={uni.gradient}
          glowColor={uni.glow}
          productCount={getProductCount(uni.slug)}
          reversed={i % 2 === 1}
        />
      ))}

      <TrendingProducts />
      <WhyGNT />
      <CustomerReviews />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
