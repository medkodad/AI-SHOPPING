"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  Package,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { flashDeals } from "@/data/mock";
import { formatPrice, cn } from "@/lib/utils";

const steps = [
  { id: 1, label: "Address", icon: MapPin },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: Package },
  { id: 4, label: "Confirm", icon: Check },
];

const cartSummary = [
  { ...flashDeals[0], quantity: 1 },
  { ...flashDeals[1], quantity: 1 },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [completed, setCompleted] = useState(false);

  const subtotal = cartSummary.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
    else setCompleted(true);
  };

  if (completed) {
    return (
      <MainLayout>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto max-w-lg glass-card p-10 text-center"
        >
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15">
            <Check className="h-10 w-10 text-emerald-400" />
          </div>
          <h1 className="mt-6 text-3xl font-black">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order #ORD{Math.floor(Math.random() * 900000 + 100000)} has been placed.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link href="/orders">
              <Button className="w-full">View Orders</Button>
            </Link>
            <Link href="/products">
              <Button variant="secondary" className="w-full">Continue Shopping</Button>
            </Link>
          </div>
        </motion.div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-black">Checkout</h1>
        <p className="mt-1 text-muted-foreground">Complete your order securely</p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = step === s.id;
            const isDone = step > s.id;
            return (
              <div key={s.id} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-full border-2 transition",
                      isDone ? "border-emerald-500 bg-emerald-500/15 text-emerald-400" :
                      isActive ? "border-violet-500 bg-violet-500/15 text-violet-400" :
                      "border-white/10 bg-white/5 text-muted-foreground"
                    )}
                  >
                    {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span className={cn("mt-2 text-xs font-medium", isActive ? "text-foreground" : "text-muted-foreground")}>
                    {s.label}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={cn("mx-2 h-0.5 flex-1", step > s.id ? "bg-emerald-500" : "bg-white/10")} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="glass-card p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold">Shipping Address</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium">First Name</label>
                    <Input defaultValue="John" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">Last Name</label>
                    <Input defaultValue="Doe" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium">Address</label>
                    <Input defaultValue="123 Main Street, Apt 4B" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">City</label>
                    <Input defaultValue="San Francisco" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">ZIP Code</label>
                    <Input defaultValue="94102" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-sm font-medium">Phone</label>
                    <Input defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold">Payment Method</h2>
                <div className="mt-5 space-y-3">
                  {[
                    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, Amex" },
                    { id: "paypal", label: "PayPal", desc: "Pay with your PayPal account" },
                    { id: "apple", label: "Apple Pay", desc: "Quick and secure" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition",
                        paymentMethod === method.id ? "border-violet-500/50 bg-violet-500/10" : "border-white/10 bg-white/5"
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="accent-violet-500"
                      />
                      <div>
                        <p className="font-medium">{method.label}</p>
                        <p className="text-xs text-muted-foreground">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                {paymentMethod === "card" && (
                  <div className="mt-5 grid gap-4">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Card Number</label>
                      <Input placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="mb-2 block text-sm font-medium">Expiry</label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium">CVC</label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold">Review Order</h2>
                <div className="mt-5 space-y-4">
                  {cartSummary.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/5 p-4">
                      <div className={cn("h-16 w-16 rounded-lg bg-gradient-to-br", item.gradient)}>
                        <div className="flex h-full items-center justify-center text-2xl opacity-40">📦</div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-violet-300">{formatPrice(item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-xl border border-white/8 bg-white/5 p-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Truck className="h-4 w-4" /> Standard Shipping — Free (5-7 days)
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" /> 123 Main Street, San Francisco, CA 94102
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-xl font-bold">Confirm & Place Order</h2>
                <p className="mt-2 text-muted-foreground">
                  Review your order details one last time before placing your order.
                </p>
                <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                    <span className="font-semibold">Secure Checkout</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your payment information is encrypted and secure. By placing this order, you agree to our terms of service.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <Button variant="secondary" onClick={() => setStep(step - 1)}>Back</Button>
            )}
            <Button className="flex-1 gap-2" onClick={handleNext}>
              {step === 4 ? (
                <>
                  <Lock className="h-4 w-4" /> Place Order — {formatPrice(total)}
                </>
              ) : (
                <>
                  Continue <ChevronRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="glass-card h-fit p-6 lg:sticky lg:top-4">
          <h3 className="font-bold">Order Summary</h3>
          <Separator className="my-4" />
          <div className="space-y-3">
            {cartSummary.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.name} × {item.quantity}</span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <Badge variant="success">Free</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-violet-300">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
