"use client";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/effects/SectionHeading";
import { ProductCard } from "@/components/store/ProductCard";
import { products } from "@/lib/data";

export function FeaturedProducts() {
  const featured = products.filter((p) => p.featured);

  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Featured Products"
          title="Curated for"
          highlight="Excellence"
          description="Our most popular digital products, hand-picked for performance and value."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
