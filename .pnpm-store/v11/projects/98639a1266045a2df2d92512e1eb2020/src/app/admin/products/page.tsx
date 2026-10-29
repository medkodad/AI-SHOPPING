"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Edit, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react";
import { adminProducts } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageHeader } from "../_components/page-header";

function statusVariant(status: string) {
  switch (status) {
    case "Active":
      return "success" as const;
    case "Low Stock":
      return "secondary" as const;
    case "Out of Stock":
      return "destructive" as const;
    default:
      return "outline" as const;
  }
}

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  const filtered = adminProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <PageHeader
        title="Products"
        description="Manage your product catalog, inventory, and pricing."
        action={
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        }
      />

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-6">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-sm flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  Filter
                </Button>
                <Button variant="secondary" size="sm">
                  Export
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-white/[0.06] bg-white/[0.02]">
                  <tr>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Product</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Category</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Brand</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Price</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Stock</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                    <th className="px-4 py-3 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filtered.map((product, i) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.04 }}
                      className="transition hover:bg-white/[0.02]"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-xs font-bold text-violet-300">
                            {product.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-white">{product.name}</p>
                            <p className="text-xs text-muted-foreground">{product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{product.category}</td>
                      <td className="px-4 py-3 text-muted-foreground">{product.brand}</td>
                      <td className="px-4 py-3 font-medium text-white">${product.price.toLocaleString()}</td>
                      <td className="px-4 py-3 text-muted-foreground">{product.stock}</td>
                      <td className="px-4 py-3">
                        <Badge variant={statusVariant(product.status)}>{product.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:text-red-300">
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>Showing {filtered.length} of {adminProducts.length} products</span>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="secondary" size="sm">
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
