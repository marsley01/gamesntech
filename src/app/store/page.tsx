"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/store/ProductCard";
import { StoreFilters, type Filters } from "@/components/store/StoreFilters";
import { products } from "@/lib/data";

export default function StorePage() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "",
    sort: "popular",
  });

  const filtered = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    switch (filters.sort) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        result.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
        break;
    }

    return result;
  }, [filters]);

  return (
    <main className="pt-24 pb-16">
      <div className="border-b border-border mb-10">
        <Container>
          <div className="py-12">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
              Store
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              All <span className="text-primary">Products</span>
            </h1>
          </div>
        </Container>
      </div>

      <Container>
        <StoreFilters
          filters={filters}
          onChange={setFilters}
          products={filtered}
        />

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted">No products found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </Container>
    </main>
  );
}
