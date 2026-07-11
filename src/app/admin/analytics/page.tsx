"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { formatKES } from "@/lib/utils";
import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";

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
            <h1 className="text-3xl font-black tracking-tight">Analytics</h1>
            <p className="text-muted mt-1">Revenue & performance metrics</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card hover={false}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Monthly Revenue</h3>
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-end gap-3 h-40">
                {monthlyData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-muted">
                      {formatKES(d.revenue).replace("KES ", "")}
                    </span>
                    <div
                      className="w-full rounded-lg bg-primary/80 hover:bg-primary transition-colors"
                      style={{
                        height: `${(d.revenue / maxRevenue) * 100}%`,
                      }}
                    />
                    <span className="text-xs text-muted">{d.month}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card hover={false}>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Monthly Orders</h3>
                <ShoppingBag className="h-5 w-5 text-primary" />
              </div>
              <div className="flex items-end gap-3 h-40">
                {monthlyData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <span className="text-xs text-muted">{d.orders}</span>
                    <div
                      className="w-full rounded-lg bg-accent/80 hover:bg-accent transition-colors"
                      style={{
                        height: `${(d.orders / maxOrders) * 100}%`,
                      }}
                    />
                    <span className="text-xs text-muted">{d.month}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mt-8">
            {[
              { label: "Total Revenue (6mo)", value: formatKES(1083000), change: "+18.2%", icon: TrendingUp },
              { label: "Total Orders", value: "755", change: "+12.4%", icon: ShoppingBag },
              { label: "Avg Order Value", value: formatKES(1434), change: "+5.1%", icon: Users },
            ].map((s) => (
              <Card key={s.label} hover={false}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm text-muted">{s.label}</span>
                  <s.icon className="h-4 w-4 text-primary" />
                </div>
                <p className="text-2xl font-black">{s.value}</p>
                <p className="text-xs text-success mt-1">{s.change} vs last period</p>
              </Card>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
