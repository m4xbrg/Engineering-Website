import ToolScaffold from "@/tools/shared/ToolScaffold";

export default function BodePlotTool() {
  return (
    <ToolScaffold
      title="Bode Plot Generator"
      pattern="dual-chart"
      note="Transfer-function inputs and linked magnitude/phase plots will live inside this reserved chart shell."
    />
  );
}
