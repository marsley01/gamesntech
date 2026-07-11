"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  highlight,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "max-w-2xl mb-16",
        align === "center" && "mx-auto text-center"
      )}
    >
      {label && (
        <span className="inline-block text-[11px] tracking-[0.15em] uppercase text-text-secondary mb-4 font-medium font-[family-name:var(--font-space)]">
          {label}
        </span>
      )}
      <h2
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-text-primary",
          "font-[family-name:var(--font-inter)]"
        )}
      >
        {title}{" "}
        {highlight && (
          <span className="text-glow-orange text-primary">{highlight}</span>
        )}
      </h2>
      {description && (
        <p className="mt-4 text-base text-text-secondary leading-relaxed max-w-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
