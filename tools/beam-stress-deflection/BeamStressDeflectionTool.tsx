"use client";

import { useMemo, useState } from "react";

import { LineChart } from "@/components/charts/LineChart";
import { BeamDiagram } from "@/components/tools/BeamDiagram";
import { ControlPanel } from "@/components/tools/ControlPanel";
import { FormulaDisplay } from "@/components/tools/FormulaDisplay";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { ModeSwitch } from "@/components/tools/ModeSwitch";
import { ParameterSlider } from "@/components/tools/ParameterSlider";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import {
  analyzeBeam,
  type BeamLoadType,
  type BeamSupportType,
} from "@/lib/math";
import { formatEngineeringNumber } from "@/lib/utils/format";

export default function BeamStressDeflectionTool() {
  const [supportType, setSupportType] = useState<BeamSupportType>("simply-supported");
  const [loadType, setLoadType] = useState<BeamLoadType>("point");
  const [lengthMeters, setLengthMeters] = useState(4);
  const [pointLoadKilonewtons, setPointLoadKilonewtons] = useState(18);
  const [uniformLoadKilonewtonsPerMeter, setUniformLoadKilonewtonsPerMeter] = useState(8);
  const [pointPositionRatio, setPointPositionRatio] = useState(0.5);
  const [elasticModulusGPa, setElasticModulusGPa] = useState(200);
  const [widthMillimeters, setWidthMillimeters] = useState(100);
  const [heightMillimeters, setHeightMillimeters] = useState(240);

  const analysis = useMemo(
    () =>
      analyzeBeam({
        supportType,
        loadType,
        lengthMeters,
        elasticModulusPa: elasticModulusGPa * 1e9,
        widthMeters: widthMillimeters / 1000,
        heightMeters: heightMillimeters / 1000,
        pointLoadNewton: pointLoadKilonewtons * 1000,
        uniformLoadNewtonPerMeter: uniformLoadKilonewtonsPerMeter * 1000,
        pointPositionMeters: lengthMeters * pointPositionRatio,
      }),
    [
      supportType,
      loadType,
      lengthMeters,
      elasticModulusGPa,
      widthMillimeters,
      heightMillimeters,
      pointLoadKilonewtons,
      uniformLoadKilonewtonsPerMeter,
      pointPositionRatio,
    ],
  );

  const loadLabel =
    loadType === "point"
      ? `${formatEngineeringNumber(pointLoadKilonewtons)} kN`
      : `${formatEngineeringNumber(uniformLoadKilonewtonsPerMeter)} kN/m`;

  return (
    <ToolWorkspace
      controls={
        <ControlPanel description="Compare common beam boundary conditions, apply either a point load or a full-span distributed load, and inspect reactions, internal diagrams, deflection, and bending stress in one place.">
          <ModeSwitch
            label="Support condition"
            value={supportType}
            onChange={setSupportType}
            options={[
              { value: "simply-supported", label: "Simply supported" },
              { value: "cantilever", label: "Cantilever" },
              { value: "fixed-fixed", label: "Fixed-fixed" },
            ]}
          />
          <ModeSwitch
            label="Load case"
            value={loadType}
            onChange={setLoadType}
            options={[
              { value: "point", label: "Point load" },
              { value: "udl", label: "Full-span UDL" },
            ]}
          />
          <ParameterSlider
            label="Beam length"
            value={lengthMeters}
            min={1}
            max={12}
            step={0.1}
            unit="m"
            onChange={setLengthMeters}
          />
          {loadType === "point" ? (
            <>
              <ParameterSlider
                label="Point load"
                value={pointLoadKilonewtons}
                min={1}
                max={60}
                step={0.5}
                unit="kN"
                onChange={setPointLoadKilonewtons}
              />
              <ParameterSlider
                label="Load position"
                value={pointPositionRatio}
                min={0.15}
                max={0.85}
                step={0.01}
                unit="L"
                onChange={setPointPositionRatio}
              />
            </>
          ) : (
            <ParameterSlider
              label="Uniform load"
              value={uniformLoadKilonewtonsPerMeter}
              min={0.5}
              max={30}
              step={0.5}
              unit="kN/m"
              onChange={setUniformLoadKilonewtonsPerMeter}
            />
          )}
          <ParameterSlider
            label="Elastic modulus"
            value={elasticModulusGPa}
            min={50}
            max={220}
            step={5}
            unit="GPa"
            onChange={setElasticModulusGPa}
          />
          <ParameterSlider
            label="Section width"
            value={widthMillimeters}
            min={40}
            max={300}
            step={5}
            unit="mm"
            onChange={setWidthMillimeters}
          />
          <ParameterSlider
            label="Section height"
            value={heightMillimeters}
            min={60}
            max={500}
            step={5}
            unit="mm"
            onChange={setHeightMillimeters}
          />
        </ControlPanel>
      }
      results={
        <ResultsStrip
          items={[
            {
              label: "Left reaction",
              value: `${formatEngineeringNumber(analysis.reactions.leftReactionNewton / 1000)} kN`,
              detail:
                analysis.reactions.leftMomentNewtonMeters > 0
                  ? `${formatEngineeringNumber(analysis.reactions.leftMomentNewtonMeters / 1000)} kN m fixed moment`
                  : undefined,
            },
            {
              label: "Max moment",
              value: `${formatEngineeringNumber(analysis.maxMoment.value)} kN m`,
              detail: `at x = ${formatEngineeringNumber(analysis.maxMoment.xMeters)} m`,
            },
            {
              label: "Max deflection",
              value: `${formatEngineeringNumber(analysis.maxDeflection.value)} mm`,
              detail: `at x = ${formatEngineeringNumber(analysis.maxDeflection.xMeters)} m`,
            },
            {
              label: "Max bending stress",
              value: `${formatEngineeringNumber(analysis.maxStress.value)} MPa`,
              detail: `at x = ${formatEngineeringNumber(analysis.maxStress.xMeters)} m`,
            },
          ]}
        />
      }
      output={
        <div className="space-y-6">
          <FormulaDisplay
            expression="sigma = M c / I and E I v'''' = q(x)"
            substituted={
              supportType === "fixed-fixed" && loadType === "point"
                ? "Fixed-fixed point load is evaluated as the standard centered case in this MVP pass."
                : `Section modulus ${formatEngineeringNumber(analysis.sectionModulus)} m^3`
            }
          />

          <BeamDiagram
            supportType={supportType}
            loadType={loadType}
            pointPositionRatio={
              supportType === "fixed-fixed" && loadType === "point"
                ? 0.5
                : pointPositionRatio
            }
            loadLabel={loadLabel}
          />

          <div className="grid gap-4 xl:grid-cols-2">
            <LineChart
              data={analysis.data}
              xKey="xMeters"
              xLabel="x (m)"
              yLabel="shear (kN)"
              referencePoints={[
                {
                  x: analysis.maxShear.xMeters,
                  y: analysis.maxShear.value,
                  label: "Vmax",
                  color: "#c46c1e",
                },
              ]}
              series={[{ key: "shearKilonewtons", label: "Shear", color: "#1b5f7f" }]}
            />
            <LineChart
              data={analysis.data}
              xKey="xMeters"
              xLabel="x (m)"
              yLabel="moment (kN m)"
              referencePoints={[
                {
                  x: analysis.maxMoment.xMeters,
                  y: analysis.maxMoment.value,
                  label: "Mmax",
                  color: "#c46c1e",
                },
              ]}
              series={[
                { key: "momentKilonewtonMeters", label: "Moment", color: "#1b5f7f" },
              ]}
            />
            <LineChart
              data={analysis.data}
              xKey="xMeters"
              xLabel="x (m)"
              yLabel="deflection (mm)"
              referencePoints={[
                {
                  x: analysis.maxDeflection.xMeters,
                  y: analysis.maxDeflection.value,
                  label: "dmax",
                  color: "#c46c1e",
                },
              ]}
              series={[
                { key: "deflectionMillimeters", label: "Deflection", color: "#1b5f7f" },
              ]}
            />
            <LineChart
              data={analysis.data}
              xKey="xMeters"
              xLabel="x (m)"
              yLabel="stress (MPa)"
              referencePoints={[
                {
                  x: analysis.maxStress.xMeters,
                  y: analysis.maxStress.value,
                  label: "smax",
                  color: "#c46c1e",
                },
              ]}
              series={[
                { key: "stressMegaPascals", label: "Bending stress", color: "#1b5f7f" },
              ]}
            />
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Boundary conditions matter first",
              text: "The same load can produce very different moments and deflections depending on whether the beam is simply supported, cantilevered, or fixed at both ends.",
            },
            {
              label: "Stiffness comes from geometry quickly",
              text: "Because the second moment of area scales with height cubed for a rectangular section, making a beam deeper is often more effective than simply making it wider.",
            },
            {
              label: "Stress and deflection are related but different",
              text: "A beam can satisfy a stress limit and still deflect too much for serviceability. Real design work almost always checks both strength and stiffness.",
            },
          ]}
        />
      }
    />
  );
}
