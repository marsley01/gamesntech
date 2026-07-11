"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatKES, formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/data";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  TrendingUp,
  Package,
  Eye,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const mockOrders: Order[] = [
  {
    id: "GNT-ABC123",
    product_id: "1",
    product_name: "NVIDIA GeForce NOW",
    product_image: "",
    category: "gaming",
    price: 1499,
    status: "completed",
    code: "GNT-XK9M-2P4R-7W8Q",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    payment_method: "M-Pesa",
  },
  {
    id: "GNT-DEF456",
    product_id: "2",
    product_name: "Xbox Game Pass Ultimate",
    product_image: "",
    category: "gaming",
    price: 2499,
    status: "processing",
    created_at: new Date().toISOString(),
    payment_method: "M-Pesa",
  },
  {
    id: "GNT-GHI789",
    product_id: "9",
    product_name: "ChatGPT Plus",
    product_image: "",
    category: "ai",
    price: 2599,
    status: "completed",
    code: "GNT-ABC1-DEF2-GHI3",
    created_at: new Date(Date.now() - 604800000).toISOString(),
    payment_method: "M-Pesa",
  },
];

const statusVariant: Record<OrderStatus, "purple" | "success" | "blue" | "gold" | "error"> = {
  pending: "gold",
  confirmed: "blue",
  processing: "purple",
  completed: "success",
  failed: "error",
};

export default function AccountPage() {
  const totalSpent = mockOrders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.price, 0);

  const stats = [
    { icon: Package, label: "Total Orders", value: mockOrders.length.toString() },
    { icon: TrendingUp, label: "Completed", value: mockOrders.filter((o) => o.status === "completed").length.toString() },
    { icon: CreditCard, label: "Total Spent", value: formatKES(totalSpent) },
  ];

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/[0.02] via-transparent to-transparent pointer-events-none" />
      <Container className="relative">
        <div className="grid lg:grid-cols-[320px_1fr] gap-10">
          {/* Profile sidebar */}
          <div className="space-y-5">
            <Card hover={false} className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center mx-auto mb-4 shadow-lg shadow-accent-purple/20">
                  <User className="h-7 w-7 text-white" />
                </div>
                <h2 className="text-lg font-bold font-[family-name:var(--font-inter)]">John Doe</h2>
                <p className="text-xs text-text-secondary mt-1">Premium Member</p>
              </div>

              <div className="mt-6 space-y-3 pt-6 border-t border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center gap-3 text-xs">
                  <Mail className="h-3.5 w-3.5 text-text-secondary shrink-0" />
                  <span className="text-text-secondary">john@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <Phone className="h-3.5 w-3.5 text-text-secondary shrink-0" />
                  <span className="text-text-secondary">+254 712 345 678</span>
                </div>
              </div>
            </Card>

            <Card hover={false} className="p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Total Spent</span>
                  <span className="text-lg font-bold font-[family-name:var(--font-jetbrains)] text-accent-purple">{formatKES(totalSpent)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Orders</span>
                  <span className="text-sm font-bold font-[family-name:var(--font-jetbrains)]">{mockOrders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Member Since</span>
                  <span className="text-xs font-medium">Jan 2026</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-accent-purple mb-2 font-medium font-[family-name:var(--font-space)]">
                Dashboard
              </p>
              <h1 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight font-[family-name:var(--font-inter)]">
                My Account
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} hover={false} className="text-center p-4">
                  <stat.icon className="h-4 w-4 text-accent-purple mx-auto mb-2" />
                  <p className="text-lg font-bold font-[family-name:var(--font-jetbrains)]">{stat.value}</p>
                  <p className="text-[11px] text-text-secondary">{stat.label}</p>
                </Card>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold font-[family-name:var(--font-inter)]">Recent Orders</h2>
                <span className="text-xs text-text-secondary font-[family-name:var(--font-jetbrains)]">{mockOrders.length} orders</span>
              </div>

              <div className="space-y-3">
                {mockOrders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface p-5 hover:bg-surface-elevated hover:border-[rgba(255,255,255,0.1)] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-accent-purple/10 flex items-center justify-center text-lg shrink-0">
                          {order.category === "gaming" ? "🎮" : order.category === "software" ? "💻" : order.category === "ai" ? "🤖" : "🎁"}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-text-primary">{order.product_name}</p>
                          <p className="text-xs text-text-secondary">{formatDate(order.created_at)}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold font-[family-name:var(--font-jetbrains)] text-accent-purple">{formatKES(order.price)}</p>
                        <Badge variant={statusVariant[order.status]} className="mt-1">{order.status}</Badge>
                      </div>
                    </div>

                    {order.status === "completed" && order.code && (
                      <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                        <p className="text-xs font-mono font-bold tracking-wider text-accent-purple/80 font-[family-name:var(--font-jetbrains)]">
                          {order.code}
                        </p>
                        <Link href={`/order/${order.id}`}>
                          <button className="text-xs text-text-secondary hover:text-text-primary transition-colors font-medium flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            View
                          </button>
                        </Link>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
