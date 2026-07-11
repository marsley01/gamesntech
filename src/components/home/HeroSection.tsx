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
          initial={{ y: 120, rotateX: -30, opacity: 0 }}
          animate={{ y: 0, rotateX: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.04,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="inline-block"
          style={{ perspective: "800px" }}
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

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      <motion.div style={{ scale: bgScale, opacity: bgOpacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.08)_0%,transparent_50%)]" />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/0 via-bg-primary/40 to-bg-primary" />
      </motion.div>

      <Particles count={50} color="124, 58, 237" />

      <motion.div style={{ y: contentY }} className="relative z-10 w-full px-6 md:px-12 lg:px-24 pt-24">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-accent-purple/20 bg-accent-purple/5 px-4 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-pulse" />
            <span className="text-xs tracking-[0.15em] uppercase text-accent-purple font-medium font-[family-name:var(--font-space)]">
              Premium Digital Marketplace
            </span>
          </motion.div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-[family-name:var(--font-bebas)] tracking-tighter leading-[0.85] text-text-primary">
            <LetterReveal text="POWER YOUR" delay={0.4} />
            <br />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-glow-purple text-accent-purple"
            >
              <LetterReveal text="DIGITAL WORLD" delay={1.0} />
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed tracking-wide"
          >
            Gaming. Software. Gift Cards. AI Tools.
            <br />
            <span className="text-text-primary font-medium">Delivered instantly.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/store"
              className="group inline-flex items-center justify-center gap-3 h-12 px-7 bg-accent-purple text-white font-semibold text-sm rounded-xl hover:bg-accent-purple/90 transition-all duration-300 shadow-lg shadow-accent-purple/20 hover:shadow-accent-purple/30 font-[family-name:var(--font-space)]"
            >
              Explore Store
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/how-it-works"
              className="group inline-flex items-center justify-center gap-3 h-12 px-7 border border-[rgba(255,255,255,0.1)] text-text-secondary hover:text-text-primary text-sm rounded-xl hover:bg-white/[0.04] transition-all duration-300 font-[family-name:var(--font-space)]"
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
          className="w-5 h-8 rounded-full border border-[rgba(255,255,255,0.15)] flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-text-secondary/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
