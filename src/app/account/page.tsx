"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { OrderHistory } from "@/components/account/OrderHistory";
import { formatKES } from "@/lib/utils";
import type { Order } from "@/lib/data";
import { User, Mail, Phone, MapPin, CreditCard, TrendingUp, Package } from "lucide-react";

// Simulated data — in production, fetch from Supabase
const mockOrders: Order[] = [
  {
    id: "GNT-ABC123",
    product_id: "1",
    product_name: "NVIDIA GeForce NOW",
    product_image: "",
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
    price: 2499,
    status: "processing",
    created_at: new Date().toISOString(),
    payment_method: "M-Pesa",
  },
];

export default function AccountPage() {
  const totalSpent = mockOrders
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.price, 0);

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <Container>
        <div className="grid lg:grid-cols-[1fr_2fr] gap-10">
          {/* Profile Sidebar */}
          <div className="space-y-6">
            <Card hover={false}>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-black" />
                </div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm text-muted">Premium Member</p>
              </div>

              <div className="mt-6 space-y-4 pt-6 border-t border-border">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted" />
                  <span className="text-muted">john@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted" />
                  <span className="text-muted">+254 712 345 678</span>
                </div>
              </div>
            </Card>

            <Card hover={false}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Total Spent</span>
                  <span className="text-xl font-black text-primary">{formatKES(totalSpent)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Orders</span>
                  <span className="font-bold">{mockOrders.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted">Member Since</span>
                  <span className="text-sm font-medium">Jan 2026</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-black tracking-tight">My Account</h1>
              <p className="text-muted mt-1">Manage your orders and profile</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Package, label: "Total Orders", value: mockOrders.length.toString() },
                { icon: TrendingUp, label: "Completed", value: mockOrders.filter((o) => o.status === "completed").length.toString() },
                { icon: CreditCard, label: "Total Spent", value: formatKES(totalSpent) },
              ].map((stat) => (
                <Card key={stat.label} hover={false} className="text-center p-4">
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <p className="text-lg font-black">{stat.value}</p>
                  <p className="text-xs text-muted">{stat.label}</p>
                </Card>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
              <OrderHistory orders={mockOrders} />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
