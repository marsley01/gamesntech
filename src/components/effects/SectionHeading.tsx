"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
  accent?: "purple" | "blue" | "cyan" | "gold";
}

export function SectionHeading({
  label,
  title,
  highlight,
  description,
  align = "left",
  accent = "purple",
}: SectionHeadingProps) {
  const accentMap = {
    purple: "text-accent-purple",
    blue: "text-accent-blue",
    cyan: "text-accent-cyan",
    gold: "text-accent-gold",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "max-w-2xl mb-16",
        align === "center" && "mx-auto text-center"
      )}
    >
      {label && (
        <span className="inline-block text-xs tracking-[0.2em] uppercase text-text-secondary mb-4 font-medium">
          {label}
        </span>
      )}
      <h2
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-text-primary",
          "font-[family-name:var(--font-inter)]"
        )}
      >
        {title}{" "}
        {highlight && (
          <span className={cn("text-glow-purple", accentMap[accent])}>
            {highlight}
          </span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-text-secondary leading-relaxed max-w-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
