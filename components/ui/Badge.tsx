import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.18em]",
  {
    variants: {
      tone: {
        default: "border-border bg-white/80 text-foreground",
        muted: "border-border bg-muted text-muted-foreground",
        accent: "border-transparent bg-accent text-accent-foreground",
        warning: "border-transparent bg-amber-100 text-amber-900",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
