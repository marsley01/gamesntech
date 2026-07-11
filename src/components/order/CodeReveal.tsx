"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Copy, Download, Gift, ArrowLeft } from "lucide-react";
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
    <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
      <Container className="max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-success/20 flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
          </motion.div>

          <div>
            <Badge variant="success" className="mb-3">Payment Confirmed</Badge>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Your Code is Ready!
            </h1>
            <p className="text-muted mt-3">
              Order <span className="text-foreground font-mono">{orderId}</span>
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 space-y-3">
            <p className="text-sm text-muted">{productName}</p>

            {!revealed ? (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <button
                  onClick={handleReveal}
                  className="w-full py-6 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-black font-bold text-lg relative overflow-hidden group"
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="inline-flex items-center gap-2"
                  >
                    <Gift className="h-5 w-5" />
                    Tap to Reveal Code
                  </motion.span>
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_20px)]" />
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, rotateX: 25 }}
                animate={{ opacity: 1, rotateX: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-4"
              >
                <motion.div
                  initial={{ filter: "blur(10px)" }}
                  animate={{ filter: "blur(0)" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="bg-background rounded-xl p-5 border border-border"
                >
                  <p className="text-xs text-muted mb-2">Your Code</p>
                  <p className="text-2xl md:text-3xl font-mono font-bold tracking-[0.25em] text-primary break-all">
                    {code}
                  </p>
                </motion.div>

                <div className="flex gap-3">
                  <Button
                    fullWidth
                    variant={copied ? "secondary" : "primary"}
                    onClick={handleCopy}
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy Code"}
                  </Button>
                  <Button variant="secondary" onClick={() => {}}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>

                <p className="text-xs text-muted">
                  This code has also been sent to your email and SMS.
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
