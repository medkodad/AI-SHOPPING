"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Bot,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { navLinks } from "@/data/mock";
import { cn } from "@/lib/utils";

const subNavLinks = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Deals", href: "/products?filter=deals" },
  { label: "New Arrivals", href: "/products?filter=new" },
  { label: "Best Sellers", href: "/products?filter=bestsellers" },
  { label: "Brands", href: "/products?filter=brands" },
];

export function Navbar() {
  const pathname = usePathname();
  const isAuth = pathname?.startsWith("/login") || pathname?.startsWith("/register") || pathname?.startsWith("/forgot-password");

  if (isAuth) return null;

  return (
    <header className="sticky top-0 z-50 space-y-3">
      <div className="glass-card px-4 py-3 sm:px-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary shadow-lg shadow-violet-500/25">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight">ShopAI</span>
            </Link>
          </div>

          <div className="flex flex-1 items-center gap-2 xl:max-w-2xl">
            <div className="relative flex flex-1 items-center">
              <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
              <Input className="h-12 pl-11" placeholder="Search for products, brands and more..." />
            </div>
            <Button size="icon" className="h-12 w-12 shrink-0">
              <Search className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <Link href="/wishlist" className="hidden items-center gap-2 text-muted-foreground transition hover:text-foreground sm:inline-flex">
              <Heart className="h-5 w-5" />
              <span>Wishlist</span>
            </Link>
            <Link href="/cart" className="relative inline-flex items-center gap-2 text-muted-foreground transition hover:text-foreground">
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Cart</span>
              <Badge variant="default" className="absolute -right-2 -top-2 h-5 w-5 p-0 text-[10px]">2</Badge>
            </Link>
            <Link href="/notifications" className="relative inline-flex items-center gap-2 text-muted-foreground transition hover:text-foreground">
              <Bell className="h-5 w-5" />
              <Badge variant="new" className="absolute -right-1 -top-1 h-5 w-5 p-0 text-[10px]">5</Badge>
            </Link>
            <Link href="/profile" className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="hidden text-left xl:block">
                <p className="text-xs text-muted-foreground">Hi, John</p>
                <p className="flex items-center gap-1 text-sm font-semibold">
                  My Account <ChevronDown className="h-3 w-3" />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="glass-card flex flex-wrap items-center gap-2 px-4 py-2 sm:px-5">
        <Button className="h-10 gap-2 rounded-xl">
          <Menu className="h-4 w-4" />
          All Categories
        </Button>
        <nav className="flex flex-wrap items-center gap-1">
          {subNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-white/5",
                pathname === link.href ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/assistant"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-violet-400 transition hover:bg-white/5"
          >
            <Sparkles className="h-4 w-4" />
            AI Assistant
            <Badge variant="new" className="text-[10px]">New</Badge>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function AssistantNavbar() {
  return (
    <header className="glass-card px-4 py-3 sm:px-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl gradient-primary">
              <WandSparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-black">ShopAI</p>
              <p className="text-xs text-muted-foreground">AI Shopping Assistant</p>
            </div>
          </Link>
        </div>
        <div className="relative flex flex-1 items-center xl:max-w-xl">
          <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
          <Input className="h-11 pl-11" placeholder="Search for products, brands and more..." />
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/wishlist" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <Heart className="h-5 w-5" /> Wishlist
          </Link>
          <Link href="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ShoppingCart className="h-5 w-5" /> Cart
          </Link>
          <Link href="/notifications"><Bell className="h-5 w-5 text-muted-foreground" /></Link>
          <Avatar className="h-9 w-9"><AvatarFallback>JD</AvatarFallback></Avatar>
        </div>
      </div>
    </header>
  );
}
