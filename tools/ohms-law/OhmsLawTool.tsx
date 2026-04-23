"use client";

import { useState } from "react";

import { ControlPanel } from "@/components/tools/ControlPanel";
import { FormulaDisplay } from "@/components/tools/FormulaDisplay";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { UnitInput } from "@/components/tools/UnitInput";
import { formatEngineeringNumber } from "@/lib/utils/format";

type FieldKey = "voltage" | "current" | "resistance" | "power";

const fieldConfig = {
  voltage: {
    label: "Voltage",
    symbol: "V",
    units: [
      { value: "mV", label: "mV", scale: 1e-3 },
      { value: "V", label: "V", scale: 1 },
      { value: "kV", label: "kV", scale: 1e3 },
    ],
  },
  current: {
    label: "Current",
    symbol: "A",
    units: [
      { value: "mA", label: "mA", scale: 1e-3 },
      { value: "A", label: "A", scale: 1 },
    ],
  },
  resistance: {
    label: "Resistance",
    symbol: "Ω",
    units: [
      { value: "ohm", label: "Ω", scale: 1 },
      { value: "kohm", label: "kΩ", scale: 1e3 },
      { value: "Mohm", label: "MΩ", scale: 1e6 },
    ],
  },
  power: {
    label: "Power",
    symbol: "W",
    units: [
      { value: "mW", label: "mW", scale: 1e-3 },
      { value: "W", label: "W", scale: 1 },
      { value: "kW", label: "kW", scale: 1e3 },
    ],
  },
} as const;

function toBase(field: FieldKey, value: string, unit: string) {
  if (!value) {
    return null;
  }

  const numeric = Number(value);

  if (!Number.isFinite(numeric)) {
    return null;
  }

  const option = fieldConfig[field].units.find((entry) => entry.value === unit);

  return numeric * (option?.scale ?? 1);
}

function fromBase(field: FieldKey, value: number, unit: string) {
  const option = fieldConfig[field].units.find((entry) => entry.value === unit);
  return value / (option?.scale ?? 1);
}

function solveTwoOfFour(values: Partial<Record<FieldKey, number>>) {
  const knownKeys = Object.entries(values)
    .filter((entry): entry is [FieldKey, number] => Number.isFinite(entry[1]))
    .map(([key]) => key as FieldKey);

  if (knownKeys.length !== 2) {
    return null;
  }

  const [first, second] = knownKeys;
  const a = values[first]!;
  const b = values[second]!;

  const cases: Record<string, { values: Record<FieldKey, number>; formula: string }> = {
    "voltage-current": {
      values: {
        voltage: a,
        current: b,
        resistance: a / b,
        power: a * b,
      },
      formula: `R = V / I, P = V × I`,
    },
    "voltage-resistance": {
      values: {
        voltage: a,
        resistance: b,
        current: a / b,
        power: (a * a) / b,
      },
      formula: `I = V / R, P = V² / R`,
    },
    "voltage-power": {
      values: {
        voltage: a,
        power: b,
        current: b / a,
        resistance: (a * a) / b,
      },
      formula: `I = P / V, R = V² / P`,
    },
    "current-resistance": {
      values: {
        current: a,
        resistance: b,
        voltage: a * b,
        power: a * a * b,
      },
      formula: `V = I × R, P = I²R`,
    },
    "current-power": {
      values: {
        current: a,
        power: b,
        voltage: b / a,
        resistance: b / (a * a),
      },
      formula: `V = P / I, R = P / I²`,
    },
    "resistance-power": {
      values: {
        resistance: a,
        power: b,
        current: Math.sqrt(b / a),
        voltage: Math.sqrt(a * b),
      },
      formula: `I = √(P / R), V = √(PR)`,
    },
  };

  const directKey = `${first}-${second}`;
  const reverseKey = `${second}-${first}`;

  return cases[directKey] ?? cases[reverseKey] ?? null;
}

export default function OhmsLawTool() {
  const [fields, setFields] = useState<Record<FieldKey, { value: string; unit: string }>>({
    voltage: { value: "12", unit: "V" },
    current: { value: "2", unit: "A" },
    resistance: { value: "", unit: "ohm" },
    power: { value: "", unit: "W" },
  });

  const baseValues = {
    voltage: toBase("voltage", fields.voltage.value, fields.voltage.unit),
    current: toBase("current", fields.current.value, fields.current.unit),
    resistance: toBase("resistance", fields.resistance.value, fields.resistance.unit),
    power: toBase("power", fields.power.value, fields.power.unit),
  };
  const normalizedValues = Object.fromEntries(
    Object.entries(baseValues).filter((entry) => entry[1] !== null),
  ) as Partial<Record<FieldKey, number>>;
  const solved = solveTwoOfFour(normalizedValues);

  const knownCount = Object.values(fields).filter((field) => field.value !== "").length;

  const results = (["voltage", "current", "resistance", "power"] as FieldKey[]).map((field) => ({
    label: fieldConfig[field].label,
    value: solved
      ? `${formatEngineeringNumber(fromBase(field, solved.values[field], fields[field].unit))} ${fieldConfig[field].units.find((unit) => unit.value === fields[field].unit)?.label}`
      : "—",
    detail: solved ? `${formatEngineeringNumber(solved.values[field])} ${fieldConfig[field].symbol} base units` : "Enter exactly two known values.",
  }));

  return (
    <ToolWorkspace
      controls={
        <ControlPanel description="Fill exactly two known electrical quantities. The calculator solves the remaining pair and keeps the relationships visible.">
          {(Object.keys(fieldConfig) as FieldKey[]).map((field) => (
            <UnitInput
              key={field}
              label={fieldConfig[field].label}
              value={fields[field].value}
              unit={fields[field].unit}
              unitOptions={fieldConfig[field].units.map((unit) => ({
                value: unit.value,
                label: unit.label,
              }))}
              onValueChange={(value) =>
                setFields((current) => ({
                  ...current,
                  [field]: {
                    ...current[field],
                    value,
                  },
                }))
              }
              onUnitChange={(unit) =>
                setFields((current) => ({
                  ...current,
                  [field]: {
                    ...current[field],
                    unit,
                  },
                }))
              }
              placeholder="Leave blank if unknown"
            />
          ))}
          <p className="text-sm leading-7 text-muted-foreground">
            Known values entered: {knownCount}. This MVP solver is scoped to the standard 2-of-4 Ohm&apos;s law cases.
          </p>
        </ControlPanel>
      }
      results={<ResultsStrip items={results} />}
      output={
        <div className="space-y-6">
          {solved ? (
            <FormulaDisplay
              expression={solved.formula}
              substituted={`Using the two known inputs, the calculator solved the remaining quantities in base SI units before converting them back into your selected prefixes.`}
            />
          ) : (
            <FormulaDisplay
              expression="Choose any two of V, I, R, and P."
              substituted="For example: V + I, V + R, I + R, or R + P."
            />
          )}

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),20rem]">
            <div className="rounded-[1.75rem] border border-border bg-white/85 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Solved relationships
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {results.map((result) => (
                  <div key={result.label} className="rounded-2xl border border-border bg-muted/40 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {result.label}
                    </p>
                    <p className="mt-3 text-2xl font-semibold">{result.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(237,244,247,0.92))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Power triangle
              </p>
              <svg viewBox="0 0 220 180" className="mt-4 w-full">
                <polygon
                  points="20,150 180,150 180,30"
                  fill="rgba(26,124,163,0.08)"
                  stroke="#1b5f7f"
                  strokeWidth="4"
                />
                <text x="98" y="165" textAnchor="middle" fontSize="14" fill="#1f2937">
                  P (real power)
                </text>
                <text x="192" y="98" textAnchor="middle" fontSize="14" fill="#1f2937">
                  Q
                </text>
                <text x="112" y="78" textAnchor="middle" fontSize="14" fill="#1f2937">
                  S
                </text>
              </svg>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                In the DC case used here, apparent and real power collapse into the same number. Reactive power belongs in the phasor tool.
              </p>
            </div>
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Two values are enough",
              text: "The four quantities are tightly coupled, so any independent pair fully determines the other two in the DC resistive case.",
            },
            {
              label: "Pick stable knowns",
              text: "Voltage plus resistance or current plus resistance often comes directly from a lab setup, which makes those combinations especially useful for quick checks.",
            },
            {
              label: "Know the boundary",
              text: "Once phase, reactance, or power factor enters the picture, switch to the AC phasor tool. Ohm's law still applies there, but with complex impedance instead of a single real resistance.",
            },
          ]}
        />
      }
    />
  );
}
