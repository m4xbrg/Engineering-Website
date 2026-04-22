import Link from "next/link";

import { PageHeader } from "@/components/ui/PageHeader";

export default function NotFound() {
  return (
    <div className="container py-16">
      <PageHeader
        eyebrow="404"
        title="This part of the atlas has not been mapped yet."
        description="The route shell exists for the product, but this specific page could not be resolved."
        actions={
          <>
            <Link
              href="/curriculum"
              className="rounded-full bg-foreground px-5 py-3 text-sm font-medium text-white"
            >
              Go to curriculum
            </Link>
            <Link
              href="/labs"
              className="rounded-full border border-border px-5 py-3 text-sm font-medium"
            >
              Browse labs
            </Link>
          </>
        }
      />
    </div>
  );
}
