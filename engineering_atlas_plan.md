# Engineering Atlas — Pre-Code Planning Document
> Source: `engineering_atlas.md` curriculum blueprint
> Status: Pre-development · Version 1.0
> Purpose: Product definition, architecture, data model, and build order before any code is written

---

## 1. Product Definition

### What It Is
Engineering Atlas is a structured, web-based engineering curriculum platform. It maps the full landscape of undergraduate engineering education — courses, concepts, dependencies, and tools — into an interactive, explorable reference. It is not a course, not a textbook, and not a learning management system. It is a **curriculum map + concept explorer + interactive tool environment**.

### Who It Is For

| Audience | Use Case |
|---|---|
| Engineering students | Understand where they are, what's coming, and how it connects |
| Self-learners | Navigate engineering topics independently without a university structure |
| Career changers | Identify gaps and learning paths into engineering disciplines |
| Engineering educators | Reference for curriculum design and concept sequencing |
| Hobbyists / makers | Find the right tools and concepts for applied projects |

### Main Sections

| Section | Purpose |
|---|---|
| **Curriculum Atlas** | Visual map of majors, years, courses, and dependencies |
| **Core Engineering** | Shared foundation layer all majors build on |
| **Specializations** | One page per major, ranging from lightweight to deeply built |
| **Interactive Labs** | Tools, simulators, calculators, and visualizers |
| **Glossary / Concepts** | Cross-linked concept definitions tied to courses and tools |

### What Makes It Different

- **Dependency-first thinking:** Everything shows what it requires and what it unlocks
- **Cross-major coherence:** Shared foundation courses appear once; specializations reference them
- **Tools embedded in curriculum:** Tools are not a separate section — they are anchored to specific courses and concepts
- **Concept graph:** Concepts cross-link to courses, tools, and other concepts
- **Designed for engineers, not students:** Precise, dense, structured — not simplified or gamified

### MVP Must Include
- Homepage with platform orientation
- Core Engineering section (full course detail)
- All 10 majors structurally present
- Electrical Engineering as the first deeply built specialization (full course detail + tools)
- Remaining 9 majors as curriculum map pages (course list with metadata, no deep tool integration)
- Glossary/Concepts system (searchable, cross-linked to courses)
- 8–12 Interactive Lab tools (mix of shared + EE-specific)
- Prerequisite/dependency visualization per course

### Explicitly Out of Scope for V1

- User accounts, progress tracking, or saved state
- Video content or embedded lectures
- Community features (forums, comments)
- Mobile apps
- Assessment or quizzes
- LMS integrations (Canvas, Moodle)
- AI tutoring or chat features
- Full tool set for non-EE specializations
- Paid tiers or monetization
- Internationalization / translation

---

## 2. Product Architecture

### Layer Overview

```
┌──────────────────────────────────────────────────┐
│                  Engineering Atlas                │
├────────────────────┬─────────────────────────────┤
│   Curriculum Atlas │   Interactive Labs           │
│   (pages + maps)  │   (tools + simulators)       │
├────────────────────┴─────────────────────────────┤
│              Specializations (10 majors)          │
├──────────────────────────────────────────────────┤
│              Core Engineering (shared layer)      │
├────────────┬──────────────┬───────────────────────┤
│  Concepts  │   Glossary   │   Dependency Graph    │
└────────────┴──────────────┴───────────────────────┘
```

---

### Layer Definitions

#### Core Engineering
- **Role:** The universal foundation layer. Every major depends on it.
- **Content:** ~12 shared courses (Calculus I–III, Diff Eq, Physics I–II, Linear Algebra, Statics, Dynamics, Mechanics of Materials, Statistics, Thermo I)
- **Behavior:** Courses appear fully here; specializations reference them by ID — no duplication
- **Display:** Full course cards with descriptions, concepts, prerequisites, leads-into

#### Specializations
- **Role:** 10 discipline-specific curriculum tracks that build on Core Engineering
- **Content:** Each has an overview, year-by-year course sequence, topic clusters, tool links, and elective slots
- **Depth in V1:**
  - **EE:** Full depth — all courses detailed, tool integrations, concept cross-links
  - **ME, CE, ChE, CpE, AE, BME, IE, MatE:** Curriculum map level — course list with metadata, no tool integration
- **Behavior:** Specialization pages show the full 4-year sequence with clear Core Engineering handoffs

#### Interactive Labs
- **Role:** The applied layer. Tools that demonstrate, calculate, or simulate engineering concepts.
- **Content:** 8–12 tools in V1, anchored to specific courses and concepts
- **Behavior:** Each tool has metadata: related major, related course, related concepts, complexity, category
- **Tool categories:** Calculator, Visualizer, Simulator, Reference Chart

#### Curriculum Atlas
- **Role:** The navigation and discovery layer. Lets users explore the full curriculum map.
- **Content:** Cross-major view, dependency graph, year/stage progression view
- **Behavior:** Search, filter by major, filter by year, filter by concept
- **V1 scope:** Static rendered curriculum map; interactive graph deferred to V2

#### Glossary / Concepts / Support Layers
- **Role:** Cross-cutting knowledge layer.
- **Concepts:** Atomic definitions tied to courses, tools, and other concepts
- **Glossary:** Searchable engineering terms with context
- **Dependencies:** The prerequisite graph — which course unlocks which
- **Behavior:** Concepts appear as inline chips/tags on course pages and tool pages; clicking navigates to the concept detail page

---

## 3. MVP Definition

### Pages Required for MVP

| Page | Depth | Notes |
|---|---|---|
| Homepage | Full | Platform orientation, section entry points |
| About / What Is This | Light | Explains the product concept |
| Core Engineering Overview | Full | All shared courses, dependency chain |
| Core Engineering — Course Detail | Full | One page per Core course (~12 pages) |
| Curriculum Overview | Full | All 10 majors in a grid/map view |
| Specialization Overview — EE | Full | Year-by-year with course cards, tools |
| EE Course Detail Pages | Full | All ~20 EE courses with full metadata |
| Specialization Overview — Other 9 | Partial | Curriculum map, course list, metadata only |
| Interactive Labs — Hub | Full | Tool directory with filtering |
| Individual Tool Pages (8–12) | Full | Tool + metadata + related course links |
| Glossary Index | Full | Searchable list of all concepts |
| Concept Detail Page | Full | Definition + related courses + related tools |
| 404 / Error | Light | Standard fallback |

### EE Specialization Must Include
- All course stages: Year 2 Entry, Years 2–3 Core, Year 3 Intermediate, Years 3–4 Advanced, Year 4 Capstone + Electives
- All courses from blueprint: Circuit Analysis I–II, Electronics I–II, Digital Logic, Signals & Systems, Electromagnetics, Control Systems, DSP, VLSI I, Probability & Random Processes, Power Systems I, Communications, Embedded Systems, Senior Capstone
- Elective theme slots: labeled as `[THEME]` cards with placeholder treatment
- Tool links from Interactive Labs appearing on relevant course pages

---

## 4. First Tool Shortlist

### Selection Criteria
- Visually demonstrable in a browser
- Covers multiple concepts per tool
- Mix of shared engineering + EE-specific
- Low/medium complexity preferred for V1
- High pedagogical value relative to build effort

---

### Tool List

#### T01 — Unit Converter (Engineering Edition)
- **Category:** Calculator
- **Why MVP:** Most used utility across all engineering; entry point for new users
- **Related Majors:** All
- **Related Courses:** Introduction to Engineering, any Year 1 course
- **Complexity:** Low
- **Notes:** Covers SI, Imperial, energy, pressure, power, force, temperature — grouped by domain

---

#### T02 — Ohm's Law + Power Triangle Calculator
- **Category:** Calculator
- **Why MVP:** The most fundamental EE calculation; high search traffic
- **Related Majors:** EE, CpE
- **Related Courses:** Circuit Analysis I
- **Complexity:** Low
- **Notes:** Input any 2 of V, I, R, P — computes the other 2. Show formula derivation inline.

---

#### T03 — RC/RL/RLC Circuit Response Visualizer
- **Category:** Visualizer
- **Why MVP:** Covers transient and frequency response — core to Circuit Analysis II and Signals & Systems
- **Related Majors:** EE, CpE
- **Related Courses:** Circuit Analysis II, Signals & Systems
- **Complexity:** Medium
- **Notes:** User sets R, L, C values; plots step response and frequency response (Bode). Toggle RC/RL/RLC modes.

---

#### T04 — Resistor Color Code Decoder
- **Category:** Reference / Calculator
- **Why MVP:** Classic beginner tool; extremely high discoverability; low build cost
- **Related Majors:** EE, CpE, BME (bioinstrumentation)
- **Related Courses:** Circuit Analysis I
- **Complexity:** Low
- **Notes:** Input bands → resistance + tolerance. Reverse: input resistance → band colors. Visual resistor rendering.

---

#### T05 — Phasor / AC Circuit Calculator
- **Category:** Calculator
- **Why MVP:** Core to Circuit Analysis II; phasors confuse most students; visual clarity adds real value
- **Related Majors:** EE
- **Related Courses:** Circuit Analysis II
- **Complexity:** Medium
- **Notes:** Input circuit topology (R, L, C in series/parallel), frequency → output phasor diagram, impedance, phase angle, power factor.

---

#### T06 — Bode Plot Generator
- **Category:** Visualizer
- **Why MVP:** Bode plots appear in Signals & Systems, Control Systems, and EE circuit analysis; no good free interactive tool exists
- **Related Majors:** EE, ME (control), AE (flight control)
- **Related Courses:** Signals & Systems, Control Systems, Circuit Analysis II
- **Complexity:** Medium
- **Notes:** Input transfer function as poles and zeros (or numerator/denominator coefficients) → renders magnitude and phase Bode plot. Log-scale frequency axis.

---

#### T07 — Logic Gate Simulator
- **Category:** Simulator
- **Why MVP:** Core to Digital Logic Design; visual, interactive, immediately satisfying
- **Related Majors:** EE, CpE
- **Related Courses:** Digital Logic Design
- **Complexity:** Medium
- **Notes:** Drag-and-drop AND, OR, NOT, NAND, NOR, XOR gates. Connect with wires. Toggle inputs. Real-time output. Truth table auto-generated.

---

#### T08 — Op-Amp Circuit Configurator
- **Category:** Calculator + Visualizer
- **Why MVP:** Op-amps are in every EE lab; covers Electronics II content; high reuse
- **Related Majors:** EE, BME (bioinstrumentation)
- **Related Courses:** Electronics II
- **Complexity:** Medium
- **Notes:** Select configuration (inverting, non-inverting, integrator, differentiator, comparator) → auto-draws circuit diagram → computes gain, bandwidth, output formula.

---

#### T09 — Fourier Series Visualizer
- **Category:** Visualizer
- **Why MVP:** Deeply visual; covers Signals & Systems + DSP; widely shared / bookmarkable
- **Related Majors:** EE, ME, AE, BME
- **Related Courses:** Signals & Systems, DSP
- **Complexity:** Medium
- **Notes:** Select waveform (square, sawtooth, triangle, custom). Control number of harmonics with a slider. Animate series convergence. Show individual harmonic components.

---

#### T10 — Free Body Diagram Builder
- **Category:** Visualizer / Simulator
- **Why MVP:** Covers Statics and Physics I — used by ALL majors. High value shared tool.
- **Related Majors:** ME, CE, AE, BME, MatE, Core
- **Related Courses:** Statics, Physics I, Dynamics
- **Complexity:** Medium
- **Notes:** Draw forces on a 2D body. Compute net force and moment. Check equilibrium. Label vectors.

---

#### T11 — Diode / BJT Characteristic Curve Plotter
- **Category:** Visualizer
- **Why MVP:** Covers Electronics I — the I-V curve is the core conceptual tool for semiconductor devices
- **Related Majors:** EE
- **Related Courses:** Electronics I
- **Complexity:** Medium
- **Notes:** Select device (ideal diode, real diode, BJT CE config). Adjust parameters (Is, VT, β). Plot I-V characteristic. Overlay load line. Show Q-point.

---

#### T12 — Beam Stress and Deflection Calculator
- **Category:** Calculator
- **Why MVP:** Mechanics of Materials is shared by 7 majors; beam problems are the most common calculation type
- **Related Majors:** CE, ME, AE, MatE, Core
- **Related Courses:** Mechanics of Materials, Structural Analysis I
- **Complexity:** Medium–High
- **Notes:** Select beam type (simply supported, cantilever, fixed-fixed). Set loading (point load, UDL). Compute reactions, shear/moment diagrams, deflection. Plot diagrams.

---

### Summary Grid

| ID | Tool | Category | Majors | Complexity |
|---|---|---|---|---|
| T01 | Unit Converter | Calculator | All | Low |
| T02 | Ohm's Law + Power Triangle | Calculator | EE, CpE | Low |
| T03 | RLC Circuit Response | Visualizer | EE, CpE | Medium |
| T04 | Resistor Color Code | Reference | EE, CpE, BME | Low |
| T05 | Phasor / AC Circuit | Calculator | EE | Medium |
| T06 | Bode Plot Generator | Visualizer | EE, ME, AE | Medium |
| T07 | Logic Gate Simulator | Simulator | EE, CpE | Medium |
| T08 | Op-Amp Configurator | Calc + Viz | EE, BME | Medium |
| T09 | Fourier Series Visualizer | Visualizer | EE, ME, AE, BME | Medium |
| T10 | Free Body Diagram Builder | Simulator | ME, CE, AE, Core | Medium |
| T11 | Diode / BJT Curve Plotter | Visualizer | EE | Medium |
| T12 | Beam Stress Calculator | Calculator | CE, ME, AE, MatE | Medium–High |

> **V1 Recommended minimum:** T01–T09 (cover both shared and EE-specific well)
> **Defer to V2:** T10, T11, T12 (medium-high complexity; lower uniqueness)

---

## 5. Data Model Plan

### Schema Definitions

---

#### `Major`
```
id:                   string (slug)          e.g. "electrical-engineering"
name:                 string                 e.g. "Electrical Engineering"
shortName:            string                 e.g. "EE"
description:          string
mainSubfields:        string[]
foundationDeps:       CourseRef[]            IDs of Core Engineering courses required
color:                string (hex/token)     for visual identity
icon:                 string
depthLevel:           enum: "full" | "map"   V1 distinction
summaryChain:         string                 human-readable dependency chain
conceptClusters:      string[]
recommendedTools:     ToolRef[]
years:                YearStage[]
```

---

#### `YearStage`
```
id:                   string
majorId:              string
label:                string                 e.g. "Year 2 — EE Core Entry"
yearNumber:           number | number[]      e.g. 2 or [2,3] for spanning stages
stageTag:             string                 e.g. "foundation" | "core" | "advanced" | "capstone"
courses:              CourseRef[]
```

---

#### `Course`
```
id:                   string (slug)          e.g. "circuit-analysis-i"
name:                 string
majorId:              string | "core"        "core" = shared Core Engineering course
stageId:              string
year:                 number | number[]
description:          string
whyItMatters:         string
prerequisites:        CourseRef[]
leadsInto:            CourseRef[]
skills:               string[]
concepts:             ConceptRef[]
relatedTools:         ToolRef[]
isShared:             boolean               true = Core Engineering course
isElective:           boolean
electiveTheme:        string | null          e.g. "Power Electronics"
electiveTag:          string | null          e.g. "[THEME: Power Electronics]"
```

---

#### `Concept`
```
id:                   string (slug)
name:                 string
shortDefinition:      string                 1–2 sentences
fullDefinition:       string                 paragraph
relatedCourses:       CourseRef[]
relatedTools:         ToolRef[]
relatedConcepts:      ConceptRef[]
majorTags:            string[]               which majors use this concept
tags:                 string[]               topic clusters
```

---

#### `Tool`
```
id:                   string (slug)
name:                 string
category:             enum: "calculator" | "visualizer" | "simulator" | "reference"
description:          string
whyMVP:               string
relatedMajors:        MajorRef[]
relatedCourses:       CourseRef[]
relatedConcepts:      ConceptRef[]
complexityEstimate:   enum: "low" | "medium" | "high"
status:               enum: "live" | "planned" | "wip"
routePath:            string                 e.g. "/labs/bode-plot"
thumbnailDescription: string
```

---

#### `Dependency`
```
id:                   string
fromCourseId:         string
toCourseId:           string
type:                 enum: "prerequisite" | "corequisite" | "recommended"
crossMajor:           boolean
note:                 string | null
```

---

#### `TopicCluster`
```
id:                   string
name:                 string                 e.g. "Circuit Theory"
majorId:              string
courses:              CourseRef[]
concepts:             ConceptRef[]
tools:                ToolRef[]
description:          string
```

---

#### `GlossaryEntry`
```
id:                   string (slug)
term:                 string
definition:           string
domain:               string[]               e.g. ["EE", "Core"]
conceptId:            string | null          links to full concept if exists
relatedTerms:         GlossaryRef[]
```

---

### Reference Types (used across schemas)

```
CourseRef:    { id, name }
MajorRef:     { id, name, shortName }
ConceptRef:   { id, name }
ToolRef:      { id, name, category }
GlossaryRef:  { id, term }
```

---

## 6. Normalization Plan

### How the Curriculum Blueprint Becomes Website Data

---

#### Top-Level Objects (each becomes its own data record + page)

| Blueprint Element | Becomes | Notes |
|---|---|---|
| Each major (e.g. `# 2. Electrical Engineering`) | `Major` record | One per major |
| Each `### Year / Stage` block | `YearStage` record | Nested under Major |
| Each `#### Course Name` | `Course` record | Nested under YearStage |
| Each concept bullet (under Concepts:) | `Concept` record | Cross-linked, not duplicated |
| Each tool in shortlist | `Tool` record | Referenced by Course |
| Each `[THEME: ...]` elective slot | `Course` record (elective=true) | Placeholder treatment |

---

#### Nested Objects (stored within parent, not separate pages)

| Element | Nesting |
|---|---|
| `Skills:` list | Stored as `skills: string[]` on Course |
| `Why it matters:` | `whyItMatters: string` on Course |
| `Description:` | `description: string` on Course |
| `Main subfields:` | `mainSubfields: string[]` on Major |
| `Summary.Main dependency chain` | `summaryChain: string` on Major |
| `Summary.Main concept clusters` | `conceptClusters: string[]` on Major |
| `Summary.Best simulator/tool opportunities` | `recommendedTools: ToolRef[]` on Major |

---

#### Tags (stored as string arrays for filtering)

| Source Field | Tag Type | Purpose |
|---|---|---|
| Major name | `majorTags` on Concept, Tool | Filter by discipline |
| Year number | `yearTag` on Course | Filter by stage |
| `stageTag` | Stage label | Filter: foundation / core / advanced / capstone |
| Topic cluster membership | `tags` on Concept | Semantic grouping |
| Tool category | `category` on Tool | Filter: calculator / visualizer / simulator |
| Elective theme | `electiveTheme` on Course | Group electives by theme |

---

#### Cross-Links (relational references, not duplication)

| Relationship | Implementation |
|---|---|
| Course → Prerequisite courses | `prerequisites: CourseRef[]` |
| Course → Courses it leads into | `leadsInto: CourseRef[]` |
| Course → Concepts it teaches | `concepts: ConceptRef[]` |
| Course → Related tools | `relatedTools: ToolRef[]` |
| Concept → Courses that teach it | `relatedCourses: CourseRef[]` |
| Concept → Tools that use it | `relatedTools: ToolRef[]` |
| Tool → Related courses | `relatedCourses: CourseRef[]` |
| Concept → Related concepts | `relatedConcepts: ConceptRef[]` |
| Major → Core courses it depends on | `foundationDeps: CourseRef[]` (cross-reference to `core` major) |

---

#### Shared / Core Engineering Courses — Deduplication Rule

- Core Engineering courses (Calculus I, Physics I, Statics, etc.) are authored **once** under `majorId: "core"`
- When a specialization (e.g. ME) says `"See Core Engineering: Statics"`, that is implemented as `foundationDeps: [{ id: "statics" }]` on the Major record
- Course pages for Core Engineering courses show a **"Used by X majors"** banner with links
- Specialization overview pages show Core courses in a separate "Foundation" zone with visual distinction

---

#### Electives and Placeholders

- Each `[THEME: Power Electronics]` slot becomes a `Course` record with `isElective: true` and `electiveTheme: "Power Electronics"`
- Elective course pages render a **"Planned Content"** or **"Theme"** treatment — not a full course card
- Elective slots are shown in the curriculum map with a distinct visual style (dashed border, tag badge)
- In V1, elective pages are stubs: title, theme description, example topics, link to related tools if any
- In V2, elective slots become full courses as content expands

---

## 7. Route / Page Plan

### Route Structure

```
/                                     Homepage
/about                                About Engineering Atlas

/curriculum                           Curriculum Overview (all 10 majors grid)
/curriculum/core                      Core Engineering overview
/curriculum/core/[course-slug]        Core Engineering course detail

/majors/[major-slug]                  Specialization overview page
/majors/[major-slug]/[course-slug]    Specialization course detail page

/labs                                 Interactive Labs hub
/labs/[tool-slug]                     Individual tool page

/concepts                             Concepts index (searchable)
/concepts/[concept-slug]              Concept detail page

/glossary                             Glossary index (A–Z)
/glossary/[term-slug]                 Glossary term page

/404                                  Not found
```

---

### Major Slugs

| Major | Slug |
|---|---|
| Core Engineering | `core` |
| Electrical Engineering | `electrical-engineering` |
| Mechanical Engineering | `mechanical-engineering` |
| Civil Engineering | `civil-engineering` |
| Chemical Engineering | `chemical-engineering` |
| Computer Engineering | `computer-engineering` |
| Aerospace Engineering | `aerospace-engineering` |
| Biomedical Engineering | `biomedical-engineering` |
| Industrial Engineering | `industrial-engineering` |
| Materials Engineering | `materials-engineering` |

---

### Course Slug Convention

`[course-name-kebab-case]`
Examples: `calculus-i`, `circuit-analysis-ii`, `signals-and-systems`, `reinforced-concrete-design`

Shared Core Engineering courses keep a single canonical slug. Specialization pages link to `/curriculum/core/[slug]` or `/majors/[major]/[slug]` depending on where the course originates.

---

### Page Types Summary

| Type | Route Pattern | V1 Count (est.) |
|---|---|---|
| Static/Marketing | `/`, `/about` | 2 |
| Curriculum Hub | `/curriculum` | 1 |
| Core Major Overview | `/curriculum/core` | 1 |
| Core Course Detail | `/curriculum/core/[slug]` | ~12 |
| Specialization Overview | `/majors/[slug]` | 10 |
| EE Course Detail | `/majors/electrical-engineering/[slug]` | ~22 |
| Other Major Course (map-level) | `/majors/[slug]/[slug]` | ~160 stubs |
| Labs Hub | `/labs` | 1 |
| Tool Pages | `/labs/[slug]` | 9–12 |
| Concepts Index | `/concepts` | 1 |
| Concept Detail | `/concepts/[slug]` | ~80–100 |
| Glossary Index | `/glossary` | 1 |
| Glossary Term | `/glossary/[slug]` | ~150–200 |

> **Note:** Non-EE course detail pages in V1 are auto-generated stubs from the data model. Full editorial content is deferred to V2 by major.

---

## 8. Build Order

### Phase 0 — Data First (before any UI)
1. Convert `engineering_atlas.md` to structured JSON (one file per major, or a unified `curriculum.json`)
2. Author `tools.json` from the tool shortlist
3. Extract and deduplicate all concepts into `concepts.json`
4. Generate dependency records into `dependencies.json`
5. Define all slugs and validate route uniqueness
6. Validate that all `prerequisites` and `leadsInto` references resolve to real course IDs

### Phase 1 — Design System and Layout Shell
7. Define color tokens, typography, spacing scale, and icon system
8. Assign visual identity per major (color, icon)
9. Build shared layout: top navigation, sidebar nav (for curriculum), footer
10. Build core UI components: CourseCard, ConceptChip, ToolCard, MajorCard, BreadcrumbBar, StageBlock, ElectiveSlot
11. Build page templates: Major Overview, Course Detail, Tool Page, Concept Detail, Glossary

### Phase 2 — Core Engineering Section
12. Build `/curriculum/core` overview page from data
13. Build `/curriculum/core/[slug]` course detail pages
14. Implement prerequisite chain display (linear list or simple tree — no graph engine in V1)
15. Implement concept chips on course pages (link to concept detail)

### Phase 3 — Specialization Pages
16. Build `/majors/[slug]` template (used by all 10 majors)
17. Populate all 10 major overview pages from data (map-level content for 9; full for EE)
18. Build EE course detail pages (`/majors/electrical-engineering/[slug]`) — 22 pages
19. Build stub course detail pages for other 9 majors
20. Add "Used by X majors" cross-linking on Core Engineering course pages

### Phase 4 — Curriculum Overview
21. Build `/curriculum` hub page with 10-major grid
22. Add major filter (by discipline cluster, year entry, specialization depth)
23. Add search across courses and majors

### Phase 5 — Interactive Labs
24. Build `/labs` hub page with tool directory and filter (category, major, complexity)
25. Build tool page template (metadata + tool embed + related courses + related concepts)
26. Build and integrate tools in this order:
    - T01 Unit Converter (Low — validates tool embed pattern)
    - T02 Ohm's Law (Low — validates calculator pattern)
    - T04 Resistor Color Code (Low — validates reference pattern)
    - T07 Logic Gate Simulator (Medium — validates simulator pattern)
    - T03 RLC Response Visualizer (Medium — validates chart/visualizer pattern)
    - T09 Fourier Series Visualizer (Medium — high value, reuses chart pattern)
    - T06 Bode Plot Generator (Medium)
    - T05 Phasor / AC Calculator (Medium)
    - T08 Op-Amp Configurator (Medium)
27. Link tools to related EE course pages
28. Link tools to related concept pages

### Phase 6 — Concepts and Glossary
29. Build `/concepts` index with search and major/topic filters
30. Build `/concepts/[slug]` detail pages
31. Build `/glossary` A–Z index
32. Build `/glossary/[slug]` term pages
33. Ensure all concept chips on course pages are live links

### Phase 7 — Polish and V1 Release Prep
34. Homepage — hero, section entry points, featured major (EE), featured tools
35. About page
36. SEO metadata on all page types (title, description, canonical, OG)
37. 404 page
38. Audit all cross-links for correctness
39. Performance review (static generation, image optimization)
40. Accessibility audit (keyboard nav, ARIA labels, color contrast)

---

### Build Order Rationale

| Principle | Reason |
|---|---|
| Data before UI | UI components built to fit real data, not placeholder shapes |
| Core before Specializations | Core courses are referenced everywhere; must exist first |
| EE before other majors | EE is the first full specialization; its patterns become templates |
| Tools after curriculum | Tools need course/concept anchors to link to |
| Low-complexity tools first | Validates embed architecture before building complex simulators |
| Concepts/Glossary last | Requires all course content to exist before cross-linking is meaningful |

---

*End of Planning Document*
