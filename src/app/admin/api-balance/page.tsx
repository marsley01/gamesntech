"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { formatKES } from "@/lib/utils";
import { Wallet, RefreshCw, AlertTriangle } from "lucide-react";

export default function AdminApiBalance() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 pt-8 pb-16">
        <Container>
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-inter)]">API Balance</h1>
            <p className="text-sm text-text-secondary mt-1">Reloadly wallet & API usage monitor</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-5 mb-10">
            <Card hover={false} className="lg:col-span-2 p-5">
              <div className="flex items-start justify-between mb-5">
                <div>
                  <p className="text-xs text-text-secondary mb-1">Reloadly Wallet Balance</p>
                  <p className="text-3xl font-bold font-[family-name:var(--font-jetbrains)] text-primary">{formatKES(45200)}</p>
                </div>
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">Low balance alert at</span>
                  <span className="font-medium font-[family-name:var(--font-jetbrains)]">KES 10,000</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/[0.04] overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: "45%" }} />
                </div>
                <div className="flex items-center gap-2 text-xs text-warning">
                  <AlertTriangle className="h-3 w-3" />
                  Balance below 50%. Top up recommended.
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <Card hover={false} className="p-5">
                <p className="text-xs text-text-secondary mb-1">API Calls Today</p>
                <p className="text-xl font-bold font-[family-name:var(--font-jetbrains)]">847</p>
                <p className="text-xs text-success mt-1">+12% vs yesterday</p>
              </Card>
              <Card hover={false} className="p-5">
                <p className="text-xs text-text-secondary mb-1">Success Rate</p>
                <p className="text-xl font-bold font-[family-name:var(--font-jetbrains)]">98.7%</p>
                <p className="text-xs text-success mt-1">Last 24 hours</p>
              </Card>
              <Button fullWidth size="sm">
                <RefreshCw className="h-4 w-4" />
                Refresh Balance
              </Button>
            </div>
          </div>

          <Card hover={false} className="p-5">
            <h3 className="text-sm font-bold font-[family-name:var(--font-inter)] mb-4">Recent API Transactions</h3>
            <div className="space-y-3">
              {[
                { ref: "TXN-001", product: "Xbox Game Pass", amount: 2200, status: "success" as const, time: "2 min ago" },
                { ref: "TXN-002", product: "Steam Wallet", amount: 400, status: "success" as const, time: "15 min ago" },
                { ref: "TXN-003", product: "Netflix Premium", amount: 1300, status: "failed" as const, time: "1 hour ago" },
              ].map((tx) => (
                <div key={tx.ref} className="flex items-center justify-between py-2.5 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                  <div>
                    <p className="text-sm text-text-primary">{tx.product}</p>
                    <p className="text-xs text-text-secondary">{tx.ref} &middot; {tx.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold font-[family-name:var(--font-jetbrains)]">{formatKES(tx.amount)}</p>
                    <Badge variant={tx.status === "success" ? "success" : "error"}>{tx.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Container>
      </main>
    </div>
  );
}
