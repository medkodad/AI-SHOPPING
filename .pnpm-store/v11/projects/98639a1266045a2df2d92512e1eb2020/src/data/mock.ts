export const categories = [
  { name: "Electronics", icon: "Zap" },
  { name: "Computers & Laptops", icon: "Laptop" },
  { name: "Phones & Tablets", icon: "Smartphone" },
  { name: "Home & Kitchen", icon: "Home" },
  { name: "Fashion", icon: "Shirt" },
  { name: "Beauty & Health", icon: "Heart" },
  { name: "Sports & Outdoors", icon: "Dumbbell" },
  { name: "Toys & Games", icon: "Gamepad2" },
  { name: "Automotive", icon: "Car" },
  { name: "Books & Stationery", icon: "BookOpen" },
];

export const navLinks = ["Home", "Categories", "Deals", "New Arrivals", "Best Sellers", "Brands"];

export const flashDeals = [
  { id: "1", name: "ASUS ROG Strix G16", category: "Gaming Laptop", price: 899.99, originalPrice: 1099.99, discount: 20, rating: 4.8, reviews: 320, gradient: "from-slate-900 via-purple-900 to-violet-800", imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80" },
  { id: "2", name: "iPhone 15 Pro", category: "Smartphone", price: 849.99, originalPrice: 999.99, discount: 15, rating: 4.7, reviews: 512, gradient: "from-zinc-900 via-slate-800 to-zinc-700", imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80" },
  { id: "3", name: "Apple Watch Series 9", category: "Smart Watch", price: 299.99, originalPrice: 399.99, discount: 25, rating: 4.6, reviews: 189, gradient: "from-rose-950 via-red-900 to-orange-900", imageUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1200&q=80" },
  { id: "4", name: "Sony WH-1000XM5", category: "Headphones", price: 279.99, originalPrice: 349.99, discount: 20, rating: 4.8, reviews: 445, gradient: "from-slate-900 via-blue-950 to-indigo-900", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80" },
];

export const recommendedProducts = [
  { id: "5", name: "MacBook Air M2", category: "Laptop", price: 1099, rating: 4.8, reviews: 256, gradient: "from-slate-200 via-violet-200 to-slate-800", imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80" },
  { id: "6", name: 'Samsung 65" QLED 4K', category: "Smart TV", price: 799, rating: 4.6, reviews: 178, gradient: "from-blue-100 via-indigo-200 to-slate-900", imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80" },
  { id: "7", name: "JBL Charge 5", category: "Speaker", price: 149.99, rating: 4.7, reviews: 312, gradient: "from-orange-100 via-amber-200 to-slate-800", imageUrl: "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1200&q=80" },
  { id: "8", name: "Canon EOS R10", category: "Camera", price: 979, rating: 4.6, reviews: 94, gradient: "from-gray-200 via-slate-300 to-zinc-800", imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80" },
];

export const allProducts = [
  ...flashDeals.map((p) => ({ ...p, brand: "Premium" })),
  ...recommendedProducts.map((p) => ({ ...p, brand: "Featured", originalPrice: p.price * 1.1, discount: 10 })),
  { id: "9", name: "Dell XPS 15", category: "Laptop", price: 1299, originalPrice: 1499, discount: 13, rating: 4.7, reviews: 203, brand: "Dell", gradient: "from-slate-800 to-blue-900", imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" },
  { id: "10", name: "Nike Air Zoom Pegasus", category: "Running Shoes", price: 129.99, originalPrice: 159.99, discount: 19, rating: 4.5, reviews: 567, brand: "Nike", gradient: "from-orange-900 to-red-900", imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80" },
  { id: "11", name: "Bose QuietComfort Ultra", category: "Headphones", price: 429, originalPrice: 499, discount: 14, rating: 4.9, reviews: 289, brand: "Bose", gradient: "from-zinc-800 to-slate-900", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80" },
  { id: "12", name: "LG OLED C3 55\"", category: "Smart TV", price: 1199, originalPrice: 1399, discount: 14, rating: 4.8, reviews: 156, brand: "LG", gradient: "from-purple-950 to-slate-900", imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1200&q=80" },
];

export const gamingLaptops = [
  { id: "g1", name: "ASUS TUF Gaming A15", specs: ["AMD Ryzen 7", "RTX 4060", "16GB RAM / 512GB SSD"], price: 899, rating: 4.6, gradient: "from-slate-800 to-violet-900", imageUrl: "https://images.unsplash.com/photo-1593640495398-5a4d0c65c35b?auto=format&fit=crop&w=1200&q=80" },
  { id: "g2", name: "Acer Nitro 5", specs: ["Intel i7-12650H", "RTX 4050", "16GB RAM / 512GB SSD"], price: 849, rating: 4.5, gradient: "from-red-950 to-slate-900", imageUrl: "https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=80" },
  { id: "g3", name: "Lenovo LOQ 15", specs: ["AMD Ryzen 5", "RTX 4050", "16GB RAM / 512GB SSD"], price: 799, rating: 4.4, gradient: "from-blue-950 to-slate-900", imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80" },
  { id: "g4", name: "HP Victus 16", specs: ["Intel i5-13420H", "RTX 3050", "16GB RAM / 512GB SSD"], price: 749, rating: 4.3, gradient: "from-indigo-950 to-slate-900", imageUrl: "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?auto=format&fit=crop&w=1200&q=80" },
];

export const chatHistory = [
  { id: "1", title: "Best gaming laptop under $1000", time: "2 min ago", active: true },
  { id: "2", title: "Wireless headphones for gym", time: "Yesterday", active: false },
  { id: "3", title: "Compare iPhone 15 vs S24", time: "Yesterday", active: false },
  { id: "4", title: "Best budget smart watch", time: "2 days ago", active: false },
];

export const quickPrompts = [
  "Find a gaming laptop under $1000",
  "Best running shoes for men",
  "Compare iPhone 15 vs Samsung S24",
  "Show me noise canceling headphones",
];

export const assistantPrompts = [
  { icon: "Laptop", text: "Find a laptop for gaming under $1000" },
  { icon: "Headphones", text: "Best wireless headphones for gym" },
  { icon: "Smartphone", text: "Compare iPhone 15 vs Samsung S24" },
  { icon: "Shirt", text: "Running shoes for marathon training" },
];

export const orders = [
  { id: "ORD123456", date: "Jun 25, 2026", total: 1299.99, status: "Shipped", items: 2 },
  { id: "ORD123455", date: "Jun 20, 2026", total: 349.99, status: "Delivered", items: 1 },
  { id: "ORD123454", date: "Jun 15, 2026", total: 899.99, status: "Processing", items: 1 },
  { id: "ORD123453", date: "Jun 10, 2026", total: 159.99, status: "Delivered", items: 3 },
];

export const adminStats = [
  { label: "Total Sales", value: "$95,430", delta: "+12.5%", trend: "up" },
  { label: "Orders", value: "1,245", delta: "+8.3%", trend: "up" },
  { label: "Customers", value: "8,429", delta: "+15.7%", trend: "up" },
  { label: "Products", value: "2,340", delta: "+7.1%", trend: "up" },
];

export const revenueChartData = [
  { month: "Jan", value: 62 },
  { month: "Feb", value: 48 },
  { month: "Mar", value: 71 },
  { month: "Apr", value: 55 },
  { month: "May", value: 84 },
  { month: "Jun", value: 92 },
  { month: "Jul", value: 78 },
];

export const salesChartData = [
  { day: "Mon", value: 42 },
  { day: "Tue", value: 31 },
  { day: "Wed", value: 38 },
  { day: "Thu", value: 54 },
  { day: "Fri", value: 28 },
  { day: "Sat", value: 61 },
  { day: "Sun", value: 47 },
];

export const adminCustomers = [
  { id: "C001", name: "John Doe", email: "john@example.com", orders: 12, spent: "$4,280", status: "Active" },
  { id: "C002", name: "Jane Smith", email: "jane@example.com", orders: 8, spent: "$2,150", status: "Active" },
  { id: "C003", name: "Mike Johnson", email: "mike@example.com", orders: 5, spent: "$980", status: "Active" },
  { id: "C004", name: "Sarah Wilson", email: "sarah@example.com", orders: 15, spent: "$6,420", status: "VIP" },
  { id: "C005", name: "Alex Chen", email: "alex@example.com", orders: 3, spent: "$540", status: "New" },
];

export const adminOrders = [
  { id: "ORD123456", customer: "John Doe", date: "Jun 25, 2026", total: 1299.99, status: "Shipped", items: 2 },
  { id: "ORD123455", customer: "Jane Smith", date: "Jun 20, 2026", total: 349.99, status: "Delivered", items: 1 },
  { id: "ORD123454", customer: "Mike Johnson", date: "Jun 15, 2026", total: 899.99, status: "Processing", items: 1 },
  { id: "ORD123453", customer: "Sarah Wilson", date: "Jun 10, 2026", total: 159.99, status: "Delivered", items: 3 },
  { id: "ORD123452", customer: "Alex Chen", date: "Jun 8, 2026", total: 549.99, status: "Confirmed", items: 2 },
];

export const adminProducts = [
  { id: "P001", name: "iPhone 15 Pro", category: "Electronics", price: 999, stock: 45, status: "Active", brand: "Apple" },
  { id: "P002", name: "MacBook Air M2", category: "Computers", price: 1099, stock: 30, status: "Active", brand: "Apple" },
  { id: "P003", name: "Sony WH-1000XM5", category: "Electronics", price: 349, stock: 25, status: "Active", brand: "Sony" },
  { id: "P004", name: "Nike Air Zoom", category: "Fashion", price: 129.99, stock: 60, status: "Active", brand: "Nike" },
  { id: "P005", name: "ASUS ROG Strix G16", category: "Gaming", price: 899.99, stock: 12, status: "Low Stock", brand: "ASUS" },
  { id: "P006", name: "Bose QuietComfort Ultra", category: "Electronics", price: 429, stock: 0, status: "Out of Stock", brand: "Bose" },
];

export const aiAgents = [
  { id: "agent-1", name: "Shopping Assistant", status: "Online", uptime: "99.9%", requests: 12450, latency: "120ms" },
  { id: "agent-2", name: "Recommendation Agent", status: "Online", uptime: "99.7%", requests: 8920, latency: "85ms" },
  { id: "agent-3", name: "Search Agent", status: "Online", uptime: "99.8%", requests: 15680, latency: "95ms" },
  { id: "agent-4", name: "Review Analysis Agent", status: "Degraded", uptime: "97.2%", requests: 4320, latency: "210ms" },
  { id: "agent-5", name: "Order Tracking Agent", status: "Online", uptime: "99.9%", requests: 6780, latency: "75ms" },
  { id: "agent-6", name: "Price Comparison Agent", status: "Offline", uptime: "0%", requests: 0, latency: "—" },
];

export const activityFeed = [
  { id: "1", action: "New order placed", detail: "ORD123456 by John Doe", time: "2 min ago", type: "order" },
  { id: "2", action: "Product updated", detail: "iPhone 15 Pro stock adjusted", time: "15 min ago", type: "product" },
  { id: "3", action: "AI agent alert", detail: "Review Analysis Agent latency spike", time: "32 min ago", type: "ai" },
  { id: "4", action: "New customer registered", detail: "Alex Chen joined", time: "1 hr ago", type: "customer" },
  { id: "5", action: "Coupon redeemed", detail: "SUMMER20 applied to ORD123455", time: "2 hr ago", type: "coupon" },
];

export const analyticsOverview = {
  conversionRate: 3.8,
  avgOrderValue: 76.65,
  bounceRate: 32.4,
  pageViews: 284500,
  topCategories: [
    { name: "Electronics", share: 45 },
    { name: "Fashion", share: 25 },
    { name: "Home", share: 15 },
    { name: "Beauty", share: 10 },
    { name: "Others", share: 5 },
  ],
  trafficSources: [
    { source: "Organic Search", visits: 42 },
    { source: "Direct", visits: 28 },
    { source: "Social", visits: 18 },
    { source: "Referral", visits: 12 },
  ],
};

export const whyShopWithUs = [
  { title: "AI-Powered Recommendations", description: "Personalized product suggestions", color: "bg-violet-500" },
  { title: "Secure & Safe Payments", description: "Multiple payment options with 100% security", color: "bg-emerald-500" },
  { title: "Fast & Reliable Delivery", description: "Quick delivery to your doorstep", color: "bg-blue-500" },
  { title: "24/7 Customer Support", description: "We're here to help anytime", color: "bg-amber-500" },
];

export const featureBar = [
  { icon: "Sparkles", title: "AI Assistant", description: "24/7 Smart Support", color: "text-violet-400 bg-violet-500/15" },
  { icon: "Tag", title: "Best Prices", description: "Guaranteed Deals", color: "text-emerald-400 bg-emerald-500/15" },
  { icon: "ShieldCheck", title: "Secure Payment", description: "100% Protected", color: "text-blue-400 bg-blue-500/15" },
  { icon: "Truck", title: "Fast Delivery", description: "Quick & Safe", color: "text-amber-400 bg-amber-500/15" },
  { icon: "RotateCcw", title: "Easy Returns", description: "30-Day Returns", color: "text-rose-400 bg-rose-500/15" },
];
