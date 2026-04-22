# Engineering Atlas — Normalized Structured Data Plan
> Source: engineering_atlas.md
> Purpose: Implementation-ready data model for website build
> Format: Compact, structured, no prose padding

---

## 1. Major Inventory

| # | id | name | shortName | depthV1 | color-token |
|---|---|---|---|---|---|
| 0 | `core` | Core Engineering | CORE | full | `--color-core` |
| 1 | `electrical-engineering` | Electrical Engineering | EE | full | `--color-ee` |
| 2 | `mechanical-engineering` | Mechanical Engineering | ME | map | `--color-me` |
| 3 | `civil-engineering` | Civil Engineering | CE | map | `--color-ce` |
| 4 | `chemical-engineering` | Chemical Engineering | ChE | map | `--color-che` |
| 5 | `computer-engineering` | Computer Engineering | CpE | map | `--color-cpe` |
| 6 | `aerospace-engineering` | Aerospace Engineering | AE | map | `--color-ae` |
| 7 | `biomedical-engineering` | Biomedical Engineering | BME | map | `--color-bme` |
| 8 | `industrial-engineering` | Industrial Engineering | IE | map | `--color-ie` |
| 9 | `materials-engineering` | Materials Engineering | MatE | map | `--color-mate` |

**depthV1 values:** `full` = all course detail + tools; `map` = course list + metadata only

---

## 2. Topic Cluster Inventory

Each cluster is a top-level grouping used for filtering, tagging, and navigation.

| id | label | primary majors | notes |
|---|---|---|---|
| `mathematics` | Mathematics | CORE, ALL | Calculus, LA, stats, diff eq |
| `physics` | Physics | CORE, EE, ME, AE, MatE | Mechanics and E&M |
| `circuits` | Circuit Theory | EE, CpE | DC/AC analysis, network theorems |
| `electronics` | Electronics & Devices | EE, CpE | Diodes, BJTs, MOSFETs, op-amps |
| `digital-logic` | Digital Logic | EE, CpE | Boolean algebra, FSMs, HDL |
| `signals` | Signals & Systems | EE, CpE, AE, BME | Transforms, LTI, convolution |
| `control` | Control Systems | EE, ME, AE, CpE | Feedback, stability, PID |
| `dsp` | Digital Signal Processing | EE, BME | FFT, filter design, Z-transform |
| `electromagnetics` | Electromagnetics | EE, AE | Maxwell, waves, transmission lines |
| `communications` | Communications | EE | Modulation, channels, coding |
| `power` | Power Systems | EE | Grid, transformers, fault analysis |
| `vlsi` | VLSI & Semiconductors | EE, CpE | CMOS, IC design, fabrication |
| `embedded` | Embedded Systems | EE, CpE | Microcontrollers, RTOS, peripherals |
| `computing` | Computer Architecture | CpE | ISA, pipeline, cache, OS |
| `mechanics` | Classical Mechanics | CORE, ME, CE, AE | Statics, dynamics, vibrations |
| `solid-mechanics` | Solid Mechanics | ME, CE, AE, MatE | Stress, strain, deformation |
| `thermodynamics` | Thermodynamics | CORE, ME, AE, ChE | Laws, cycles, energy analysis |
| `fluids` | Fluid Mechanics | ME, CE, AE, ChE | Flow, CFD, hydraulics |
| `heat-transfer` | Heat Transfer | ME, ChE, AE | Conduction, convection, radiation |
| `structures` | Structural Analysis | CE, AE, ME | Beams, trusses, FEA |
| `geotechnics` | Geotechnical Engineering | CE | Soils, foundations, slope stability |
| `transportation` | Transportation | CE | Traffic, highway, pavement |
| `water` | Hydrology & Water Resources | CE, ChE | Hydrology, water treatment |
| `manufacturing` | Manufacturing | ME, IE, MatE | Processes, tolerances, DFM |
| `machine-design` | Machine Design | ME | Fatigue, gears, shafts, bearings |
| `materials` | Materials Science | ME, MatE, AE, BME | Structure-property-processing |
| `chemistry` | Chemistry | ChE, MatE, BME | General, organic, physical |
| `reaction-engineering` | Reaction Engineering | ChE | Reactors, kinetics, selectivity |
| `separations` | Separation Processes | ChE | Distillation, absorption, membranes |
| `process-design` | Process Design & Economics | ChE | Flowsheets, costing, simulation |
| `safety` | Engineering Safety | ChE, BME, ALL | HAZOP, FMEA, risk analysis |
| `aerodynamics` | Aerodynamics | AE | Lift, drag, boundary layers, CFD |
| `propulsion` | Propulsion | AE | Gas turbines, rockets, nozzles |
| `flight-mechanics` | Flight Mechanics | AE | Performance, stability, dynamics |
| `orbital-mechanics` | Orbital Mechanics | AE | Two-body, maneuvers, missions |
| `biomechanics` | Biomechanics | BME, ME | Tissue mechanics, gait, joints |
| `biomaterials` | Biomaterials | BME, MatE | Implants, biocompatibility |
| `physiology` | Physiology | BME | Cardiovascular, neural, musculoskeletal |
| `bioinstrumentation` | Bioinstrumentation | BME | Biosignals, electrodes, amplifiers |
| `medical-imaging` | Medical Imaging | BME | CT, MRI, ultrasound |
| `operations-research` | Operations Research | IE | LP, IP, scheduling, routing |
| `statistics-quality` | Statistics & Quality | IE, ALL | SPC, DOE, six sigma |
| `simulation` | Systems Simulation | IE | DES, Monte Carlo, modeling |
| `systems` | Systems Engineering | IE, AE | Lifecycle, requirements, MBSE |
| `supply-chain` | Supply Chain & Logistics | IE | Inventory, networks, forecasting |
| `human-factors` | Human Factors | IE | Ergonomics, cognitive load, UX |
| `economics` | Engineering Economics | IE, ALL | NPV, IRR, cost estimation |
| `computation` | Numerical Methods | CORE, ME, AE, ChE | Numerical ODE, FEM, optimization |
| `design` | Engineering Design | CORE, ALL | Design process, requirements, prototyping |
| `ethics` | Engineering Ethics | CORE, ALL | Codes, safety, professionalism |

**Total clusters: 50**

---

## 3. Course Inventory Structure

### Notation
- `[CORE]` = authored under Core Engineering; referenced by other majors
- `[SHARED]` = appears in multiple majors but authored under the originating major
- All IDs are kebab-case slugs

---

### CORE — Core Engineering (12 courses)

| id | title | year | stage |
|---|---|---|---|
| `calculus-i` | Calculus I | 1 | foundation |
| `calculus-ii` | Calculus II | 1 | foundation |
| `physics-i` | Physics I — Mechanics | 1 | foundation |
| `intro-engineering` | Introduction to Engineering | 1 | foundation |
| `calculus-iii` | Calculus III — Multivariable Calculus | 1-2 | core-sciences |
| `differential-equations` | Differential Equations | 1-2 | core-sciences |
| `physics-ii` | Physics II — Electromagnetism | 1-2 | core-sciences |
| `linear-algebra` | Linear Algebra | 1-2 | core-sciences |
| `engineering-statistics` | Engineering Statistics & Probability | 1-2 | core-sciences |
| `statics` | Statics | 2 | engineering-core |
| `dynamics` | Dynamics | 2 | engineering-core |
| `mechanics-of-materials` | Mechanics of Materials | 2 | engineering-core |
| `thermodynamics-i` | Thermodynamics I | 2 | engineering-core |
| `engineering-design-i` | Engineering Design I | 2 | engineering-core |
| `numerical-methods` | Numerical Methods for Engineers | 3 | applied-core |
| `engineering-ethics` | Engineering Ethics and Professionalism | 3 | applied-core |

**Note: Core has 16 courses total (4 in Y1, 5 in Y1-2, 5 in Y2, 2 in Y3)**

---

### Full Course Record Format

```
id:              string        slug, globally unique
title:           string        display name
majorId:         string        "core" | major slug
isCore:          boolean       true if authored under Core Engineering
stageId:         string        stage slug (see Stage Registry below)
year:            string        "1" | "1-2" | "2" | "2-3" | "3" | "3-4" | "4"
stageLabel:      string        human-readable stage name
shortDesc:       string        ≤ 200 chars
whyItMatters:    string        ≤ 150 chars
prereqs:         string[]      course id refs
leadsInto:       string[]      course id refs (may include non-platform courses as strings)
skills:          string[]      ≤ 6 skill tags
topicClusters:   string[]      cluster id refs from §2
concepts:        string[]      concept id refs from §4
relatedTools:    string[]      tool id refs
isElective:      boolean
electiveTheme:   string|null
status:          "live"|"stub"|"planned"
```

---

### Stage Registry (shared across all majors)

| stageId | label | typical year |
|---|---|---|
| `foundation` | Foundations | 1 |
| `core-sciences` | Core Sciences | 1-2 |
| `engineering-core` | Engineering Core | 2 |
| `major-entry` | Major Entry | 2 |
| `major-core` | Major Core | 2-3 |
| `intermediate` | Intermediate | 3 |
| `advanced` | Advanced | 3-4 |
| `capstone` | Capstone + Electives | 4 |

---

### EE — Electrical Engineering (22 courses + elective slots)

| id | title | year | stage | topic clusters |
|---|---|---|---|---|
| `circuit-analysis-i` | Circuit Analysis I | 2 | major-entry | `circuits` |
| `circuit-analysis-ii` | Circuit Analysis II | 2 | major-entry | `circuits`, `signals` |
| `programming-for-engineers` | Programming for Engineers | 2 | major-entry | `computation` |
| `electronics-i` | Electronics I — Diodes and BJTs | 2-3 | major-core | `electronics` |
| `electronics-ii` | Electronics II — MOSFETs and Op-Amps | 2-3 | major-core | `electronics` |
| `digital-logic-design` | Digital Logic Design | 2-3 | major-core | `digital-logic` |
| `signals-and-systems` | Signals and Systems | 2-3 | major-core | `signals` |
| `electromagnetics` | Electromagnetics | 2-3 | major-core | `electromagnetics` |
| `control-systems-ee` | Control Systems | 3 | intermediate | `control`, `signals` |
| `digital-signal-processing` | Digital Signal Processing | 3 | intermediate | `dsp`, `signals` |
| `vlsi-i` | Microelectronics and VLSI I | 3 | intermediate | `vlsi`, `electronics` |
| `probability-random-processes` | Probability and Random Processes | 3 | intermediate | `signals`, `mathematics` |
| `power-systems-i` | Power Systems I | 3-4 | advanced | `power` |
| `communications-systems` | Communications Systems | 3-4 | advanced | `communications`, `signals` |
| `embedded-systems` | Embedded Systems | 3-4 | advanced | `embedded`, `computing` |
| `ee-capstone` | Senior Capstone — EE Design Project | 4 | capstone | `design` |
| `ee-elective-power-electronics` | [THEME: Power Electronics] | 4 | capstone | `power`, `electronics` |
| `ee-elective-rf-microwave` | [THEME: RF & Microwave] | 4 | capstone | `electromagnetics` |
| `ee-elective-photonics` | [THEME: Photonics & Optics] | 4 | capstone | `electromagnetics` |
| `ee-elective-vlsi-ii` | [THEME: VLSI II / IC Design] | 4 | capstone | `vlsi` |
| `ee-elective-wireless-5g` | [THEME: Wireless & 5G] | 4 | capstone | `communications` |
| `ee-elective-ml` | [THEME: Machine Learning for EE] | 4 | capstone | `computation` |
| `ee-elective-bioelectronics` | [THEME: Bioelectronics] | 4 | capstone | `electronics`, `bioinstrumentation` |
| `ee-elective-robotics` | [THEME: Robotics & Mechatronics] | 4 | capstone | `control`, `embedded` |

---

### ME — Mechanical Engineering (13 courses + elective slots)

| id | title | year | stage | topic clusters |
|---|---|---|---|---|
| `fluid-mechanics-me` | Fluid Mechanics | 2-3 | major-core | `fluids` |
| `heat-transfer-me` | Heat Transfer | 2-3 | major-core | `heat-transfer`, `thermodynamics` |
| `thermodynamics-ii` | Thermodynamics II — Power and Refrigeration Cycles | 2-3 | major-core | `thermodynamics` |
| `materials-science-me` | Materials Science for Engineers | 2-3 | major-core | `materials` |
| `manufacturing-processes` | Manufacturing Processes | 2-3 | major-core | `manufacturing` |
| `machine-design` | Machine Design | 3 | intermediate | `machine-design`, `solid-mechanics` |
| `mechanical-vibrations` | Mechanical Vibrations | 3 | intermediate | `mechanics`, `signals` |
| `control-systems-me` | Control Systems for Mechanical Engineers | 3 | intermediate | `control` |
| `fea-i` | Finite Element Analysis I | 3 | intermediate | `solid-mechanics`, `computation` |
| `mechatronics` | Mechatronics | 3-4 | advanced | `control`, `embedded`, `machine-design` |
| `cfd-intro` | Computational Fluid Dynamics — Intro | 3-4 | advanced | `fluids`, `computation` |
| `me-capstone` | Senior Capstone — ME Design Project | 4 | capstone | `design` |
| `me-elective-robotics` | [THEME: Robotics] | 4 | capstone | `control`, `mechanics` |
| `me-elective-aerospace` | [THEME: Aerospace Systems] | 4 | capstone | `aerodynamics`, `propulsion` |
| `me-elective-automotive` | [THEME: Automotive Engineering] | 4 | capstone | `machine-design`, `thermodynamics` |
| `me-elective-hvac` | [THEME: HVAC & Building Systems] | 4 | capstone | `thermodynamics`, `fluids` |
| `me-elective-tribology` | [THEME: Tribology] | 4 | capstone | `materials`, `machine-design` |
| `me-elective-advanced-mfg` | [THEME: Advanced Manufacturing] | 4 | capstone | `manufacturing` |
| `me-elective-sustainable-energy` | [THEME: Sustainable Energy] | 4 | capstone | `thermodynamics`, `power` |
| `me-elective-biomechanics` | [THEME: Biomechanics] | 4 | capstone | `biomechanics` |

---

### CE — Civil Engineering (13 courses + elective slots)

| id | title | year | stage | topic clusters |
|---|---|---|---|---|
| `civil-materials` | Civil Engineering Materials | 2-3 | major-entry | `materials`, `structures` |
| `surveying` | Surveying and Geomatics | 2-3 | major-entry | `transportation` |
| `fluid-mechanics-ce` | Fluid Mechanics (Civil Focus) | 2-3 | major-entry | `fluids`, `water` |
| `structural-analysis-i` | Structural Analysis I | 2-3 | major-core | `structures` |
| `structural-analysis-ii` | Structural Analysis II | 2-3 | major-core | `structures` |
| `reinforced-concrete-design` | Reinforced Concrete Design | 2-3 | major-core | `structures`, `materials` |
| `steel-structure-design` | Steel Structure Design | 2-3 | major-core | `structures`, `materials` |
| `soil-mechanics` | Soil Mechanics and Geotechnical Engineering | 3 | intermediate | `geotechnics` |
| `foundation-engineering` | Foundation Engineering | 3 | intermediate | `geotechnics` |
| `transportation-engineering` | Transportation Engineering | 3 | intermediate | `transportation` |
| `hydrology` | Hydrology and Water Resources | 3 | intermediate | `water`, `fluids` |
| `environmental-engineering-i` | Environmental Engineering I | 3 | intermediate | `water`, `chemistry` |
| `ce-capstone` | Senior Capstone — Civil Infrastructure Design | 4 | capstone | `design`, `structures` |
| `ce-elective-bridge` | [THEME: Bridge Engineering] | 4 | capstone | `structures` |
| `ce-elective-seismic` | [THEME: Seismic Design] | 4 | capstone | `structures` |
| `ce-elective-construction-mgmt` | [THEME: Construction Management] | 4 | capstone | `economics` |
| `ce-elective-gis` | [THEME: GIS & Remote Sensing] | 4 | capstone | `transportation` |
| `ce-elective-sustainable-infra` | [THEME: Sustainable Infrastructure] | 4 | capstone | `water`, `structures` |
| `ce-elective-coastal` | [THEME: Coastal & Offshore Engineering] | 4 | capstone | `fluids`, `structures` |
| `ce-elective-smart-cities` | [THEME: Smart Cities] | 4 | capstone | `embedded`, `transportation` |

---

### ChE — Chemical Engineering (14 courses + elective slots)

| id | title | year | stage | topic clusters |
|---|---|---|---|---|
| `general-chemistry` | General Chemistry I & II | 1-2 | foundation | `chemistry` |
| `organic-chemistry` | Organic Chemistry I (Survey) | 1-2 | foundation | `chemistry` |
| `material-energy-balances` | Material and Energy Balances | 2 | major-entry | `thermodynamics`, `chemistry` |
| `che-thermodynamics-i` | Chemical Engineering Thermodynamics I | 2 | major-entry | `thermodynamics`, `chemistry` |
| `fluid-mechanics-che` | Fluid Mechanics (ChE Focus) | 2-3 | major-core | `fluids` |
| `heat-transfer-che` | Heat Transfer (ChE Focus) | 2-3 | major-core | `heat-transfer` |
| `mass-transfer-i` | Mass Transfer I | 2-3 | major-core | `separations`, `fluids` |
| `chemical-reaction-engineering` | Chemical Reaction Engineering | 3 | intermediate | `reaction-engineering` |
| `separation-processes` | Separation Processes | 3 | intermediate | `separations` |
| `process-control` | Process Control | 3 | intermediate | `control`, `process-design` |
| `process-design-i` | Process Design and Economics I | 3 | intermediate | `process-design`, `economics` |
| `process-safety` | Process Safety | 3-4 | advanced | `safety` |
| `biochemical-engineering` | Biochemical Engineering | 3-4 | advanced | `reaction-engineering`, `chemistry` |
| `che-capstone` | Senior Capstone — Chemical Plant Design | 4 | capstone | `design`, `process-design` |
| `che-elective-polymer` | [THEME: Polymer Engineering] | 4 | capstone | `materials`, `chemistry` |
| `che-elective-electrochemical` | [THEME: Electrochemical Engineering] | 4 | capstone | `chemistry`, `power` |
| `che-elective-environmental` | [THEME: Environmental ChE] | 4 | capstone | `water`, `safety` |
| `che-elective-petroleum` | [THEME: Petroleum & Gas Processing] | 4 | capstone | `thermodynamics`, `separations` |
| `che-elective-pharma` | [THEME: Pharmaceutical Engineering] | 4 | capstone | `reaction-engineering`, `safety` |
| `che-elective-nano` | [THEME: Nanomaterials & Nanotechnology] | 4 | capstone | `materials` |
| `che-elective-advanced-control` | [THEME: Advanced Process Control] | 4 | capstone | `control`, `process-design` |

---

### CpE — Computer Engineering (14 courses + elective slots)

| id | title | year | stage | topic clusters |
|---|---|---|---|---|
| `discrete-mathematics` | Discrete Mathematics | 1-2 | foundation | `mathematics`, `computing` |
| `programming-i` | Programming I (C / C++) | 1-2 | foundation | `computing` |
| `digital-logic-cpe` | Digital Logic Design | 2 | major-entry | `digital-logic` |
| `circuit-analysis-cpe-i` | Circuit Analysis I | 2 | major-entry | `circuits` |
| `circuit-analysis-cpe-ii` | Circuit Analysis II | 2 | major-entry | `circuits` |
| `data-structures-algorithms` | Data Structures and Algorithms | 2 | major-entry | `computing` |
| `computer-org-arch-i` | Computer Organization and Architecture I | 2 | major-entry | `computing` |
| `computer-arch-ii` | Computer Architecture II | 2-3 | major-core | `computing` |
| `embedded-systems-cpe` | Embedded Systems Design | 2-3 | major-core | `embedded`, `computing` |
| `operating-systems` | Operating Systems | 3 | intermediate | `computing` |
| `hdl-fpga` | HDL and FPGA Design | 3 | intermediate | `digital-logic`, `vlsi` |
| `vlsi-cpe` | VLSI Design | 3 | intermediate | `vlsi`, `digital-logic` |
| `computer-networks` | Computer Networks | 3 | intermediate | `computing`, `communications` |
| `hardware-security` | Hardware Security | 3 | intermediate | `computing`, `safety` |
| `compilers` | Compilers (Intro) | 3 | intermediate | `computing` |
| `cpe-capstone` | Senior Capstone — CpE System Design | 4 | capstone | `design`, `embedded` |
| `cpe-elective-parallel` | [THEME: Parallel & Distributed Computing] | 4 | capstone | `computing` |
| `cpe-elective-reconfigurable` | [THEME: Reconfigurable Computing] | 4 | capstone | `vlsi`, `computing` |
| `cpe-elective-soc` | [THEME: SoC Design] | 4 | capstone | `vlsi`, `embedded` |
| `cpe-elective-ml-hw` | [THEME: Machine Learning Hardware] | 4 | capstone | `vlsi`, `computation` |
| `cpe-elective-iot` | [THEME: IoT Systems] | 4 | capstone | `embedded`, `communications` |
| `cpe-elective-rtos` | [THEME: Real-Time Systems] | 4 | capstone | `embedded`, `computing` |
| `cpe-elective-quantum` | [THEME: Quantum Computing Intro] | 4 | capstone | `computing`, `physics` |
| `cpe-elective-cps` | [THEME: Cyber-Physical Systems] | 4 | capstone | `control`, `embedded` |

---

### AE — Aerospace Engineering (14 courses + elective slots)

| id | title | year | stage | topic clusters |
|---|---|---|---|---|
| `intro-aerospace` | Introduction to Aerospace Engineering | 2 | major-entry | `aerodynamics`, `design` |
| `aerospace-materials` | Aerospace Materials | 2 | major-entry | `materials` |
| `incompressible-aero` | Incompressible Aerodynamics | 2-3 | major-core | `aerodynamics`, `fluids` |
| `compressible-aero` | Compressible Aerodynamics (Gas Dynamics) | 2-3 | major-core | `aerodynamics`, `thermodynamics` |
| `aerostructures-i` | Aerostructures I — Aerospace Structural Analysis | 3 | intermediate | `structures`, `solid-mechanics` |
| `aerostructures-ii` | Aerostructures II — FEM for Structures | 3 | intermediate | `structures`, `computation` |
| `propulsion-i` | Propulsion I — Airbreathing Engines | 3 | intermediate | `propulsion`, `thermodynamics` |
| `propulsion-ii` | Propulsion II — Rocket Propulsion | 3 | intermediate | `propulsion` |
| `flight-mechanics-i` | Flight Mechanics I — Performance and Stability | 3 | intermediate | `flight-mechanics`, `aerodynamics` |
| `flight-mechanics-ii` | Flight Mechanics II — Flight Dynamics and Control | 3 | intermediate | `flight-mechanics`, `control` |
| `orbital-mechanics` | Orbital Mechanics | 3 | intermediate | `orbital-mechanics`, `mechanics` |
| `ae-capstone` | Aircraft / Spacecraft Design (Capstone) | 4 | capstone | `design`, `aerodynamics` |
| `ae-elective-cfd` | [THEME: Computational Aerodynamics / CFD] | 4 | capstone | `aerodynamics`, `computation` |
| `ae-elective-rotorcraft` | [THEME: Rotorcraft] | 4 | capstone | `aerodynamics` |
| `ae-elective-hypersonics` | [THEME: Hypersonics] | 4 | capstone | `aerodynamics`, `thermodynamics` |
| `ae-elective-spacecraft` | [THEME: Spacecraft Systems] | 4 | capstone | `orbital-mechanics`, `control` |
| `ae-elective-uav` | [THEME: UAV/Autonomous Systems] | 4 | capstone | `control`, `embedded` |
| `ae-elective-structural-opt` | [THEME: Structural Optimization] | 4 | capstone | `structures`, `computation` |
| `ae-elective-advanced-prop` | [THEME: Advanced Propulsion] | 4 | capstone | `propulsion` |
| `ae-elective-mission-design` | [THEME: Space Mission Design] | 4 | capstone | `orbital-mechanics` |

---

### BME — Biomedical Engineering (13 courses + elective slots)

| id | title | year | stage | topic clusters |
|---|---|---|---|---|
| `biology-for-engineers` | Biology for Engineers I | 1-2 | foundation | `physiology` |
| `intro-bme` | Introduction to Biomedical Engineering | 2 | major-entry | `design`, `safety` |
| `physiology-for-engineers` | Physiology for Engineers | 2 | major-entry | `physiology` |
| `biomechanics-i` | Biomechanics I — Solid Mechanics in Biology | 2 | major-entry | `biomechanics`, `solid-mechanics` |
| `bioinstrumentation` | Bioinstrumentation | 2-3 | major-core | `bioinstrumentation`, `circuits` |
| `biosignals-imaging` | Biosignals and Medical Imaging | 2-3 | major-core | `medical-imaging`, `signals`, `bioinstrumentation` |
| `biomaterials` | Biomaterials | 2-3 | major-core | `biomaterials`, `materials` |
| `biomechanics-ii` | Biomechanics II — Fluid and Dynamic Biomechanics | 2-3 | major-core | `biomechanics`, `fluids` |
| `tissue-engineering` | Tissue Engineering and Regenerative Medicine | 3 | intermediate | `biomaterials`, `physiology` |
| `neural-engineering` | Neural Engineering | 3 | intermediate | `bioinstrumentation`, `physiology` |
| `bme-design-regulatory` | BME Design and Regulatory Affairs | 3 | intermediate | `design`, `safety` |
| `bme-capstone` | Senior Capstone — Medical Device Design | 4 | capstone | `design`, `biomaterials` |
| `bme-elective-drug-delivery` | [THEME: Drug Delivery Systems] | 4 | capstone | `biomaterials`, `chemistry` |
| `bme-elective-ortho` | [THEME: Orthopaedic Biomechanics] | 4 | capstone | `biomechanics` |
| `bme-elective-cardiovascular` | [THEME: Cardiovascular Devices] | 4 | capstone | `biomechanics`, `physiology` |
| `bme-elective-imaging` | [THEME: Medical Image Analysis] | 4 | capstone | `medical-imaging` |
| `bme-elective-wearable` | [THEME: Wearable and Digital Health] | 4 | capstone | `bioinstrumentation`, `embedded` |
| `bme-elective-bioinformatics` | [THEME: Bioinformatics] | 4 | capstone | `computation`, `physiology` |
| `bme-elective-rehab` | [THEME: Rehabilitation Engineering] | 4 | capstone | `biomechanics`, `control` |
| `bme-elective-clinical` | [THEME: Clinical Engineering] | 4 | capstone | `safety`, `design` |

---

### IE — Industrial Engineering (13 courses + elective slots)

| id | title | year | stage | topic clusters |
|---|---|---|---|---|
| `intro-ie` | Introduction to Industrial Engineering | 2 | major-entry | `systems`, `manufacturing` |
| `engineering-economy` | Engineering Economy | 2 | major-entry | `economics` |
| `stats-for-ie` | Probability and Statistics for IE | 2 | major-entry | `statistics-quality`, `mathematics` |
| `operations-research-i` | Operations Research I — Linear Programming | 2-3 | major-core | `operations-research` |
| `operations-research-ii` | Operations Research II — Integer Programming | 2-3 | major-core | `operations-research` |
| `stochastic-processes` | Stochastic Processes and Queuing Theory | 2-3 | major-core | `simulation`, `mathematics` |
| `manufacturing-systems` | Manufacturing Systems Engineering | 3 | intermediate | `manufacturing`, `systems` |
| `quality-engineering` | Quality Engineering | 3 | intermediate | `statistics-quality` |
| `ergonomics-human-factors` | Ergonomics and Human Factors Engineering | 3 | intermediate | `human-factors` |
| `systems-simulation` | Systems Simulation | 3 | intermediate | `simulation`, `operations-research` |
| `supply-chain-engineering` | Supply Chain Engineering | 3-4 | advanced | `supply-chain`, `operations-research` |
| `systems-engineering` | Systems Engineering | 3-4 | advanced | `systems` |
| `ie-capstone` | Senior Capstone — IE Systems Design Project | 4 | capstone | `design`, `systems` |
| `ie-elective-healthcare-ie` | [THEME: Healthcare Systems Engineering] | 4 | capstone | `systems`, `simulation` |
| `ie-elective-data-science` | [THEME: Data Science for IE] | 4 | capstone | `computation`, `statistics-quality` |
| `ie-elective-financial` | [THEME: Financial Engineering] | 4 | capstone | `economics`, `operations-research` |
| `ie-elective-lean-agile` | [THEME: Lean and Agile Systems] | 4 | capstone | `manufacturing`, `systems` |
| `ie-elective-humanitarian` | [THEME: Humanitarian Logistics] | 4 | capstone | `supply-chain` |
| `ie-elective-advanced-analytics` | [THEME: Advanced Analytics] | 4 | capstone | `operations-research`, `statistics-quality` |
| `ie-elective-project-mgmt` | [THEME: Project Management] | 4 | capstone | `economics`, `systems` |

---

### MatE — Materials Engineering (15 courses + elective slots)

| id | title | year | stage | topic clusters |
|---|---|---|---|---|
| `general-chemistry-mate` | General Chemistry I & II | 1-2 | foundation | `chemistry` |
| `intro-materials-science` | Introduction to Materials Science | 2 | major-entry | `materials` |
| `physical-chemistry-mate` | Physical Chemistry for Materials Engineers | 2 | major-entry | `chemistry`, `thermodynamics` |
| `thermo-phase-diagrams` | Thermodynamics and Phase Diagrams | 2-3 | major-core | `materials`, `thermodynamics` |
| `kinetics-phase-transform` | Kinetics of Phase Transformations | 2-3 | major-core | `materials` |
| `mechanical-behavior-materials` | Mechanical Behavior of Materials | 2-3 | major-core | `solid-mechanics`, `materials` |
| `characterization-i` | Materials Characterization I | 2-3 | major-core | `materials` |
| `metals-and-alloys` | Metals and Alloys | 3 | intermediate | `materials` |
| `ceramics-glasses` | Ceramics and Glasses | 3 | intermediate | `materials` |
| `polymers-soft-materials` | Polymers and Soft Materials | 3 | intermediate | `materials`, `chemistry` |
| `composite-materials` | Composite Materials | 3 | intermediate | `materials`, `solid-mechanics` |
| `characterization-ii` | Materials Characterization II — Advanced | 3-4 | advanced | `materials` |
| `electronic-materials` | Electronic Materials | 3-4 | advanced | `materials`, `electronics` |
| `corrosion-engineering` | Corrosion Engineering | 3-4 | advanced | `materials`, `chemistry` |
| `failure-analysis` | Failure Analysis and Design | 3-4 | advanced | `materials`, `solid-mechanics` |
| `mate-capstone` | Senior Capstone — Materials Design Project | 4 | capstone | `design`, `materials` |
| `mate-elective-nano` | [THEME: Nanomaterials] | 4 | capstone | `materials` |
| `mate-elective-am` | [THEME: Additive Manufacturing of Materials] | 4 | capstone | `manufacturing`, `materials` |
| `mate-elective-biomaterials` | [THEME: Biomaterials Engineering] | 4 | capstone | `biomaterials` |
| `mate-elective-thin-films` | [THEME: Thin Films and Coatings] | 4 | capstone | `materials`, `manufacturing` |
| `mate-elective-computational` | [THEME: Computational Materials Science] | 4 | capstone | `computation`, `materials` |
| `mate-elective-energy-materials` | [THEME: Energy Materials] | 4 | capstone | `materials`, `power` |
| `mate-elective-smart-materials` | [THEME: Smart and Functional Materials] | 4 | capstone | `materials`, `control` |

---

### Course Count Summary

| Major | Core courses | Elective slots | Total records |
|---|---|---|---|
| CORE | 16 | 0 | 16 |
| EE | 16 | 8 | 24 |
| ME | 12 | 8 | 20 |
| CE | 13 | 7 | 20 |
| ChE | 14 | 7 | 21 |
| CpE | 15 | 8 | 23 |
| AE | 12 | 8 | 20 |
| BME | 13 | 8 | 21 |
| IE | 13 | 7 | 20 |
| MatE | 16 | 7 | 23 |
| **Total** | **140** | **68** | **208** |

---

## 4. Concept Normalization Rules

### Rule 1 — Promote to Standalone Concept

Promote a concept bullet to a `Concept` record when **any two** of these are true:
- Appears in 2+ courses across the same or different majors
- Has a precise, teachable definition (not just a course activity)
- Could be meaningfully cross-linked to a tool
- Is a named theorem, law, method, or physical principle

**Examples of standalone concepts:**
`Ohm's law`, `Laplace transform`, `Fourier transform`, `Newton's laws`, `Bernoulli equation`, `Mohr's circle`, `Hooke's law`, `PID control`, `Z-transform`, `Thévenin's theorem`, `Kirchhoff's laws`, `Bode plot`, `Shannon capacity`, `Fick's law`, `Beer-Lambert law`, `Darcy's law`

---

### Rule 2 — Keep as Course Bullet

Keep as a simple `skills[]` or inline note when:
- It is course-specific process knowledge (e.g. "Nastran/Abaqus workflow")
- It is a lab procedure (e.g. "Gage R&R measurement")
- It is a software skill (e.g. "Aspen Plus simulation")
- It is an institutional/code reference (e.g. "ACI 318 code application")

---

### Rule 3 — Concept Record Schema

```
id:               string      slug, globally unique
name:             string      canonical display name
aliases:          string[]    alternate names / abbreviations
shortDef:         string      ≤ 100 chars, one sentence
extendedDef:      string      2–5 sentences, mathematical context welcome
equation:         string|null LaTeX string if concept has a core equation
topicClusters:    string[]    cluster ids
majorTags:        string[]    which majors use this concept
taughtIn:         string[]    course ids where this concept appears
toolLinks:        string[]    tool ids that demonstrate this concept
relatedConcepts:  string[]    concept ids (bidirectional)
isFoundational:   boolean     true = appears in Core Engineering
```

---

### Rule 4 — Deduplication Across Majors

Problem: "Fourier transform" appears in Signals & Systems (EE), DSP (EE), Biosignals (BME), Flight Dynamics (AE), and Mechanical Vibrations (ME).

Solution:
- One canonical `Concept` record: `fourier-transform`
- Each course lists `"fourier-transform"` in its `concepts[]` array
- The concept record's `taughtIn[]` aggregates all course references
- `majorTags[]` reflects all majors where it appears: `["ee", "bme", "ae", "me"]`
- **Never duplicate the definition** — only reference by ID

Deduplication process:
1. Extract all concept bullets from all courses into a raw list
2. Normalize names (lowercase, strip qualifiers like "intro to", "overview of")
3. Cluster by string similarity + manual review
4. Assign canonical id and merge duplicate entries
5. Back-populate `concepts[]` arrays in all affected courses

---

### Rule 5 — Tagging Strategy

Every concept gets:
- `topicClusters[]`: 1–3 cluster ids from §2
- `majorTags[]`: which majors reference it (auto-generated from `taughtIn[]`)
- `isFoundational`: true if `taughtIn` includes any Core Engineering course

---

### Priority Concepts to Author First (high cross-major frequency)

| concept id | name | appears in |
|---|---|---|
| `laplace-transform` | Laplace Transform | CORE, EE, ME, ChE, AE |
| `fourier-transform` | Fourier Transform | EE, ME, AE, BME |
| `newtons-laws` | Newton's Laws | CORE, ME, AE, BME |
| `ohms-law` | Ohm's Law | EE, CpE, BME |
| `kirchhoffs-laws` | Kirchhoff's Laws (KVL/KCL) | EE, CpE, BME |
| `pid-control` | PID Control | EE, ME, AE, ChE, BME |
| `bode-plot` | Bode Plot | EE, ME, AE, ChE |
| `bernoulli-equation` | Bernoulli Equation | ME, CE, AE, ChE |
| `transfer-function` | Transfer Function | EE, ME, AE, ChE |
| `stress-strain` | Stress and Strain | CORE, ME, CE, AE, MatE, BME |
| `hookes-law` | Hooke's Law | CORE, ME, CE, AE, MatE |
| `mohr-circle` | Mohr's Circle | CORE, ME, CE, AE |
| `ficks-law` | Fick's Law | ChE, MatE, BME |
| `darcys-law` | Darcy's Law | CE, ChE |
| `maxwells-equations` | Maxwell's Equations | CORE (EE), AE |
| `z-transform` | Z-Transform | EE |
| `root-locus` | Root Locus | EE, ME, AE |
| `moody-chart` | Moody Chart / Friction Factor | ME, CE, ChE |
| `carnot-cycle` | Carnot Cycle | CORE, ME, AE, ChE |
| `eulers-method` | Euler's Method | CORE, ME, ChE, AE |

---

## 5. Dependency Graph Design

### Edge Types

```
type PrereqEdge = {
  from: courseId        // prerequisite
  to:   courseId        // course being taken
  type: "prerequisite" | "corequisite" | "recommended"
  crossMajor: boolean   // true if from and to are in different majors
  note?: string         // e.g. "or equivalent"
}
```

---

### Intra-Major Prerequisite Chains

**Core Engineering (canonical chain):**
```
calculus-i → calculus-ii → calculus-iii
calculus-i → physics-i
calculus-i → engineering-statistics
calculus-i → linear-algebra
calculus-ii → differential-equations
calculus-ii → physics-ii
physics-i → statics
physics-i → thermodynamics-i
statics → dynamics
statics → mechanics-of-materials
differential-equations → numerical-methods
intro-engineering → engineering-design-i
intro-engineering → engineering-ethics
```

**Electrical Engineering chain:**
```
physics-ii → circuit-analysis-i
circuit-analysis-i → circuit-analysis-ii
circuit-analysis-i → electronics-i
circuit-analysis-ii → signals-and-systems
differential-equations → circuit-analysis-ii
differential-equations → signals-and-systems
linear-algebra → signals-and-systems
calculus-iii → electromagnetics
physics-ii → electromagnetics
electronics-i → electronics-ii
electronics-ii → vlsi-i
digital-logic-design → vlsi-i
signals-and-systems → control-systems-ee
signals-and-systems → digital-signal-processing
signals-and-systems → communications-systems
engineering-statistics → probability-random-processes
signals-and-systems → probability-random-processes
probability-random-processes → communications-systems
circuit-analysis-ii → power-systems-i
digital-logic-design → embedded-systems
```

**Mechanical Engineering chain:**
```
thermodynamics-i → fluid-mechanics-me
thermodynamics-i → thermodynamics-ii
fluid-mechanics-me → heat-transfer-me
fluid-mechanics-me → cfd-intro
mechanics-of-materials → machine-design
dynamics → machine-design
dynamics → mechanical-vibrations
mechanics-of-materials → fea-i
linear-algebra → fea-i
numerical-methods → fea-i
machine-design → mechatronics
```

**Civil Engineering chain:**
```
statics → structural-analysis-i
mechanics-of-materials → structural-analysis-i
structural-analysis-i → structural-analysis-ii
structural-analysis-i → reinforced-concrete-design
structural-analysis-i → steel-structure-design
mechanics-of-materials → soil-mechanics
soil-mechanics → foundation-engineering
fluid-mechanics-ce → hydrology
```

**Chemical Engineering chain:**
```
general-chemistry → material-energy-balances
material-energy-balances → che-thermodynamics-i
material-energy-balances → fluid-mechanics-che
fluid-mechanics-che → heat-transfer-che
heat-transfer-che → mass-transfer-i
mass-transfer-i → separation-processes
material-energy-balances → chemical-reaction-engineering
che-thermodynamics-i → chemical-reaction-engineering
differential-equations → chemical-reaction-engineering
che-thermodynamics-i → separation-processes
differential-equations → process-control
linear-algebra → process-control
```

**Computer Engineering chain:**
```
discrete-mathematics → data-structures-algorithms
programming-i → data-structures-algorithms
digital-logic-cpe → computer-org-arch-i
circuit-analysis-cpe-i → circuit-analysis-cpe-ii
computer-org-arch-i → computer-arch-ii
computer-org-arch-i → operating-systems
data-structures-algorithms → operating-systems
digital-logic-cpe → hdl-fpga
electronics-ii → vlsi-cpe (cross-ref EE)
hdl-fpga → vlsi-cpe
```

**Aerospace Engineering chain:**
```
fluid-mechanics-me → incompressible-aero (cross-ref ME)
incompressible-aero → compressible-aero
thermodynamics-i → compressible-aero
mechanics-of-materials → aerostructures-i
aerostructures-i → aerostructures-ii
compressible-aero → propulsion-i
thermodynamics-i → propulsion-i
propulsion-i → propulsion-ii
incompressible-aero → flight-mechanics-i
dynamics → flight-mechanics-i
flight-mechanics-i → flight-mechanics-ii
control-systems-ee → flight-mechanics-ii (cross-ref EE)
dynamics → orbital-mechanics
```

---

### Cross-Major Shared Foundation Edges

These are edges where a Core Engineering course feeds into a specialization's first courses.

```
// Generated from Cross-Major Foundation Reference table
core → ee:   calculus-i, calculus-ii, calculus-iii, diff-eq, physics-i, physics-ii, linear-algebra, stats
core → me:   calculus-i, calculus-ii, calculus-iii, diff-eq, physics-i, stats, statics, dynamics, mom, thermo-i
core → ce:   calculus-i, calculus-ii, calculus-iii, diff-eq, physics-i, stats, statics, dynamics, mom
core → che:  calculus-i, calculus-ii, calculus-iii, diff-eq, physics-i, linear-algebra, stats
core → cpe:  calculus-i, calculus-ii, diff-eq, physics-i, physics-ii, linear-algebra, stats
core → ae:   calculus-i, calculus-ii, calculus-iii, diff-eq, physics-i, physics-ii, linear-algebra, stats, statics, dynamics, mom, thermo-i
core → bme:  calculus-i, calculus-ii, calculus-iii, diff-eq, physics-i, physics-ii, linear-algebra, stats, statics, mom
core → ie:   calculus-i, calculus-ii, diff-eq, physics-i, linear-algebra, stats
core → mate: calculus-i, calculus-ii, calculus-iii, diff-eq, physics-i, physics-ii, stats, mom
```

---

### Concept Cluster Relationships

```
type ClusterEdge = {
  from: clusterId
  to:   clusterId
  relation: "enables" | "overlaps" | "applied-in"
}
```

Key cluster relationships:
```
mathematics → enables → circuits
mathematics → enables → signals
mathematics → enables → control
mathematics → enables → solid-mechanics
mathematics → enables → thermodynamics
physics → enables → circuits
physics → enables → mechanics
physics → enables → fluids
circuits → enables → electronics
circuits → enables → signals
signals → enables → control
signals → enables → dsp
signals → enables → communications
electronics → enables → vlsi
electronics → enables → embedded
digital-logic → enables → computing
digital-logic → enables → vlsi
control → applied-in → flight-mechanics
control → applied-in → process-design
mechanics → enables → solid-mechanics
mechanics → enables → aerodynamics
solid-mechanics → applied-in → structures
solid-mechanics → applied-in → machine-design
thermodynamics → enables → heat-transfer
thermodynamics → enables → propulsion
fluids → enables → heat-transfer
fluids → enables → aerodynamics
fluids → applied-in → water
chemistry → enables → reaction-engineering
chemistry → enables → separations
materials → overlaps → solid-mechanics
materials → overlaps → chemistry
```

---

## 6. Tool Linking Logic

### Tool Record Links

Every tool has these relationship fields:
```
majorIds:        string[]     which major pages feature this tool
courseIds:       string[]     which course detail pages link to it
conceptIds:      string[]     which concept pages link to it
clusterIds:      string[]     which topic cluster filters include it
```

---

### Linking Rules

**Rule 1 — Direct course link:**
Tool covers the primary calculation or visualization method of a course.
Example: `bode-plot-generator` → `control-systems-ee`, `signals-and-systems`

**Rule 2 — Supporting course link:**
Tool covers a concept that is a component of a course, not the whole course.
Example: `fourier-series-visualizer` → `signals-and-systems` (primary), `mechanical-vibrations` (supporting)

**Rule 3 — Major link:**
Tool is relevant to a major if it links to ≥1 course in that major.
Auto-generated: `majorIds = unique(majorId for each course in courseIds)`

**Rule 4 — Concept link:**
Tool links to every concept it demonstrates.
Example: `rlc-circuit-visualizer` links to `transfer-function`, `resonance`, `impedance`, `bode-plot`

**Rule 5 — Cluster link:**
Tool links to the cluster of each of its linked courses.
Auto-generated from `courseIds → topicClusters → unique cluster set`

---

### Tool → Course → Concept Link Map (MVP tools)

| tool id | courseIds | conceptIds | clusterIds |
|---|---|---|---|
| `unit-converter` | *(all intro courses)* | `unit-analysis` | all |
| `ohms-law-calculator` | `circuit-analysis-i` | `ohms-law`, `kirchhoffs-laws`, `dc-power` | `circuits` |
| `rlc-response-visualizer` | `circuit-analysis-ii`, `signals-and-systems` | `transfer-function`, `resonance`, `impedance`, `step-response` | `circuits`, `signals` |
| `resistor-color-code` | `circuit-analysis-i` | `resistance`, `tolerance` | `circuits` |
| `phasor-ac-calculator` | `circuit-analysis-ii` | `phasors`, `impedance`, `power-factor`, `ac-power` | `circuits` |
| `bode-plot-generator` | `control-systems-ee`, `signals-and-systems`, `circuit-analysis-ii` | `bode-plot`, `transfer-function`, `frequency-response` | `signals`, `control` |
| `logic-gate-simulator` | `digital-logic-design`, `digital-logic-cpe` | `boolean-algebra`, `logic-gates`, `truth-table`, `fsm` | `digital-logic` |
| `opamp-configurator` | `electronics-ii`, `bioinstrumentation` | `op-amp`, `feedback`, `gain`, `inverting-amplifier` | `electronics` |
| `fourier-series-visualizer` | `signals-and-systems`, `digital-signal-processing`, `mechanical-vibrations`, `biosignals-imaging` | `fourier-transform`, `fourier-series`, `harmonics`, `aliasing` | `signals`, `dsp` |

---

### Display Rules

- Course detail page → shows **tool cards** for all directly linked tools (Rule 1 + 2)
- Major overview page → shows a **Tools** section with tools where `majorIds` includes that major
- Tool page → shows **"Used in"** section with course links and concept chips
- Concept page → shows **"Explore with tools"** section
- Labs hub → filterable by cluster, major, complexity, category

---

## 7. Elective Handling

### Storage Model

Elective courses are stored as normal `Course` records with:
```
isElective: true
electiveTheme: string        // e.g. "Power Electronics"
electiveTag:   string        // raw tag from source: "[THEME: Power Electronics]"
status: "planned"            // all electives start as planned
topicClusters: string[]      // inherited from theme descriptor
shortDesc: string            // auto-generated from theme description in source doc
```

### ID Convention

`{majorId}-elective-{kebab-theme}`

Examples:
- `ee-elective-power-electronics`
- `me-elective-robotics`
- `ae-elective-spacecraft`

---

### Display Behavior

| Context | Treatment |
|---|---|
| Major overview page | Shown in "Year 4 — Electives" section with dashed card style |
| Curriculum grid | Visible as greyed/tagged tiles; not hidden |
| Course detail page | Shows stub layout: theme name, topic tags, summary sentence, "Full content coming soon" |
| Search results | Included but labeled with `[Elective · Planned]` badge |
| Prerequisite graph | Not shown as nodes in the dependency graph |

### Stub Page Content (V1)

```
title:         electiveTheme
description:   1–2 sentences from source doc topic list
topics:        bullet list from source doc
status badge:  "Content Planned"
topicClusters: shown as filter tags
majorLink:     link back to parent major
relatedTools:  if any tool links to this cluster, show them
```

---

### V2 Promotion Path

When an elective gets full content:
1. Set `status: "live"`
2. Add full `concepts[]`, `prereqs[]`, `leadsInto[]`, `skills[]`
3. Optionally add or link specific tools
4. Update `shortDesc` and add `whyItMatters`
5. Remove stub/planned UI treatment automatically (driven by `status` field)

---

## 8. Output Recommendation — File / Data Organization

### Recommended Filesystem Structure

```
/data
  /majors
    core.json
    electrical-engineering.json
    mechanical-engineering.json
    civil-engineering.json
    chemical-engineering.json
    computer-engineering.json
    aerospace-engineering.json
    biomedical-engineering.json
    industrial-engineering.json
    materials-engineering.json

  /courses
    /core
      calculus-i.json
      calculus-ii.json
      ... (16 files)
    /electrical-engineering
      circuit-analysis-i.json
      ... (24 files)
    /mechanical-engineering
      ... (20 files)
    ... (one folder per major)

  /concepts
    concepts.json              ← single flat file, ~200-400 records
    # OR split by cluster:
    /mathematics/
    /circuits/
    /signals/
    ... etc.

  /tools
    tools.json                 ← single flat file, ~12 records in V1
    # Grows to per-tool files in V2

  /graph
    prerequisites.json         ← all PrereqEdge records
    cluster-relationships.json ← ClusterEdge records
    tool-links.json            ← tool ↔ course ↔ concept mappings

  /taxonomy
    topic-clusters.json        ← cluster definitions
    stages.json                ← stage registry
    majors-index.json          ← lightweight list for nav/filtering
```

---

### File Format per Type

**`majors/{id}.json`** — one per major
```json
{
  "id": "electrical-engineering",
  "name": "Electrical Engineering",
  "shortName": "EE",
  "description": "...",
  "mainSubfields": [...],
  "coreFoundationIds": ["calculus-i", "physics-ii", ...],
  "conceptClusters": ["circuits", "electronics", "signals", ...],
  "summaryChain": "...",
  "depthV1": "full",
  "colorToken": "--color-ee",
  "stages": [
    { "id": "major-entry", "label": "Year 2 — EE Core Entry", "courseIds": [...] },
    ...
  ]
}
```

**`courses/{major}/{id}.json`** — one per course
```json
{
  "id": "circuit-analysis-i",
  "title": "Circuit Analysis I",
  "majorId": "electrical-engineering",
  "isCore": false,
  "stageId": "major-entry",
  "year": "2",
  "shortDesc": "DC circuit analysis using fundamental laws and network theorems",
  "whyItMatters": "Starting point for all EE specializations",
  "prereqs": ["physics-ii"],
  "leadsInto": ["circuit-analysis-ii", "electronics-i"],
  "skills": ["node/mesh analysis", "Thevenin/Norton equivalents", "power calculations"],
  "topicClusters": ["circuits"],
  "concepts": ["ohms-law", "kirchhoffs-laws", "thevenins-theorem", "nortons-theorem", "dc-power"],
  "relatedTools": ["ohms-law-calculator", "resistor-color-code"],
  "isElective": false,
  "electiveTheme": null,
  "status": "live"
}
```

**`concepts/concepts.json`** — flat array
```json
[
  {
    "id": "ohms-law",
    "name": "Ohm's Law",
    "aliases": ["V = IR"],
    "shortDef": "Voltage across a resistor equals current times resistance.",
    "equation": "V = IR",
    "topicClusters": ["circuits"],
    "majorTags": ["ee", "cpe", "bme"],
    "taughtIn": ["circuit-analysis-i", "bioinstrumentation"],
    "toolLinks": ["ohms-law-calculator"],
    "relatedConcepts": ["kirchhoffs-laws", "dc-power", "resistance"],
    "isFoundational": false
  },
  ...
]
```

**`graph/prerequisites.json`** — flat edge array
```json
[
  { "from": "physics-ii", "to": "circuit-analysis-i", "type": "prerequisite", "crossMajor": false },
  { "from": "circuit-analysis-i", "to": "circuit-analysis-ii", "type": "prerequisite", "crossMajor": false },
  ...
]
```

**`tools/tools.json`** — flat array
```json
[
  {
    "id": "bode-plot-generator",
    "name": "Bode Plot Generator",
    "category": "visualizer",
    "description": "...",
    "majorIds": ["electrical-engineering", "mechanical-engineering", "aerospace-engineering"],
    "courseIds": ["control-systems-ee", "signals-and-systems", "circuit-analysis-ii"],
    "conceptIds": ["bode-plot", "transfer-function", "frequency-response"],
    "clusterIds": ["signals", "control"],
    "complexityEstimate": "medium",
    "status": "live",
    "routePath": "/labs/bode-plot-generator"
  },
  ...
]
```

---

### Key Design Decisions

| Decision | Choice | Reason |
|---|---|---|
| Course granularity | One JSON file per course | Easy to edit individually; good for git diff |
| Concepts storage | Single flat file (split by cluster in V2) | Simple to query; small enough in V1 |
| Cross-references | Always by ID, never embed | No duplication; consistent updates |
| Electives in same schema | Yes, `isElective: true` flag | Same query patterns; single component handles both |
| Core courses location | `/courses/core/` folder | Treated as a major for routing and data consistency |
| Graph data | Separate file from course data | Graph can be rebuilt from courses without touching course files |
| Tool data | Separate from curriculum data | Tools evolve independently from curriculum content |
| Major index | Separate lightweight `majors-index.json` | Loaded once for nav; full major JSON loaded per page |

---

### Validation Rules (enforce at build time)

1. Every `prereqs[]` id resolves to a known course id
2. Every `leadsInto[]` id resolves to a known course id or is a string (external/future course)
3. Every `concepts[]` id resolves to a known concept id
4. Every `relatedTools[]` id resolves to a known tool id
5. Every `topicClusters[]` id resolves to a known cluster id
6. Every concept's `taughtIn[]` is consistent with the course's `concepts[]` (bidirectional check)
7. Every tool's `courseIds[]` is consistent with the course's `relatedTools[]` (bidirectional check)
8. No course id is duplicated across majors (all ids must be globally unique)
9. Every elective has `isElective: true` and non-null `electiveTheme`
10. Every capstone course has `stageId: "capstone"`
