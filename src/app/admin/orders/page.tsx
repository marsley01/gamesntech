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

export default function AdminOrders() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 pt-8 pb-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Orders</h1>
              <p className="text-muted mt-1">{orders.length} total orders</p>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
              <input
                type="text"
                placeholder="Search orders..."
                className="h-11 w-64 rounded-xl border border-border bg-surface pl-10 pr-4 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <Card hover={false} className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-light">
                    <th className="text-left py-3 px-5 font-semibold text-muted">Order ID</th>
                    <th className="text-left py-3 px-5 font-semibold text-muted">Customer</th>
                    <th className="text-left py-3 px-5 font-semibold text-muted">Product</th>
                    <th className="text-left py-3 px-5 font-semibold text-muted">Amount</th>
                    <th className="text-left py-3 px-5 font-semibold text-muted">Date</th>
                    <th className="text-left py-3 px-5 font-semibold text-muted">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-surface-light transition-colors">
                      <td className="py-3 px-5 font-mono text-xs">{order.id}</td>
                      <td className="py-3 px-5">
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-xs text-muted">{order.email}</p>
                      </td>
                      <td className="py-3 px-5">{order.product}</td>
                      <td className="py-3 px-5 font-bold">{formatKES(order.amount)}</td>
                      <td className="py-3 px-5 text-muted">{formatDate(order.date)}</td>
                      <td className="py-3 px-5">
                        <Badge variant={order.status === "completed" ? "success" : order.status === "processing" ? "primary" : order.status === "pending" ? "warning" : "error"}>
                          {order.status}
                        </Badge>
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
