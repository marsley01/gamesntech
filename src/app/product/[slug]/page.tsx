"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { createClient } from "@/lib/supabase/client";
import type { Product } from "@/types";
import Link from "next/link";

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("slug", slug)
      .eq("status", "active")
      .single()
      .then(({ data, error }) => {
        if (data && !error) setProduct(data as Product);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <main className="pt-20 min-h-screen">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        </div>
      </main>
    );
  }

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
