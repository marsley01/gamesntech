"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "purple" | "blue" | "cyan" | "gold" | false;
}

const glowStyles = {
  purple: "shadow-accent-purple/10",
  blue: "shadow-accent-blue/10",
  cyan: "shadow-accent-cyan/10",
  gold: "shadow-accent-gold/10",
};

export function Card({ children, className, hover = true, glow = false }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -4, transition: { duration: 0.3 } } : undefined}
      className={cn(
        "rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface transition-all duration-300",
        hover && "hover:bg-surface-elevated hover:border-[rgba(255,255,255,0.1)] cursor-pointer",
        glow && `shadow-lg ${glowStyles[glow]}`,
        className
      )}
    >
      {children}
    </motion.div>
  );
}
