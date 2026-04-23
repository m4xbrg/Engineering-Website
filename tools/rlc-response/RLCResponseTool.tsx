"use client";

import { useMemo, useState } from "react";

import { DualAxisChart } from "@/components/charts/DualAxisChart";
import { LineChart } from "@/components/charts/LineChart";
import { ControlPanel } from "@/components/tools/ControlPanel";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { ModeSwitch } from "@/components/tools/ModeSwitch";
import { ParameterSlider } from "@/components/tools/ParameterSlider";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import {
  createFrequencyResponse,
  createStepResponse,
  getResponseMetrics,
  type CircuitResponseKind,
} from "@/lib/math";
import { formatEngineeringNumber } from "@/lib/utils/format";

export default function RLCResponseTool() {
  const [kind, setKind] = useState<CircuitResponseKind>("rlc");
  const [analysis, setAnalysis] = useState<"step" | "frequency">("step");
  const [resistance, setResistance] = useState(80);
  const [inductanceMilliHenry, setInductanceMilliHenry] = useState(40);
  const [capacitanceMicroFarad, setCapacitanceMicroFarad] = useState(10);

  const inductance = inductanceMilliHenry / 1000;
  const capacitance = capacitanceMicroFarad / 1_000_000;
  const metrics = useMemo(
    () =>
      getResponseMetrics({
        kind,
        resistance,
        inductance,
        capacitance,
      }),
    [kind, resistance, inductance, capacitance],
  );
  const stepResponse = useMemo(
    () =>
      createStepResponse({
        kind,
        resistance,
        inductance,
        capacitance,
      }),
    [kind, resistance, inductance, capacitance],
  );
  const frequencyResponse = useMemo(
    () =>
      createFrequencyResponse({
        kind,
        resistance,
        inductance,
        capacitance,
      }),
    [kind, resistance, inductance, capacitance],
  );

  const cutoffAnnotation =
    frequencyResponse.gainCrossing?.omega ?? metrics.omega0 ?? undefined;

  return (
    <ToolWorkspace
      controls={
        <ControlPanel description="Sweep component values for a bounded RC, RL, or low-pass RLC model and compare what changes in the time domain versus the frequency domain.">
          <ModeSwitch
            label="Circuit family"
            value={kind}
            onChange={setKind}
            options={[
              { value: "rc", label: "RC low-pass" },
              { value: "rl", label: "RL low-pass" },
              { value: "rlc", label: "RLC low-pass" },
            ]}
          />
          <ModeSwitch
            label="Primary view"
            value={analysis}
            onChange={setAnalysis}
            options={[
              { value: "step", label: "Step response" },
              { value: "frequency", label: "Frequency response" },
            ]}
          />
          <ParameterSlider
            label="Resistance"
            value={resistance}
            min={1}
            max={300}
            step={1}
            unit="Ω"
            onChange={setResistance}
          />
          <ParameterSlider
            label="Inductance"
            value={inductanceMilliHenry}
            min={1}
            max={200}
            step={1}
            unit="mH"
            onChange={setInductanceMilliHenry}
          />
          <ParameterSlider
            label="Capacitance"
            value={capacitanceMicroFarad}
            min={1}
            max={100}
            step={1}
            unit="μF"
            onChange={setCapacitanceMicroFarad}
          />
        </ControlPanel>
      }
      results={
        <ResultsStrip
          items={[
            {
              label: "τ / envelope",
              value: metrics.tau ? `${formatEngineeringNumber(metrics.tau)} s` : "—",
            },
            {
              label: "ω₀",
              value: metrics.omega0 ? `${formatEngineeringNumber(metrics.omega0)} rad/s` : "—",
            },
            {
              label: "ζ",
              value:
                metrics.dampingRatio !== null
                  ? formatEngineeringNumber(metrics.dampingRatio)
                  : "—",
            },
            {
              label: "Q",
              value:
                metrics.qFactor !== null && Number.isFinite(metrics.qFactor)
                  ? formatEngineeringNumber(metrics.qFactor)
                  : "—",
            },
          ]}
        />
      }
      output={
        <div className="space-y-6">
          {analysis === "step" ? (
            <LineChart
              data={stepResponse.points}
              xKey="time"
              xLabel="time (s)"
              yLabel="normalized output"
              series={[
                { key: "response", label: "Step response", color: "#1b5f7f" },
              ]}
            />
          ) : (
            <DualAxisChart
              data={frequencyResponse.data}
              xKey="omega"
              xLabel="ω (rad/s)"
              upperLabel="magnitude (dB)"
              lowerLabel="phase (deg)"
              xScale="log"
              annotations={
                cutoffAnnotation
                  ? [
                      {
                        x: cutoffAnnotation,
                        label: "Characteristic ω",
                      },
                    ]
                  : []
              }
              upperSeries={[
                { key: "magnitude", label: "Magnitude", color: "#1b5f7f" },
                {
                  key: "asymptoteMagnitude",
                  label: "Asymptote",
                  color: "#c46c1e",
                  strokeDasharray: "6 4",
                },
              ]}
              lowerSeries={[
                { key: "phase", label: "Phase", color: "#1b5f7f" },
                {
                  key: "asymptotePhase",
                  label: "Approximate phase",
                  color: "#c46c1e",
                  strokeDasharray: "6 4",
                },
              ]}
            />
          )}

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">Settling behavior</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Settling time:{" "}
                {metrics.settlingTime
                  ? `${formatEngineeringNumber(metrics.settlingTime)} s`
                  : "not applicable"}
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">Overshoot</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {formatEngineeringNumber(metrics.overshootPercent)}% predicted for the current damping.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">Frequency cue</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                The magnitude plot bends near the pole or resonant frequency where the circuit starts reacting strongly to sinusoidal input.
              </p>
            </div>
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Time and frequency are the same system",
              text: "A slow, smooth step response usually pairs with an early roll-off in the Bode plot. Both are different views of the same transfer behavior.",
            },
            {
              label: "R sets damping",
              text: "Increasing resistance damps an RLC response, reducing overshoot and lowering Q. In RC and RL cases, resistance directly changes the single time constant.",
            },
            {
              label: "Resonance is a tradeoff",
              text: "A higher-Q RLC circuit can feel sharper in frequency response but more oscillatory in the time domain. That tradeoff is central in filters and control-adjacent circuit design.",
            },
          ]}
        />
      }
    />
  );
}
