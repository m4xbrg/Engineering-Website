"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

import type { ToolSlug } from "@/types";

const toolComponents = {
  "unit-converter": dynamic(
    () => import("@/tools/unit-converter/UnitConverterTool"),
    {
      ssr: false,
    },
  ),
  "ohms-law": dynamic(() => import("@/tools/ohms-law/OhmsLawTool"), {
    ssr: false,
  }),
  "resistor-color-code": dynamic(
    () => import("@/tools/resistor-color-code/ResistorColorCodeTool"),
    { ssr: false },
  ),
  "logic-gate-sim": dynamic(
    () => import("@/tools/logic-gate-sim/LogicGateTool"),
    {
      ssr: false,
    },
  ),
  "rlc-response": dynamic(
    () => import("@/tools/rlc-response/RLCResponseTool"),
    {
      ssr: false,
    },
  ),
  "fourier-series": dynamic(
    () => import("@/tools/fourier-series/FourierSeriesTool"),
    {
      ssr: false,
    },
  ),
  "bode-plot": dynamic(() => import("@/tools/bode-plot/BodePlotTool"), {
    ssr: false,
  }),
  "phasor-calc": dynamic(() => import("@/tools/phasor-calc/PhasorCalcTool"), {
    ssr: false,
  }),
  "opamp-config": dynamic(() => import("@/tools/opamp-config/OpAmpTool"), {
    ssr: false,
  }),
  "fbd-builder": dynamic(() => import("@/tools/fbd-builder/FBDTool"), {
    ssr: false,
  }),
  "diode-bjt-curves": dynamic(
    () => import("@/tools/diode-bjt-curves/DiodeBjtCurvesTool"),
    {
      ssr: false,
    },
  ),
  "beam-stress-deflection": dynamic(
    () => import("@/tools/beam-stress-deflection/BeamStressDeflectionTool"),
    {
      ssr: false,
    },
  ),
} satisfies Record<ToolSlug, ComponentType>;

type ToolRuntimeProps = {
  toolSlug: ToolSlug;
};

export function ToolRuntime({ toolSlug }: ToolRuntimeProps) {
  const ToolComponent = toolComponents[toolSlug];
  return <ToolComponent />;
}
