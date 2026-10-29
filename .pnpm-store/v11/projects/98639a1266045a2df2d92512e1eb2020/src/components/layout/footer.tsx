import Link from "next/link";
import { Bot, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const footerLinks = {
  Shop: [
    { label: "All Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Flash Deals", href: "/products?filter=deals" },
    { label: "New Arrivals", href: "/products?filter=new" },
  ],
  Support: [
    { label: "AI Assistant", href: "/assistant" },
    { label: "Order Tracking", href: "/orders" },
    { label: "Help Center", href: "/settings" },
    { label: "Contact Us", href: "/settings" },
  ],
  Company: [
    { label: "About Us", href: "/landing" },
    { label: "Careers", href: "/landing" },
    { label: "Privacy Policy", href: "/settings" },
    { label: "Terms of Service", href: "/settings" },
  ],
};

export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/8 pt-12 pb-8">
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-black">ShopAI</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            AI-powered shopping platform. Discover, compare, and shop smarter with personalized recommendations.
          </p>
          <div className="mt-4 flex gap-3">
            {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
              <button key={i} className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition hover:text-foreground">
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h4 className="font-semibold">{title}</h4>
            <ul className="mt-4 space-y-2">
              {links.map((link, index) => (
                <li key={`${title}-${link.label}-${index}`}>
                  <Link href={link.href} className="text-sm text-muted-foreground transition hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/8 pt-8 sm:flex-row">
        <p className="text-sm text-muted-foreground">© 2026 ShopAI. All rights reserved.</p>
        <p className="text-sm text-muted-foreground">Built with Next.js 15 · AI-Powered Commerce</p>
      </div>
    </footer>
  );
}
