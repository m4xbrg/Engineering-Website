"use client";

import { useMemo, useState } from "react";

import { ControlPanel } from "@/components/tools/ControlPanel";
import { FormulaDisplay } from "@/components/tools/FormulaDisplay";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { PhasorDiagram } from "@/components/tools/PhasorDiagram";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { ModeSwitch } from "@/components/tools/ModeSwitch";
import { ParameterSlider } from "@/components/tools/ParameterSlider";
import { analyzeACCircuit, type ACCircuitTopology } from "@/lib/math";
import { formatEngineeringNumber } from "@/lib/utils/format";

function complexToRectangular(re: number, im: number) {
  const sign = im >= 0 ? "+" : "-";
  return `${formatEngineeringNumber(re)} ${sign} j${formatEngineeringNumber(Math.abs(im))}`;
}

export default function PhasorCalcTool() {
  const [topology, setTopology] = useState<ACCircuitTopology>("series");
  const [resistance, setResistance] = useState(60);
  const [inductanceMilliHenry, setInductanceMilliHenry] = useState(35);
  const [capacitanceMicroFarad, setCapacitanceMicroFarad] = useState(14);
  const [voltageRms, setVoltageRms] = useState(120);
  const [frequencyHz, setFrequencyHz] = useState(60);

  const analysis = useMemo(
    () =>
      analyzeACCircuit({
        topology,
        resistance,
        inductance: inductanceMilliHenry / 1000,
        capacitance: capacitanceMicroFarad / 1_000_000,
        voltageRms,
        frequencyHz,
      }),
    [
      topology,
      resistance,
      inductanceMilliHenry,
      capacitanceMicroFarad,
      voltageRms,
      frequencyHz,
    ],
  );

  const vectors =
    topology === "series"
      ? [
          { label: "V", magnitude: analysis.sourceVoltage.magnitude, angleDeg: 0, color: "#1b5f7f" },
          { label: "I", magnitude: analysis.current.magnitude * 40, angleDeg: analysis.current.angleDeg, color: "#c46c1e" },
        ]
      : [
          { label: "V", magnitude: analysis.sourceVoltage.magnitude, angleDeg: 0, color: "#1b5f7f" },
          { label: "Iₜ", magnitude: analysis.current.magnitude * 20, angleDeg: analysis.current.angleDeg, color: "#c46c1e" },
        ];

  return (
    <ToolWorkspace
      controls={
        <ControlPanel description="Compare series and parallel RLC AC behavior using RMS source values. The calculator keeps impedance, power, and phasor relationships visible together.">
          <ModeSwitch
            label="Topology"
            value={topology}
            onChange={setTopology}
            options={[
              { value: "series", label: "Series RLC" },
              { value: "parallel", label: "Parallel RLC" },
            ]}
          />
          <ParameterSlider
            label="Resistance"
            value={resistance}
            min={1}
            max={200}
            step={1}
            unit="Ω"
            onChange={setResistance}
          />
          <ParameterSlider
            label="Inductance"
            value={inductanceMilliHenry}
            min={1}
            max={100}
            step={1}
            unit="mH"
            onChange={setInductanceMilliHenry}
          />
          <ParameterSlider
            label="Capacitance"
            value={capacitanceMicroFarad}
            min={1}
            max={60}
            step={1}
            unit="μF"
            onChange={setCapacitanceMicroFarad}
          />
          <ParameterSlider
            label="Source voltage"
            value={voltageRms}
            min={10}
            max={240}
            step={5}
            unit="V RMS"
            onChange={setVoltageRms}
          />
          <ParameterSlider
            label="Frequency"
            value={frequencyHz}
            min={10}
            max={500}
            step={5}
            unit="Hz"
            onChange={setFrequencyHz}
          />
        </ControlPanel>
      }
      results={
        <ResultsStrip
          items={[
            {
              label: "Impedance |Z|",
              value: `${formatEngineeringNumber(analysis.impedance.magnitude)} Ω`,
              detail: `${formatEngineeringNumber(analysis.impedance.angleDeg)}°`,
            },
            {
              label: "Current",
              value: `${formatEngineeringNumber(analysis.current.magnitude)} A`,
              detail: `${formatEngineeringNumber(analysis.current.angleDeg)}°`,
            },
            {
              label: "Real power",
              value: `${formatEngineeringNumber(analysis.powers.real)} W`,
              detail: `${analysis.powers.powerFactorMode} PF`,
            },
            {
              label: "Power factor",
              value: formatEngineeringNumber(analysis.powers.powerFactor),
              detail: analysis.powers.powerFactorMode,
            },
          ]}
        />
      }
      output={
        <div className="space-y-6">
          <FormulaDisplay
            expression={
              topology === "series"
                ? "Z = R + j(ωL - 1 / ωC)"
                : "Y = 1/R + 1/(jωL) + jωC, then Z = 1/Y"
            }
            substituted={`Z = ${complexToRectangular(
              analysis.impedance.rectangular.re,
              analysis.impedance.rectangular.im,
            )} Ω = ${formatEngineeringNumber(analysis.impedance.magnitude)} ∠ ${formatEngineeringNumber(
              analysis.impedance.angleDeg,
            )}°`}
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),18rem]">
            <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(242,235,225,0.92))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Phasor view
              </p>
              <PhasorDiagram vectors={vectors} />
            </div>

            <div className="rounded-[1.75rem] border border-border bg-white/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Derived quantities
              </p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span>Rectangular Z</span>
                  <span className="font-medium">
                    {complexToRectangular(
                      analysis.impedance.rectangular.re,
                      analysis.impedance.rectangular.im,
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Apparent power</span>
                  <span className="font-medium">
                    {formatEngineeringNumber(analysis.powers.apparent)} VA
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Reactive power</span>
                  <span className="font-medium">
                    {formatEngineeringNumber(analysis.powers.reactive)} VAR
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Resonant frequency</span>
                  <span className="font-medium">
                    {formatEngineeringNumber(analysis.resonanceHz)} Hz
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">Component voltages</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                V_R = {formatEngineeringNumber(analysis.componentVoltages.resistor)} V, V_L ={" "}
                {formatEngineeringNumber(analysis.componentVoltages.inductor)} V, V_C ={" "}
                {formatEngineeringNumber(analysis.componentVoltages.capacitor)} V.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">Component currents</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                I_R = {formatEngineeringNumber(analysis.componentCurrents.resistor)} A, I_L ={" "}
                {formatEngineeringNumber(analysis.componentCurrents.inductor)} A, I_C ={" "}
                {formatEngineeringNumber(analysis.componentCurrents.capacitor)} A.
              </p>
            </div>
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Impedance is directional",
              text: "In AC circuits, opposition to current has both magnitude and angle. That angle is what turns a scalar Ohm's law problem into a phasor problem.",
            },
            {
              label: "Power splits three ways",
              text: "Real power does work, reactive power shuttles energy back and forth, and apparent power is the overall VA burden seen by the source.",
            },
            {
              label: "Resonance aligns the fight",
              text: "At resonance, inductive and capacitive effects cancel each other. What remains depends strongly on whether the components are arranged in series or in parallel.",
            },
          ]}
        />
      }
    />
  );
}
