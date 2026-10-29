"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Check,
  Globe,
  LockKeyhole,
  Mail,
  PackageSearch,
  ScanSearch,
  ShieldCheck,
  ShoppingBag,
  User,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/components/theme-toggle";

const benefits: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Bot, title: "AI Shopping Assistant", text: "Ask anything, find everything." },
  { icon: ScanSearch, title: "Smart Recommendations", text: "Personalized for your needs." },
  { icon: WalletCards, title: "Product Comparison", text: "Compare and choose the best." },
  { icon: PackageSearch, title: "Order Tracking", text: "Track your orders in real-time." },
];

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score += 25;
  if (/[A-Z]/.test(password)) score += 25;
  if (/[0-9]/.test(password)) score += 25;
  if (/[^A-Za-z0-9]/.test(password)) score += 25;
  const label =
    score <= 25 ? "Weak" : score <= 50 ? "Fair" : score <= 75 ? "Good" : "Strong";
  const color =
    score <= 25 ? "text-red-400" : score <= 50 ? "text-amber-400" : score <= 75 ? "text-blue-400" : "text-emerald-400";
  return { score, label, color };
}

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const strength = useMemo(() => getPasswordStrength(password), [password]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#0B1120]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.15),transparent_30%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[1fr_1fr]">
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
              Join the Future of
              <span className="block gradient-text">Smart Shopping</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Create your free account and unlock AI-powered recommendations, smart comparisons, and personalized deals.
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
            <div className="text-[120px] leading-none">✨</div>
          </motion.div>
        </section>

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
                <h2 className="text-3xl font-black">Create Account 🚀</h2>
                <p className="mt-2 text-muted-foreground">Start your AI-powered shopping journey today</p>
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

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="mb-2 block text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-11" placeholder="Enter your full name" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input className="pl-11" placeholder="Enter your email" type="email" />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Password</label>
                  <div className="relative">
                    <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      className="pl-11"
                      placeholder="Create a strong password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-3 space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Password strength</span>
                        <span className={strength.color}>{strength.label}</span>
                      </div>
                      <Progress value={strength.score} />
                      <ul className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                        {[
                          { check: password.length >= 8, text: "8+ characters" },
                          { check: /[A-Z]/.test(password), text: "Uppercase letter" },
                          { check: /[0-9]/.test(password), text: "Number" },
                          { check: /[^A-Za-z0-9]/.test(password), text: "Special character" },
                        ].map((rule) => (
                          <li key={rule.text} className={`flex items-center gap-1 ${rule.check ? "text-emerald-400" : ""}`}>
                            <Check className={`h-3 w-3 ${rule.check ? "opacity-100" : "opacity-30"}`} />
                            {rule.text}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded border-white/20 accent-violet-500"
                  />
                  <span className="text-muted-foreground">
                    I agree to the{" "}
                    <Link href="/settings" className="text-violet-400 hover:text-violet-300">Terms of Service</Link>
                    {" "}and{" "}
                    <Link href="/settings" className="text-violet-400 hover:text-violet-300">Privacy Policy</Link>
                  </span>
                </label>
                <Link href="/">
                  <Button className="w-full" size="lg" disabled={!termsAccepted}>
                    Create Account <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </form>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-violet-400 hover:text-violet-300">
                  Sign in
                </Link>
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                Your data is protected with enterprise-grade encryption
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </main>
  );
}
