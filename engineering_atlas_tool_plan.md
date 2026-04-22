# Engineering Atlas — MVP Tool System Plan

> Status: Pre-development · Planning only
> Scope: Version 1 Interactive Labs

---

## 1. Final MVP Tool List

### Selection Rationale

- 10 tools total: 3 low-complexity, 6 medium, 1 medium-high
- 3 shared (all-major value), 7 EE-focused
- Every tool serves at least one EE core course
- Each tool validates a distinct UI/code pattern usable by future tools
- No tool requires a backend — all computation runs client-side

| #   | id                    | Title                           | Category   | Majors           | Complexity  | Pattern            |
| --- | --------------------- | ------------------------------- | ---------- | ---------------- | ----------- | ------------------ |
| 1   | `unit-converter`      | Engineering Unit Converter      | Calculator | All              | Low         | form-grid          |
| 2   | `ohms-law`            | Ohm's Law & Power Calculator    | Calculator | EE, CpE          | Low         | four-quadrant-calc |
| 3   | `resistor-color-code` | Resistor Color Code Decoder     | Reference  | EE, CpE, BME     | Low         | visual-encoder     |
| 4   | `logic-gate-sim`      | Logic Gate Simulator            | Simulator  | EE, CpE          | Medium      | canvas-graph       |
| 5   | `rlc-response`        | RLC Circuit Response Visualizer | Visualizer | EE, CpE          | Medium      | time-freq-chart    |
| 6   | `fourier-series`      | Fourier Series Visualizer       | Visualizer | EE, ME, AE, BME  | Medium      | harmonic-chart     |
| 7   | `bode-plot`           | Bode Plot Generator             | Visualizer | EE, ME, AE, ChE  | Medium      | dual-chart         |
| 8   | `phasor-calc`         | Phasor & AC Circuit Calculator  | Calculator | EE               | Medium      | vector-diagram     |
| 9   | `opamp-config`        | Op-Amp Circuit Configurator     | Calculator | EE, BME          | Medium      | schematic-calc     |
| 10  | `fbd-builder`         | Free Body Diagram Builder       | Simulator  | ME, CE, AE, CORE | Medium-High | canvas-physics     |

---

## 2. Per-Tool Definitions

---

### T01 — Engineering Unit Converter

| Field                | Value                                                                        |
| -------------------- | ---------------------------------------------------------------------------- |
| **Title**            | Engineering Unit Converter                                                   |
| **Category**         | Calculator                                                                   |
| **Purpose**          | Convert between all engineering unit systems, organized by physical quantity |
| **Majors**           | All (universal entry tool)                                                   |
| **Related Courses**  | Introduction to Engineering, any Year 1 course                               |
| **Related Concepts** | Unit analysis, dimensional homogeneity, SI vs Imperial                       |

**Key Inputs**

- Physical quantity selector (length, mass, force, pressure, energy, power, temperature, frequency, voltage, current, resistance)
- Input value (number field)
- From unit (dropdown, filtered by quantity)
- To unit (dropdown, filtered by quantity)

**Key Outputs**

- Converted value with full precision
- Conversion factor displayed explicitly (e.g. "× 0.3048")
- Quick multi-unit table: input → all units in that quantity group simultaneously

**Visualization Type**

- No chart. Clean two-column input/output layout. Multi-unit table below.

**Difficulty:** Low

**MVP Scope**

- Quantities: length, mass, force, pressure, energy, power, temperature, angle, frequency
- Engineering-specific units included: psi, BTU, HP, lb-ft, kip, slug, RPM
- Conversion factor shown explicitly
- Multi-unit output table (show all units at once)

**Leave for Later**

- Currency or non-engineering units
- Custom unit definition
- Copy-to-clipboard chain (nice to have)
- Significant figures control

---

### T02 — Ohm's Law & Power Calculator

| Field                | Value                                                      |
| -------------------- | ---------------------------------------------------------- |
| **Title**            | Ohm's Law & Power Calculator                               |
| **Category**         | Calculator                                                 |
| **Purpose**          | Solve any combination of V, I, R, P given two known values |
| **Majors**           | EE, CpE, BME                                               |
| **Related Courses**  | Circuit Analysis I                                         |
| **Related Concepts** | Ohm's law, DC power, resistance, Kirchhoff's laws          |

**Key Inputs**

- Four input slots: V (Voltage), I (Current), R (Resistance), P (Power)
- User fills any 2; remaining 2 compute automatically
- Unit prefix selector per field (mV/V/kV, mA/A, Ω/kΩ/MΩ, mW/W/kW)

**Key Outputs**

- All 4 values (V, I, R, P) with units
- Active formula shown: e.g. "V = I × R = 5A × 10Ω = 50V"
- Power triangle diagram (visual showing real relationships)

**Visualization Type**

- Formula display + static Power Triangle SVG (highlights relevant segments based on which values were input)

**Difficulty:** Low

**MVP Scope**

- All 6 combinations of 2-of-4 inputs handled
- Active formula shown textually
- Power triangle visual (static SVG with active highlight)
- Unit prefix selectors

**Leave for Later**

- AC power (reactive, apparent, power factor) → separate Phasor tool (T08)
- Series/parallel resistance calculator extension
- Dark/light theme toggle per tool

---

### T03 — Resistor Color Code Decoder

| Field                | Value                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------- |
| **Title**            | Resistor Color Code Decoder                                                            |
| **Category**         | Reference                                                                              |
| **Purpose**          | Decode resistor band colors to resistance value, or encode a resistance value to bands |
| **Majors**           | EE, CpE, BME                                                                           |
| **Related Courses**  | Circuit Analysis I                                                                     |
| **Related Concepts** | Resistance, tolerance, color code standard                                             |

**Key Inputs**

- Mode toggle: Decode (bands → value) or Encode (value → bands)
- Decode mode: 4 or 5 color band dropdowns with color swatches
- Encode mode: resistance value + tolerance input

**Key Outputs**

- Resistance value with tolerance range (e.g. "10 kΩ ± 5%" → 9.5 kΩ – 10.5 kΩ)
- Visual resistor rendering (SVG with correctly colored bands)
- Multiplier and tolerance band labels

**Visualization Type**

- SVG resistor illustration (interactive, color-coded bands update live)

**Difficulty:** Low

**MVP Scope**

- 4-band and 5-band resistors
- All standard EIA colors
- Encode and decode modes
- Visual resistor SVG with live update

**Leave for Later**

- 6-band (temperature coefficient)
- SMD resistor code (numeric codes)
- Capacitor color code

---

### T04 — Logic Gate Simulator

| Field                | Value                                                                                  |
| -------------------- | -------------------------------------------------------------------------------------- |
| **Title**            | Logic Gate Simulator                                                                   |
| **Category**         | Simulator                                                                              |
| **Purpose**          | Build, connect, and simulate combinational logic circuits with live truth table output |
| **Majors**           | EE, CpE                                                                                |
| **Related Courses**  | Digital Logic Design                                                                   |
| **Related Concepts** | Boolean algebra, logic gates, truth table, combinational logic, De Morgan's laws       |

**Key Inputs**

- Drag-and-drop gate palette: AND, OR, NOT, NAND, NOR, XOR, XNOR
- Toggle input nodes (A, B, C...) between 0 and 1
- Wire connections drawn between gate pins

**Key Outputs**

- Live output value at each gate and wire (0 or 1, color-coded)
- Auto-generated truth table for all inputs → final output
- Boolean expression derived from circuit (V2)

**Visualization Type**

- Canvas-based circuit diagram. Gates are styled SVG nodes. Wires route between ports. Truth table shown in side panel.

**Difficulty:** Medium

**MVP Scope**

- 7 gate types + input/output nodes
- Up to 3 inputs, unlimited depth
- Live propagation on input toggle
- Auto truth table generation
- Basic wire routing (straight or elbow)

**Leave for Later**

- Sequential logic (flip-flops, latches)
- Boolean expression extraction from circuit
- Circuit saving / URL sharing
- Timing diagram view
- Multiple output nodes

---

### T05 — RLC Circuit Response Visualizer

| Field                | Value                                                                                                        |
| -------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Title**            | RLC Circuit Response Visualizer                                                                              |
| **Category**         | Visualizer                                                                                                   |
| **Purpose**          | Visualize time-domain (step) and frequency-domain (Bode) response of RC, RL, and RLC circuits                |
| **Majors**           | EE, CpE                                                                                                      |
| **Related Courses**  | Circuit Analysis II, Signals & Systems                                                                       |
| **Related Concepts** | Transfer function, step response, frequency response, resonance, impedance, natural frequency, damping ratio |

**Key Inputs**

- Circuit type toggle: RC / RL / RLC
- R (Ω), L (H), C (F) sliders with live value display
- Analysis type toggle: Step Response / Frequency Response
- Source type: Voltage divider / Series (for frequency response)

**Key Outputs**

- Step response: time-domain plot (V_out vs time)
  - Annotated: time constant τ, settling time, overshoot %
- Frequency response: magnitude (dB) + phase (°) vs frequency (Hz)
  - Annotated: -3dB point, resonant frequency f₀, bandwidth
- Key derived values displayed: ω₀, ζ, τ, Q factor

**Visualization Type**

- Dual-panel chart: top = time domain OR magnitude, bottom = phase
- Log-scale frequency axis for Bode view
- Recharts or D3-based, fully reactive to slider input

**Difficulty:** Medium

**MVP Scope**

- RC lowpass, RL lowpass, RLC series (voltage divider output)
- Both step response and frequency response views
- Annotated key points on chart
- Live update on slider change

**Leave for Later**

- RLC parallel, bandpass, bandstop configs
- Input waveform selection (sine, square, impulse)
- Export plot as image
- Transfer function display in LaTeX

---

### T06 — Fourier Series Visualizer

| Field                | Value                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------- |
| **Title**            | Fourier Series Visualizer                                                                         |
| **Category**         | Visualizer                                                                                        |
| **Purpose**          | Animate how Fourier series harmonics sum to approximate periodic waveforms                        |
| **Majors**           | EE, ME, AE, BME                                                                                   |
| **Related Courses**  | Signals & Systems, Digital Signal Processing, Mechanical Vibrations, Biosignals & Medical Imaging |
| **Related Concepts** | Fourier series, harmonics, frequency spectrum, periodic signals, superposition                    |

**Key Inputs**

- Waveform selector: Square, Sawtooth, Triangle, Half-wave rectified sine
- N harmonics slider (1 to ~50)
- Animation toggle: animate harmonic addition
- View toggle: Time domain / Spectrum (frequency)

**Key Outputs**

- Time domain: individual harmonic components (faint) + running sum (bold) vs original waveform
- Spectrum view: bar chart of Fourier coefficients (aₙ, bₙ) vs harmonic number
- Gibbs phenomenon visible when N is moderate
- Convergence error metric: RMS error between approximation and target

**Visualization Type**

- Animated line chart (D3 or Recharts). Spectrum as bar chart. Side-by-side or tabbed.

**Difficulty:** Medium

**MVP Scope**

- 4 preset waveforms
- N slider up to 50
- Both time and spectrum views
- Animation of harmonic stacking (frame-by-frame or continuous)
- Gibbs phenomenon naturally visible

**Leave for Later**

- Custom waveform drawing (user-defined)
- Fourier Transform (aperiodic) vs Fourier Series distinction
- Complex exponential form display
- Audio playback of waveform

---

### T07 — Bode Plot Generator

| Field                | Value                                                                                                                          |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Title**            | Bode Plot Generator                                                                                                            |
| **Category**         | Visualizer                                                                                                                     |
| **Purpose**          | Generate accurate Bode magnitude and phase plots from a transfer function defined by poles and zeros                           |
| **Majors**           | EE, ME, AE, ChE                                                                                                                |
| **Related Courses**  | Signals & Systems, Control Systems, Circuit Analysis II, Control Systems (ME), Process Control (ChE), Flight Mechanics II (AE) |
| **Related Concepts** | Bode plot, transfer function, poles, zeros, gain margin, phase margin, frequency response, stability                           |

**Key Inputs**

- Input method toggle: Poles/Zeros/Gain OR Numerator/Denominator coefficients
- Poles: list of real or complex-conjugate pair entries
- Zeros: list of real or complex-conjugate pair entries
- DC gain K
- Frequency range: start and end decade (e.g. 10⁻² to 10⁶ rad/s)

**Key Outputs**

- Bode magnitude plot: |H(jω)| in dB vs log ω
- Bode phase plot: ∠H(jω) in degrees vs log ω
- Annotated: gain crossover frequency, phase crossover frequency, gain margin (dB), phase margin (°)
- Stability assessment: "Stable / Marginally Stable / Unstable" label
- Asymptotic approximation overlay toggle (straight-line Bode approximation)

**Visualization Type**

- Dual-panel log-scale charts (magnitude on top, phase on bottom). Shared x-axis. Annotation markers on crossover points.

**Difficulty:** Medium

**MVP Scope**

- Poles/zeros input (real and complex conjugate pairs)
- Gain and phase plots with log frequency axis
- Gain margin, phase margin computed and labeled
- Asymptote overlay toggle
- Up to ~5 poles + 5 zeros

**Leave for Later**

- Transfer function entry as a rational polynomial (requires polynomial root finding)
- Root locus generator (related but separate tool)
- Time delay (e^{-τs}) handling
- Nichols chart / Nyquist plot views
- Export to MATLAB/Python code

---

### T08 — Phasor & AC Circuit Calculator

| Field                | Value                                                                                                          |
| -------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Title**            | Phasor & AC Circuit Calculator                                                                                 |
| **Category**         | Calculator                                                                                                     |
| **Purpose**          | Compute impedance, current, voltage, and power for series and parallel RLC AC circuits; display phasor diagram |
| **Majors**           | EE                                                                                                             |
| **Related Courses**  | Circuit Analysis II                                                                                            |
| **Related Concepts** | Phasors, impedance, admittance, AC power, power factor, resonance, reactive power                              |

**Key Inputs**

- Circuit topology: Series RLC / Parallel RLC
- Component values: R (Ω), L (H or mH), C (F or μF)
- Source: V_s (peak or RMS), frequency f (Hz)

**Key Outputs**

- Total impedance Z (rectangular + polar form)
- Current I (magnitude, phase)
- Voltage across each component (V_R, V_L, V_C)
- Power: real (P, W), reactive (Q, VAR), apparent (S, VA), power factor (cos φ)
- Resonant frequency f₀
- Phasor diagram: V and I vectors to scale with phase angle visible

**Visualization Type**

- SVG phasor diagram (voltage and current vectors, rotating or static)
- Rectangular results panel alongside

**Difficulty:** Medium

**MVP Scope**

- Series and parallel RLC
- Complete power triangle display
- Phasor diagram (static, to scale)
- All derived quantities computed

**Leave for Later**

- Arbitrary circuit topology (mesh/node analysis) → needs a circuit engine
- Animated rotating phasors
- Power factor correction calculator
- Three-phase phasor system

---

### T09 — Op-Amp Circuit Configurator

| Field                | Value                                                                                                                     |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Title**            | Op-Amp Circuit Configurator                                                                                               |
| **Category**         | Calculator                                                                                                                |
| **Purpose**          | Select an op-amp configuration, set resistor values, and compute gain, bandwidth, and output formula                      |
| **Majors**           | EE, BME                                                                                                                   |
| **Related Courses**  | Electronics II, Bioinstrumentation                                                                                        |
| **Related Concepts** | Op-amp, negative feedback, gain, inverting amplifier, non-inverting amplifier, integrator, differentiator, virtual ground |

**Key Inputs**

- Configuration selector: Inverting / Non-Inverting / Voltage Follower / Summing / Integrator / Differentiator / Comparator
- Component values: R1, R2, Rf, C (shown/hidden based on configuration)
- Op-amp parameters: GBW (gain-bandwidth product), V_supply ±

**Key Outputs**

- Gain (Av) with formula shown
- Output formula (e.g. "V_out = −(Rf/R1) × V_in")
- Bandwidth estimate (f\_-3dB = GBW / |Av|)
- Output voltage range (±V_supply × 0.85 approx for ideal)
- Circuit schematic diagram auto-drawn per configuration

**Visualization Type**

- SVG schematic (auto-redrawn per config). Resistor values labeled on diagram. Results in side panel.

**Difficulty:** Medium

**MVP Scope**

- 7 configurations
- Auto-rendered SVG schematic per config
- Gain, bandwidth, output formula
- Component labels update live on schematic

**Leave for Later**

- Frequency response plot (integrates with Bode tool)
- Slew rate and settling time
- Non-ideal op-amp model (offset voltage, bias current)
- Multi-stage amp cascading

---

### T10 — Free Body Diagram Builder

| Field                | Value                                                                                            |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Title**            | Free Body Diagram Builder                                                                        |
| **Category**         | Simulator                                                                                        |
| **Purpose**          | Draw forces and moments on a 2D rigid body; compute net force, net moment, and check equilibrium |
| **Majors**           | ME, CE, AE, Core (Statics)                                                                       |
| **Related Courses**  | Statics, Physics I, Dynamics                                                                     |
| **Related Concepts** | Free body diagram, equilibrium, force vectors, moments, resultant force, Newton's first law      |

**Key Inputs**

- Body selector: Point / Beam / Rectangle / Circle (simple shapes)
- Add force: magnitude, direction (angle), point of application
- Add moment: magnitude, CW/CCW
- Support conditions (optional): pin, roller, fixed

**Key Outputs**

- Net force vector: ΣFx, ΣFy (numerical + visual resultant arrow)
- Net moment: ΣM about origin (numerical)
- Equilibrium check: "System is in equilibrium / Not in equilibrium"
- Reaction forces (if supports defined): computed and displayed

**Visualization Type**

- Canvas-based drawing. Body rendered as shape. Forces as arrows with labels. Resultant shown in distinct color. Numerical summary panel alongside.

**Difficulty:** Medium-High

**MVP Scope**

- Simple 2D only
- 3 body shapes
- Force vectors and moments
- Net force + moment computation
- Equilibrium status output
- Optional simple supports (pin, roller)

**Leave for Later**

- 3D free body diagrams
- Distributed loads (UDL, trapezoidal)
- Truss member force solver
- Animated motion (dynamics)
- Export as PNG or PDF

---

## 3. Tool Page Structure

### Reusable Tool Page Layout

Every tool page uses this structure. Sections are always in this order.

---

```
┌─────────────────────────────────────────────────────────┐
│  HEADER BLOCK                                           │
│  ─────────────────────────────────────────────────────  │
│  [Category badge]  [Major tags]                         │
│  Tool Title (H1)                                        │
│  One-sentence purpose                                   │
│  [Related courses: chip links]                          │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  MAIN PANEL (2-column on desktop, stack on mobile)      │
│                                                         │
│  LEFT: Controls Panel          RIGHT: Output Panel      │
│  ─────────────────────────     ─────────────────────    │
│  Inputs (sliders, droppers,    Visualization or         │
│  number fields, toggles,       computation output       │
│  mode switches)                (chart, diagram, SVG,    │
│                                canvas, table)           │
│  "Reset to defaults" link                               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  RESULTS STRIP (optional — for calculator tools)        │
│  Key numerical outputs displayed as labeled value cards │
│  e.g.  │ Z = 50Ω ∠-36° │ f₀ = 1592 Hz │ Q = 3.2 │     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  WHAT TO NOTICE                                         │
│  ─────────────────────────────────────────────────────  │
│  3–5 bullet observations that guide conceptual insight  │
│  e.g. "As R increases, the peak becomes broader..."     │
│  These are static, authored, pedagogically focused      │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  RELATED CONTENT (3-column grid)                        │
│  ─────────────────────────────────────────────────────  │
│  Courses           Concepts            Majors           │
│  ────────          ────────            ──────           │
│  [Course card]     [Concept chip]      [Major badge]    │
│  [Course card]     [Concept chip]      [Major badge]    │
│  ...               ...                 ...              │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  OTHER TOOLS (horizontal scroll)                        │
│  Tools in the same topic cluster / major                │
└─────────────────────────────────────────────────────────┘
```

---

### Section Specifications

#### Header Block

```
categoryBadge:     string — "Calculator" | "Visualizer" | "Simulator" | "Reference"
majorTags:         MajorRef[] — colored badges for each major
title:             H1
purpose:           string — single sentence, plain language
relatedCourseChips: CourseRef[] — inline chip links, max 4 shown (expand for more)
```

#### Controls Panel

```
layout:           vertical stack of input groups
inputGroup:       { label, hint?, input: Slider | NumberField | Dropdown | Toggle | ButtonGroup }
hint:             short text under input label (e.g. "Common range: 100Ω – 10kΩ")
resetButton:      "Reset to defaults" — restores all inputs to initial values
modeSwitch:       top of panel when tool has multiple modes (e.g. RC/RL/RLC)
```

#### Output Panel

```
type:             "chart" | "canvas" | "svg" | "schematic" | "table" | "multi"
responsive:       always fills available width
emptyState:       shown before user interacts (for canvas/simulator tools)
loadingState:     brief spinner for chart tools that recompute on slider change
annotations:      key values labeled directly on chart (not just in legend)
```

#### Results Strip

```
when:             shown for calculator-type tools that produce discrete key values
items:            { label, value, unit, formula? }
maxItems:         6 before wrapping to two rows
formula:          shown in tooltip or below value (e.g. "f₀ = 1/(2π√LC)")
```

#### What to Notice

```
items:            3–5 authored insight bullets
format:           bold keyword + explanation
  e.g. "Damping ratio ζ: when ζ < 1, the circuit oscillates before settling."
purpose:          this is the pedagogical payoff — makes tool curriculum-connected
```

#### Related Content

```
courses:          CourseRef[] — card with title, year, major
concepts:         ConceptRef[] — chip with definition tooltip on hover
majors:           MajorRef[] — colored badge with link to major overview
```

#### Other Tools

```
source:           tools in same clusterIds OR same majorIds as current tool
display:          horizontal scroll row of compact tool cards
maxShown:         5 (show all in V2 with filtering)
```

---

### Component Map

| Section           | Component Name          | Reused By          |
| ----------------- | ----------------------- | ------------------ |
| Header            | `<ToolHeader>`          | All 10 tools       |
| Controls          | `<ControlPanel>`        | All 10 tools       |
| Slider input      | `<ParameterSlider>`     | T05, T06, T07, T10 |
| Number + unit     | `<UnitInput>`           | T02, T08, T09, T10 |
| Toggle/mode       | `<ModeSwitch>`          | T03, T05, T06, T07 |
| Dual-axis chart   | `<BodePlot>`            | T05, T07           |
| Single-axis chart | `<LineChart>`           | T05, T06           |
| Bar chart         | `<SpectrumChart>`       | T06                |
| SVG schematic     | `<CircuitSchematic>`    | T09                |
| SVG resistor      | `<ResistorSVG>`         | T03                |
| Phasor diagram    | `<PhasorDiagram>`       | T08                |
| Canvas board      | `<InteractiveCanvas>`   | T04, T10           |
| Results strip     | `<ResultsStrip>`        | T02, T05, T08, T09 |
| What to notice    | `<InsightPanel>`        | All 10 tools       |
| Related content   | `<RelatedContent>`      | All 10 tools       |
| Other tools       | `<ToolRecommendations>` | All 10 tools       |

---

## 4. Best First Build Order

### Guiding Logic

- Build tool page template with T01 (simplest, no math)
- Each subsequent tool validates one new UI/computation pattern
- Chart infrastructure (T05) unlocks T06 and T07 at low incremental cost
- SVG schematic pattern (T09) is self-contained and reusable
- Canvas tools (T04, T10) are most complex; build after patterns are stable

---

### Build Sequence

```
┌──── PHASE A: Template + Calculators (Validates page shell) ────┐
│                                                                │
│  1. T01 — Unit Converter                                       │
│     Rationale: No chart, no math complexity. Validates:        │
│     ToolHeader, ControlPanel, UnitInput, InsightPanel,         │
│     RelatedContent, ToolRecommendations. Sets the page         │
│     template for all subsequent tools.                         │
│                                                                │
│  2. T02 — Ohm's Law Calculator                                 │
│     Rationale: Adds ResultsStrip + formula display.           │
│     Validates: 2-of-4 input logic, active formula display,    │
│     Power Triangle SVG (first simple SVG element).            │
│                                                                │
│  3. T03 — Resistor Color Code                                  │
│     Rationale: Introduces ResistorSVG + encode/decode mode.   │
│     Validates: ModeSwitch, visual-first output, bidirectional  │
│     calculator pattern.                                        │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌──── PHASE B: Chart Infrastructure (Unlocks 3 tools) ──────────┐
│                                                                │
│  4. T05 — RLC Circuit Response Visualizer                      │
│     Rationale: First chart tool. Validates: ParameterSlider,  │
│     LineChart, BodePlot (dual-axis), log scale, annotations,  │
│     reactive recomputation on slider. This is the most        │
│     important infrastructure tool — reused by T06 and T07.    │
│                                                                │
│  5. T06 — Fourier Series Visualizer                            │
│     Rationale: Reuses LineChart from T05. Adds SpectrumChart  │
│     (bar chart). Validates animation pattern.                  │
│                                                                │
│  6. T07 — Bode Plot Generator                                  │
│     Rationale: Reuses BodePlot from T05. Adds pole/zero       │
│     input UI. Heavier math (complex frequency evaluation)      │
│     but chart infrastructure already exists.                   │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌──── PHASE C: Schematic + Vector Tools ────────────────────────┐
│                                                                │
│  7. T08 — Phasor & AC Circuit Calculator                       │
│     Rationale: Adds PhasorDiagram SVG (new pattern).          │
│     Math is well-scoped (series/parallel RLC only).           │
│     Validates: complex number display, polar/rectangular.      │
│                                                                │
│  8. T09 — Op-Amp Circuit Configurator                          │
│     Rationale: Adds CircuitSchematic SVG (7 static diagrams). │
│     Math is lookup-based (formulas per config). The schematic  │
│     is the main challenge; computation is straightforward.     │
│                                                                │
└────────────────────────────────────────────────────────────────┘

┌──── PHASE D: Interactive Canvas Tools ────────────────────────┐
│                                                                │
│  9. T04 — Logic Gate Simulator                                 │
│     Rationale: First canvas tool. Most complex interaction    │
│     model (drag, connect, propagate). Build after all chart   │
│     and SVG patterns are proven. Use a small library for       │
│     canvas graph (e.g. React Flow or custom D3).              │
│                                                                │
│  10. T10 — Free Body Diagram Builder                           │
│     Rationale: Second canvas tool. Builds on canvas pattern   │
│     from T04 but with different physics engine. Last because  │
│     it's most scope-risky and cross-major (not EE-core).      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

### Build Order Summary Table

| Order | Tool                    | New Pattern Introduced                    | Depends On  |
| ----- | ----------------------- | ----------------------------------------- | ----------- |
| 1     | T01 Unit Converter      | Page shell, form layout                   | —           |
| 2     | T02 Ohm's Law           | ResultsStrip, formula display, simple SVG | T01 shell   |
| 3     | T03 Resistor Color Code | ModeSwitch, visual SVG                    | T01 shell   |
| 4     | T05 RLC Response        | LineChart, BodePlot, sliders, log axis    | T01 shell   |
| 5     | T06 Fourier Series      | SpectrumChart, animation                  | T05 chart   |
| 6     | T07 Bode Plot           | Pole/zero input, crossover markers        | T05 chart   |
| 7     | T08 Phasor Calc         | PhasorDiagram, complex numbers            | T02 results |
| 8     | T09 Op-Amp Config       | CircuitSchematic SVG (7 configs)          | T02 results |
| 9     | T04 Logic Gate Sim      | Canvas, drag-drop, graph propagation      | T01 shell   |
| 10    | T10 FBD Builder         | Canvas physics, force vectors, reactions  | T04 canvas  |

---

## 5. Shared Abstractions

### Shared Math Utilities (`/lib/math/`)

| Module           | Used By       | Contents                                                                              |
| ---------------- | ------------- | ------------------------------------------------------------------------------------- |
| `complex.ts`     | T05, T07, T08 | Complex number class: add, multiply, divide, magnitude, phase, polar/rect conversion  |
| `polynomials.ts` | T07           | Polynomial evaluation at complex frequency s = jω                                     |
| `transfer-fn.ts` | T05, T07      | Evaluate H(jω) from poles/zeros/gain; returns magnitude (dB) and phase (°) arrays     |
| `fourier.ts`     | T06           | Fourier coefficient computation for standard waveforms (square, saw, triangle)        |
| `rlc.ts`         | T05, T08      | RLC natural frequency ω₀, damping ratio ζ, step response via analytical solution      |
| `ac-power.ts`    | T02, T08      | Real/reactive/apparent power, power factor from V and I phasors                       |
| `color-code.ts`  | T03           | EIA color band encode/decode lookup tables                                            |
| `units.ts`       | T01           | Conversion factor tables per physical quantity                                        |
| `fbd.ts`         | T10           | 2D vector math: force summation, moment calculation, reaction solver                  |
| `logic-sim.ts`   | T04           | Boolean gate evaluation, circuit traversal (topological sort), truth table generation |

---

### Shared UI Components (`/components/tools/`)

| Component             | Used By            | Key Props                                             |
| --------------------- | ------------------ | ----------------------------------------------------- |
| `ToolHeader`          | All                | title, purpose, category, majors, courseRefs          |
| `ControlPanel`        | All                | children (input groups), onReset                      |
| `ParameterSlider`     | T05, T06, T07, T10 | label, min, max, step, value, unit, onChange          |
| `UnitInput`           | T02, T08, T09, T10 | label, value, unitOptions, onChange                   |
| `ModeSwitch`          | T03, T05, T06, T07 | options[], value, onChange                            |
| `ResultsStrip`        | T02, T05, T08, T09 | results: {label, value, unit, formula}[]              |
| `InsightPanel`        | All                | insights: {keyword, text}[]                           |
| `RelatedContent`      | All                | courses[], concepts[], majors[]                       |
| `ToolRecommendations` | All                | tools[] (filtered by cluster/major)                   |
| `LineChart`           | T05, T06           | series[], xLabel, yLabel, annotations[]               |
| `DualAxisChart`       | T05, T07           | upperSeries[], lowerSeries[], xLabel, yLabels         |
| `SpectrumChart`       | T06                | coefficients[], xLabel                                |
| `PhasorDiagram`       | T08                | vectors: {label, mag, angle, color}[]                 |
| `ResistorSVG`         | T03                | bands: Color[]                                        |
| `CircuitSchematic`    | T09                | config: OpAmpConfig, values: ComponentValues          |
| `InteractiveCanvas`   | T04, T10           | mode, onUpdate, initialState                          |
| `FormulaDisplay`      | T02, T07, T08, T09 | formula: string (LaTeX or plain), substituted: string |

---

### Chart Library Decision

Use **Recharts** for all standard plots (LineChart, DualAxisChart, SpectrumChart):

- Declarative React API — no imperative D3 manipulation
- Responsive by default
- Sufficient for Bode/RLC/Fourier use cases

Use **custom SVG** for PhasorDiagram, ResistorSVG, CircuitSchematic:

- Static or near-static; no need for chart library overhead
- Precise control over layout and styling

Use **custom Canvas / React Flow** for InteractiveCanvas:

- T04 (Logic Gate): React Flow is the best fit (handles nodes, edges, ports)
- T10 (FBD): Custom Canvas2D with mouse event handlers (simpler, no graph structure)

---

### Shared State Pattern

All tools follow the same state shape:

```typescript
type ToolState<TInputs, TOutputs> = {
  inputs: TInputs; // controlled by ControlPanel
  outputs: TOutputs; // derived via useMemo from inputs
  mode?: string; // for multi-mode tools
};
```

Computation is **always pure**: `outputs = compute(inputs)`. No side effects. No API calls. All math runs synchronously in the browser.

For tools with heavy computation (T06 at N=50 harmonics, T07 with many frequency points), run computation in a `useMemo` with debounced input changes to avoid jank.

---

## 6. Product Fit

### Why These Tools Specifically

**The tool set is curriculum-anchored, not feature-complete.**
Every tool maps to one or more named courses in the Atlas curriculum. A student on the Circuit Analysis II page sees the RLC Visualizer and Phasor Calculator as direct practice surfaces. The tools are not standalone — they are attached.

**EE-first matches the platform's V1 depth.**
Seven of ten tools cover EE core courses (Circuit Analysis I–II, Electronics II, Signals & Systems, Control Systems, Digital Logic, DSP). This mirrors the EE specialization being the only fully built track in V1. The three non-EE tools (Unit Converter, Fourier, FBD) have strong EE overlap too.

**Each tool teaches through interaction, not explanation.**
The "What to Notice" panel is the pedagogical engine — it turns a simulation into curriculum. This is what separates Engineering Atlas tools from generic online calculators. The Bode Plot Generator doesn't just plot; it surfaces gain margin, phase margin, and stability classification — language from the Control Systems course.

**The tool set creates network effects within the platform.**
Concepts like `transfer-function`, `fourier-transform`, and `bode-plot` appear in 4–6 courses across multiple majors. A single tool demonstrating one concept cross-links to all those courses and all those majors. The Bode Plot Generator alone connects EE Control Systems, ME Control Systems, ChE Process Control, and AE Flight Mechanics II.

**The complexity distribution is intentional.**
3 low-complexity tools first: validates the template architecture quickly, gets tools live early, builds user trust with immediate utility. Medium tools form the core. Medium-high tools (T04, T10) come last because they carry the most scope risk and can be cut from V1 if schedule is tight without losing the EE-first narrative.

**Every tool is implementable without a backend.**
All computation is client-side JavaScript/TypeScript. No database queries, no server-side rendering of results, no API rate limits. This means tools load instantly and work offline — important for a platform targeting students who may be studying anywhere.

**The tool set establishes the Labs as a distinct product section.**
A unit converter alone is a widget. A Bode plot generator with course links, concept chips, and pedagogical callouts is a curriculum tool. The page structure, the insight panel, and the related content system collectively make the Interactive Labs feel like an integrated part of Engineering Atlas rather than an embedded calculator page.
