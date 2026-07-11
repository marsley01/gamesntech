"use client";

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { formatKES } from "@/lib/utils";
import { products } from "@/lib/data";
import { Plus, Pencil, Trash2 } from "lucide-react";

export default function AdminProducts() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 pt-8 pb-16">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black tracking-tight">Products</h1>
              <p className="text-muted mt-1">{products.length} products</p>
            </div>
            <Button>
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          <div className="grid gap-4">
            {products.map((product) => (
              <Card key={product.id} hover={false} className="flex items-center gap-5 p-4">
                <div className="w-14 h-14 rounded-xl bg-surface-light flex items-center justify-center text-2xl shrink-0">
                  {product.category === "gaming" ? "🎮" : product.category === "software" ? "💻" : "☁️"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{product.name}</p>
                    {product.featured && <Badge variant="primary">Featured</Badge>}
                    {product.badge && <Badge>{product.badge}</Badge>}
                  </div>
                  <p className="text-sm text-muted truncate">{product.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-primary">{formatKES(product.price)}</p>
                  <p className="text-xs text-muted capitalize">{product.category}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" variant="ghost"><Pencil className="h-4 w-4" /></Button>
                  <Button size="sm" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
