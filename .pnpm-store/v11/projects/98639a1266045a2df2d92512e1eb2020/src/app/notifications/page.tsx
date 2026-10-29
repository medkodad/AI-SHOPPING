"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Bot,
  Check,
  Gift,
  Package,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const notifications = [
  { id: "1", type: "order", title: "Order Shipped", message: "Your order ORD123456 has been shipped and is on its way!", time: "2 min ago", read: false, icon: Truck },
  { id: "2", type: "ai", title: "AI Recommendation", message: "Based on your browsing, you might love the Sony WH-1000XM5 headphones.", time: "1 hour ago", read: false, icon: Bot },
  { id: "3", type: "deal", title: "Flash Deal Alert", message: "ASUS ROG Strix G16 is 20% off for the next 4 hours!", time: "3 hours ago", read: false, icon: Tag },
  { id: "4", type: "order", title: "Order Delivered", message: "Your order ORD123455 has been delivered successfully.", time: "Yesterday", read: true, icon: Package },
  { id: "5", type: "promo", title: "Special Offer", message: "Use code SHOPAI10 for 10% off your next purchase!", time: "Yesterday", read: true, icon: Gift },
  { id: "6", type: "ai", title: "Price Drop Alert", message: "MacBook Air M2 in your wishlist dropped by $100!", time: "2 days ago", read: true, icon: Sparkles },
  { id: "7", type: "order", title: "Order Processing", message: "Your order ORD123454 is being prepared for shipment.", time: "3 days ago", read: true, icon: Package },
];

const filters = ["All", "Unread", "Orders", "AI", "Deals"];

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);
  const [filter, setFilter] = useState("All");

  const unreadCount = items.filter((n) => !n.read).length;

  const filtered = useMemo(() => {
    switch (filter) {
      case "Unread":
        return items.filter((n) => !n.read);
      case "Orders":
        return items.filter((n) => n.type === "order");
      case "AI":
        return items.filter((n) => n.type === "ai");
      case "Deals":
        return items.filter((n) => n.type === "deal" || n.type === "promo");
      default:
        return items;
    }
  }, [items, filter]);

  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  return (
    <MainLayout>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} unread</Badge>
            )}
          </div>
          <p className="mt-1 text-muted-foreground">Stay updated on orders, deals, and AI recommendations</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="secondary" size="sm" className="gap-2" onClick={markAllRead}>
            <Check className="h-4 w-4" /> Mark all as read
          </Button>
        )}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "secondary"}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f}
            {f === "Unread" && unreadCount > 0 && (
              <span className="ml-1 rounded-full bg-white/20 px-1.5 text-xs">{unreadCount}</span>
            )}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="glass-card py-16 text-center">
            <Bell className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">No notifications</p>
            <p className="text-sm text-muted-foreground">You&apos;re all caught up!</p>
          </div>
        ) : (
          filtered.map((notif, i) => {
            const Icon = notif.icon;
            return (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => markRead(notif.id)}
                className={cn(
                  "glass-card flex cursor-pointer gap-4 p-5 transition hover:bg-white/[0.02]",
                  !notif.read && "border-violet-500/20 bg-violet-500/5"
                )}
              >
                <div className={cn(
                  "grid h-12 w-12 shrink-0 place-items-center rounded-xl",
                  notif.type === "order" ? "bg-blue-500/15 text-blue-400" :
                  notif.type === "ai" ? "bg-violet-500/15 text-violet-400" :
                  notif.type === "deal" ? "bg-red-500/15 text-red-400" :
                  "bg-emerald-500/15 text-emerald-400"
                )}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className={cn("font-semibold", !notif.read && "text-foreground")}>{notif.title}</h3>
                    <div className="flex items-center gap-2">
                      <span className="shrink-0 text-xs text-muted-foreground">{notif.time}</span>
                      {!notif.read && <span className="h-2 w-2 shrink-0 rounded-full bg-violet-500" />}
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{notif.message}</p>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </MainLayout>
  );
}
