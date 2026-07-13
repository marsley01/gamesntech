"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { InputField } from "@/components/auth/InputField";
import { AuthButton } from "@/components/auth/AuthButton";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Info } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        { redirectTo: `${window.location.origin}/auth/callback?type=recovery` }
      );

      if (resetError) {
        setError("Something went wrong. Please try again.");
      } else {
        setSent(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <AuthLayout>
      <div className="space-y-5">
        <div className="text-center">
          <h2
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-urbanist)", color: "#FFFFFF" }}
          >
            Reset Password
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "#8B8BA0", fontFamily: "var(--font-dm-sans)" }}
          >
            Enter your email to receive reset instructions
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              error={error}
            />

            <AuthButton label="Send Reset Link" loading={loading} />
          </form>
        ) : (
          <div className="text-center py-4">
            <p
              className="text-sm"
              style={{
                color: "#00C896",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              Reset link sent! Check your email.
            </p>
          </div>
        )}

        <div
          className="flex items-start gap-3 p-4 rounded-lg text-xs"
          style={{
            backgroundColor: "rgba(123, 94, 251, 0.06)",
            border: "1px solid rgba(123, 94, 251, 0.15)",
            color: "#8B8BA0",
            fontFamily: "var(--font-dm-sans)",
          }}
        >
          <Info size={14} style={{ color: "#7B5EFB", marginTop: 1, flexShrink: 0 }} />
          <p>
            Password reset emails will be available once GNT launches officially.{" "}
            Contact support for help accessing your account.
          </p>
        </div>

        <Link
          href="/auth/signin"
          className="flex items-center justify-center gap-1.5 text-xs transition-colors hover:underline"
          style={{ color: "#7B5EFB", fontFamily: "var(--font-dm-sans)" }}
        >
          <ArrowLeft size={12} />
          Back to sign in
        </Link>
      </div>
    </AuthLayout>
  );
}
