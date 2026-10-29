import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Bot,
  Boxes,
  ChevronRight,
  LayoutDashboard,
  PackageSearch,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  UserCircle2,
  WandSparkles,
} from "lucide-react";

type Stat = {
  label: string;
  value: string;
  delta: string;
};

type Card = {
  title: string;
  price: string;
  meta: string;
  icon: LucideIcon;
};

type Item = {
  name: string;
  category: string;
  price: string;
  stock: string;
  status: string;
};

const features = [
  { label: "AI Shopping Assistant", icon: WandSparkles },
  { label: "Smart Search", icon: PackageSearch },
  { label: "Product Comparison", icon: Boxes },
  { label: "Order Tracking", icon: ReceiptText },
  { label: "Review Analysis", icon: Sparkles },
  { label: "Personalized Recommendations", icon: Bot },
];

export function ShellHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <header className="mx-auto max-w-[1600px] px-4 pt-4 sm:px-6 lg:px-8">
      <div className="rounded-[28px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-200/70">AI Commerce</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
              {title} <span className="text-violet-300">SHOPPING AGENT</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-300 sm:text-base">{subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.label}
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-2 text-sm text-slate-100 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]"
                >
                  <Icon className="h-4 w-4 text-violet-300" />
                  <span>{feature.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}

export function SidePanel({
  title,
  items,
  variant = "client",
}: {
  title: string;
  items: Array<{ label: string; description: string; icon: LucideIcon }>;
  variant?: "client" | "admin";
}) {
  return (
    <aside className="rounded-[28px] border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
      <div className={`rounded-2xl px-4 py-3 text-lg font-semibold ${variant === "admin" ? "bg-sky-500/20 text-sky-100" : "bg-violet-500/20 text-violet-100"}`}>
        {title}
      </div>
      <div className="mt-4 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-2xl border border-white/8 bg-slate-950/55 px-4 py-3 transition hover:border-white/15 hover:bg-white/8"
            >
              <div className="rounded-2xl bg-violet-500/20 p-2 text-violet-200">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{item.label}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

function SectionTitle({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-base font-semibold text-white">{title}</h2>
      {action ? <span className="text-xs uppercase tracking-[0.3em] text-violet-200/70">{action}</span> : null}
    </div>
  );
}

export function ClientDashboard() {
  const recommendationCards: Card[] = [
    { title: "MacBook Air M2", price: "$1,199", meta: "4.9 | 320 reviews", icon: LayoutDashboard },
    { title: "Sony WH-1000XM5", price: "$349", meta: "4.8 | 180 reviews", icon: Bot },
    { title: "Nike Air Zoom", price: "$129", meta: "4.7 | 120 reviews", icon: Sparkles },
    { title: "iPhone 15 Pro", price: "$999", meta: "4.9 | 310 reviews", icon: UserCircle2 },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[290px_minmax(0,1fr)_390px]">
      <SidePanel
        title="CLIENT SIDE"
        items={[
          { label: "AI Shopping Assistant", description: "Chat with AI to find products", icon: WandSparkles },
          { label: "Smart Search", description: "Search naturally, get perfect results", icon: PackageSearch },
          { label: "Product Comparison", description: "Compare specs and prices", icon: Boxes },
          { label: "Order Tracking", description: "Track orders in real time", icon: ReceiptText },
          { label: "Review Analysis", description: "Understand what people think", icon: Sparkles },
          { label: "Personalized Recommendations", description: "Products tailored for you", icon: Bot },
        ]}
      />

      <main className="space-y-6">
        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-white/95 via-white/92 to-violet-100/90 p-6 text-slate-900 shadow-[0_30px_80px_rgba(12,18,45,0.45)]">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-violet-600/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-violet-700">
                <WandSparkles className="h-4 w-4" />
                AI-Powered Shopping Experience
              </div>
              <h2 className="mt-5 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Smarter shopping
                <span className="block text-violet-600">with one AI assistant</span>
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Discover products, compare options, read reviews, and track every order from a sleek client cockpit inspired by the design you shared.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/assistant" className="inline-flex items-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25">
                  Open AI Assistant
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/products" className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800">
                  Browse Products
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.18),_transparent_62%),linear-gradient(145deg,#0f172a_0%,#1e1b4b_100%)] p-6 text-white">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.09),transparent_35%,transparent_65%,rgba(255,255,255,0.06))]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-violet-100">ShopAI</span>
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-200">Connected</span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    ["Search intent", "95%"],
                    ["Match confidence", "92%"],
                    ["Review trust", "4.9/5"],
                    ["Delivery speed", "1-2 days"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/8 p-4">
                      <p className="text-xs text-slate-300">{label}</p>
                      <p className="mt-2 text-2xl font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            ["Smart Search", "Find exactly what you need"],
            ["Best Prices", "Compare and save money"],
            ["Secure Shopping", "100% secure payments"],
            ["Fast Delivery", "Quick and reliable shipping"],
          ].map(([title, description]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            </div>
          ))}
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <SectionTitle title="Recommended for you" action="View all" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {recommendationCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="rounded-3xl border border-white/10 bg-slate-950/65 p-4">
                  <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/10 p-6">
                    <Icon className="h-10 w-10 text-violet-200" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-white">{card.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{card.price}</p>
                  <p className="mt-1 text-xs text-slate-500">{card.meta}</p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <aside className="space-y-6">
        <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <SectionTitle title="AI Shopping Assistant" />
          <div className="mt-4 space-y-3">
            <div className="ml-auto w-fit rounded-2xl bg-violet-600 px-4 py-3 text-sm font-medium text-white">
              I need a gaming laptop under $1200
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-200">
              Sure. Here are three strong options based on performance, battery, and cooling.
            </div>
          </div>
          <div className="mt-4 grid gap-3">
            {["ASUS ROG Strix G16", "Acer Predator Helios", "Lenovo Legion 5"].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-white">{item}</p>
                  <p className="text-xs text-slate-400">${[1099, 1149, 999][index]}</p>
                </div>
                <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-200">{[4.7, 4.6, 4.8][index]}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <SectionTitle title="Order Tracking" />
          <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-sm text-slate-300">Order #ORD123456</p>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <span>Placed</span>
              <span>Confirmed</span>
              <span className="text-cyan-200">Shipped</span>
              <span>Out for Delivery</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-slate-800">
              <div className="h-2 w-3/5 rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400" />
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}

export function AdminDashboard() {
  const stats: Stat[] = [
    { label: "Total Sales", value: "$95,430", delta: "+12.5%" },
    { label: "Orders", value: "1,245", delta: "+8.3%" },
    { label: "Customers", value: "8,429", delta: "+15.7%" },
    { label: "Products", value: "2,340", delta: "+7.1%" },
  ];

  const rows: Item[] = [
    { name: "iPhone 15 Pro", category: "Electronics", price: "$999", stock: "45", status: "Active" },
    { name: "MacBook Air M2", category: "Electronics", price: "$1,199", stock: "30", status: "Active" },
    { name: "Sony WH-1000XM5", category: "Electronics", price: "$349", stock: "25", status: "Active" },
    { name: "Nike Air Zoom", category: "Fashion", price: "$129", stock: "60", status: "Active" },
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[290px_minmax(0,1fr)_360px]">
      <SidePanel
        title="ADMIN SIDE"
        variant="admin"
        items={[
          { label: "Dashboard Overview", description: "Key metrics and analytics", icon: LayoutDashboard },
          { label: "Manage Products", description: "Add, edit, organize products", icon: Boxes },
          { label: "Manage Orders", description: "Track and manage all orders", icon: ReceiptText },
          { label: "Customers", description: "Manage customers and data", icon: UserCircle2 },
          { label: "Reports & Analytics", description: "Sales, traffic, and performance", icon: Sparkles },
          { label: "AI System Logs", description: "Monitor AI agents and activities", icon: ShieldCheck },
        ]}
      />

      <main className="space-y-6">
        <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-violet-200/70">Admin Console</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Dashboard Overview</h2>
            </div>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">All systems nominal</span>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-3xl border border-white/10 bg-slate-950/65 p-4">
                <p className="text-sm text-slate-400">{stat.label}</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-200">{stat.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <SectionTitle title="Sales Overview" action="7 days" />
            <div className="mt-6 grid grid-cols-7 gap-3 items-end">
              {[42, 31, 38, 54, 28, 61, 47].map((value, index) => (
                <div key={index} className="flex h-40 items-end">
                  <div
                    className="w-full rounded-t-2xl bg-gradient-to-t from-cyan-400 via-violet-400 to-fuchsia-300"
                    style={{ height: `${value}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
            <SectionTitle title="Top Categories" />
            <div className="mt-6 space-y-4">
              {[
                ["Electronics", "45%"],
                ["Fashion", "25%"],
                ["Home", "15%"],
                ["Beauty", "10%"],
                ["Others", "5%"],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="h-2 flex-1 rounded-full bg-slate-800">
                    <div className="h-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: value }} />
                  </div>
                  <span className="w-24 text-right text-sm text-slate-300">{label}</span>
                  <span className="w-10 text-right text-xs text-slate-500">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <SectionTitle title="Manage Products" action="Live table" />
          <div className="mt-4 overflow-hidden rounded-3xl border border-white/10">
            <table className="min-w-full divide-y divide-white/10 text-left text-sm">
              <thead className="bg-slate-950/70 text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/8 bg-slate-950/45 text-slate-200">
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td className="px-4 py-3 font-medium text-white">{row.name}</td>
                    <td className="px-4 py-3">{row.category}</td>
                    <td className="px-4 py-3">{row.price}</td>
                    <td className="px-4 py-3">{row.stock}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-200">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <aside className="space-y-6">
        <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <SectionTitle title="AI Agents Monitor" />
          <div className="mt-4 space-y-3">
            {["Shopping Assistant", "Recommendation Agent", "Search Agent", "Review Analysis Agent", "Order Tracking Agent"].map((agent) => (
              <div key={agent} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                <span className="text-sm text-white">{agent}</span>
                <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-xs text-emerald-200">Online</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <SectionTitle title="Recent Orders" />
          <div className="mt-4 space-y-3">
            {[
              ["#ORD123456", "John Doe", "Shipped"],
              ["#ORD123455", "Jane Smith", "Confirmed"],
              ["#ORD123454", "Mike Johnson", "Processing"],
              ["#ORD123453", "Sarah Wilson", "Delivered"],
            ].map(([id, customer, status]) => (
              <div key={id} className="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">{id}</p>
                  <span className="text-xs text-slate-400">{status}</span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{customer}</p>
              </div>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

export function LoginHero() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="rounded-[32px] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-violet-100">
          <ShieldCheck className="h-4 w-4" />
          Secure access
        </div>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Welcome to <span className="text-violet-300">ShopAI</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">
          A polished entry point for customers and admins, designed to match the same dark premium style as the dashboard.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["Fast login", "1 tap sign in"],
            ["Role aware", "Client or admin"],
            ["Protected", "Secure session flow"],
          ].map(([title, description]) => (
            <div key={title} className="rounded-3xl border border-white/10 bg-slate-950/55 p-4">
              <p className="text-sm font-semibold text-white">{title}</p>
              <p className="mt-1 text-sm text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[32px] border border-white/10 bg-white p-6 text-slate-900 shadow-[0_30px_90px_rgba(10,14,32,0.45)]">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-violet-600">Login</p>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">ShopAI</span>
        </div>
        <div className="mt-8 space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Email</span>
            <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-violet-400" placeholder="name@company.com" />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">Password</span>
            <input type="password" className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none ring-0 placeholder:text-slate-400 focus:border-violet-400" placeholder="Enter your password" />
          </label>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded border-slate-300 text-violet-600 focus:ring-violet-500" />
              Remember me
            </label>
            <Link href="/" className="font-medium text-violet-600">Forgot password?</Link>
          </div>
          <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-4 py-3 font-semibold text-white shadow-lg shadow-violet-500/25">
            Sign in to dashboard
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </div>
  );
}
