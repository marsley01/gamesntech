"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  containerClassName?: string;
  width?: number;
  height?: number;
  padding?: number;
  bgColor?: string;
}

export function ProductImage({
  src,
  alt,
  className,
  containerClassName,
  width = 80,
  height = 80,
  padding = 8,
  bgColor = "#111120",
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false);
  const initials = alt
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={cn(
        "shrink-0 overflow-hidden flex items-center justify-center",
        containerClassName
      )}
      style={{
        width,
        height,
        borderRadius: 10,
        backgroundColor: bgColor,
      }}
    >
      {src && !hasError ? (
        <div
          className="relative w-full h-full"
          style={{ padding }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className={cn("select-none", className)}
            style={{ objectFit: "contain" }}
            onError={() => setHasError(true)}
          />
        </div>
      ) : (
        <span
          style={{
            color: "#7B5EFB",
            fontFamily: "Urbanist, sans-serif",
            fontWeight: 700,
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
