"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { cn, formatKES } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { ShoppingCart } from "lucide-react";

const categoryEmoji: Record<string, string> = {
  gaming: "🎮",
  software: "💻",
  saas: "☁️",
};

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      layout
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-300 hover:border-primary/30 hover:bg-surface-light hover:shadow-lg hover:shadow-primary/5">
          <div className="aspect-[16/10] bg-gradient-to-br from-surface-light to-surface flex items-center justify-center relative overflow-hidden">
            <span className="text-6xl transition-transform duration-500 group-hover:scale-110">
              {categoryEmoji[product.category] || "📦"}
            </span>
            <div className="absolute inset-0 bg-gradient-to-t from-surface/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-bold leading-tight group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              {product.badge && (
                <Badge variant="primary" className="shrink-0">
                  {product.badge}
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted line-clamp-2 leading-relaxed">{product.description}</p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xl font-bold text-primary">{formatKES(product.price)}</span>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-muted group-hover:text-primary transition-colors">
                <ShoppingCart className="h-4 w-4" />
                Buy
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
