import Link from "next/link";
import { MainLayout, PageContainer } from "@/components/layout/main-layout";
import { CategorySidebar } from "@/components/layout/sidebar";
import { HeroSection } from "@/components/shared/hero";
import { FeatureBar } from "@/components/shared/feature-bar";
import { ProductCard } from "@/components/shared/product-card";
import { CountdownTimer } from "@/components/shared/countdown";
import { AIChatWidget } from "@/components/shared/hero";
import { RightSidebar } from "@/components/shared/right-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { flashDeals, recommendedProducts } from "@/data/mock";

export default function HomePage() {
  return (
    <MainLayout>
      <PageContainer>
        <CategorySidebar />

        <div className="space-y-6">
          <HeroSection />
          <FeatureBar />

          <section className="glass-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">Flash Deals</h2>
                <CountdownTimer />
              </div>
              <Link href="/products?filter=deals" className="text-sm font-semibold text-violet-400 hover:text-violet-300">
                View All Deals
              </Link>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {flashDeals.map((product) => (
                <ProductCard key={product.id} {...product} variant="flash" />
              ))}
            </div>
          </section>

          <section className="glass-card p-5">
            <Tabs defaultValue="for-you">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-bold">Recommended For You</h2>
                <TabsList>
                  <TabsTrigger value="for-you">For You</TabsTrigger>
                  <TabsTrigger value="bestsellers">Best Sellers</TabsTrigger>
                  <TabsTrigger value="new">New Arrivals</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="for-you">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {recommendedProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="bestsellers">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[...recommendedProducts].reverse().map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="new">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {flashDeals.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="trending">
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {[...flashDeals, ...recommendedProducts].slice(0, 4).map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>
        </div>

        <aside className="space-y-4">
          <AIChatWidget />
          <RightSidebar />
        </aside>
      </PageContainer>
    </MainLayout>
  );
}
