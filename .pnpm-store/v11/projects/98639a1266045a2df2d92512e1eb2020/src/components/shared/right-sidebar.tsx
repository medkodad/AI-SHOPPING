"use client";

import Link from "next/link";
import { Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whyShopWithUs } from "@/data/mock";

const topCategories = ["Electronics", "Computers", "Phones", "Fashion", "Home", "Beauty", "Sports", "Books"];

export function RightSidebar() {
  return (
    <aside className="space-y-4">
      <div className="relative overflow-hidden rounded-[20px] border border-violet-500/20 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 p-5">
        <div className="absolute -right-4 -top-4 text-6xl opacity-20">
          <Headphones className="h-24 w-24" />
        </div>
        <div className="relative">
          <p className="text-lg font-bold text-white">Exclusive Offer 🔥</p>
          <p className="mt-2 text-sm text-white/80">
            Get up to 40% off on selected products this weekend only!
          </p>
          <Link href="/products?filter=deals">
            <Button variant="secondary" className="mt-4 bg-white text-violet-700 hover:bg-white/90">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Top Categories</h3>
          <Link href="/categories" className="text-xs text-violet-400">View All</Link>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          {topCategories.map((cat) => (
            <Link
              key={cat}
              href={`/products?category=${cat}`}
              className="flex flex-col items-center gap-1 rounded-xl border border-white/8 bg-white/5 p-2 text-center transition hover:bg-white/10"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-violet-500/15 text-sm">📱</div>
              <span className="text-[10px] text-muted-foreground">{cat}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="glass-card p-5">
        <h3 className="font-semibold">Why Shop With Us?</h3>
        <div className="mt-4 space-y-4">
          {whyShopWithUs.map((item) => (
            <div key={item.title} className="flex gap-3">
              <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${item.color}`} />
              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
