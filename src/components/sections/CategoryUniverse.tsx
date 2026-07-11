"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface UniverseProps {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  accent: "orange" | "blue" | "purple";
  icon: string;
  gradient: string;
  glowColor: string;
  productCount: number;
  reversed?: boolean;
}

const accentConfig = {
  orange: {
    text: "text-primary",
    border: "border-primary/20",
    bg: "bg-primary/5",
    glow: "text-glow-orange",
  },
  blue: {
    text: "text-accent-blue",
    border: "border-accent-blue/20",
    bg: "bg-accent-blue/5",
  },
  purple: {
    text: "text-accent-purple",
    border: "border-accent-purple/20",
    bg: "bg-accent-purple/5",
  },
};

export function CategoryUniverse({
  title,
  subtitle,
  description,
  href,
  accent = "orange",
  icon,
  gradient,
  glowColor,
  productCount,
  reversed = false,
}: UniverseProps) {
  const a = accentConfig[accent] || accentConfig.orange;

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary pointer-events-none" />
      <div className={cn("absolute inset-0 opacity-20", gradient)} />

      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 60%)`,
        }}
      />

      <Container>
        <div className={cn("grid lg:grid-cols-2 gap-12 lg:gap-20 items-center", reversed && "lg:grid-flow-dense")}>
          <motion.div
            initial={{ opacity: 0, x: reversed ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={cn(reversed && "lg:col-start-2")}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-6xl block mb-6"
            >
              {icon}
            </motion.span>

            <span className={cn("text-[11px] tracking-[0.15em] uppercase mb-4 block font-medium font-[family-name:var(--font-space)]", a.text)}>
              {subtitle}
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 font-[family-name:var(--font-inter)]">
              {title.split(" ").map((word, i) => (
                <span key={i}>
                  {i === title.split(" ").length - 1 ? (
                    <span className={cn("text-glow-orange", a.text)}>{word}</span>
                  ) : (
                    word
                  )}{" "}
                </span>
              ))}
            </h2>

            <p className="text-base text-text-secondary leading-relaxed max-w-md mb-8">
              {description}
            </p>

            <Link
              href={href}
              className={cn(
                "inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 group font-[family-name:var(--font-space)]",
                a.text
              )}
            >
              Explore {title.split(" ")[0]}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reversed ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative aspect-[4/3] rounded-2xl border overflow-hidden",
              a.border,
              a.bg
            )}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-8xl opacity-15">{icon}</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] tracking-wider uppercase text-text-secondary font-medium font-[family-name:var(--font-space)]">Products</p>
                  <p className="text-2xl font-bold font-[family-name:var(--font-jetbrains)]">{productCount}</p>
                </div>
                <Link
                  href={href}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 font-[family-name:var(--font-space)]",
                    a.bg,
                    a.text,
                    a.border,
                    "border"
                  )}
                >
                  Browse All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
