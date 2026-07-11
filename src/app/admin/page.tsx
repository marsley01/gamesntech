"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { StatCard } from "@/components/admin/StatCard";
import { formatKES } from "@/lib/utils";
import {
  DollarSign,
  ShoppingBag,
  Users,
  AlertTriangle,
  Wallet,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Revenue Today", value: formatKES(28500), icon: DollarSign, change: "+12.5%", positive: true },
  { label: "Revenue Week", value: formatKES(189000), icon: TrendingUp, change: "+8.3%", positive: true },
  { label: "Orders Today", value: "24", icon: ShoppingBag, change: "+3", positive: true },
  { label: "Active Customers", value: "1,247", icon: Users, change: "+5.2%", positive: true },
  { label: "Wallet Balance", value: formatKES(45200), icon: Wallet, change: "Low", positive: false },
  { label: "Failed TX", value: "3", icon: AlertTriangle, change: "Needs action", positive: false },
];

const recentOrders = [
  { id: "GNT-001", customer: "John K.", product: "Xbox Game Pass", amount: 2499, status: "completed" as const },
  { id: "GNT-002", customer: "Mary W.", product: "Steam Wallet", amount: 500, status: "completed" as const },
  { id: "GNT-003", customer: "Peter O.", product: "Netflix Premium", amount: 1499, status: "processing" as const },
  { id: "GNT-004", customer: "Grace M.", product: "Spotify Premium", amount: 599, status: "pending" as const },
  { id: "GNT-005", customer: "James N.", product: "GeForce NOW", amount: 1499, status: "failed" as const },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-bg-primary">
      <AdminSidebar />
      <main className="flex-1 pt-8 pb-16">
        <Container>
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-inter)]">Overview</h1>
            <p className="text-sm text-text-secondary mt-1">Your business at a glance</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card hover={false} className="p-5">
              <h3 className="text-sm font-bold font-[family-name:var(--font-inter)] mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href="/admin/orders"
                    className="flex items-center justify-between py-2.5 border-b border-[rgba(255,255,255,0.04)] last:border-0 group"
                  >
                    <div>
                      <p className="text-sm font-medium text-text-primary group-hover:text-accent-purple transition-colors">{order.product}</p>
                      <p className="text-xs text-text-secondary">{order.customer} &middot; {order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold font-[family-name:var(--font-jetbrains)]">{formatKES(order.amount)}</p>
                      <Badge variant={order.status === "completed" ? "success" : order.status === "processing" ? "purple" : order.status === "pending" ? "gold" : "error"}>
                        {order.status}
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </Card>

            <Card hover={false} className="p-5">
              <h3 className="text-sm font-bold font-[family-name:var(--font-inter)] mb-4">Top Products</h3>
              <div className="space-y-4">
                {[
                  { name: "Xbox Game Pass Ultimate", count: 142, revenue: 354858 },
                  { name: "Netflix Premium", count: 98, revenue: 146902 },
                  { name: "Steam Wallet Credits", count: 87, revenue: 43500 },
                  { name: "Spotify Premium", count: 76, revenue: 45524 },
                  { name: "NVIDIA GeForce NOW", count: 54, revenue: 80946 },
                ].map((p, i) => (
                  <div key={p.name} className="flex items-center gap-4">
                    <span className="text-xs font-bold text-text-secondary w-5 font-[family-name:var(--font-jetbrains)]">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary truncate">{p.name}</p>
                      <div className="w-full h-1 rounded-full bg-white/[0.04] mt-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent-purple"
                          style={{ width: `${Math.min(100, (p.count / 142) * 100)}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold font-[family-name:var(--font-jetbrains)] text-accent-purple shrink-0">
                      {formatKES(p.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </main>
    </div>
  );
}
