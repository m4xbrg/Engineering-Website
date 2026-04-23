"use client";

import { useMemo, useState } from "react";

import { DualAxisChart } from "@/components/charts/DualAxisChart";
import { ControlPanel } from "@/components/tools/ControlPanel";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import {
  generateBodeData,
  type TransferFactor,
  type TransferFactorKind,
} from "@/lib/math";
import { formatEngineeringNumber } from "@/lib/utils/format";

function factorSummary(factor: TransferFactor) {
  return factor.kind === "real"
    ? `Real @ ${formatEngineeringNumber(factor.frequency)} rad/s`
    : `Pair @ ${formatEngineeringNumber(factor.frequency)} rad/s, ζ=${formatEngineeringNumber(
        factor.damping ?? 0.5,
      )}`;
}

export default function BodePlotTool() {
  const [gain, setGain] = useState("1");
  const [startDecade, setStartDecade] = useState("-1");
  const [endDecade, setEndDecade] = useState("5");
  const [showAsymptote, setShowAsymptote] = useState(true);
  const [zeros, setZeros] = useState<TransferFactor[]>([
    { id: "z1", kind: "real", frequency: 50 },
  ]);
  const [poles, setPoles] = useState<TransferFactor[]>([
    { id: "p1", kind: "real", frequency: 10 },
    { id: "p2", kind: "pair", frequency: 400, damping: 0.35 },
  ]);

  const bode = useMemo(
    () =>
      generateBodeData({
        model: {
          gain: Number(gain),
          zeros,
          poles,
        },
        startDecade: Number(startDecade),
        endDecade: Number(endDecade),
      }),
    [gain, zeros, poles, startDecade, endDecade],
  );

  function updateFactor(
    collection: "zeros" | "poles",
    factorId: string,
    key: keyof TransferFactor,
    value: string,
  ) {
    const setter = collection === "zeros" ? setZeros : setPoles;
    setter((current) =>
      current.map((factor) =>
        factor.id === factorId
          ? {
              ...factor,
              [key]:
                key === "kind"
                  ? (value as TransferFactorKind)
                  : Number(value),
            }
          : factor,
      ),
    );
  }

  function addFactor(collection: "zeros" | "poles") {
    const setter = collection === "zeros" ? setZeros : setPoles;
    setter((current) => [
      ...current,
      {
        id: `${collection}-${current.length + 1}`,
        kind: "real",
        frequency: 100,
      },
    ]);
  }

  function removeFactor(collection: "zeros" | "poles", factorId: string) {
    const setter = collection === "zeros" ? setZeros : setPoles;
    setter((current) => current.filter((factor) => factor.id !== factorId));
  }

  return (
    <ToolWorkspace
      controls={
        <ControlPanel description="Define a transfer function by its poles, zeros, and gain, then inspect exact Bode response against a straight-line approximation.">
          <label className="space-y-2">
            <span className="text-sm font-medium">DC gain K</span>
            <input
              type="number"
              value={gain}
              onChange={(event) => setGain(event.target.value)}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium">Start decade</span>
              <input
                type="number"
                value={startDecade}
                onChange={(event) => setStartDecade(event.target.value)}
                className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium">End decade</span>
              <input
                type="number"
                value={endDecade}
                onChange={(event) => setEndDecade(event.target.value)}
                className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
              />
            </label>
          </div>

          {(["zeros", "poles"] as const).map((collection) => (
            <div key={collection} className="rounded-2xl border border-border bg-white/85 p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold capitalize">{collection}</p>
                <button
                  type="button"
                  onClick={() => addFactor(collection)}
                  className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
                >
                  Add
                </button>
              </div>
              <div className="mt-4 space-y-4">
                {(collection === "zeros" ? zeros : poles).map((factor) => (
                  <div key={factor.id} className="rounded-2xl border border-border bg-muted/40 p-4">
                    <div className="grid gap-3 md:grid-cols-[1fr,1fr,1fr,auto]">
                      <select
                        value={factor.kind}
                        onChange={(event) =>
                          updateFactor(collection, factor.id, "kind", event.target.value)
                        }
                        className="rounded-xl border border-border bg-white px-3 py-2 text-sm"
                      >
                        <option value="real">Real break</option>
                        <option value="pair">Complex pair</option>
                      </select>
                      <input
                        type="number"
                        value={factor.frequency}
                        onChange={(event) =>
                          updateFactor(collection, factor.id, "frequency", event.target.value)
                        }
                        className="rounded-xl border border-border bg-white px-3 py-2 text-sm"
                      />
                      <input
                        type="number"
                        step="0.05"
                        value={factor.damping ?? 0.5}
                        disabled={factor.kind === "real"}
                        onChange={(event) =>
                          updateFactor(collection, factor.id, "damping", event.target.value)
                        }
                        className="rounded-xl border border-border bg-white px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => removeFactor(collection, factor.id)}
                        className="rounded-xl border border-border bg-white px-3 py-2 text-sm"
                      >
                        Remove
                      </button>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{factorSummary(factor)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={() => setShowAsymptote((current) => !current)}
            className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-colors ${
              showAsymptote
                ? "border-transparent bg-foreground text-white"
                : "border-border bg-white/80 text-foreground"
            }`}
          >
            {showAsymptote ? "Asymptote overlay on" : "Show asymptote overlay"}
          </button>
        </ControlPanel>
      }
      results={
        <ResultsStrip
          items={[
            {
              label: "Gain crossover",
              value: bode.gainCrossing?.omega
                ? `${formatEngineeringNumber(bode.gainCrossing.omega)} rad/s`
                : "—",
            },
            {
              label: "Phase crossover",
              value: bode.phaseCrossing?.omega
                ? `${formatEngineeringNumber(bode.phaseCrossing.omega)} rad/s`
                : "—",
            },
            {
              label: "Phase margin",
              value:
                bode.phaseMargin !== null
                  ? `${formatEngineeringNumber(bode.phaseMargin)}°`
                  : "—",
            },
            {
              label: "Stability",
              value: bode.stability,
            },
          ]}
        />
      }
      output={
        <div className="space-y-6">
          <DualAxisChart
            data={bode.data}
            xKey="omega"
            xLabel="ω (rad/s)"
            upperLabel="magnitude (dB)"
            lowerLabel="phase (deg)"
            xScale="log"
            annotations={[
              ...(bode.gainCrossing?.omega
                ? [{ x: bode.gainCrossing.omega, label: "Gain crossover" }]
                : []),
              ...(bode.phaseCrossing?.omega
                ? [{ x: bode.phaseCrossing.omega, label: "Phase crossover", color: "#c46c1e" }]
                : []),
            ]}
            upperSeries={[
              { key: "magnitude", label: "Exact magnitude", color: "#1b5f7f" },
              ...(showAsymptote
                ? [
                    {
                      key: "asymptoteMagnitude",
                      label: "Straight-line magnitude",
                      color: "#c46c1e",
                      strokeDasharray: "6 4",
                    },
                  ]
                : []),
            ]}
            lowerSeries={[
              { key: "phase", label: "Exact phase", color: "#1b5f7f" },
              ...(showAsymptote
                ? [
                    {
                      key: "asymptotePhase",
                      label: "Straight-line phase",
                      color: "#c46c1e",
                      strokeDasharray: "6 4",
                    },
                  ]
                : []),
            ]}
          />

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">Current zeros</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {zeros.map((factor) => factorSummary(factor)).join(" · ")}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">Current poles</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {poles.map((factor) => factorSummary(factor)).join(" · ")}
              </p>
            </div>
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Each pole bends down",
              text: "A real pole costs about 20 dB per decade after its break frequency. Complex pole pairs steepen the drop and can also create resonant phase behavior.",
            },
            {
              label: "Zeros buy phase",
              text: "Zeros increase slope and add positive phase. That is why compensators often place zeros strategically before the dominant poles they are trying to offset.",
            },
            {
              label: "Margins are design language",
              text: "Gain and phase margin are not decoration. They are compact ways to talk about robustness long before you simulate a full closed-loop step response.",
            },
          ]}
        />
      }
    />
  );
}
