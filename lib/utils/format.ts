export function titleCaseFromSlug(value: string) {
  return value
    .split("-")
    .map((segment) =>
      segment.length <= 3
        ? segment.toUpperCase()
        : segment.charAt(0).toUpperCase() + segment.slice(1),
    )
    .join(" ");
}

export function sentenceCase(value: string) {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function cleanText(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return value
    .replaceAll("â€”", "-")
    .replaceAll("â€“", "-")
    .replaceAll("â†’", "->")
    .replaceAll("â€²", "'")
    .replaceAll("â€œ", '"')
    .replaceAll("â€", '"');
}

export function readableDepth(depth: "full" | "map") {
  return depth === "full" ? "Deep in V1" : "Curriculum map in V1";
}
