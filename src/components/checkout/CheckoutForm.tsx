"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { formatKES } from "@/lib/utils";
import { products } from "@/lib/data";
import {
  ArrowLeft,
  Phone,
  Gamepad2,
  Smartphone,
  Shield,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

const steps = ["Product", "Details", "Payment"];

export function CheckoutForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselected = searchParams.get("product");

  const [step, setStep] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(
    products.find((p) => p.slug === preselected) || null
  );
  const [gameId, setGameId] = useState("");
  const [phone, setPhone] = useState("254");
  const [email, setEmail] = useState("");
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    setProcessing(true);
    // Simulate M-Pesa STK Push
    await new Promise((r) => setTimeout(r, 2000));
    const orderId = `GNT-${Date.now().toString(36).toUpperCase()}`;
    router.push(`/order/${orderId}`);
  };

  return (
    <main className="pt-24 pb-16 min-h-screen">
      <Container className="max-w-2xl">
        <Link
          href={selectedProduct ? `/product/${selectedProduct.slug}` : "/store"}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        {/* Steps */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  i <= step
                    ? "bg-primary text-black"
                    : "bg-surface-light text-muted"
                }`}
              >
                {i < step ? "✓" : i + 1}
              </div>
              <span
                className={`text-sm hidden sm:inline ${
                  i <= step ? "text-foreground" : "text-muted"
                }`}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`w-8 h-0.5 ${
                    i < step ? "bg-primary" : "bg-surface-light"
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
              <h2 className="text-2xl font-bold">Select Product</h2>
              <div className="grid gap-3">
                {products.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProduct(p)}
                    className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                      selectedProduct?.id === p.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-surface hover:border-border-light"
                    }`}
                  >
                    <span className="text-2xl">
                      {p.category === "gaming" ? "🎮" : p.category === "software" ? "💻" : "☁️"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-muted truncate">{p.description}</p>
                    </div>
                    <span className="text-lg font-bold text-primary shrink-0">
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
              <h2 className="text-2xl font-bold">Enter Details</h2>

              {selectedProduct?.category === "gaming" && (
                <Input
                  label="Game ID / Username"
                  placeholder="Enter your gaming account ID or username"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  id="gameId"
                />
              )}

              <Input
                label="Email Address"
                type="email"
                placeholder="Where to send your code"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
              />

              <div className="rounded-xl border border-border bg-surface p-4">
                <div className="flex items-center gap-3 text-sm">
                  <Smartphone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">M-Pesa Payment</p>
                    <p className="text-muted text-xs">
                      You will receive an STK Push prompt on your phone
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button
                  fullWidth
                  size="lg"
                  disabled={!email || (selectedProduct?.category === "gaming" && !gameId)}
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
              <h2 className="text-2xl font-bold">Confirm & Pay</h2>

              <div className="rounded-2xl border border-border bg-surface p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted">Product</span>
                  <span className="font-semibold">{selectedProduct?.name}</span>
                </div>
                {gameId && (
                  <div className="flex items-center justify-between">
                    <span className="text-muted">Game ID</span>
                    <span className="font-semibold">{gameId}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-muted">Email</span>
                  <span className="font-semibold">{email}</span>
                </div>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-black text-primary">
                    {formatKES(selectedProduct?.price || 0)}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-surface p-4 flex items-center gap-4">
                <Phone className="h-10 w-10 text-primary" />
                <div className="flex-1">
                  <p className="text-sm text-muted mb-2">M-Pesa Phone Number</p>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="2547XXXXXXXX"
                    className="w-full bg-transparent text-lg font-semibold text-foreground focus:outline-none"
                  />
                </div>
                <Badge>STK Push</Badge>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted">
                <Shield className="h-3 w-3" />
                Secured with SSL encryption. Your data is safe.
              </div>

              <div className="flex gap-3">
                <Button variant="ghost" onClick={() => setStep(1)}>
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
        </AnimatePresence>
      </Container>
    </main>
  );
}
