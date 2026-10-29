"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Filter, Search, SlidersHorizontal, Star, X } from "lucide-react";
import { MainLayout } from "@/components/layout/main-layout";
import { ProductCard } from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { allProducts, categories } from "@/data/mock";
import { cn } from "@/lib/utils";

const ITEMS_PER_PAGE = 8;
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated", "Newest"];

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(1500);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("Featured");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const toggleCategory = (name: string) => {
    setSelectedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
    setPage(1);
  };

  const filtered = useMemo(() => {
    let result = [...allProducts];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.some((c) => p.category.toLowerCase().includes(c.toLowerCase().split(" ")[0]))
      );
    }

    result = result.filter((p) => p.price <= priceRange && p.rating >= minRating);

    switch (sortBy) {
      case "Price: Low to High":
        result.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "Top Rated":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Newest":
        result.reverse();
        break;
    }

    return result;
  }, [search, selectedCategories, priceRange, minRating, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-black">All Products</h1>
        <p className="mt-1 text-muted-foreground">
          Browse {allProducts.length}+ products with AI-powered search and smart filters
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <aside className={cn("glass-card h-fit p-5 lg:sticky lg:top-4", showFilters ? "block" : "hidden lg:block")}>
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-semibold">
              <Filter className="h-4 w-4 text-violet-400" /> Filters
            </h2>
            <button className="lg:hidden" onClick={() => setShowFilters(false)}>
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium">Categories</h3>
            <div className="mt-3 space-y-2">
              {categories.slice(0, 8).map((cat) => (
                <label key={cat.name} className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.name)}
                    onChange={() => toggleCategory(cat.name)}
                    className="h-4 w-4 rounded border-white/20 accent-violet-500"
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium">Max Price</h3>
              <span className="text-sm text-violet-400">${priceRange}</span>
            </div>
            <input
              type="range"
              min={50}
              max={1500}
              step={50}
              value={priceRange}
              onChange={(e) => { setPriceRange(Number(e.target.value)); setPage(1); }}
              className="mt-3 w-full accent-violet-500"
            />
            <div className="mt-1 flex justify-between text-xs text-muted-foreground">
              <span>$50</span>
              <span>$1,500</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium">Minimum Rating</h3>
            <div className="mt-3 flex gap-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => { setMinRating(rating); setPage(1); }}
                  className={cn(
                    "flex items-center gap-1 rounded-xl border px-3 py-1.5 text-xs transition",
                    minRating === rating
                      ? "border-violet-500/50 bg-violet-500/10 text-violet-300"
                      : "border-white/10 bg-white/5 text-muted-foreground hover:bg-white/10"
                  )}
                >
                  {rating === 0 ? "All" : (
                    <>
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      {rating}+
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          <Button
            variant="secondary"
            className="mt-6 w-full"
            onClick={() => {
              setSelectedCategories([]);
              setPriceRange(1500);
              setMinRating(0);
              setSearch("");
              setPage(1);
            }}
          >
            Clear All Filters
          </Button>
        </aside>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-11"
                placeholder="Search products..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm outline-none focus:border-violet-500/50"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-[#111827]">{opt}</option>
              ))}
            </select>
            <Button variant="secondary" className="gap-2 lg:hidden" onClick={() => setShowFilters(true)}>
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
          </div>

          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((cat) => (
                <Badge key={cat} variant="secondary" className="cursor-pointer gap-1" onClick={() => toggleCategory(cat)}>
                  {cat} <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}

          <p className="text-sm text-muted-foreground">
            Showing {paginated.length} of {filtered.length} products
          </p>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {paginated.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="glass-card py-16 text-center">
              <p className="text-lg font-semibold">No products found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Button variant="secondary" size="icon" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <Button
                  key={p}
                  variant={p === page ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setPage(p)}
                  className="min-w-[40px]"
                >
                  {p}
                </Button>
              ))}
              <Button variant="secondary" size="icon" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
