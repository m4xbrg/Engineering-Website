import type { ReactNode } from "react";

import { SectionLayoutShell } from "@/components/layout/SectionLayoutShell";

export default function MajorsLayout({ children }: { children: ReactNode }) {
  return (
    <SectionLayoutShell
      title="Specialization Tracks"
      description="Each major has its own overview page and course-detail pattern. Electrical Engineering is prepared for the deepest V1 build, but the architecture already includes the other majors."
    >
      {children}
    </SectionLayoutShell>
  );
}
