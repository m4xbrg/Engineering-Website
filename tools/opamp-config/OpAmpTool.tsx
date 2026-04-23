"use client";

import { useMemo, useState } from "react";

import { ControlPanel } from "@/components/tools/ControlPanel";
import { FormulaDisplay } from "@/components/tools/FormulaDisplay";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { ModeSwitch } from "@/components/tools/ModeSwitch";
import { OpAmpSchematic } from "@/components/tools/OpAmpSchematic";
import { ParameterSlider } from "@/components/tools/ParameterSlider";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { analyzeOpAmp, type OpAmpMode } from "@/lib/math";
import { formatEngineeringNumber } from "@/lib/utils/format";

export default function OpAmpTool() {
  const [mode, setMode] = useState<OpAmpMode>("inverting");
  const [inputVoltage, setInputVoltage] = useState(0.8);
  const [referenceVoltage, setReferenceVoltage] = useState(0.35);
  const [inputResistanceKiloOhms, setInputResistanceKiloOhms] = useState(10);
  const [feedbackResistanceKiloOhms, setFeedbackResistanceKiloOhms] = useState(47);
  const [capacitanceNanoFarads, setCapacitanceNanoFarads] = useState(10);
  const [signalFrequencyHz, setSignalFrequencyHz] = useState(800);
  const [gainBandwidthMHz, setGainBandwidthMHz] = useState(1.2);

  const analysis = useMemo(
    () =>
      analyzeOpAmp({
        mode,
        inputVoltage,
        secondaryInputVoltage: 0,
        referenceVoltage,
        inputResistanceOhms: inputResistanceKiloOhms * 1000,
        feedbackResistanceOhms: feedbackResistanceKiloOhms * 1000,
        capacitanceFarads: capacitanceNanoFarads * 1e-9,
        signalFrequencyHz,
        gainBandwidthHz: gainBandwidthMHz * 1_000_000,
        positiveRailVoltage: 12,
        negativeRailVoltage: -12,
      }),
    [
      mode,
      inputVoltage,
      referenceVoltage,
      inputResistanceKiloOhms,
      feedbackResistanceKiloOhms,
      capacitanceNanoFarads,
      signalFrequencyHz,
      gainBandwidthMHz,
    ],
  );

  return (
    <ToolWorkspace
      controls={
        <ControlPanel description="Switch among common op-amp topologies, adjust the feedback network, and watch the transfer relationship update in the same workspace pattern as the rest of the Labs layer.">
          <ModeSwitch
            label="Configuration"
            value={mode}
            onChange={setMode}
            options={[
              { value: "inverting", label: "Inverting" },
              { value: "non-inverting", label: "Non-inverting" },
              { value: "follower", label: "Follower" },
              { value: "integrator", label: "Integrator" },
              { value: "differentiator", label: "Differentiator" },
              { value: "comparator", label: "Comparator" },
            ]}
          />
          <ParameterSlider
            label="Input voltage"
            value={inputVoltage}
            min={-2}
            max={2}
            step={0.05}
            unit="V"
            onChange={setInputVoltage}
          />
          {mode === "comparator" ? (
            <ParameterSlider
              label="Reference voltage"
              value={referenceVoltage}
              min={-2}
              max={2}
              step={0.05}
              unit="V"
              onChange={setReferenceVoltage}
            />
          ) : null}
          {mode !== "follower" && mode !== "comparator" ? (
            <ParameterSlider
              label="Input resistor"
              value={inputResistanceKiloOhms}
              min={1}
              max={100}
              step={1}
              unit="kOhm"
              onChange={setInputResistanceKiloOhms}
            />
          ) : null}
          {mode === "inverting" ||
          mode === "non-inverting" ||
          mode === "differentiator" ? (
            <ParameterSlider
              label="Feedback resistor"
              value={feedbackResistanceKiloOhms}
              min={1}
              max={220}
              step={1}
              unit="kOhm"
              onChange={setFeedbackResistanceKiloOhms}
            />
          ) : null}
          {mode === "integrator" || mode === "differentiator" ? (
            <ParameterSlider
              label="Capacitor"
              value={capacitanceNanoFarads}
              min={1}
              max={220}
              step={1}
              unit="nF"
              onChange={setCapacitanceNanoFarads}
            />
          ) : null}
          {mode === "integrator" || mode === "differentiator" ? (
            <ParameterSlider
              label="Signal frequency"
              value={signalFrequencyHz}
              min={10}
              max={10000}
              step={10}
              unit="Hz"
              onChange={setSignalFrequencyHz}
            />
          ) : null}
          <ParameterSlider
            label="Gain-bandwidth"
            value={gainBandwidthMHz}
            min={0.2}
            max={10}
            step={0.1}
            unit="MHz"
            onChange={setGainBandwidthMHz}
          />
        </ControlPanel>
      }
      results={
        <ResultsStrip
          items={[
            {
              label: mode === "comparator" ? "Output state" : "Magnitude gain",
              value:
                mode === "comparator"
                  ? analysis.stateLabel
                  : formatEngineeringNumber(analysis.magnitudeGain),
              detail:
                analysis.closedLoopGain !== null
                  ? `Closed-loop gain ${formatEngineeringNumber(analysis.closedLoopGain)}`
                  : undefined,
            },
            {
              label: "Output",
              value: `${formatEngineeringNumber(analysis.outputVoltage)} V`,
              detail: "Clamped to +/-12 V rails",
            },
            {
              label: "Bandwidth",
              value: `${formatEngineeringNumber(analysis.bandwidthHz)} Hz`,
              detail:
                mode === "integrator" || mode === "differentiator"
                  ? `Corner ${formatEngineeringNumber(analysis.cornerFrequencyHz)} Hz`
                  : undefined,
            },
            {
              label: "Phase cue",
              value: `${formatEngineeringNumber(analysis.phaseDeg)} deg`,
              detail:
                mode === "comparator"
                  ? "Open-loop switching action"
                  : `${analysis.stateLabel} behavior`,
            },
          ]}
        />
      }
      output={
        <div className="space-y-6">
          <FormulaDisplay
            expression={analysis.transferExpression}
            substituted={analysis.outputExpression}
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),18rem]">
            <OpAmpSchematic
              mode={mode}
              inputLabel="Vin"
              referenceLabel="Vref"
              resistorInputLabel={`Rin ${formatEngineeringNumber(inputResistanceKiloOhms)} kOhm`}
              resistorFeedbackLabel={`Rf ${formatEngineeringNumber(feedbackResistanceKiloOhms)} kOhm`}
              capacitorLabel={`C ${formatEngineeringNumber(capacitanceNanoFarads)} nF`}
            />

            <div className="rounded-[1.75rem] border border-border bg-white/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Configuration summary
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span>Mode</span>
                  <span className="font-medium">{mode}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Input</span>
                  <span className="font-medium">
                    {formatEngineeringNumber(inputVoltage)} V
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Reference</span>
                  <span className="font-medium">
                    {formatEngineeringNumber(referenceVoltage)} V
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>GBW</span>
                  <span className="font-medium">
                    {formatEngineeringNumber(gainBandwidthMHz)} MHz
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">Why the bandwidth changes</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Closed-loop gain and usable bandwidth trade against each other. Pushing the gain higher
                usually pulls the available bandwidth lower because the gain-bandwidth product stays
                roughly bounded.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">What the feedback is doing</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Negative feedback stabilizes the transfer relationship and makes the resistor ratio matter
                more than the raw open-loop gain. Comparator mode removes that stabilizing loop and turns
                the device into a threshold detector instead.
              </p>
            </div>
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Feedback defines the job",
              text: "The same op-amp core can amplify, buffer, integrate, differentiate, or switch. The surrounding network is what assigns the role.",
            },
            {
              label: "Gain costs bandwidth",
              text: "For linear closed-loop modes, higher gain tends to narrow the usable frequency range. That tradeoff shows up constantly in real analog design.",
            },
            {
              label: "Comparator mode is different",
              text: "A comparator is not trying to stay linear. It is trying to decide which side of a threshold the input lives on and then drive hard to a rail.",
            },
          ]}
        />
      }
    />
  );
}
