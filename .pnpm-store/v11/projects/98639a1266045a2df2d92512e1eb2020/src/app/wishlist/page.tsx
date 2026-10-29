"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Heart, ShoppingCart, Trash2, X } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { flashDeals, recommendedProducts } from "@/data/mock";
import { formatPrice, cn } from "@/lib/utils";

const initialWishlist = [
  ...flashDeals.slice(0, 2),
  ...recommendedProducts.slice(0, 3),
];

export default function WishlistPage() {
  const [items, setItems] = useState(initialWishlist);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortBy, setSortBy] = useState("Recently Added");

  const filtered = useMemo(() => {
    let result = [...items];
    if (categoryFilter !== "All") {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (sortBy === "Price: Low to High") result.sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low") result.sort((a, b) => b.price - a.price);
    if (sortBy === "Top Rated") result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [items, categoryFilter, sortBy]);

  const uniqueCategories = ["All", ...new Set(items.map((p) => p.category))];

  const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));

  return (
    <MainLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">My Wishlist</h1>
          <p className="mt-1 text-muted-foreground">{items.length} saved items</p>
        </div>
        {items.length > 0 && (
          <Link href="/cart">
            <Button className="gap-2">
              <ShoppingCart className="h-4 w-4" /> Move All to Cart
            </Button>
          </Link>
        )}
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" /> Filter:
        </div>
        {uniqueCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition",
              categoryFilter === cat
                ? "border-violet-500/50 bg-violet-500/10 text-violet-300"
                : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
            )}
          >
            {cat}
          </button>
        ))}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="ml-auto h-9 rounded-xl border border-white/10 bg-white/5 px-3 text-sm outline-none"
        >
          {["Recently Added", "Price: Low to High", "Price: High to Low", "Top Rated"].map((opt) => (
            <option key={opt} value={opt} className="bg-[#111827]">{opt}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="glass-card py-16 text-center">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-lg font-semibold">Your wishlist is empty</p>
          <Link href="/products">
            <Button className="mt-4">Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="group glass-card overflow-hidden"
            >
              <Link href={`/products/${item.id}`}>
                <div className={cn("aspect-[4/3] bg-gradient-to-br", item.gradient)}>
                  <div className="flex h-full items-center justify-center text-4xl opacity-30">📦</div>
                </div>
              </Link>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold hover:text-violet-300">{item.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-400">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-lg font-bold text-violet-300">{formatPrice(item.price)}</span>
                  {"discount" in item && typeof item.discount === "number" && (
                    <Badge variant="destructive">-{item.discount}%</Badge>
                  )}
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href="/cart" className="flex-1">
                    <Button size="sm" className="w-full gap-1">
                      <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
                    </Button>
                  </Link>
                  <Button size="sm" variant="secondary" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </MainLayout>
  );
}
