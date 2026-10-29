"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  Minus,
  Plus,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { flashDeals } from "@/data/mock";
import { cn } from "@/lib/utils";

const product = flashDeals[0];

const ratingDistribution = [
  { stars: 5, count: 210, percent: 66 },
  { stars: 4, count: 72, percent: 22 },
  { stars: 3, count: 24, percent: 7 },
  { stars: 2, count: 10, percent: 3 },
  { stars: 1, count: 4, percent: 2 },
];

const sentimentData = [
  { label: "Positive", value: 85, color: "bg-emerald-500" },
  { label: "Neutral", value: 10, color: "bg-amber-500" },
  { label: "Negative", value: 5, color: "bg-red-500" },
];

const pros = [
  "Excellent build quality and premium feel",
  "Outstanding performance for gaming and productivity",
  "Great value with current discount pricing",
  "Fast shipping and well-packaged delivery",
  "Responsive customer support experience",
];

const cons = [
  "Battery life could be better under heavy load",
  "Fan noise noticeable during intensive tasks",
  "Limited port selection compared to competitors",
];

const keywords = [
  { word: "performance", count: 89, sentiment: "positive" },
  { word: "quality", count: 76, sentiment: "positive" },
  { word: "gaming", count: 65, sentiment: "positive" },
  { word: "battery", count: 34, sentiment: "negative" },
  { word: "display", count: 58, sentiment: "positive" },
  { word: "price", count: 45, sentiment: "positive" },
  { word: "noise", count: 22, sentiment: "negative" },
  { word: "design", count: 41, sentiment: "positive" },
];

export default function ReviewAnalysisPage() {
  return (
    <MainLayout>
      <Link href={`/products/${product.id}`} className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to Product
      </Link>

      <div className="mb-8">
        <div className="flex flex-wrap items-start gap-6">
          <div className={cn("h-24 w-24 rounded-2xl bg-gradient-to-br", product.gradient)}>
            <div className="flex h-full items-center justify-center text-4xl opacity-40">📦</div>
          </div>
          <div>
            <Badge variant="new" className="mb-2">AI Review Analysis</Badge>
            <h1 className="text-3xl font-black">{product.name}</h1>
            <p className="mt-1 text-muted-foreground">{product.category} · {product.reviews} reviews analyzed</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-5 w-5", i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-white/20")} />
                ))}
              </div>
              <span className="text-lg font-bold">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <h2 className="text-lg font-bold">Rating Distribution</h2>
          <div className="mt-5 space-y-3">
            {ratingDistribution.map((row) => (
              <div key={row.stars} className="flex items-center gap-3">
                <span className="flex w-12 items-center gap-1 text-sm">
                  {row.stars} <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </span>
                <div className="flex-1">
                  <Progress value={row.percent} />
                </div>
                <span className="w-10 text-right text-sm text-muted-foreground">{row.count}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <h2 className="text-lg font-bold">Sentiment Analysis</h2>
          <div className="mt-5 space-y-4">
            {sentimentData.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-sm">
                  <span>{item.label}</span>
                  <span className="font-semibold">{item.value}%</span>
                </div>
                <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={cn("h-full rounded-full", item.color)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center">
            <p className="text-3xl font-black text-emerald-400">92%</p>
            <p className="text-sm text-muted-foreground">Overall Positive Sentiment</p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6">
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-5 w-5 text-emerald-400" />
            <h2 className="text-lg font-bold">Pros</h2>
            <Badge variant="success">{pros.length}</Badge>
          </div>
          <ul className="mt-4 space-y-3">
            {pros.map((pro, i) => (
              <motion.li
                key={pro}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex items-start gap-2 text-sm"
              >
                <Plus className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                {pro}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <div className="flex items-center gap-2">
            <ThumbsDown className="h-5 w-5 text-amber-400" />
            <h2 className="text-lg font-bold">Cons</h2>
            <Badge variant="secondary">{cons.length}</Badge>
          </div>
          <ul className="mt-4 space-y-3">
            {cons.map((con, i) => (
              <motion.li
                key={con}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                className="flex items-start gap-2 text-sm"
              >
                <Minus className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                {con}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 glass-card p-6"
      >
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-violet-400" />
          <h2 className="text-lg font-bold">AI Summary</h2>
        </div>
        <Separator className="my-4" />
        <p className="text-muted-foreground leading-relaxed">
          The {product.name} receives overwhelmingly positive feedback from {product.reviews} verified buyers,
          with a {product.rating}-star average rating. Customers consistently praise its build quality, gaming
          performance, and value proposition — especially at the current {product.discount}% discount.
          The main areas for improvement are battery life under heavy workloads and fan noise during intensive
          gaming sessions. Overall, this product is recommended for users seeking a high-performance {product.category.toLowerCase()}
          with excellent customer satisfaction scores.
        </p>

        <div className="mt-6">
          <h3 className="text-sm font-semibold">Top Keywords</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {keywords.map((kw) => (
              <span
                key={kw.word}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  kw.sentiment === "positive"
                    ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                    : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                )}
              >
                {kw.word} ({kw.count})
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link href={`/products/${product.id}`}>
            <Button>View Product</Button>
          </Link>
          <Link href="/compare">
            <Button variant="secondary">Compare Alternatives</Button>
          </Link>
        </div>
      </motion.div>
    </MainLayout>
  );
}
