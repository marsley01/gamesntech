"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatKES, formatDate } from "@/lib/utils";
type OrderStatus = 'pending' | 'completed' | 'failed' | 'refunded';
interface Order { id: string; product_name: string; product_image: string; price: number; status: OrderStatus; code?: string; created_at: string; category: string; payment_method: string }
import { Package, Eye } from "lucide-react";
import Link from "next/link";

const statusVariant: Record<OrderStatus, "orange" | "success" | "blue" | "error"> = {
  pending: "orange",
  completed: "success",
  failed: "error",
  refunded: "error",
};

export function OrderHistory({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-10 w-10 text-text-secondary mx-auto mb-4" />
        <p className="text-base font-semibold text-text-primary mb-1">No orders yet</p>
        <p className="text-sm text-text-secondary mb-6">Start shopping to see your orders here.</p>
        <Link href="/store">
          <Button>Browse Store</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order, i) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface p-5 hover:bg-surface-elevated hover:border-[rgba(255,255,255,0.1)] transition-all duration-300"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg shrink-0">
                🎮
              </div>
              <div>
                <p className="text-sm font-semibold text-text-primary">{order.product_name}</p>
                <p className="text-xs text-text-secondary">{formatDate(order.created_at)}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm font-bold font-[family-name:var(--font-jetbrains)] text-primary">{formatKES(order.price)}</p>
              <Badge variant={statusVariant[order.status]} className="mt-1">
                {order.status}
              </Badge>
            </div>
          </div>

          {order.status === "completed" && order.code && (
            <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
              <div>
                <p className="text-[11px] text-text-secondary mb-0.5">Your Code</p>
                <p className="font-mono text-xs font-bold tracking-wider text-primary/80 font-[family-name:var(--font-jetbrains)]">
                  {order.code}
                </p>
              </div>
              <Link href={`/order/${order.id}`}>
                <Button size="sm" variant="ghost">
                  <Eye className="h-3.5 w-3.5" />
                  View
                </Button>
              </Link>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
