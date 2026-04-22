# Engineering Atlas — Curriculum Blueprint
> Format: Curriculum Map + Course Concept Map
> Purpose: Website data source / JSON conversion target
> Version: 1.0

---

# 1. Core Engineering

## Overview

* **Description:** Foundational engineering principles shared across all disciplines. Serves as the common base layer for all specialized majors.
* **Main subfields:** Engineering mathematics, physics, mechanics, thermodynamics, engineering design, ethics
* **Shared foundation dependencies:** None — this IS the foundation

## Curriculum

### Year 1 — Foundations

#### Calculus I
* **Description:** Limits, derivatives, and integrals of single-variable functions
* **Why it matters:** Language of all quantitative engineering analysis
* **Prerequisites:** Pre-calculus / high school math
* **Leads into:** Calculus II, Physics I, Statics
* **Skills:** Differentiation, integration, limit analysis
* **Concepts:**
  * Limits and continuity
  * Derivative rules (chain, product, quotient)
  * Riemann sums and definite integrals
  * Fundamental theorem of calculus
  * Applications: optimization, rates of change

#### Calculus II
* **Description:** Integration techniques, series, and introductory multivariable concepts
* **Why it matters:** Required for differential equations, electromagnetism, fluid mechanics
* **Prerequisites:** Calculus I
* **Leads into:** Calculus III, Differential Equations
* **Skills:** Advanced integration, series convergence analysis
* **Concepts:**
  * Integration by parts, trig substitution, partial fractions
  * Sequences and series
  * Taylor and Maclaurin series
  * Polar coordinates
  * Parametric equations

#### Physics I — Mechanics
* **Description:** Classical Newtonian mechanics: kinematics, dynamics, energy, momentum
* **Why it matters:** Physical basis for statics, dynamics, structural analysis
* **Prerequisites:** Calculus I (co-req)
* **Leads into:** Physics II, Statics, Dynamics
* **Skills:** Free body diagrams, energy conservation, problem modeling
* **Concepts:**
  * Kinematics in 1D and 2D
  * Newton's laws
  * Work, energy, power
  * Linear and angular momentum
  * Rotational dynamics

#### Introduction to Engineering
* **Description:** Survey of engineering disciplines, design process, and professional ethics
* **Why it matters:** Orients students to engineering identity and practice
* **Prerequisites:** None
* **Leads into:** All Year 1–2 courses
* **Skills:** Engineering design process, team communication, basic CAD
* **Concepts:**
  * Engineering disciplines overview
  * Design process (define → ideate → prototype → test)
  * Engineering ethics and professional responsibility
  * Unit analysis and estimation
  * Technical communication basics

---

### Year 1–2 — Core Sciences

#### Calculus III — Multivariable Calculus
* **Description:** Partial derivatives, multiple integrals, vector calculus
* **Why it matters:** Essential for fluid mechanics, heat transfer, electromagnetism
* **Prerequisites:** Calculus II
* **Leads into:** Differential Equations, Engineering Physics II
* **Skills:** Gradient computation, surface/volume integrals, vector fields
* **Concepts:**
  * Partial derivatives and gradients
  * Double and triple integrals
  * Line and surface integrals
  * Green's, Stokes', and Divergence theorems
  * Coordinate systems (cylindrical, spherical)

#### Differential Equations
* **Description:** Ordinary differential equations (ODEs) and introduction to PDEs
* **Why it matters:** Models virtually every dynamic engineering system
* **Prerequisites:** Calculus II
* **Leads into:** Control Systems, Heat Transfer, Circuits, Structural Analysis
* **Skills:** Solving ODEs, Laplace transforms, system modeling
* **Concepts:**
  * First-order ODEs (separable, linear, exact)
  * Second-order linear ODEs
  * Laplace transform methods
  * Systems of ODEs
  * Intro to PDEs (wave, heat, Laplace equations)

#### Physics II — Electromagnetism
* **Description:** Electric fields, magnetic fields, circuits, waves
* **Why it matters:** Basis for electrical engineering, electronics, photonics
* **Prerequisites:** Calculus II, Physics I
* **Leads into:** Circuits, Electromagnetics, Optics
* **Skills:** Field analysis, circuit analysis fundamentals
* **Concepts:**
  * Coulomb's law, electric field and potential
  * Gauss's law
  * Magnetic force and fields
  * Faraday's law, inductance
  * Maxwell's equations (qualitative)
  * Electromagnetic waves

#### Linear Algebra
* **Description:** Vectors, matrices, linear systems, eigenvalues
* **Why it matters:** Core tool for FEA, control systems, data science, circuits
* **Prerequisites:** Calculus I
* **Leads into:** Numerical Methods, Control Systems, Structural FEA, Signal Processing
* **Skills:** Matrix operations, eigenvector analysis, system solving
* **Concepts:**
  * Vector spaces and subspaces
  * Matrix operations and inverses
  * Determinants
  * Eigenvalues and eigenvectors
  * Linear transformations
  * Least squares approximation

#### Engineering Statistics & Probability
* **Description:** Probability theory, statistical inference, reliability analysis
* **Why it matters:** Required for quality control, reliability engineering, experimental design
* **Prerequisites:** Calculus I
* **Leads into:** Quality Engineering, Reliability, Machine Learning, Design of Experiments
* **Skills:** Hypothesis testing, regression, probability modeling
* **Concepts:**
  * Probability axioms and distributions
  * Random variables (discrete and continuous)
  * Normal, exponential, Poisson distributions
  * Confidence intervals, hypothesis testing
  * Regression analysis
  * Reliability and failure rate

---

### Year 2 — Engineering Core

#### Statics
* **Description:** Equilibrium of rigid bodies under forces and moments
* **Why it matters:** Prerequisite for nearly all structural and mechanical analysis
* **Prerequisites:** Physics I, Calculus I
* **Leads into:** Mechanics of Materials, Dynamics, Structural Analysis
* **Skills:** Free body diagrams, equilibrium equations, truss analysis
* **Concepts:**
  * Force vectors and resultants
  * Equilibrium conditions (2D and 3D)
  * Truss and frame analysis
  * Distributed loads
  * Centroids and moments of inertia
  * Friction

#### Dynamics
* **Description:** Motion of particles and rigid bodies under forces
* **Why it matters:** Foundation for mechanical system design, robotics, vibrations
* **Prerequisites:** Statics, Calculus II
* **Leads into:** Vibrations, Machine Design, Robotics
* **Skills:** Kinematic and kinetic analysis, energy methods
* **Concepts:**
  * Kinematics of particles (rectilinear, curvilinear)
  * Newton-Euler equations for rigid bodies
  * Work-energy and impulse-momentum methods
  * Relative motion and rotating frames
  * Intro to vibrations

#### Mechanics of Materials
* **Description:** Stress, strain, deformation in solid bodies under load
* **Why it matters:** Core to structural, mechanical, aerospace, and civil design
* **Prerequisites:** Statics
* **Leads into:** Machine Design, Structural Analysis, FEA
* **Skills:** Stress analysis, beam deflection, failure prediction
* **Concepts:**
  * Normal and shear stress/strain
  * Hooke's law, material properties
  * Axial, torsion, bending, and transverse shear
  * Beam deflection (integration, moment-area)
  * Stress transformations, Mohr's circle
  * Failure theories (von Mises, Tresca)

#### Thermodynamics I
* **Description:** Laws of thermodynamics, energy, entropy, thermodynamic systems
* **Why it matters:** Foundation for heat transfer, energy systems, chemical processes
* **Prerequisites:** Physics I, Calculus II
* **Leads into:** Heat Transfer, Thermodynamics II, Fluid Mechanics
* **Skills:** Energy balance, cycle analysis, entropy calculation
* **Concepts:**
  * First law: energy conservation
  * Second law: entropy and irreversibility
  * Properties of pure substances (steam tables, ideal gas)
  * Thermodynamic cycles (Rankine, Brayton, Carnot)
  * Exergy analysis

#### Engineering Design I
* **Description:** Structured design process, requirements engineering, concept generation
* **Why it matters:** Develops the core professional practice of engineering
* **Prerequisites:** Introduction to Engineering
* **Leads into:** Capstone, senior design projects
* **Skills:** Problem scoping, ideation methods, prototyping, design documentation
* **Concepts:**
  * Customer needs and functional requirements
  * Quality Function Deployment (QFD) basics
  * Morphological charts, SCAMPER, brainstorming
  * Concept selection (Pugh matrix)
  * Prototyping strategies
  * Design reviews and iteration

---

### Year 3 — Applied Core

#### Numerical Methods for Engineers
* **Description:** Computational techniques for solving engineering problems
* **Why it matters:** Real-world engineering systems rarely have closed-form solutions
* **Prerequisites:** Differential Equations, Linear Algebra, programming familiarity
* **Leads into:** Simulation, FEA, CFD, optimization
* **Skills:** Algorithm implementation, error analysis, matrix solvers
* **Concepts:**
  * Root finding (bisection, Newton-Raphson)
  * Numerical integration (trapezoidal, Gaussian)
  * Numerical ODEs (Euler, Runge-Kutta)
  * Linear system solvers (LU decomposition, iterative)
  * Curve fitting and interpolation
  * Finite difference basics

#### Engineering Ethics and Professionalism
* **Description:** Ethical frameworks, codes of conduct, professional responsibility
* **Why it matters:** Engineers make decisions affecting public safety and welfare
* **Prerequisites:** Introduction to Engineering
* **Leads into:** Capstone, professional practice
* **Skills:** Ethical reasoning, case analysis, stakeholder consideration
* **Concepts:**
  * NSPE and disciplinary codes of ethics
  * Whistleblowing and professional duty
  * Risk assessment and public safety
  * Sustainability and environmental responsibility
  * Intellectual property
  * Case studies: Challenger, Tacoma Narrows, etc.

---

## Summary

* **Main dependency chain:** Calculus I → Calculus II → Calc III / Diff Eq → Physics I → Physics II → Statics → Dynamics / Mechanics of Materials → Thermodynamics → Numerical Methods → Specialized Courses
* **Main concept clusters:** Mathematics, Classical Mechanics, Electromagnetism, Thermodynamics, Design Process, Statistics, Computation
* **Best simulator/tool opportunities:** MATLAB (numerical methods), FEA intro tools (Abaqus lite), Physics simulations (PhET), CAD intro (Fusion 360), Python notebooks

---

---

# 2. Electrical Engineering

## Overview

* **Description:** Study of electricity, electronics, electromagnetism, and signal systems. Spans from quantum-scale devices to grid-scale power systems.
* **Main subfields:** Circuit theory, electronics, signal processing, control systems, power systems, electromagnetics, communications, VLSI, embedded systems
* **Shared foundation dependencies:** Calculus I–III, Differential Equations, Linear Algebra, Physics II, Engineering Statistics

## Curriculum

### Year 1–2 — Foundation (shared with Core Engineering)

> See Core Engineering: Calculus I–III, Differential Equations, Physics I–II, Linear Algebra, Statistics, Statics

---

### Year 2 — EE Core Entry

#### Circuit Analysis I
* **Description:** DC circuit analysis using fundamental laws and network theorems
* **Why it matters:** Starting point for all EE specializations
* **Prerequisites:** Physics II
* **Leads into:** Circuit Analysis II, Electronics I
* **Skills:** Node/mesh analysis, Thevenin/Norton equivalents, power calculations
* **Concepts:**
  * Ohm's law, KVL, KCL
  * Resistive network analysis (node voltage, mesh current)
  * Superposition, Thevenin's, Norton's theorems
  * DC power and energy
  * Intro to capacitors and inductors

#### Circuit Analysis II
* **Description:** AC circuits, frequency response, phasors, and power
* **Why it matters:** Foundation for power systems, RF design, signal analysis
* **Prerequisites:** Circuit Analysis I, Differential Equations
* **Leads into:** Electronics I, Signals & Systems, Power Electronics
* **Skills:** Phasor analysis, impedance, frequency response, power factor
* **Concepts:**
  * Phasors and sinusoidal steady state
  * Impedance and admittance
  * Resonance (series and parallel)
  * AC power (real, reactive, apparent)
  * Transfer functions and Bode plots (intro)
  * Two-port networks

#### Programming for Engineers (Python/MATLAB)
* **Description:** Scripting, data manipulation, simulation, and visualization
* **Why it matters:** Modern EE work requires computational fluency
* **Prerequisites:** None (or Calculus I co-req)
* **Leads into:** Digital Signal Processing, Embedded Systems, Control Systems
* **Skills:** Scripting, array operations, plotting, basic algorithms
* **Concepts:**
  * Data types, control flow, functions
  * NumPy/array operations
  * Plotting and visualization
  * File I/O
  * Basic simulation loops
  * Intro to object-oriented concepts

---

### Year 2–3 — Core EE

#### Electronics I — Diodes and BJTs
* **Description:** Semiconductor devices: diodes, bipolar junction transistors, biasing, amplifiers
* **Why it matters:** Basis for analog circuit design and device understanding
* **Prerequisites:** Circuit Analysis I, Physics II
* **Leads into:** Electronics II, VLSI, RF Circuits
* **Skills:** Load line analysis, small-signal modeling, amplifier design
* **Concepts:**
  * PN junction diode (I-V, models)
  * Diode circuits (rectifiers, clippers, voltage regulators)
  * BJT operation (active, saturation, cutoff)
  * BJT biasing (Q-point)
  * Small-signal model and amplifier analysis
  * Common-emitter, common-base, common-collector configs

#### Electronics II — MOSFETs and Op-Amps
* **Description:** MOSFET operation, operational amplifiers, and feedback
* **Why it matters:** MOSFETs dominate modern digital and analog ICs; op-amps are universal analog blocks
* **Prerequisites:** Electronics I
* **Leads into:** VLSI Design, Analog IC Design, Control Systems
* **Skills:** MOSFET biasing, op-amp circuit design, feedback analysis
* **Concepts:**
  * MOSFET structure, I-V characteristics, biasing
  * CMOS inverter basics
  * Ideal and real op-amp models
  * Inverting/non-inverting amplifiers, integrators, differentiators
  * Feedback theory (negative and positive)
  * Comparators and oscillators

#### Digital Logic Design
* **Description:** Boolean algebra, combinational and sequential digital circuits
* **Why it matters:** Basis for computer hardware, embedded systems, FPGA design
* **Prerequisites:** Circuit Analysis I, any programming course
* **Leads into:** Computer Architecture, VLSI, Embedded Systems, HDL
* **Skills:** Logic minimization, FSM design, hardware description
* **Concepts:**
  * Boolean algebra, De Morgan's laws
  * Combinational logic (mux, decoder, adder, comparator)
  * Karnaugh maps and minimization
  * Sequential logic (latches, flip-flops)
  * Finite state machines (Mealy and Moore)
  * Timing analysis and hazards

#### Signals and Systems
* **Description:** Continuous- and discrete-time signal analysis, convolution, transforms
* **Why it matters:** Fundamental framework for communications, DSP, and control
* **Prerequisites:** Differential Equations, Circuit Analysis II, Linear Algebra
* **Leads into:** Digital Signal Processing, Communications, Control Systems
* **Skills:** Fourier/Laplace analysis, system classification, convolution
* **Concepts:**
  * Signal classification (periodic, energy, power)
  * LTI systems, impulse response, convolution
  * Fourier series and Fourier transform
  * Laplace transform and transfer functions
  * Z-transform (intro)
  * Sampling theorem and aliasing

#### Electromagnetics
* **Description:** Maxwell's equations in full, wave propagation, transmission lines
* **Why it matters:** Essential for antenna design, RF, optical fiber, and PCB signal integrity
* **Prerequisites:** Calculus III, Physics II
* **Leads into:** RF/Microwave Engineering, Antenna Design, Photonics
* **Skills:** Field computation, wave analysis, transmission line design
* **Concepts:**
  * Review of Maxwell's equations (differential form)
  * Boundary conditions
  * Plane wave propagation
  * Reflection and transmission at interfaces
  * Transmission line theory (telegrapher equations, reflection, VSWR)
  * Waveguides (intro)

---

### Year 3 — Intermediate EE

#### Control Systems
* **Description:** Feedback control theory, stability, and design for dynamic systems
* **Why it matters:** Powers automation, robotics, aerospace, power regulation
* **Prerequisites:** Differential Equations, Signals & Systems, Laplace transforms
* **Leads into:** Advanced Control, Robotics, Power Electronics
* **Skills:** Root locus, Bode plots, PID design, stability analysis
* **Concepts:**
  * Open-loop vs. closed-loop systems
  * Transfer functions and block diagrams
  * Routh-Hurwitz stability criterion
  * Root locus method
  * Frequency response (Bode, Nyquist)
  * PID controller design and tuning

#### Digital Signal Processing
* **Description:** Discrete-time signals, DFT/FFT, FIR/IIR filter design
* **Why it matters:** Underpins audio, imaging, communications, and biomedical signal analysis
* **Prerequisites:** Signals & Systems, Linear Algebra
* **Leads into:** Communications, Image Processing, Audio Engineering, Machine Learning
* **Skills:** Filter design, FFT implementation, spectrum analysis
* **Concepts:**
  * Discrete-time Fourier transform (DTFT)
  * DFT and FFT algorithm
  * FIR and IIR filter design
  * Z-transform analysis
  * Windowing techniques
  * Quantization and finite word-length effects

#### Microelectronics and VLSI I
* **Description:** CMOS fabrication, layout, and digital IC design
* **Why it matters:** Semiconductor industry foundation; chip design literacy
* **Prerequisites:** Electronics II, Digital Logic Design
* **Leads into:** VLSI II, IC Design, Embedded Systems
* **Skills:** CMOS layout, timing analysis, logic synthesis basics
* **Concepts:**
  * CMOS fabrication process overview
  * CMOS gate design (NAND, NOR, complex gates)
  * Static and dynamic power dissipation
  * Propagation delay and logical effort
  * Stick diagrams and layout design rules
  * Standard cell design

#### Probability and Random Processes
* **Description:** Stochastic processes, noise modeling, and statistical communication theory
* **Why it matters:** Required for communications, wireless systems, and reliability
* **Prerequisites:** Engineering Statistics, Signals & Systems
* **Leads into:** Communications, Wireless Systems, Information Theory
* **Skills:** Stochastic analysis, noise characterization, detection theory
* **Concepts:**
  * Random variables and distributions (review)
  * Jointly distributed variables
  * Stationary random processes
  * Power spectral density
  * Gaussian noise models
  * Detection and estimation (intro)

---

### Year 3–4 — Advanced EE

#### Power Systems I
* **Description:** Electric power generation, transmission, distribution, and basic grid analysis
* **Why it matters:** Foundation for power engineering and energy transition careers
* **Prerequisites:** Circuit Analysis II
* **Leads into:** Power Electronics, Smart Grid, Energy Systems
* **Skills:** Power flow analysis, fault calculations, transformer modeling
* **Concepts:**
  * Three-phase power systems
  * Per-unit system
  * Transformer models
  * Transmission line models
  * Power flow (load flow) analysis
  * Symmetrical and unsymmetrical faults (intro)

#### Communications Systems
* **Description:** Modulation, demodulation, channel capacity, and digital communications
* **Why it matters:** Foundation for wireless, optical, and satellite communication
* **Prerequisites:** Signals & Systems, Probability & Random Processes
* **Leads into:** Wireless Communications, Information Theory, RF Engineering
* **Skills:** Modulation scheme design, SNR analysis, bandwidth estimation
* **Concepts:**
  * AM, FM, PM modulation (analog)
  * ASK, FSK, PSK, QAM (digital)
  * Noise performance and BER
  * Shannon capacity theorem
  * Matched filters and detection
  * Multiplexing (TDM, FDM, CDMA basics)

#### Embedded Systems
* **Description:** Microcontroller programming, interfacing, real-time systems, and hardware/software co-design
* **Why it matters:** Modern devices from medical implants to cars run on embedded systems
* **Prerequisites:** Digital Logic Design, any programming course
* **Leads into:** IoT, RTOS, VLSI, Robotics
* **Skills:** Low-level C programming, peripheral interfacing, real-time programming
* **Concepts:**
  * Microcontroller architecture (ARM Cortex-M)
  * GPIO, UART, SPI, I2C protocols
  * Interrupt handling and timers
  * ADC/DAC interfacing
  * Real-time operating system (RTOS) concepts
  * Power management and optimization

---

### Year 4 — Capstone + Electives

#### Senior Capstone — EE Design Project
* **Description:** Yearlong team project from specification through implementation and testing
* **Why it matters:** Integrates all EE competencies in a realistic engineering context
* **Prerequisites:** Completion of EE core
* **Leads into:** Professional practice
* **Skills:** Project management, systems integration, documentation, presentation
* **Concepts:**
  * Requirements and specification documents
  * System architecture design
  * PCB design and fabrication
  * Hardware-software integration
  * Testing and verification
  * Technical reporting and presentation

#### Technical Elective Slots (Year 4)
> Choose 3–4 from available themes:
* `[THEME: Power Electronics]` — DC-DC converters, inverters, motor drives
* `[THEME: RF & Microwave]` — S-parameters, filters, amplifier design
* `[THEME: Photonics & Optics]` — Lasers, waveguides, optical communications
* `[THEME: VLSI II / IC Design]` — Analog IC, mixed-signal, layout verification
* `[THEME: Wireless & 5G]` — OFDM, MIMO, network protocols
* `[THEME: Machine Learning for EE]` — Neural nets, regression, sensor fusion
* `[THEME: Bioelectronics]` — Biosensors, neural interfaces, medical devices
* `[THEME: Robotics & Mechatronics]` — Actuators, sensors, embedded control

---

## Summary

* **Main dependency chain:** Calculus → Physics II → Circuit Analysis I → Circuit Analysis II → Electronics I → Electronics II / Digital Logic / Signals & Systems → Control Systems / DSP / VLSI / Communications → Capstone
* **Main concept clusters:** Circuit Theory, Semiconductor Devices, Digital Logic, Signal Analysis, Electromagnetic Fields, Control & Feedback, Communications, Power Systems, Embedded Computing
* **Best simulator/tool opportunities:** LTspice (circuits), Multisim (circuits), MATLAB/Simulink (control, DSP), Cadence Virtuoso (IC design), Xilinx Vivado (FPGA), Python (DSP, ML), KiCad (PCB), GNU Radio (communications)

---

---

# 3. Mechanical Engineering

## Overview

* **Description:** Design, analysis, and manufacture of mechanical systems. Spans from microscale MEMS to large turbomachinery and aerospace structures.
* **Main subfields:** Solid mechanics, dynamics, thermodynamics, fluid mechanics, heat transfer, manufacturing, mechatronics, vibrations, machine design
* **Shared foundation dependencies:** Calculus I–III, Differential Equations, Linear Algebra, Physics I–II, Statistics, Statics, Dynamics, Mechanics of Materials, Thermodynamics I

## Curriculum

### Year 1–2 — Foundation (shared with Core Engineering)

> See Core Engineering: Full Year 1–2 curriculum + Statics, Dynamics, Mechanics of Materials, Thermodynamics I

---

### Year 2–3 — ME Core

#### Fluid Mechanics
* **Description:** Properties of fluids, fluid statics and dynamics, internal and external flows
* **Why it matters:** Foundation for HVAC, turbomachinery, aerodynamics, hydraulics
* **Prerequisites:** Thermodynamics I, Calculus III, Differential Equations
* **Leads into:** Heat Transfer, Turbomachinery, Aerodynamics, CFD
* **Skills:** Flow analysis, pipe design, drag/lift estimation
* **Concepts:**
  * Fluid properties (viscosity, density, compressibility)
  * Fluid statics and manometry
  * Bernoulli equation and applications
  * Conservation of mass, momentum, energy (control volume)
  * Internal pipe flow (laminar, turbulent, Moody chart)
  * External flow: boundary layers, drag, lift (intro)
  * Dimensional analysis and Buckingham Pi

#### Heat Transfer
* **Description:** Conduction, convection, and radiation heat transfer analysis
* **Why it matters:** Critical for electronics cooling, energy systems, automotive, aerospace
* **Prerequisites:** Thermodynamics I, Fluid Mechanics, Differential Equations
* **Leads into:** HVAC Design, Thermal Systems Design, CFD
* **Skills:** Heat transfer calculations, fin analysis, heat exchanger sizing
* **Concepts:**
  * Fourier's law, thermal resistance networks
  * Transient conduction (lumped capacitance, Biot number)
  * Convection correlations (internal and external)
  * Natural convection
  * Radiation (blackbody, view factors, gray surfaces)
  * Heat exchanger design (LMTD, NTU methods)

#### Thermodynamics II — Power and Refrigeration Cycles
* **Description:** Advanced thermodynamic cycles, mixtures, combustion, refrigeration
* **Why it matters:** Underpins energy conversion, HVAC, and propulsion systems
* **Prerequisites:** Thermodynamics I
* **Leads into:** Gas Turbines, Internal Combustion Engines, Refrigeration Design
* **Skills:** Cycle performance analysis, combustion calculations, exergy analysis
* **Concepts:**
  * Rankine cycle variations (reheat, regeneration)
  * Brayton cycle and gas turbine performance
  * Internal combustion engine cycles (Otto, Diesel)
  * Refrigeration and heat pump cycles
  * Psychrometrics and air-water mixtures
  * Combustion stoichiometry and adiabatic flame temperature

#### Materials Science for Engineers
* **Description:** Atomic structure, crystal defects, phase diagrams, material properties
* **Why it matters:** Material selection is central to every mechanical design decision
* **Prerequisites:** Chemistry, Physics I
* **Leads into:** Manufacturing Processes, Machine Design, Materials Engineering electives
* **Skills:** Phase diagram reading, material selection, failure analysis
* **Concepts:**
  * Atomic bonding and crystal structures
  * Dislocations and plastic deformation
  * Strengthening mechanisms
  * Phase diagrams and heat treatment
  * Mechanical properties: tensile, fatigue, fracture
  * Intro to polymers, ceramics, composites

#### Manufacturing Processes
* **Description:** Casting, forming, machining, welding, and additive manufacturing
* **Why it matters:** Designs must be manufacturable; process choice affects cost, quality, and properties
* **Prerequisites:** Materials Science, Mechanics of Materials
* **Leads into:** Machine Design, Industrial Engineering electives, Product Design
* **Skills:** Process selection, tolerance analysis, DFM
* **Concepts:**
  * Casting (sand, die, investment)
  * Metal forming (rolling, forging, extrusion, drawing)
  * Machining (turning, milling, drilling) and cutting mechanics
  * Welding processes and joint design
  * Additive manufacturing (FDM, SLA, SLS, DMLS)
  * Tolerances, fits, and GD&T basics

---

### Year 3 — Intermediate ME

#### Machine Design
* **Description:** Design of mechanical components: shafts, gears, bearings, fasteners, springs
* **Why it matters:** The core professional course for designing real mechanical systems
* **Prerequisites:** Mechanics of Materials, Dynamics, Materials Science, Statistics
* **Leads into:** Mechatronics, Senior Design, Robotics
* **Skills:** Fatigue analysis, gear train design, bearing selection
* **Concepts:**
  * Static failure theories (Distortion energy, Coulomb-Mohr)
  * Fatigue failure (S-N curve, Miner's rule, stress concentration)
  * Shaft design under combined loading
  * Spur, helical, bevel, and worm gear design
  * Rolling-element bearing selection and life
  * Fastener and power screw analysis
  * Spring design (compression, torsion, extension)

#### Mechanical Vibrations
* **Description:** Free and forced vibration of mechanical systems, resonance, damping
* **Why it matters:** Vibration causes fatigue failures; isolation and control are engineering challenges
* **Prerequisites:** Dynamics, Differential Equations
* **Leads into:** Structural Dynamics, Noise & Vibration Control, Rotating Machinery
* **Skills:** Natural frequency calculation, frequency response analysis, modal analysis
* **Concepts:**
  * Single-DOF free vibration (undamped, damped)
  * Logarithmic decrement
  * Harmonic excitation and frequency response
  * Rotating imbalance and transmissibility
  * Two-DOF systems and beat phenomenon
  * Intro to multi-DOF and modal superposition

#### Control Systems for Mechanical Engineers
* **Description:** Feedback control applied to mechanical and thermal systems
* **Why it matters:** Modern mechanical systems are controlled systems (robots, vehicles, HVAC)
* **Prerequisites:** Differential Equations, Dynamics, Signals & Systems (or equiv)
* **Leads into:** Mechatronics, Robotics, Autonomous Vehicles
* **Skills:** PID tuning, root locus, block diagram reduction
* **Concepts:**
  * Mathematical modeling of mechanical and thermal systems
  * Transfer functions and block diagrams
  * Stability criteria
  * PID control design
  * Root locus and frequency response
  * State-space representation (intro)

#### Finite Element Analysis (FEA) I
* **Description:** Introduction to FEM theory, meshing, and structural simulation
* **Why it matters:** Industry-standard tool for design validation without physical prototyping
* **Prerequisites:** Mechanics of Materials, Linear Algebra, Numerical Methods
* **Leads into:** Advanced FEA, CFD, Structural Optimization
* **Skills:** Model building, mesh quality assessment, results interpretation
* **Concepts:**
  * Direct stiffness method
  * 1D bar and beam elements
  * 2D plane stress/strain elements
  * Meshing strategies and convergence
  * Boundary conditions and loading
  * Results interpretation (stress, deformation, safety factor)

---

### Year 3–4 — Advanced ME

#### Mechatronics
* **Description:** Integration of mechanical, electrical, and computing systems
* **Why it matters:** Modern products are mechatronic; bridges hardware and software design
* **Prerequisites:** Machine Design, Circuits (basics), Control Systems
* **Leads into:** Robotics, Automotive Engineering, Medical Devices
* **Skills:** Sensor/actuator selection, embedded control, system integration
* **Concepts:**
  * Sensors: encoders, accelerometers, force/pressure sensors
  * Actuators: DC motors, stepper motors, pneumatics, hydraulics
  * Motor drive circuits (H-bridge)
  * Microcontroller interfacing
  * PID implementation in hardware
  * System integration and testing

#### Computational Fluid Dynamics (CFD) — Intro
* **Description:** Numerical solution of Navier-Stokes equations; CFD workflow
* **Why it matters:** CFD replaces costly physical testing in aerodynamics, HVAC, and combustion
* **Prerequisites:** Fluid Mechanics, Numerical Methods, some programming
* **Leads into:** Aerodynamics, Turbomachinery, Advanced CFD
* **Skills:** CFD mesh generation, solver setup, post-processing, validation
* **Concepts:**
  * Navier-Stokes equations overview
  * Finite difference and finite volume methods
  * Boundary conditions in CFD
  * Turbulence models (k-ε, k-ω, intro)
  * Grid independence studies
  * Simulation validation and uncertainty

---

### Year 4 — Capstone + Electives

#### Senior Capstone — ME Design Project
* **Description:** Full design cycle from requirements through prototype fabrication and testing
* **Why it matters:** Integrates all ME competencies in a real engineering project
* **Prerequisites:** Completion of ME core
* **Leads into:** Professional practice
* **Skills:** Design synthesis, manufacturing, testing, project management, teamwork
* **Concepts:**
  * Concurrent engineering
  * Design for manufacturing and assembly (DFMA)
  * Prototype fabrication
  * Experimental testing and data analysis
  * Engineering documentation (drawings, BOM, reports)
  * Oral and written engineering communication

#### Technical Elective Slots (Year 4)
> Choose 3–4 from available themes:
* `[THEME: Robotics]` — Kinematics, dynamics, path planning
* `[THEME: Aerospace Systems]` — Aerodynamics, propulsion, aerostructures
* `[THEME: Automotive Engineering]` — Powertrains, vehicle dynamics, NVH
* `[THEME: HVAC & Building Systems]` — Psychrometrics, load calculations, duct design
* `[THEME: Tribology]` — Friction, wear, lubrication, surface engineering
* `[THEME: Advanced Manufacturing]` — CNC, metrology, smart manufacturing
* `[THEME: Sustainable Energy]` — Wind, solar, fuel cell systems
* `[THEME: Biomechanics]` — Orthopaedic mechanics, gait analysis, implant design

---

## Summary

* **Main dependency chain:** Calculus → Physics I → Statics → Dynamics / Mechanics of Materials → Thermodynamics I → Fluid Mechanics / Heat Transfer / Thermo II → Machine Design / FEA / Vibrations / Control → Mechatronics / CFD → Capstone
* **Main concept clusters:** Solid Mechanics, Thermofluids, Materials, Manufacturing, Machine Components, Dynamics & Vibrations, Control, Computation
* **Best simulator/tool opportunities:** ANSYS/Abaqus (FEA), SolidWorks/Fusion 360 (CAD), ANSYS Fluent/OpenFOAM (CFD), MATLAB/Simulink (control, vibrations), Python (numerical methods), Creo (machine design)

---

# 4. Civil Engineering

## Overview

* **Description:** Design, construction, and maintenance of the built environment — infrastructure, structures, water systems, transportation, and geotechnics.
* **Main subfields:** Structural engineering, geotechnical engineering, transportation, hydraulics/hydrology, environmental engineering, construction management, surveying
* **Shared foundation dependencies:** Calculus I–III, Differential Equations, Physics I, Statistics, Statics, Dynamics, Mechanics of Materials

## Curriculum

### Year 1–2 — Foundation (shared with Core Engineering)

> See Core Engineering: Calculus I–III, Differential Equations, Physics I, Statistics, Statics, Dynamics, Mechanics of Materials

---

### Year 2–3 — CE Core Entry

#### Civil Engineering Materials
* **Description:** Properties and testing of concrete, steel, asphalt, wood, and composites in civil applications
* **Why it matters:** Material choice drives cost, durability, and structural performance
* **Prerequisites:** Mechanics of Materials, Chemistry
* **Leads into:** Structural Analysis, Pavement Design, Construction Management
* **Skills:** Materials testing, mix design, specification writing
* **Concepts:**
  * Concrete mix design and curing
  * Steel grades and properties
  * Asphalt and pavement materials
  * Wood and engineered timber
  * Non-destructive testing methods
  * Durability and deterioration mechanisms

#### Surveying and Geomatics
* **Description:** Measurement, mapping, and spatial data collection for civil projects
* **Why it matters:** All civil design begins with accurate site data
* **Prerequisites:** Trigonometry, Calculus I
* **Leads into:** Transportation Engineering, Site Design, GIS applications
* **Skills:** Total station operation, GPS use, traverse calculations, leveling
* **Concepts:**
  * Horizontal and vertical measurements
  * Traverse surveys and adjustment
  * Differential and trigonometric leveling
  * GPS/GNSS positioning
  * Topographic maps and contour interpretation
  * Intro to GIS and remote sensing

#### Fluid Mechanics (Civil Focus)
* **Description:** Fluid statics, pipe flow, open channel flow, and hydraulic structures
* **Why it matters:** Foundation for water supply, stormwater, irrigation, and drainage design
* **Prerequisites:** Calculus III, Physics I, Differential Equations
* **Leads into:** Hydrology, Water Resources, Environmental Engineering
* **Skills:** Pipe network analysis, open channel flow, hydraulic structure design
* **Concepts:**
  * Fluid properties and statics
  * Bernoulli equation and energy grade line
  * Pipe flow: Darcy-Weisbach, Moody chart, minor losses
  * Pipe networks (Hardy-Cross method)
  * Open channel flow: Manning's equation, specific energy
  * Weirs, culverts, and spillways

---

### Year 2–3 — Structural Track

#### Structural Analysis I
* **Description:** Analysis of statically determinate structures: beams, trusses, frames
* **Why it matters:** Foundation for structural engineering and building design
* **Prerequisites:** Statics, Mechanics of Materials
* **Leads into:** Structural Analysis II, Reinforced Concrete Design, Steel Design
* **Skills:** Influence lines, truss methods, deflection calculations
* **Concepts:**
  * Statical determinacy and stability
  * Method of sections and joints (trusses)
  * Shear and moment diagrams
  * Influence lines for beams and trusses
  * Deflections (conjugate beam, moment area)
  * Intro to cables and arches

#### Structural Analysis II — Indeterminate Structures
* **Description:** Force method, slope-deflection, moment distribution, and matrix stiffness
* **Why it matters:** Most real structures are statically indeterminate
* **Prerequisites:** Structural Analysis I
* **Leads into:** Reinforced Concrete Design, Steel Design, Advanced Structural Analysis
* **Skills:** Frame analysis, matrix methods, computer model validation
* **Concepts:**
  * Force (compatibility) method
  * Slope-deflection equations
  * Moment distribution method
  * Matrix stiffness method
  * Intro to finite element structural analysis
  * Lateral load analysis (intro)

#### Reinforced Concrete Design
* **Description:** ACI code-based design of beams, slabs, columns, and footings
* **Why it matters:** Reinforced concrete is the world's most widely used structural material
* **Prerequisites:** Structural Analysis I, Civil Engineering Materials
* **Leads into:** Advanced Concrete, Foundation Engineering, Building Codes
* **Skills:** Beam/slab design, load combinations, code application
* **Concepts:**
  * Concrete and rebar material properties
  * Strength design philosophy (LRFD)
  * Rectangular beam flexural design
  * Shear design (stirrups)
  * One-way and two-way slabs
  * Column design and interaction diagrams
  * Footing design

#### Steel Structure Design
* **Description:** AISC code-based design of steel beams, columns, and connections
* **Why it matters:** Steel frames dominate commercial and industrial structures
* **Prerequisites:** Structural Analysis I, Civil Engineering Materials
* **Leads into:** Advanced Steel, Seismic Design, Bridge Engineering
* **Skills:** Section selection, connection design, lateral system design
* **Concepts:**
  * Steel material properties and sections
  * Tension member design
  * Compression member design (buckling)
  * Beam flexure and lateral-torsional buckling
  * Combined loading (beam-column)
  * Bolted and welded connection design
  * Intro to moment frames and braced frames

---

### Year 3 — Geotechnical, Transportation & Environment

#### Soil Mechanics and Geotechnical Engineering
* **Description:** Soil classification, shear strength, consolidation, lateral earth pressure
* **Why it matters:** Every structure rests on soil; geotechnical failures cause catastrophic loss
* **Prerequisites:** Mechanics of Materials, Fluid Mechanics
* **Leads into:** Foundation Engineering, Slope Stability, Ground Improvement
* **Skills:** Soil testing, settlement prediction, bearing capacity analysis
* **Concepts:**
  * Soil composition and classification (USCS, AASHTO)
  * Compaction and proctor tests
  * Permeability and seepage
  * Effective stress and pore water pressure
  * Consolidation theory (Terzaghi)
  * Shear strength (Mohr-Coulomb, direct shear, triaxial)
  * Lateral earth pressure (Rankine, Coulomb)

#### Foundation Engineering
* **Description:** Design of shallow and deep foundations, retaining walls, and slope stability
* **Why it matters:** Foundation failure = structural failure; site conditions dictate system choice
* **Prerequisites:** Soil Mechanics
* **Leads into:** Geotechnical Design, Infrastructure Projects
* **Skills:** Bearing capacity calculation, pile design, settlement analysis
* **Concepts:**
  * Bearing capacity theory (Terzaghi, Meyerhof)
  * Shallow foundation settlement
  * Pile foundations (driven and drilled)
  * Retaining wall design (gravity, cantilever)
  * Slope stability (limit equilibrium)
  * Ground improvement methods (intro)

#### Transportation Engineering
* **Description:** Highway design, traffic flow theory, and transportation planning
* **Why it matters:** Transportation infrastructure connects economies and communities
* **Prerequisites:** Statistics, Calculus I
* **Leads into:** Traffic Operations, Highway Design, Transit Planning
* **Skills:** Traffic flow analysis, sight distance, level of service assessment
* **Concepts:**
  * Traffic flow: volume, speed, density, fundamental diagram
  * Level of service (LOS) analysis
  * Signalized intersection design and timing
  * Geometric design (horizontal and vertical alignment)
  * Sight distance requirements
  * Pavement design (AASHTO method)
  * Transportation demand modeling (intro)

#### Hydrology and Water Resources
* **Description:** Precipitation, runoff, watersheds, groundwater, and stormwater management
* **Why it matters:** Water infrastructure protects lives, enables agriculture, and manages flooding
* **Prerequisites:** Fluid Mechanics (Civil), Statistics
* **Leads into:** Stormwater Design, Water Supply, Environmental Engineering
* **Skills:** Hydrograph analysis, flood frequency analysis, stormwater modeling
* **Concepts:**
  * Hydrologic cycle and water balance
  * Rainfall-runoff relationships (curve number, rational method)
  * Unit hydrograph
  * Flood frequency analysis (return periods)
  * Stream routing (Muskingum method)
  * Groundwater flow (Darcy's law, aquifer equations)
  * Stormwater BMP design

#### Environmental Engineering I
* **Description:** Water and wastewater treatment processes, environmental regulations, contaminant transport
* **Why it matters:** Clean water and sanitation are fundamental civil engineering responsibilities
* **Prerequisites:** Fluid Mechanics, Chemistry, Statistics
* **Leads into:** Environmental Systems, Remediation, Air Quality
* **Skills:** Treatment process design, pollutant mass balances, regulatory compliance
* **Concepts:**
  * Water quality parameters (BOD, COD, DO, turbidity)
  * Drinking water treatment (coagulation, filtration, disinfection)
  * Wastewater treatment (primary, secondary, tertiary)
  * Biological treatment (activated sludge)
  * Reactor theory (CSTR, PFR)
  * Contaminant transport in water and soil

---

### Year 4 — Capstone + Electives

#### Senior Capstone — Civil Infrastructure Design
* **Description:** Team-based design of a civil infrastructure system (bridge, building, water system)
* **Why it matters:** Integration of all civil competencies with professional context
* **Prerequisites:** Completion of CE core
* **Leads into:** Professional practice, PE exam preparation
* **Skills:** Integrated design, plan set production, permitting, cost estimation, presentation
* **Concepts:**
  * Multi-discipline coordination (structural, geotech, environmental)
  * Engineering economics and cost estimating
  * Permitting and regulatory compliance
  * AutoCAD Civil 3D / Revit usage
  * Professional plan set preparation
  * Construction sequencing (intro)

#### Technical Elective Slots (Year 4)
> Choose 3–4 from available themes:
* `[THEME: Bridge Engineering]` — Bridge types, loads, design (AASHTO LRFD)
* `[THEME: Seismic Design]` — Earthquake engineering, ductile detailing
* `[THEME: Construction Management]` — Scheduling, cost control, contracts
* `[THEME: GIS & Remote Sensing]` — Spatial analysis, LiDAR, site mapping
* `[THEME: Sustainable Infrastructure]` — LEED, green stormwater, resilience
* `[THEME: Coastal & Offshore Engineering]` — Wave mechanics, beach nourishment
* `[THEME: Smart Cities]` — Sensors, IoT, urban data systems

---

## Summary

* **Main dependency chain:** Calculus → Physics I → Statics → Mechanics of Materials → Structural Analysis I → Structural Analysis II → RC Design / Steel Design → Capstone; Fluid Mechanics → Hydrology / Environmental Engineering; Soil Mechanics → Foundation Engineering
* **Main concept clusters:** Structural Analysis, Structural Design (RC & Steel), Geotechnics, Hydraulics & Hydrology, Transportation, Environmental Engineering, Surveying
* **Best simulator/tool opportunities:** SAP2000/RISA (structural analysis), AutoCAD Civil 3D (drafting/grading), SWMM (stormwater), HEC-RAS (hydraulics), GeoStudio (geotechnical), ArcGIS/QGIS (spatial), Revit (BIM)

---

---

# 5. Chemical Engineering

## Overview

* **Description:** Application of chemistry, physics, and biology to convert raw materials into useful products at industrial scale. Spans pharmaceuticals, energy, food, materials, and environmental applications.
* **Main subfields:** Transport phenomena, reaction engineering, thermodynamics, process design, process control, polymer science, biochemical engineering, process safety
* **Shared foundation dependencies:** Calculus I–III, Differential Equations, Linear Algebra, Physics I, General Chemistry I–II, Statistics, Thermodynamics I

## Curriculum

### Year 1–2 — Foundation

> See Core Engineering: Calculus I–III, Differential Equations, Physics I, Linear Algebra, Statistics

#### General Chemistry I & II
* **Description:** Atomic structure, bonding, stoichiometry, equilibria, electrochemistry, kinetics
* **Why it matters:** Chemical engineering is built on chemical principles
* **Prerequisites:** High school chemistry
* **Leads into:** Organic Chemistry, Physical Chemistry, Material Balances
* **Skills:** Stoichiometry, solution chemistry, kinetics calculations
* **Concepts:**
  * Atomic structure, periodic trends
  * Chemical bonding and molecular geometry
  * Stoichiometry and solution chemistry
  * Thermochemistry
  * Chemical equilibrium and Le Chatelier's principle
  * Acid-base equilibria, buffers
  * Electrochemistry

#### Organic Chemistry I (Survey)
* **Description:** Carbon chemistry, functional groups, reactions, and mechanisms
* **Why it matters:** Essential for pharmaceuticals, polymers, petrochemicals, and biomolecules
* **Prerequisites:** General Chemistry II
* **Leads into:** Biochemistry, Polymer Science, Pharmaceutical Engineering
* **Skills:** Reaction mechanism prediction, functional group identification
* **Concepts:**
  * Alkanes, alkenes, alkynes, aromatic compounds
  * Stereochemistry
  * Substitution, elimination, addition reactions
  * Carbonyl chemistry (aldehydes, ketones, carboxylic acids)
  * Amines and heterocycles (intro)
  * Introduction to polymers

---

### Year 2 — ChE Core Entry

#### Material and Energy Balances
* **Description:** Conservation of mass and energy applied to chemical processes
* **Why it matters:** The foundational quantitative tool of chemical engineering
* **Prerequisites:** General Chemistry II, Calculus I
* **Leads into:** Thermodynamics II (ChE), Transport Phenomena, Reactor Design
* **Skills:** Process flow diagram reading, stream balances, recycle calculations
* **Concepts:**
  * Process variables (T, P, composition, flow rate)
  * Steady-state and transient material balances
  * Systems with reaction (conversion, yield, selectivity)
  * Recycle, bypass, and purge streams
  * Energy balances (sensible heat, latent heat, heat of reaction)
  * Degrees of freedom analysis

#### Chemical Engineering Thermodynamics I
* **Description:** Phase equilibria, equations of state, fugacity, and thermodynamic property estimation
* **Why it matters:** Required for designing separations and understanding phase behavior
* **Prerequisites:** Material & Energy Balances, Physical Chemistry, Calculus III
* **Leads into:** Separation Processes, Reaction Engineering, Process Design
* **Skills:** Flash calculations, phase diagram interpretation, VLE analysis
* **Concepts:**
  * Review of thermodynamic laws
  * Equations of state (van der Waals, Peng-Robinson)
  * Fugacity and activity coefficients
  * Vapor-liquid equilibria (Raoult's law, modified Raoult)
  * Phase diagrams (binary and ternary)
  * Chemical reaction equilibrium

---

### Year 2–3 — Transport Phenomena

#### Fluid Mechanics (ChE Focus)
* **Description:** Fluid statics, viscous flow, pipe systems, and non-Newtonian fluids
* **Why it matters:** Fluid flow governs chemical reactor performance and pipeline design
* **Prerequisites:** Material & Energy Balances, Calculus III
* **Leads into:** Heat Transfer, Mass Transfer, Reactor Design
* **Skills:** Pump sizing, pressure drop calculations, flow regime identification
* **Concepts:**
  * Navier-Stokes equations (simplified cases)
  * Laminar and turbulent pipe flow
  * Friction factor and Moody chart
  * Pump curves and system curves
  * Non-Newtonian flow behavior
  * Packed beds and fluidized beds

#### Heat Transfer (ChE Focus)
* **Description:** Conduction, convection, radiation, and heat exchanger design
* **Why it matters:** Energy management is central to process economics and safety
* **Prerequisites:** Fluid Mechanics (ChE), Differential Equations
* **Leads into:** Mass Transfer, Process Design, Reactor Design
* **Skills:** Heat exchanger sizing, overall heat transfer coefficient, fouling analysis
* **Concepts:**
  * Conduction: Fourier's law, fins, transient
  * Convection correlations (forced, natural)
  * Shell-and-tube and plate heat exchangers
  * LMTD and NTU-effectiveness methods
  * Boiling and condensation
  * Radiation (view factors, intro)

#### Mass Transfer I
* **Description:** Diffusion, convective mass transfer, and stage-based separations
* **Why it matters:** Separation processes account for ~50% of capital costs in chemical plants
* **Prerequisites:** Heat Transfer (ChE), Differential Equations
* **Leads into:** Mass Transfer II, Separation Processes, Reactor Design
* **Skills:** Diffusivity estimation, mass transfer coefficient use, equilibrium stage calculations
* **Concepts:**
  * Fick's law and diffusion coefficients
  * Diffusion in stagnant film, equimolar counter-diffusion
  * Mass transfer coefficients (film theory)
  * Analogies (heat-mass transfer)
  * Stage-based operations: absorption, stripping (intro)
  * Binary distillation (McCabe-Thiele intro)

---

### Year 3 — Core ChE

#### Chemical Reaction Engineering
* **Description:** Design of chemical reactors: batch, CSTR, PFR; complex reactions; non-ideal flow
* **Why it matters:** Reactor design determines product yield, purity, and economic viability
* **Prerequisites:** Material & Energy Balances, ChE Thermodynamics I, Differential Equations
* **Leads into:** Catalysis, Biochemical Engineering, Process Design
* **Skills:** Reactor sizing, conversion-selectivity optimization, temperature profile design
* **Concepts:**
  * Rate laws and stoichiometry
  * Batch, CSTR, and PFR design equations
  * Multiple reactions (selectivity and yield)
  * Non-isothermal reactors (energy balance)
  * Reactor stability and multiplicity
  * Non-ideal flow (dispersion model, RTD)
  * Heterogeneous catalysis (Langmuir-Hinshelwood)

#### Separation Processes
* **Description:** Distillation, absorption, extraction, adsorption, and membrane separations
* **Why it matters:** Separations are the core unit operations of chemical processing
* **Prerequisites:** Mass Transfer I, ChE Thermodynamics I
* **Leads into:** Process Design, Pharmaceutical Engineering, Environmental Engineering
* **Skills:** Column design, McCabe-Thiele analysis, solvent selection
* **Concepts:**
  * Multicomponent distillation (shortcut methods)
  * Azeotropes and special distillation
  * Absorption and stripping column design
  * Liquid-liquid extraction
  * Adsorption and chromatography
  * Membrane separations (RO, UF, MF)

#### Process Control
* **Description:** Dynamic modeling, feedback and feedforward control, PLC programming
* **Why it matters:** Safe and efficient plant operation requires robust control systems
* **Prerequisites:** Differential Equations, Linear Algebra, Material & Energy Balances
* **Leads into:** Advanced Process Control, Process Safety, Plant Design
* **Skills:** Control loop tuning, process modeling, P&ID reading
* **Concepts:**
  * Process dynamics and transfer functions
  * Laplace transform methods
  * PID control and tuning methods (Ziegler-Nichols)
  * Feedback and feedforward control
  * Cascade and ratio control
  * Process Instrumentation and Control Diagrams (P&ID)
  * Intro to model predictive control (MPC)

#### Process Design and Economics I
* **Description:** Conceptual and detailed process design, cost estimation, economic analysis
* **Why it matters:** Bridges engineering and business: is this process worth building?
* **Prerequisites:** All core ChE courses
* **Leads into:** Senior Design Capstone, Plant Design II
* **Skills:** Aspen Plus simulation, cost estimation (APEA), profitability analysis
* **Concepts:**
  * Process flowsheet development
  * Equipment selection and sizing
  * Capital cost estimation (Lang factor, APEA)
  * Operating cost estimation
  * Profitability analysis (NPV, IRR, ROI)
  * Process simulation software (Aspen Plus, HYSYS)
  * Safety and regulatory considerations

---

### Year 3–4 — Advanced ChE

#### Process Safety
* **Description:** Hazard identification, risk analysis, and safety system design
* **Why it matters:** Chemical processes handle hazardous materials at scale — safety is paramount
* **Prerequisites:** All core ChE courses
* **Leads into:** Plant Design, Process Design II, Professional Practice
* **Skills:** HAZOP, fault tree analysis, relief system design
* **Concepts:**
  * Flammability and explosion limits
  * Toxic release and dispersion models
  * Layers of Protection Analysis (LOPA)
  * HAZOP study methodology
  * Relief valve and rupture disc sizing
  * Inherently safer design principles

#### Biochemical Engineering (Elective or Core)
* **Description:** Bioreactor design, enzyme kinetics, fermentation, bioseparations
* **Why it matters:** Biotechnology and pharma are major growth sectors for ChE
* **Prerequisites:** Reaction Engineering, Biology (survey)
* **Leads into:** Biomedical Engineering electives, Pharmaceutical Manufacturing
* **Skills:** Bioreactor sizing, cell growth modeling, bioseparation selection
* **Concepts:**
  * Microbial and enzyme kinetics
  * Bioreactor types (batch, fed-batch, continuous)
  * Oxygen and mass transfer in bioreactors
  * Sterilization methods
  * Downstream processing (centrifugation, chromatography)
  * Cell culture and fermentation

---

### Year 4 — Capstone + Electives

#### Senior Capstone — Chemical Plant Design
* **Description:** Team-based design of a complete chemical process from concept to preliminary design package
* **Why it matters:** Integrates all ChE competencies in an industry-relevant project
* **Prerequisites:** Process Design I, all core ChE
* **Leads into:** Professional practice
* **Skills:** Full flowsheet design, safety review, economic analysis, team engineering
* **Concepts:**
  * Basis of design document
  * PFD and P&ID development
  * Complete material and energy balances
  * Equipment design and specifications
  * Safety and environmental assessment
  * Capital and operating cost estimates
  * Executive summary presentation

#### Technical Elective Slots (Year 4)
> Choose 3–4 from available themes:
* `[THEME: Polymer Engineering]` — Polymer synthesis, rheology, processing
* `[THEME: Electrochemical Engineering]` — Batteries, fuel cells, electrolyzers
* `[THEME: Environmental ChE]` — Air pollution control, remediation, sustainability
* `[THEME: Petroleum & Gas Processing]` — Refinery operations, gas treatment
* `[THEME: Pharmaceutical Engineering]` — Drug delivery, GMP, scale-up
* `[THEME: Nanomaterials & Nanotechnology]` — Nanoparticle synthesis, characterization
* `[THEME: Advanced Process Control]` — MPC, optimization, real-time control

---

## Summary

* **Main dependency chain:** Chemistry → Material & Energy Balances → ChE Thermodynamics → Fluid Mechanics → Heat Transfer → Mass Transfer → Reaction Engineering / Separation Processes → Process Control / Process Design → Capstone
* **Main concept clusters:** Transport Phenomena, Thermodynamics & Equilibria, Reactor Design, Separation Operations, Process Design & Economics, Safety
* **Best simulator/tool opportunities:** Aspen Plus/HYSYS (process simulation), Python/MATLAB (numerical ODE solvers), CHEMCAD, SuperPro Designer (bioprocessing), PhET (chemistry visualization), Python/Pandas (data analysis)

---

---

# 6. Computer Engineering

## Overview

* **Description:** Bridges electrical engineering and computer science. Designs computing hardware, embedded systems, computer architecture, and hardware-software interfaces.
* **Main subfields:** Computer architecture, digital systems, embedded systems, VLSI, operating systems, computer networks, hardware security, reconfigurable computing
* **Shared foundation dependencies:** Calculus I–II, Differential Equations, Linear Algebra, Physics II, Circuit Analysis, Digital Logic Design, Statistics

## Curriculum

### Year 1–2 — Foundation

> See Core Engineering: Calculus I–II, Differential Equations, Physics I–II, Linear Algebra, Statistics

#### Discrete Mathematics
* **Description:** Logic, sets, graph theory, combinatorics, and proof techniques
* **Why it matters:** Formal basis for algorithm analysis, digital logic, and computer science theory
* **Prerequisites:** Calculus I (or concurrent)
* **Leads into:** Data Structures, Algorithms, Digital Logic, Theory of Computation
* **Skills:** Proof writing, graph analysis, combinatorial reasoning
* **Concepts:**
  * Propositional and predicate logic
  * Set theory and relations
  * Functions and bijections
  * Graph theory (trees, paths, connectivity)
  * Combinatorics and permutations
  * Mathematical induction and proof methods

#### Programming I (C / C++)
* **Description:** Systems programming fundamentals: types, control flow, pointers, memory management
* **Why it matters:** C/C++ is the standard for hardware-adjacent software
* **Prerequisites:** None
* **Leads into:** Data Structures, Embedded Systems, OS, Compilers
* **Skills:** Memory management, pointer arithmetic, structured programming
* **Concepts:**
  * Data types, arrays, structs
  * Pointers and references
  * Dynamic memory (malloc/free, new/delete)
  * File I/O
  * Functions and recursion
  * Intro to object-oriented concepts (C++)

---

### Year 2 — CE Core

#### Digital Logic Design
> See Electrical Engineering: Digital Logic Design (identical course)

#### Circuit Analysis I & II
> See Electrical Engineering: Circuit Analysis I & II

#### Data Structures and Algorithms
* **Description:** Core data structures and algorithm design/analysis
* **Why it matters:** Underpins all software engineering; required for OS, compilers, embedded systems
* **Prerequisites:** Programming I, Discrete Mathematics
* **Leads into:** Operating Systems, Compilers, Computer Architecture, Algorithms II
* **Skills:** Algorithm design, complexity analysis, data structure implementation
* **Concepts:**
  * Arrays, linked lists, stacks, queues
  * Trees (BST, AVL, heaps)
  * Hash tables
  * Graphs (BFS, DFS, shortest path, minimum spanning tree)
  * Sorting algorithms and complexity
  * Dynamic programming and greedy algorithms

#### Computer Organization and Architecture I
* **Description:** Instruction set architecture, datapath, control unit, and memory hierarchy
* **Why it matters:** Understanding what hardware executes makes better software and hardware engineers
* **Prerequisites:** Digital Logic Design, Programming I
* **Leads into:** Computer Architecture II, Embedded Systems, Compilers, OS
* **Skills:** Assembly programming, datapath design, cache analysis
* **Concepts:**
  * Number systems and data representation
  * Instruction set architectures (MIPS/RISC-V)
  * Datapath and control (single-cycle and pipelined)
  * Hazards and forwarding in pipelines
  * Memory hierarchy (cache, virtual memory intro)
  * I/O interfaces

---

### Year 2–3 — Intermediate CE

#### Computer Architecture II
* **Description:** Advanced pipelining, memory systems, parallelism, and GPU architecture
* **Why it matters:** Modern computing performance depends on architectural innovation
* **Prerequisites:** Computer Organization & Architecture I
* **Leads into:** VLSI, Parallel Computing, Hardware Accelerators
* **Skills:** Cache optimization, ILP analysis, NUMA-aware programming
* **Concepts:**
  * Superscalar and out-of-order execution
  * Branch prediction
  * Cache coherence protocols
  * Virtual memory systems
  * GPU architecture and SIMD
  * Multi-core architecture

#### Embedded Systems Design
> See Electrical Engineering: Embedded Systems (with added hardware design emphasis)
* **Additional CE Concepts:**
  * Bare-metal firmware vs. RTOS
  * Custom hardware-software interfaces
  * FPGA co-design concepts
  * Bootloader design
  * Memory-mapped I/O and DMA

#### Operating Systems
* **Description:** OS design: processes, memory management, file systems, and scheduling
* **Why it matters:** Every software system runs on top of an OS; embedded engineers build custom ones
* **Prerequisites:** Computer Architecture I, Data Structures, Programming I
* **Leads into:** Distributed Systems, Embedded OS, Compilers, Systems Security
* **Skills:** Process management, system call implementation, synchronization, scheduling
* **Concepts:**
  * Process and thread management
  * CPU scheduling algorithms
  * Process synchronization (mutex, semaphore, deadlock)
  * Memory management (paging, segmentation, virtual memory)
  * File systems (FAT, ext4 structure)
  * I/O subsystems and device drivers (intro)

#### Digital Signal Processing (Selected Topics)
> See Electrical Engineering: Digital Signal Processing (relevant modules only)

#### Hardware Description Languages and FPGA Design
* **Description:** VHDL/Verilog for digital hardware design and FPGA implementation
* **Why it matters:** FPGAs and ASICs require hardware description, not software programming
* **Prerequisites:** Digital Logic Design
* **Leads into:** VLSI Design, Reconfigurable Computing, ASIC Design
* **Skills:** RTL design, synthesis, timing closure, simulation
* **Concepts:**
  * VHDL and Verilog syntax
  * Combinational and sequential RTL design
  * Synthesis and place-and-route
  * Simulation and testbench writing
  * Timing analysis and constraints
  * FPGA architecture (LUTs, DSPs, BRAMs)

---

### Year 3 — Advanced CE

#### VLSI Design
> See Electrical Engineering: Microelectronics and VLSI I (with added digital design emphasis)
* **Additional CE Concepts:**
  * Logic synthesis flow
  * Static timing analysis
  * Power, performance, area (PPA) optimization
  * Standard cell libraries

#### Computer Networks
* **Description:** Network protocols, Internet architecture, transport layer, and network security basics
* **Why it matters:** All modern computing systems communicate over networks
* **Prerequisites:** Computer Architecture I, Operating Systems (or concurrent)
* **Leads into:** Distributed Systems, Network Security, IoT
* **Skills:** Protocol analysis, socket programming, network troubleshooting
* **Concepts:**
  * OSI and TCP/IP models
  * Physical and data link layers (Ethernet, WiFi)
  * IP addressing, routing, and forwarding
  * TCP and UDP transport protocols
  * Application protocols (HTTP, DNS, SMTP)
  * Network security basics (TLS, firewalls)

#### Hardware Security
* **Description:** Hardware-based attacks, secure design principles, and trusted computing
* **Why it matters:** Hardware vulnerabilities (Spectre, Meltdown) bypass software protections
* **Prerequisites:** Computer Architecture I, Digital Logic
* **Leads into:** Security Engineering, Embedded Security, Cryptographic Hardware
* **Skills:** Side-channel analysis, secure boot design, hardware trojan identification
* **Concepts:**
  * Side-channel attacks (power, timing, EM)
  * Hardware Trojans
  * Secure boot and chain of trust
  * Trusted Platform Module (TPM)
  * Physical unclonable functions (PUFs)
  * Speculative execution attacks

#### Compilers (Intro)
* **Description:** Lexical analysis, parsing, semantic analysis, and code generation
* **Why it matters:** Compiler knowledge improves low-level programming and hardware-software co-design
* **Prerequisites:** Data Structures, Computer Architecture I, Theory of Computation (or equiv)
* **Leads into:** Programming Language Design, LLVM-based tools
* **Skills:** Parser implementation, IR design, optimization passes
* **Concepts:**
  * Lexical analysis (tokenization, regex, DFAs)
  * Parsing (CFGs, LL and LR parsers)
  * Semantic analysis and type checking
  * Intermediate representations
  * Code generation
  * Intro to compiler optimization

---

### Year 4 — Capstone + Electives

#### Senior Capstone — Computer Engineering System Design
* **Description:** Team hardware-software co-design project from specification to working prototype
* **Why it matters:** Integrates CE hardware and software competencies
* **Prerequisites:** Completion of CE core
* **Leads into:** Professional practice
* **Skills:** System architecture, FPGA implementation, embedded software, testing
* **Concepts:**
  * Requirements and architecture documentation
  * FPGA or custom PCB design
  * Embedded firmware and driver development
  * Hardware-software integration
  * Verification and validation
  * Technical documentation

#### Technical Elective Slots (Year 4)
> Choose 3–4 from available themes:
* `[THEME: Parallel & Distributed Computing]` — MPI, CUDA, MapReduce
* `[THEME: Reconfigurable Computing]` — High-level synthesis, FPGA acceleration
* `[THEME: SoC Design]` — ARM SoC, bus protocols (AXI), peripheral IP
* `[THEME: Machine Learning Hardware]` — Neural network accelerators, quantization
* `[THEME: IoT Systems]` — Wireless protocols, edge computing, sensor fusion
* `[THEME: Real-Time Systems]` — Scheduling theory, hard real-time OS, AUTOSAR
* `[THEME: Quantum Computing Intro]` — Qubits, gates, quantum circuits
* `[THEME: Cyber-Physical Systems]` — Safety-critical design, model-based design

---

## Summary

* **Main dependency chain:** Discrete Math + Programming I → Digital Logic → Circuit Analysis → Computer Organization → Computer Architecture → Operating Systems / HDL / VLSI → Networks / Security / Compilers → Capstone
* **Main concept clusters:** Digital Logic & Circuits, Computer Architecture, Software Systems (OS, Compilers), Embedded & Real-Time, Hardware Design (HDL/FPGA/VLSI), Networks, Security
* **Best simulator/tool opportunities:** Logisim (logic design), RARS/MARS (RISC-V assembly), ModelSim/Vivado (HDL simulation), GEM5 (architecture simulation), Raspberry Pi/Arduino (embedded), Wireshark (networks), Cadence (VLSI)

---

# 7. Aerospace Engineering

## Overview

* **Description:** Design and analysis of aircraft, spacecraft, propulsion systems, and related technologies. Integrates aerodynamics, structures, propulsion, and flight mechanics.
* **Main subfields:** Aerodynamics, aerostructures, propulsion, flight mechanics and control, orbital mechanics, spacecraft systems, avionics
* **Shared foundation dependencies:** Calculus I–III, Differential Equations, Linear Algebra, Physics I–II, Statistics, Statics, Dynamics, Mechanics of Materials, Thermodynamics I, Fluid Mechanics

## Curriculum

### Year 1–2 — Foundation (shared with Core Engineering)

> See Core Engineering: Full Year 1–2 curriculum + Mechanics of Materials, Statics, Dynamics, Thermodynamics I

---

### Year 2 — AE Core Entry

#### Introduction to Aerospace Engineering
* **Description:** Survey of aerospace vehicles, disciplines, design process, and careers
* **Why it matters:** Provides context and orientation before specialization
* **Prerequisites:** Physics I, Calculus I
* **Leads into:** All Year 2–3 AE courses
* **Skills:** Aircraft performance estimation, unit systems, basic orbital mechanics
* **Concepts:**
  * History of flight and space exploration
  * Atmosphere model (ISA)
  * Basic aerodynamic forces (lift, drag, thrust, weight)
  * Airfoil nomenclature
  * Orbital mechanics overview
  * Aerospace vehicle types and missions
  * Engineering design in aerospace context

#### Aerospace Materials
* **Description:** Metallic and composite materials for aerospace applications; fatigue and fracture
* **Why it matters:** Weight savings drive aerospace material selection (Al, Ti, CFRP)
* **Prerequisites:** Mechanics of Materials, Chemistry
* **Leads into:** Aerostructures, Design Optimization
* **Skills:** Material selection, weight-strength tradeoffs, composite laminate analysis
* **Concepts:**
  * Aluminum alloys (2xxx, 7xxx series)
  * Titanium alloys
  * Nickel superalloys for high-temperature
  * Carbon fiber composites: layup, properties
  * Fatigue and fracture mechanics (Wöhler, Paris law)
  * Environmental degradation

---

### Year 2–3 — Aerodynamics and Gas Dynamics

#### Incompressible Aerodynamics
* **Description:** Potential flow, boundary layers, airfoil theory, and finite wing theory
* **Why it matters:** Foundation for aircraft design at subsonic speeds
* **Prerequisites:** Fluid Mechanics, Calculus III
* **Leads into:** Compressible Aerodynamics, CFD, Aircraft Design
* **Skills:** Lift and drag estimation, panel methods, wing design
* **Concepts:**
  * Potential flow: sources, sinks, doublets, vortices
  * Kutta-Joukowski theorem
  * Thin airfoil theory (NACA profiles)
  * Boundary layer theory (Blasius, transition, separation)
  * Lifting line theory for finite wings
  * Induced drag and Oswald efficiency

#### Compressible Aerodynamics (Gas Dynamics)
* **Description:** High-speed flow: isentropic relations, shocks, expansion waves, nozzles
* **Why it matters:** Required for transonic/supersonic aircraft and rocket nozzle design
* **Prerequisites:** Incompressible Aerodynamics, Thermodynamics I
* **Leads into:** Propulsion, Hypersonics, Advanced CFD
* **Skills:** Shock analysis, nozzle design, Mach number calculations
* **Concepts:**
  * Isentropic flow relations
  * Normal and oblique shock waves
  * Prandtl-Meyer expansion
  * Fanno flow and Rayleigh flow
  * Converging-diverging nozzle design
  * Transonic flow and area rule

---

### Year 3 — Structures and Propulsion

#### Aerostructures I — Aerospace Structural Analysis
* **Description:** Thin-walled structures, torsion, shear flow, and structural idealization
* **Why it matters:** Aircraft structures are thin-walled, lightweight, and highly loaded
* **Prerequisites:** Mechanics of Materials, Aerospace Materials
* **Leads into:** Aerostructures II, Finite Element Analysis, Design
* **Skills:** Shear flow analysis, beam-column buckling, skin-stringer analysis
* **Concepts:**
  * Open and closed thin-walled cross-sections
  * Shear flow in multi-cell sections
  * Torsion of thin-walled beams
  * Structural idealization (skin-stringer)
  * Buckling of plates and columns
  * Fatigue crack growth in aircraft structure

#### Aerostructures II — Finite Element Methods for Structures
* **Description:** FEM applied to aerospace structures, dynamic analysis, composite FEA
* **Why it matters:** FEA is the industry standard for stress certification of aircraft
* **Prerequisites:** Aerostructures I, Linear Algebra, Numerical Methods
* **Leads into:** Multidisciplinary Design Optimization, Senior Design
* **Skills:** FEA model creation, modal analysis, composite laminate FEA
* **Concepts:**
  * Stiffness matrix assembly
  * 2D and shell elements
  * Natural frequency and mode shapes
  * Transient dynamic analysis
  * Composite plate FEA
  * Nastran/Abaqus workflow

#### Propulsion I — Airbreathing Engines
* **Description:** Thermodynamic cycle analysis of gas turbine engines
* **Why it matters:** Propulsion determines aircraft range, fuel burn, and emissions
* **Prerequisites:** Compressible Aerodynamics, Thermodynamics I
* **Leads into:** Propulsion II (Rockets), Advanced Gas Turbines, Aircraft Design
* **Skills:** Engine cycle analysis, component performance estimation, SFC calculation
* **Concepts:**
  * Ideal Brayton cycle
  * Component efficiencies (compressor, turbine)
  * Turbojet, turbofan, turboprop, and ramjet cycles
  * Specific thrust and specific fuel consumption
  * Inlet design and pressure recovery
  * Combustor fundamentals
  * Nozzle types and exit conditions

#### Propulsion II — Rocket Propulsion
* **Description:** Chemical rocket theory, nozzles, solid and liquid propellants, specific impulse
* **Why it matters:** Required for spacecraft and launch vehicle design
* **Prerequisites:** Propulsion I, Compressible Aerodynamics
* **Leads into:** Spacecraft Systems, Mission Design, Advanced Propulsion
* **Skills:** Rocket equation application, nozzle sizing, propellant selection
* **Concepts:**
  * Rocket equation (Tsiolkovsky)
  * Thrust and specific impulse
  * Nozzle design (area ratio, ideal nozzle)
  * Liquid propellant systems
  * Solid rocket motors
  * Electric propulsion (ion, Hall thruster — intro)
  * Multi-stage rocket analysis

---

### Year 3 — Flight Mechanics

#### Flight Mechanics I — Performance and Stability
* **Description:** Aircraft performance, static stability, and control surface sizing
* **Why it matters:** Ensures aircraft meet performance requirements and are flyable
* **Prerequisites:** Incompressible Aerodynamics, Dynamics
* **Leads into:** Flight Mechanics II (Dynamics), Aircraft Design
* **Skills:** Drag polar construction, climb/range/endurance analysis, stability derivatives
* **Concepts:**
  * Aerodynamic forces on complete aircraft
  * Drag polar and L/D ratio
  * Level flight, climb, range, endurance
  * Takeoff and landing performance
  * Static longitudinal stability (neutral point, Cm-α)
  * Lateral-directional stability
  * Control surface sizing

#### Flight Mechanics II — Flight Dynamics and Control
* **Description:** Dynamic stability, equations of motion, linearization, and autopilot design
* **Why it matters:** Enables understanding of how aircraft respond and how to control them
* **Prerequisites:** Flight Mechanics I, Control Systems, Differential Equations
* **Leads into:** Avionics, UAV Control, Senior Design
* **Skills:** Mode identification, root locus for aircraft, autopilot design
* **Concepts:**
  * Six-DOF equations of motion
  * Linearization and stability derivatives
  * Longitudinal modes: phugoid, short period
  * Lateral-directional modes: roll, spiral, Dutch roll
  * Aircraft transfer functions
  * PID and LQR autopilot design

#### Orbital Mechanics
* **Description:** Two-body problem, orbital maneuvers, spacecraft trajectories, and mission design
* **Why it matters:** Foundation for satellite, planetary, and manned space mission design
* **Prerequisites:** Dynamics, Calculus III
* **Leads into:** Spacecraft Systems, Mission Design, Space Operations
* **Skills:** Orbital element calculation, Hohmann transfer, re-entry analysis
* **Concepts:**
  * Two-body gravitational problem
  * Keplerian orbital elements
  * Orbit types (LEO, GEO, MEO, HEO)
  * Orbital maneuvers (Hohmann, bi-elliptic)
  * Launch windows and planetary missions
  * Relative orbital motion (Clohessy-Wiltshire)
  * Reentry trajectories

---

### Year 4 — Capstone + Electives

#### Aircraft / Spacecraft Design (Capstone)
* **Description:** Complete conceptual design of an aerospace vehicle through all design phases
* **Why it matters:** Integrates all AE disciplines in a realistic design exercise
* **Prerequisites:** All AE core
* **Leads into:** Professional practice
* **Skills:** Multidisciplinary design synthesis, design iteration, trade study, documentation
* **Concepts:**
  * Mission requirements and design specifications
  * Conceptual sizing (rubber engine method, W0 estimation)
  * Aerodynamic/structural/propulsion trade studies
  * Configuration design and parametric layout
  * Weight estimation and center of gravity travel
  * V-n diagram and load cases
  * Preliminary performance and stability verification

#### Technical Elective Slots (Year 4)
> Choose 3–4 from available themes:
* `[THEME: Computational Aerodynamics / CFD]` — Inviscid/viscous CFD, RANS turbulence
* `[THEME: Rotorcraft]` — Helicopter aerodynamics, blade element theory
* `[THEME: Hypersonics]` — High-temperature gas dynamics, thermal protection
* `[THEME: Spacecraft Systems]` — Attitude control, power, thermal, communications
* `[THEME: UAV/Autonomous Systems]` — Small UAS design, path planning, regulations
* `[THEME: Structural Optimization]` — Topology optimization, MDO, aeroelasticity
* `[THEME: Advanced Propulsion]` — Electric aircraft, hybrid-electric, scramjets
* `[THEME: Space Mission Design]` — Interplanetary trajectories, operations, STK

---

## Summary

* **Main dependency chain:** Calculus → Physics I → Statics / Dynamics → Fluid Mechanics → Incompressible Aerodynamics → Compressible Aerodynamics → Propulsion I / Flight Mechanics I / Aerostructures I → Propulsion II / Flight Mechanics II / Aerostructures II → Orbital Mechanics → Capstone Design
* **Main concept clusters:** Aerodynamics, Propulsion, Structural Analysis, Flight Mechanics, Orbital Mechanics, Materials, Control Systems
* **Best simulator/tool opportunities:** OpenVSP (geometry), XFOIL/XFLR5 (airfoil/wing analysis), OpenFOAM (CFD), MATLAB/Simulink (flight dynamics), STK (orbital mechanics), Ansys Mechanical (FEA), GasTurb (engine cycle), NASA GMAT (mission design)

---

---

# 8. Biomedical Engineering

## Overview

* **Description:** Application of engineering principles to medicine and biology. Bridges life sciences with engineering to develop diagnostics, therapeutics, medical devices, and biomaterials.
* **Main subfields:** Biomechanics, biomaterials, bioinstrumentation, biosignals and imaging, tissue engineering, neural engineering, clinical engineering, regulatory science
* **Shared foundation dependencies:** Calculus I–III, Differential Equations, Linear Algebra, Physics I–II, Statistics, Biology I, Chemistry I, Statics, Mechanics of Materials

## Curriculum

### Year 1–2 — Foundation

> See Core Engineering: Calculus I–III, Differential Equations, Physics I–II, Linear Algebra, Statistics, Statics

#### Biology for Engineers I — Cell and Molecular Biology
* **Description:** Cell structure, DNA/RNA, protein synthesis, cell signaling, and cellular energetics
* **Why it matters:** BME requires equal fluency in engineering and biology
* **Prerequisites:** High school biology
* **Leads into:** Physiology, Tissue Engineering, Bioinstrumentation
* **Skills:** Cell biology reasoning, scientific literature reading
* **Concepts:**
  * Cell organelles and function
  * Central dogma (DNA → RNA → Protein)
  * Cell signaling pathways
  * Cell cycle and division
  * Stem cells and differentiation
  * Extracellular matrix and cell adhesion

#### General Chemistry I & II (Survey)
> Same as ChE General Chemistry (abbreviated for BME)

---

### Year 2 — BME Core Entry

#### Introduction to Biomedical Engineering
* **Description:** Overview of BME fields, medical device industry, regulatory pathways, ethics
* **Why it matters:** Frames engineering in the medical context and regulatory environment
* **Prerequisites:** Biology I, Calculus I
* **Leads into:** All Year 2–3 BME courses
* **Skills:** Medical device landscape, FDA pathway awareness, ethical reasoning in medicine
* **Concepts:**
  * History of BME and notable innovations
  * Medical device classification (FDA Class I/II/III)
  * FDA regulatory pathways (510(k), PMA)
  * ISO standards and design controls
  * BME ethical issues (informed consent, clinical trials)
  * Engineering design in clinical contexts

#### Physiology for Engineers
* **Description:** Systems physiology: cardiovascular, respiratory, neural, musculoskeletal
* **Why it matters:** Engineers must understand what they're designing for
* **Prerequisites:** Biology I, Physics I
* **Leads into:** Bioinstrumentation, Biomechanics, Medical Imaging, Neural Engineering
* **Skills:** Physiological measurement interpretation, organ system modeling
* **Concepts:**
  * Cardiovascular system (cardiac cycle, blood pressure, Frank-Starling)
  * Respiratory mechanics and gas exchange
  * Renal physiology basics
  * Musculoskeletal system and neuromuscular junction
  * Nervous system: action potential, synaptic transmission
  * Endocrine system overview

#### Biomechanics I — Solid Mechanics in Biology
* **Description:** Application of mechanics of materials to biological tissues and structures
* **Why it matters:** Implants, prosthetics, and orthopaedic devices require tissue mechanics knowledge
* **Prerequisites:** Mechanics of Materials, Statics
* **Leads into:** Biomechanics II, Implant Design, Tissue Engineering
* **Skills:** Tissue testing data interpretation, implant stress analysis, joint force calculation
* **Concepts:**
  * Mechanical properties of bone (cortical, cancellous)
  * Cartilage and ligament mechanics
  * Viscoelasticity of soft tissues
  * Joint biomechanics (hip, knee, spine)
  * Fracture mechanics in bone
  * Implant-bone interface mechanics

---

### Year 2–3 — Intermediate BME

#### Bioinstrumentation
* **Description:** Physiological signal acquisition, transducers, amplification, and noise reduction
* **Why it matters:** Medical devices must accurately measure biological signals
* **Prerequisites:** Circuit Analysis I, Physiology for Engineers
* **Leads into:** Medical Imaging, Neural Engineering, Wearable Devices
* **Skills:** Signal conditioning circuit design, electrode selection, noise analysis
* **Concepts:**
  * Biological signal characteristics (ECG, EEG, EMG, EEG)
  * Biopotential electrodes (Ag/AgCl, dry electrodes)
  * Instrumentation amplifiers
  * Noise sources and shielding
  * ADC and sampling for biosignals
  * Patient safety (isolation, leakage current)

#### Biosignals and Medical Imaging
* **Description:** Signal processing for biosignals and principles of medical imaging modalities
* **Why it matters:** Imaging is the most widely used diagnostic tool in medicine
* **Prerequisites:** Signals & Systems (or equiv), Bioinstrumentation
* **Leads into:** Advanced Imaging, Image Processing, Neural Engineering
* **Skills:** ECG/EEG analysis, image reconstruction, modality comparison
* **Concepts:**
  * Fourier analysis of biosignals
  * ECG acquisition and interpretation
  * EEG, EMG, EOG signal properties
  * X-ray and CT imaging physics
  * MRI principles (Larmor frequency, k-space)
  * Ultrasound (pulse-echo, Doppler)
  * Nuclear imaging (PET, SPECT) overview

#### Biomaterials
* **Description:** Biological and synthetic materials for implantable devices; biocompatibility
* **Why it matters:** Every implant interacts with the body — material choice is safety-critical
* **Prerequisites:** Materials Science (or ChE equiv), Biology I
* **Leads into:** Tissue Engineering, Drug Delivery, Implant Design
* **Skills:** Material selection for implants, biocompatibility testing, surface modification
* **Concepts:**
  * Host response to implants (protein adsorption, inflammation, encapsulation)
  * Metallic biomaterials (316L SS, Ti-6Al-4V, CoCr)
  * Ceramic biomaterials (hydroxyapatite, alumina)
  * Polymeric biomaterials (UHMWPE, PEEK, PLGA)
  * Surface modification techniques
  * ISO 10993 biocompatibility testing framework
  * Degradable vs. permanent implants

#### Biomechanics II — Fluid and Dynamic Biomechanics
* **Description:** Cardiovascular fluid mechanics, gait analysis, and dynamic musculoskeletal modeling
* **Why it matters:** Blood flow and gait are critical to cardiovascular device and prosthetic design
* **Prerequisites:** Fluid Mechanics (or Physiology), Biomechanics I, Dynamics
* **Leads into:** Cardiovascular Devices, Orthotics/Prosthetics, Sports Engineering
* **Skills:** Hemodynamic analysis, gait parameter extraction, musculoskeletal simulation
* **Concepts:**
  * Blood rheology (non-Newtonian behavior)
  * Cardiovascular fluid mechanics (Poiseuille flow, Womersley number)
  * Hemodynamic forces on vessels and heart valves
  * Gait analysis (kinematics, kinetics, EMG)
  * Inverse dynamics for joint force estimation
  * Musculoskeletal modeling (OpenSim intro)

---

### Year 3 — Advanced BME

#### Tissue Engineering and Regenerative Medicine
* **Description:** Scaffolds, cell culture, bioreactors, and strategies to engineer living tissues
* **Why it matters:** Growing tissues and organs in vitro is a major frontier in medicine
* **Prerequisites:** Biomaterials, Biology I
* **Leads into:** Advanced Tissue Engineering, Clinical Trials, Regenerative Medicine
* **Skills:** Scaffold design, cell viability assays, tissue culture protocols
* **Concepts:**
  * Scaffold requirements (porosity, mechanical, degradation)
  * Scaffold fabrication (electrospinning, 3D bioprinting)
  * Cell seeding and co-culture strategies
  * Bioreactor design for tissue maturation
  * Vascularization strategies
  * Clinical translation challenges

#### Neural Engineering
* **Description:** Neural interfaces, brain-computer interfaces, neuromodulation, and computational neuroscience
* **Why it matters:** Neural engineering bridges the nervous system and electronics for therapies and BCIs
* **Prerequisites:** Bioinstrumentation, Physiology for Engineers
* **Leads into:** BCI Research, Deep Brain Stimulation Design, Cochlear Implants
* **Skills:** Neural signal recording analysis, electrode array design, stimulation protocol design
* **Concepts:**
  * Electrophysiology of neurons (action potential, Hodgkin-Huxley model)
  * Extracellular recording and spike sorting
  * Electrode-tissue interface electrochemistry
  * Brain-computer interfaces (EEG and implanted)
  * Functional electrical stimulation (FES)
  * Deep brain stimulation (DBS)
  * Cochlear implants

#### BME Design and Regulatory Affairs
* **Description:** Medical device design process with regulatory, quality, and clinical integration
* **Why it matters:** Medical devices must navigate strict regulatory pathways to reach patients
* **Prerequisites:** Introduction to BME, all BME core
* **Leads into:** Senior Design Capstone
* **Skills:** Design controls, risk management, technical file preparation
* **Concepts:**
  * Design control process (21 CFR Part 820)
  * Risk management (ISO 14971, FMEA)
  * Verification and validation
  * Predicate device strategy (510k)
  * Clinical trial design for devices
  * Quality management systems (ISO 13485)

---

### Year 4 — Capstone + Electives

#### Senior Capstone — Medical Device Design
* **Description:** Team-based design project following full design control process
* **Why it matters:** Simulates real medical device development from clinical need to prototype
* **Prerequisites:** BME Design & Regulatory Affairs, all BME core
* **Leads into:** Industry or graduate school
* **Skills:** Clinical need identification, device design, bench/lab testing, regulatory documentation
* **Concepts:**
  * Clinical need identification and voice of customer
  * Clinical evidence review
  * Functional prototyping and testing
  * Biocompatibility verification
  * Risk-benefit analysis
  * Regulatory submission document preparation
  * Stakeholder presentation

#### Technical Elective Slots (Year 4)
> Choose 3–4 from available themes:
* `[THEME: Drug Delivery Systems]` — Nanoparticles, controlled release, targeting
* `[THEME: Orthopaedic Biomechanics]` — Implant design, total joint replacement
* `[THEME: Cardiovascular Devices]` — Stents, heart valves, ventricular assist devices
* `[THEME: Medical Image Analysis]` — Segmentation, registration, AI diagnostics
* `[THEME: Wearable and Digital Health]` — Wearable sensors, mHealth, data analysis
* `[THEME: Bioinformatics]` — Genomics, protein structure, sequencing pipelines
* `[THEME: Rehabilitation Engineering]` — Prosthetics, orthotics, exoskeletons
* `[THEME: Clinical Engineering]` — Hospital systems, equipment management, safety

---

## Summary

* **Main dependency chain:** Biology I + Chemistry → Physiology for Engineers → Bioinstrumentation / Biomechanics I / Biomaterials → Biosignals / Biomechanics II / Tissue Engineering / Neural Engineering → BME Design → Capstone
* **Main concept clusters:** Physiology, Biomechanics, Biomaterials, Bioinstrumentation, Medical Imaging, Tissue Engineering, Neural Engineering, Regulatory Affairs
* **Best simulator/tool opportunities:** MATLAB (biosignal processing), OpenSim (musculoskeletal modeling), 3D Slicer (medical imaging), SolidWorks (device CAD), ANSYS (implant FEA), COMSOL (multiphysics bio-simulation), Python (bioinformatics)

---

---

# 9. Industrial Engineering

## Overview

* **Description:** Design, optimization, and management of integrated systems of people, information, equipment, energy, and materials. Focused on efficiency, quality, and human factors.
* **Main subfields:** Operations research, manufacturing systems, quality engineering, ergonomics and human factors, supply chain, logistics, simulation, systems engineering
* **Shared foundation dependencies:** Calculus I–II, Differential Equations, Linear Algebra, Physics I, Statistics (heavy emphasis), Statics

## Curriculum

### Year 1–2 — Foundation (shared with Core Engineering)

> See Core Engineering: Calculus I–II, Differential Equations, Physics I, Linear Algebra, Statistics
> Note: IE has lighter physics/thermodynamics depth; heavier emphasis on statistics and computing

---

### Year 2 — IE Core Entry

#### Introduction to Industrial Engineering
* **Description:** Overview of IE disciplines, tools, and the systems perspective
* **Why it matters:** Establishes the IE mindset: systems thinking, efficiency, and human integration
* **Prerequisites:** None
* **Leads into:** All Year 2–3 IE courses
* **Skills:** Process flow mapping, basic efficiency analysis, IE tool awareness
* **Concepts:**
  * History and scope of industrial engineering
  * The systems perspective
  * Process mapping (flowcharts, value stream maps)
  * Work measurement basics
  * Introduction to lean thinking
  * IE career paths (manufacturing, healthcare, logistics, consulting)

#### Engineering Economy
* **Description:** Time value of money, cash flow analysis, project evaluation, and economic decision-making
* **Why it matters:** Every engineering decision has an economic dimension
* **Prerequisites:** Calculus I
* **Leads into:** Systems Engineering, Project Management, Manufacturing Economics
* **Skills:** NPV, IRR, payback period, sensitivity analysis, make-vs-buy decisions
* **Concepts:**
  * Time value of money (PV, FV, annuities)
  * Discount rates and MARR
  * Depreciation methods (straight-line, MACRS)
  * Net present value and IRR analysis
  * Benefit-cost analysis
  * Sensitivity and break-even analysis
  * After-tax cash flow analysis

#### Probability and Statistics for IE
* **Description:** Deeper statistical methods: regression, design of experiments, and reliability
* **Why it matters:** IE uses statistics as its primary quantitative tool
* **Prerequisites:** Engineering Statistics (Core)
* **Leads into:** Quality Engineering, Simulation, Six Sigma, Reliability Engineering
* **Skills:** Regression modeling, DOE analysis, reliability calculations
* **Concepts:**
  * Multiple regression and model validation
  * Analysis of variance (ANOVA)
  * Design of experiments (factorial, fractional factorial)
  * Response surface methodology
  * Statistical process control (control charts)
  * Reliability distributions (exponential, Weibull)
  * Non-parametric statistics

---

### Year 2–3 — Operations Research Core

#### Operations Research I — Linear Programming and Optimization
* **Description:** Linear programming, simplex method, duality, and sensitivity analysis
* **Why it matters:** LP is the foundational optimization method for resource allocation and logistics
* **Prerequisites:** Linear Algebra, Calculus I
* **Leads into:** Operations Research II, Supply Chain, Production Planning
* **Skills:** LP model formulation, simplex algorithm, sensitivity analysis, software solution
* **Concepts:**
  * LP problem formulation
  * Graphical solution (2D)
  * Simplex algorithm
  * Duality theory
  * Sensitivity analysis and shadow prices
  * Transportation and assignment problems
  * Network flow models

#### Operations Research II — Integer Programming and Heuristics
* **Description:** Integer and mixed-integer programming, combinatorial optimization, and metaheuristics
* **Why it matters:** Many real scheduling and routing problems require integer solutions
* **Prerequisites:** Operations Research I
* **Leads into:** Supply Chain Optimization, Scheduling, Advanced Analytics
* **Skills:** MIP model formulation, branch and bound, heuristic algorithm design
* **Concepts:**
  * Integer and binary variable modeling
  * Branch-and-bound algorithm
  * Cutting planes
  * Greedy algorithms and local search
  * Simulated annealing and genetic algorithms
  * Vehicle routing problem (VRP) formulations
  * Scheduling problem types (makespan, tardiness)

#### Stochastic Processes and Queuing Theory
* **Description:** Markov chains, Poisson processes, and queuing models for service systems
* **Why it matters:** Models waiting lines in hospitals, call centers, manufacturing, and logistics
* **Prerequisites:** Probability & Statistics for IE
* **Leads into:** Simulation, Service Systems Design, Healthcare IE
* **Skills:** Queuing model selection, performance metric calculation, system design
* **Concepts:**
  * Poisson process
  * Markov chains (discrete and continuous time)
  * M/M/1, M/M/c, M/G/1 queuing models
  * Little's law
  * Queuing networks (Jackson networks)
  * Performance metrics: throughput, cycle time, utilization
  * Applications: ER design, call centers, manufacturing cells

---

### Year 3 — Manufacturing and Quality

#### Manufacturing Systems Engineering
* **Description:** Production planning, scheduling, lean manufacturing, and facility design
* **Why it matters:** Manufacturing is the largest source of IE jobs and a driver of economic output
* **Prerequisites:** Engineering Economy, OR I, Statistics
* **Leads into:** Production Planning, Supply Chain, Advanced Manufacturing
* **Skills:** Facility layout design, production scheduling, lean implementation
* **Concepts:**
  * Process types (job shop, flow shop, batch)
  * Facility layout (product, process, cellular)
  * Aggregate production planning
  * Material requirements planning (MRP)
  * Lean principles (5S, kaizen, kanban)
  * Just-in-time and pull systems
  * Theory of constraints (TOC)

#### Quality Engineering
* **Description:** Quality management systems, SPC, acceptance sampling, and Six Sigma
* **Why it matters:** Quality is the intersection of engineering performance and customer satisfaction
* **Prerequisites:** Probability & Statistics for IE
* **Leads into:** Advanced Quality, Reliability, Process Improvement
* **Skills:** Control chart construction, capability analysis, FMEA, Six Sigma project execution
* **Concepts:**
  * Quality philosophy (Deming, Juran, Taguchi)
  * Statistical process control: X-bar, R, p, c charts
  * Process capability indices (Cp, Cpk)
  * Acceptance sampling (OC curves)
  * FMEA and control plans
  * Six Sigma DMAIC methodology
  * Measurement system analysis (Gage R&R)

#### Ergonomics and Human Factors Engineering
* **Description:** Design of systems for human use: cognitive, physical, and environmental factors
* **Why it matters:** Human error, fatigue, and injury are major sources of system failure and loss
* **Prerequisites:** Statistics, Introduction to IE
* **Leads into:** Workplace Design, Healthcare Systems, UX Engineering
* **Skills:** Workstation design, task analysis, cognitive workload assessment, error analysis
* **Concepts:**
  * Human anthropometry and biomechanics
  * Biomechanical limits and injury prevention
  * Cognitive workload and mental models
  * Task analysis methods (GOMS, HTA)
  * Human error classification (SHERPA, CREAM)
  * Displays and controls design
  * Environmental factors (noise, lighting, temperature)

#### Systems Simulation
* **Description:** Discrete-event simulation for modeling complex stochastic systems
* **Why it matters:** When queuing models are too simple, simulation provides the answer
* **Prerequisites:** Stochastic Processes, Statistics, programming familiarity
* **Leads into:** Advanced Simulation, Supply Chain Modeling, Healthcare Simulation
* **Skills:** Arena/AnyLogic model building, input analysis, output analysis, validation
* **Concepts:**
  * Discrete-event simulation concepts
  * Random number generation and statistical distributions
  * Input data analysis (fitting distributions)
  * Simulation model building and verification
  * Output analysis (warm-up, run length, confidence intervals)
  * Variance reduction techniques
  * Simulation optimization

---

### Year 3–4 — Advanced IE

#### Supply Chain Engineering
* **Description:** Inventory control, supply chain network design, and logistics optimization
* **Why it matters:** Global supply chains are one of the largest sources of engineering opportunity
* **Prerequisites:** OR I, Manufacturing Systems, Statistics
* **Leads into:** Supply Chain Analytics, Procurement, Logistics Engineering
* **Skills:** Inventory model calculations, network optimization, demand forecasting
* **Concepts:**
  * Inventory models: EOQ, reorder point, safety stock
  * Multi-echelon inventory systems
  * Supply chain network design optimization
  * Demand forecasting methods
  * Transportation mode selection
  * Bullwhip effect
  * Risk and resilience in supply chains

#### Systems Engineering
* **Description:** Systems lifecycle, requirements engineering, architecture, and systems integration
* **Why it matters:** Complex sociotechnical systems require a systems engineering approach
* **Prerequisites:** All IE core
* **Leads into:** Defense/Aerospace systems careers, product development
* **Skills:** MBSE, requirements development, trade study, V-model process
* **Concepts:**
  * Systems lifecycle (IEEE 15288)
  * Requirements engineering and decomposition
  * Functional analysis and allocation
  * System architecture and design alternatives
  * Interface management
  * Verification and validation planning
  * Model-based systems engineering (SysML intro)

---

### Year 4 — Capstone + Electives

#### Senior Capstone — IE Systems Design Project
* **Description:** Team-based analysis and redesign of a real system (manufacturing, healthcare, service)
* **Why it matters:** IE capstones typically involve real clients and measurable improvement
* **Prerequisites:** Completion of IE core
* **Leads into:** Professional practice
* **Skills:** Process analysis, data collection, improvement recommendation, implementation planning
* **Concepts:**
  * Client engagement and problem scoping
  * Value stream mapping
  * Data collection and analysis
  * Simulation or optimization model
  * Improvement solution design
  * Cost-benefit analysis
  * Implementation roadmap and presentation

#### Technical Elective Slots (Year 4)
> Choose 3–4 from available themes:
* `[THEME: Healthcare Systems Engineering]` — Patient flow, safety, hospital operations
* `[THEME: Data Science for IE]` — Machine learning, predictive analytics, dashboards
* `[THEME: Financial Engineering]` — Portfolio optimization, risk modeling, quantitative finance
* `[THEME: Lean and Agile Systems]` — Advanced lean, Scrum for engineering, DevOps
* `[THEME: Humanitarian Logistics]` — Disaster response supply chains, NGO operations
* `[THEME: Advanced Analytics]` — Prescriptive analytics, Bayesian methods, OR software
* `[THEME: Project Management]` — CPM, PERT, risk, earned value, PMP preparation

---

## Summary

* **Main dependency chain:** Calculus → Statistics → Probability & Statistics for IE → OR I / Stochastic Processes → OR II / Simulation / Quality Engineering / Manufacturing Systems → Supply Chain / Systems Engineering → Capstone
* **Main concept clusters:** Operations Research & Optimization, Statistics & Quality, Manufacturing Systems, Simulation, Human Factors, Supply Chain, Systems Engineering, Economics
* **Best simulator/tool opportunities:** Arena/Simio (DES), Gurobi/CPLEX (optimization), Python/PuLP (OR), Minitab/JMP (statistics), ARENA (healthcare), AnyLogic (agent-based), Power BI/Tableau (dashboards), SysML tools (systems engineering)

---

---

# 10. Materials Engineering

## Overview

* **Description:** Study, design, and application of the structure-property-processing-performance relationships of materials including metals, ceramics, polymers, composites, and biomaterials.
* **Main subfields:** Metallurgy, ceramics, polymers and soft matter, composites, electronic materials, biomaterials, nanomaterials, failure analysis, surface engineering
* **Shared foundation dependencies:** Calculus I–III, Differential Equations, Linear Algebra, Physics I–II, Chemistry I–II, Statistics, Mechanics of Materials

## Curriculum

### Year 1–2 — Foundation

> See Core Engineering: Calculus I–III, Differential Equations, Physics I–II, Linear Algebra, Statistics, Mechanics of Materials

#### General Chemistry I & II
> Same as listed under Chemical Engineering (full sequence)

---

### Year 2 — MatE Core Entry

#### Introduction to Materials Science
* **Description:** Bonding, crystal structure, defects, and introductory properties of all material classes
* **Why it matters:** Structure determines property — this is the materials engineering axiom
* **Prerequisites:** General Chemistry I, Physics I
* **Leads into:** All Year 2–3 MatE courses
* **Skills:** Crystal structure determination, property estimation from structure, defect analysis
* **Concepts:**
  * Atomic bonding (ionic, covalent, metallic, van der Waals)
  * Crystal structures (FCC, BCC, HCP, diamond cubic)
  * Miller indices and crystallography
  * Point defects (vacancies, interstitials, substitutionals)
  * Dislocations (edge, screw)
  * Grain boundaries and microstructure
  * Diffusion (Fick's laws)

#### Physical Chemistry for Materials Engineers
* **Description:** Thermodynamics, kinetics, and electrochemistry applied to materials
* **Why it matters:** Phase transformations and corrosion are governed by thermodynamics and kinetics
* **Prerequisites:** General Chemistry II, Calculus II
* **Leads into:** Phase Diagrams, Kinetics of Transformations, Corrosion
* **Skills:** Gibbs energy calculations, reaction kinetics, electrochemical cell analysis
* **Concepts:**
  * Gibbs free energy and equilibrium
  * Chemical potential
  * Reaction kinetics (Arrhenius equation)
  * Electrochemistry (cell potential, Nernst equation)
  * Surface and interface thermodynamics
  * Thermodynamics of solutions

---

### Year 2–3 — Core Materials Science

#### Thermodynamics and Phase Diagrams
* **Description:** Binary and ternary phase diagrams, phase transformations, and equilibria
* **Why it matters:** Phase diagrams are the engineer's map to material state under processing conditions
* **Prerequisites:** Physical Chemistry for MatE, Introduction to Materials Science
* **Leads into:** Heat Treatment, Solidification, Phase Transformation Kinetics
* **Skills:** Phase diagram reading and interpretation, Lever rule, phase identification
* **Concepts:**
  * Gibbs phase rule
  * Unary and binary phase diagrams
  * Isomorphous systems
  * Eutectic, eutectoid, and peritectic reactions
  * Iron-carbon phase diagram (detailed)
  * Ternary phase diagram basics
  * Thermodynamic modeling (CALPHAD intro)

#### Kinetics of Phase Transformations
* **Description:** Nucleation and growth theory, TTT/CCT diagrams, solidification, diffusion-controlled transformations
* **Why it matters:** Processing routes (annealing, quenching, aging) exploit transformation kinetics
* **Prerequisites:** Phase Diagrams, Diffusion theory
* **Leads into:** Heat Treatment, Solidification Processing, Advanced Alloys
* **Skills:** TTT/CCT diagram use, microstructure prediction, heat treatment specification
* **Concepts:**
  * Homogeneous and heterogeneous nucleation
  * Growth kinetics (interface and diffusion controlled)
  * TTT and CCT diagrams
  * Martensitic transformations
  * Solidification: planar, cellular, dendritic
  * Precipitation hardening sequence (GP zones → phases)
  * Recrystallization and grain growth

#### Mechanical Behavior of Materials
* **Description:** Deformation mechanisms, fracture, fatigue, and creep of engineering materials
* **Why it matters:** Materials fail — understanding why and how prevents catastrophic outcomes
* **Prerequisites:** Mechanics of Materials, Introduction to Materials Science
* **Leads into:** Failure Analysis, Machine Design (MatE perspective), Design with Materials
* **Skills:** Tensile test interpretation, fracture analysis, fatigue life estimation
* **Concepts:**
  * Elastic and plastic deformation mechanisms
  * Strengthening mechanisms (solid solution, precipitation, work hardening, grain size)
  * Fracture mechanics (KI, fracture toughness, LEFM)
  * Fatigue (S-N curves, stress-life, strain-life)
  * Creep mechanisms and Larson-Miller parameter
  * Impact toughness (Charpy, DBTT)
  * Failure analysis methodology

#### Materials Characterization I
* **Description:** Optical microscopy, SEM/TEM, X-ray diffraction, and spectroscopic techniques
* **Why it matters:** You cannot engineer what you cannot measure; characterization validates structure-property links
* **Prerequisites:** Introduction to Materials Science, Physics II
* **Leads into:** Characterization II, Failure Analysis, Nanomaterials
* **Skills:** Sample preparation, microscopy operation, XRD pattern interpretation, data reporting
* **Concepts:**
  * Sample preparation (grinding, polishing, etching)
  * Optical microscopy and image analysis
  * Scanning electron microscopy (SEM) and EDS
  * Transmission electron microscopy (TEM) basics
  * X-ray diffraction (Bragg's law, peak indexing)
  * Raman and FTIR spectroscopy (intro)
  * Data reporting and uncertainty

---

### Year 3 — Material Classes

#### Metals and Alloys
* **Description:** Physical metallurgy of ferrous and nonferrous alloys; processing and properties
* **Why it matters:** Metals are the backbone of structural engineering; alloy design drives performance
* **Prerequisites:** Thermodynamics & Phase Diagrams, Kinetics of Phase Transformations
* **Leads into:** Advanced Alloys, Corrosion, Failure Analysis
* **Skills:** Alloy selection, heat treatment specification, property prediction
* **Concepts:**
  * Iron and steel metallurgy (low alloy, stainless, tool steels)
  * Aluminum alloys (series, temper designations, precipitation hardening)
  * Titanium alloys (α, β, α-β)
  * Nickel-based superalloys
  * Copper alloys (brass, bronze, BeCu)
  * Heat treatment processes (annealing, quenching, tempering, aging)
  * Weldability and joining metallurgy

#### Ceramics and Glasses
* **Description:** Crystal and amorphous structures, sintering, mechanical and thermal properties of ceramics
* **Why it matters:** Ceramics serve extreme environments (thermal barriers, cutting tools, biomedical)
* **Prerequisites:** Thermodynamics & Phase Diagrams, Introduction to Materials Science
* **Leads into:** Electronic Ceramics, Refractory Engineering, Advanced Ceramics
* **Skills:** Sintering parameter selection, ceramic property estimation, failure mode analysis
* **Concepts:**
  * Ceramic crystal structures (NaCl, perovskite, spinel)
  * Glass structure and glass-ceramic processing
  * Powder processing and sintering
  * Mechanical behavior (brittle fracture, Weibull statistics)
  * Thermal properties (conductivity, expansion, shock resistance)
  * Electrical ceramics (ferroelectrics, piezoelectrics)
  * Oxide ceramics (Al2O3, ZrO2, SiC, Si3N4)

#### Polymers and Soft Materials
* **Description:** Polymer synthesis, structure, viscoelasticity, and processing methods
* **Why it matters:** Polymers are the fastest-growing materials class and the basis of soft robotics, packaging, and biomedical devices
* **Prerequisites:** Organic Chemistry (survey), Introduction to Materials Science
* **Leads into:** Polymer Processing, Biomaterials, Composite Design
* **Skills:** Polymer selection, viscoelastic analysis, processing method comparison
* **Concepts:**
  * Chain architecture (linear, branched, crosslinked, network)
  * Polymerization mechanisms (addition, condensation)
  * Molecular weight distribution and characterization (GPC)
  * Glass transition temperature and crystallinity
  * Viscoelasticity: Maxwell and Kelvin-Voigt models, time-temperature superposition
  * Processing methods (extrusion, injection molding, blow molding)
  * Elastomers and thermosets

#### Composite Materials
* **Description:** Fiber-reinforced polymers, metal and ceramic matrix composites, design and analysis
* **Why it matters:** Composites enable lightweight high-performance structures in aerospace, sports, and automotive
* **Prerequisites:** Mechanical Behavior, Polymers, Metals
* **Leads into:** Composite Manufacturing, Aerospace Structures, Advanced Design
* **Skills:** Rule of mixtures, laminate analysis, composite failure prediction
* **Concepts:**
  * Fiber types (carbon, glass, aramid, ceramic)
  * Matrix types (thermoset, thermoplastic, metal, ceramic)
  * Micromechanics: rule of mixtures (longitudinal and transverse)
  * Classical lamination theory
  * Failure criteria (max stress, Tsai-Wu)
  * Manufacturing: hand layup, RTM, filament winding, autoclave
  * Metal matrix and ceramic matrix composites

---

### Year 3–4 — Advanced MatE

#### Materials Characterization II — Advanced Methods
* **Description:** Advanced electron microscopy, synchrotron methods, and in-situ characterization
* **Why it matters:** Research and failure investigation require advanced characterization
* **Prerequisites:** Characterization I
* **Leads into:** Research, Graduate School, Failure Analysis
* **Skills:** Diffraction contrast imaging, EBSD analysis, atom probe data interpretation
* **Concepts:**
  * Advanced SEM: EBSD, WDS, FIB/SEM
  * Advanced TEM: HRTEM, SAED, STEM-HAADF, EDS mapping
  * Synchrotron XRD and tomography
  * Atom probe tomography (APT)
  * In-situ testing (SEM/TEM straining, heating)
  * Nanoindentation

#### Electronic Materials
* **Description:** Semiconductor physics, dielectrics, magnetic materials, and optical materials
* **Why it matters:** Electronic materials underpin all modern technology — from chips to solar cells
* **Prerequisites:** Physics II, Introduction to Materials Science
* **Leads into:** Thin Film Technology, Semiconductor Processing, Photovoltaics
* **Skills:** Band diagram interpretation, semiconductor device material selection, dielectric analysis
* **Concepts:**
  * Band theory: conductors, semiconductors, insulators
  * Intrinsic and extrinsic semiconductors
  * p-n junction materials science
  * Dielectric properties and polarization mechanisms
  * Ferroelectric and piezoelectric materials
  * Magnetic materials (ferro, ferri, anti-ferromagnetic)
  * Optical properties (absorption, emission, photovoltaic effect)

#### Corrosion Engineering
* **Description:** Electrochemical corrosion mechanisms, protection strategies, and materials selection for corrosion
* **Why it matters:** Corrosion costs economies trillions annually; prevention is a core MatE skill
* **Prerequisites:** Physical Chemistry, Metals & Alloys
* **Leads into:** Coatings Engineering, Failure Analysis, Infrastructure Materials
* **Skills:** Pourbaix diagram interpretation, galvanic corrosion prediction, CP system design
* **Concepts:**
  * Electrochemical theory of corrosion (anodes, cathodes)
  * Mixed potential theory (Evans diagrams)
  * Pourbaix (E-pH) diagrams
  * Galvanic corrosion and galvanic series
  * Passivity and breakdown
  * Pitting, crevice, stress-corrosion cracking
  * Cathodic protection and coatings

#### Failure Analysis and Design
* **Description:** Systematic analysis of material failures: methodology, case studies, and prevention
* **Why it matters:** Learning from failures prevents future catastrophes and drives material improvement
* **Prerequisites:** Mechanical Behavior, Characterization I, Metals (or Ceramics, or Polymers)
* **Leads into:** Professional practice, Expert witness roles, Design review
* **Skills:** Fracture surface interpretation, failure root cause identification, corrective action documentation
* **Concepts:**
  * Failure analysis methodology (document, observe, test, analyze)
  * Fracture surface features (beach marks, striations, intergranular)
  * Overload, fatigue, creep, and corrosion failures
  * Failure mode documentation (ASTM E2332)
  * Case studies: famous engineering failures
  * Materials selection for failure prevention
  * Reporting and expert communication

---

### Year 4 — Capstone + Electives

#### Senior Capstone — Materials Design Project
* **Description:** Materials-focused design project: material selection, processing, characterization, and property verification
* **Why it matters:** Integrates structure-property-processing-performance across the curriculum
* **Prerequisites:** Completion of MatE core
* **Leads into:** Professional practice or graduate study
* **Skills:** Materials selection methodology, processing design, characterization planning, documentation
* **Concepts:**
  * CES EduPack materials selection methodology
  * Property requirements mapping
  * Processing route design
  * Characterization plan
  * Property verification and comparison
  * Cost and sustainability analysis
  * Technical report and presentation

#### Technical Elective Slots (Year 4)
> Choose 3–4 from available themes:
* `[THEME: Nanomaterials]` — Nanoparticles, CNTs, graphene, synthesis and properties
* `[THEME: Additive Manufacturing of Materials]` — Metal AM, ceramics AM, microstructure control
* `[THEME: Biomaterials Engineering]` — Implants, scaffolds, degradable materials
* `[THEME: Thin Films and Coatings]` — PVD, CVD, ALD, tribological coatings
* `[THEME: Computational Materials Science]` — DFT, molecular dynamics, CALPHAD
* `[THEME: Energy Materials]` — Battery electrodes, electrolytes, photovoltaics, fuel cells
* `[THEME: Smart and Functional Materials]` — Shape memory alloys, actuators, sensors

---

## Summary

* **Main dependency chain:** Chemistry + Physics → Introduction to Materials Science → Physical Chemistry / Thermodynamics & Phase Diagrams → Kinetics of Phase Transformations / Mechanical Behavior → Metals / Ceramics / Polymers / Composites / Electronic Materials / Corrosion → Failure Analysis → Capstone
* **Main concept clusters:** Crystal Structure & Defects, Thermodynamics & Phase Equilibria, Transformation Kinetics, Mechanical Behavior, Material Classes (Metals, Ceramics, Polymers, Composites), Characterization, Corrosion, Electronic & Functional Properties
* **Best simulator/tool opportunities:** CES EduPack (materials selection), CALPHAD/Thermo-Calc (phase diagrams), Python (property modeling), VESTA (crystal structure visualization), ImageJ (microstructure analysis), LAMMPS/GROMACS (molecular dynamics), DFT tools (VASP, Quantum ESPRESSO), OriginLab (data analysis)

---

# Engineering Atlas — End of Document

## Cross-Major Foundation Reference

| Foundation Course         | Core | EE | ME | CE | ChE | CpE | AE | BME | IE | MatE |
|---------------------------|------|----|----|-----|-----|-----|----|-----|----|------|
| Calculus I–III            | ●    | ●  | ●  | ●   | ●   | ●   | ●  | ●   | ●  | ●    |
| Differential Equations    | ●    | ●  | ●  | ●   | ●   | ●   | ●  | ●   | ●  | ●    |
| Linear Algebra            | ●    | ●  | ●  | –   | ●   | ●   | ●  | ●   | ●  | –    |
| Physics I (Mechanics)     | ●    | ●  | ●  | ●   | ●   | ●   | ●  | ●   | ●  | ●    |
| Physics II (E&M)          | ●    | ●  | –  | –   | –   | ●   | –  | ●   | –  | ●    |
| Statistics                | ●    | ●  | ●  | ●   | ●   | ●   | ●  | ●   | ●  | ●    |
| Statics                   | ●    | –  | ●  | ●   | –   | –   | ●  | ●   | ●  | –    |
| Mechanics of Materials    | ●    | –  | ●  | ●   | –   | –   | ●  | ●   | –  | ●    |
| Thermodynamics I          | ●    | –  | ●  | –   | ●   | –   | ●  | –   | –  | –    |
| Chemistry I–II            | –    | –  | ●  | –   | ●   | –   | –  | ●   | –  | ●    |
| Biology I                 | –    | –  | –  | –   | –   | –   | –  | ●   | –  | –    |

> ● = Required  – = Not typically required or optional

