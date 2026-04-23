"use client";

import { useMemo, useState } from "react";

import { ControlPanel } from "@/components/tools/ControlPanel";
import { InsightPanel } from "@/components/tools/InsightPanel";
import { ResultsStrip } from "@/components/tools/ResultsStrip";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import {
  buildTruthTable,
  evaluateLogicCircuit,
  type LogicGateType,
  type LogicSourceId,
  type LogicStage,
} from "@/lib/math";

const gateOptions: LogicGateType[] = ["AND", "OR", "NOT", "NAND", "NOR", "XOR", "XNOR"];
const sourceAvailability: Record<LogicStage["id"], LogicSourceId[]> = {
  G1: ["A", "B", "C"],
  G2: ["A", "B", "C", "G1"],
  G3: ["A", "B", "C", "G1", "G2"],
};

export default function LogicGateTool() {
  const [inputs, setInputs] = useState<Record<"A" | "B" | "C", number>>({
    A: 1,
    B: 0,
    C: 1,
  });
  const [stages, setStages] = useState<LogicStage[]>([
    { id: "G1", type: "XOR", inputA: "A", inputB: "B" },
    { id: "G2", type: "NOT", inputA: "C", inputB: "C" },
    { id: "G3", type: "AND", inputA: "G1", inputB: "G2" },
  ]);
  const [outputSource, setOutputSource] = useState<LogicSourceId>("G3");

  const evaluated = useMemo(
    () =>
      evaluateLogicCircuit({
        inputs,
        stages,
        outputSource,
      }),
    [inputs, stages, outputSource],
  );
  const truthTable = useMemo(
    () => buildTruthTable(stages, outputSource),
    [stages, outputSource],
  );

  return (
    <ToolWorkspace
      controls={
        <ControlPanel description="Configure a three-stage combinational circuit by choosing each gate type and where it draws its inputs from. The simulator updates the circuit state and truth table immediately.">
          <div className="grid gap-3 sm:grid-cols-3">
            {(["A", "B", "C"] as const).map((inputId) => (
              <button
                key={inputId}
                type="button"
                onClick={() =>
                  setInputs((current) => ({
                    ...current,
                    [inputId]: current[inputId] ? 0 : 1,
                  }))
                }
                className={`rounded-2xl border px-4 py-4 text-left transition-colors ${
                  inputs[inputId]
                    ? "border-transparent bg-accent text-white"
                    : "border-border bg-white/80 text-foreground"
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                  Input {inputId}
                </p>
                <p className="mt-2 text-3xl font-semibold">{inputs[inputId]}</p>
              </button>
            ))}
          </div>

          {stages.map((stage) => (
            <div key={stage.id} className="rounded-2xl border border-border bg-white/80 p-4">
              <p className="text-sm font-semibold">{stage.id}</p>
              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Gate type
                  </span>
                  <select
                    value={stage.type}
                    onChange={(event) =>
                      setStages((current) =>
                        current.map((candidate) =>
                          candidate.id === stage.id
                            ? {
                                ...candidate,
                                type: event.target.value as LogicGateType,
                              }
                            : candidate,
                        ),
                      )
                    }
                    className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
                  >
                    {gateOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Input A
                  </span>
                  <select
                    value={stage.inputA}
                    onChange={(event) =>
                      setStages((current) =>
                        current.map((candidate) =>
                          candidate.id === stage.id
                            ? {
                                ...candidate,
                                inputA: event.target.value as LogicSourceId,
                              }
                            : candidate,
                        ),
                      )
                    }
                    className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
                  >
                    {sourceAvailability[stage.id].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Input B
                  </span>
                  <select
                    value={stage.inputB}
                    onChange={(event) =>
                      setStages((current) =>
                        current.map((candidate) =>
                          candidate.id === stage.id
                            ? {
                                ...candidate,
                                inputB: event.target.value as LogicSourceId,
                              }
                            : candidate,
                        ),
                      )
                    }
                    className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-foreground"
                    disabled={stage.type === "NOT"}
                  >
                    {sourceAvailability[stage.id].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          ))}

          <label className="space-y-2">
            <span className="text-sm font-medium">Observed output node</span>
            <select
              value={outputSource}
              onChange={(event) => setOutputSource(event.target.value as LogicSourceId)}
              className="w-full rounded-2xl border border-border bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-foreground"
            >
              {["A", "B", "C", "G1", "G2", "G3"].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </ControlPanel>
      }
      results={
        <ResultsStrip
          items={[
            {
              label: "Observed output",
              value: String(evaluated.output),
              detail: `Node ${outputSource} is currently ${evaluated.output ? "HIGH" : "LOW"}.`,
            },
            {
              label: "G1",
              value: String(evaluated.values.G1),
              detail: `${stages[0].type} gate`,
            },
            {
              label: "G2",
              value: String(evaluated.values.G2),
              detail: `${stages[1].type} gate`,
            },
            {
              label: "G3",
              value: String(evaluated.values.G3),
              detail: `${stages[2].type} gate`,
            },
          ]}
        />
      }
      output={
        <div className="space-y-6">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr),18rem]">
            <div className="rounded-[1.75rem] border border-border bg-[linear-gradient(135deg,rgba(255,255,255,0.95),rgba(230,243,247,0.92))] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Configured circuit
              </p>
              <div className="mt-4 grid gap-3">
                {stages.map((stage) => (
                  <div key={stage.id} className="rounded-2xl border border-border bg-white/90 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">
                          {stage.id}: {stage.type}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {stage.type === "NOT"
                            ? `${stage.inputA} → ${stage.type} → ${stage.id}`
                            : `${stage.inputA}, ${stage.inputB} → ${stage.type} → ${stage.id}`}
                        </p>
                      </div>
                      <div
                        className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                          evaluated.values[stage.id]
                            ? "bg-accent text-white"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {evaluated.values[stage.id]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-border bg-white/90 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Live node values
              </p>
              <div className="mt-4 space-y-3">
                {(["A", "B", "C", "G1", "G2", "G3"] as LogicSourceId[]).map((source) => (
                  <div key={source} className="flex items-center justify-between gap-4 text-sm">
                    <span>{source}</span>
                    <span className="font-semibold">
                      {source in inputs
                        ? inputs[source as "A" | "B" | "C"]
                        : evaluated.values[source]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-white/90">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-muted/70">
                <tr>
                  {["A", "B", "C", "G1", "G2", "G3", "OUT"].map((column) => (
                    <th key={column} className="px-4 py-3 font-medium">
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {truthTable.map((row, index) => (
                  <tr key={index} className="border-t border-border">
                    <td className="px-4 py-3">{row.A}</td>
                    <td className="px-4 py-3">{row.B}</td>
                    <td className="px-4 py-3">{row.C}</td>
                    <td className="px-4 py-3">{row.G1}</td>
                    <td className="px-4 py-3">{row.G2}</td>
                    <td className="px-4 py-3">{row.G3}</td>
                    <td className="px-4 py-3 font-semibold">{row.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
      insights={
        <InsightPanel
          insights={[
            {
              label: "Combinational only",
              text: "Every row in the truth table is independent because there is no stored state. The output depends only on the current inputs and the gate network.",
            },
            {
              label: "Gate choice shapes behavior",
              text: "Swapping a single AND gate for NAND or XOR can completely change the logic family, which is why truth tables are a more reliable check than intuition alone.",
            },
            {
              label: "Build from primitives",
              text: "This bounded simulator mirrors how digital logic courses progress: start with Boolean primitives, then compose them into reusable combinational blocks.",
            },
          ]}
        />
      }
    />
  );
}
