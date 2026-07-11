"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/store/ProductCard";
import { products, categories } from "@/lib/data";
import { Particles } from "@/components/effects/Particles";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const accentMeta: Record<string, { color: string; text: string; border: string; bg: string; particleColor: string; gradient: string }> = {
  gaming: { color: "text-primary", text: "text-primary", border: "border-primary/20", bg: "bg-primary/5", particleColor: "245, 166, 35", gradient: "from-primary/10 via-transparent to-transparent" },
  software: { color: "text-accent-blue", text: "text-accent-blue", border: "border-accent-blue/20", bg: "bg-accent-blue/5", particleColor: "37, 99, 235", gradient: "from-accent-blue/10 via-transparent to-transparent" },
  ai: { color: "text-accent-purple", text: "text-accent-purple", border: "border-accent-purple/20", bg: "bg-accent-purple/5", particleColor: "124, 58, 237", gradient: "from-accent-purple/10 via-transparent to-transparent" },
  "gift-cards": { color: "text-primary", text: "text-primary", border: "border-primary/20", bg: "bg-primary/5", particleColor: "245, 166, 35", gradient: "from-primary/10 via-transparent to-transparent" },
  streaming: { color: "text-accent-blue", text: "text-accent-blue", border: "border-accent-blue/20", bg: "bg-accent-blue/5", particleColor: "37, 99, 235", gradient: "from-accent-blue/5 via-transparent to-transparent" },
};

const emojiMap: Record<string, string> = {
  gaming: "🎮", software: "💻", ai: "🤖", "gift-cards": "🎁", streaming: "📺",
};

export default function StoreCategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const catInfo = categories.find((c) => c.slug === category);
  const accent = accentMeta[category] || accentMeta.gaming;

  const filtered = useMemo(
    () => products.filter((p) => p.category === category),
    [category]
  );

  if (!catInfo) {
    return (
      <main className="pt-20 min-h-screen">
        <Container>
          <div className="text-center py-20">
            <p className="text-5xl mb-4">🔍</p>
            <h1 className="text-2xl font-bold mb-2">Category not found</h1>
            <Link href="/store" className="text-accent-purple hover:underline text-sm">
              Browse all products
            </Link>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen">
      <section className="relative overflow-hidden border-b border-[rgba(255,255,255,0.06)]">
        <div className={cn("absolute inset-0 bg-gradient-to-b", accent.gradient)} />
        <Particles count={30} color={accent.particleColor} />
        <Container className="relative py-16">
          <Link
            href="/store"
            className={cn("inline-flex items-center gap-2 text-xs font-medium mb-6 transition-colors font-[family-name:var(--font-space)]", accent.text)}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Store
          </Link>
          <div className="max-w-xl">
            <span className={cn("text-5xl block mb-4")}>{emojiMap[category]}</span>
            <p className={cn("text-xs tracking-[0.2em] uppercase mb-4 font-medium font-[family-name:var(--font-space)]", accent.text)}>
              {catInfo.name}
            </p>
            <h1 className={cn("text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 font-[family-name:var(--font-inter)]")}>
              {catInfo.name} <span className={cn("text-glow-purple", accent.color)}>Products</span>
            </h1>
            <p className="text-text-secondary max-w-lg">{catInfo.description}</p>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="flex items-center gap-2 mb-8">
          <span className={cn("text-xs text-text-secondary font-[family-name:var(--font-jetbrains)]")}>
            {filtered.length} product{filtered.length !== 1 && "s"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-text-secondary">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
