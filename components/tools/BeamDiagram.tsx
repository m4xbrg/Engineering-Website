import type { BeamLoadType, BeamSupportType } from "@/lib/math";

type BeamDiagramProps = {
  supportType: BeamSupportType;
  loadType: BeamLoadType;
  pointPositionRatio: number;
  loadLabel: string;
};

function SupportGraphic({ supportType }: { supportType: BeamSupportType }) {
  if (supportType === "cantilever") {
    return (
      <>
        <rect x="36" y="74" width="18" height="92" rx="4" fill="#d7e3ea" stroke="#35566a" />
        <line x1="58" y1="74" x2="58" y2="166" stroke="#35566a" strokeWidth="4" />
      </>
    );
  }

  if (supportType === "fixed-fixed") {
    return (
      <>
        <rect x="32" y="74" width="18" height="92" rx="4" fill="#d7e3ea" stroke="#35566a" />
        <rect x="430" y="74" width="18" height="92" rx="4" fill="#d7e3ea" stroke="#35566a" />
      </>
    );
  }

  return (
    <>
      <path d="M70 170 L92 146 L114 170 Z" fill="#d7e3ea" stroke="#35566a" strokeWidth="2" />
      <circle cx="400" cy="170" r="12" fill="#d7e3ea" stroke="#35566a" strokeWidth="2" />
      <circle cx="430" cy="170" r="12" fill="#d7e3ea" stroke="#35566a" strokeWidth="2" />
    </>
  );
}

export function BeamDiagram({
  supportType,
  loadType,
  pointPositionRatio,
  loadLabel,
}: BeamDiagramProps) {
  const beamStart = supportType === "cantilever" ? 58 : 72;
  const beamEnd = supportType === "cantilever" ? 430 : 420;
  const pointX = beamStart + (beamEnd - beamStart) * pointPositionRatio;

  return (
    <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(236,241,244,0.92))] p-5">
      <svg viewBox="0 0 480 220" className="h-auto w-full">
        <defs>
          <marker
            id="beam-load-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="4"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L6,3 z" fill="#c46c1e" />
          </marker>
        </defs>

        <SupportGraphic supportType={supportType} />
        <line x1={beamStart} y1="120" x2={beamEnd} y2="120" stroke="#12384b" strokeWidth="12" strokeLinecap="round" />

        {loadType === "point" ? (
          <>
            <line
              x1={pointX}
              y1="42"
              x2={pointX}
              y2="96"
              stroke="#c46c1e"
              strokeWidth="4"
              markerEnd="url(#beam-load-arrow)"
            />
            <text x={pointX} y="28" textAnchor="middle" className="fill-[#7e4a19] text-[12px] font-semibold">
              {loadLabel}
            </text>
          </>
        ) : (
          <>
            {Array.from({ length: 8 }).map((_, index) => {
              const x = beamStart + ((beamEnd - beamStart) * index) / 7;
              return (
                <line
                  key={x}
                  x1={x}
                  y1="44"
                  x2={x}
                  y2="96"
                  stroke="#c46c1e"
                  strokeWidth="3"
                  markerEnd="url(#beam-load-arrow)"
                />
              );
            })}
            <text
              x={(beamStart + beamEnd) / 2}
              y="28"
              textAnchor="middle"
              className="fill-[#7e4a19] text-[12px] font-semibold"
            >
              {loadLabel}
            </text>
          </>
        )}
      </svg>
    </div>
  );
}
