"use client";

import { useMemo, useState } from "react";

import { ControlPanel } from "@/components/tools/ControlPanel";
import { ForceDiagram } from "@/components/tools/ForceDiagram";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { analyzeForceSystem, type AppliedForce } from "@/lib/math";
import { formatEngineeringNumber } from "@/lib/utils/format";

function ForceControlCard({
  force,
  onChange,
  onRemove,
  canRemove,
}: {
  force: AppliedForce;
  onChange: (next: AppliedForce) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-white/85 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold">{force.label}</p>
        {canRemove ? (
          <button
            type="button"
            onClick={onRemove}
            className="rounded-full border border-border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]"
          >
            Remove
          </button>
        ) : null}
      </div>

      <div className="mt-4 grid gap-4">
        {[
          {
            label: "Magnitude",
            value: force.magnitude,
            min: 0,
            max: 20,
            step: 0.5,
            unit: "N",
            update: (value: number) => onChange({ ...force, magnitude: value }),
          },
          {
            label: "Angle",
            value: force.angleDeg,
            min: -180,
            max: 180,
            step: 5,
            unit: "deg",
            update: (value: number) => onChange({ ...force, angleDeg: value }),
          },
          {
            label: "x position",
            value: force.x,
            min: -1.5,
            max: 1.5,
            step: 0.1,
            unit: "m",
            update: (value: number) => onChange({ ...force, x: value }),
          },
          {
            label: "y position",
            value: force.y,
            min: -1,
            max: 1,
            step: 0.1,
            unit: "m",
            update: (value: number) => onChange({ ...force, y: value }),
          },
        ].map((field) => (
          <label key={field.label} className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium">{field.label}</span>
              <span className="text-sm text-muted-foreground">
                {field.value} {field.unit}
              </span>
            </div>
            <input
              type="range"
              value={field.value}
              min={field.min}
              max={field.max}
              step={field.step}
              onChange={(event) => field.update(Number(event.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-accent"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FBDTool() {
  const [forces, setForces] = useState<AppliedForce[]>([
    {
      id: "force-1",
      label: "F1",
      magnitude: 8,
      angleDeg: 140,
      x: -0.8,
      y: 0.4,
    },
    {
      id: "force-2",
      label: "F2",
      magnitude: 6,
      angleDeg: -55,
      x: 0.9,
      y: 0.2,
    },
  ]);
  const [coupleMomentNm, setCoupleMomentNm] = useState(0);

  const analysis = useMemo(
    () => analyzeForceSystem(forces, coupleMomentNm),
    [forces, coupleMomentNm],
  );

  function updateForce(nextForce: AppliedForce) {
    setForces((current) =>
      current.map((force) => (force.id === nextForce.id ? nextForce : force)),
    );
  }

  function addForce() {
    setForces((current) => {
      if (current.length >= 4) {
        return current;
      }

      return [
        ...current,
        {
          id: `force-${current.length + 1}`,
          label: `F${current.length + 1}`,
          magnitude: 5,
          angleDeg: 90,
          x: 0,
          y: 0.6 - current.length * 0.2,
        },
      ];
    });
  }

  function removeForce(forceId: string) {
    setForces((current) => current.filter((force) => force.id !== forceId));
  }

  return (
    <ToolWorkspace
      controls={
        <ControlPanel
          description="Build a 2D free body diagram by placing forces on a single rigid body, then inspect the net force, net moment, and equilibrium condition in real time."
          actions={
            <button
              type="button"
              onClick={addForce}
              className="rounded-full border border-border px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em]"
            >
              Add force
            </button>
          }
        >
          <label className="rounded-2xl border border-border bg-white/85 p-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium">Applied couple moment</span>
              <span className="text-sm text-muted-foreground">
                {coupleMomentNm} N m
              </span>
            </div>
            <input
              type="range"
              value={coupleMomentNm}
              min={-20}
              max={20}
              step={0.5}
              onChange={(event) => setCoupleMomentNm(Number(event.target.value))}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-muted accent-accent"
            />
          </label>

          {forces.map((force) => (
            <ForceControlCard
              key={force.id}
              force={force}
              onChange={updateForce}
              onRemove={() => removeForce(force.id)}
              canRemove={forces.length > 1}
            />
          ))}
        </ControlPanel>
      }
      results={
        <ResultsStrip
          items={[
            {
              label: "Net Fx",
              value: `${formatEngineeringNumber(analysis.netFx)} N`,
            },
            {
              label: "Net Fy",
              value: `${formatEngineeringNumber(analysis.netFy)} N`,
            },
            {
              label: "Net moment",
              value: `${formatEngineeringNumber(analysis.netMomentNm)} N m`,
            },
            {
              label: "Equilibrium",
              value: analysis.isBalanced ? "Balanced" : "Not balanced",
              detail: `${formatEngineeringNumber(analysis.resultantMagnitude)} N resultant`,
            },
          ]}
        />
      }
      output={
        <div className="space-y-6">
          <ForceDiagram
            forces={forces}
            coupleMomentNm={coupleMomentNm}
            resultant={{
              magnitude: analysis.resultantMagnitude,
              angleDeg: analysis.resultantAngleDeg,
            }}
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr),18rem]">
            <div className="rounded-2xl border border-border bg-white/85 p-4">
              <p className="text-sm font-semibold">Resolved force breakdown</p>
              <div className="mt-4 space-y-3">
                {analysis.resolvedForces.map((force) => (
                  <div
                    key={force.id}
                    className="grid gap-2 rounded-2xl border border-border bg-muted/35 p-3 text-sm sm:grid-cols-4"
                  >
                    <span className="font-medium">{force.label}</span>
                    <span>Fx {formatEngineeringNumber(force.fx)} N</span>
                    <span>Fy {formatEngineeringNumber(force.fy)} N</span>
                    <span>M {formatEngineeringNumber(force.momentNm)} N m</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-white/90 p-4">
              <p className="text-sm font-semibold">Resultant vector</p>
              <div className="mt-4 space-y-3 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <span>Magnitude</span>
                  <span className="font-medium">
                    {formatEngineeringNumber(analysis.resultantMagnitude)} N
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Angle</span>
                  <span className="font-medium">
                    {formatEngineeringNumber(analysis.resultantAngleDeg)} deg
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span>Force count</span>
                  <span className="font-medium">{forces.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Angles become components",
              text: "A force is easier to balance once it is split into x and y components. That is why free body diagrams almost always lead into component equations.",
            },
            {
              label: "Location changes the moment",
              text: "Two equal forces can create very different rotational effects if they act at different points. The force line of action matters just as much as the magnitude.",
            },
            {
              label: "Equilibrium needs all checks",
              text: "A body can have zero net force but still rotate, or have zero net moment but still translate. Static equilibrium requires force balance and moment balance together.",
            },
          ]}
        />
      }
    />
  );
}
