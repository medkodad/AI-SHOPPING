"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Tag, Trash2, Truck } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { flashDeals, recommendedProducts } from "@/data/mock";
import { formatPrice, cn } from "@/lib/utils";

const initialCartItems = [
  { ...flashDeals[0], quantity: 1 },
  { ...flashDeals[1], quantity: 2 },
  { ...recommendedProducts[0], quantity: 1, originalPrice: 1199, discount: 8 },
];

export default function CartPage() {
  const [items, setItems] = useState(initialCartItems);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [shipping, setShipping] = useState<"standard" | "express">("standard");

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => setItems((prev) => prev.filter((item) => item.id !== id));

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shippingCost = shipping === "express" ? 14.99 : subtotal > 100 ? 0 : 5.99;
  const total = subtotal - discount + shippingCost;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SHOPAI10") setCouponApplied(true);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black">Shopping Cart</h1>
        <p className="mt-1 text-muted-foreground">{items.length} items in your cart</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="glass-card py-16 text-center">
              <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-lg font-semibold">Your cart is empty</p>
              <Link href="/products">
                <Button className="mt-4">Continue Shopping</Button>
              </Link>
            </div>
          ) : (
            items.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card flex gap-4 p-4 sm:p-5"
              >
                <div className={cn("h-24 w-24 shrink-0 rounded-xl bg-gradient-to-br sm:h-28 sm:w-28", item.gradient)}>
                  <div className="flex h-full items-center justify-center text-3xl opacity-40">📦</div>
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      {"discount" in item && item.discount && (
                        <Badge variant="destructive" className="mt-1">-{item.discount}%</Badge>
                      )}
                    </div>
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-400">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-xl border border-white/10 bg-white/5">
                      <button className="p-2 hover:bg-white/5" onClick={() => updateQuantity(item.id, -1)}>
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button className="p-2 hover:bg-white/5" onClick={() => updateQuantity(item.id, 1)}>
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-lg font-bold text-violet-300">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}

          <div className="glass-card p-5">
            <h3 className="flex items-center gap-2 font-semibold">
              <Tag className="h-4 w-4 text-violet-400" /> Coupon Code
            </h3>
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="Enter code (try SHOPAI10)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                disabled={couponApplied}
              />
              <Button variant="secondary" onClick={applyCoupon} disabled={couponApplied}>
                {couponApplied ? "Applied" : "Apply"}
              </Button>
            </div>
            {couponApplied && (
              <p className="mt-2 text-sm text-emerald-400">10% discount applied!</p>
            )}
          </div>

          <div className="glass-card p-5">
            <h3 className="flex items-center gap-2 font-semibold">
              <Truck className="h-4 w-4 text-violet-400" /> Shipping Method
            </h3>
            <div className="mt-3 space-y-2">
              {[
                { id: "standard" as const, label: "Standard Shipping", time: "5-7 business days", price: subtotal > 100 ? "Free" : "$5.99" },
                { id: "express" as const, label: "Express Shipping", time: "2-3 business days", price: "$14.99" },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-xl border p-4 transition",
                    shipping === opt.id ? "border-violet-500/50 bg-violet-500/10" : "border-white/10 bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="shipping"
                      checked={shipping === opt.id}
                      onChange={() => setShipping(opt.id)}
                      className="accent-violet-500"
                    />
                    <div>
                      <p className="text-sm font-medium">{opt.label}</p>
                      <p className="text-xs text-muted-foreground">{opt.time}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{opt.price}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold">Order Summary</h3>
            <Separator className="my-4" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount (10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{shippingCost === 0 ? "Free" : formatPrice(shippingCost)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-violet-300">{formatPrice(total)}</span>
              </div>
            </div>
            <Link href="/checkout">
              <Button className="mt-6 w-full" size="lg" disabled={items.length === 0}>
                Proceed to Checkout
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="ghost" className="mt-2 w-full">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold">You Might Also Like</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedProducts.slice(0, 4).map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
