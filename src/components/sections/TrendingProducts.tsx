"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/effects/SectionHeading";
import { ProductCard } from "@/components/store/ProductCard";
import { products } from "@/lib/data";

export function TrendingProducts() {
  const trending = products.filter((p) => p.trending);

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-primary/[0.02] to-bg-primary pointer-events-none" />
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
