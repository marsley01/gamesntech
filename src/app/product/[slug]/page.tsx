"use client";

import { ProductDetail } from "@/components/product/ProductDetail";
import Link from "next/link";

export default function ProductPage() {
  const product = null as unknown as { id: string; name: string; slug: string; description: string; price: number; image: string; images: string[]; category: string; platform?: string };

  if (!product) {
    return (
      <main className="pt-20 min-h-screen">
        <div className="text-center py-20">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <Link href="/store" className="text-primary hover:underline text-sm">
            Browse all products
          </Link>
        </div>
      </main>
    );
  }

  return <ProductDetail product={product} />;
}
