"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animId: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = (time - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(from + (to - from) * eased));

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      }
    };

    animId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animId);
  }, [isInView, from, to, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={className}
    >
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </motion.span>
  );
}
