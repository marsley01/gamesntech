"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/store", label: "Store" },
  { href: "/store/gaming", label: "Gaming" },
  { href: "/store/software", label: "Software" },
  { href: "/store/ai", label: "AI" },
  { href: "/store/gift-cards", label: "Gift Cards" },
  { href: "/support", label: "Support" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-bg-primary/70 backdrop-blur-2xl border-b border-[rgba(255,255,255,0.06)]"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center shadow-lg shadow-accent-purple/20">
              <span className="text-white font-black text-sm tracking-tight font-[family-name:var(--font-space)]">GNT</span>
            </div>
            <span className="font-semibold text-sm tracking-wide hidden sm:inline text-text-primary/80 group-hover:text-text-primary transition-colors">
              Games N Tech
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-text-secondary hover:text-text-primary rounded-lg hover:bg-white/[0.04] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/account"
              className="h-9 w-9 rounded-lg border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-[rgba(255,255,255,0.15)] transition-all"
              aria-label="Account"
            >
              <User className="h-4 w-4" />
            </Link>
            <Link
              href="/store"
              className="h-9 px-4 rounded-lg bg-accent-purple text-white text-sm font-semibold hover:bg-accent-purple/90 transition-all flex items-center gap-2 font-[family-name:var(--font-space)]"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Shop</span>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden h-9 w-9 rounded-lg border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-text-secondary"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[rgba(255,255,255,0.06)] bg-bg-primary/95 backdrop-blur-2xl"
          >
            <Container className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/[0.04] transition-all text-sm"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 mt-2 border-t border-[rgba(255,255,255,0.06)]">
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm text-text-secondary hover:text-text-primary transition-all"
                >
                  Account
                </Link>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
