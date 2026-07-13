"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/effects/SectionHeading";
import { SectionBackground } from "@/components/effects/SectionBackground";
import { ProductCard } from "@/components/store/ProductCard";

const products: { id: string; name: string; slug: string; description: string; price: number; image: string; category: string; trending: boolean }[] = [];

export function TrendingProducts() {
  const trending = products.filter((p) => p.trending);

  return (
    <section className="relative py-24 md:py-32">
      <SectionBackground variant="gaming" />
      <Container className="relative">
        <SectionHeading
          label="Trending Now"
          title="Most"
          highlight="Popular"
          description="What other customers are buying right now."
          align="center"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trending.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
