import Link from "next/link";
import { Bot, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0B1120] px-4 text-center">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_center,rgba(124,58,237,0.15),transparent_50%)]" />
      <div className="relative">
        <div className="mb-6 text-8xl font-black gradient-text">404</div>
        <h1 className="text-2xl font-bold">Page Not Found</h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" /> Go Home
            </Button>
          </Link>
          <Link href="/assistant">
            <Button variant="outline" className="gap-2">
              <Bot className="h-4 w-4" /> AI Assistant
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
