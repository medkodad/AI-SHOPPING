"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AdminSidebar } from "./_components/admin-sidebar";
import { AdminNavbar } from "./_components/admin-navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0B1120] text-foreground">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((prev) => !prev)}
      />

      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          "min-h-screen transition-all duration-300",
          sidebarCollapsed ? "lg:pl-[72px]" : "lg:pl-[260px]"
        )}
      >
        <AdminNavbar onMenuClick={() => setMobileOpen((prev) => !prev)} />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
