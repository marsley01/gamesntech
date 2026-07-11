import Link from "next/link";
import { Container } from "@/components/ui/Container";

const footerLinks = [
  {
    title: "Products",
    links: [
      { label: "Gaming", href: "/store/gaming" },
      { label: "Software", href: "/store/software" },
      { label: "SaaS", href: "/store/saas" },
      { label: "All Products", href: "/store" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "About", href: "#" },
      { label: "Contact", href: "#" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Order Status", href: "/order" },
      { label: "Refund Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-black font-black text-sm">GNT</span>
              </div>
              <span className="font-bold text-lg tracking-tight">gamesntech</span>
            </Link>
            <p className="text-sm text-muted leading-relaxed max-w-xs">
              Premium gaming and digital gift cards delivered instantly. Level up your digital life.
            </p>
          </div>
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold text-foreground mb-4">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">&copy; {new Date().getFullYear()} gamesntech. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm text-muted">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
