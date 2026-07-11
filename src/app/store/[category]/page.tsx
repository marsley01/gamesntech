"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/store/ProductCard";
import { products, categories } from "@/lib/data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const categoryMeta: Record<string, { emoji: string }> = {
  gaming: { emoji: "🎮" },
  software: { emoji: "💻" },
  saas: { emoji: "☁️" },
};

export default function StoreCategoryPage() {
  const params = useParams();
  const category = params.category as string;

  const catInfo = categories.find((c) => c.slug === category);
  const meta = categoryMeta[category];

  const filtered = useMemo(
    () => products.filter((p) => p.category === category),
    [category]
  );

  if (!catInfo) {
    return (
      <main className="pt-24 pb-16">
        <Container>
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <h1 className="text-2xl font-bold mb-2">Category not found</h1>
            <Link href="/store" className="text-primary hover:underline">
              Browse all products
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="border-b border-border mb-10">
        <Container>
          <Link
            href="/store"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Store
          </Link>
          <div className="pb-12">
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
              {meta?.emoji} {catInfo.name}
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
              {catInfo.name} <span className="text-primary">Products</span>
            </h1>
            <p className="text-muted max-w-xl">{catInfo.description}</p>
          </div>
        </Container>
      </div>

      <Container>
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
