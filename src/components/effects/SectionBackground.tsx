"use client";

import { cn } from "@/lib/utils";

interface SectionBackgroundProps {
  variant?: "gaming" | "software" | "ai" | "gift-cards" | "streaming" | "dark" | "default";
  className?: string;
}

const config = {
  gaming: {
    gradient: "from-primary/[0.03] via-transparent to-transparent",
    glow: "rgba(245,166,35,0.04)",
    grid: true,
  },
  software: {
    gradient: "from-accent-blue/[0.03] via-transparent to-transparent",
    glow: "rgba(59,130,246,0.04)",
    grid: true,
  },
  ai: {
    gradient: "from-accent-purple/[0.03] via-transparent to-transparent",
    glow: "rgba(124,58,237,0.04)",
    grid: true,
  },
  "gift-cards": {
    gradient: "from-primary/[0.02] via-transparent to-transparent",
    glow: "rgba(245,166,35,0.03)",
    grid: true,
  },
  streaming: {
    gradient: "from-accent-blue/[0.02] via-transparent to-transparent",
    glow: "rgba(59,130,246,0.03)",
    grid: true,
  },
  dark: {
    gradient: "from-bg-primary to-transparent",
    glow: "transparent",
    grid: false,
  },
  default: {
    gradient: "from-primary/[0.02] via-transparent to-transparent",
    glow: "rgba(245,166,35,0.03)",
    grid: true,
  },
};

export function SectionBackground({ variant = "default", className }: SectionBackgroundProps) {
  const c = config[variant] || config.default;

  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-b", c.gradient)} />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: `radial-gradient(circle, ${c.glow} 0%, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[length:24px_24px] opacity-40" />
    </div>
  );
}
