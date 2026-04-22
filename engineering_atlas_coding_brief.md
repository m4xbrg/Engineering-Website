# Engineering Atlas — Claude Code Implementation Brief

> Status: Ready for development
> Source: engineering_atlas.md (curriculum source of truth)
> Audience: Claude Code / developer handoff

---

## 1. Project Summary

**Engineering Atlas** is a structured, curriculum-driven engineering reference platform. It maps undergraduate engineering education across 10 disciplines into an explorable web application combining a curriculum map, course concept explorer, and interactive engineering tools (calculators, visualizers, simulators).

**Key product facts for implementation:**

- Static-first, no user accounts, no auth, no backend in V1
- Curriculum data is authored in JSON, not a CMS or database
- Electrical Engineering is the only fully built specialization in V1; 9 others are curriculum map stubs
- Core Engineering is a shared foundation layer referenced by all majors
- Interactive Labs (tools) run entirely client-side — no server computation
- The dependency graph (prerequisites / leads-into) is a core data relationship, not decoration

---

## 2. MVP Scope

### Included in V1

**Pages**

- [ ] Homepage
- [ ] `/curriculum` — all-majors overview grid
- [ ] `/curriculum/core` — Core Engineering overview
- [ ] `/curriculum/core/[courseSlug]` — Core course detail (~16 pages)
- [ ] `/majors/[majorSlug]` — Major overview (all 10 majors)
- [ ] `/majors/electrical-engineering/[courseSlug]` — EE course detail (~22 pages)
- [ ] `/majors/[majorSlug]/[courseSlug]` — Stub course detail for 9 non-EE majors
- [ ] `/labs` — Interactive Labs hub
- [ ] `/labs/[toolSlug]` — Individual tool pages (10 tools)
- [ ] `/concepts` — Concept index (searchable)
- [ ] `/concepts/[conceptSlug]` — Concept detail
- [ ] `/glossary` — A–Z glossary index
- [ ] `/glossary/[termSlug]` — Glossary term page
- [ ] `/about` — Product description page
- [ ] `404` page

**Data**

- [ ] All 10 majors as structured JSON
- [ ] All courses across all majors (208 records: 140 core + 68 elective stubs)
- [ ] Full concept list (~80–120 concepts extracted from curriculum)
- [ ] Tool definitions for 10 MVP tools
- [ ] Prerequisite edge graph
- [ ] Topic cluster taxonomy (50 clusters)

**Tools (all client-side)**

- [ ] T01 Unit Converter
- [ ] T02 Ohm's Law & Power Calculator
- [ ] T03 Resistor Color Code Decoder
- [ ] T04 Logic Gate Simulator
- [ ] T05 RLC Circuit Response Visualizer
- [ ] T06 Fourier Series Visualizer
- [ ] T07 Bode Plot Generator
- [ ] T08 Phasor & AC Circuit Calculator
- [ ] T09 Op-Amp Circuit Configurator
- [ ] T10 Free Body Diagram Builder

**Features**

- [ ] Prerequisite chain display on course pages (list form, not graph)
- [ ] Concept chips cross-linking courses and tools
- [ ] Major filtering on curriculum overview
- [ ] Topic cluster filtering on Labs hub
- [ ] Text search on concept index and glossary
- [ ] "Used by X majors" display on Core Engineering course pages
- [ ] Elective slots displayed as styled stub cards

### Explicitly Excluded from V1

- User accounts, auth, progress tracking
- Dependency graph visualization (D3 force graph) — list only
- Video or embedded lecture content
- Community features
- Full tool integration for non-EE majors
- AI/chat features
- Dark mode (design system decision to defer)
- Mobile app

---

## 3. Recommended Tech Stack

### Core Framework

| Layer         | Choice                       | Reason                                                                                                      |
| ------------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------- |
| Framework     | **Next.js 14+ (App Router)** | Static generation for curriculum pages; file-based routing matches page structure; RSC for data-heavy pages |
| Language      | **TypeScript (strict)**      | Required — data model has many cross-references; type safety prevents ID mismatch bugs                      |
| Styling       | **Tailwind CSS v3**          | Utility-first; design tokens via CSS variables + Tailwind config; no runtime CSS                            |
| UI Primitives | **shadcn/ui (selective)**    | Use only: Dialog, Tabs, Badge, Tooltip, Separator, ScrollArea. Do not use full component library lock-in.   |

### Data & Content

| Layer           | Choice                                            | Reason                                                                           |
| --------------- | ------------------------------------------------- | -------------------------------------------------------------------------------- |
| Curriculum data | **Local JSON files**                              | No CMS needed; data is authored not user-generated; version-controlled with code |
| Data validation | **Zod**                                           | Validate JSON at build time; generate TypeScript types from schemas              |
| Data loading    | **Next.js `generateStaticParams` + local import** | All curriculum pages statically generated at build; zero runtime data fetching   |

### Tools / Visualization

| Layer             | Choice                        | Reason                                                                                   |
| ----------------- | ----------------------------- | ---------------------------------------------------------------------------------------- |
| Charts            | **Recharts**                  | Declarative React API; sufficient for Bode/RLC/Fourier; responsive built-in              |
| Logic gate canvas | **React Flow**                | Handles nodes, edges, ports, drag-and-drop for Logic Gate Simulator (T04)                |
| FBD canvas        | **Konva.js / react-konva**    | Canvas2D for Free Body Diagram Builder (T10); simpler than React Flow for physics canvas |
| Math rendering    | **KaTeX** (via `react-katex`) | Render LaTeX equations on course/concept pages; lightweight vs MathJax                   |
| Complex math      | **mathjs**                    | Complex number arithmetic for Bode/RLC/Phasor tools; proven numerics library             |
| Animations        | **Framer Motion**             | Page transitions + tool animations (Fourier series stacking); CSS-first where possible   |

### Search

| Layer         | Choice      | Reason                                                                                        |
| ------------- | ----------- | --------------------------------------------------------------------------------------------- |
| Client search | **Fuse.js** | Fuzzy search over concepts and glossary; entirely client-side; no Algolia needed at MVP scale |

### Deployment

| Layer     | Choice                          | Reason                                                                          |
| --------- | ------------------------------- | ------------------------------------------------------------------------------- |
| Hosting   | **Vercel**                      | Native Next.js; zero-config static export; edge CDN; preview deployments per PR |
| Analytics | **Vercel Analytics** (built-in) | Zero-config; privacy-respecting; no cookies                                     |

### Dev Tooling

```
eslint + @typescript-eslint
prettier
husky + lint-staged (pre-commit)
vitest (unit tests for math utilities)
```

---

## 4. Recommended File / Folder Structure

```
engineering-atlas/
├── app/                              # Next.js App Router
│   ├── layout.tsx                    # Root layout (nav, footer, font loading)
│   ├── page.tsx                      # Homepage
│   ├── about/
│   │   └── page.tsx
│   ├── curriculum/
│   │   ├── page.tsx                  # All-majors overview
│   │   ├── core/
│   │   │   ├── page.tsx              # Core Engineering overview
│   │   │   └── [courseSlug]/
│   │   │       └── page.tsx          # Core course detail
│   │   └── layout.tsx                # Curriculum section layout (sidebar nav)
│   ├── majors/
│   │   ├── [majorSlug]/
│   │   │   ├── page.tsx              # Major overview
│   │   │   └── [courseSlug]/
│   │   │       └── page.tsx          # Course detail
│   │   └── layout.tsx
│   ├── labs/
│   │   ├── page.tsx                  # Labs hub / tool directory
│   │   ├── [toolSlug]/
│   │   │   └── page.tsx              # Individual tool page (shell)
│   │   └── layout.tsx
│   ├── concepts/
│   │   ├── page.tsx                  # Concept index
│   │   └── [conceptSlug]/
│   │       └── page.tsx
│   ├── glossary/
│   │   ├── page.tsx
│   │   └── [termSlug]/
│   │       └── page.tsx
│   └── not-found.tsx
│
├── components/
│   ├── layout/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── SiteNav.tsx
│   │   ├── CurriculumSidebar.tsx     # Left nav for curriculum section
│   │   └── BreadcrumbBar.tsx
│   │
│   ├── curriculum/
│   │   ├── MajorCard.tsx             # Used on /curriculum overview grid
│   │   ├── MajorGrid.tsx
│   │   ├── CourseCard.tsx            # Used on major overview, search results
│   │   ├── StageBlock.tsx            # Year/stage group on major overview
│   │   ├── ElectiveCard.tsx          # Styled stub for elective slots
│   │   ├── PrereqChain.tsx           # Prerequisite list display on course page
│   │   ├── CourseConceptList.tsx     # Concept chips list on course page
│   │   ├── SharedByBadge.tsx         # "Used by X majors" on Core courses
│   │   └── FoundationZone.tsx        # Core course block on major overview
│   │
│   ├── tools/
│   │   ├── ToolHeader.tsx
│   │   ├── ControlPanel.tsx
│   │   ├── ParameterSlider.tsx
│   │   ├── UnitInput.tsx
│   │   ├── ModeSwitch.tsx
│   │   ├── ResultsStrip.tsx
│   │   ├── InsightPanel.tsx
│   │   ├── RelatedContent.tsx
│   │   ├── ToolRecommendations.tsx
│   │   ├── FormulaDisplay.tsx
│   │   ├── ToolCard.tsx              # Used on /labs hub and course pages
│   │   └── ToolGrid.tsx
│   │
│   ├── charts/
│   │   ├── LineChart.tsx
│   │   ├── DualAxisChart.tsx         # Bode magnitude + phase (shared x-axis)
│   │   ├── SpectrumChart.tsx         # Fourier coefficient bar chart
│   │   └── ChartAnnotation.tsx       # Marker component for chart annotations
│   │
│   ├── diagrams/
│   │   ├── ResistorSVG.tsx
│   │   ├── PhasorDiagram.tsx
│   │   ├── PowerTriangleSVG.tsx
│   │   ├── CircuitSchematic.tsx      # Op-amp configurations
│   │   └── LogicCanvas.tsx           # React Flow wrapper for T04
│   │
│   ├── concepts/
│   │   ├── ConceptChip.tsx           # Inline chip with tooltip
│   │   ├── ConceptCard.tsx           # Used on /concepts index
│   │   └── ConceptSearch.tsx
│   │
│   └── ui/                           # Generic primitives (non-shadcn)
│       ├── Badge.tsx
│       ├── Tag.tsx
│       ├── SectionHeader.tsx
│       ├── EmptyState.tsx
│       └── StatusBadge.tsx           # live / planned / stub
│
├── data/                             # All structured curriculum JSON
│   ├── majors/
│   │   ├── core.json
│   │   ├── electrical-engineering.json
│   │   ├── mechanical-engineering.json
│   │   ├── civil-engineering.json
│   │   ├── chemical-engineering.json
│   │   ├── computer-engineering.json
│   │   ├── aerospace-engineering.json
│   │   ├── biomedical-engineering.json
│   │   ├── industrial-engineering.json
│   │   └── materials-engineering.json
│   │
│   ├── courses/
│   │   ├── core/                     # 16 core course JSON files
│   │   │   ├── calculus-i.json
│   │   │   └── ...
│   │   ├── electrical-engineering/   # 24 course JSON files (incl. electives)
│   │   │   ├── circuit-analysis-i.json
│   │   │   └── ...
│   │   └── [major-slug]/             # one folder per remaining major
│   │
│   ├── concepts.json                 # Flat array of all concept records
│   ├── glossary.json                 # Flat array of all glossary terms
│   ├── tools.json                    # All 10 tool definitions
│   ├── topic-clusters.json           # 50 cluster definitions
│   ├── stages.json                   # Stage registry (8 stages)
│   ├── majors-index.json             # Lightweight major list for nav
│   └── graph/
│       ├── prerequisites.json        # PrereqEdge[] — all dependency edges
│       └── cluster-relationships.json
│
├── lib/
│   ├── data/
│   │   ├── getMajor.ts               # Load and validate a major record
│   │   ├── getCourse.ts              # Load and validate a course record
│   │   ├── getConcept.ts
│   │   ├── getToolDef.ts             # Tool definition (not the tool component)
│   │   ├── getPrereqs.ts             # Resolve prerequisite chain for a course
│   │   ├── getRelatedTools.ts        # Tools linked to a course or concept
│   │   ├── getAllMajors.ts
│   │   ├── getAllCourses.ts
│   │   └── index.ts                  # Re-exports
│   │
│   ├── math/
│   │   ├── complex.ts                # Complex number operations
│   │   ├── transfer-fn.ts            # H(jω) evaluation
│   │   ├── rlc.ts                    # RLC step + frequency response
│   │   ├── fourier.ts                # Fourier series coefficients
│   │   ├── ac-power.ts               # AC power triangle
│   │   ├── bode.ts                   # Bode data generation
│   │   ├── logic-sim.ts              # Gate propagation, truth table
│   │   ├── fbd.ts                    # 2D force/moment math
│   │   ├── color-code.ts             # Resistor color encode/decode
│   │   └── units.ts                  # Unit conversion tables
│   │
│   ├── schemas/
│   │   ├── major.schema.ts           # Zod schema → inferred TypeScript type
│   │   ├── course.schema.ts
│   │   ├── concept.schema.ts
│   │   ├── tool.schema.ts
│   │   ├── graph.schema.ts
│   │   └── index.ts
│   │
│   └── utils/
│       ├── slugify.ts
│       ├── clusterFilter.ts          # Filter courses/tools by cluster ID
│       └── searchIndex.ts            # Build Fuse.js index from data
│
├── tools/                            # Tool implementations (one folder per tool)
│   ├── unit-converter/
│   │   └── UnitConverterTool.tsx
│   ├── ohms-law/
│   │   └── OhmsLawTool.tsx
│   ├── resistor-color-code/
│   │   └── ResistorColorCodeTool.tsx
│   ├── logic-gate-sim/
│   │   ├── LogicGateTool.tsx
│   │   ├── GateNode.tsx              # React Flow custom node
│   │   ├── TruthTablePanel.tsx
│   │   └── gateLogic.ts             # Gate evaluation (imports lib/math/logic-sim)
│   ├── rlc-response/
│   │   └── RLCResponseTool.tsx
│   ├── fourier-series/
│   │   └── FourierSeriesTool.tsx
│   ├── bode-plot/
│   │   └── BodePlotTool.tsx
│   ├── phasor-calc/
│   │   └── PhasorCalcTool.tsx
│   ├── opamp-config/
│   │   ├── OpAmpTool.tsx
│   │   └── opamp-configs.ts          # Config definitions: gain formula, schematic spec
│   └── fbd-builder/
│       ├── FBDTool.tsx
│       └── ForceNode.tsx
│
├── public/
│   ├── icons/
│   │   └── majors/                   # SVG icons per major
│   └── og/                           # OpenGraph images
│
├── styles/
│   └── globals.css                   # CSS variables, Tailwind base layer
│
├── types/
│   └── index.ts                      # Re-export all Zod-inferred types
│
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 5. Page Types

### P1 — Homepage (`app/page.tsx`)

**Purpose:** Platform orientation and entry point

**Sections:**

1. Hero — platform name, one-line purpose, CTA buttons ("Explore Curriculum", "Open Labs")
2. What Is Engineering Atlas — 3 cards: Curriculum Map, Interactive Labs, Concept Explorer
3. Featured Major — EE spotlight with 3 sample course cards
4. Featured Tools — 3 tool cards (T02, T05, T06 recommended)
5. Major Grid — all 10 majors as icon + name tiles
6. Footer

**Data needed:** `majors-index.json`, selected `tools.json` entries

**Rendering:** Static (no dynamic data)

---

### P2 — Curriculum Overview (`app/curriculum/page.tsx`)

**Purpose:** Entry to all 10 majors; discovery and comparison

**Sections:**

1. Page header + description
2. Filter bar — by discipline cluster (EE/ME/CE/etc.), by depth (full/map)
3. Major cards grid (10 cards) — each shows: icon, name, short description, main subfields, foundation depth badge
4. Core Engineering callout — prominent link explaining the shared foundation

**Data needed:** All entries from `majors-index.json` + major descriptions

**Rendering:** Static

---

### P3 — Major Overview (`app/majors/[majorSlug]/page.tsx`)

**Purpose:** Year-by-year curriculum map for one major

**Sections:**

1. Major header — name, shortName badge, description, main subfields tags
2. Foundation Zone — Core Engineering courses this major depends on (visual callout, links to core course pages)
3. Curriculum stages — one `<StageBlock>` per year/stage, each containing:
   - Stage label (e.g. "Year 2 — EE Core Entry")
   - Grid of `<CourseCard>` components
   - Elective slots rendered as `<ElectiveCard>` (dashed style)
4. Topic clusters — tags showing the major's concept clusters
5. Recommended tools — tool cards for tools linked to this major
6. Summary — dependency chain text, concept cluster list

**Variants:**

- **`depth: "full"` (Core + EE):** Full course cards with descriptions, prerequisite info, tool links
- **`depth: "map"` (other 9 majors):** Compact course cards — title, year, clusters only. No tool links.

**Data needed:** `majors/{slug}.json` + all `courses/{slug}/*.json` + relevant `tools.json` entries

**Rendering:** `generateStaticParams` over all major slugs → fully static

---

### P4 — Course Detail (`app/majors/[majorSlug]/[courseSlug]/page.tsx`)

**Purpose:** Deep dive into one course

**Sections:**

1. Breadcrumb — Major → Stage → Course
2. Course header — title, major badge, year/stage badge, topic cluster tags
3. Description + Why It Matters
4. Skills — tag list
5. Prerequisite chain — `<PrereqChain>` component (list of course chips with links, ordered)
6. Leads Into — list of course chips
7. Concepts — `<ConceptChip>` list (each chip shows tooltip definition, links to concept page)
8. Related Tools — tool cards (EE courses only in V1; stubs for others)
9. Shared By — if `isCore`, show "Used by X majors" with major badge links

**Variants:**

- **EE / Core courses:** Full detail — all sections populated
- **Non-EE stubs:** Sections 1–6 + a "Full content coming soon" callout. Concepts and tools omitted.

**Data needed:** Single `courses/{major}/{slug}.json` + resolved prereq courses + linked tools + linked concepts

**Rendering:** `generateStaticParams` → fully static

---

### P5 — Labs Hub (`app/labs/page.tsx`)

**Purpose:** Tool discovery and entry

**Sections:**

1. Page header + description
2. Filter bar — category (Calculator / Visualizer / Simulator / Reference), major, cluster
3. Tool grid — `<ToolCard>` for each tool
   - Each card: name, category badge, major tags, one-line description, complexity dot, "Open Tool" button
4. Coming Soon section — placeholder cards for planned future tools

**Data needed:** `tools.json`

**Rendering:** Static

---

### P6 — Tool Page (`app/labs/[toolSlug]/page.tsx`)

**Purpose:** Run an interactive engineering tool

**Sections (fixed layout):**

1. `<ToolHeader>` — title, category badge, major tags, purpose sentence, related course chips
2. Main panel (2-col desktop, stacked mobile):
   - Left: `<ControlPanel>` with tool-specific inputs
   - Right: visualization/output (chart, canvas, SVG, etc.)
3. `<ResultsStrip>` — key computed values (calculator tools only)
4. `<InsightPanel>` — 3–5 authored "What to notice" bullets
5. `<RelatedContent>` — courses, concepts, majors in a 3-col grid
6. `<ToolRecommendations>` — horizontally scrolling related tool cards

**Tool component loading:**

```tsx
// app/labs/[toolSlug]/page.tsx
import dynamic from "next/dynamic";
const toolComponents: Record<string, React.ComponentType> = {
  "unit-converter": dynamic(
    () => import("@/tools/unit-converter/UnitConverterTool"),
  ),
  "ohms-law": dynamic(() => import("@/tools/ohms-law/OhmsLawTool")),
  // ...
};
```

Tool components are dynamically imported (client-side only — no SSR). The page shell (header, insight panel, related content) is server-rendered static.

**Data needed:** Single `tools.json` entry by slug (for metadata); tool component handles its own state

**Rendering:** Page shell static; tool component client-side dynamic import

---

### P7 — Concept Detail (`app/concepts/[conceptSlug]/page.tsx`)

**Purpose:** Definition + cross-links for one engineering concept

**Sections:**

1. Concept name + topic cluster tags + major tags
2. Short definition (1 sentence) + extended definition (2–5 sentences)
3. Core equation — rendered in KaTeX if present
4. Taught in — list of course chips
5. Explore with tools — tool cards where this concept is linked
6. Related concepts — concept chip cloud
7. Appears in majors — major badge list

**Data needed:** Single concept from `concepts.json` + resolved course/tool/concept refs

**Rendering:** `generateStaticParams` → fully static

---

### P8 — Concept Index (`app/concepts/page.tsx`)

**Purpose:** Browse and search all concepts

**Sections:**

1. Search input (client-side Fuse.js)
2. Filter bar — by topic cluster, by major
3. Results grid — `<ConceptCard>` per concept (name, short def, cluster tags, major tags)

**Rendering:** Static page shell; search is client-side

---

### P9 — Glossary Index + Term (`app/glossary/`)

**Glossary Index:**

- A–Z jump links
- Full sorted list of all terms with one-line definitions

**Term Page:**

- Term, domain tags, definition
- Link to full Concept page if `conceptId` is set
- Related terms

**Rendering:** Fully static

---

## 6. Reusable Components

### Layout

```
SiteHeader          - Logo, nav links, theme (no toggle in V1), search icon
SiteFooter          - Links, attribution
SiteNav             - Top-level navigation
CurriculumSidebar   - Left sidebar nav for curriculum section (major list)
BreadcrumbBar       - Dynamic breadcrumb from route
PageHeader          - Standard h1 + description block (used on all section pages)
```

### Curriculum

```
MajorCard           - Icon, name, description, depth badge, subfield tags
MajorGrid           - Responsive grid of MajorCards
CourseCard          - Title, year badge, cluster tags, description (full or compact)
StageBlock          - Year/stage heading + CourseCard grid
ElectiveCard        - Dashed border, theme name, tag, "Planned" badge
PrereqChain         - Ordered list of CourseRef chips (prerequisites)
ConceptChip         - Inline pill with concept name + tooltip definition
SharedByBadge       - "Used by N majors" + major icon links (Core courses only)
FoundationZone      - Callout box listing core prereqs on major overview
DepthBadge          - "Full" or "Curriculum Map" badge per major/course
```

### Tools

```
ToolCard            - Tool name, category, description, major tags, open button
ToolGrid            - Filterable grid of ToolCards
ToolHeader          - Title, category badge, major tags, purpose, course chips
ControlPanel        - Wrapper for tool input controls
ParameterSlider     - Labeled slider with live value display and unit
UnitInput           - Number input with unit selector dropdown
ModeSwitch          - Segmented button group for mode/type switching
ResultsStrip        - Row of labeled key-value result cards
InsightPanel        - "What to notice" list with bold keyword + explanation
RelatedContent      - 3-col grid: courses | concepts | majors
ToolRecommendations - Horizontal scroll of related ToolCards
FormulaDisplay      - Shows formula string; highlighted substituted values
```

### Charts (all Recharts-based)

```
LineChart           - Single y-axis line chart (step response, time domain)
DualAxisChart       - Two stacked charts with shared x-axis (Bode: mag + phase)
SpectrumChart       - Bar chart (Fourier coefficients)
ChartAnnotation     - Reference line + label for annotated chart points
```

### Diagrams (all SVG)

```
ResistorSVG         - 4/5 band resistor visual with colored bands
PhasorDiagram       - Vector arrows for V and I phasors
PowerTriangleSVG    - P/Q/S right triangle with labels
CircuitSchematic    - Op-amp schematic per configuration (7 static SVGs)
```

### Concepts / Glossary

```
ConceptCard         - Name, short def, cluster chips, major tags
ConceptSearch       - Fuse.js search input over concepts
GlossaryEntry       - Term, definition, domain tags, concept link
AlphaIndex          - A–Z jump links for glossary
```

### UI Primitives

```
Badge               - Colored label (category, year, stage)
Tag                 - Topic cluster tag (outlined)
MajorBadge          - Major-colored badge with shortName
StatusBadge         - live | stub | planned
EmptyState          - Icon + message for empty filter results
SectionHeader       - H2 + optional description + optional action
Divider             - Styled HR for section separation
```

---

## 7. Data Loading / Content Strategy

### Strategy: Static JSON + Build-Time Validation

All curriculum data lives in `/data/` as JSON files. No database, no CMS, no API calls at runtime.

**Data flow:**

```
JSON files → Zod validation at build → TypeScript types → lib/data/ functions → page components → static HTML
```

---

### Schema Validation (Zod)

Define all schemas in `lib/schemas/`. Every JSON file is validated at import time during build.

```typescript
// lib/schemas/course.schema.ts
import { z } from "zod";

export const CourseSchema = z.object({
  id: z.string(),
  title: z.string(),
  majorId: z.string(),
  isCore: z.boolean(),
  stageId: z.string(),
  year: z.string(),
  shortDesc: z.string().max(250),
  whyItMatters: z.string().max(200).optional(),
  prereqs: z.array(z.string()),
  leadsInto: z.array(z.string()),
  skills: z.array(z.string()).max(8),
  topicClusters: z.array(z.string()),
  concepts: z.array(z.string()),
  relatedTools: z.array(z.string()),
  isElective: z.boolean(),
  electiveTheme: z.string().nullable(),
  status: z.enum(["live", "stub", "planned"]),
});

export type Course = z.infer<typeof CourseSchema>;
```

Run validation in a `next.config.ts` plugin or as a build step. Fail the build on invalid data.

---

### Data Loader Functions (`lib/data/`)

All data loaders are **synchronous imports** (JSON loaded at module level, not fetched):

```typescript
// lib/data/getCourse.ts
import courses_core from '@/data/courses/core'       // barrel import
import courses_ee from '@/data/courses/electrical-engineering'
// ... etc

const allCourses = [...courses_core, ...courses_ee, ...]

export function getCourse(majorSlug: string, courseSlug: string): Course | undefined {
  return allCourses.find(c => c.majorId === majorSlug && c.id === courseSlug)
}

export function getCoursesByMajor(majorSlug: string): Course[] {
  return allCourses.filter(c => c.majorId === majorSlug)
}
```

**Key loaders to implement:**

| Function                         | Returns     | Used by                      |
| -------------------------------- | ----------- | ---------------------------- |
| `getMajor(slug)`                 | `Major`     | Major overview page          |
| `getAllMajors()`                 | `Major[]`   | Curriculum overview, nav     |
| `getCourse(major, slug)`         | `Course`    | Course detail page           |
| `getCoursesByMajor(slug)`        | `Course[]`  | Major overview               |
| `getConcept(slug)`               | `Concept`   | Concept detail page          |
| `getAllConcepts()`               | `Concept[]` | Concept index                |
| `getToolDef(slug)`               | `ToolDef`   | Tool page shell              |
| `getAllTools()`                  | `ToolDef[]` | Labs hub                     |
| `getPrereqChain(courseId)`       | `Course[]`  | Course detail prereq display |
| `getRelatedTools(courseId)`      | `ToolDef[]` | Course detail, concept page  |
| `getConceptsForCourse(courseId)` | `Concept[]` | Course detail concept list   |
| `getCoursesByCluster(clusterId)` | `Course[]`  | Topic cluster pages          |

---

### Static Generation

Every curriculum page uses `generateStaticParams`:

```typescript
// app/majors/[majorSlug]/[courseSlug]/page.tsx
export async function generateStaticParams() {
  const allCourses = getAllCourses();
  return allCourses.map((c) => ({
    majorSlug: c.majorId,
    courseSlug: c.id,
  }));
}
```

Result: ~250 fully static HTML pages. No server-side rendering. Near-instant navigation.

---

### Tool Data vs Tool Components

**Tool definitions** (`data/tools.json`) are static metadata: title, category, description, links. Loaded like any curriculum data.

**Tool components** (`tools/*/`) contain the interactive implementation. Loaded via `next/dynamic` with `{ ssr: false }` because they use browser APIs (canvas, ResizeObserver, etc.).

```typescript
// Separate concern: metadata (server) from implementation (client)
const toolMeta = getToolDef(toolSlug)           // static, server-side
const ToolComponent = dynamic(                  // dynamic, client-side only
  () => import(`@/tools/${toolSlug}/index`),
  { ssr: false, loading: () => <ToolSkeleton /> }
)
```

---

### Search Index

Build Fuse.js index client-side from the concepts/glossary JSON:

```typescript
// lib/utils/searchIndex.ts
import Fuse from "fuse.js";
import concepts from "@/data/concepts.json";

export const conceptSearchIndex = new Fuse(concepts, {
  keys: ["name", "aliases", "shortDef"],
  threshold: 0.35,
});
```

Index creation is fast (<5ms for ~200 concepts). No server needed.

---

### Course Barrel Imports

Each major's courses are exported from a barrel:

```typescript
// data/courses/electrical-engineering/index.ts
export { default as circuitAnalysisI } from "./circuit-analysis-i.json";
export { default as circuitAnalysisII } from "./circuit-analysis-ii.json";
// ... all 24 EE courses
```

TypeScript resolves JSON imports via `tsconfig.json` `resolveJsonModule: true`.

---

## 8. Initial Build Order

### Phase 0 — Foundation (before any pages)

```
0.1  Project init: Next.js 14, TypeScript strict, Tailwind, ESLint, Prettier
0.2  Define Tailwind config: color tokens per major, spacing scale, font config
0.3  globals.css: CSS custom properties for major colors, font stacks
0.4  Install dependencies: recharts, react-flow, react-konva, mathjs, fuse.js,
     zod, framer-motion, react-katex, shadcn/ui (selective)
0.5  Author Zod schemas for all data types (major, course, concept, tool, graph)
0.6  Create TypeScript types from schemas (types/index.ts)
0.7  Write data JSON: all 10 majors, all 208 course stubs (title + metadata only)
     Full concept list, tool definitions, prerequisites graph
0.8  Validate all JSON against schemas — fix errors
0.9  Implement all lib/data/ loader functions with tests
0.10 Implement lib/math/ modules with unit tests (complex, rlc, fourier, bode,
     logic-sim, fbd, units, color-code)
```

### Phase 1 — Layout Shell

```
1.1  Root layout.tsx: font loading, global CSS, SiteHeader, SiteFooter
1.2  SiteHeader: logo, top nav (Curriculum, Labs, Concepts, Glossary)
1.3  SiteFooter: links, tagline
1.4  BreadcrumbBar component
1.5  404 page
1.6  /about page (static content)
```

### Phase 2 — Curriculum Section

```
2.1  Core UI components: MajorCard, MajorGrid, MajorBadge, Badge, Tag, StatusBadge
2.2  /curriculum page (all-majors overview) — MajorGrid with filter bar
2.3  CourseCard (full + compact variants), StageBlock, ElectiveCard, FoundationZone
2.4  /curriculum/core page — Core Engineering overview
2.5  generateStaticParams for core courses
2.6  /curriculum/core/[courseSlug] — Core course detail page
     (PrereqChain, ConceptChip, SharedByBadge — stubs OK for now)
2.7  /majors/[majorSlug] — Major overview template
     generateStaticParams for all 10 majors
     EE gets full cards; others get compact cards
2.8  /majors/[majorSlug]/[courseSlug] — Course detail template
     generateStaticParams for all 208 courses
     EE + Core: full detail; others: stub layout
2.9  CurriculumSidebar — major list + stage jump links
2.10 ConceptChip (inline chip + tooltip) — integrate on course pages
2.11 PrereqChain — resolve and render prereq list on course pages
2.12 RelatedContent component (courses | concepts | majors grid)
```

### Phase 3 — Labs Hub (tool metadata only)

```
3.1  ToolCard, ToolGrid components
3.2  /labs page — hub with filter bar (category, major, cluster)
3.3  ToolHeader, InsightPanel, RelatedContent, ToolRecommendations
3.4  Tool page shell (/labs/[toolSlug]) — metadata + empty tool slot
3.5  Dynamic import scaffolding (ssr: false, ToolSkeleton loading state)
```

### Phase 4 — Tools (in build order)

```
4.1  T01 Unit Converter — validates page shell, UnitInput, ControlPanel
4.2  T02 Ohm's Law — ResultsStrip, FormulaDisplay, PowerTriangleSVG
4.3  T03 Resistor Color Code — ResistorSVG, ModeSwitch, visual output
4.4  T05 RLC Response — LineChart, DualAxisChart, ParameterSlider, ChartAnnotation
4.5  T06 Fourier Series — SpectrumChart, animation (reuses LineChart)
4.6  T07 Bode Plot — pole/zero input, stability output (reuses DualAxisChart)
4.7  T08 Phasor Calc — PhasorDiagram SVG, complex number display
4.8  T09 Op-Amp Config — CircuitSchematic SVG (7 configs), gain/bandwidth output
4.9  T04 Logic Gate Sim — React Flow canvas, gate nodes, truth table panel
4.10 T10 FBD Builder — Konva canvas, force vectors, equilibrium output
```

### Phase 5 — Concepts + Glossary

```
5.1  ConceptCard, ConceptSearch (Fuse.js)
5.2  /concepts page — searchable index with cluster/major filters
5.3  /concepts/[conceptSlug] — concept detail with KaTeX equations
5.4  GlossaryEntry, AlphaIndex
5.5  /glossary page
5.6  /glossary/[termSlug]
5.7  Back-link concept chips on course pages to concept detail pages
```

### Phase 6 — Homepage + Polish

```
6.1  Homepage — hero, feature cards, EE spotlight, tool preview, major grid
6.2  OG images for major pages, tool pages, homepage
6.3  Meta tags: title, description, canonical, OG on all page types
6.4  Sitemap generation (next-sitemap or custom)
6.5  Audit all cross-links for correctness (prereqs resolve, concept IDs valid)
6.6  Mobile layout pass — all pages, test breakpoints
6.7  Accessibility pass — focus states, ARIA labels, skip-nav, color contrast
6.8  Performance pass — image optimization, bundle analysis, Recharts lazy load
6.9  Vercel deployment, preview URL, analytics enabled
```

---

## 9. Risks / Complexity Notes

### High Risk — Simplify for MVP

**R1 — Prerequisite graph display**

- Full D3 force-directed graph is tempting but high scope risk
- **MVP simplification:** Render prerequisites as a styled ordered list of course chips. No graph visualization. Add "leads into" as a secondary list. This is V2 work.

**R2 — Cross-major concept deduplication**

- ~200 concepts extracted from 208 courses. Many appear in multiple majors under different names.
- Manual deduplication is time-consuming.
- **MVP simplification:** Start with concepts from Core + EE courses only (~60–80 concepts). Add non-EE concepts post-launch. Mark concepts with `status: "stub"` for placeholder entries.

**R3 — T04 Logic Gate Simulator (React Flow)**

- React Flow has a learning curve. Custom gate styling, port definitions, wire routing, and boolean propagation add up.
- **MVP simplification:** Ship with 5 core gates (AND, OR, NOT, NAND, XOR). Max 2 inputs. Fixed layout palette. Truth table only (no expression extraction).

**R4 — T10 Free Body Diagram Builder**

- Most complex tool. Canvas interaction, force arrow rendering, reaction computation, and multiple body types are each non-trivial.
- **MVP simplification:** Single body type (rectangle). Up to 4 forces. Moment computation only (no support reactions in V1). Ship after all other tools are stable. Can cut from V1 if schedule slips.

**R5 — Op-Amp Schematic SVG (T09)**

- Requires 7 accurate hand-authored SVG circuit diagrams.
- **MVP simplification:** Start with 3 configurations (Inverting, Non-Inverting, Voltage Follower). Placeholder cards for remaining 4. Expand post-launch.

---

### Medium Risk — Plan Carefully

**R6 — JSON data volume**

- 208 course JSON files + concepts + tools = significant authoring effort before any UI can be tested.
- **Mitigation:** Write a seed script that generates minimal valid stub JSON for all courses from the markdown source. Polish content iteratively. Stubs are fine at launch for non-EE courses.

**R7 — Tailwind token consistency across 10 major colors**

- 10 unique major color palettes need accessible contrast on both light backgrounds.
- **Mitigation:** Define all major colors as CSS custom properties in `globals.css` first. Use semantic tokens (`--color-ee-bg`, `--color-ee-text`, `--color-ee-border`) not raw hex in components. Test contrast ratios before locking tokens.

**R8 — Dynamic import for tools + SSR**

- Tool components use browser APIs. SSR will throw.
- **Mitigation:** All tool components use `dynamic(() => import(...), { ssr: false })`. Page shell renders server-side. Tool slot renders client-side. `ToolSkeleton` handles loading state. Do not mix SSR and client tool code.

**R9 — DualAxisChart shared x-axis alignment**

- Recharts does not natively support two charts sharing a pixel-perfect x-axis.
- **Mitigation:** Use a single `ComposedChart` with dual `YAxis`. Render magnitude and phase as two `Line` components with separate Y axes. Avoid building two separate charts with CSS alignment.

**R10 — generateStaticParams at scale**

- 250+ static pages. Build time could be slow.
- **Mitigation:** Data loaders are synchronous JSON imports — no I/O per page. Build time should be ~30–60 seconds. If slow, split `generateStaticParams` by major and use `dynamicParams = false`.

---

### Low Risk — Standard implementation

- Fuse.js search: well-understood, fast at this data volume
- KaTeX rendering: straightforward for the ~20–30 equations needed
- Recharts charts (LineChart, SpectrumChart): standard library usage
- Static page generation: Next.js handles this reliably
- Vercel deployment: zero-config for Next.js

---

## Appendix — Key Constants

### Major Slugs (canonical)

```
core | electrical-engineering | mechanical-engineering | civil-engineering |
chemical-engineering | computer-engineering | aerospace-engineering |
biomedical-engineering | industrial-engineering | materials-engineering
```

### Stage IDs (canonical)

```
foundation | core-sciences | engineering-core | major-entry |
major-core | intermediate | advanced | capstone
```

### Tool Slugs (canonical)

```
unit-converter | ohms-law | resistor-color-code | logic-gate-sim |
rlc-response | fourier-series | bode-plot | phasor-calc |
opamp-config | fbd-builder
```

### Course Status Values

```
live | stub | planned
```

### Tool Categories

```
calculator | visualizer | simulator | reference
```

### Topic Cluster Count

```
50 clusters defined (see topic-clusters.json)
```

### Page Count Estimate (V1)

```
Static pages:     ~260
Tool pages:       10 (hybrid: shell static, component client)
Total:            ~270
```
