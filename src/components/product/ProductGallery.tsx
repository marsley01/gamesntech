"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  const validImages = images.filter((img) => img);
  const currentSrc = validImages[selectedIndex];
  const initials = name
    .split(" ")
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="space-y-3">
      <div
        className="relative w-full overflow-hidden"
        style={{
          aspectRatio: "4/3",
          backgroundColor: "#0F1628",
          borderRadius: 12,
        }}
      >
        {currentSrc && !imgError[selectedIndex] ? (
          <div className="absolute inset-0" style={{ padding: 24 }}>
            <Image
              key={selectedIndex}
              src={currentSrc}
              alt={name}
              fill
              className="select-none"
              style={{
                objectFit: "contain",
                transition: "opacity 0.2s ease",
              }}
              onError={() =>
                setImgError((prev) => ({ ...prev, [selectedIndex]: true }))
              }
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              style={{
                color: "#7B5EFB",
                fontFamily: "Urbanist, sans-serif",
                fontWeight: 700,
                fontSize: 48,
                lineHeight: 1,
              }}
            >
              {initials}
            </span>
          </div>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="flex gap-2">
          {validImages.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => handleThumbnailClick(i)}
              className={cn(
                "shrink-0 overflow-hidden cursor-pointer transition-all duration-200",
                i === selectedIndex && "ring-2 ring-primary"
              )}
              style={{
                width: 60,
                height: 60,
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "#0F1628",
              }}
            >
              <div className="relative w-full h-full" style={{ padding: 6 }}>
                <Image
                  src={img}
                  alt={`${name} ${i + 1}`}
                  fill
                  className="select-none"
                  style={{ objectFit: "contain" }}
                  onError={(e) => {
                    const target = e.currentTarget as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
