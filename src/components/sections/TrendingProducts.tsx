"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/effects/SectionHeading";
import { SectionBackground } from "@/components/effects/SectionBackground";
import { ProductCard } from "@/components/store/ProductCard";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types";

export function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("total_sales", { ascending: false })
      .limit(8)
      .then(({ data }) => {
        if (data) setProducts(data as Product[]);
      });
  }, []);

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
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
