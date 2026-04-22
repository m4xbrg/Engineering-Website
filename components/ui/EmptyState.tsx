import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="surface-panel flex flex-col gap-3 p-6">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm leading-7 text-muted-foreground">{description}</p>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  );
}
