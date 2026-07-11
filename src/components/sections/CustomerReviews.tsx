"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/effects/SectionHeading";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Kevin M.",
    handle: "@kevin_m",
    text: "Code arrived in my email before I even closed the browser. This is the future of digital purchases.",
    rating: 5,
    product: "Xbox Game Pass Ultimate",
  },
  {
    name: "Sarah W.",
    handle: "@sarah_dev",
    text: "Finally a platform that understands African gamers. M-Pesa integration makes everything seamless.",
    rating: 5,
    product: "Steam Wallet Credits",
  },
  {
    name: "David O.",
    handle: "@david_creative",
    text: "Been using for 6 months. Never had a single failed code. The Adobe CC subscription saved me thousands.",
    rating: 5,
    product: "Adobe Creative Cloud",
  },
  {
    name: "Grace A.",
    handle: "@grace_ai",
    text: "ChatGPT Plus through GNT is literally half the price of direct billing. Absolute game changer.",
    rating: 5,
    product: "ChatGPT Plus",
  },
  {
    name: "James K.",
    handle: "@james_gamer",
    text: "GeForce NOW code worked instantly. Support team helped me set it up in under 5 minutes on WhatsApp.",
    rating: 5,
    product: "NVIDIA GeForce NOW",
  },
];

export function CustomerReviews() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-primary/[0.02] to-bg-primary pointer-events-none" />
      <Container>
        <SectionHeading
          label="Testimonials"
          title="Trusted by"
          highlight="Thousands"
          description="Real reviews from real customers across Africa."
          align="center"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((review, i) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="rounded-2xl border border-border bg-surface p-6 hover:bg-surface-elevated hover:border-border-hover transition-all duration-300 shadow-gnt"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-text-primary leading-relaxed mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-text-primary">{review.name}</p>
                  <p className="text-xs text-text-secondary">{review.handle}</p>
                </div>
                <span className="text-[11px] text-text-secondary font-medium">{review.product}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
