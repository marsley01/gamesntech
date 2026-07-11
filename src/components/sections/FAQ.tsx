"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/effects/SectionHeading";
import { SectionBackground } from "@/components/effects/SectionBackground";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How does the delivery work?",
    a: "After payment confirmation via M-Pesa STK Push, your digital code is processed and delivered to your email and phone via SMS within 2 minutes. Most orders arrive in under 30 seconds.",
  },
  {
    q: "Is M-Pesa payment secure?",
    a: "Absolutely. We use Safaricom's official Daraja API for STK Push. Your payment data is encrypted end-to-end. We never store your M-Pesa PIN or sensitive financial information.",
  },
  {
    q: "What if my code doesn't work?",
    a: "All codes are verified before delivery. In the rare event you face an issue, our support team is available 24/7 via WhatsApp, email, and live chat. We guarantee replacement or full refund.",
  },
  {
    q: "Can I buy for someone else?",
    a: "Yes. During checkout, simply enter the recipient's email and game ID. The code will be delivered directly to them with a personalized message.",
  },
  {
    q: "How long are the codes valid?",
    a: "Codes never expire. Once delivered, they are yours to redeem at any time. Store them in your account dashboard for easy access later.",
  },
  {
    q: "What regions do you support?",
    a: "We currently support Kenya with M-Pesa payments. Digital codes are global and work on all major platforms worldwide.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32">
      <SectionBackground variant="default" />
      <Container>
        <SectionHeading
          label="FAQ"
          title="Questions?"
          highlight="Answered."
          description="Everything you need to know about using Games N Tech."
          align="center"
        />

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={cn(
                "rounded-2xl border transition-all duration-300 cursor-pointer shadow-gnt",
                openIndex === i
                  ? "border-primary/20 bg-primary/[0.02]"
                  : "border-border bg-surface hover:bg-surface-elevated hover:border-border-hover"
              )}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5">
                <span className="text-sm font-semibold text-text-primary">{faq.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-text-secondary transition-transform duration-300 shrink-0",
                    openIndex === i && "rotate-180"
                  )}
                />
              </div>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-text-secondary leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
