"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function Card({ children, className, hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
      className={cn(
        "rounded-2xl border border-border bg-surface transition-all duration-300 shadow-gnt",
        hover && "hover:bg-surface-elevated hover:border-border-hover cursor-pointer",
        glow && "animate-glow-orange",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
