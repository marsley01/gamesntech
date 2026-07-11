"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Search, ShoppingCart, Zap, Smartphone, Package, Shield } from "lucide-react";

const steps = [
  {
    icon: ShoppingCart,
    title: "Pick a Product",
    description: "Browse our catalog of gaming gift cards, software licenses, and digital subscriptions.",
    color: "from-amber-500/20 to-orange-600/10",
  },
  {
    icon: Smartphone,
    title: "Enter Your Details",
    description: "Provide your game ID or email and confirm with M-Pesa STK Push.",
    color: "from-blue-500/20 to-purple-600/10",
  },
  {
    icon: Zap,
    title: "Get Code Instantly",
    description: "Your digital code is delivered within seconds via email and SMS.",
    color: "from-emerald-500/20 to-teal-600/10",
  },
];

const features = [
  { icon: Shield, text: "100% Secure Payments via M-Pesa" },
  { icon: Zap, text: "Instant Digital Delivery" },
  { icon: Package, text: "Verified & Authentic Codes" },
];

export default function HowItWorksPage() {
  return (
    <main className="pt-24 pb-16">
      <div className="border-b border-border">
        <Container className="py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">
              How It Works
            </p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Three Simple <span className="text-primary">Steps</span>
            </h1>
            <p className="text-muted max-w-lg mx-auto">
              Get your digital codes in under 2 minutes. No queues, no hassle.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-border" />
              )}
              <div className={`rounded-2xl border border-border bg-gradient-to-br ${step.color} p-8 text-center relative`}>
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mx-auto mb-6 border border-border">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="w-8 h-8 rounded-full bg-primary text-black font-bold flex items-center justify-center mx-auto mb-4 text-sm">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatedSection>
          <div className="rounded-2xl border border-border bg-surface p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">
              Why Choose <span className="text-primary">gamesntech</span>?
            </h2>
            <div className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {features.map((f) => (
                <div key={f.text} className="flex items-center gap-3 text-sm">
                  <f.icon className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-left">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/store">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </motion.div>
      </Container>
    </main>
  );
}
