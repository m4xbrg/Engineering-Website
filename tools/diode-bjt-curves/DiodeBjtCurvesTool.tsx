"use client";

import { useMemo, useState } from "react";

import { LineChart } from "@/components/charts/LineChart";
import { ControlPanel } from "@/components/tools/ControlPanel";
import { FormulaDisplay } from "@/components/tools/FormulaDisplay";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { ModeSwitch } from "@/components/tools/ModeSwitch";
import { ParameterSlider } from "@/components/tools/ParameterSlider";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { generateBjtCurves, generateDiodeCurve } from "@/lib/math";
import { formatEngineeringNumber } from "@/lib/utils/format";

type DeviceMode = "diode" | "bjt";

const palette = ["#1b5f7f", "#3c7a97", "#5e94ad", "#87afc2", "#b0cad7"];

export default function DiodeBjtCurvesTool() {
  const [mode, setMode] = useState<DeviceMode>("diode");
  const [saturationCurrentNanoAmp, setSaturationCurrentNanoAmp] = useState(2);
  const [idealityFactor, setIdealityFactor] = useState(1.8);
  const [thermalVoltageMilliVolt, setThermalVoltageMilliVolt] = useState(26);
  const [diodeSupplyVoltage, setDiodeSupplyVoltage] = useState(5);
  const [loadResistanceKiloOhms, setLoadResistanceKiloOhms] = useState(1);
  const [beta, setBeta] = useState(120);
  const [baseCurrentMicroAmp, setBaseCurrentMicroAmp] = useState(40);
  const [collectorSupplyVoltage, setCollectorSupplyVoltage] = useState(12);
  const [collectorResistanceKiloOhms, setCollectorResistanceKiloOhms] = useState(1);

  const diode = useMemo(
    () =>
      generateDiodeCurve({
        saturationCurrentNanoAmp,
        idealityFactor,
        thermalVoltageMilliVolt,
        supplyVoltage: diodeSupplyVoltage,
        loadResistanceOhms: loadResistanceKiloOhms * 1000,
      }),
    [
      saturationCurrentNanoAmp,
      idealityFactor,
      thermalVoltageMilliVolt,
      diodeSupplyVoltage,
      loadResistanceKiloOhms,
    ],
  );

  const bjt = useMemo(
    () =>
      generateBjtCurves({
        beta,
        selectedBaseCurrentMicroAmp: baseCurrentMicroAmp,
        collectorResistanceOhms: collectorResistanceKiloOhms * 1000,
        supplyVoltage: collectorSupplyVoltage,
      }),
    [beta, baseCurrentMicroAmp, collectorResistanceKiloOhms, collectorSupplyVoltage],
  );

  return (
    <ToolWorkspace
      controls={
        <ControlPanel description="Plot device characteristic curves, overlay a simple load line, and inspect the operating point that bridges semiconductor behavior back into circuit design.">
          <ModeSwitch
            label="Device family"
            value={mode}
            onChange={setMode}
            options={[
              { value: "diode", label: "Diode I-V" },
              { value: "bjt", label: "BJT CE curves" },
            ]}
          />

          {mode === "diode" ? (
            <>
              <ParameterSlider
                label="Saturation current"
                value={saturationCurrentNanoAmp}
                min={0.1}
                max={20}
                step={0.1}
                unit="nA"
                onChange={setSaturationCurrentNanoAmp}
              />
              <ParameterSlider
                label="Ideality factor"
                value={idealityFactor}
                min={1}
                max={2.2}
                step={0.05}
                onChange={setIdealityFactor}
              />
              <ParameterSlider
                label="Thermal voltage"
                value={thermalVoltageMilliVolt}
                min={20}
                max={30}
                step={0.5}
                unit="mV"
                onChange={setThermalVoltageMilliVolt}
              />
              <ParameterSlider
                label="Supply voltage"
                value={diodeSupplyVoltage}
                min={1}
                max={12}
                step={0.1}
                unit="V"
                onChange={setDiodeSupplyVoltage}
              />
              <ParameterSlider
                label="Load resistor"
                value={loadResistanceKiloOhms}
                min={0.1}
                max={10}
                step={0.1}
                unit="kOhm"
                onChange={setLoadResistanceKiloOhms}
              />
            </>
          ) : (
            <>
              <ParameterSlider
                label="Current gain beta"
                value={beta}
                min={40}
                max={240}
                step={5}
                onChange={setBeta}
              />
              <ParameterSlider
                label="Selected base current"
                value={baseCurrentMicroAmp}
                min={5}
                max={120}
                step={1}
                unit="uA"
                onChange={setBaseCurrentMicroAmp}
              />
              <ParameterSlider
                label="Collector supply"
                value={collectorSupplyVoltage}
                min={3}
                max={18}
                step={0.5}
                unit="V"
                onChange={setCollectorSupplyVoltage}
              />
              <ParameterSlider
                label="Collector resistor"
                value={collectorResistanceKiloOhms}
                min={0.2}
                max={10}
                step={0.1}
                unit="kOhm"
                onChange={setCollectorResistanceKiloOhms}
              />
            </>
          )}
        </ControlPanel>
      }
      results={
        <ResultsStrip
          items={
            mode === "diode"
              ? [
                  {
                    label: "Q-point voltage",
                    value: `${formatEngineeringNumber(diode.qPoint.voltage)} V`,
                  },
                  {
                    label: "Q-point current",
                    value: `${formatEngineeringNumber(diode.qPoint.currentMilliAmp)} mA`,
                  },
                  {
                    label: "1 mA knee",
                    value: `${formatEngineeringNumber(diode.thresholdVoltage)} V`,
                  },
                  {
                    label: "Load line",
                    value: `${formatEngineeringNumber(diodeSupplyVoltage)} V / ${formatEngineeringNumber(loadResistanceKiloOhms)} kOhm`,
                  },
                ]
              : [
                  {
                    label: "Q-point Vce",
                    value: `${formatEngineeringNumber(bjt.qPoint.voltage)} V`,
                  },
                  {
                    label: "Q-point Ic",
                    value: `${formatEngineeringNumber(bjt.qPoint.currentMilliAmp)} mA`,
                  },
                  {
                    label: "Operating region",
                    value: bjt.operatingRegion,
                  },
                  {
                    label: "Selected Ib",
                    value: `${formatEngineeringNumber(baseCurrentMicroAmp)} uA`,
                  },
                ]
          }
        />
      }
      output={
        <div className="space-y-6">
          <FormulaDisplay
            expression={
              mode === "diode"
                ? "Id = Is (exp(Vd / (n Vt)) - 1)"
                : "Ic ~= beta Ib in active region, limited by the collector load line"
            }
            substituted={
              mode === "diode"
                ? `Q-point near ${formatEngineeringNumber(diode.qPoint.voltage)} V and ${formatEngineeringNumber(diode.qPoint.currentMilliAmp)} mA`
                : `Q-point near ${formatEngineeringNumber(bjt.qPoint.voltage)} V and ${formatEngineeringNumber(bjt.qPoint.currentMilliAmp)} mA`
            }
          />

          {mode === "diode" ? (
            <LineChart
              data={diode.data}
              xKey="voltage"
              xLabel="diode voltage (V)"
              yLabel="current (mA)"
              yDomain={[0, "auto"]}
              referencePoints={[
                {
                  x: diode.qPoint.voltage,
                  y: diode.qPoint.currentMilliAmp,
                  label: "Q",
                  color: "#c46c1e",
                },
              ]}
              series={[
                { key: "diodeCurrentMilliAmp", label: "Device curve", color: "#1b5f7f" },
                { key: "loadLineMilliAmp", label: "Load line", color: "#c46c1e" },
              ]}
            />
          ) : (
            <LineChart
              data={bjt.data}
              xKey="voltage"
              xLabel="collector-emitter voltage Vce (V)"
              yLabel="collector current Ic (mA)"
              yDomain={[0, "auto"]}
              referencePoints={[
                {
                  x: bjt.qPoint.voltage,
                  y: bjt.qPoint.currentMilliAmp,
                  label: "Q",
                  color: "#c46c1e",
                },
              ]}
              series={[
                ...bjt.curves.map((curve, index) => ({
                  key: curve.key,
                  label: `Ib ${curve.label}`,
                  color: palette[index % palette.length],
                })),
                {
                  key: "loadLineMilliAmp",
                  label: "Load line",
                  color: "#c46c1e",
                  strokeDasharray: "6 4",
                },
              ]}
            />
          )}

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">Why the load line matters</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Device physics alone does not choose the operating point. The external resistor and supply
                constrain the circuit, and the intersection with the device curve is what sets the actual
                voltage and current.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">What to read from the plot</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                A diode knee shows when exponential conduction starts dominating. A BJT curve family shows
                how base current steers collector current until the transistor is forced into saturation by
                the load line.
              </p>
            </div>
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Curves explain the circuit",
              text: "Semiconductor behavior becomes much easier to reason about once you can see the nonlinear device curve and the linear load line in the same plot.",
            },
            {
              label: "Q-points are design choices",
              text: "Biasing is about choosing an operating point that leaves enough room for the signal to move without clipping or collapsing into the wrong region.",
            },
            {
              label: "Regions matter",
              text: "For BJTs, active, saturation, and cutoff are not abstract vocabulary. They are visible geometric zones in the Ic-Vce family and they correspond to very different circuit behavior.",
            },
          ]}
        />
      }
    />
  );
}
