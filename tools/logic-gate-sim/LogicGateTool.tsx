import ToolScaffold from "@/tools/shared/ToolScaffold";

export default function LogicGateTool() {
  return (
    <ToolScaffold
      title="Logic Gate Simulator"
      pattern="canvas-graph"
      note="React Flow nodes, edges, and a live truth table panel will plug into this reserved simulator surface."
    />
  );
}
