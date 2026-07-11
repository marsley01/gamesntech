"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/effects/SectionHeading";
import { Shield, Zap, HeadphonesIcon, CheckCircle, CreditCard, Users } from "lucide-react";
import { AnimatedCounter } from "@/components/effects/AnimatedCounter";

const trustFeatures = [
  { icon: Zap, title: "Instant Delivery", description: "Digital codes delivered in under 2 minutes via email and SMS." },
  { icon: Shield, title: "Official Products", description: "100% authentic digital products from authorized distributors." },
  { icon: CreditCard, title: "Secure Payments", description: "Encrypted M-Pesa STK Push. Your data never touches our servers." },
  { icon: HeadphonesIcon, title: "24/7 Support", description: "Real human support. WhatsApp, email, and live chat available." },
  { icon: CheckCircle, title: "Verified Codes", description: "Every code is verified before delivery. Guaranteed working." },
  { icon: Users, title: "10K+ Customers", description: "Trusted by thousands of customers across Kenya and Africa." },
];

export function WhyGNT() {
  return (
    <section className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          label="Why GNT"
          title="Premium by"
          highlight="Design"
          description="Every detail engineered for speed, security, and trust."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {trustFeatures.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="rounded-2xl border border-border bg-surface p-6 hover:bg-surface-elevated hover:border-border-hover transition-all duration-300 shadow-gnt"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-base font-bold text-text-primary mb-2">{feature.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-border shadow-gnt">
          {[
            { value: 10000, suffix: "+", label: "Customers" },
            { value: 50000, suffix: "+", label: "Orders Fulfilled" },
            { value: 99, suffix: "%", label: "Delivery Rate" },
            { value: 2, suffix: " min", label: "Avg. Delivery" },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface p-6 md:p-8 text-center">
              <p className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-jetbrains)] text-primary mb-1">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
