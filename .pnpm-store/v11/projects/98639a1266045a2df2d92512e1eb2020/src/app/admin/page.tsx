"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  DollarSign,
  Package,
  Plus,
  ShoppingCart,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import {
  adminStats,
  adminOrders,
  adminCustomers,
  activityFeed,
  aiAgents,
  revenueChartData,
  salesChartData,
} from "@/data/mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "./_components/page-header";

const statIcons = [DollarSign, ShoppingCart, Users, Package];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
};

function statusVariant(status: string) {
  switch (status) {
    case "Delivered":
    case "Online":
    case "Active":
    case "VIP":
      return "success" as const;
    case "Shipped":
    case "Confirmed":
      return "new" as const;
    case "Processing":
    case "Degraded":
    case "Low Stock":
      return "secondary" as const;
    case "Offline":
    case "Out of Stock":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

export default function AdminDashboardPage() {
  const maxRevenue = Math.max(...revenueChartData.map((d) => d.value));
  const maxSales = Math.max(...salesChartData.map((d) => d.value));

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Operations command center for products, orders, analytics, and AI agents."
        action={
          <>
            <Button variant="secondary" size="sm">
              Export Report
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </>
        }
      />

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Stats */}
        <motion.div variants={item} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {adminStats.map((stat, i) => {
            const Icon = statIcons[i];
            return (
              <Card key={stat.label} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-violet-500/10 p-2.5">
                      <Icon className="h-5 w-5 text-violet-400" />
                    </div>
                    <Badge variant="success" className="gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.delta}
                    </Badge>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-white">{stat.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Charts */}
        <motion.div variants={item} className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
              <Badge variant="secondary">7 months</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-3">
                {revenueChartData.map((bar) => (
                  <div key={bar.month} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative flex w-full flex-1 items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(bar.value / maxRevenue) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full rounded-t-lg gradient-primary opacity-90"
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground">{bar.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Sales This Week</CardTitle>
              <Badge variant="secondary">7 days</Badge>
            </CardHeader>
            <CardContent>
              <div className="flex h-48 items-end gap-3">
                {salesChartData.map((bar) => (
                  <div key={bar.day} className="flex flex-1 flex-col items-center gap-2">
                    <div className="relative flex w-full flex-1 items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(bar.value / maxSales) * 100}%` }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 via-violet-500 to-violet-400"
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground">{bar.day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Orders, Customers, Activity, Quick Actions, AI */}
        <motion.div variants={item} className="grid gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Recent Orders</CardTitle>
              <Link href="/admin/orders">
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  View all
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {adminOrders.slice(0, 4).map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                    <p className="mt-1 text-xs text-muted-foreground">${order.total.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="xl:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">Recent Customers</CardTitle>
              <Link href="/admin/customers">
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  View all
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {adminCustomers.slice(0, 4).map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15 text-xs font-bold text-violet-300">
                      {customer.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                  <Badge variant={statusVariant(customer.status)}>{customer.status}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="xl:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {activityFeed.map((entry, i) => (
                <div key={entry.id}>
                  <div className="flex gap-3 py-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10">
                      <Zap className="h-3.5 w-3.5 text-violet-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-white">{entry.action}</p>
                      <p className="truncate text-xs text-muted-foreground">{entry.detail}</p>
                      <p className="mt-0.5 text-[10px] text-muted-foreground/70">{entry.time}</p>
                    </div>
                  </div>
                  {i < activityFeed.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item} className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Add Product", href: "/admin/products", icon: Package },
                  { label: "View Orders", href: "/admin/orders", icon: ShoppingCart },
                  { label: "Manage Customers", href: "/admin/customers", icon: Users },
                  { label: "AI Agents", href: "/admin/ai-agents", icon: Bot },
                ].map((action) => {
                  const Icon = action.icon;
                  return (
                    <Link key={action.label} href={action.href}>
                      <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition hover:border-violet-500/30 hover:bg-violet-500/5">
                        <div className="rounded-lg bg-violet-500/10 p-2">
                          <Icon className="h-4 w-4 text-violet-400" />
                        </div>
                        <span className="text-sm font-medium text-white">{action.label}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* AI Agents Monitor */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-semibold">AI Agents Monitor</CardTitle>
              <Link href="/admin/ai-agents">
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  Manage
                  <ArrowUpRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiAgents.slice(0, 5).map((agent) => (
                <div
                  key={agent.id}
                  className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <Bot className="h-4 w-4 text-violet-400" />
                    <div>
                      <p className="text-sm font-medium text-white">{agent.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {agent.requests.toLocaleString()} req · {agent.latency}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={statusVariant(agent.status)}>{agent.status}</Badge>
                    <Progress value={parseFloat(agent.uptime)} className="mt-2 w-20" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
