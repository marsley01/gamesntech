"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";

export default function SellerDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<{ full_name: string; email: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/signin");
        return;
      }
      const { data } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", session.user.id)
        .single();
      if (data) setProfile(data);
    }
    load();
  }, [router, supabase]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/auth/signin");
  }

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "#090910", color: "#FFFFFF" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1
              className="text-3xl font-black tracking-tight"
              style={{ fontFamily: "var(--font-urbanist)" }}
            >
              Seller Dashboard
            </h1>
            {profile && (
              <p
                className="text-sm mt-1"
                style={{ color: "#8B8BA0", fontFamily: "var(--font-dm-sans)" }}
              >
                Welcome, {profile.full_name}
              </p>
            )}
          </div>
          <button
            onClick={handleSignOut}
            style={{
              color: "#8B8BA0",
              fontFamily: "var(--font-dm-sans)",
              borderColor: "#1E1E2E",
              borderRadius: "12px",
            }}
            className="flex items-center gap-2 text-sm px-4 h-10 border transition-all duration-200 hover:text-[#FF4D4D] hover:border-[#FF4D4D]/30"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>

        <div
          className="rounded-xl border p-12 text-center"
          style={{
            backgroundColor: "#0F0F1A",
            borderColor: "#1E1E2E",
          }}
        >
          <div
            className="text-5xl mb-4"
            style={{ fontFamily: "var(--font-urbanist)", color: "#7B5EFB" }}
          >
            GNT
          </div>
          <h2
            className="text-xl font-semibold mb-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Your seller dashboard is ready
          </h2>
          <p
            className="text-sm"
            style={{ color: "#8B8BA0", fontFamily: "var(--font-dm-sans)" }}
          >
            Start uploading products and making sales. The full dashboard experience
            is coming soon.
          </p>
        </div>
      </div>
    </main>
  );
}
