"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Eye, MousePointerClick, ShoppingBag } from "lucide-react";
import { analyticsOverview, revenueChartData, salesChartData } from "@/data/mock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PageHeader } from "../_components/page-header";

export default function AnalyticsPage() {
  const maxRevenue = Math.max(...revenueChartData.map((d) => d.value));

  const metrics = [
    { label: "Conversion Rate", value: `${analyticsOverview.conversionRate}%`, delta: "+0.4%", up: true, icon: MousePointerClick },
    { label: "Avg Order Value", value: `$${analyticsOverview.avgOrderValue}`, delta: "+2.1%", up: true, icon: ShoppingBag },
    { label: "Bounce Rate", value: `${analyticsOverview.bounceRate}%`, delta: "-1.2%", up: false, icon: ArrowDownRight },
    { label: "Page Views", value: analyticsOverview.pageViews.toLocaleString(), delta: "+18.3%", up: true, icon: Eye },
  ];

  return (
    <div>
      <PageHeader
        title="Analytics"
        description="Sales performance, traffic insights, and category breakdowns."
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <Card key={metric.label}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-violet-500/10 p-2.5">
                      <Icon className="h-5 w-5 text-violet-400" />
                    </div>
                    <Badge variant={metric.up ? "success" : "secondary"} className="gap-1">
                      {metric.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {metric.delta}
                    </Badge>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">{metric.label}</p>
                  <p className="mt-1 text-2xl font-bold text-white">{metric.value}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Monthly Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-52 items-end gap-3">
                {revenueChartData.map((bar) => (
                  <div key={bar.month} className="flex flex-1 flex-col items-center gap-2">
                    <div className="flex w-full flex-1 items-end">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(bar.value / maxRevenue) * 100}%` }}
                        transition={{ duration: 0.5 }}
                        className="w-full rounded-t-lg gradient-primary"
                      />
                    </div>
                    <span className="text-[11px] text-muted-foreground">{bar.month}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Weekly Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-52 items-end gap-3">
                {salesChartData.map((bar) => {
                  const max = Math.max(...salesChartData.map((d) => d.value));
                  return (
                    <div key={bar.day} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex w-full flex-1 items-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${(bar.value / max) * 100}%` }}
                          transition={{ duration: 0.5 }}
                          className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600 to-violet-400"
                        />
                      </div>
                      <span className="text-[11px] text-muted-foreground">{bar.day}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analyticsOverview.topCategories.map((cat) => (
                <div key={cat.name}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-white">{cat.name}</span>
                    <span className="text-muted-foreground">{cat.share}%</span>
                  </div>
                  <Progress value={cat.share} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Traffic Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {analyticsOverview.trafficSources.map((source) => (
                <div key={source.source}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="text-white">{source.source}</span>
                    <span className="text-muted-foreground">{source.visits}%</span>
                  </div>
                  <Progress value={source.visits} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
