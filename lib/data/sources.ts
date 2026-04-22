import aerospaceEngineering from "@/data/majors/aerospace-engineering.json";
import biomedicalEngineering from "@/data/majors/biomedical-engineering.json";
import chemicalEngineering from "@/data/majors/chemical-engineering.json";
import civilEngineering from "@/data/majors/civil-engineering.json";
import computerEngineering from "@/data/majors/computer-engineering.json";
import coreEngineering from "@/data/majors/core.json";
import electricalEngineering from "@/data/majors/electrical-engineering.json";
import industrialEngineering from "@/data/majors/industrial-engineering.json";
import materialsEngineering from "@/data/majors/materials-engineering.json";
import mechanicalEngineering from "@/data/majors/mechanical-engineering.json";
import glossaryRecords from "@/data/glossary/glossary.json";
import clusterRelationships from "@/data/graph/cluster-relationships.json";
import prerequisites from "@/data/graph/prerequisites.json";
import toolLinks from "@/data/graph/tool-links.json";
import concepts from "@/data/concepts/concepts.json";
import aerospaceIntro from "@/data/courses/aerospace-engineering/introduction-to-aerospace-engineering.json";
import bioInstrumentation from "@/data/courses/biomedical-engineering/bioinstrumentation.json";
import materialEnergyBalances from "@/data/courses/chemical-engineering/material-energy-balances.json";
import structuralAnalysis from "@/data/courses/civil-engineering/structural-analysis-i.json";
import digitalLogic from "@/data/courses/computer-engineering/digital-logic-design.json";
import calculusI from "@/data/courses/core/calculus-i.json";
import statics from "@/data/courses/core/statics.json";
import circuitAnalysisI from "@/data/courses/electrical-engineering/circuit-analysis-i.json";
import controlSystems from "@/data/courses/electrical-engineering/control-systems-ee.json";
import signalsAndSystems from "@/data/courses/electrical-engineering/signals-and-systems.json";
import operationsResearch from "@/data/courses/industrial-engineering/operations-research-i.json";
import materialsScience from "@/data/courses/materials-engineering/introduction-to-materials-science.json";
import fluidMechanics from "@/data/courses/mechanical-engineering/fluid-mechanics-me.json";
import majorsIndex from "@/data/taxonomy/majors-index.json";
import stages from "@/data/taxonomy/stages.json";
import topicClusters from "@/data/taxonomy/topic-clusters.json";
import tools from "@/data/tools/tools.json";

export const majorSources = {
  core: coreEngineering,
  "electrical-engineering": electricalEngineering,
  "mechanical-engineering": mechanicalEngineering,
  "civil-engineering": civilEngineering,
  "chemical-engineering": chemicalEngineering,
  "computer-engineering": computerEngineering,
  "aerospace-engineering": aerospaceEngineering,
  "biomedical-engineering": biomedicalEngineering,
  "industrial-engineering": industrialEngineering,
  "materials-engineering": materialsEngineering,
} as const;

export const courseSources = [
  calculusI,
  statics,
  circuitAnalysisI,
  signalsAndSystems,
  controlSystems,
  fluidMechanics,
  structuralAnalysis,
  materialEnergyBalances,
  digitalLogic,
  aerospaceIntro,
  bioInstrumentation,
  operationsResearch,
  materialsScience,
] as const;

export const glossarySource = glossaryRecords;
export const conceptSource = concepts;
export const stagesSource = stages;
export const topicClusterSource = topicClusters;
export const toolsSource = tools;
export const majorsIndexSource = majorsIndex;
export const prerequisiteSource = prerequisites;
export const clusterRelationshipSource = clusterRelationships;
export const toolLinkSource = toolLinks;
