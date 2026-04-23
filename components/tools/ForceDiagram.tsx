import type { AppliedForce } from "@/lib/math";

type ForceDiagramProps = {
  forces: AppliedForce[];
  coupleMomentNm: number;
  resultant?: {
    magnitude: number;
    angleDeg: number;
  };
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function ForceDiagram({
  forces,
  coupleMomentNm,
  resultant,
}: ForceDiagramProps) {
  const xScale = (value: number) => 240 + clamp(value, -1.6, 1.6) * 82;
  const yScale = (value: number) => 140 - clamp(value, -1.2, 1.2) * 78;

  return (
    <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(236,241,244,0.92))] p-5">
      <svg viewBox="0 0 480 300" className="h-auto w-full">
        <defs>
          <marker
            id="force-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L7,3 z" fill="#1b5f7f" />
          </marker>
          <marker
            id="resultant-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L7,3 z" fill="#c46c1e" />
          </marker>
        </defs>

        <line x1="40" y1="140" x2="440" y2="140" stroke="#d6dde3" strokeWidth="2" strokeDasharray="8 8" />
        <line x1="240" y1="26" x2="240" y2="274" stroke="#d6dde3" strokeWidth="2" strokeDasharray="8 8" />
        <rect x="145" y="90" width="190" height="100" rx="18" fill="#eff4f7" stroke="#35566a" strokeWidth="3" />
        <circle cx="240" cy="140" r="4" fill="#35566a" />

        {forces.map((force) => {
          const anchorX = xScale(force.x);
          const anchorY = yScale(force.y);
          const length = 26 + Math.min(force.magnitude, 18) * 5;
          const theta = (force.angleDeg * Math.PI) / 180;
          const endX = anchorX + length * Math.cos(theta);
          const endY = anchorY - length * Math.sin(theta);

          return (
            <g key={force.id}>
              <circle cx={anchorX} cy={anchorY} r="4.5" fill="#1b5f7f" />
              <line
                x1={anchorX}
                y1={anchorY}
                x2={endX}
                y2={endY}
                stroke="#1b5f7f"
                strokeWidth="4"
                markerEnd="url(#force-arrow)"
              />
              <text x={endX + 8} y={endY - 6} className="fill-[#12384b] text-[12px] font-semibold">
                {force.label}
              </text>
            </g>
          );
        })}

        {resultant && resultant.magnitude > 0.01 ? (
          <g>
            <line
              x1="240"
              y1="140"
              x2={240 + Math.cos((resultant.angleDeg * Math.PI) / 180) * 86}
              y2={140 - Math.sin((resultant.angleDeg * Math.PI) / 180) * 86}
              stroke="#c46c1e"
              strokeWidth="5"
              markerEnd="url(#resultant-arrow)"
            />
            <text x="252" y="116" className="fill-[#7e4a19] text-[12px] font-semibold">
              Resultant
            </text>
          </g>
        ) : null}

        {Math.abs(coupleMomentNm) > 0.01 ? (
          <g>
            <path
              d={coupleMomentNm >= 0 ? "M120 230 C110 205 128 182 158 186" : "M158 186 C184 194 190 220 170 240"}
              fill="none"
              stroke="#7f4aa8"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={coupleMomentNm >= 0 ? "M152 178 L160 188 L146 191" : "M174 232 L167 241 L162 228"}
              fill="#7f4aa8"
            />
            <text x="108" y="252" className="fill-[#6b3f8a] text-[12px] font-semibold">
              M = {coupleMomentNm.toFixed(2)} N m
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
}
