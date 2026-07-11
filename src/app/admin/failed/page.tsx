"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { formatKES, formatDate } from "@/lib/utils";
import { RefreshCw, XCircle } from "lucide-react";

const failedTx = [
  { id: "GNT-005", customer: "James N.", product: "NVIDIA GeForce NOW", amount: 1499, reason: "M-Pesa timeout", date: new Date(), retry: 2 },
  { id: "GNT-008", customer: "Sarah K.", product: "Spotify Premium", amount: 599, reason: "Insufficient balance", date: new Date(), retry: 1 },
  { id: "GNT-012", customer: "Brian O.", product: "Steam Wallet", amount: 500, reason: "API error", date: new Date(), retry: 0 },
];

export default function AdminFailed() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 pt-8 pb-16">
        <Container>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-inter)]">Failed Transactions</h1>
            <p className="text-sm text-text-secondary mt-1">{failedTx.length} pending resolution</p>
          </div>

          <div className="space-y-3">
            {failedTx.map((tx) => (
              <Card key={tx.id} hover={false} className="flex items-center gap-5 p-4">
                <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
                  <XCircle className="h-5 w-5 text-error" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-text-primary">{tx.product}</p>
                    <Badge variant="error">Failed</Badge>
                  </div>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {tx.customer} &middot; {tx.id} &middot; {formatDate(tx.date)}
                  </p>
                  <p className="text-xs text-error mt-1">Reason: {tx.reason}</p>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  <p className="text-sm font-bold font-[family-name:var(--font-jetbrains)] text-accent-purple">{formatKES(tx.amount)}</p>
                  <p className="text-xs text-text-secondary">Retries: {tx.retry}/3</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm">
                    <RefreshCw className="h-4 w-4" />
                    Retry
                  </Button>
                  <Button size="sm" variant="danger">
                    Refund
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
