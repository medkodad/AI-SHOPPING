"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { featureBar } from "@/data/mock";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Sparkles, Tag, ShieldCheck, Truck, RotateCcw,
};

export function FeatureBar() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {featureBar.map((feature, i) => {
        const Icon = icons[feature.icon] || Sparkles;
        return (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card flex items-center gap-3 p-4"
          >
            <div className={cn("grid h-10 w-10 place-items-center rounded-xl", feature.color)}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">{feature.title}</p>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
