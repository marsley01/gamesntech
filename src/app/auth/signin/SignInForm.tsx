"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { InputField } from "@/components/auth/InputField";
import { AuthButton } from "@/components/auth/AuthButton";
import { createClient } from "@/lib/supabase/client";

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setErrors({ general: "Incorrect email or password" });
        } else if (error.message.includes("Email not confirmed")) {
          setErrors({ general: "Please verify your email before signing in" });
        } else if (
          error.message.includes("network") ||
          error.message.includes("fetch")
        ) {
          setErrors({ general: "Something went wrong. Please try again." });
        } else {
          setErrors({ general: "Something went wrong. Please try again." });
        }
        setLoading(false);
        return;
      }

      if (!data.user) {
        setErrors({ general: "No account found with this email" });
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      const role = profile?.role;

      if (redirectPath) {
        router.push(redirectPath);
      } else if (role === "seller") {
        router.push("/seller/dashboard");
      } else if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="text-center">
          <h2
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-urbanist)", color: "#FFFFFF" }}
          >
            Welcome Back
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "#8B8BA0", fontFamily: "var(--font-dm-sans)" }}
          >
            Sign in to your account
          </p>
        </div>

        {errors.general && (
          <div
            className="text-xs p-3 rounded-lg"
            style={{
              color: "#FF4D4D",
              backgroundColor: "rgba(255, 77, 77, 0.08)",
              border: "1px solid rgba(255, 77, 77, 0.2)",
              fontFamily: "var(--font-dm-sans)",
            }}
          >
            {errors.general}
          </div>
        )}

        <InputField
          label="Email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />

        <div className="space-y-1.5">
          <InputField
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={setPassword}
            error={errors.password}
          />
          <div className="text-right">
            <Link
              href="/auth/forgot-password"
              style={{ color: "#7B5EFB", fontFamily: "var(--font-dm-sans)" }}
              className="text-xs hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <AuthButton label="Sign In" loading={loading} />

        <p
          className="text-center text-xs"
          style={{ color: "#8B8BA0", fontFamily: "var(--font-dm-sans)" }}
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            style={{ color: "#7B5EFB" }}
            className="font-semibold hover:underline"
          >
            Create one
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
