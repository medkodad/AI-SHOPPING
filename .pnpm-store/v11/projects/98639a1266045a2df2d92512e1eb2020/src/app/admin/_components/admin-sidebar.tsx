"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Archive,
  BarChart3,
  Bot,
  Boxes,
  ChevronLeft,
  ChevronRight,
  Database,
  FileText,
  FolderTree,
  LayoutDashboard,
  MessageSquare,
  Package,
  ScrollText,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Sparkles,
  Tag,
  Ticket,
  UserCircle2,
  Users,
  Warehouse,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: FolderTree },
  { label: "Brands", href: "/admin/brands", icon: Tag },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Reviews", href: "/admin/reviews", icon: MessageSquare },
  { label: "Coupons", href: "/admin/coupons", icon: Ticket },
  { label: "Inventory", href: "/admin/inventory", icon: Warehouse },
  { label: "Users", href: "/admin/users", icon: UserCircle2 },
  { label: "Roles", href: "/admin/roles", icon: Shield },
  { label: "AI Agents", href: "/admin/ai-agents", icon: Bot },
  { label: "AI Logs", href: "/admin/ai-logs", icon: Sparkles },
  { label: "Search Analytics", href: "/admin/search-analytics", icon: Search },
  { label: "Reports", href: "/admin/reports", icon: FileText },
  { label: "Settings", href: "/admin/settings", icon: Settings },
  { label: "System Logs", href: "/admin/system-logs", icon: ScrollText },
  { label: "Backup", href: "/admin/backup", icon: Database },
  { label: "Profile", href: "/admin/profile", icon: UserCircle2 },
];

export function AdminSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/[0.06] bg-[#0B1120]/95 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[260px]"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-lg shadow-violet-500/20">
              <Boxes className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">ShopAI</p>
              <p className="text-[10px] uppercase tracking-widest text-violet-400/70">Admin</p>
            </div>
          </motion.div>
        )}
        <button
          onClick={onToggle}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-muted-foreground transition hover:bg-white/10 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <Separator />

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <motion.li
                key={item.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
              >
                <Link
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                    active
                      ? "gradient-primary text-white shadow-md shadow-violet-500/20"
                      : "text-muted-foreground hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon className={cn("h-4 w-4 shrink-0", active ? "text-white" : "text-violet-400/70 group-hover:text-violet-300")} />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="border-t border-white/[0.06] p-4">
          <div className="glass-card rounded-xl p-3">
            <div className="flex items-center gap-2">
              <Archive className="h-4 w-4 text-violet-400" />
              <p className="text-xs font-medium text-white">Storage</p>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div className="h-1.5 w-[68%] rounded-full gradient-primary" />
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground">68% of 50 GB used</p>
          </div>
        </div>
      )}
    </aside>
  );
}
