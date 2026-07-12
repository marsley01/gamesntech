import Link from "next/link";
import { Container } from "@/components/ui/Container";

const footerLinks = [
  {
    title: "Products",
    links: [
      { label: "Gaming", href: "/store/gaming" },
      { label: "Software", href: "/store/software" },
      { label: "AI Tools", href: "/store/ai" },
      { label: "Gift Cards", href: "/store/gift-cards" },
      { label: "Streaming", href: "/store/streaming" },
      { label: "All Products", href: "/store" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How It Works", href: "/how-it-works" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Order Status", href: "/order" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] mt-auto">
      <Container className="py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent-blue flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-black text-sm tracking-tight font-[family-name:var(--font-space)]">GNT</span>
              </div>
              <span className="font-semibold text-sm tracking-wide text-text-primary/80">
                Games N Tech
              </span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs mb-6">
              Africa&apos;s most premium digital marketplace. Gaming, software, AI tools, gift cards, and subscriptions — delivered instantly.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-1.5">
                <div className="w-8 h-8 rounded-full bg-surface-elevated border border-[rgba(255,255,255,0.06)]" />
                <div className="w-8 h-8 rounded-full bg-surface-elevated border border-[rgba(255,255,255,0.06)]" />
                <div className="w-8 h-8 rounded-full bg-surface-elevated border border-[rgba(255,255,255,0.06)]" />
              </div>
              <span className="text-xs text-text-secondary">M-Pesa | Visa</span>
            </div>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-xs tracking-[0.15em] uppercase text-text-secondary font-semibold mb-5 font-[family-name:var(--font-space)]">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Games N Tech. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
