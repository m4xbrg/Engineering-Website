export type BeamSupportType = "simply-supported" | "cantilever" | "fixed-fixed";
export type BeamLoadType = "point" | "udl";

export type BeamAnalysisInput = {
  supportType: BeamSupportType;
  loadType: BeamLoadType;
  lengthMeters: number;
  elasticModulusPa: number;
  widthMeters: number;
  heightMeters: number;
  pointLoadNewton: number;
  uniformLoadNewtonPerMeter: number;
  pointPositionMeters: number;
  points?: number;
};

export type BeamChartPoint = {
  xMeters: number;
  shearKilonewtons: number;
  momentKilonewtonMeters: number;
  deflectionMillimeters: number;
  stressMegaPascals: number;
};

type ReactionSummary = {
  leftReactionNewton: number;
  rightReactionNewton: number | null;
  leftMomentNewtonMeters: number;
  rightMomentNewtonMeters: number;
};

type PeakSummary = {
  value: number;
  xMeters: number;
};

function safeDivide(numerator: number, denominator: number) {
  return denominator === 0 ? 0 : numerator / denominator;
}

function pointDeflectionSimplySupported(
  x: number,
  load: number,
  length: number,
  position: number,
  modulusTimesInertia: number,
) {
  const b = length - position;

  if (x <= position) {
    return (
      (load * b * x * (length * length - b * b - x * x)) /
      (6 * length * modulusTimesInertia)
    );
  }

  const remaining = length - x;
  return (
    (load *
      position *
      remaining *
      (length * length - position * position - remaining * remaining)) /
    (6 * length * modulusTimesInertia)
  );
}

function pointDeflectionCantilever(
  x: number,
  load: number,
  position: number,
  modulusTimesInertia: number,
) {
  if (x <= position) {
    return (load * x * x * (3 * position - x)) / (6 * modulusTimesInertia);
  }

  return (
    (load * position * position * (3 * x - position)) /
    (6 * modulusTimesInertia)
  );
}

function pointDeflectionFixedFixed(
  x: number,
  load: number,
  length: number,
  modulusTimesInertia: number,
) {
  if (x <= length / 2) {
    return (load * x * x * (3 * length - 4 * x)) / (48 * modulusTimesInertia);
  }

  const remaining = length - x;
  return (
    (load * remaining * remaining * (4 * x - length)) /
    (48 * modulusTimesInertia)
  );
}

function uniformDeflectionSimplySupported(
  x: number,
  load: number,
  length: number,
  modulusTimesInertia: number,
) {
  return (
    (load *
      x *
      (Math.pow(length, 3) - 2 * length * x * x + Math.pow(x, 3))) /
    (24 * modulusTimesInertia)
  );
}

function uniformDeflectionCantilever(
  x: number,
  load: number,
  length: number,
  modulusTimesInertia: number,
) {
  return (
    (load * x * x * (6 * length * length - 4 * length * x + x * x)) /
    (24 * modulusTimesInertia)
  );
}

function uniformDeflectionFixedFixed(
  x: number,
  load: number,
  length: number,
  modulusTimesInertia: number,
) {
  return (
    (load * x * x * Math.pow(length - x, 2)) /
    (24 * modulusTimesInertia)
  );
}

function getReactions({
  supportType,
  loadType,
  lengthMeters,
  pointLoadNewton,
  uniformLoadNewtonPerMeter,
  pointPositionMeters,
}: BeamAnalysisInput): ReactionSummary {
  if (supportType === "simply-supported" && loadType === "point") {
    const leftReactionNewton =
      (pointLoadNewton * (lengthMeters - pointPositionMeters)) / lengthMeters;
    const rightReactionNewton =
      (pointLoadNewton * pointPositionMeters) / lengthMeters;

    return {
      leftReactionNewton,
      rightReactionNewton,
      leftMomentNewtonMeters: 0,
      rightMomentNewtonMeters: 0,
    };
  }

  if (supportType === "simply-supported") {
    const reaction = (uniformLoadNewtonPerMeter * lengthMeters) / 2;
    return {
      leftReactionNewton: reaction,
      rightReactionNewton: reaction,
      leftMomentNewtonMeters: 0,
      rightMomentNewtonMeters: 0,
    };
  }

  if (supportType === "cantilever" && loadType === "point") {
    return {
      leftReactionNewton: pointLoadNewton,
      rightReactionNewton: null,
      leftMomentNewtonMeters: pointLoadNewton * pointPositionMeters,
      rightMomentNewtonMeters: 0,
    };
  }

  if (supportType === "cantilever") {
    return {
      leftReactionNewton: uniformLoadNewtonPerMeter * lengthMeters,
      rightReactionNewton: null,
      leftMomentNewtonMeters:
        (uniformLoadNewtonPerMeter * lengthMeters * lengthMeters) / 2,
      rightMomentNewtonMeters: 0,
    };
  }

  if (loadType === "point") {
    const reaction = pointLoadNewton / 2;
    const fixedMoment = (pointLoadNewton * lengthMeters) / 8;
    return {
      leftReactionNewton: reaction,
      rightReactionNewton: reaction,
      leftMomentNewtonMeters: fixedMoment,
      rightMomentNewtonMeters: fixedMoment,
    };
  }

  const reaction = (uniformLoadNewtonPerMeter * lengthMeters) / 2;
  const fixedMoment = (uniformLoadNewtonPerMeter * lengthMeters * lengthMeters) / 12;
  return {
    leftReactionNewton: reaction,
    rightReactionNewton: reaction,
    leftMomentNewtonMeters: fixedMoment,
    rightMomentNewtonMeters: fixedMoment,
  };
}

function getShearAtX(input: BeamAnalysisInput, x: number) {
  const {
    supportType,
    loadType,
    lengthMeters,
    pointLoadNewton,
    uniformLoadNewtonPerMeter,
    pointPositionMeters,
  } = input;

  if (supportType === "simply-supported" && loadType === "point") {
    const leftReactionNewton =
      (pointLoadNewton * (lengthMeters - pointPositionMeters)) / lengthMeters;
    return x < pointPositionMeters
      ? leftReactionNewton
      : leftReactionNewton - pointLoadNewton;
  }

  if (supportType === "simply-supported") {
    return uniformLoadNewtonPerMeter * (lengthMeters / 2 - x);
  }

  if (supportType === "cantilever" && loadType === "point") {
    return x <= pointPositionMeters ? pointLoadNewton : 0;
  }

  if (supportType === "cantilever") {
    return uniformLoadNewtonPerMeter * (lengthMeters - x);
  }

  if (loadType === "point") {
    return x < lengthMeters / 2 ? pointLoadNewton / 2 : -pointLoadNewton / 2;
  }

  return uniformLoadNewtonPerMeter * (lengthMeters / 2 - x);
}

function getMomentAtX(input: BeamAnalysisInput, x: number) {
  const {
    supportType,
    loadType,
    lengthMeters,
    pointLoadNewton,
    uniformLoadNewtonPerMeter,
    pointPositionMeters,
  } = input;

  if (supportType === "simply-supported" && loadType === "point") {
    const leftReactionNewton =
      (pointLoadNewton * (lengthMeters - pointPositionMeters)) / lengthMeters;
    return x < pointPositionMeters
      ? leftReactionNewton * x
      : leftReactionNewton * x - pointLoadNewton * (x - pointPositionMeters);
  }

  if (supportType === "simply-supported") {
    return (uniformLoadNewtonPerMeter * x * (lengthMeters - x)) / 2;
  }

  if (supportType === "cantilever" && loadType === "point") {
    return x <= pointPositionMeters
      ? -pointLoadNewton * (pointPositionMeters - x)
      : 0;
  }

  if (supportType === "cantilever") {
    return (-uniformLoadNewtonPerMeter * Math.pow(lengthMeters - x, 2)) / 2;
  }

  if (loadType === "point") {
    return x <= lengthMeters / 2
      ? (-pointLoadNewton * lengthMeters) / 8 + (pointLoadNewton * x) / 2
      : (-pointLoadNewton * lengthMeters) / 8 +
          (pointLoadNewton * (lengthMeters - x)) / 2;
  }

  return (
    (-uniformLoadNewtonPerMeter * lengthMeters * lengthMeters) / 12 +
    (uniformLoadNewtonPerMeter * lengthMeters * x) / 2 -
    (uniformLoadNewtonPerMeter * x * x) / 2
  );
}

function getDeflectionAtX(
  input: BeamAnalysisInput,
  x: number,
  modulusTimesInertia: number,
) {
  const {
    supportType,
    loadType,
    lengthMeters,
    pointLoadNewton,
    uniformLoadNewtonPerMeter,
    pointPositionMeters,
  } = input;

  if (supportType === "simply-supported" && loadType === "point") {
    return pointDeflectionSimplySupported(
      x,
      pointLoadNewton,
      lengthMeters,
      pointPositionMeters,
      modulusTimesInertia,
    );
  }

  if (supportType === "simply-supported") {
    return uniformDeflectionSimplySupported(
      x,
      uniformLoadNewtonPerMeter,
      lengthMeters,
      modulusTimesInertia,
    );
  }

  if (supportType === "cantilever" && loadType === "point") {
    return pointDeflectionCantilever(
      x,
      pointLoadNewton,
      pointPositionMeters,
      modulusTimesInertia,
    );
  }

  if (supportType === "cantilever") {
    return uniformDeflectionCantilever(
      x,
      uniformLoadNewtonPerMeter,
      lengthMeters,
      modulusTimesInertia,
    );
  }

  if (loadType === "point") {
    return pointDeflectionFixedFixed(
      x,
      pointLoadNewton,
      lengthMeters,
      modulusTimesInertia,
    );
  }

  return uniformDeflectionFixedFixed(
    x,
    uniformLoadNewtonPerMeter,
    lengthMeters,
    modulusTimesInertia,
  );
}

function getPeak(values: BeamChartPoint[], key: keyof BeamChartPoint): PeakSummary {
  return values.reduce<PeakSummary>(
    (peak, point) =>
      Math.abs(Number(point[key])) > Math.abs(peak.value)
        ? { value: Number(point[key]), xMeters: point.xMeters }
        : peak,
    { value: 0, xMeters: 0 },
  );
}

export function analyzeBeam(input: BeamAnalysisInput) {
  const points = input.points ?? 160;
  const adjustedPointPositionMeters =
    input.supportType === "fixed-fixed" && input.loadType === "point"
      ? input.lengthMeters / 2
      : input.pointPositionMeters;

  const normalizedInput = {
    ...input,
    pointPositionMeters: adjustedPointPositionMeters,
  };

  const secondMomentOfArea =
    (input.widthMeters * Math.pow(input.heightMeters, 3)) / 12;
  const modulusTimesInertia = input.elasticModulusPa * secondMomentOfArea;
  const outerFiberDistance = input.heightMeters / 2;
  const reactions = getReactions(normalizedInput);

  const data: BeamChartPoint[] = [];

  for (let index = 0; index < points; index += 1) {
    const xMeters = (input.lengthMeters * index) / (points - 1);
    const shearNewton = getShearAtX(normalizedInput, xMeters);
    const momentNewtonMeters = getMomentAtX(normalizedInput, xMeters);
    const deflectionMeters = getDeflectionAtX(
      normalizedInput,
      xMeters,
      modulusTimesInertia,
    );
    const stressPa = safeDivide(momentNewtonMeters * outerFiberDistance, secondMomentOfArea);

    data.push({
      xMeters,
      shearKilonewtons: shearNewton / 1000,
      momentKilonewtonMeters: momentNewtonMeters / 1000,
      deflectionMillimeters: deflectionMeters * 1000,
      stressMegaPascals: stressPa / 1_000_000,
    });
  }

  return {
    adjustedPointPositionMeters,
    secondMomentOfArea,
    sectionModulus: safeDivide(secondMomentOfArea, outerFiberDistance),
    reactions,
    data,
    maxShear: getPeak(data, "shearKilonewtons"),
    maxMoment: getPeak(data, "momentKilonewtonMeters"),
    maxDeflection: getPeak(data, "deflectionMillimeters"),
    maxStress: getPeak(data, "stressMegaPascals"),
  };
}
