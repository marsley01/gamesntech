"use client";

import { cn } from "@/lib/utils";

interface CinematicBackgroundProps {
  className?: string;
  gradient?: string;
  glowColor?: string;
  image?: string;
  children?: React.ReactNode;
}

export function CinematicBackground({
  className,
  gradient = "from-primary/10 via-transparent to-transparent",
  glowColor = "rgba(245,166,35,0.15)",
  image,
  children,
}: CinematicBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {image && (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/0 via-bg-primary/60 to-bg-primary" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
      />
      {children}
    </div>
  );
}
