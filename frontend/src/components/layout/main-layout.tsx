import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingChatButton } from "@/components/layout/floating-chat";

export function MainLayout({ children, showFooter = true }: { children: React.ReactNode; showFooter?: boolean }) {
  return (
    <div className="min-h-screen bg-[#0B1120]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(79,70,229,0.08),transparent_25%)]" />
      <div className="relative mx-auto max-w-[1600px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <Navbar />
        <main className="mt-6">{children}</main>
        {showFooter && <Footer />}
      </div>
      <FloatingChatButton />
    </div>
  );
}

export function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)_320px]">
      {children}
    </div>
  );
}
