"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/store/ProductCard";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const products: { id: string; name: string; slug: string; description: string; price: number; image: string; category: string }[] = [];
const categories: { slug: string; name: string }[] = [];

export default function StorePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");

  const filtered = useMemo(() => {
    let result = [...products];
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [search, activeCategory]);

  return (
    <main className="pt-20 min-h-screen">
      <div className="border-b border-[rgba(255,255,255,0.06)]">
        <Container className="py-16">
          <p className="text-xs tracking-[0.2em] uppercase text-primary mb-4 font-medium font-[family-name:var(--font-space)]">
            Store
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 font-[family-name:var(--font-inter)]">
            All <span className="text-glow-orange text-primary">Products</span>
          </h1>
          <p className="text-text-secondary max-w-xl">
            Browse our curated collection of premium digital products.
          </p>
        </Container>
      </div>

      <Container className="py-10">
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 rounded-xl border border-[rgba(255,255,255,0.08)] bg-surface pl-11 pr-4 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-none">
          <button
            onClick={() => setActiveCategory("")}
            className={cn(
              "shrink-0 px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all border font-[family-name:var(--font-space)]",
              activeCategory === ""
                ? "bg-primary text-black border-primary"
                : "bg-surface text-text-secondary border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:text-text-primary"
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setActiveCategory(cat.slug)}
              className={cn(
                "shrink-0 px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all border font-[family-name:var(--font-space)]",
                  activeCategory === cat.slug
                    ? "bg-primary text-black border-primary"
                    : "bg-surface text-text-secondary border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.15)] hover:text-text-primary"
              )}
            >
              {cat.name}
            </button>
          ))}
          <span className="text-xs text-text-secondary ml-auto shrink-0 font-[family-name:var(--font-jetbrains)]">
            {filtered.length} product{filtered.length !== 1 && "s"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-text-secondary">No products found.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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
