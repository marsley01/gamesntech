"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ scale, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.15)_0%,_transparent_70%)] z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(249,115,22,0.1)_0%,_transparent_50%)] z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065&auto=format&fit=crop')",
          }}
        />
      </motion.div>

      <Container className="relative z-20 pt-20">
        <motion.div style={{ y, opacity }} className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary mb-8"
          >
            <Sparkles className="h-4 w-4" />
            Premium Digital Gaming Store
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter"
          >
            LEVEL UP
            <br />
            <span className="text-primary">YOUR</span> GAME
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-6 text-lg md:text-xl text-muted max-w-xl leading-relaxed"
          >
            Premium gaming gift cards, software licenses, and digital subscriptions
            delivered instantly. No queues, no hassle.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.25, 0.4, 0.25, 1] }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/store"
              className="group inline-flex items-center justify-center gap-3 h-14 px-8 bg-primary text-black font-bold text-base rounded-xl hover:bg-primary-dark transition-all duration-200"
            >
              Explore Store
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/how-it-works"
              className="group inline-flex items-center justify-center gap-3 h-14 px-8 border border-border text-foreground font-semibold text-base rounded-xl hover:bg-surface-light transition-all duration-200"
            >
              <Zap className="h-5 w-5" />
              How It Works
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-16 flex items-center gap-8 text-sm text-muted"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-background bg-surface-lighter"
                />
              ))}
            </div>
            <p><span className="text-foreground font-semibold">10,000+</span> happy gamers</p>
            <p>Trusted by gamers across Kenya</p>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-border flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-muted" />
        </motion.div>
      </motion.div>
    </section>
  );
}
