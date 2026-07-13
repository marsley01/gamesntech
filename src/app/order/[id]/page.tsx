"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { formatKES, formatDate } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import type { Order } from "@/types";
import { CheckCircle, XCircle, Clock, ArrowLeft } from "lucide-react";

const statusConfig: Record<string, { icon: typeof CheckCircle; color: string; text: string }> = {
  pending: { icon: Clock, color: "text-accent-orange", text: "Awaiting Payment" },
  completed: { icon: CheckCircle, color: "text-accent-green", text: "Payment Confirmed" },
  failed: { icon: XCircle, color: "text-error", text: "Payment Failed" },
  refunded: { icon: XCircle, color: "text-error", text: "Refunded" },
};

export default function OrderPage() {
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<(Order & { product_title?: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("orders")
      .select("*, products!inner(title)")
      .eq("id", orderId)
      .single()
      .then(({ data, error }) => {
        if (data && !error) {
          type OrderRow = Order & { products: { title: string } | null };
          const o = data as OrderRow;
          setOrder({ ...o, product_title: o.products?.title || "Unknown Product" });
        }
        setLoading(false);
      });
  }, [orderId]);

  if (loading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin mx-auto" />
          <p className="text-text-secondary mt-4 text-sm">Loading order...</p>
        </div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-error/10 flex items-center justify-center mx-auto mb-6">
            <XCircle className="h-8 w-8 text-error" />
          </div>
          <h1 className="text-2xl font-bold mb-2 font-[family-name:var(--font-inter)]">Order Not Found</h1>
          <p className="text-text-secondary mb-6">This order doesn&apos;t exist or you don&apos;t have access to it.</p>
          <Link href="/store" className="text-primary text-sm hover:underline">
            Continue shopping
          </Link>
        </div>
      </main>
    );
  }

  const StatusIcon = statusConfig[order.status]?.icon || Clock;

  return (
    <main className="pt-20 min-h-screen">
      <Container className="max-w-lg py-16">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-text-primary mb-8 transition-colors font-[family-name:var(--font-space)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Account
        </Link>

        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <StatusIcon className={`h-8 w-8 ${statusConfig[order.status]?.color || "text-text-secondary"}`} />
          </div>
          <h1 className="text-2xl font-bold mb-1 font-[family-name:var(--font-inter)]">
            {statusConfig[order.status]?.text || "Unknown"}
          </h1>
          <p className="text-text-secondary text-sm">Order #{order.id.slice(0, 8)}</p>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-6 space-y-4 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Product</span>
            <span className="text-sm font-semibold text-text-primary">{order.product_title}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Amount Paid</span>
            <span className="text-lg font-bold font-[family-name:var(--font-jetbrains)] text-primary">
              {formatKES(order.amount_paid)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Status</span>
            <Badge variant={
              order.status === "completed" ? "success" :
              order.status === "failed" ? "error" :
              order.status === "refunded" ? "error" : "orange"
            }>
              {order.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Date</span>
            <span className="text-sm text-text-primary">{formatDate(order.created_at)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">M-Pesa Phone</span>
            <span className="text-sm font-mono">{order.mpesa_phone}</span>
          </div>
          {order.mpesa_transaction_code && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">Transaction Code</span>
              <span className="text-sm font-mono text-primary">{order.mpesa_transaction_code}</span>
            </div>
          )}
        </div>

        {order.status === "completed" && (
          <Link
            href={`/api/download/${order.download_token}`}
            className="inline-flex items-center justify-center w-full h-13 px-8 text-sm rounded-xl gap-3 font-semibold transition-all duration-300 bg-primary text-black hover:bg-primary-hover shadow-lg active:scale-[0.97] font-[family-name:var(--font-space)]"
          >
            Download
          </Link>
        )}

        <p className="text-center text-xs text-text-secondary mt-4">
          Questions?{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact support
          </Link>
        </p>
      </Container>
    </main>
  );
}
