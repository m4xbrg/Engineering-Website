import type { OpAmpMode } from "@/lib/math";

type OpAmpSchematicProps = {
  mode: OpAmpMode;
  inputLabel: string;
  referenceLabel?: string;
  resistorInputLabel: string;
  resistorFeedbackLabel: string;
  capacitorLabel: string;
};

function FeedbackElement({
  label,
  kind,
}: {
  label: string;
  kind: "resistor" | "capacitor";
}) {
  return (
    <g>
      <line x1="292" y1="78" x2="356" y2="78" stroke="#35566a" strokeWidth="3" />
      {kind === "resistor" ? (
        <path
          d="M324 78 l8 -10 l8 20 l8 -20 l8 20 l8 -20 l8 10"
          fill="none"
          stroke="#35566a"
          strokeWidth="3"
        />
      ) : (
        <>
          <line x1="330" y1="60" x2="330" y2="96" stroke="#35566a" strokeWidth="3" />
          <line x1="344" y1="60" x2="344" y2="96" stroke="#35566a" strokeWidth="3" />
        </>
      )}
      <text x="338" y="56" textAnchor="middle" className="fill-[#12384b] text-[11px] font-semibold">
        {label}
      </text>
    </g>
  );
}

export function OpAmpSchematic({
  mode,
  inputLabel,
  referenceLabel,
  resistorInputLabel,
  resistorFeedbackLabel,
  capacitorLabel,
}: OpAmpSchematicProps) {
  const feedbackKind =
    mode === "integrator" ? "capacitor" : "resistor";
  const inputKind =
    mode === "differentiator" ? "capacitor" : "resistor";

  return (
    <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(236,241,244,0.92))] p-5">
      <svg viewBox="0 0 480 260" className="h-auto w-full">
        <path d="M206 62 L206 198 L326 130 Z" fill="#eef3f6" stroke="#35566a" strokeWidth="4" />
        <text x="250" y="136" textAnchor="middle" className="fill-[#12384b] text-[16px] font-semibold">
          Op-Amp
        </text>
        <text x="194" y="104" textAnchor="middle" className="fill-[#12384b] text-[22px] font-semibold">
          -
        </text>
        <text x="194" y="164" textAnchor="middle" className="fill-[#12384b] text-[22px] font-semibold">
          +
        </text>
        <line x1="326" y1="130" x2="416" y2="130" stroke="#35566a" strokeWidth="4" />
        <text x="420" y="124" className="fill-[#12384b] text-[12px] font-semibold">
          Vout
        </text>

        {mode === "comparator" ? (
          <>
            <line x1="58" y1="86" x2="206" y2="86" stroke="#35566a" strokeWidth="3" />
            <line x1="58" y1="170" x2="206" y2="170" stroke="#35566a" strokeWidth="3" />
            <text x="64" y="78" className="fill-[#12384b] text-[12px] font-semibold">
              {inputLabel}
            </text>
            <text x="64" y="162" className="fill-[#12384b] text-[12px] font-semibold">
              {referenceLabel ?? "Vref"}
            </text>
          </>
        ) : (
          <>
            <line x1="64" y1="88" x2="136" y2="88" stroke="#35566a" strokeWidth="3" />
            {inputKind === "resistor" ? (
              <path
                d="M136 88 l8 -10 l8 20 l8 -20 l8 20 l8 -20 l8 10"
                fill="none"
                stroke="#35566a"
                strokeWidth="3"
              />
            ) : (
              <>
                <line x1="148" y1="70" x2="148" y2="106" stroke="#35566a" strokeWidth="3" />
                <line x1="162" y1="70" x2="162" y2="106" stroke="#35566a" strokeWidth="3" />
              </>
            )}
            <line x1="176" y1="88" x2="206" y2="88" stroke="#35566a" strokeWidth="3" />
            <text x="96" y="78" className="fill-[#12384b] text-[12px] font-semibold">
              {inputLabel}
            </text>
            <text x="156" y="58" textAnchor="middle" className="fill-[#12384b] text-[11px] font-semibold">
              {inputKind === "resistor" ? resistorInputLabel : capacitorLabel}
            </text>

            <line x1="206" y1="170" x2="86" y2="170" stroke="#35566a" strokeWidth="3" />
            <line x1="86" y1="170" x2="86" y2="212" stroke="#35566a" strokeWidth="3" />
            <line x1="66" y1="212" x2="106" y2="212" stroke="#35566a" strokeWidth="3" />
            <line x1="72" y1="220" x2="100" y2="220" stroke="#35566a" strokeWidth="3" />
            <line x1="78" y1="228" x2="94" y2="228" stroke="#35566a" strokeWidth="3" />

            {mode === "non-inverting" || mode === "follower" ? (
              <>
                <line x1="60" y1="170" x2="206" y2="170" stroke="#35566a" strokeWidth="3" />
                <text x="64" y="160" className="fill-[#12384b] text-[12px] font-semibold">
                  {inputLabel}
                </text>
              </>
            ) : null}

            {mode !== "follower" ? (
              <>
                <line x1="356" y1="130" x2="356" y2="78" stroke="#35566a" strokeWidth="3" />
                <line x1="356" y1="78" x2="292" y2="78" stroke="#35566a" strokeWidth="3" />
                <line x1="292" y1="78" x2="292" y2="88" stroke="#35566a" strokeWidth="3" />
                <FeedbackElement
                  label={feedbackKind === "resistor" ? resistorFeedbackLabel : capacitorLabel}
                  kind={feedbackKind}
                />
              </>
            ) : (
              <line x1="356" y1="130" x2="292" y2="88" stroke="#35566a" strokeWidth="3" />
            )}
          </>
        )}
      </svg>
    </div>
  );
}
