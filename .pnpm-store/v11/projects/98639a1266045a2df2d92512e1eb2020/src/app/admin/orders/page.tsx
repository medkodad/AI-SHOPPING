"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Search } from "lucide-react";
import { adminOrders } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "../_components/page-header";

function statusVariant(status: string) {
  switch (status) {
    case "Delivered":
      return "success" as const;
    case "Shipped":
      return "new" as const;
    case "Processing":
    case "Confirmed":
      return "secondary" as const;
    default:
      return "outline" as const;
  }
}

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  const filtered = adminOrders.filter(
    (o) =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.status.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = adminOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div>
      <PageHeader
        title="Orders"
        description="Track and manage all customer orders."
      />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Orders", value: adminOrders.length.toString() },
            { label: "Revenue", value: `$${totalRevenue.toLocaleString()}` },
            { label: "Avg Order", value: `$${(totalRevenue / adminOrders.length).toFixed(2)}` },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="secondary" size="sm">
                Export CSV
              </Button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/[0.06] bg-white/[0.02]">
                  <tr>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Order ID</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Customer</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Date</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Items</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Total</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map((order, i) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="transition hover:bg-white/[0.02]"
                    >
                      <td className="px-4 py-3 font-medium text-white">{order.id}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.customer}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
                      <td className="px-4 py-3 text-muted-foreground">{order.items}</td>
                      <td className="px-4 py-3 font-medium text-white">${order.total.toFixed(2)}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="h-8 gap-1.5">
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
