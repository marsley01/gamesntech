import Link from "next/link";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(123, 94, 251, 0.06) 0%, transparent 60%)",
        }}
      />
      <div className="w-full max-w-md relative">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block">
            <h1
              className="text-5xl font-black tracking-tight"
              style={{
                fontFamily: "var(--font-urbanist)",
                color: "#7B5EFB",
                lineHeight: 1,
              }}
            >
              GNT
            </h1>
          </Link>
          <p
            className="text-sm mt-3"
            style={{ color: "#8B8BA0", fontFamily: "var(--font-dm-sans)" }}
          >
            Kenya&apos;s Digital Marketplace
          </p>
        </div>
        <div
          className="rounded-xl border p-8 w-full"
          style={{
            backgroundColor: "#0F0F1A",
            borderColor: "#1E1E2E",
            boxShadow: "0 0 60px rgba(123, 94, 251, 0.08)",
          }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
