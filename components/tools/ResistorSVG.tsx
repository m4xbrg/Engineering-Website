import type { ResistorBandColor } from "@/lib/math";
import { getBandInfo } from "@/lib/math";

type ResistorSVGProps = {
  bands: ResistorBandColor[];
};

export function ResistorSVG({ bands }: ResistorSVGProps) {
  return (
    <svg viewBox="0 0 520 180" className="w-full">
      <line x1="20" y1="90" x2="140" y2="90" stroke="#8c97a8" strokeWidth="10" />
      <line x1="380" y1="90" x2="500" y2="90" stroke="#8c97a8" strokeWidth="10" />
      <rect
        x="140"
        y="45"
        width="240"
        height="90"
        rx="40"
        fill="#dcc38f"
        stroke="#b79661"
        strokeWidth="4"
      />
      {bands.map((band, index) => (
        <rect
          key={`${band}-${index}`}
          x={175 + index * 42}
          y="45"
          width="18"
          height="90"
          fill={getBandInfo(band).hex}
          stroke="rgba(0,0,0,0.18)"
        />
      ))}
    </svg>
  );
}

