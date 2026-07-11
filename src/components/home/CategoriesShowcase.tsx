"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ArrowRight, Gamepad2, Monitor, Cloud } from "lucide-react";

const categories = [
  {
    slug: "gaming",
    name: "Gaming",
    description: "Gift cards, credits & subscriptions for top gaming platforms",
    icon: Gamepad2,
    gradient: "from-amber-500/10 to-orange-600/5",
    borderHover: "hover:border-amber-500/30",
    count: "5 products",
  },
  {
    slug: "software",
    name: "Software",
    description: "Professional tools and productivity suites",
    icon: Monitor,
    gradient: "from-blue-500/10 to-purple-600/5",
    borderHover: "hover:border-blue-500/30",
    count: "3 products",
  },
  {
    slug: "saas",
    name: "SaaS",
    description: "Streaming, cloud services & digital subscriptions",
    icon: Cloud,
    gradient: "from-emerald-500/10 to-teal-600/5",
    borderHover: "hover:border-emerald-500/30",
    count: "4 products",
  },
];

export function CategoriesShowcase() {
  return (
    <AnimatedSection>
      <Container className="py-24 md:py-32">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
            Categories
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Everything <span className="text-primary">Digital</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                href={`/store/${cat.slug}`}
                className={`group block rounded-2xl border border-border bg-gradient-to-br ${cat.gradient} ${cat.borderHover} p-8 transition-all duration-300 hover:scale-[1.02]`}
              >
                <cat.icon className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                <p className="text-sm text-muted leading-relaxed mb-6">{cat.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted">{cat.count}</span>
                  <span className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Browse <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </AnimatedSection>
  );
}
