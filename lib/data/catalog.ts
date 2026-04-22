import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

import {
  conceptSchema,
  courseSchema,
  glossaryEntrySchema,
  majorIndexItemSchema,
  majorSchema,
  prereqEdgeSchema,
  stageRegistrySchema,
  toolSchema,
  topicClusterSchema,
} from "@/lib/schemas";
import type {
  Concept,
  Course,
  GlossaryEntry,
  Major,
  MajorIndexItem,
  PrereqEdge,
  StageRegistryRecord,
  ToolDefinition,
  TopicCluster,
} from "@/types";

const DATA_ROOT = join(process.cwd(), "data");

type Catalog = {
  majors: Major[];
  majorsIndex: MajorIndexItem[];
  courses: Course[];
  concepts: Concept[];
  glossary: GlossaryEntry[];
  dependencies: PrereqEdge[];
  stages: StageRegistryRecord[];
  topicClusters: TopicCluster[];
  tools: ToolDefinition[];
};

let cachedCatalog: Catalog | null = null;

function readJsonFile<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf8")) as T;
}

function readJsonDirectory<T>(directory: string): T[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolutePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      return readJsonDirectory<T>(absolutePath);
    }

    if (!entry.isFile() || !entry.name.endsWith(".json")) {
      return [];
    }

    return [readJsonFile<T>(absolutePath)];
  });
}

function validateCatalog(catalog: Catalog) {
  const majorIds = new Set(catalog.majors.map((major) => major.id));
  const courseIds = new Set(catalog.courses.map((course) => course.id));
  const conceptIds = new Set(catalog.concepts.map((concept) => concept.id));
  const toolIds = new Set(catalog.tools.map((tool) => tool.id));
  const stageIds = new Set(catalog.stages.map((stage) => stage.id));
  const glossaryIds = new Set(catalog.glossary.map((entry) => entry.id));
  const clusterIds = new Set(catalog.topicClusters.map((cluster) => cluster.id));

  for (const major of catalog.majors) {
    for (const courseId of major.coreFoundationIds) {
      assertRef(courseIds, courseId, `major:${major.id}.coreFoundationIds`);
    }

    for (const clusterId of major.conceptClusters) {
      assertRef(clusterIds, clusterId, `major:${major.id}.conceptClusters`);
    }

    for (const toolId of major.recommendedTools) {
      assertRef(toolIds, toolId, `major:${major.id}.recommendedTools`);
    }

    for (const stage of major.stages) {
      assertRef(stageIds, stage.id, `major:${major.id}.stages`);
      for (const courseId of stage.courseIds) {
        assertRef(courseIds, courseId, `major:${major.id}.stages.${stage.id}.courseIds`);
      }
    }
  }

  for (const course of catalog.courses) {
    assertRef(majorIds, course.majorId, `course:${course.id}.majorId`);
    assertRef(stageIds, course.stageId, `course:${course.id}.stageId`);

    for (const prereqId of course.prereqs) {
      assertRef(courseIds, prereqId, `course:${course.id}.prereqs`);
    }

    for (const leadId of course.leadsInto) {
      assertRef(courseIds, leadId, `course:${course.id}.leadsInto`);
    }

    for (const conceptId of course.concepts) {
      assertRef(conceptIds, conceptId, `course:${course.id}.concepts`);
    }

    for (const clusterId of course.topicClusters) {
      assertRef(clusterIds, clusterId, `course:${course.id}.topicClusters`);
    }

    for (const toolId of course.relatedTools) {
      assertRef(toolIds, toolId, `course:${course.id}.relatedTools`);
    }
  }

  for (const concept of catalog.concepts) {
    for (const courseId of concept.taughtIn) {
      assertRef(courseIds, courseId, `concept:${concept.id}.taughtIn`);
    }

    for (const toolId of concept.toolLinks) {
      assertRef(toolIds, toolId, `concept:${concept.id}.toolLinks`);
    }

    for (const relatedConceptId of concept.relatedConcepts) {
      assertRef(conceptIds, relatedConceptId, `concept:${concept.id}.relatedConcepts`);
    }

    for (const clusterId of concept.topicClusters) {
      assertRef(clusterIds, clusterId, `concept:${concept.id}.topicClusters`);
    }

    for (const majorId of concept.majorTags) {
      assertRef(majorIds, majorId, `concept:${concept.id}.majorTags`);
    }
  }

  for (const tool of catalog.tools) {
    for (const majorId of tool.majorIds) {
      assertRef(majorIds, majorId, `tool:${tool.id}.majorIds`);
    }

    for (const courseId of tool.courseIds) {
      assertRef(courseIds, courseId, `tool:${tool.id}.courseIds`);
    }

    for (const conceptId of tool.conceptIds) {
      assertRef(conceptIds, conceptId, `tool:${tool.id}.conceptIds`);
    }

    for (const clusterId of tool.clusterIds) {
      assertRef(clusterIds, clusterId, `tool:${tool.id}.clusterIds`);
    }
  }

  for (const dependency of catalog.dependencies) {
    assertRef(courseIds, dependency.from, `dependency:${dependency.id}.from`);
    assertRef(courseIds, dependency.to, `dependency:${dependency.id}.to`);
  }

  for (const glossaryEntry of catalog.glossary) {
    if (glossaryEntry.conceptId) {
      assertRef(conceptIds, glossaryEntry.conceptId, `glossary:${glossaryEntry.id}.conceptId`);
    }

    for (const relatedConceptId of glossaryEntry.relatedConcepts) {
      assertRef(conceptIds, relatedConceptId, `glossary:${glossaryEntry.id}.relatedConcepts`);
    }

    for (const relatedTermId of glossaryEntry.relatedTerms) {
      assertRef(glossaryIds, relatedTermId, `glossary:${glossaryEntry.id}.relatedTerms`);
    }
  }

  for (const cluster of catalog.topicClusters) {
    for (const majorId of cluster.primaryMajors) {
      assertRef(majorIds, majorId, `cluster:${cluster.id}.primaryMajors`);
    }

    for (const courseId of cluster.courseIds) {
      assertRef(courseIds, courseId, `cluster:${cluster.id}.courseIds`);
    }

    for (const conceptId of cluster.conceptIds) {
      assertRef(conceptIds, conceptId, `cluster:${cluster.id}.conceptIds`);
    }

    for (const toolId of cluster.toolIds) {
      assertRef(toolIds, toolId, `cluster:${cluster.id}.toolIds`);
    }
  }
}

function assertRef(collection: Set<string>, value: string, location: string) {
  if (!collection.has(value)) {
    throw new Error(`Unresolved reference '${value}' at ${location}`);
  }
}

export function getCatalog() {
  if (cachedCatalog) {
    return cachedCatalog;
  }

  const catalog: Catalog = {
    majors: majorSchema.array().parse(readJsonDirectory(join(DATA_ROOT, "majors"))),
    majorsIndex: majorIndexItemSchema
      .array()
      .parse(readJsonFile(join(DATA_ROOT, "taxonomy", "majors-index.json"))),
    courses: courseSchema.array().parse(readJsonDirectory(join(DATA_ROOT, "courses"))),
    concepts: conceptSchema
      .array()
      .parse(readJsonFile(join(DATA_ROOT, "concepts", "concepts.json"))),
    glossary: glossaryEntrySchema
      .array()
      .parse(readJsonFile(join(DATA_ROOT, "glossary", "glossary.json"))),
    dependencies: prereqEdgeSchema
      .array()
      .parse(readJsonFile(join(DATA_ROOT, "graph", "dependencies.json"))),
    stages: stageRegistrySchema
      .array()
      .parse(readJsonFile(join(DATA_ROOT, "taxonomy", "stages.json"))),
    topicClusters: topicClusterSchema
      .array()
      .parse(readJsonFile(join(DATA_ROOT, "taxonomy", "topic-clusters.json"))),
    tools: toolSchema
      .array()
      .parse(readJsonFile(join(DATA_ROOT, "tools", "tools.json"))),
  };

  validateCatalog(catalog);
  cachedCatalog = catalog;
  return catalog;
}
