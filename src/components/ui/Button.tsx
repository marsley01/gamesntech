"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, fullWidth, children, disabled, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary disabled:opacity-50 disabled:pointer-events-none font-[family-name:var(--font-space)]";

    const variants = {
      primary:
        "bg-accent-purple text-white hover:bg-accent-purple/90 shadow-lg shadow-accent-purple/20 active:scale-[0.97]",
      secondary:
        "bg-white/[0.06] text-text-primary hover:bg-white/[0.1] border border-[rgba(255,255,255,0.08)]",
      ghost:
        "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/[0.04]",
      outline:
        "bg-transparent border border-accent-purple/30 text-accent-purple hover:bg-accent-purple/10",
      danger:
        "bg-error text-white hover:bg-error/90",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs rounded-lg gap-2",
      md: "h-11 px-6 text-sm rounded-xl gap-2",
      lg: "h-13 px-8 text-sm rounded-xl gap-3",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
        className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
        disabled={disabled || loading}
        {...(props as any)}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button };
