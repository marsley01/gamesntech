"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/effects/Particles";
import { CheckCircle, Copy, Gift, ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";

interface CodeRevealProps {
  orderId: string;
  productName: string;
  code: string;
}

export function CodeReveal({ orderId, productName, code }: CodeRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleReveal = () => setRevealed(true);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen pt-20 pb-16 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/[0.03] via-transparent to-transparent pointer-events-none" />
      <Particles count={30} color="124, 58, 237" />

      <Container className="max-w-lg relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, stiffness: 200, damping: 20 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </motion.div>

          <div>
            <Badge variant="success" className="mb-4">Payment Confirmed</Badge>
            <h1 className="text-3xl md:text-4xl font-bold leading-[1.1] tracking-tight font-[family-name:var(--font-inter)]">
              Your Code is Ready
            </h1>
            <p className="text-text-secondary mt-2 text-sm">
              Order{" "}
              <span className="text-text-primary font-mono font-[family-name:var(--font-jetbrains)]">{orderId}</span>
            </p>
          </div>

          <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface p-6 space-y-4">
            <p className="text-sm text-text-secondary">{productName}</p>

            {!revealed ? (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  onClick={handleReveal}
                  className="w-full py-8 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue text-white font-semibold text-sm relative overflow-hidden group shadow-lg shadow-accent-purple/20 font-[family-name:var(--font-space)]"
                >
                  <motion.span
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-2"
                  >
                    <Gift className="h-5 w-5" />
                    Tap to Reveal Code
                  </motion.span>
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_15px,rgba(255,255,255,0.03)_15px,rgba(255,255,255,0.03)_30px)]" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, rotateX: 25 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
                className="space-y-4"
              >
                <motion.div
                  initial={{ filter: "blur(15px)" }}
                  animate={{ filter: "blur(0)" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-bg-secondary rounded-xl p-5 border border-[rgba(255,255,255,0.06)]"
                >
                  <p className="text-[11px] text-text-secondary tracking-wider uppercase mb-2 font-medium">Your Code</p>
                  <p className="text-xl md:text-2xl font-bold font-[family-name:var(--font-jetbrains)] tracking-[0.3em] text-accent-purple break-all">
                    {code}
                  </p>
                </motion.div>

                <Button
                  fullWidth
                  variant={copied ? "secondary" : "primary"}
                  onClick={handleCopy}
                >
                  <Copy className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy Code"}
                </Button>

                <p className="text-xs text-text-secondary flex items-center justify-center gap-1">
                  <Sparkles className="h-3 w-3 text-accent-gold" />
                  Also sent to your email and SMS
                </p>
              </motion.div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/account">
              <Button fullWidth variant="secondary">
                View Order History
              </Button>
            </Link>
            <Link href="/store">
              <Button fullWidth variant="ghost">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
