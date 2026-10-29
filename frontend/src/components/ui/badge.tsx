import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent gradient-primary text-white",
        secondary: "border-white/10 bg-white/5 text-foreground",
        destructive: "border-transparent bg-red-500/15 text-red-400",
        outline: "border-white/10 text-foreground",
        success: "border-transparent bg-emerald-500/15 text-emerald-400",
        new: "border-transparent bg-violet-500/20 text-violet-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
