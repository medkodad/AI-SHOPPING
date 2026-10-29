"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  Check,
  Headphones,
  Laptop,
  Send,
  Shirt,
  Smartphone,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import { AssistantNavbar } from "@/components/layout/navbar";
import { AssistantSidebar } from "@/components/layout/sidebar";
import { FloatingChatButton } from "@/components/layout/floating-chat";
import { ChatProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { assistantPrompts, chatHistory, gamingLaptops } from "@/data/mock";
import { formatPrice } from "@/lib/utils";

const promptIcons: Record<string, LucideIcon> = {
  Laptop, Headphones, Smartphone, Shirt,
};

const sidebarRecommendations = [
  { name: "Razer BlackShark V2 X", type: "Headphones", price: 69.99, rating: 4.6 },
  { name: "Logitech G Pro X", type: "Gaming Headset", price: 99.99, rating: 4.5 },
  { name: "SteelSeries Apex 3", type: "Gaming Keyboard", price: 49.99, rating: 4.4 },
  { name: "Redragon M711 Cobra", type: "Gaming Mouse", price: 29.99, rating: 4.5 },
];

export default function AssistantPage() {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.1),transparent_40%)]" />
      <div className="relative mx-auto max-w-[1600px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <AssistantNavbar />

        <div className="mt-6 grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)_320px]">
          <AssistantSidebar />

          {/* Main Chat */}
          <main className="flex flex-col glass-card overflow-hidden" style={{ minHeight: "calc(100vh - 140px)" }}>
            <div className="border-b border-white/8 p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-primary">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">AI Shopping Assistant</h1>
                  <p className="text-sm text-muted-foreground">Ask anything, compare products, get personalized recommendations</p>
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {assistantPrompts.map((prompt) => {
                  const Icon = promptIcons[prompt.icon] || Laptop;
                  return (
                    <button
                      key={prompt.text}
                      className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 p-3 text-left text-xs transition hover:bg-white/10"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-violet-400" />
                      <span className="line-clamp-2">{prompt.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {/* User message */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="ml-auto max-w-md"
              >
                <div className="rounded-2xl rounded-tr-sm gradient-primary px-4 py-3 text-sm text-white">
                  I need a gaming laptop under $1000.
                </div>
              </motion.div>

              {/* AI response */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-full"
              >
                <div className="flex items-start gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-500/20">
                    <Bot className="h-4 w-4 text-violet-400" />
                  </div>
                  <div className="flex-1">
                    <div className="rounded-2xl rounded-tl-sm border border-white/8 bg-white/5 p-4 text-sm">
                      <p>Great choice! Here are the best gaming laptops under $1000 based on performance, reviews, and value:</p>
                    </div>

                    <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                      {gamingLaptops.map((laptop) => (
                        <ChatProductCard
                          key={laptop.id}
                          name={laptop.name}
                          specs={laptop.specs}
                          price={laptop.price}
                          rating={laptop.rating}
                          gradient={laptop.gradient}
                        />
                      ))}
                    </div>

                    <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 p-4">
                      <p className="text-sm font-semibold text-violet-300">Why these laptops?</p>
                      <ul className="mt-2 space-y-2">
                        {[
                          "All have dedicated GPUs for smooth gaming",
                          "16GB RAM handles modern games well",
                          "Strong user reviews (4.3+ stars)",
                          "Within your $1000 budget",
                        ].map((reason) => (
                          <li key={reason} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="h-4 w-4 shrink-0 text-emerald-400" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Show cheaper options", "Show with better graphics", "Compare top 2", "Add to wishlist"].map((action) => (
                        <button
                          key={action}
                          className="rounded-full border border-violet-500/30 px-4 py-1.5 text-xs text-violet-300 transition hover:bg-violet-500/10"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="border-t border-white/8 p-4">
              <div className="flex gap-2">
                <Input placeholder="Ask anything about products..." className="h-12" />
                <Button size="icon" className="h-12 w-12 shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </main>

          {/* Right sidebar */}
          <aside className="space-y-4">
            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Conversation History</h3>
                <button className="text-xs text-violet-400">View all</button>
              </div>
              <div className="mt-3 space-y-2">
                {chatHistory.map((chat) => (
                  <div
                    key={chat.id}
                    className={`rounded-xl px-3 py-2.5 text-sm ${chat.active ? "border border-violet-500/30 bg-violet-500/10" : "bg-white/5"}`}
                  >
                    <p className="line-clamp-1">{chat.title}</p>
                    <p className="text-xs text-muted-foreground">{chat.time}</p>
                  </div>
                ))}
              </div>
              <button className="mt-3 text-xs text-red-400 hover:text-red-300">Clear History</button>
            </div>

            <div className="glass-card p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Recommended For You</h3>
                <Link href="/products" className="text-xs text-violet-400">View all</Link>
              </div>
              <div className="mt-3 space-y-3">
                {sidebarRecommendations.map((item) => (
                  <div key={item.name} className="flex items-center gap-3 rounded-xl bg-white/5 p-2">
                    <div className="h-12 w-12 shrink-0 rounded-xl bg-gradient-to-br from-slate-700 to-violet-900" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.type}</p>
                      <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                    </div>
                    <span className="flex items-center gap-0.5 text-xs text-amber-400">
                      <Star className="h-3 w-3 fill-amber-400" /> {item.rating}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-5">
              <h3 className="font-semibold">AI Assistant Tips</h3>
              <ul className="mt-3 space-y-2">
                {["Be specific about your needs", "Mention your budget", "Compare products easily", "Ask about reviews"].map((tip) => (
                  <li key={tip} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="new" className="h-5 w-5 p-0 text-[10px]">›</Badge>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
      <FloatingChatButton />
    </div>
  );
}
