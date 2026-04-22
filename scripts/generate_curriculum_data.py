from __future__ import annotations

import json
import re
import shutil
from collections import Counter, defaultdict
from dataclasses import dataclass
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ATLAS_PATH = ROOT / "engineering_atlas.md"
DATA_PLAN_PATH = ROOT / "engineering_atlas_data_plan.md"
DATA_DIR = ROOT / "data"


MAJOR_ABBR_TO_SLUG = {
    "CORE": "core",
    "EE": "electrical-engineering",
    "ME": "mechanical-engineering",
    "CE": "civil-engineering",
    "ChE": "chemical-engineering",
    "CpE": "computer-engineering",
    "AE": "aerospace-engineering",
    "BME": "biomedical-engineering",
    "IE": "industrial-engineering",
    "MatE": "materials-engineering",
}

MAJOR_ICON_MAP = {
    "core": "layers",
    "electrical-engineering": "zap",
    "mechanical-engineering": "cog",
    "civil-engineering": "building-2",
    "chemical-engineering": "flask-conical",
    "computer-engineering": "cpu",
    "aerospace-engineering": "rocket",
    "biomedical-engineering": "heart-pulse",
    "industrial-engineering": "factory",
    "materials-engineering": "gem",
}

MAJOR_FOUNDATION_IDS = {
    "core": [],
    "electrical-engineering": [
        "calculus-i",
        "calculus-ii",
        "calculus-iii",
        "differential-equations",
        "physics-i",
        "physics-ii",
        "linear-algebra",
        "engineering-statistics",
    ],
    "mechanical-engineering": [
        "calculus-i",
        "calculus-ii",
        "calculus-iii",
        "differential-equations",
        "physics-i",
        "engineering-statistics",
        "statics",
        "dynamics",
        "mechanics-of-materials",
        "thermodynamics-i",
    ],
    "civil-engineering": [
        "calculus-i",
        "calculus-ii",
        "calculus-iii",
        "differential-equations",
        "physics-i",
        "engineering-statistics",
        "statics",
        "dynamics",
        "mechanics-of-materials",
    ],
    "chemical-engineering": [
        "calculus-i",
        "calculus-ii",
        "calculus-iii",
        "differential-equations",
        "physics-i",
        "linear-algebra",
        "engineering-statistics",
    ],
    "computer-engineering": [
        "calculus-i",
        "calculus-ii",
        "differential-equations",
        "physics-i",
        "physics-ii",
        "linear-algebra",
        "engineering-statistics",
    ],
    "aerospace-engineering": [
        "calculus-i",
        "calculus-ii",
        "calculus-iii",
        "differential-equations",
        "physics-i",
        "physics-ii",
        "linear-algebra",
        "engineering-statistics",
        "statics",
        "dynamics",
        "mechanics-of-materials",
        "thermodynamics-i",
    ],
    "biomedical-engineering": [
        "calculus-i",
        "calculus-ii",
        "calculus-iii",
        "differential-equations",
        "physics-i",
        "physics-ii",
        "linear-algebra",
        "engineering-statistics",
        "statics",
        "mechanics-of-materials",
    ],
    "industrial-engineering": [
        "calculus-i",
        "calculus-ii",
        "differential-equations",
        "physics-i",
        "linear-algebra",
        "engineering-statistics",
    ],
    "materials-engineering": [
        "calculus-i",
        "calculus-ii",
        "calculus-iii",
        "differential-equations",
        "physics-i",
        "physics-ii",
        "engineering-statistics",
        "mechanics-of-materials",
    ],
}

EXTRA_COURSE_ROWS = {
    "computer-engineering": [
        {
            "id": "digital-signal-processing-cpe",
            "title": "Digital Signal Processing (Selected Topics)",
            "year": "3",
            "stage": "intermediate",
            "topic_clusters": ["dsp", "signals"],
        }
    ],
    "biomedical-engineering": [
        {
            "id": "general-chemistry-bme",
            "title": "General Chemistry I & II (Survey)",
            "year": "1-2",
            "stage": "foundation",
            "topic_clusters": ["chemistry"],
        }
    ],
}

COURSE_HEADING_OVERRIDES = {
    ("computer-engineering", "Digital Logic Design"): ["digital-logic-cpe"],
    ("computer-engineering", "Circuit Analysis I & II"): [
        "circuit-analysis-cpe-i",
        "circuit-analysis-cpe-ii",
    ],
    ("computer-engineering", "Embedded Systems Design"): ["embedded-systems-cpe"],
    ("computer-engineering", "Digital Signal Processing (Selected Topics)"): [
        "digital-signal-processing-cpe"
    ],
    ("computer-engineering", "VLSI Design"): ["vlsi-cpe"],
    (
        "computer-engineering",
        "Hardware Description Languages and FPGA Design",
    ): ["hdl-fpga"],
    (
        "computer-engineering",
        "Senior Capstone — Computer Engineering System Design",
    ): ["cpe-capstone"],
    ("biomedical-engineering", "General Chemistry I & II (Survey)"): [
        "general-chemistry-bme"
    ],
    (
        "biomedical-engineering",
        "Biology for Engineers I — Cell and Molecular Biology",
    ): ["biology-for-engineers"],
    (
        "industrial-engineering",
        "Operations Research I — Linear Programming and Optimization",
    ): ["operations-research-i"],
    (
        "industrial-engineering",
        "Operations Research II — Integer Programming and Heuristics",
    ): ["operations-research-ii"],
    ("materials-engineering", "General Chemistry I & II"): ["general-chemistry-mate"],
    (
        "materials-engineering",
        "Materials Characterization II — Advanced Methods",
    ): ["characterization-ii"],
    (
        "civil-engineering",
        "Structural Analysis II — Indeterminate Structures",
    ): ["structural-analysis-ii"],
    (
        "aerospace-engineering",
        "Aerostructures II — Finite Element Methods for Structures",
    ): ["aerostructures-ii"],
}

COURSE_BORROWS = {
    "digital-logic-cpe": "digital-logic-design",
    "circuit-analysis-cpe-i": "circuit-analysis-i",
    "circuit-analysis-cpe-ii": "circuit-analysis-ii",
    "embedded-systems-cpe": "embedded-systems",
    "digital-signal-processing-cpe": "digital-signal-processing",
    "vlsi-cpe": "vlsi-i",
    "general-chemistry-bme": "general-chemistry",
    "general-chemistry-mate": "general-chemistry",
}

REFERENCE_ALIASES = {
    "calculus iii": "calculus-iii",
    "calc iii": "calculus-iii",
    "physics i": "physics-i",
    "physics ii": "physics-ii",
    "engineering statistics": "engineering-statistics",
    "statistics": "engineering-statistics",
    "statics": "statics",
    "dynamics": "dynamics",
    "mechanics of materials": "mechanics-of-materials",
    "thermodynamics": "thermodynamics-i",
    "thermo i": "thermodynamics-i",
    "intro to engineering": "intro-engineering",
    "introduction to engineering": "intro-engineering",
    "signals systems": "signals-and-systems",
    "signals and systems": "signals-and-systems",
    "digital logic design": "digital-logic-design",
    "embedded systems": "embedded-systems",
    "control systems": "control-systems-ee",
    "steel design": "steel-structure-design",
    "steel structure design": "steel-structure-design",
    "vlsi design": "vlsi-cpe",
    "finite element analysis": "fea-i",
    "reinforced concrete design": "reinforced-concrete-design",
    "structural analysis ii": "structural-analysis-ii",
    "general chemistry i ii": "general-chemistry",
    "general chemistry": "general-chemistry",
    "characterization i": "characterization-i",
}

TOOL_SEEDS = [
    {
        "id": "unit-converter",
        "name": "Engineering Unit Converter",
        "category": "calculator",
        "description": "Convert values across common engineering unit systems and physical quantities.",
        "whyMvp": "Most majors touch units immediately, so this is the most broadly reusable shared utility.",
        "purpose": "A shared utility for fast, discipline-agnostic unit conversion.",
        "majorIds": list(MAJOR_ABBR_TO_SLUG.values()),
        "courseIds": ["intro-engineering", "programming-for-engineers"],
        "clusterIds": ["design", "mathematics"],
        "complexityEstimate": "low",
        "status": "planned",
        "routePath": "/labs/unit-converter",
        "thumbnailDescription": "A compact engineering calculator layout with quantity and unit selectors.",
    },
    {
        "id": "ohms-law",
        "name": "Ohm's Law & Power Calculator",
        "category": "calculator",
        "description": "Solve the fundamental voltage, current, resistance, and power relationships for introductory circuits.",
        "whyMvp": "It anchors the first EE concepts and gives the Labs section an immediately useful starter tool.",
        "purpose": "A foundational EE calculator that doubles as a concept explainer.",
        "majorIds": [
            "electrical-engineering",
            "computer-engineering",
            "biomedical-engineering",
        ],
        "courseIds": ["circuit-analysis-i", "circuit-analysis-cpe-i", "bioinstrumentation"],
        "clusterIds": ["circuits"],
        "complexityEstimate": "low",
        "status": "planned",
        "routePath": "/labs/ohms-law",
        "thumbnailDescription": "A four-field electrical calculator with formula callouts.",
    },
    {
        "id": "resistor-color-code",
        "name": "Resistor Color Code Decoder",
        "category": "reference",
        "description": "Decode resistor bands into resistance values and tolerances for early electronics work.",
        "whyMvp": "It is low-effort, highly recognizable, and pairs naturally with Circuit Analysis I.",
        "purpose": "A fast reference tool for introductory electronics work.",
        "majorIds": [
            "electrical-engineering",
            "computer-engineering",
            "biomedical-engineering",
        ],
        "courseIds": ["circuit-analysis-i", "circuit-analysis-cpe-i"],
        "clusterIds": ["circuits"],
        "complexityEstimate": "low",
        "status": "planned",
        "routePath": "/labs/resistor-color-code",
        "thumbnailDescription": "A resistor diagram with interactive color bands and decoded values.",
    },
    {
        "id": "logic-gate-sim",
        "name": "Logic Gate Simulator",
        "category": "simulator",
        "description": "Build and test combinational logic circuits with live outputs and truth tables.",
        "whyMvp": "It gives Electrical and Computer Engineering a visual, interactive anchor for digital logic.",
        "purpose": "A reusable simulator shell for graph-style engineering tools.",
        "majorIds": ["electrical-engineering", "computer-engineering"],
        "courseIds": ["digital-logic-design", "digital-logic-cpe"],
        "clusterIds": ["digital-logic"],
        "complexityEstimate": "medium",
        "status": "planned",
        "routePath": "/labs/logic-gate-sim",
        "thumbnailDescription": "A gate-canvas interface with toggled inputs and a truth table.",
    },
    {
        "id": "rlc-response",
        "name": "RLC Circuit Response Visualizer",
        "category": "visualizer",
        "description": "Explore transient and frequency response behavior for RC, RL, and RLC systems.",
        "whyMvp": "It connects Circuit Analysis II directly to Signals and Systems with one reusable visual pattern.",
        "purpose": "A chart-heavy tool shell for transient and frequency response learning.",
        "majorIds": ["electrical-engineering", "computer-engineering"],
        "courseIds": ["circuit-analysis-ii", "signals-and-systems"],
        "clusterIds": ["circuits", "signals"],
        "complexityEstimate": "medium",
        "status": "planned",
        "routePath": "/labs/rlc-response",
        "thumbnailDescription": "Dual charts showing step response and Bode behavior for simple circuits.",
    },
    {
        "id": "fourier-series",
        "name": "Fourier Series Visualizer",
        "category": "visualizer",
        "description": "Show how harmonics accumulate to reconstruct periodic waveforms.",
        "whyMvp": "It demonstrates a high-value signals concept that crosses EE, ME, AE, and BME.",
        "purpose": "A visual learning surface for signals and wave decomposition concepts.",
        "majorIds": [
            "electrical-engineering",
            "mechanical-engineering",
            "aerospace-engineering",
            "biomedical-engineering",
        ],
        "courseIds": [
            "signals-and-systems",
            "digital-signal-processing",
            "mechanical-vibrations",
            "biosignals-imaging",
        ],
        "clusterIds": ["signals", "dsp"],
        "complexityEstimate": "medium",
        "status": "planned",
        "routePath": "/labs/fourier-series",
        "thumbnailDescription": "A harmonic stacking visualization with waveform and spectrum views.",
    },
    {
        "id": "bode-plot",
        "name": "Bode Plot Generator",
        "category": "visualizer",
        "description": "Generate magnitude and phase plots from transfer-function style inputs.",
        "whyMvp": "It connects Signals, Control, and Circuit Analysis with one durable visualization primitive.",
        "purpose": "A dual-chart tool shell for controls and signal-response workflows.",
        "majorIds": [
            "electrical-engineering",
            "mechanical-engineering",
            "aerospace-engineering",
            "chemical-engineering",
        ],
        "courseIds": [
            "signals-and-systems",
            "control-systems-ee",
            "control-systems-me",
            "process-control",
            "flight-mechanics-ii",
        ],
        "clusterIds": ["signals", "control"],
        "complexityEstimate": "medium",
        "status": "planned",
        "routePath": "/labs/bode-plot",
        "thumbnailDescription": "Two stacked logarithmic plots for system magnitude and phase.",
    },
    {
        "id": "phasor-calc",
        "name": "Phasor & AC Circuit Calculator",
        "category": "calculator",
        "description": "Compute impedance, phase angle, and AC power relationships for simple RLC cases.",
        "whyMvp": "Phasors are a common stumbling block in AC circuits, so this gives EE a high-leverage support tool.",
        "purpose": "A vector-aware calculator shell for AC circuit learning.",
        "majorIds": ["electrical-engineering"],
        "courseIds": ["circuit-analysis-ii", "power-systems-i"],
        "clusterIds": ["circuits", "power"],
        "complexityEstimate": "medium",
        "status": "planned",
        "routePath": "/labs/phasor-calc",
        "thumbnailDescription": "An AC calculator with impedance results and a phasor diagram.",
    },
    {
        "id": "opamp-config",
        "name": "Op-Amp Circuit Configurator",
        "category": "calculator",
        "description": "Compare common op-amp circuit topologies and inspect their gain relationships.",
        "whyMvp": "It gives Electronics II an obvious practical bridge into circuit configuration thinking.",
        "purpose": "A schematic-plus-results shell for electronics tool patterns.",
        "majorIds": ["electrical-engineering", "biomedical-engineering"],
        "courseIds": ["electronics-ii", "bioinstrumentation"],
        "clusterIds": ["electronics", "bioinstrumentation"],
        "complexityEstimate": "medium",
        "status": "planned",
        "routePath": "/labs/opamp-config",
        "thumbnailDescription": "A configurable op-amp schematic with gain and behavior readouts.",
    },
    {
        "id": "fbd-builder",
        "name": "Free Body Diagram Builder",
        "category": "simulator",
        "description": "Place forces and moments on a 2D body and inspect equilibrium conditions.",
        "whyMvp": "It serves the mechanics-heavy majors while validating the future canvas interaction pattern.",
        "purpose": "A canvas-first shell for future physics and mechanics simulators.",
        "majorIds": [
            "core",
            "mechanical-engineering",
            "civil-engineering",
            "aerospace-engineering",
        ],
        "courseIds": ["physics-i", "statics", "structural-analysis-i", "flight-mechanics-i"],
        "clusterIds": ["mechanics", "structures"],
        "complexityEstimate": "medium",
        "status": "planned",
        "routePath": "/labs/fbd-builder",
        "thumbnailDescription": "A force-diagram canvas for loads, vectors, and equilibrium results.",
    },
]


@dataclass
class SourceCourseBlock:
    title: str
    description: str
    why: str
    prereqs: list[str]
    leads_into: list[str]
    skills: list[str]
    concepts: list[str]
    reference_note: str | None


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def slugify(value: str) -> str:
    value = value.replace("—", "-").replace("–", "-").replace("&", " and ")
    value = re.sub(r"\[THEME:\s*", "", value)
    value = value.replace("]", "")
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def normalize(value: str) -> str:
    value = value.replace("&", " and ")
    value = value.replace("—", " ").replace("–", " ")
    value = re.sub(r"\(.*?\)", " ", value)
    value = value.replace("[", " ").replace("]", " ")
    value = re.sub(r"[^a-z0-9]+", " ", value.lower())
    return " ".join(value.split())


def parse_markdown_table(block: str) -> list[list[str]]:
    rows = []
    for line in block.splitlines():
        if not line.startswith("|"):
            continue
        parts = [part.strip() for part in line.strip().strip("|").split("|")]
        rows.append(parts)
    if len(rows) <= 2:
        return []
    return rows[2:]


def split_inline_list(value: str) -> list[str]:
    if value in {"None", "None — this IS the foundation"}:
        return []
    parts = [part.strip() for part in value.split(",")]
    return [part for part in parts if part]


def parse_field_map(section: str) -> dict[str, str]:
    result: dict[str, str] = {}
    for label in ["Description", "Main subfields", "Shared foundation dependencies"]:
        match = re.search(rf"- \*\*{re.escape(label)}:\*\* (.+)", section)
        if match:
            result[label] = match.group(1).strip()
    return result


def parse_summary(section: str) -> dict[str, str]:
    result: dict[str, str] = {}
    for label in [
        "Main dependency chain",
        "Main concept clusters",
        "Best simulator/tool opportunities",
    ]:
        match = re.search(rf"- \*\*{re.escape(label)}:\*\* (.+)", section)
        if match:
            result[label] = match.group(1).strip()
    return result


def parse_course_block(body: str) -> SourceCourseBlock:
    def get_field(label: str) -> str:
        match = re.search(rf"- \*\*{re.escape(label)}:\*\* (.+)", body)
        return match.group(1).strip() if match else ""

    reference_match = re.search(r"(?m)^> (See .+|Same as .+)$", body)
    concepts: list[str] = []
    concept_match = re.search(r"(?ms)- \*\*Concepts:\*\*\n(.*?)(?=\n- \*\*|\n#### |\Z)", body)
    if concept_match:
        for raw_line in concept_match.group(1).splitlines():
            if raw_line.startswith("  - "):
                concepts.append(raw_line[4:].strip())

    return SourceCourseBlock(
        title="",
        description=get_field("Description"),
        why=get_field("Why it matters"),
        prereqs=split_inline_list(get_field("Prerequisites")),
        leads_into=split_inline_list(get_field("Leads into")),
        skills=split_inline_list(get_field("Skills")),
        concepts=concepts,
        reference_note=reference_match.group(1).strip() if reference_match else None,
    )


def parse_data_plan():
    text = read_text(DATA_PLAN_PATH)

    major_inventory_match = re.search(
        r"(?ms)^## 1\. Major Inventory\n\n(.*?)\n\n\*\*depthV1 values:",
        text,
    )
    topic_cluster_match = re.search(
        r"(?ms)^## 2\. Topic Cluster Inventory\n\n.*?\n\n(.*?)\n\n\*\*Total clusters:",
        text,
    )
    stage_registry_match = re.search(
        r"(?ms)^### Stage Registry \(shared across all majors\)\n\n(.*?)\n\n---",
        text,
    )

    majors = {}
    for row in parse_markdown_table(major_inventory_match.group(1)):
        _, major_id, name, short_name, depth, color_token = row
        major_id = major_id.strip("`")
        majors[major_id] = {
            "id": major_id,
            "name": name,
            "shortName": short_name,
            "depthV1": depth,
            "colorToken": color_token.strip("`"),
            "icon": MAJOR_ICON_MAP[major_id],
        }

    clusters = {}
    for row in parse_markdown_table(topic_cluster_match.group(1)):
        cluster_id, label, primary_majors, notes = row
        cluster_id = cluster_id.strip("`")
        primary_major_ids = []
        for token in [item.strip() for item in primary_majors.split(",")]:
            if token == "ALL":
                primary_major_ids.extend(MAJOR_ABBR_TO_SLUG.values())
            elif token in MAJOR_ABBR_TO_SLUG:
                primary_major_ids.append(MAJOR_ABBR_TO_SLUG[token])
        clusters[cluster_id] = {
            "id": cluster_id,
            "name": label,
            "description": notes,
            "primaryMajors": sorted(set(primary_major_ids)),
            "courseIds": [],
            "conceptIds": [],
            "toolIds": [],
        }

    stages = {}
    for row in parse_markdown_table(stage_registry_match.group(1)):
        stage_id, label, typical_year = row
        stage_id = stage_id.strip("`")
        stages[stage_id] = {
            "id": stage_id,
            "label": label,
            "typicalYear": typical_year,
            "description": f"{label} courses typically appear in year {typical_year}.",
        }

    if "applied-core" not in stages:
        stages["applied-core"] = {
            "id": "applied-core",
            "label": "Applied Core",
            "typicalYear": "3",
            "description": "Applied core courses typically appear in year 3.",
        }

    courses_by_major = defaultdict(list)
    for match in re.finditer(
        r"(?ms)^### (CORE|EE|ME|CE|ChE|CpE|AE|BME|IE|MatE) .*?\n\n(.*?)\n\n---",
        text,
    ):
        major_slug = MAJOR_ABBR_TO_SLUG[match.group(1)]
        for row in parse_markdown_table(match.group(2)):
            course_id = row[0].strip("`")
            title = row[1].strip()
            year = row[2].strip()
            stage = row[3].strip("`")
            clusters_raw = row[4] if len(row) > 4 else ""
            topic_clusters = re.findall(r"`([^`]+)`", clusters_raw)
            courses_by_major[major_slug].append(
                {
                    "id": course_id,
                    "title": title,
                    "year": year,
                    "stage": stage,
                    "topic_clusters": topic_clusters,
                }
            )

    for major_slug, rows in EXTRA_COURSE_ROWS.items():
        courses_by_major[major_slug].extend(rows)

    return majors, clusters, stages, courses_by_major


def parse_curriculum_source():
    text = read_text(ATLAS_PATH)
    majors = {}

    major_pattern = re.compile(
        r"(?ms)^# (\d+)\. (.+?)\n(.*?)(?=^# (?:\d+\.|Engineering Atlas — End of Document)|\Z)"
    )
    stage_pattern = re.compile(r"(?ms)^### (.+?)\n(.*?)(?=^### |\Z)")
    course_pattern = re.compile(r"(?ms)^#### (.+?)\n(.*?)(?=^#### |\Z)")

    for _, major_name, major_body in major_pattern.findall(text):
        overview_match = re.search(
            r"(?ms)^## Overview\n(.*?)\n## Curriculum", major_body
        )
        curriculum_match = re.search(
            r"(?ms)^## Curriculum\n(.*?)\n## Summary", major_body
        )
        summary_match = re.search(r"(?ms)^## Summary\n(.*)$", major_body)

        overview_fields = parse_field_map(overview_match.group(1))
        summary_fields = parse_summary(summary_match.group(1))
        stages = []

        for stage_label, stage_body in stage_pattern.findall(curriculum_match.group(1)):
            stage_intro_lines = []
            courses = []
            before_course = True
            for raw_line in stage_body.splitlines():
                if raw_line.startswith("#### "):
                    before_course = False
                if before_course and raw_line.startswith("> "):
                    stage_intro_lines.append(raw_line[2:].strip())

            for course_title, course_body in course_pattern.findall(stage_body):
                if course_title.startswith("Technical Elective Slots"):
                    themes = []
                    for theme_name, theme_description in re.findall(
                        r"- `\[THEME: (.+?)\]`\s+—\s+(.+)", course_body
                    ):
                        themes.append(
                            {
                                "name": theme_name.strip(),
                                "description": theme_description.strip(),
                            }
                        )
                    courses.append({"title": course_title, "themes": themes})
                    continue

                course = parse_course_block(course_body)
                course.title = course_title.strip()
                courses.append(course)

            stages.append(
                {
                    "label": stage_label.strip(),
                    "intro": " ".join(stage_intro_lines).strip(),
                    "courses": courses,
                }
            )

        majors[major_name] = {
            "overview": overview_fields,
            "summary": summary_fields,
            "stages": stages,
        }

    return majors


def candidate_titles(title: str) -> set[str]:
    values = {normalize(title)}
    values.add(normalize(re.sub(r" \(.+?\)", "", title)))
    values.add(normalize(title.split("—")[0].strip()))
    values.add(normalize(title.split("-")[0].strip()))
    values.discard("")
    return values


def build_title_indices(course_rows_by_major):
    by_major = defaultdict(lambda: defaultdict(list))
    global_index = defaultdict(list)

    for major_slug, rows in course_rows_by_major.items():
        for row in rows:
            for key in candidate_titles(row["title"]):
                by_major[major_slug][key].append(row["id"])
                global_index[key].append(row["id"])

    return by_major, global_index


def resolve_source_heading_ids(major_slug, heading, major_rows):
    override = COURSE_HEADING_OVERRIDES.get((major_slug, heading))
    if override:
        return override

    normalized_heading = normalize(heading)
    matches = [
        row["id"]
        for row in major_rows
        if normalized_heading in candidate_titles(row["title"])
    ]
    if matches:
        return matches

    fuzzy_matches = []
    for row in major_rows:
        row_candidates = candidate_titles(row["title"])
        if any(
            normalized_heading.startswith(candidate) or candidate.startswith(normalized_heading)
            for candidate in row_candidates
            if candidate
        ):
            fuzzy_matches.append(row["id"])
    if fuzzy_matches:
        return fuzzy_matches

    raise ValueError(f"Unable to resolve source heading '{heading}' for {major_slug}")


def resolve_course_reference(
    label: str,
    current_major: str,
    title_index_by_major,
    global_title_index,
) -> str | None:
    cleaned = re.sub(r"\((?:co-req|coreq|co req).+?\)", "", label, flags=re.I).strip()
    normalized_label = normalize(cleaned)
    if not normalized_label:
        return None

    if normalized_label in REFERENCE_ALIASES:
        alias_id = REFERENCE_ALIASES[normalized_label]
        if alias_id in global_title_index.get(normalized_label, []) or alias_id:
            return alias_id

    major_matches = title_index_by_major[current_major].get(normalized_label, [])
    if len(major_matches) == 1:
        return major_matches[0]

    core_matches = title_index_by_major["core"].get(normalized_label, [])
    if len(core_matches) == 1:
        return core_matches[0]

    global_matches = global_title_index.get(normalized_label, [])
    if len(set(global_matches)) == 1:
        return global_matches[0]

    return REFERENCE_ALIASES.get(normalized_label)


def concept_id_for(name: str) -> str:
    base = slugify(name)
    return base or "concept"


def build_dataset():
    major_seed, cluster_seed, stages_seed, course_rows_by_major = parse_data_plan()
    source_seed = parse_curriculum_source()
    title_index_by_major, global_title_index = build_title_indices(course_rows_by_major)

    name_to_major_slug = {value["name"]: key for key, value in major_seed.items()}
    direct_source_payloads = {}
    stage_payloads_by_major = {}

    for major_name, source_major in source_seed.items():
        major_slug = name_to_major_slug[major_name]
        stage_payloads = []
        major_rows = course_rows_by_major[major_slug]

        for stage in source_major["stages"]:
            stage_course_ids = []
            for course_block in stage["courses"]:
                if isinstance(course_block, dict):
                    for theme in course_block["themes"]:
                        theme_title = f"[THEME: {theme['name']}]"
                        matched = [
                            row["id"]
                            for row in major_rows
                            if normalize(row["title"]) == normalize(theme_title)
                        ]
                        if len(matched) != 1:
                            raise ValueError(
                                f"Unable to resolve elective theme {theme_title} for {major_slug}"
                            )
                        direct_source_payloads[matched[0]] = {
                            "description": theme["description"],
                            "why": f"Advanced theme area within {major_seed[major_slug]['name']}.",
                            "prereqs": [],
                            "leads_into": [],
                            "skills": [],
                            "concepts": [],
                            "reference_note": None,
                        }
                        stage_course_ids.extend(matched)
                    continue

                course_ids = resolve_source_heading_ids(
                    major_slug, course_block.title, major_rows
                )
                for course_id in course_ids:
                    stage_course_ids.append(course_id)
                    if len(course_ids) == 1:
                        direct_source_payloads[course_id] = {
                            "description": course_block.description,
                            "why": course_block.why,
                            "prereqs": course_block.prereqs,
                            "leads_into": course_block.leads_into,
                            "skills": course_block.skills,
                            "concepts": course_block.concepts,
                            "reference_note": course_block.reference_note,
                        }

            stage_id = next(
                row["stage"]
                for row in major_rows
                if row["id"] == stage_course_ids[0]
            ) if stage_course_ids else infer_stage_id_from_label(stage["label"])

            stage_payloads.append(
                {
                    "id": stage_id,
                    "label": stage["label"],
                    "description": stage["intro"],
                    "courseIds": stage_course_ids,
                }
            )

        stage_payloads_by_major[major_slug] = stage_payloads

    concept_occurrences = defaultdict(list)
    courses = []
    courses_by_id = {}
    dependencies = []

    for major_slug, rows in course_rows_by_major.items():
        stage_labels = {
            stage["id"]: stage["label"] for stage in stage_payloads_by_major[major_slug]
        }
        for row in rows:
            course_id = row["id"]
            payload = direct_source_payloads.get(course_id)
            borrow_id = COURSE_BORROWS.get(course_id)
            if payload is None and borrow_id:
                payload = dict(direct_source_payloads[borrow_id])
            elif payload is None:
                raise ValueError(f"No source payload found for course {course_id}")
            elif borrow_id and not payload["description"] and not payload["concepts"]:
                borrowed_payload = direct_source_payloads[borrow_id]
                payload = {
                    **borrowed_payload,
                    "reference_note": payload["reference_note"] or borrowed_payload["reference_note"],
                }

            concept_ids = []
            for concept_name in payload["concepts"]:
                concept_id = concept_id_for(concept_name)
                concept_ids.append(concept_id)
                concept_occurrences[concept_id].append(
                    {
                        "name": concept_name,
                        "courseId": course_id,
                        "majorId": major_slug,
                        "topicClusters": row["topic_clusters"],
                    }
                )

            prereq_ids = []
            external_prereqs = []
            for prereq in payload["prereqs"]:
                resolved = resolve_course_reference(
                    prereq,
                    major_slug,
                    title_index_by_major,
                    global_title_index,
                )
                if resolved:
                    prereq_ids.append(resolved)
                    dependencies.append(
                        {
                            "id": f"{resolved}__{course_id}",
                            "from": resolved,
                            "to": course_id,
                            "type": "corequisite"
                            if "co-req" in prereq.lower() or "coreq" in prereq.lower()
                            else "prerequisite",
                            "crossMajor": major_slug != infer_major_from_course_id(
                                resolved, course_rows_by_major
                            ),
                            "note": prereq if prereq != cleaned_reference(prereq) else None,
                        }
                    )
                else:
                    external_prereqs.append(prereq)

            lead_ids = []
            external_leads = []
            for lead in payload["leads_into"]:
                resolved = resolve_course_reference(
                    lead,
                    major_slug,
                    title_index_by_major,
                    global_title_index,
                )
                if resolved:
                    lead_ids.append(resolved)
                else:
                    external_leads.append(lead)

            status = (
                "planned"
                if row["title"].startswith("[THEME:")
                else "live"
                if major_slug in {"core", "electrical-engineering"}
                else "stub"
            )
            is_elective = row["title"].startswith("[THEME:")

            course = {
                "id": course_id,
                "title": row["title"],
                "majorId": major_slug,
                "isCore": major_slug == "core",
                "stageId": row["stage"],
                "stageLabel": stage_labels.get(row["stage"], stages_seed[row["stage"]]["label"]),
                "year": row["year"],
                "shortDesc": payload["description"],
                "whyItMatters": payload["why"] or payload["description"],
                "prereqs": unique(prereq_ids),
                "externalPrereqs": unique(external_prereqs),
                "leadsInto": unique(lead_ids),
                "externalLeadsInto": unique(external_leads),
                "skills": payload["skills"],
                "topicClusters": row["topic_clusters"],
                "concepts": unique(concept_ids),
                "relatedTools": [],
                "isElective": is_elective,
                "electiveTheme": row["title"][8:-1] if is_elective else None,
                "electiveTag": row["title"] if is_elective else None,
                "status": status,
                "referenceNote": payload["reference_note"],
            }
            courses.append(course)
            courses_by_id[course_id] = course

    tools = []
    for tool_seed in TOOL_SEEDS:
        concept_candidates = concept_ids_for_tool(tool_seed, courses_by_id, concept_occurrences)
        tools.append(
            {
                **tool_seed,
                "courseIds": [
                    course_id for course_id in tool_seed["courseIds"] if course_id in courses_by_id
                ],
                "conceptIds": concept_candidates,
            }
        )

    for course in courses:
        course["relatedTools"] = [
            tool["id"] for tool in tools if course["id"] in tool["courseIds"]
        ]

    concepts = build_concepts(concept_occurrences, courses_by_id, tools)
    glossary = build_glossary(concepts)
    topic_clusters = build_topic_clusters(cluster_seed, courses, concepts, tools)
    majors = build_majors(
        major_seed,
        source_seed,
        stage_payloads_by_major,
        tools,
        courses_by_id,
    )

    majors_index = [
        {
            "id": major["id"],
            "name": major["name"],
            "shortName": major["shortName"],
            "description": major["description"],
            "depthV1": major["depthV1"],
            "courseCount": sum(len(stage["courseIds"]) for stage in major["stages"]),
        }
        for major in majors
    ]

    return {
        "majors": majors,
        "majors_index": majors_index,
        "courses": courses,
        "concepts": concepts,
        "glossary": glossary,
        "tools": tools,
        "dependencies": unique_dicts(dependencies, "id"),
        "topic_clusters": topic_clusters,
        "stages": list(stages_seed.values()),
    }


def infer_stage_id_from_label(label: str) -> str:
    lowered = label.lower()
    if "foundation" in lowered:
        return "foundation"
    if "core sciences" in lowered:
        return "core-sciences"
    if "engineering core" in lowered:
        return "engineering-core"
    if "entry" in lowered:
        return "major-entry"
    if "core" in lowered:
        return "major-core"
    if "intermediate" in lowered:
        return "intermediate"
    if "advanced" in lowered:
        return "advanced"
    return "capstone"


def infer_major_from_course_id(course_id: str, course_rows_by_major) -> str:
    for major_slug, rows in course_rows_by_major.items():
        if any(row["id"] == course_id for row in rows):
            return major_slug
    raise ValueError(f"Unknown course id {course_id}")


def cleaned_reference(label: str) -> str:
    return re.sub(r"\((?:co-req|coreq|co req).+?\)", "", label, flags=re.I).strip()


def concept_ids_for_tool(tool_seed, courses_by_id, concept_occurrences):
    ranked = Counter()
    for course_id in tool_seed["courseIds"]:
        course = courses_by_id.get(course_id)
        if not course:
            continue
        for concept_id in course["concepts"]:
            concept_occurrence_count = len(concept_occurrences[concept_id])
            ranked[concept_id] += 10 + concept_occurrence_count
    return [concept_id for concept_id, _ in ranked.most_common(6)]


def build_concepts(concept_occurrences, courses_by_id, tools):
    tool_map = defaultdict(list)
    for tool in tools:
        for course_id in tool["courseIds"]:
            tool_map[course_id].append(tool["id"])

    concept_records = []
    concept_ids_by_course = defaultdict(list)
    for concept_id, occurrences in concept_occurrences.items():
        for occurrence in occurrences:
            concept_ids_by_course[occurrence["courseId"]].append(concept_id)

    for concept_id, occurrences in sorted(concept_occurrences.items()):
        name = occurrences[0]["name"]
        course_ids = unique([item["courseId"] for item in occurrences])
        major_ids = unique([item["majorId"] for item in occurrences])
        topic_clusters = unique(
            cluster
            for item in occurrences
            for cluster in item["topicClusters"]
        )
        related_concepts = Counter()
        for course_id in course_ids:
            for other_id in concept_ids_by_course[course_id]:
                if other_id != concept_id:
                    related_concepts[other_id] += 1
        related_tools = unique(
            tool_id for course_id in course_ids for tool_id in tool_map[course_id]
        )
        course_titles = [courses_by_id[course_id]["title"] for course_id in course_ids[:3]]
        cluster_text = ", ".join(topic_clusters[:3]) if topic_clusters else "the curriculum"
        full_definition = (
            f"{name} appears in {', '.join(course_titles)} and is tagged under {cluster_text}. "
            f"It is part of the Engineering Atlas concept graph so courses, tools, and glossary terms can cross-link around it."
        )
        concept_records.append(
            {
                "id": concept_id,
                "name": name,
                "aliases": [],
                "shortDef": f"{name} is a curriculum concept linked to {len(course_ids)} course{'s' if len(course_ids) != 1 else ''}.",
                "extendedDef": full_definition,
                "equation": None,
                "topicClusters": topic_clusters,
                "majorTags": major_ids,
                "taughtIn": course_ids,
                "toolLinks": related_tools,
                "relatedConcepts": [item for item, _ in related_concepts.most_common(6)],
                "isFoundational": "core" in major_ids or len(major_ids) > 1,
            }
        )

    return concept_records


def build_glossary(concepts):
    return [
        {
            "id": concept["id"],
            "term": concept["name"],
            "shortDef": concept["shortDef"],
            "extendedDef": concept["extendedDef"],
            "domain": concept["majorTags"],
            "conceptId": concept["id"],
            "relatedConcepts": concept["relatedConcepts"],
            "relatedTerms": concept["relatedConcepts"],
        }
        for concept in concepts
    ]


def build_topic_clusters(cluster_seed, courses, concepts, tools):
    clusters = {key: dict(value) for key, value in cluster_seed.items()}

    for course in courses:
        for cluster_id in course["topicClusters"]:
            if cluster_id in clusters:
                clusters[cluster_id]["courseIds"].append(course["id"])

    for concept in concepts:
        for cluster_id in concept["topicClusters"]:
            if cluster_id in clusters:
                clusters[cluster_id]["conceptIds"].append(concept["id"])

    for tool in tools:
        for cluster_id in tool["clusterIds"]:
            if cluster_id in clusters:
                clusters[cluster_id]["toolIds"].append(tool["id"])

    for cluster in clusters.values():
        cluster["courseIds"] = unique(cluster["courseIds"])
        cluster["conceptIds"] = unique(cluster["conceptIds"])
        cluster["toolIds"] = unique(cluster["toolIds"])

    return sorted(clusters.values(), key=lambda item: item["name"])


def build_majors(major_seed, source_seed, stage_payloads_by_major, tools, courses_by_id):
    tool_ids_by_major = defaultdict(list)
    for tool in tools:
        for major_id in tool["majorIds"]:
            tool_ids_by_major[major_id].append(tool["id"])

    majors = []
    for major_id, seed in major_seed.items():
        source = source_seed[seed["name"]]
        concept_clusters = unique(
            cluster
            for stage in stage_payloads_by_major[major_id]
            for course_id in stage["courseIds"]
            for cluster in courses_by_id[course_id]["topicClusters"]
        )
        majors.append(
            {
                "id": major_id,
                "name": seed["name"],
                "shortName": seed["shortName"],
                "description": source["overview"].get("Description", ""),
                "mainSubfields": split_inline_list(
                    source["overview"].get("Main subfields", "")
                ),
                "coreFoundationIds": MAJOR_FOUNDATION_IDS[major_id],
                "conceptClusters": concept_clusters,
                "summaryChain": source["summary"].get("Main dependency chain", ""),
                "recommendedTools": unique(tool_ids_by_major[major_id]),
                "depthV1": seed["depthV1"],
                "colorToken": seed["colorToken"],
                "icon": seed["icon"],
                "stages": stage_payloads_by_major[major_id],
            }
        )

    return sorted(majors, key=lambda item: list(MAJOR_ABBR_TO_SLUG.values()).index(item["id"]))


def unique(values):
    seen = set()
    result = []
    for value in values:
        if value in seen:
            continue
        seen.add(value)
        result.append(value)
    return result


def unique_dicts(values, key):
    seen = set()
    result = []
    for value in values:
        marker = value[key]
        if marker in seen:
            continue
        seen.add(marker)
        result.append(value)
    return result


def write_json(path: Path, payload):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def reset_output_dirs():
    for relative in [
        "majors",
        "courses",
        "concepts",
        "glossary",
        "graph",
        "taxonomy",
        "tools",
    ]:
        target = DATA_DIR / relative
        if target.exists():
            shutil.rmtree(target)
        target.mkdir(parents=True, exist_ok=True)


def write_dataset(dataset):
    for major in dataset["majors"]:
        write_json(DATA_DIR / "majors" / f"{major['id']}.json", major)

    for course in dataset["courses"]:
        write_json(
            DATA_DIR / "courses" / course["majorId"] / f"{course['id']}.json",
            course,
        )

    write_json(DATA_DIR / "concepts" / "concepts.json", dataset["concepts"])
    write_json(DATA_DIR / "glossary" / "glossary.json", dataset["glossary"])
    write_json(DATA_DIR / "graph" / "dependencies.json", dataset["dependencies"])
    write_json(DATA_DIR / "taxonomy" / "topic-clusters.json", dataset["topic_clusters"])
    write_json(DATA_DIR / "taxonomy" / "stages.json", dataset["stages"])
    write_json(DATA_DIR / "taxonomy" / "majors-index.json", dataset["majors_index"])
    write_json(DATA_DIR / "tools" / "tools.json", dataset["tools"])


def main():
    dataset = build_dataset()
    reset_output_dirs()
    write_dataset(dataset)
    print(
        json.dumps(
            {
                "majors": len(dataset["majors"]),
                "courses": len(dataset["courses"]),
                "concepts": len(dataset["concepts"]),
                "glossary": len(dataset["glossary"]),
                "dependencies": len(dataset["dependencies"]),
                "clusters": len(dataset["topic_clusters"]),
                "tools": len(dataset["tools"]),
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()
