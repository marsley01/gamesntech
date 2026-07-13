"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function OrderPage() {
  const params = useParams();
  const orderId = params.id as string;

  return (
    <main className="pt-20 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-2xl">📦</span>
        </div>
        <h1 className="text-2xl font-bold mb-2 font-[family-name:var(--font-inter)]">Order #{orderId}</h1>
        <p className="text-text-secondary mb-6">Loading order details...</p>
        <Link href="/store" className="text-primary text-sm hover:underline">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
