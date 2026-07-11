"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { cn, formatKES } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { ShoppingCart, Star } from "lucide-react";

const categoryAccent: Record<string, { gradient: string; badge: "purple" | "blue" | "cyan" | "gold" }> = {
  gaming: { gradient: "from-accent-blue/10 via-transparent to-transparent", badge: "blue" },
  software: { gradient: "from-accent-purple/10 via-transparent to-transparent", badge: "purple" },
  ai: { gradient: "from-accent-cyan/10 via-transparent to-transparent", badge: "cyan" },
  "gift-cards": { gradient: "from-accent-gold/10 via-transparent to-transparent", badge: "gold" },
  streaming: { gradient: "from-accent-purple/5 via-transparent to-transparent", badge: "purple" },
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const accent = categoryAccent[product.category] || categoryAccent.gaming;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      layout
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1000px" }}
          className="relative"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={cn(
              "relative rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface overflow-hidden transition-all duration-500",
              "group-hover:border-[rgba(255,255,255,0.12)] group-hover:shadow-xl group-hover:shadow-accent-purple/5"
            )}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, rgba(124,58,237,0.03) 0%, transparent 50%)`,
                boxShadow: "inset 0 0 60px rgba(124,58,237,0.05)",
              }}
            />

            <div
              className={cn(
                "aspect-[16/10] bg-gradient-to-br flex items-center justify-center relative overflow-hidden",
                accent.gradient
              )}
            >
              <motion.span
                className="text-5xl transition-all duration-500"
                whileHover={{ scale: 1.1 }}
              >
                {product.category === "gaming" ? "🎮" : product.category === "software" ? "💻" : product.category === "ai" ? "🤖" : product.category === "gift-cards" ? "🎁" : "📺"}
              </motion.span>
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {product.badge && (
                <div className="absolute top-3 left-3">
                  <Badge variant={accent.badge}>{product.badge}</Badge>
                </div>
              )}
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-bold leading-tight text-text-primary group-hover:text-accent-purple transition-colors duration-300 font-[family-name:var(--font-inter)]">
                  {product.name}
                </h3>
              </div>

              <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center gap-2 text-xs">
                <Star className="h-3 w-3 fill-accent-gold text-accent-gold" />
                <span className="text-text-primary font-medium">{product.rating}</span>
                <span className="text-text-secondary">({product.reviews.toLocaleString()})</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[rgba(255,255,255,0.04)]">
                <span className="text-lg font-bold font-[family-name:var(--font-jetbrains)] text-text-primary">
                  {formatKES(product.price)}
                </span>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileHover={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-accent-purple opacity-0 group-hover:opacity-100 transition-all duration-300 font-[family-name:var(--font-space)]"
                >
                  <ShoppingCart className="h-3.5 w-3.5" />
                  Quick Buy
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}
