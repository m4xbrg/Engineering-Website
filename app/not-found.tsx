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
              className="atlas-button"
            >
              Go to curriculum
            </Link>
            <Link
              href="/labs"
              className="atlas-button-secondary"
            >
              Browse labs
            </Link>
          </>
        }
      />
    </div>
  );
}
