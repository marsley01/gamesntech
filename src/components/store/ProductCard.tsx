"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ProductImage } from "@/components/ui/ProductImage";
import { cn, formatKES } from "@/lib/utils";
import type { Product } from "@/lib/data";
import { ShoppingCart, Zap } from "lucide-react";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 });

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      layout
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "800px" }}
          className="relative"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            className={cn(
              "relative rounded-2xl border border-border bg-surface overflow-hidden transition-all duration-500 shadow-gnt",
              "group-hover:border-primary/20 group-hover:shadow-lg"
            )}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, rgba(245,166,35,0.04) 0%, transparent 60%)`,
              }}
            />

            <div className="p-5 flex gap-4">
              <ProductImage
                src={product.image}
                alt={product.name}
                width={80}
                height={80}
                padding={8}
                bgColor="#111120"
              />
              <div className="flex-1 min-w-0 space-y-2">
                <h3 className="text-base font-bold leading-tight text-text-primary group-hover:text-primary transition-colors duration-300 font-[family-name:var(--font-inter)]">
                  {product.name}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-medium text-primary">
                  <Zap className="h-3 w-3" />
                  Instant delivery
                </div>
              </div>
            </div>
            <div className="px-5 pb-5">
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <span className="text-lg font-bold font-[family-name:var(--font-jetbrains)] text-text-primary">
                  {formatKES(product.price)}
                </span>
                <motion.span
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 font-[family-name:var(--font-space)]"
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
