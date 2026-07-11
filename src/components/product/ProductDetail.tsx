"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatKES } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { ArrowLeft, Shield, Zap, CheckCircle, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Particles } from "@/components/effects/Particles";

const features = [
  { icon: Zap, text: "Instant delivery via email & SMS" },
  { icon: Shield, text: "SSL encrypted & M-Pesa secured" },
  { icon: CheckCircle, text: "Verified authentic codes" },
];

const categoryAccent: Record<string, { gradient: string; particle: string }> = {
  gaming: { gradient: "from-accent-blue/10 via-transparent to-transparent", particle: "37, 99, 235" },
  software: { gradient: "from-accent-purple/10 via-transparent to-transparent", particle: "124, 58, 237" },
  ai: { gradient: "from-accent-cyan/10 via-transparent to-transparent", particle: "34, 211, 238" },
  "gift-cards": { gradient: "from-accent-gold/10 via-transparent to-transparent", particle: "250, 204, 21" },
  streaming: { gradient: "from-accent-purple/5 via-transparent to-transparent", particle: "124, 58, 237" },
};

const categoryEmoji: Record<string, string> = {
  gaming: "🎮", software: "💻", ai: "🤖", "gift-cards": "🎁", streaming: "📺",
};

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const accent = categoryAccent[product.category] || categoryAccent.gaming;

  return (
    <main className="pt-20 min-h-screen relative">
      <div className={cn("absolute inset-0 bg-gradient-to-b", accent.gradient)} />
      <Particles count={30} color={accent.particle} />

      <Container className="relative">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-text-primary mb-8 transition-colors font-[family-name:var(--font-space)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Store
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="aspect-[4/3] rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface relative overflow-hidden flex items-center justify-center">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-8xl"
              >
                {categoryEmoji[product.category] || "📦"}
              </motion.span>
              <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/40 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {product.badge && <Badge variant="purple">{product.badge}</Badge>}
              <p className="text-xs tracking-[0.2em] uppercase text-text-secondary font-medium font-[family-name:var(--font-space)]">
                {product.category.replace("-", " ")}
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight font-[family-name:var(--font-inter)]">
                {product.name}
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent-gold text-accent-gold" />
                <span className="text-sm font-semibold">{product.rating}</span>
              </div>
              <span className="text-sm text-text-secondary">
                {product.reviews.toLocaleString()} reviews
              </span>
              {product.platform && (
                <span className="text-sm text-text-secondary">{product.platform}</span>
              )}
            </div>

            <div className="text-4xl font-bold font-[family-name:var(--font-jetbrains)] text-accent-purple">
              {formatKES(product.price)}
            </div>

            <div className="space-y-3 pt-2">
              {features.map((f, i) => (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm text-text-secondary"
                >
                  <f.icon className="h-4 w-4 text-accent-purple shrink-0" />
                  {f.text}
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                size="lg"
                fullWidth
                onClick={() => router.push(`/checkout?product=${product.slug}`)}
              >
                <ShoppingCart className="h-4 w-4" />
                Purchase — {formatKES(product.price)}
              </Button>
            </div>

            <p className="text-xs text-text-secondary text-center lg:text-left">
              Pay with M-Pesa. Delivered in under 2 minutes.
            </p>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}
