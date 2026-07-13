"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password" | "tel";
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function InputField({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="space-y-1.5">
      <label
        className="block text-sm"
        style={{
          fontFamily: "var(--font-dm-sans)",
          color: "#8B8BA0",
        }}
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            backgroundColor: "#090910",
            borderColor: error ? "#FF4D4D" : "#1E1E2E",
            color: "#FFFFFF",
            borderRadius: "12px",
            fontFamily: "var(--font-dm-sans)",
          }}
          className="w-full h-12 px-4 text-sm outline-none transition-all duration-200 placeholder:text-[#8B8BA0] focus:border-[#7B5EFB]"
          onFocus={(e) => {
            e.target.style.boxShadow = "0 0 0 3px rgba(123, 94, 251, 0.15)";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "none";
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
            style={{ color: "#8B8BA0" }}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <p
          className="text-xs mt-1"
          style={{ color: "#FF4D4D", fontFamily: "var(--font-dm-sans)" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
