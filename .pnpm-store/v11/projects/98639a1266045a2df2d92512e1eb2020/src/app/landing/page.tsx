"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Quote, Send, Star, Sparkles } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { HeroSection } from "@/components/shared/hero";
import { FeatureBar } from "@/components/shared/feature-bar";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { flashDeals, recommendedProducts, whyShopWithUs } from "@/data/mock";

const reviews = [
  { name: "Sarah M.", role: "Verified Buyer", rating: 5, text: "The AI assistant helped me find the perfect laptop in minutes. Saved me hours of research!" },
  { name: "James K.", role: "Tech Enthusiast", rating: 5, text: "Product comparison feature is incredible. I finally understood the differences between models." },
  { name: "Emily R.", role: "Regular Shopper", rating: 4, text: "Fast delivery, great prices, and the recommendations are spot-on. My go-to shopping platform." },
  { name: "Michael T.", role: "Power User", rating: 5, text: "ShopAI's review analysis saved me from a bad purchase. The AI summary is genuinely helpful." },
];

export default function LandingPage() {
  return (
    <MainLayout>
      <div className="space-y-16">
        <HeroSection />
        <FeatureBar />

        <section>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-violet-400">Featured Products</p>
              <h2 className="mt-1 text-3xl font-black">Trending This Week</h2>
            </div>
            <Link href="/products">
              <Button variant="outline" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {flashDeals.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard {...product} variant="flash" />
              </motion.div>
            ))}
          </div>
        </section>

        <section className="glass-card p-8 lg:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold text-violet-300">
                <Bot className="h-3.5 w-3.5" />
                AI-Powered
              </div>
              <h2 className="mt-4 text-3xl font-black lg:text-4xl">
                Why Shop with <span className="gradient-text">ShopAI</span>?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Experience the next generation of online shopping with intelligent recommendations, smart comparisons, and personalized deals.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {whyShopWithUs.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border border-white/8 bg-white/5 p-5"
                >
                  <div className={`mb-3 h-1 w-8 rounded-full ${item.color}`} />
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-violet-400">Customer Reviews</p>
            <h2 className="mt-1 text-3xl font-black">Loved by Shoppers Worldwide</h2>
            <div className="mt-2 flex items-center justify-center gap-1 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 fill-amber-400" />
              ))}
              <span className="ml-2 text-sm text-muted-foreground">4.9 average from 12,000+ reviews</span>
            </div>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-5"
              >
                <Quote className="h-6 w-6 text-violet-400/50" />
                <p className="mt-3 text-sm text-muted-foreground">{review.text}</p>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="mt-3">
                  <p className="text-sm font-semibold">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="glass-card overflow-hidden p-8 lg:p-12">
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.1),transparent_70%)]" />
            <div className="relative">
              <h2 className="text-3xl font-black">New Arrivals</h2>
              <p className="mt-2 text-muted-foreground">Discover the latest products curated by our AI</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {recommendedProducts.slice(0, 2).map((product) => (
                  <ProductCard key={product.id} {...product} variant="compact" />
                ))}
              </div>
            </div>
            <div className="relative">
              <Sparkles className="h-8 w-8 text-violet-400" />
              <h2 className="mt-4 text-3xl font-black">
                Stay in the <span className="gradient-text">Loop</span>
              </h2>
              <p className="mt-2 text-muted-foreground">
                Get exclusive deals, AI-curated recommendations, and early access to flash sales.
              </p>
              <form className="mt-6 flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input placeholder="Enter your email" type="email" className="h-12" />
                <Button size="lg" className="shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
            </div>
          </div>
        </section>

        <section className="rounded-[20px] gradient-primary p-8 text-center lg:p-12">
          <h2 className="text-3xl font-black text-white lg:text-4xl">Ready to Shop Smarter?</h2>
          <p className="mx-auto mt-3 max-w-lg text-white/80">
            Join thousands of smart shoppers using AI to find the best products at the best prices.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-white text-slate-900 hover:bg-white/90">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/assistant">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <Bot className="h-4 w-4" /> Try AI Assistant
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
