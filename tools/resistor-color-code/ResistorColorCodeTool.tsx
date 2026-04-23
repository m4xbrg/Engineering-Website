"use client";

import { useMemo, useState } from "react";

import { ControlPanel } from "@/components/tools/ControlPanel";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { ModeSwitch } from "@/components/tools/ModeSwitch";
import { ResistorSVG } from "@/components/tools/ResistorSVG";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import {
  decodeResistorBands,
  encodeResistorValue,
  formatResistance,
  getBandInfo,
  getDigitBandOptions,
  getMultiplierBandOptions,
  getToleranceBandOptions,
  type ResistorBandColor,
  type ResistorBandCount,
} from "@/lib/math";

export default function ResistorColorCodeTool() {
  const [mode, setMode] = useState<"decode" | "encode">("decode");
  const [bandCount, setBandCount] = useState<ResistorBandCount>(4);
  const [bands, setBands] = useState<ResistorBandColor[]>([
    "brown",
    "black",
    "red",
    "gold",
    "brown",
  ]);
  const [encodeResistance, setEncodeResistance] = useState("4700");
  const [encodeTolerance, setEncodeTolerance] = useState("5");

  const decoded = useMemo(
    () => decodeResistorBands({ bandCount, bands }),
    [bandCount, bands],
  );
  const encodedBands = useMemo(
    () =>
      encodeResistorValue({
        resistance: Number(encodeResistance),
        tolerance: Number(encodeTolerance),
        bandCount,
      }),
    [encodeResistance, encodeTolerance, bandCount],
  );

  const visibleBands = mode === "decode" ? bands.slice(0, bandCount) : encodedBands ?? [];
  const visibleDecoded =
    mode === "decode"
      ? decoded
      : encodedBands
        ? decodeResistorBands({ bandCount, bands: encodedBands })
        : null;

  return (
    <ToolWorkspace
      controls={
        <ControlPanel description="Switch between decoding color bands and encoding a target resistance into a valid 4-band or 5-band resistor pattern.">
          <ModeSwitch
            label="Mode"
            value={mode}
            onChange={setMode}
            options={[
              { value: "decode", label: "Decode bands" },
              { value: "encode", label: "Encode value" },
            ]}
          />
          <ModeSwitch
            label="Band count"
            value={String(bandCount) as "4" | "5"}
            onChange={(value) => setBandCount(Number(value) as ResistorBandCount)}
            options={[
              { value: "4", label: "4-band" },
              { value: "5", label: "5-band" },
            ]}
          />

          {mode === "decode" ? (
            <>
              {Array.from({ length: bandCount }).map((_, index) => {
                const isMultiplier = index === (bandCount === 4 ? 2 : 3);
                const isTolerance = index === bandCount - 1;
                const options = isTolerance
                  ? getToleranceBandOptions()
                  : isMultiplier
                    ? getMultiplierBandOptions()
                    : getDigitBandOptions();

                return (
                  <label key={index} className="space-y-2">
                    <span className="text-sm font-medium">
                      Band {index + 1}
                      {isTolerance ? " (tolerance)" : isMultiplier ? " (multiplier)" : ""}
                    </span>
                    <select
                      value={bands[index]}
                      onChange={(event) =>
                        setBands((current) => {
                          const next = [...current];
                          next[index] = event.target.value as ResistorBandColor;
                          return next;
                        })
                      }
                      className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                    >
                      {options.map((option) => (
                        <option key={option.color} value={option.color}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                );
              })}
            </>
          ) : (
            <>
              <label className="space-y-2">
                <span className="text-sm font-medium">Resistance (Ω)</span>
                <input
                  type="number"
                  value={encodeResistance}
                  onChange={(event) => setEncodeResistance(event.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Tolerance</span>
                <select
                  value={encodeTolerance}
                  onChange={(event) => setEncodeTolerance(event.target.value)}
                  className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
                >
                  {getToleranceBandOptions().map((option) => (
                    <option key={option.color} value={String(option.tolerance)}>
                      ±{option.tolerance}%
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
        </ControlPanel>
      }
      results={
        <ResultsStrip
          items={[
            {
              label: "Resistance",
              value: visibleDecoded ? formatResistance(visibleDecoded.resistance) : "—",
              detail: "Decoded from the current band pattern.",
            },
            {
              label: "Tolerance",
              value: visibleDecoded ? `±${visibleDecoded.tolerance}%` : "—",
              detail: "Nominal manufacturing tolerance band.",
            },
            {
              label: "Minimum",
              value: visibleDecoded ? formatResistance(visibleDecoded.minimum) : "—",
            },
            {
              label: "Maximum",
              value: visibleDecoded ? formatResistance(visibleDecoded.maximum) : "—",
            },
          ]}
        />
      }
      output={
        <div className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),18rem]">
            <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(233,238,226,0.92))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Resistor body
              </p>
              <div className="mt-4">
                <ResistorSVG bands={visibleBands} />
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-white/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Band meanings
              </p>
              <div className="mt-4 space-y-3 text-sm">
                {visibleBands.map((band, index) => (
                  <div key={`${band}-${index}`} className="flex items-center justify-between gap-3">
                    <span>Band {index + 1}</span>
                    <span className="font-medium">{getBandInfo(band).label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border bg-white/85 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              Tolerance range
            </p>
            {visibleDecoded ? (
              <p className="mt-4 text-lg leading-8">
                {formatResistance(visibleDecoded.resistance)} ±{visibleDecoded.tolerance}% spans{" "}
                {formatResistance(visibleDecoded.minimum)} to{" "}
                {formatResistance(visibleDecoded.maximum)}.
              </p>
            ) : (
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Enter a resistance that maps cleanly to a standard band pattern.
              </p>
            )}
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Multiplier does the heavy lift",
              text: "The first digits only set the significant figures. The multiplier band determines whether you are looking at tens of ohms, kilo-ohms, or mega-ohms.",
            },
            {
              label: "5-band parts are tighter",
              text: "A 5-band resistor usually gives you three significant digits, which is why it appears more often in precision designs and instrumentation work.",
            },
            {
              label: "Tolerance is a range",
              text: "The printed value is nominal. Real components live in a band around that value, which matters in biasing, filter design, and measurement circuits.",
            },
          ]}
        />
      }
    />
  );
}
