"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  MapPin,
  Package,
  Phone,
  Truck,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { orders, flashDeals } from "@/data/mock";
import { formatPrice, cn } from "@/lib/utils";

const timelineSteps = [
  { label: "Order Placed", date: "Jun 25, 2026 · 10:30 AM", done: true },
  { label: "Payment Confirmed", date: "Jun 25, 2026 · 10:31 AM", done: true },
  { label: "Processing", date: "Jun 25, 2026 · 2:15 PM", done: true },
  { label: "Shipped", date: "Jun 26, 2026 · 9:00 AM", done: true, active: true },
  { label: "Out for Delivery", date: "Expected Jun 28, 2026", done: false },
  { label: "Delivered", date: "Expected Jun 28, 2026", done: false },
];

export default function OrderTrackingPage() {
  const params = useParams();
  const orderId = params.orderId as string;
  const order = orders.find((o) => o.id === orderId) ?? orders[0];
  const orderItems = flashDeals.slice(0, order.items);

  return (
    <MainLayout>
      <Link href="/orders" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Order {order.id}</h1>
          <p className="mt-1 text-muted-foreground">Placed on {order.date}</p>
        </div>
        <Badge variant={order.status === "Delivered" ? "success" : order.status === "Shipped" ? "new" : "secondary"} className="text-sm px-4 py-1">
          {order.status}
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="glass-card p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Truck className="h-5 w-5 text-violet-400" /> Delivery Timeline
            </h2>
            <div className="mt-6 space-y-0">
              {timelineSteps.map((step, i) => (
                <div key={step.label} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "grid h-8 w-8 place-items-center rounded-full border-2",
                        step.done
                          ? "border-emerald-500 bg-emerald-500/15 text-emerald-400"
                          : "border-white/10 bg-white/5 text-muted-foreground"
                      )}
                    >
                      {step.done ? <Check className="h-4 w-4" /> : <div className="h-2 w-2 rounded-full bg-white/20" />}
                    </div>
                    {i < timelineSteps.length - 1 && (
                      <div className={cn("w-0.5 flex-1 min-h-[40px]", step.done ? "bg-emerald-500/50" : "bg-white/10")} />
                    )}
                  </div>
                  <div className="pb-8">
                    <p className={cn("font-semibold", step.active && "text-violet-300")}>{step.label}</p>
                    <p className="text-sm text-muted-foreground">{step.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card overflow-hidden p-0">
            <div className="p-5">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <MapPin className="h-5 w-5 text-violet-400" /> Live Tracking
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">Estimated delivery: Jun 28, 2026</p>
            </div>
            <div className="relative h-64 bg-gradient-to-br from-slate-800 via-indigo-950 to-violet-950">
              <div className="absolute inset-0 opacity-20">
                <svg className="h-full w-full" viewBox="0 0 400 200">
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              <motion.div
                animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute left-1/3 top-1/3"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full gradient-primary shadow-lg">
                  <Truck className="h-5 w-5 text-white" />
                </div>
              </motion.div>
              <div className="absolute bottom-4 left-4 rounded-xl border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground">Current Location</p>
                <p className="text-sm font-semibold">Distribution Center — Oakland, CA</p>
              </div>
              <div className="absolute right-4 top-4 rounded-xl border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground">Tracking #</p>
                <p className="text-sm font-semibold">TRK-{order.id.slice(3)}</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-lg font-bold">Order Items</h2>
            <div className="mt-4 space-y-4">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className={cn("h-16 w-16 rounded-xl bg-gradient-to-br", item.gradient)}>
                    <div className="flex h-full items-center justify-center text-2xl opacity-40">📦</div>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <span className="font-semibold text-violet-300">{formatPrice(item.price)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-4 lg:self-start">
          <div className="glass-card p-6">
            <h3 className="font-bold">Order Summary</h3>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.total * 0.92)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-emerald-400">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(order.total * 0.08)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-violet-300">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold">Shipping Address</h3>
            <div className="mt-3 space-y-1 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">John Doe</p>
              <p>123 Main Street, Apt 4B</p>
              <p>San Francisco, CA 94102</p>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold">Need Help?</h3>
            <p className="mt-2 text-sm text-muted-foreground">Contact our support team for order assistance.</p>
            <Button variant="secondary" className="mt-4 w-full gap-2">
              <Phone className="h-4 w-4" /> Contact Support
            </Button>
            <Button variant="outline" className="mt-2 w-full gap-2">
              <Package className="h-4 w-4" /> Report an Issue
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
