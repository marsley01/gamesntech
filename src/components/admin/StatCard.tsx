"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon: React.ElementType;
  className?: string;
}

export function StatCard({ label, value, change, positive, icon: Icon, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface p-5 hover:bg-surface-elevated hover:border-[rgba(255,255,255,0.1)] transition-all duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs text-text-secondary tracking-wide">{label}</span>
        <div className="w-8 h-8 rounded-xl bg-accent-purple/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-accent-purple" />
        </div>
      </div>
      <p className="text-2xl font-bold font-[family-name:var(--font-jetbrains)] tracking-tight">{value}</p>
      {change && (
        <div className="flex items-center gap-1 mt-1.5">
          {positive ? (
            <TrendingUp className="h-3 w-3 text-success" />
          ) : (
            <TrendingDown className="h-3 w-3 text-error" />
          )}
          <span className={cn("text-xs font-medium", positive ? "text-success" : "text-error")}>
            {change}
          </span>
        </div>
      )}
    </motion.div>
  );
}
