"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { formatKES, formatDate } from "@/lib/utils";
import { Search } from "lucide-react";

const customers = [
  { name: "John K.", email: "john@example.com", phone: "+254 712 345 678", orders: 12, spent: 45800, joined: new Date("2025-06-01"), status: "active" as const },
  { name: "Mary W.", email: "mary@example.com", phone: "+254 723 456 789", orders: 8, spent: 22300, joined: new Date("2025-08-15"), status: "active" as const },
  { name: "Peter O.", email: "peter@example.com", phone: "+254 734 567 890", orders: 3, spent: 4500, joined: new Date("2026-01-10"), status: "active" as const },
  { name: "Grace M.", email: "grace@example.com", phone: "+254 745 678 901", orders: 1, spent: 599, joined: new Date("2026-03-22"), status: "new" as const },
  { name: "James N.", email: "james@example.com", phone: "+254 756 789 012", orders: 0, spent: 0, joined: new Date("2026-04-01"), status: "inactive" as const },
];

export default function AdminCustomers() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 pt-8 pb-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-inter)]">Customers</h1>
              <p className="text-sm text-text-secondary mt-1">{customers.length} total customers</p>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search customers..."
                className="h-10 w-60 rounded-xl border border-[rgba(255,255,255,0.08)] bg-surface pl-10 pr-4 text-xs text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-accent-purple/30 focus:ring-1 focus:ring-accent-purple/20 transition-all"
              />
            </div>
          </div>

          <Card hover={false} className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.06)] bg-white/[0.02]">
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Customer</th>
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Phone</th>
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Orders</th>
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Spent</th>
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Joined</th>
                    <th className="text-left py-3 px-5 font-semibold text-text-secondary tracking-wide font-[family-name:var(--font-space)]">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((c) => (
                    <tr key={c.email} className="border-b border-[rgba(255,255,255,0.04)] last:border-0 hover:bg-white/[0.02] transition-colors">
                      <td className="py-3 px-5">
                        <p className="text-text-primary font-medium">{c.name}</p>
                        <p className="text-text-secondary">{c.email}</p>
                      </td>
                      <td className="py-3 px-5 text-text-secondary">{c.phone}</td>
                      <td className="py-3 px-5 font-bold font-[family-name:var(--font-jetbrains)]">{c.orders}</td>
                      <td className="py-3 px-5 font-bold font-[family-name:var(--font-jetbrains)] text-accent-purple">{formatKES(c.spent)}</td>
                      <td className="py-3 px-5 text-text-secondary">{formatDate(c.joined)}</td>
                      <td className="py-3 px-5">
                        <Badge variant={c.status === "active" ? "success" : c.status === "new" ? "blue" : "default"}>
                          {c.status}
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
