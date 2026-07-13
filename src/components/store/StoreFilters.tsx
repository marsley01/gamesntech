"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";

export type Filters = {
  search: string;
  category: string;
  sort: "name" | "price-asc" | "price-desc" | "popular";
};

interface StoreFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  products: Product[];
}

const categories = [
  { value: "", label: "All" },
  { value: "gaming", label: "Gaming" },
  { value: "software", label: "Software" },
  { value: "saas", label: "SaaS" },
];

const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "name", label: "Name" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
];

export function StoreFilters({ filters, onChange, products }: StoreFiltersProps) {
  return (
    <div className="space-y-4 mb-10">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            type="text"
            placeholder="Search products..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full h-12 rounded-xl border border-border bg-surface pl-11 pr-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <select
          value={filters.sort}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as Filters["sort"] })}
          className="h-12 rounded-xl border border-border bg-surface px-4 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => onChange({ ...filters, category: cat.value })}
            className={cn(
              "shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all border",
              filters.category === cat.value
                ? "bg-primary text-black border-primary"
                : "bg-surface text-muted border-border hover:border-border-light hover:text-foreground"
            )}
          >
            {cat.label}
          </button>
        ))}
        <span className="text-sm text-muted ml-auto shrink-0">
          {products.length} product{products.length !== 1 && "s"}
        </span>
      </div>
    </div>
  );
}
