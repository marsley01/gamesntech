"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { formatKES } from "@/lib/utils";
import type { Product } from "@/types";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowLeft,
  Smartphone,
  Shield,
  Package,
  CreditCard,
  Loader2,
} from "lucide-react";
import Link from "next/link";

const steps = [
  { num: 1, label: "Product" },
  { num: 2, label: "Details" },
  { num: 3, label: "Pay" },
  { num: 4, label: "Processing" },
];

export function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselected = searchParams.get("product");

  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [step, setStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [gameId, setGameId] = useState("");
  const [phone, setPhone] = useState("254");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("products")
      .select("*")
      .eq("status", "active")
      .order("title", { ascending: true })
      .then(({ data }) => {
        if (data) {
          const products = data as Product[];
          setProducts(products);
          if (preselected) {
            const match = products.find((p) => p.slug === preselected);
            if (match) setSelectedProduct(match);
          }
        }
        setProductsLoading(false);
      });
  }, [preselected]);

  const handlePayment = async () => {
    setProcessing(true);
    setStep(3);
    await new Promise((r) => setTimeout(r, 3000));
    const orderId = `GNT-${Date.now().toString(36).toUpperCase()}`;
    router.push(`/order/${orderId}`);
  };

  if (productsLoading) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent pointer-events-none" />
      <Container className="max-w-xl relative">
        <Link
          href={selectedProduct ? `/product/${selectedProduct.slug}` : "/store"}
          className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-text-primary mb-8 transition-colors font-[family-name:var(--font-space)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back
        </Link>

        <div className="flex items-center gap-3 mb-12">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 font-[family-name:var(--font-space)] ${
                  i <= step
                    ? "bg-primary text-black shadow-lg"
                    : "bg-surface text-text-secondary border border-border"
                }`}
              >
                {i < step ? "✓" : s.num}
              </div>
              <span
                className={`text-xs hidden sm:inline font-medium ${
                  i <= step ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`w-6 h-px ${
                    i < step ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-inter)] tracking-tight">Select Product</h2>
                <p className="text-sm text-text-secondary mt-1">Choose what you want to purchase.</p>
              </div>
              <div className="space-y-3">
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-300 w-full ${
                      selectedProduct?.id === p.id
                        ? "border-primary/30 bg-primary/[0.03]"
                        : "border-border bg-surface hover:bg-surface-elevated hover:border-border-hover"
                    }`}
                  >
                    <div className="flex-1 min-w-0 text-left">
                      <p className="text-sm font-semibold text-text-primary">{p.title}</p>
                      <p className="text-xs text-text-secondary truncate">{p.description}</p>
                    </div>
                    <span className="text-base font-bold font-[family-name:var(--font-jetbrains)] text-primary shrink-0">
                      {formatKES(p.price)}
                    </span>
                  </button>
                ))}
              </div>
              <Button
                fullWidth
                size="lg"
                disabled={!selectedProduct}
                onClick={() => setStep(1)}
              >
                Continue — {selectedProduct ? formatKES(selectedProduct.price) : ""}
              </Button>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-inter)] tracking-tight">Enter Details</h2>
                <p className="text-sm text-text-secondary mt-1">Where should we send your code?</p>
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="code@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />

              {selectedProduct?.category === "game_keys" && (
                <Input
                  label="Game ID / Username"
                  placeholder="Enter your gaming account ID"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  id="gameId"
                />
              )}

              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center gap-3 text-sm">
                  <Smartphone className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">M-Pesa Payment</p>
                    <p className="text-xs text-text-secondary">STK Push prompt sent to your phone</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="ghost" size="md" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button
                  fullWidth
                  size="lg"
                  disabled={!email}
                  onClick={() => setStep(2)}
                >
                  Continue to Payment
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold font-[family-name:var(--font-inter)] tracking-tight">Confirm & Pay</h2>
                <p className="text-sm text-text-secondary mt-1">Review your order before payment.</p>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-6 space-y-4 shadow-gnt">
                <div className="flex items-center gap-4">
                  <Package className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Product</span>
                    <span className="text-sm font-semibold text-text-primary">{selectedProduct?.title}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <CreditCard className="h-5 w-5 text-primary shrink-0" />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Payment</span>
                    <span className="text-sm font-semibold text-text-primary">M-Pesa</span>
                  </div>
                </div>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <span className="text-base font-bold font-[family-name:var(--font-inter)]">Total</span>
                  <span className="text-2xl font-bold font-[family-name:var(--font-jetbrains)] text-primary">
                    {formatKES(selectedProduct?.price || 0)}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4">
                <p className="text-xs text-text-secondary mb-2 font-medium">M-Pesa Phone Number</p>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="2547XXXXXXXX"
                  className="w-full bg-transparent text-lg font-semibold font-[family-name:var(--font-jetbrains)] text-text-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <Shield className="h-3 w-3" />
                Secured with SSL encryption
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" size="md" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  fullWidth
                  size="lg"
                  loading={processing}
                  onClick={handlePayment}
                >
                  {processing ? "Sending STK Push..." : `Pay ${formatKES(selectedProduct?.price || 0)}`}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 space-y-6"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto"
              >
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
              </motion.div>

              <div>
                <h2 className="text-xl font-bold font-[family-name:var(--font-inter)] tracking-tight mb-2">
                  Processing Payment
                </h2>
                <p className="text-sm text-text-secondary">
                  Please check your phone for the M-Pesa STK Push prompt
                </p>
              </div>

              <div className="max-w-xs mx-auto space-y-3">
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <div className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                  Sending STK Push to {phone}
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary">
                  <div className="w-5 h-5 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                  Waiting for confirmation
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary/40">
                  <div className="w-5 h-5 rounded-full border-2 border-border" />
                  Delivering your code
                </div>
              </div>

              <p className="text-xs text-text-secondary">
                Do not close this page. You will be redirected automatically.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </main>
  );
}
