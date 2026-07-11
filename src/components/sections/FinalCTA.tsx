"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-primary/[0.02] to-bg-primary" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 60%)",
        }}
      />

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs tracking-[0.15em] uppercase text-primary mb-6 block font-medium font-[family-name:var(--font-space)]"
          >
            Get Started Today
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 font-[family-name:var(--font-inter)]">
            Ready to Power Your<br />
            <span className="text-glow-orange text-primary">Digital World</span>?
          </h2>

          <p className="text-base text-text-secondary max-w-md mx-auto mb-10 leading-relaxed">
            Join thousands of customers who trust Games N Tech for instant digital delivery across Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/store"
              className="inline-flex items-center justify-center gap-3 h-13 px-8 bg-primary text-black font-semibold text-sm rounded-xl hover:bg-primary-hover transition-all duration-300 font-[family-name:var(--font-space)]"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-3 h-13 px-8 border border-border text-text-secondary hover:text-text-primary text-sm rounded-xl hover:bg-white/[0.04] transition-all duration-300 font-[family-name:var(--font-space)]"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
