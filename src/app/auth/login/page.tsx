"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Mail, Lock, ArrowRight, Gamepad2 } from "lucide-react";
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
    <main className="min-h-screen flex items-center justify-center pt-20 pb-16">
      <Container className="max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
            <Gamepad2 className="h-7 w-7 text-black" />
          </div>
          <h1 className="text-3xl font-black tracking-tight">Welcome back</h1>
          <p className="text-muted mt-2">Sign in to your account</p>
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted">
              <input type="checkbox" className="rounded border-border bg-surface" />
              Remember me
            </label>
            <Link href="#" className="text-primary hover:underline">Forgot password?</Link>
          </div>

          <Button type="submit" fullWidth size="lg" loading={loading}>
            Sign In
            <ArrowRight className="h-5 w-5" />
          </Button>
        </motion.form>

        <p className="text-center text-sm text-muted mt-8">
          Don&apos;t have an account?{" "}
          <Link href="#" className="text-primary font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </Container>
    </main>
  );
}
