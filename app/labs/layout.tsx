import type { ReactNode } from "react";

import { SectionLayoutShell } from "@/components/layout/SectionLayoutShell";

export default function LabsLayout({ children }: { children: ReactNode }) {
  return (
    <SectionLayoutShell
      title="Interactive Labs"
      description="Interactive Labs is the applied layer of Engineering Atlas: bounded tools tied back to majors, courses, and core concepts. This first MVP pass focuses on working electrical and shared-engineering tools rather than maximum breadth."
    >
      {children}
    </SectionLayoutShell>
  );
}
