"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={id} className="block text-xs font-medium text-text-secondary tracking-wide">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/50 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40",
            error ? "border-error" : "border-border hover:border-border-hover",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
