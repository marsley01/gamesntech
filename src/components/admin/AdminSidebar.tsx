"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  BarChart3,
  Wallet,
  Settings,
  AlertTriangle,
} from "lucide-react";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/api-balance", label: "API Balance", icon: Wallet },
  { href: "/admin/failed", label: "Failed TX", icon: AlertTriangle },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 border-r border-[rgba(255,255,255,0.06)] min-h-screen hidden lg:block">
      <div className="p-6">
        <Link href="/admin" className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-lg shadow-accent-purple/20">
            <span className="text-white font-black text-xs font-[family-name:var(--font-space)]">GNT</span>
          </div>
          <span className="text-sm font-semibold tracking-wide font-[family-name:var(--font-space)]">Admin</span>
        </Link>

        <nav className="space-y-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 font-[family-name:var(--font-space)]",
                  active
                    ? "bg-accent-purple/10 text-accent-purple border border-accent-purple/20"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/[0.04] border border-transparent"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
