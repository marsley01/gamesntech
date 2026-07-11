"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { formatKES, formatDate } from "@/lib/utils";
import { Search } from "lucide-react";

const orders = [
  { id: "GNT-001", customer: "John K.", email: "john@example.com", product: "Xbox Game Pass Ultimate", amount: 2499, status: "completed" as const, date: new Date() },
  { id: "GNT-002", customer: "Mary W.", email: "mary@example.com", product: "Steam Wallet Credits", amount: 500, status: "completed" as const, date: new Date() },
  { id: "GNT-003", customer: "Peter O.", email: "peter@example.com", product: "Netflix Premium", amount: 1499, status: "processing" as const, date: new Date() },
  { id: "GNT-004", customer: "Grace M.", email: "grace@example.com", product: "Spotify Premium", amount: 599, status: "pending" as const, date: new Date() },
  { id: "GNT-005", customer: "James N.", email: "james@example.com", product: "NVIDIA GeForce NOW", amount: 1499, status: "failed" as const, date: new Date() },
];

const statusVariant = {
  completed: "success" as const,
  processing: "blue" as const,
  pending: "orange" as const,
  failed: "error" as const,
  confirmed: "blue" as const,
};

export default function AdminOrders() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 pt-8 pb-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-inter)]">Orders</h1>
              <p className="text-sm text-text-secondary mt-1">{orders.length} total orders</p>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search orders..."
                className="h-10 w-60 rounded-xl border border-[rgba(255,255,255,0.08)] bg-surface pl-10 pr-4 text-xs text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <Card hover={false} className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.06)] bg-white/[0.02]">
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Order</th>
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Customer</th>
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Product</th>
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Amount</th>
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Date</th>
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-[rgba(255,255,255,0.04)] last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5 font-mono font-[family-name:var(--font-jetbrains)] text-text-primary">{order.id}</td>
                      <td className="py-3 px-5">
                        <p className="text-text-primary font-medium">{order.customer}</p>
                        <p className="text-text-secondary">{order.email}</p>
                      </td>
                      <td className="py-3 px-5 text-text-primary">{order.product}</td>
                      <td className="py-3 px-5 font-bold font-[family-name:var(--font-jetbrains)] text-primary">{formatKES(order.amount)}</td>
                      <td className="py-3 px-5 text-text-secondary">{formatDate(order.date)}</td>
                      <td className="py-3 px-5">
                        <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Container>
      </main>
    </div>
  );
}
