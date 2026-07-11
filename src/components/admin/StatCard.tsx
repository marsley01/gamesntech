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
        "rounded-2xl border border-border bg-surface p-5 hover:border-border-light transition-colors",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-sm text-muted">{label}</span>
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </div>
      <p className="text-2xl font-black tracking-tight">{value}</p>
      {change && (
        <div className="flex items-center gap-1 mt-1">
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
