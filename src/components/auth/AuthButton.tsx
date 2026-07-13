"use client";

import { Loader2 } from "lucide-react";

interface AuthButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function AuthButton({
  label,
  loading = false,
  disabled = false,
  onClick,
  type = "submit",
}: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{
        backgroundColor: disabled || loading ? "#7B5EFB" : "#7B5EFB",
        opacity: disabled || loading ? 0.5 : 1,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        borderRadius: "12px",
        height: "48px",
        fontFamily: "var(--font-dm-sans)",
      }}
      className="w-full text-sm font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 hover:bg-[#6A4FE0]"
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          <span>Please wait...</span>
        </>
      ) : (
        label
      )}
    </button>
  );
}
