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
              <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-inter)]">Products</h1>
              <p className="text-sm text-text-secondary mt-1">{products.length} products</p>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>

          <div className="space-y-3">
            {products.map((product) => (
              <Card key={product.id} hover={false} className="flex items-center gap-5 p-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg shrink-0">
                  {product.category === "gaming" ? "🎮" : product.category === "software" ? "💻" : product.category === "ai" ? "🤖" : product.category === "gift-cards" ? "🎁" : "📺"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-text-primary">{product.name}</p>
                    {product.featured && <Badge variant="orange">Featured</Badge>}
                    {product.badge && <Badge variant="blue">{product.badge}</Badge>}
                  </div>
                  <p className="text-xs text-text-secondary truncate mt-0.5">{product.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-bold font-[family-name:var(--font-jetbrains)] text-primary">{formatKES(product.price)}</p>
                  <p className="text-[11px] text-text-secondary capitalize">{product.category.replace("-", " ")}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="sm" variant="ghost"><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button size="sm" variant="ghost"><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </main>
    </div>
  );
}
