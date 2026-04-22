export const CANONICAL_MAJOR_SLUGS = [
  "core",
  "electrical-engineering",
  "mechanical-engineering",
  "civil-engineering",
  "chemical-engineering",
  "computer-engineering",
  "aerospace-engineering",
  "biomedical-engineering",
  "industrial-engineering",
  "materials-engineering",
] as const;

export const CANONICAL_STAGE_IDS = [
  "foundation",
  "core-sciences",
  "engineering-core",
  "major-entry",
  "major-core",
  "intermediate",
  "advanced",
  "capstone",
] as const;

export const CANONICAL_TOOL_SLUGS = [
  "unit-converter",
  "ohms-law",
  "resistor-color-code",
  "logic-gate-sim",
  "rlc-response",
  "fourier-series",
  "bode-plot",
  "phasor-calc",
  "opamp-config",
  "fbd-builder",
] as const;

export const MAJOR_LABELS: Record<
  (typeof CANONICAL_MAJOR_SLUGS)[number],
  string
> = {
  core: "Core Engineering",
  "electrical-engineering": "Electrical Engineering",
  "mechanical-engineering": "Mechanical Engineering",
  "civil-engineering": "Civil Engineering",
  "chemical-engineering": "Chemical Engineering",
  "computer-engineering": "Computer Engineering",
  "aerospace-engineering": "Aerospace Engineering",
  "biomedical-engineering": "Biomedical Engineering",
  "industrial-engineering": "Industrial Engineering",
  "materials-engineering": "Materials Engineering",
};

export const MAIN_NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/curriculum", label: "Curriculum" },
  { href: "/labs", label: "Labs" },
  { href: "/concepts", label: "Concepts" },
  { href: "/glossary", label: "Glossary" },
] as const;

export function getMajorRoute(majorSlug: string) {
  return majorSlug === "core" ? "/curriculum/core" : `/majors/${majorSlug}`;
}

export function getCourseRoute(majorSlug: string, courseSlug: string) {
  return majorSlug === "core"
    ? `/curriculum/core/${courseSlug}`
    : `/majors/${majorSlug}/${courseSlug}`;
}
