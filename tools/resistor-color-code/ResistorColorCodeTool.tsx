import ToolScaffold from "@/tools/shared/ToolScaffold";

export default function ResistorColorCodeTool() {
  return (
    <ToolScaffold
      title="Resistor Color Code Decoder"
      pattern="visual-encoder"
      note="Band selectors, value decoding, and SVG resistor rendering will use this scaffold in the next build pass."
    />
  );
}
