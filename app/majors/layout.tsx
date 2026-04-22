import type { ReactNode } from "react";

import { CurriculumSidebar } from "@/components/layout/CurriculumSidebar";
import { SectionLayoutShell } from "@/components/layout/SectionLayoutShell";

export default function MajorsLayout({ children }: { children: ReactNode }) {
  return (
    <SectionLayoutShell
      title="Specialization Tracks"
      description="Each specialization now sits inside the same curriculum system as the shared core, concept graph, and future labs so students can move across the atlas without losing context."
      sidebar={<CurriculumSidebar />}
    >
      {children}
    </SectionLayoutShell>
  );
}
