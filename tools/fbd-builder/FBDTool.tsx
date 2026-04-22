import ToolScaffold from "@/tools/shared/ToolScaffold";

export default function FBDTool() {
  return (
    <ToolScaffold
      title="Free Body Diagram Builder"
      pattern="canvas-physics"
      note="Drag-based force placement, moments, and equilibrium summaries will use this simulator shell in the next pass."
    />
  );
}
