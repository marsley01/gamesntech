"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Particles } from "@/components/effects/Particles";
import { ArrowRight } from "lucide-react";

function LetterReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="inline-block overflow-hidden">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ y: 100, rotateX: -20, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{
            duration: 0.7,
            delay: delay + i * 0.035,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="inline-block"
          style={{ perspective: "600px" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/0 via-bg-primary/30 to-bg-primary" />

        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none ambient-blue" style={{ transform: "translate(-50%, -50%)" }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none ambient-purple" style={{ transform: "translate(50%, 50%)" }} />
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full pointer-events-none ambient-orange" style={{ transform: "translate(-50%, -50%)" }} />

        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542751110-97427bb84a9e?q=80&w=2084&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/60 to-bg-primary/20" />
      </motion.div>

      <Particles count={25} color="245, 166, 35" />

      <motion.div style={{ y: contentY }} className="relative z-10 w-full px-6 md:px-12 lg:px-24 pt-24">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.04] px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-xs tracking-[0.15em] uppercase text-primary font-medium font-[family-name:var(--font-space)]">
              Premium Gaming Marketplace
            </span>
          </motion.div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[family-name:var(--font-bebas)] tracking-tighter leading-[0.85] text-text-primary">
            <LetterReveal text="POWER YOUR" delay={0.4} />
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 1.2 }}
            >
              <span className="text-glow-orange text-primary">
                <LetterReveal text="DIGITAL WORLD" delay={1.0} />
              </span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="mt-6 text-base md:text-lg text-text-secondary max-w-xl leading-relaxed tracking-wide"
          >
            Gaming. Software. Gift Cards. AI Tools.
            <br />
            <span className="text-text-primary font-medium">Delivered instantly.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/store"
              className="group inline-flex items-center justify-center gap-3 h-12 px-7 bg-primary text-black font-semibold text-sm rounded-xl hover:bg-primary-hover transition-all duration-300 font-[family-name:var(--font-space)]"
            >
              Explore Store
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/how-it-works"
              className="group inline-flex items-center justify-center gap-3 h-12 px-7 border border-border text-text-secondary hover:text-text-primary text-sm rounded-xl hover:bg-white/[0.04] transition-all duration-300 font-[family-name:var(--font-space)]"
            >
              How It Works
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.8 }}
            className="mt-16 flex items-center gap-8 text-sm"
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-bg-primary bg-surface-elevated"
                />
              ))}
            </div>
            <span className="text-text-secondary">
              Trusted by{" "}
              <span className="text-text-primary font-semibold font-[family-name:var(--font-jetbrains)]">10,000+</span>{" "}
              customers across Africa
            </span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-border flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-text-secondary/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
