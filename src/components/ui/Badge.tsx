import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "purple" | "blue" | "cyan" | "gold" | "success" | "error" | "default";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    purple: "bg-accent-purple/10 text-accent-purple border-accent-purple/20",
    blue: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
    cyan: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/20",
    gold: "bg-accent-gold/10 text-accent-gold border-accent-gold/20",
    success: "bg-success/10 text-success border-success/20",
    error: "bg-error/10 text-error border-error/20",
    default: "bg-white/[0.04] text-text-secondary border-[rgba(255,255,255,0.06)]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide uppercase font-[family-name:var(--font-space)]",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
