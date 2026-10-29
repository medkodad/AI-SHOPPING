"use client";

import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function AdminNavbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/[0.06] bg-[#0B1120]/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search orders, products, customers..." className="w-72 pl-10 lg:w-96" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="success" className="hidden sm:inline-flex">
          All systems nominal
        </Badge>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500" />
        </Button>
        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl gradient-primary text-xs font-bold text-white">
            AD
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-[11px] text-muted-foreground">admin@shopai.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}
