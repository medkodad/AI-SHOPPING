"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, Globe, Mail, ShieldCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0B1120]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(79,70,229,0.15),transparent_30%)]" />
      <div className="relative flex min-h-screen items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-6 flex items-center justify-between">
            <Link href="/login" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" /> Back to login
            </Link>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button variant="secondary" size="sm" className="gap-2">
                <Globe className="h-4 w-4" /> EN
              </Button>
            </div>
          </div>

          <div className="glass-card p-8">
            <div className="flex flex-col items-center text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl gradient-primary">
                <ShoppingBag className="h-7 w-7 text-white" />
              </div>
              <h1 className="mt-4 text-3xl font-black">Reset Password</h1>
              <p className="mt-2 text-muted-foreground">
                Enter your email and we&apos;ll send you a link to reset your password
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-8 space-y-5"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label className="mb-2 block text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        className="pl-11"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <Button className="w-full" size="lg" type="submit">
                    Send Reset Link <ArrowRight className="h-4 w-4" />
                  </Button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-emerald-500/15"
                  >
                    <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                  </motion.div>
                  <h2 className="mt-6 text-xl font-bold">Check your inbox</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We&apos;ve sent a password reset link to{" "}
                    <span className="font-semibold text-foreground">{email}</span>
                  </p>
                  <p className="mt-4 text-xs text-muted-foreground">
                    Didn&apos;t receive the email? Check your spam folder or try again in a few minutes.
                  </p>
                  <div className="mt-6 flex flex-col gap-3">
                    <Button variant="secondary" onClick={() => setSubmitted(false)}>
                      Try another email
                    </Button>
                    <Link href="/login">
                      <Button className="w-full">Back to Sign In</Button>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4" />
              Secure password recovery protected by encryption
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
