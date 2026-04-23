export type LogicGateType =
  | "AND"
  | "OR"
  | "NOT"
  | "NAND"
  | "NOR"
  | "XOR"
  | "XNOR";

export type LogicSourceId = "A" | "B" | "C" | "G1" | "G2" | "G3";

export type LogicStage = {
  id: "G1" | "G2" | "G3";
  type: LogicGateType;
  inputA: LogicSourceId;
  inputB: LogicSourceId;
};

export function evaluateGate(type: LogicGateType, inputA: number, inputB: number) {
  switch (type) {
    case "AND":
      return inputA & inputB;
    case "OR":
      return inputA | inputB;
    case "NOT":
      return inputA ? 0 : 1;
    case "NAND":
      return inputA & inputB ? 0 : 1;
    case "NOR":
      return inputA | inputB ? 0 : 1;
    case "XOR":
      return inputA ^ inputB;
    case "XNOR":
      return inputA ^ inputB ? 0 : 1;
  }
}

export function evaluateLogicCircuit({
  inputs,
  stages,
  outputSource,
}: {
  inputs: Record<"A" | "B" | "C", number>;
  stages: LogicStage[];
  outputSource: LogicSourceId;
}) {
  const values: Record<LogicSourceId, number> = {
    ...inputs,
    G1: 0,
    G2: 0,
    G3: 0,
  };

  for (const stage of stages) {
    const inputA = values[stage.inputA];
    const inputB = values[stage.inputB];
    values[stage.id] = evaluateGate(stage.type, inputA, inputB);
  }

  return {
    values,
    output: values[outputSource],
  };
}

export function buildTruthTable(stages: LogicStage[], outputSource: LogicSourceId) {
  const rows = [];

  for (let a = 0; a <= 1; a += 1) {
    for (let b = 0; b <= 1; b += 1) {
      for (let c = 0; c <= 1; c += 1) {
        const result = evaluateLogicCircuit({
          inputs: { A: a, B: b, C: c },
          stages,
          outputSource,
        });

        rows.push({
          A: a,
          B: b,
          C: c,
          G1: result.values.G1,
          G2: result.values.G2,
          G3: result.values.G3,
          output: result.output,
        });
      }
    }
  }

  return rows;
}

