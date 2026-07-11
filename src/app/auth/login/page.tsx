"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Particles } from "@/components/effects/Particles";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center pt-20 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-purple/[0.02] via-transparent to-transparent pointer-events-none" />
      <Particles count={25} color="124, 58, 237" />
      <Container className="max-w-sm relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-purple to-accent-blue flex items-center justify-center mx-auto mb-5 shadow-lg shadow-accent-purple/20">
            <span className="text-white font-black text-sm font-[family-name:var(--font-space)]">GNT</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight font-[family-name:var(--font-inter)]">Welcome back</h1>
          <p className="text-sm text-text-secondary mt-2">Sign in to your account</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-text-secondary">
              <input type="checkbox" className="rounded border-[rgba(255,255,255,0.08)] bg-surface" />
              Remember me
            </label>
            <Link href="#" className="text-accent-purple hover:underline">Forgot password?</Link>
          </div>

          <Button type="submit" fullWidth size="lg" loading={loading}>
            Sign In
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>

        <p className="text-center text-xs text-text-secondary mt-8">
          Don&apos;t have an account?{" "}
          <Link href="#" className="text-accent-purple font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </Container>
    </main>
  );
}
