import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Suspense } from "react";

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutForm />
    </Suspense>
  );
}
