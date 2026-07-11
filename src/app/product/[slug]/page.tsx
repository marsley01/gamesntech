"use client";

import { useParams } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { products } from "@/lib/data";
import Link from "next/link";

export default function ProductPage() {
  const params = useParams();
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <main className="pt-24 pb-16">
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <h1 className="text-2xl font-bold mb-2">Product not found</h1>
          <Link href="/store" className="text-primary hover:underline">
            Browse all products
          </Link>
        </div>
      </main>
    );
  }

  return <ProductDetail product={product} />;
}
