"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { InputField } from "@/components/auth/InputField";
import { AuthButton } from "@/components/auth/AuthButton";
import { createClient } from "@/lib/supabase/client";

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  general?: string;
}

export function SignUpForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const supabase = createClient();

  function validateStep1(): boolean {
    const newErrors: FormErrors = {};

    if (!fullName || fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/\d/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function validateStep2(): boolean {
    const newErrors: FormErrors = {};

    const cleanPhone = phone.replace(/\s/g, "");
    if (cleanPhone.length === 10 && (cleanPhone.startsWith("07") || cleanPhone.startsWith("01"))) {
    } else if (cleanPhone.length === 12 && cleanPhone.startsWith("254")) {
    } else {
      newErrors.phone = "Phone must start with 07 or 01 and be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function formatPhone(input: string): string {
    const cleaned = input.replace(/\s/g, "");
    if (cleaned.length === 10 && (cleaned.startsWith("07") || cleaned.startsWith("01"))) {
      return "254" + cleaned.slice(1);
    }
    if (cleaned.length === 12 && cleaned.startsWith("254")) {
      return cleaned;
    }
    return cleaned;
  }

  async function handleSubmit() {
    if (!validateStep2()) return;

    setLoading(true);
    setErrors({});

    const formattedPhone = formatPhone(phone);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            role: "seller",
          },
          emailRedirectTo: undefined,
        },
      });

      if (error) {
        if (error.message.includes("already registered") || error.message.includes("already exists")) {
          setErrors({ email: "An account with this email already exists. Sign in instead." });
        } else if (error.message.includes("network") || error.message.includes("fetch")) {
          setErrors({ general: "Something went wrong. Please try again." });
        } else {
          setErrors({ general: "Something went wrong. Please try again." });
        }
        setLoading(false);
        return;
      }

      if (!data.user) {
        setErrors({ general: "Something went wrong. Please try again." });
        setLoading(false);
        return;
      }

      const { error: profileError } = await supabase.from("profiles").upsert({
        id: data.user.id,
        full_name: fullName.trim(),
        email,
        role: "seller",
        mpesa_phone: formattedPhone,
      });

      if (profileError) {
        console.error("[Signup] Profile insert error:", profileError);
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error("[Signup] Auto sign-in error:", signInError);
      }

      router.push("/seller/dashboard");
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
      setLoading(false);
    }
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="text-center">
          <h2
            className="text-2xl font-black tracking-tight"
            style={{ fontFamily: "var(--font-urbanist)", color: "#FFFFFF" }}
          >
            {step === 1 ? "Create Account" : "Seller Details"}
          </h2>
          <p
            className="text-sm mt-1"
            style={{ color: "#8B8BA0", fontFamily: "var(--font-dm-sans)" }}
          >
            {step === 1
              ? "Join GNT as a seller"
              : "Almost done — set up your seller profile"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-2"
            style={{ flex: 1 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: step >= 1 ? "#7B5EFB" : "#1E1E2E",
                color: step >= 1 ? "#FFFFFF" : "#8B8BA0",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              1
            </div>
            <span
              className="text-xs"
              style={{
                color: step >= 1 ? "#FFFFFF" : "#8B8BA0",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              Account
            </span>
          </div>
          <div
            style={{
              flex: 1,
              height: 1,
              backgroundColor: step >= 2 ? "#7B5EFB" : "#1E1E2E",
            }}
          />
          <div
            className="flex items-center gap-2"
            style={{ flex: 1 }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                backgroundColor: step >= 2 ? "#7B5EFB" : "#1E1E2E",
                color: step >= 2 ? "#FFFFFF" : "#8B8BA0",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              2
            </div>
            <span
              className="text-xs"
              style={{
                color: step >= 2 ? "#FFFFFF" : "#8B8BA0",
                fontFamily: "var(--font-dm-sans)",
              }}
            >
              Seller
            </span>
          </div>
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

        {step === 1 ? (
          <div className="space-y-4">
            <InputField
              label="Full Name"
              type="text"
              placeholder="John Kamau"
              value={fullName}
              onChange={setFullName}
              error={errors.fullName}
            />
            <InputField
              label="Email"
              type="email"
              placeholder="john@gnt.co.ke"
              value={email}
              onChange={setEmail}
              error={errors.email}
            />
            <InputField
              label="Password"
              type="password"
              placeholder="Min 8 characters, 1 number"
              value={password}
              onChange={setPassword}
              error={errors.password}
            />
            <InputField
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={errors.confirmPassword}
            />
            <AuthButton
              label="Continue"
              onClick={() => {
                if (validateStep1()) setStep(2);
              }}
              type="button"
            />
          </div>
        ) : (
          <div className="space-y-4">
            <InputField
              label="M-Pesa Phone Number"
              type="tel"
              placeholder="0712345678"
              value={phone}
              onChange={setPhone}
              error={errors.phone}
            />
            <p
              className="text-xs"
              style={{ color: "#8B8BA0", fontFamily: "var(--font-dm-sans)" }}
            >
              This is where your payouts will be sent.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{
                  borderRadius: "12px",
                  height: "48px",
                  borderColor: "#1E1E2E",
                  color: "#FFFFFF",
                  fontFamily: "var(--font-dm-sans)",
                }}
                className="flex-1 text-sm font-semibold border bg-transparent transition-all duration-200 hover:bg-white/[0.04]"
              >
                Back
              </button>
              <div className="flex-1">
                <AuthButton
                  label="Create Account"
                  loading={loading}
                  onClick={handleSubmit}
                  type="button"
                />
              </div>
            </div>
          </div>
        )}

        <p
          className="text-center text-xs mt-6"
          style={{ color: "#8B8BA0", fontFamily: "var(--font-dm-sans)" }}
        >
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            style={{ color: "#7B5EFB" }}
            className="font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
