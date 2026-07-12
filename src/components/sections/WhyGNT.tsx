"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/effects/SectionHeading";
import { SectionBackground } from "@/components/effects/SectionBackground";
import { Zap, CreditCard, CheckCircle } from "lucide-react";

const highlights = [
  { icon: Zap, title: "Instant Delivery", description: "Digital codes delivered via email and SMS in under 2 minutes." },
  { icon: CreditCard, title: "M-Pesa Checkout", description: "Seamless M-Pesa STK Push integration. One tap to pay." },
  { icon: CheckCircle, title: "Verified Codes", description: "Every code is tested before delivery. Guaranteed to work." },
];

export function WhyGNT() {
  return (
    <section className="relative py-24 md:py-32">
      <SectionBackground variant="default" />
      <Container>
        <SectionHeading
          label="Why GNT"
          title="Premium by"
          highlight="Design"
          description="Every detail engineered for speed, security, and trust."
        />

        <div className="grid sm:grid-cols-3 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-border bg-surface p-8 text-center hover:bg-surface-elevated hover:border-border-hover transition-all duration-300 shadow-gnt"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-3">{item.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
