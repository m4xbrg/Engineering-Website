import ToolScaffold from "@/tools/shared/ToolScaffold";

export default function UnitConverterTool() {
  return (
    <ToolScaffold
      title="Engineering Unit Converter"
      pattern="form-grid"
      note="Quantity groups, source units, target units, and multi-unit output tables will slot into this shared shell."
    />
  );
}
