"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Menu, X, ShoppingCart, User, ChevronDown } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/store/gaming", label: "Gaming" },
  { href: "/store/software", label: "Software" },
  { href: "/store/saas", label: "SaaS" },
  { href: "/how-it-works", label: "How It Works" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-black font-black text-sm">GNT</span>
            </div>
            <span className="font-bold text-lg tracking-tight">gamesntech</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-muted hover:text-foreground rounded-lg hover:bg-surface-light transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/store"
              className="hidden md:inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-primary text-black text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              Shop Now
            </Link>
            <Link
              href="/account"
              className="h-10 w-10 rounded-xl border border-border hover:border-border-light flex items-center justify-center text-muted hover:text-foreground transition-all"
            >
              <User className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden h-10 w-10 rounded-xl border border-border flex items-center justify-center text-muted"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
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
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <Container className="py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-muted hover:text-foreground hover:bg-surface-light transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/store"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full h-12 rounded-xl bg-primary text-black font-semibold mt-4"
              >
                <ShoppingCart className="h-4 w-4" />
                Shop Now
              </Link>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
