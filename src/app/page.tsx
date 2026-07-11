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
    const config: Record<string, { accent: "orange" | "blue" | "purple"; gradient: string; glow: string; icon: string }> = {
      gaming: { accent: "orange", gradient: "bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent", glow: "rgba(245,166,35,0.06)", icon: "🎮" },
      software: { accent: "blue", gradient: "bg-gradient-to-b from-accent-blue/[0.03] via-transparent to-transparent", glow: "rgba(59,130,246,0.06)", icon: "💻" },
      ai: { accent: "purple", gradient: "bg-gradient-to-b from-accent-purple/[0.03] via-transparent to-transparent", glow: "rgba(124,58,237,0.06)", icon: "🤖" },
      "gift-cards": { accent: "orange", gradient: "bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent", glow: "rgba(245,166,35,0.06)", icon: "🎁" },
      streaming: { accent: "blue", gradient: "bg-gradient-to-b from-accent-blue/[0.02] via-transparent to-transparent", glow: "rgba(59,130,246,0.05)", icon: "📺" },
    };
    return { ...cat, ...(config[cat.slug] || config.gaming) };
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
