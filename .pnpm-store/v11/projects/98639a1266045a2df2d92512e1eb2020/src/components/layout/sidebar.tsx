"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Car,
  ChevronRight,
  Dumbbell,
  Gamepad2,
  Heart,
  Home,
  Laptop,
  LayoutGrid,
  Shirt,
  Smartphone,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/data/mock";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Zap, Laptop, Smartphone, Home, Shirt, Heart, Dumbbell, Gamepad2, Car, BookOpen,
};

export function CategorySidebar() {
  return (
    <aside className="glass-card p-4">
      <div className="flex items-center gap-3 rounded-2xl gradient-primary px-4 py-3 font-semibold text-white">
        <LayoutGrid className="h-5 w-5" />
        All Categories
      </div>
      <nav className="mt-4 space-y-1">
        {categories.map((cat) => {
          const Icon = iconMap[cat.icon] || Zap;
          return (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {cat.name}
              </span>
              <ChevronRight className="h-4 w-4 opacity-40" />
            </Link>
          );
        })}
      </nav>
      <Link href="/categories" className="mt-4 flex items-center justify-center gap-2 rounded-xl py-2 text-sm font-medium text-violet-400 hover:text-violet-300">
        View All Categories <ChevronRight className="h-4 w-4" />
      </Link>
    </aside>
  );
}

const assistantNav = [
  { label: "Home", href: "/", icon: Home },
  { label: "Categories", href: "/categories", icon: LayoutGrid },
  { label: "Deals", href: "/products?filter=deals", icon: Sparkles },
  { label: "Orders", href: "/orders", icon: BookOpen },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Cart", href: "/cart", icon: Car },
];

const aiFeatures = [
  { label: "AI Assistant", href: "/assistant", icon: Sparkles, active: true },
  { label: "Smart Search", href: "/products", icon: Zap },
  { label: "Product Comparison", href: "/compare", icon: LayoutGrid },
  { label: "Review Analysis", href: "/reviews/analysis", icon: BookOpen },
  { label: "Recommendations", href: "/products?filter=recommended", icon: Heart },
  { label: "Order Tracking", href: "/orders", icon: Car },
];

const accountNav = [
  { label: "Profile", href: "/profile" },
  { label: "Addresses", href: "/profile?tab=addresses" },
  { label: "Payment Methods", href: "/profile?tab=payments" },
  { label: "Settings", href: "/settings" },
  { label: "Logout", href: "/login" },
];

export function AssistantSidebar() {
  const pathname = usePathname();

  return (
    <aside className="glass-card flex flex-col p-4">
      <nav className="space-y-1">
        {assistantNav.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                pathname === item.href ? "bg-white/10 text-foreground" : "text-muted-foreground hover:bg-white/5"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-6">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">AI Features</p>
        <nav className="space-y-1">
          {aiFeatures.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                  isActive ? "gradient-primary text-white" : "text-muted-foreground hover:bg-white/5"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-6">
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account</p>
        <nav className="space-y-1">
          {accountNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-auto rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/15 to-indigo-500/10 p-4">
        <p className="text-sm font-semibold text-violet-200">Try Premium</p>
        <p className="mt-1 text-xs text-muted-foreground">Unlock advanced AI features</p>
        <button className="mt-3 w-full rounded-xl gradient-primary py-2.5 text-sm font-semibold text-white">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
}
