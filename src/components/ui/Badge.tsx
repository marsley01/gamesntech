import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "blue" | "purple" | "success" | "error" | "default";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    orange: "bg-primary/10 text-primary border-primary/20",
    blue: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
    purple: "bg-accent-purple/10 text-accent-purple border-accent-purple/20",
    success: "bg-success/10 text-success border-success/20",
    error: "bg-error/10 text-error border-error/20",
    default: "bg-white/[0.04] text-text-secondary border-border",
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
