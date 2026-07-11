"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight, Star, TrendingUp } from "lucide-react";
import { products } from "@/lib/data";
import { formatKES } from "@/lib/utils";
import { cn } from "@/lib/utils";

const featured = products.filter((p) => p.featured);

const categoryThemes: Record<string, { gradient: string; icon: React.ReactNode }> = {
  gaming: {
    gradient: "from-amber-500/20 to-orange-600/10",
    icon: <Star className="h-4 w-4" />,
  },
  software: {
    gradient: "from-blue-500/20 to-purple-600/10",
    icon: <TrendingUp className="h-4 w-4" />,
  },
  saas: {
    gradient: "from-emerald-500/20 to-teal-600/10",
    icon: <TrendingUp className="h-4 w-4" />,
  },
};

export function FeaturedProducts() {
  return (
    <AnimatedSection>
      <Container className="py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-primary tracking-widest uppercase mb-3"
            >
              Featured Products
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black tracking-tight"
            >
              Top Picks for
              <br />
              <span className="text-primary">Every Gamer</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/store"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-foreground transition-colors"
            >
              View All Products
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <Link href={`/product/${product.slug}`} className="group block">
                <div className="relative rounded-2xl border border-border bg-surface overflow-hidden transition-colors duration-200 hover:border-border-light hover:bg-surface-light">
                  <div
                    className={cn(
                      "aspect-[16/9] bg-gradient-to-br flex items-center justify-center",
                      categoryThemes[product.category]?.gradient || "from-surface-light to-surface"
                    )}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-2">
                        {product.category === "gaming" ? "🎮" : product.category === "software" ? "💻" : "☁️"}
                      </div>
                      <p className="text-xs text-muted font-mono">{product.category.toUpperCase()}</p>
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      {product.badge && (
                        <Badge variant={product.badge === "Best Seller" ? "primary" : "warning"}>
                          {product.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-primary">{formatKES(product.price)}</span>
                      <span className="text-sm text-muted group-hover:text-primary transition-colors">
                        Buy Now →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
