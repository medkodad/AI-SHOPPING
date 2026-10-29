import { MainLayout } from "@/components/layout/main-layout";
import { CategorySidebar } from "@/components/layout/sidebar";
import { ProductCard } from "@/components/shared/product-card";
import { allProducts, categories } from "@/data/mock";
import { Laptop, Shirt, Smartphone, Zap } from "lucide-react";

const categoryIcons = [Zap, Laptop, Smartphone, Shirt];

export default function CategoriesPage() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-black">All Categories</h1>
        <p className="mt-2 text-muted-foreground">Browse products by category</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categories.map((cat, i) => {
          const Icon = categoryIcons[i % categoryIcons.length];
          return (
            <a
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="glass-card group flex flex-col items-center gap-3 p-6 transition hover:border-violet-500/30 hover:shadow-glow"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-violet-500/15 text-violet-400 transition group-hover:gradient-primary group-hover:text-white">
                <Icon className="h-7 w-7" />
              </div>
              <span className="text-center text-sm font-medium">{cat.name}</span>
            </a>
          );
        })}
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Popular Products</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {allProducts.slice(0, 8).map((p) => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      </section>
    </MainLayout>
  );
}
