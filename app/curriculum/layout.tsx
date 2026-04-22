import type { ReactNode } from "react";

import { CurriculumSidebar } from "@/components/layout/CurriculumSidebar";
import { SectionLayoutShell } from "@/components/layout/SectionLayoutShell";

export default function CurriculumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SectionLayoutShell
      title="Curriculum Atlas"
      description="The curriculum layer is structured around a shared core plus specialization-specific routes. This shell keeps the section navigable while content depth fills in over time."
      sidebar={<CurriculumSidebar />}
    >
      {children}
    </SectionLayoutShell>
  );
}
