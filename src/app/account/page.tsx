"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatKES, formatDate } from "@/lib/utils";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import type { Profile, Order } from "@/types";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  TrendingUp,
  Package,
  Eye,
} from "lucide-react";
import Link from "next/link";

const statusVariant: Record<string, "orange" | "success" | "blue" | "error"> = {
  pending: "orange",
  completed: "success",
  failed: "error",
  refunded: "error",
};

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<(Order & { product_title?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const [profileRes, ordersRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", user.id).single(),
        supabase
          .from("orders")
          .select("*, products!inner(title)")
          .eq("buyer_id", user.id)
          .order("created_at", { ascending: false }),
      ]);

      if (profileRes.data) setProfile(profileRes.data as Profile);
      if (ordersRes.data) {
        type OrderRow = Order & { products: { title: string } | null };
        setOrders(
          (ordersRes.data as OrderRow[]).map((o) => ({
            ...o,
            product_title: o.products?.title || "Unknown Product",
          }))
        );
      }
      setLoading(false);
    }
    load();
  }, []);

  const totalSpent = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.amount_paid, 0);

  const completedCount = orders.filter((o) => o.status === "completed").length;

  const stats = [
    { icon: Package, label: "Total Orders", value: orders.length.toString() },
    { icon: TrendingUp, label: "Completed", value: completedCount.toString() },
    { icon: CreditCard, label: "Total Spent", value: formatKES(totalSpent) },
  ];

  if (loading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </main>
    );
  }

  return (
    <main className="pt-20 pb-16 min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />
      <Container className="relative">
        <div className="grid lg:grid-cols-[320px_1fr] gap-10">
          <div className="space-y-5">
            <Card hover={false} className="p-6">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-4">
                  <User className="h-7 w-7 text-black" />
                </div>
                <h2 className="text-lg font-bold font-[family-name:var(--font-inter)]">
                  {profile?.full_name || "User"}
                </h2>
                <p className="text-xs text-text-secondary mt-1">Customer</p>
              </div>

              <div className="mt-6 space-y-3 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-xs">
                  <Mail className="h-3.5 w-3.5 text-text-secondary shrink-0" />
                  <span className="text-text-secondary">{profile?.email || "—"}</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <Phone className="h-3.5 w-3.5 text-text-secondary shrink-0" />
                  <span className="text-text-secondary">{profile?.mpesa_phone || "—"}</span>
                </div>
              </div>
            </Card>

            <Card hover={false} className="p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Total Spent</span>
                  <span className="text-lg font-bold font-[family-name:var(--font-jetbrains)] text-primary">{formatKES(totalSpent)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Orders</span>
                  <span className="text-sm font-bold font-[family-name:var(--font-jetbrains)]">{orders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Member Since</span>
                  <span className="text-xs font-medium">
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString("en-KE", {
                          month: "short",
                          year: "numeric",
                        })
                      : "—"}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-primary mb-2 font-medium font-[family-name:var(--font-space)]">Dashboard</p>
              <h1 className="text-3xl md:text-4xl font-bold leading-[1.05] tracking-tight font-[family-name:var(--font-inter)]">My Account</h1>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <Card key={stat.label} hover={false} className="text-center p-4">
                  <stat.icon className="h-4 w-4 text-primary mx-auto mb-2" />
                  <p className="text-lg font-bold font-[family-name:var(--font-jetbrains)]">{stat.value}</p>
                  <p className="text-[11px] text-text-secondary">{stat.label}</p>
                </Card>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold font-[family-name:var(--font-inter)]">Recent Orders</h2>
                <span className="text-xs text-text-secondary font-[family-name:var(--font-jetbrains)]">{orders.length} orders</span>
              </div>

              <div className="space-y-3">
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-text-secondary">No orders yet.</p>
                    <Link href="/store" className="text-primary text-sm hover:underline mt-2 inline-block">
                      Browse products
                    </Link>
                  </div>
                ) : (
                  orders.map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-2xl border border-border bg-surface p-5 hover:bg-surface-elevated hover:border-border-hover transition-all duration-300"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg shrink-0">
                            🎮
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{order.product_title}</p>
                            <p className="text-xs text-text-secondary">{formatDate(order.created_at)}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold font-[family-name:var(--font-jetbrains)] text-primary">{formatKES(order.amount_paid)}</p>
                          <Badge variant={statusVariant[order.status]} className="mt-1">{order.status}</Badge>
                        </div>
                      </div>

                      {order.status === "completed" && (
                        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                          <p className="text-xs font-mono font-bold tracking-wider text-primary/80 font-[family-name:var(--font-jetbrains)]">
                            {order.mpesa_transaction_code || "N/A"}
                          </p>
                          <Link
                            href={`/order/${order.id}`}
                            className="text-xs text-text-secondary hover:text-text-primary transition-colors font-medium flex items-center gap-1"
                          >
                            <Eye className="h-3 w-3" />
                            View
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
