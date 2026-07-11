"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { formatKES } from "@/lib/utils";
import { TrendingUp, DollarSign, ShoppingBag } from "lucide-react";

const monthlyData = [
  { month: "Jan", revenue: 124000, orders: 89 },
  { month: "Feb", revenue: 145000, orders: 102 },
  { month: "Mar", revenue: 168000, orders: 115 },
  { month: "Apr", revenue: 189000, orders: 134 },
  { month: "May", revenue: 212000, orders: 148 },
  { month: "Jun", revenue: 245000, orders: 167 },
];

export default function AdminAnalytics() {
  const maxRevenue = Math.max(...monthlyData.map((d) => d.revenue));
  const maxOrders = Math.max(...monthlyData.map((d) => d.orders));

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 pt-8 pb-16">
        <Container>
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-inter)]">Analytics</h1>
            <p className="text-sm text-text-secondary mt-1">Revenue & performance metrics</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card hover={false} className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold font-[family-name:var(--font-inter)]">Monthly Revenue</h3>
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-end gap-3 h-36">
                {monthlyData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] text-text-secondary font-[family-name:var(--font-jetbrains)]">
                      {formatKES(d.revenue).replace("KES ", "")}
                    </span>
                    <div
                      className="w-full rounded-md bg-primary/70 hover:bg-primary transition-colors"
                      style={{
                        height: `${(d.revenue / maxRevenue) * 100}%`,
                      }}
                    />
                    <span className="text-[10px] text-text-secondary">{d.month}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card hover={false} className="p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-bold font-[family-name:var(--font-inter)]">Monthly Orders</h3>
                <ShoppingBag className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-end gap-3 h-36">
                {monthlyData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-[10px] text-text-secondary font-[family-name:var(--font-jetbrains)]">{d.orders}</span>
                    <div
                      className="w-full rounded-md bg-accent-blue/70 hover:bg-accent-blue transition-colors"
                      style={{
                        height: `${(d.orders / maxOrders) * 100}%`,
                      }}
                    />
                    <span className="text-[10px] text-text-secondary">{d.month}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mt-6">
            {[
              { label: "Total Revenue (6mo)", value: formatKES(1083000), change: "+18.2%" },
              { label: "Total Orders", value: "755", change: "+12.4%" },
              { label: "Avg Order Value", value: formatKES(1434), change: "+5.1%" },
            ].map((s) => (
              <Card key={s.label} hover={false} className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-xs text-text-secondary">{s.label}</span>
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <p className="text-xl font-bold font-[family-name:var(--font-jetbrains)]">{s.value}</p>
                <p className="text-xs text-success mt-1">{s.change} vs last period</p>
              </Card>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
