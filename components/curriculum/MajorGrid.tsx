import { MajorCard } from "@/components/curriculum/MajorCard";
import type { MajorIndexItem } from "@/types";

type MajorGridProps = {
  majors: MajorIndexItem[];
};

export function MajorGrid({ majors }: MajorGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {majors.map((major) => (
        <MajorCard key={major.id} major={major} />
      ))}
    </div>
  );
}
