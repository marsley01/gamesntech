"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Zap, Shield, Clock, Users } from "lucide-react";

const stats = [
  { icon: Zap, value: "Instant", label: "Digital Delivery" },
  { icon: Shield, value: "100%", label: "Secure Payments" },
  { icon: Clock, value: "24/7", label: "Customer Support" },
  { icon: Users, value: "10K+", label: "Happy Customers" },
];

export function StatsBanner() {
  return (
    <section className="border-y border-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-12 px-4 text-center"
            >
              <stat.icon className="h-6 w-6 text-primary mb-3" />
              <span className="text-2xl font-black mb-1">{stat.value}</span>
              <span className="text-sm text-muted">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
