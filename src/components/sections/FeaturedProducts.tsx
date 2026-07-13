"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/effects/SectionHeading";
import { SectionBackground } from "@/components/effects/SectionBackground";
import { ProductCard } from "@/components/store/ProductCard";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types";

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("total_sales", { ascending: false })
      .limit(6)
      .then(({ data }) => {
        if (data) setProducts(data as Product[]);
      });
  }, []);

  return (
    <section className="relative py-24 md:py-32">
      <SectionBackground variant="gaming" />
      <Container>
        <SectionHeading
          label="Featured Products"
          title="Curated for"
          highlight="Excellence"
          description="Our most popular digital products, hand-picked for performance and value."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
