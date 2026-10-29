"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { quickPrompts } from "@/data/mock";

export function AIChatWidget({ compact = false }: { compact?: boolean }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">AI Shopping Assistant</h3>
        <span className="flex items-center gap-2 text-xs text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Online
        </span>
      </div>

      <div className="mt-4 rounded-2xl bg-white/5 p-4 text-sm text-muted-foreground">
        <div className="flex items-start gap-2">
          <Bot className="mt-0.5 h-4 w-4 shrink-0 text-violet-400" />
          <p>Hi John! I&apos;m your AI shopping assistant. How can I help you today?</p>
        </div>
      </div>

      {!compact && (
        <div className="mt-3 space-y-2">
          {quickPrompts.map((prompt) => (
            <Link
              key={prompt}
              href="/assistant"
              className="block w-full rounded-full border border-violet-500/20 bg-violet-500/5 px-4 py-2.5 text-left text-xs text-violet-300 transition hover:bg-violet-500/10"
            >
              {prompt}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-4 flex gap-2">
        <Input placeholder="Ask me anything..." className="h-10 text-sm" />
        <Button size="icon" className="h-10 w-10 shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[20px] border border-white/8 bg-gradient-to-br from-[#0B1120] via-[#111827] to-[#1a1040] p-6 lg:p-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(124,58,237,0.2),transparent_50%)]" />
      <div className="relative grid items-center gap-8 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-300">
            <Sparkles className="h-3.5 w-3.5" />
            AI-Powered Shopping Experience
          </div>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            AI-Powered
            <span className="block gradient-text">Shopping Experience</span>
          </h1>
          <p className="mt-4 max-w-lg text-base text-muted-foreground">
            Find the best products, compare options, get personalized recommendations and shop smarter with our AI Assistant.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/products">
              <Button size="lg">
                Shop Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/assistant">
              <Button variant="outline" size="lg">
                <Bot className="h-4 w-4" /> Chat with AI Assistant
              </Button>
            </Link>
          </div>
          <div className="mt-6 flex gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-1.5 w-6 rounded-full ${i === 0 ? "bg-violet-500" : "bg-white/20"}`} />
            ))}
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="absolute inset-0 rounded-full bg-violet-500/10 blur-3xl" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <div className="flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-white/10">
              <div className="text-8xl">🤖</div>
            </div>
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
              className="absolute -right-4 top-8 text-4xl"
            >
              🎧
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
              className="absolute -left-4 bottom-12 text-4xl"
            >
              💻
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.3 }}
              className="absolute right-8 bottom-4 text-3xl"
            >
              🛍️
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
