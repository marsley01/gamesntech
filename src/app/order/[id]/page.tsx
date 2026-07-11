"use client";

import { useParams } from "next/navigation";
import { CodeReveal } from "@/components/order/CodeReveal";

export default function OrderPage() {
  const params = useParams();
  const orderId = params.id as string;

  // Simulated order data — in production, fetch from Supabase
  return (
    <CodeReveal
      orderId={orderId}
      productName="NVIDIA GeForce NOW"
      code="GNT-XK9M-2P4R-7W8Q"
    />
  );
}
