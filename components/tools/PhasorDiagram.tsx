type PhasorVector = {
  label: string;
  magnitude: number;
  angleDeg: number;
  color: string;
};

type PhasorDiagramProps = {
  vectors: PhasorVector[];
};

export function PhasorDiagram({ vectors }: PhasorDiagramProps) {
  const maxMagnitude =
    Math.max(...vectors.map((vector) => Math.max(vector.magnitude, 1)), 1) || 1;
  const radius = 120;
  const center = 170;

  return (
    <svg viewBox="0 0 340 340" className="mx-auto w-full max-w-[26rem]">
      <defs>
        <marker
          id="arrow-head"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#d8dee8" />
      <circle cx={center} cy={center} r={radius * 0.66} fill="none" stroke="#edf1f5" />
      <circle cx={center} cy={center} r={radius * 0.33} fill="none" stroke="#edf1f5" />
      <line x1="20" y1={center} x2="320" y2={center} stroke="#d8dee8" />
      <line x1={center} y1="20" x2={center} y2="320" stroke="#d8dee8" />

      {vectors.map((vector) => {
        const scaledMagnitude = (vector.magnitude / maxMagnitude) * radius;
        const angle = (-vector.angleDeg * Math.PI) / 180;
        const x = center + scaledMagnitude * Math.cos(angle);
        const y = center + scaledMagnitude * Math.sin(angle);

        return (
          <g key={vector.label} style={{ color: vector.color }}>
            <line
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="4"
              markerEnd="url(#arrow-head)"
            />
            <circle cx={x} cy={y} r="5" fill="currentColor" />
            <text
              x={x + 8}
              y={y - 8}
              fill="currentColor"
              fontSize="12"
              fontWeight="600"
            >
              {vector.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

