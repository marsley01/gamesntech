"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/store/ProductCard";
import { Particles } from "@/components/effects/Particles";
import type { Product, ProductCategory } from "@/types";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORY_META: Record<
  string,
  { name: string; description: string; emoji: string; particleColor: string; gradient: string }
> = {
  software: {
    name: "Software",
    description: "Premium software licenses and digital tools.",
    emoji: "💻",
    particleColor: "37, 99, 235",
    gradient: "from-accent-blue/10 via-transparent to-transparent",
  },
  templates: {
    name: "Templates",
    description: "Professional website and design templates.",
    emoji: "🎨",
    particleColor: "124, 58, 237",
    gradient: "from-accent-purple/10 via-transparent to-transparent",
  },
  ebooks: {
    name: "E-Books",
    description: "Digital books and guides.",
    emoji: "📚",
    particleColor: "245, 166, 35",
    gradient: "from-primary/10 via-transparent to-transparent",
  },
  game_keys: {
    name: "Game Keys",
    description: "Digital game keys for all major platforms.",
    emoji: "🎮",
    particleColor: "245, 166, 35",
    gradient: "from-primary/10 via-transparent to-transparent",
  },
  courses: {
    name: "Courses",
    description: "Online courses and learning materials.",
    emoji: "📖",
    particleColor: "37, 99, 235",
    gradient: "from-accent-blue/10 via-transparent to-transparent",
  },
  music: {
    name: "Music",
    description: "Digital music and audio downloads.",
    emoji: "🎵",
    particleColor: "124, 58, 237",
    gradient: "from-accent-purple/10 via-transparent to-transparent",
  },
  other: {
    name: "Other",
    description: "Other digital products.",
    emoji: "📦",
    particleColor: "245, 166, 35",
    gradient: "from-primary/10 via-transparent to-transparent",
  },
};

const accentColors: Record<string, string> = {
  software: "text-accent-blue",
  templates: "text-accent-purple",
  ebooks: "text-primary",
  game_keys: "text-primary",
  courses: "text-accent-blue",
  music: "text-accent-purple",
  other: "text-primary",
};

export default function StoreCategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .eq("category", category as ProductCategory)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data) setProducts(data as Product[]);
        setLoading(false);
      });
  }, [category]);

  const catInfo = CATEGORY_META[category];
  const accent = accentColors[category] || "text-primary";

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
        <div className={cn("absolute inset-0 bg-gradient-to-b", catInfo.gradient)} />
        <Particles count={30} color={catInfo.particleColor} />
        <Container className="relative py-16">
          <Link
            href="/store"
            className={cn("inline-flex items-center gap-2 text-xs font-medium mb-6 transition-colors font-[family-name:var(--font-space)]", accent)}
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Store
          </Link>
          <div className="max-w-xl">
            <span className="text-5xl block mb-4">{catInfo.emoji}</span>
            <p className={cn("text-xs tracking-[0.2em] uppercase mb-4 font-medium font-[family-name:var(--font-space)]", accent)}>
              {catInfo.name}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 font-[family-name:var(--font-inter)]">
              {catInfo.name} <span className={cn("text-glow-purple", accent)}>Products</span>
            </h1>
            <p className="text-text-secondary max-w-lg">{catInfo.description}</p>
          </div>
        </Container>
      </section>

      <Container className="py-12">
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs text-text-secondary font-[family-name:var(--font-jetbrains)]">
            {loading ? "..." : `${products.length} product${products.length !== 1 ? "s" : ""}`}
          </span>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-surface p-5 h-48 animate-pulse" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-text-secondary">No products in this category yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}
