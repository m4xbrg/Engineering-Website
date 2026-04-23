"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils/cn";
import { MAIN_NAV_ITEMS } from "@/lib/utils/routes";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="-mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1">
      {MAIN_NAV_ITEMS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-foreground text-white shadow-sm"
                : "border border-transparent text-muted-foreground hover:border-border hover:bg-white hover:text-foreground",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
