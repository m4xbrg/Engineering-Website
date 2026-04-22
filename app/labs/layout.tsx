import type { ReactNode } from "react";

import { SectionLayoutShell } from "@/components/layout/SectionLayoutShell";

export default function LabsLayout({ children }: { children: ReactNode }) {
  return (
    <SectionLayoutShell
      title="Interactive Labs"
      description="The lab system is set up for calculators, visualizers, and simulators. This pass establishes metadata, route handling, and shared page shells without implementing the final tool logic."
    >
      {children}
    </SectionLayoutShell>
  );
}
