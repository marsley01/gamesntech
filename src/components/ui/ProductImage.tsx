"use client";

import { cn } from "@/lib/utils";
import type { Product } from "@/lib/data";

const brandGradients: Record<string, string> = {
  gaming: "from-primary/20 via-primary/[0.04] to-bg-primary",
  software: "from-accent-blue/20 via-accent-blue/[0.04] to-bg-primary",
  ai: "from-accent-purple/20 via-accent-purple/[0.04] to-bg-primary",
  "gift-cards": "from-primary/15 via-primary/[0.03] to-bg-primary",
  streaming: "from-accent-blue/15 via-accent-blue/[0.03] to-bg-primary",
};

const brandEmoji: Record<string, string> = {
  gaming: "🎮",
  software: "💻",
  ai: "🤖",
  "gift-cards": "🎁",
  streaming: "📺",
};

const brandAccents: Record<string, string> = {
  gaming: "rgba(245,166,35,0.08)",
  software: "rgba(59,130,246,0.08)",
  ai: "rgba(124,58,237,0.08)",
  "gift-cards": "rgba(245,166,35,0.06)",
  streaming: "rgba(59,130,246,0.06)",
};

export function ProductImage({
  product,
  className,
  aspect = "16/10",
  showOverlay = true,
}: {
  product: Product;
  className?: string;
  aspect?: string;
  showOverlay?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center",
        className
      )}
      style={{ aspectRatio: aspect }}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br",
          brandGradients[product.category] || brandGradients.gaming
        )}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 40%, ${brandAccents[product.category] || brandAccents.gaming} 0%, transparent 60%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-transparent" />

      <span className="text-6xl md:text-7xl relative z-10 opacity-90 select-none">
        {brandEmoji[product.category] || "📦"}
      </span>

      {showOverlay && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-bg-primary/80 via-bg-primary/20 to-transparent">
          <p className="text-[10px] uppercase tracking-[0.2em] text-text-secondary/60 font-[family-name:var(--font-space)]">
            {product.category.replace("-", " ")}
          </p>
          <p className="text-xs font-bold text-text-primary/70 truncate font-[family-name:var(--font-inter)]">
            {product.name}
          </p>
        </div>
      )}
    </div>
  );
}
