"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Particles } from "@/components/effects/Particles";
import Link from "next/link";
import { Search, Smartphone, Zap, Shield, Package } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Pick a Product",
    description: "Browse our catalog of gaming, software, AI, gift cards, and streaming subscriptions.",
  },
  {
    icon: Smartphone,
    title: "Enter Your Details",
    description: "Provide your email and game ID. Confirm with M-Pesa STK Push.",
  },
  {
    icon: Zap,
    title: "Get Code Instantly",
    description: "Your digital code is delivered within seconds via email and SMS.",
  },
];

const features = [
  { icon: Shield, text: "100% Secure via M-Pesa" },
  { icon: Zap, text: "Instant Digital Delivery" },
  { icon: Package, text: "Verified & Authentic Codes" },
];

export default function HowItWorksPage() {
  return (
    <main className="pt-20 pb-16 min-h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/[0.02] via-transparent to-transparent pointer-events-none" />
      <Particles count={25} color="124, 58, 237" />

      <div className="border-b border-[rgba(255,255,255,0.06)] relative">
        <Container className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-accent-purple mb-4 font-medium font-[family-name:var(--font-space)]">
              How It Works
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-4 font-[family-name:var(--font-inter)]">
              Three Simple <span className="text-glow-purple text-accent-purple">Steps</span>
            </h1>
            <p className="text-text-secondary max-w-md mx-auto">
              Get your digital codes in under 2 minutes. No queues, no hassle.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container className="py-16 relative">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gradient-to-r from-accent-purple/20 to-transparent" />
              )}
              <div className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface p-8 text-center relative">
                <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center mx-auto mb-5">
                  <step.icon className="h-6 w-6 text-accent-purple" />
                </div>
                <div className="w-7 h-7 rounded-full bg-accent-purple text-white text-xs font-bold flex items-center justify-center mx-auto mb-4 font-[family-name:var(--font-space)]">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold font-[family-name:var(--font-inter)] mb-3">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-[rgba(255,255,255,0.06)] bg-surface p-8 md:p-12 text-center max-w-2xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 font-[family-name:var(--font-inter)]">
            Why Choose <span className="text-glow-purple text-accent-purple">Games N Tech</span>?
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 max-w-xl mx-auto">
            {features.map((f) => (
              <div key={f.text} className="flex items-center gap-3 text-sm">
                <f.icon className="h-4 w-4 text-accent-purple shrink-0" />
                <span className="text-left text-text-secondary">{f.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link href="/store">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </motion.div>
      </Container>
    </main>
  );
}
