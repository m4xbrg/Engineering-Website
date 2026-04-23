import type { ReactNode } from "react";

type ToolWorkspaceProps = {
  controls: ReactNode;
  output: ReactNode;
  results?: ReactNode;
  insights?: ReactNode;
};

export function ToolWorkspace({
  controls,
  output,
  results,
  insights,
}: ToolWorkspaceProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[22rem,minmax(0,1fr)]">
        <div className="space-y-6">{controls}</div>
        <div className="space-y-6">
          {results}
          <section className="surface-panel p-6">{output}</section>
        </div>
      </div>
      {insights}
    </div>
  );
}

