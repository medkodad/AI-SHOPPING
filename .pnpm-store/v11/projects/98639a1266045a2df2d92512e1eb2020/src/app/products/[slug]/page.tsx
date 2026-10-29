"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bot,
  ChevronRight,
  GitCompare,
  Heart,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
  RotateCcw,
} from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { allProducts } from "@/data/mock";
import { formatPrice, cn } from "@/lib/utils";

const productSpecs: Record<string, { label: string; value: string }[]> = {
  default: [
    { label: "Brand", value: "Premium" },
    { label: "Warranty", value: "1 Year Manufacturer" },
    { label: "Condition", value: "Brand New" },
    { label: "Shipping", value: "Free 2-Day Delivery" },
  ],
};

const productReviews = [
  { author: "Alex P.", rating: 5, date: "Jun 20, 2026", text: "Absolutely love this product! Exceeded my expectations in every way." },
  { author: "Maria L.", rating: 4, date: "Jun 15, 2026", text: "Great quality and fast shipping. Would recommend to anyone looking for value." },
  { author: "David W.", rating: 5, date: "Jun 10, 2026", text: "The AI comparison helped me choose this over competitors. No regrets!" },
];

export default function ProductDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = allProducts.find((p) => p.id === slug) ?? allProducts[0];
  const related = allProducts.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fallbackRelated = allProducts.filter((p) => p.id !== product.id).slice(0, 4);
  const relatedProducts = related.length > 0 ? related : fallbackRelated;

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  const images = [
    product.imageUrl,
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?auto=format&fit=crop&w=1200&q=80",
  ];
  const specs = productSpecs.default;
  const discount = "discount" in product ? product.discount : undefined;
  const originalPrice = "originalPrice" in product ? product.originalPrice : undefined;

  return (
    <MainLayout>
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("relative aspect-square overflow-hidden rounded-[20px] bg-gradient-to-br", product.gradient)}
          >
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </motion.div>
          <div className="grid grid-cols-4 gap-3">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-xl transition ring-2 ring-offset-2 ring-offset-[#0B1120]",
                  selectedImage === i ? "ring-violet-500" : "ring-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={src} alt={`${product.name} ${i + 1}`} fill sizes="25vw" className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            {discount && <Badge variant="destructive" className="mb-3">-{discount}% OFF</Badge>}
            <h1 className="text-3xl font-black lg:text-4xl">{product.name}</h1>
            <p className="mt-1 text-muted-foreground">{product.category}</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.floor(product.rating) ? "fill-amber-400" : "text-white/20")} />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-violet-300">{formatPrice(product.price)}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>

          <div className="glass-card p-4">
            <div className="flex items-start gap-3">
              <Bot className="mt-0.5 h-5 w-5 shrink-0 text-violet-400" />
              <div>
                <p className="text-sm font-semibold text-violet-300">AI Summary</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Based on {product.reviews} reviews, customers love the quality and value. Best for users seeking
                  premium {product.category.toLowerCase()} with excellent ratings. Recommended by 94% of AI-analyzed buyers.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-2xl border border-white/10 bg-white/5">
              <button className="p-3 hover:bg-white/5" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-semibold">{quantity}</span>
              <button className="p-3 hover:bg-white/5" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Link href="/cart" className="flex-1">
              <Button className="w-full" size="lg">
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
            </Link>
          </div>

          <div className="flex gap-3">
            <Button
              variant={wishlisted ? "default" : "secondary"}
              className="flex-1 gap-2"
              onClick={() => setWishlisted(!wishlisted)}
            >
              <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
              {wishlisted ? "Wishlisted" : "Add to Wishlist"}
            </Button>
            <Link href="/compare" className="flex-1">
              <Button variant="secondary" className="w-full gap-2">
                <GitCompare className="h-4 w-4" /> Compare
              </Button>
            </Link>
            <Button variant="secondary" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { icon: Truck, text: "Free 2-Day Shipping" },
              { icon: ShieldCheck, text: "2-Year Warranty" },
              { icon: RotateCcw, text: "30-Day Returns" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 p-3 text-xs">
                <Icon className="h-4 w-4 text-violet-400" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="mt-12">
        <Tabs defaultValue="specs">
          <TabsList>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            <TabsTrigger value="ai">AI Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="specs">
            <div className="glass-card p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex justify-between border-b border-white/8 pb-3">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
                <div className="flex justify-between border-b border-white/8 pb-3">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                <div className="flex justify-between border-b border-white/8 pb-3">
                  <span className="text-muted-foreground">Rating</span>
                  <span className="font-medium">{product.rating} / 5</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <div className="space-y-4">
              {productReviews.map((review) => (
                <div key={review.author} className="glass-card p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{review.text}</p>
                </div>
              ))}
              <Link href="/reviews/analysis">
                <Button variant="outline" className="gap-2">
                  <Bot className="h-4 w-4" /> View AI Review Analysis
                </Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="ai">
            <div className="glass-card p-6">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-violet-400" />
                <h3 className="font-semibold">AI Product Analysis</h3>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm font-semibold text-emerald-400">Pros</h4>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Excellent build quality and performance</li>
                    <li>• Great value for the price range</li>
                    <li>• Highly rated by verified buyers</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-400">Cons</h4>
                  <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                    <li>• Limited color options available</li>
                    <li>• Accessories sold separately</li>
                  </ul>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Sentiment score: <span className="font-semibold text-emerald-400">92% Positive</span> based on {product.reviews} reviews
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
