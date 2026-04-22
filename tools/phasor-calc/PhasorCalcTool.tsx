import ToolScaffold from "@/tools/shared/ToolScaffold";

export default function PhasorCalcTool() {
  return (
    <ToolScaffold
      title="Phasor & AC Circuit Calculator"
      pattern="vector-diagram"
      note="Complex arithmetic, power-factor outputs, and a phasor diagram will be layered onto this client-side calculator shell."
    />
  );
}
