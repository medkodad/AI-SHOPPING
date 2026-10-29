"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  Check,
  Minus,
  ShoppingCart,
  Star,
  Trophy,
  X,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { flashDeals } from "@/data/mock";
import { formatPrice, cn } from "@/lib/utils";

const compareProducts = flashDeals.slice(0, 3);

function formatSpecValue(key: keyof (typeof compareProducts)[0], value: string | number): string {
  if (key === "price") return formatPrice(value as number);
  if (key === "rating") return `${value} / 5`;
  if (key === "reviews") return (value as number).toLocaleString();
  if (key === "discount") return `${value}%`;
  return String(value);
}

const specKeys = ["price", "rating", "reviews", "discount", "category"] as const;
const specLabels: Record<(typeof specKeys)[number], string> = {
  price: "Price",
  rating: "Rating",
  reviews: "Reviews",
  discount: "Discount",
  category: "Category",
};

const extraSpecs = [
  { label: "Warranty", values: ["1 Year", "1 Year", "2 Years"] },
  { label: "Free Shipping", values: ["Yes", "Yes", "Yes"] },
  { label: "Return Policy", values: ["30 Days", "30 Days", "30 Days"] },
  { label: "AI Score", values: ["94%", "91%", "88%"] },
];

export default function ComparePage() {
  const winner = compareProducts.reduce((best, p) => (p.rating > best.rating ? p : best));

  return (
    <MainLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Compare Products</h1>
          <p className="mt-1 text-muted-foreground">Side-by-side comparison with AI recommendation</p>
        </div>
        <Link href="/products">
          <Button variant="secondary">+ Add Product</Button>
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 glass-card border-emerald-500/20 bg-emerald-500/5 p-5"
      >
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-500/15">
            <Bot className="h-6 w-6 text-emerald-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-400" />
              <h3 className="font-bold">AI Recommendation</h3>
              <Badge variant="success">Best Pick</Badge>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Based on ratings, reviews, and value analysis, we recommend the{" "}
              <span className="font-semibold text-emerald-400">{winner.name}</span>.
              It offers the best balance of performance, customer satisfaction ({winner.rating}★ from {winner.reviews} reviews),
              and current discount ({winner.discount}% off).
            </p>
            <Link href={`/products/${winner.id}`}>
              <Button size="sm" className="mt-3 gap-2">
                <ShoppingCart className="h-4 w-4" /> View {winner.name}
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="overflow-x-auto">
        <div className="min-w-[700px]">
          <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareProducts.length}, 1fr)` }}>
            <div />
            {compareProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "glass-card relative p-4 text-center",
                  product.id === winner.id && "ring-2 ring-emerald-500/50"
                )}
              >
                {product.id === winner.id && (
                  <Badge variant="success" className="absolute -top-2 left-1/2 -translate-x-1/2">
                    Best Pick
                  </Badge>
                )}
                <button className="absolute right-2 top-2 text-muted-foreground hover:text-red-400">
                  <X className="h-4 w-4" />
                </button>
                <div className={cn("mx-auto aspect-square w-24 rounded-xl bg-gradient-to-br", product.gradient)}>
                  <div className="flex h-full items-center justify-center text-3xl opacity-40">📦</div>
                </div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="mt-3 font-semibold hover:text-violet-300">{product.name}</h3>
                </Link>
                <div className="mt-1 flex items-center justify-center gap-1 text-sm text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400" /> {product.rating}
                </div>
                <Link href="/cart">
                  <Button size="sm" className="mt-3 w-full gap-1">
                    <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
                  </Button>
                </Link>
              </motion.div>
            ))}

            {specKeys.map((key) => {
              const values = compareProducts.map((p) => p[key]);
              const numericValues = values.filter((v): v is number => typeof v === "number");
              const bestValue = numericValues.length ? Math.max(...numericValues) : null;

              return (
                <div key={key} className="contents">
                  <div className="flex items-center py-3 text-sm font-medium text-muted-foreground">
                    {specLabels[key]}
                  </div>
                  {compareProducts.map((product) => {
                    const value = product[key];
                    const isBest = typeof value === "number" && value === bestValue && key !== "price";
                    const isBestPrice = key === "price" && typeof value === "number" && value === Math.min(...compareProducts.map((p) => p.price));

                    return (
                      <div
                        key={product.id}
                        className={cn(
                          "flex items-center justify-center py-3 text-sm",
                          (isBest || isBestPrice) && "font-semibold text-emerald-400"
                        )}
                      >
                        {typeof value === "number" || typeof value === "string"
                          ? formatSpecValue(key, value)
                          : "—"}
                        {(isBest || isBestPrice) && <Check className="ml-1 h-3.5 w-3.5" />}
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {extraSpecs.map((spec) => (
              <div key={spec.label} className="contents">
                <div className="flex items-center border-t border-white/8 py-3 text-sm font-medium text-muted-foreground">
                  {spec.label}
                </div>
                {spec.values.map((value, i) => (
                  <div key={i} className="flex items-center justify-center border-t border-white/8 py-3 text-sm">
                    {value === "Yes" ? (
                      <Check className="h-4 w-4 text-emerald-400" />
                    ) : value === "No" ? (
                      <Minus className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      value
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
