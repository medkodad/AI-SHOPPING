"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice, cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews?: number;
  gradient?: string;
  imageUrl?: string;
  variant?: "default" | "flash" | "compact";
}

export function ProductCard({
  id,
  name,
  category,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  gradient = "from-slate-800 via-purple-900 to-violet-800",
  imageUrl,
  variant = "default",
}: ProductCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="group glass-card overflow-hidden"
    >
      <Link href={`/products/${id}`} className="block">
        <div className="relative">
          {discount && (
            <Badge variant="destructive" className="absolute left-3 top-3 z-10">
              -{discount}%
            </Badge>
          )}
          <div className={cn("relative aspect-[4/3] overflow-hidden bg-gradient-to-br", gradient)}>
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-4xl opacity-30 transition group-hover:opacity-50">
                📦
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          </div>
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${id}`} className="block">
          <h3 className="font-semibold leading-tight">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{category}</p>
        </Link>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-violet-300">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>
          <span className="flex items-center gap-1 text-sm text-amber-400">
            <Star className="h-3.5 w-3.5 fill-amber-400" />
            {rating}
            {reviews && <span className="text-muted-foreground">({reviews})</span>}
          </span>
        </div>

        {variant === "flash" && (
          <div className="mt-3">
            <Button className="w-full" size="sm">
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    </motion.article>
  );
}

interface ChatProductCardProps {
  name: string;
  specs: string[];
  price: number;
  rating: number;
  gradient?: string;
  imageUrl?: string;
}

export function ChatProductCard({ name, specs, price, rating, gradient = "from-slate-800 to-violet-900" }: ChatProductCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="min-w-[200px] shrink-0 overflow-hidden glass-card">
      <div className={cn("aspect-[4/3] bg-gradient-to-br", gradient)}>
        <div className="flex h-full items-center justify-center text-3xl opacity-40">💻</div>
      </div>
      <div className="p-3">
        <h4 className="text-sm font-semibold">{name}</h4>
        <div className="mt-1 flex items-center gap-1 text-xs text-amber-400">
          <Star className="h-3 w-3 fill-amber-400" /> {rating}
        </div>
        <ul className="mt-2 space-y-0.5">
          {specs.map((spec) => (
            <li key={spec} className="text-xs text-muted-foreground">
              • {spec}
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold">{formatPrice(price)}</p>
        <Button size="sm" className="mt-2 w-full text-xs">
          View Details
        </Button>
      </div>
    </motion.div>
  );
}
