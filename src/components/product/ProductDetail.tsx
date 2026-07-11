"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatKES } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { ArrowLeft, Shield, Zap, CheckCircle, ShoppingCart } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Zap, text: "Instant digital delivery via email & SMS" },
  { icon: Shield, text: "Secured with SSL & M-Pesa encryption" },
  { icon: CheckCircle, text: "Verified codes — guaranteed authentic" },
];

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();

  return (
    <main className="pt-24 pb-16">
      <Container>
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 via-surface to-surface-light border border-border flex items-center justify-center relative overflow-hidden">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-center"
              >
                <span className="text-8xl">
                  {product.category === "gaming" ? "🎮" : product.category === "software" ? "💻" : "☁️"}
                </span>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-surface/60 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="space-y-3">
              {product.badge && <Badge variant="primary">{product.badge}</Badge>}
              <p className="text-sm text-muted uppercase tracking-widest">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-lg text-muted leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="text-4xl font-black text-primary">
              {formatKES(product.price)}
            </div>

            <div className="space-y-3 pt-2">
              {features.map((f, i) => (
                <motion.div
                  key={f.text}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 text-sm text-muted"
                >
                  <f.icon className="h-4 w-4 text-primary shrink-0" />
                  {f.text}
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                fullWidth
                onClick={() => router.push(`/checkout?product=${product.slug}`)}
              >
                <ShoppingCart className="h-5 w-5" />
                Buy Now — {formatKES(product.price)}
              </Button>
            </div>

            <p className="text-xs text-muted text-center sm:text-left">
              Pay with M-Pesa. Delivery in under 2 minutes.
            </p>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}
