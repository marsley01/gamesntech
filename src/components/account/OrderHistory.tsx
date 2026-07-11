"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatKES, formatDate } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/data";
import { Package, RotateCcw, Eye } from "lucide-react";
import Link from "next/link";

const statusVariant: Record<OrderStatus, "primary" | "success" | "warning" | "error" | "info"> = {
  pending: "warning",
  confirmed: "info",
  processing: "primary",
  completed: "success",
  failed: "error",
};

export function OrderHistory({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-12 w-12 text-muted mx-auto mb-4" />
        <p className="text-lg font-semibold mb-1">No orders yet</p>
        <p className="text-sm text-muted mb-6">Start shopping to see your orders here.</p>
        <Link href="/store">
          <Button>Browse Store</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order, i) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl border border-border bg-surface p-5 hover:border-border-light transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-surface-light flex items-center justify-center text-2xl shrink-0">
                🎮
              </div>
              <div>
                <p className="font-semibold">{order.product_name}</p>
                <p className="text-sm text-muted">{formatDate(order.created_at)}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="font-bold text-primary">{formatKES(order.price)}</p>
              <Badge variant={statusVariant[order.status]} className="mt-1">
                {order.status}
              </Badge>
            </div>
          </div>

          {order.status === "completed" && order.code && (
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <p className="text-xs text-muted mb-1">Your Code</p>
                <p className="font-mono text-sm font-bold tracking-wider text-primary">
                  {order.code}
                </p>
              </div>
              <Link href={`/order/${order.id}`}>
                <Button size="sm" variant="ghost">
                  <Eye className="h-4 w-4" />
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
