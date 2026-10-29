"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Package, Search } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { orders } from "@/data/mock";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

const statusVariant: Record<string, "success" | "new" | "secondary" | "destructive"> = {
  Delivered: "success",
  Shipped: "new",
  Processing: "secondary",
  Cancelled: "destructive",
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black">Order History</h1>
        <p className="mt-1 text-muted-foreground">Track and manage your purchases</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-11"
            placeholder="Search by order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {["All", "Processing", "Shipped", "Delivered"].map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "secondary"}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-[20px] border border-white/8 lg:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/8 bg-white/5 text-left text-sm text-muted-foreground">
              <th className="p-4 font-medium">Order ID</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Items</th>
              <th className="p-4 font-medium">Total</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order, i) => (
              <motion.tr
                key={order.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/5 transition hover:bg-white/5"
              >
                <td className="p-4 font-semibold">{order.id}</td>
                <td className="p-4 text-muted-foreground">{order.date}</td>
                <td className="p-4 text-muted-foreground">{order.items} items</td>
                <td className="p-4 font-semibold text-violet-300">{formatPrice(order.total)}</td>
                <td className="p-4">
                  <Badge variant={statusVariant[order.status] ?? "secondary"}>{order.status}</Badge>
                </td>
                <td className="p-4">
                  <Link href={`/orders/${order.id}`}>
                    <Button variant="ghost" size="sm" className="gap-1">
                      View <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 lg:hidden">
        {filtered.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{order.id}</p>
                <p className="text-sm text-muted-foreground">{order.date}</p>
              </div>
              <Badge variant={statusVariant[order.status] ?? "secondary"}>{order.status}</Badge>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" /> {order.items} items
              </div>
              <span className="font-bold text-violet-300">{formatPrice(order.total)}</span>
            </div>
            <Link href={`/orders/${order.id}`}>
              <Button variant="secondary" className="mt-4 w-full gap-1">
                View Details <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        ))}
      </div>
    </MainLayout>
  );
}
