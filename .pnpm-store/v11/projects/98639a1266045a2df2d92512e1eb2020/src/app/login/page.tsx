"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Globe,
  LockKeyhole,
  Mail,
  Moon,
  PackageSearch,
  ScanSearch,
  ShieldCheck,
  ShoppingBag,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Bot, title: "AI Shopping Assistant", text: "Ask anything, find everything." },
  { icon: ScanSearch, title: "Smart Recommendations", text: "Personalized for your needs." },
  { icon: WalletCards, title: "Product Comparison", text: "Compare and choose the best." },
  { icon: PackageSearch, title: "Order Tracking", text: "Track your orders in real-time." },
];

export default function LoginPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0B1120]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.15),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[1fr_1fr]">
        {/* Left - Marketing */}
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-white/8 p-8 lg:flex lg:p-12">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-transparent to-indigo-600/10" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl gradient-primary shadow-glow">
                <ShoppingBag className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-black">ShopAI</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Shopping</p>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10 max-w-lg"
          >
            <h2 className="text-5xl font-black leading-tight tracking-tight">
              Smart Shopping
              <span className="block gradient-text">Powered by AI</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Discover the best products, compare options, get personalized recommendations and shop smarter.
            </p>
            <div className="mt-10 space-y-6">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={b.title}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-500/15 text-violet-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{b.title}</h3>
                      <p className="text-sm text-muted-foreground">{b.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative z-10 flex justify-center"
          >
            <div className="text-[120px] leading-none">🤖</div>
          </motion.div>
        </section>

        {/* Right - Form */}
        <section className="flex items-center justify-center p-6 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="mb-6 flex items-center justify-end gap-3 lg:hidden">
              <ThemeToggle />
              <Button variant="secondary" size="sm" className="gap-2">
                <Globe className="h-4 w-4" /> EN
              </Button>
            </div>

            <div className="glass-card p-8">
              <div className="hidden items-center justify-end gap-3 lg:flex">
                <ThemeToggle />
                <Button variant="secondary" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" /> EN
                </Button>
              </div>

              <div className="mt-4 text-center lg:mt-0">
                <h2 className="text-3xl font-black">Welcome Back 👋</h2>
                <p className="mt-2 text-muted-foreground">Sign in to your account and continue shopping</p>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <Button variant="secondary" className="gap-2">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-black text-slate-900">G</span>
                  Google
                </Button>
                <Button variant="secondary" className="gap-2">
                  <span className="text-lg">&#63743;</span>
                  Apple
                </Button>
              </div>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-white/10" />
                <span className="text-sm text-muted-foreground">OR</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <form className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-11" placeholder="Enter your email" type="email" />
                  </div>
                </div>
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium">Password</label>
                    <Link href="/forgot-password" className="text-sm text-violet-400 hover:text-violet-300">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-11" placeholder="Enter your password" type="password" />
                  </div>
                </div>
                <label className="flex items-center gap-3 text-sm">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-white/20 accent-violet-500" />
                  Remember me
                </label>
                <Link href="/">
                  <Button className="w-full" size="lg">
                    Sign In <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="font-semibold text-violet-400 hover:text-violet-300">
                  Create account
                </Link>
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                Secure login protected by advanced encryption
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
