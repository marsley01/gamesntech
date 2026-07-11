"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Zap } from "lucide-react";

export function CTABanner() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(249,115,22,0.08)_0%,transparent_50%)]" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-6"
          >
            <Zap className="h-4 w-4" />
            Get Started Now
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-lg text-muted max-w-lg mx-auto mb-10 leading-relaxed">
            Join thousands of Kenyan gamers who trust gamesntech for instant digital delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/store"
              className="inline-flex items-center justify-center gap-3 h-14 px-8 bg-primary text-black font-bold text-base rounded-xl hover:bg-primary-dark transition-all duration-200"
            >
              Shop Now
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-3 h-14 px-8 border border-border text-foreground font-semibold text-base rounded-xl hover:bg-surface-light transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
