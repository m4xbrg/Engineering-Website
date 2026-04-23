export type TransferFactorKind = "real" | "pair";

export type TransferFactor = {
  id: string;
  kind: TransferFactorKind;
  frequency: number;
  damping?: number;
};

export type TransferModel = {
  gain: number;
  zeros: TransferFactor[];
  poles: TransferFactor[];
};

export type BodePoint = {
  omega: number;
  magnitude: number;
  phase: number;
  asymptoteMagnitude: number;
  asymptotePhase: number;
};

function exactFactorResponse(factor: TransferFactor, omega: number) {
  const ratio = omega / factor.frequency;

  if (factor.kind === "real") {
    return {
      magnitude: Math.hypot(1, ratio),
      phase: (Math.atan(ratio) * 180) / Math.PI,
    };
  }

  const damping = factor.damping ?? 0.5;
  const real = 1 - ratio * ratio;
  const imaginary = 2 * damping * ratio;

  return {
    magnitude: Math.hypot(real, imaginary),
    phase: (Math.atan2(imaginary, real) * 180) / Math.PI,
  };
}

function asymptoteFactorResponse(factor: TransferFactor, omega: number) {
  const ratio = omega / factor.frequency;
  const lowerTransition = factor.frequency / 10;
  const upperTransition = factor.frequency * 10;

  if (factor.kind === "real") {
    let phase = 0;

    if (omega <= lowerTransition) {
      phase = 0;
    } else if (omega >= upperTransition) {
      phase = 90;
    } else {
      phase = 45 * (Math.log10(omega / lowerTransition));
    }

    return {
      magnitude: ratio > 1 ? 20 * Math.log10(ratio) : 0,
      phase,
    };
  }

  let phase = 0;

  if (omega <= lowerTransition) {
    phase = 0;
  } else if (omega >= upperTransition) {
    phase = 180;
  } else {
    phase = 90 * Math.log10(omega / lowerTransition);
  }

  return {
    magnitude: ratio > 1 ? 40 * Math.log10(ratio) : 0,
    phase,
  };
}

function interpolateCrossing(
  lowX: number,
  lowY: number,
  highX: number,
  highY: number,
  target: number,
) {
  if (highY === lowY) {
    return lowX;
  }

  const fraction = (target - lowY) / (highY - lowY);
  return lowX + fraction * (highX - lowX);
}

function interpolateValueAtX(
  lowX: number,
  lowY: number,
  highX: number,
  highY: number,
  targetX: number,
) {
  if (highX === lowX) {
    return lowY;
  }

  const fraction = (targetX - lowX) / (highX - lowX);
  return lowY + fraction * (highY - lowY);
}

function findCrossing(points: BodePoint[], key: "magnitude" | "phase", target: number) {
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const previousValue = previous[key];
    const currentValue = current[key];
    const crossesTarget =
      (previousValue <= target && currentValue >= target) ||
      (previousValue >= target && currentValue <= target);

    if (!crossesTarget) {
      continue;
    }

    const omega = interpolateCrossing(
      previous.omega,
      previousValue,
      current.omega,
      currentValue,
      target,
    );
    const otherKey = key === "magnitude" ? "phase" : "magnitude";
    const otherValue = interpolateValueAtX(
      previous.omega,
      previous[otherKey],
      current.omega,
      current[otherKey],
      omega,
    );

    return { omega, [otherKey]: otherValue } as {
      omega: number;
      phase?: number;
      magnitude?: number;
    };
  }

  return null;
}

export function generateBodeData({
  model,
  startDecade,
  endDecade,
  points = 240,
}: {
  model: TransferModel;
  startDecade: number;
  endDecade: number;
  points?: number;
}) {
  const data: BodePoint[] = [];

  for (let index = 0; index < points; index += 1) {
    const exponent =
      startDecade + ((endDecade - startDecade) * index) / (points - 1);
    const omega = 10 ** exponent;
    let magnitude = 20 * Math.log10(Math.abs(model.gain));
    let phase = model.gain >= 0 ? 0 : 180;
    let asymptoteMagnitude = magnitude;
    let asymptotePhase = phase;

    for (const zero of model.zeros) {
      const exact = exactFactorResponse(zero, omega);
      const asymptote = asymptoteFactorResponse(zero, omega);
      magnitude += 20 * Math.log10(exact.magnitude);
      phase += exact.phase;
      asymptoteMagnitude += asymptote.magnitude;
      asymptotePhase += asymptote.phase;
    }

    for (const pole of model.poles) {
      const exact = exactFactorResponse(pole, omega);
      const asymptote = asymptoteFactorResponse(pole, omega);
      magnitude -= 20 * Math.log10(exact.magnitude);
      phase -= exact.phase;
      asymptoteMagnitude -= asymptote.magnitude;
      asymptotePhase -= asymptote.phase;
    }

    data.push({
      omega,
      magnitude,
      phase,
      asymptoteMagnitude,
      asymptotePhase,
    });
  }

  const gainCrossing = findCrossing(data, "magnitude", 0);
  const phaseCrossing = findCrossing(data, "phase", -180);
  const phaseMargin = gainCrossing?.phase !== undefined ? 180 + gainCrossing.phase : null;
  const gainMargin =
    phaseCrossing?.magnitude !== undefined ? -phaseCrossing.magnitude : null;
  const stability =
    phaseMargin === null || gainMargin === null
      ? "open-loop only"
      : phaseMargin > 10 && gainMargin > 6
        ? "stable"
        : phaseMargin >= 0 && gainMargin >= 0
          ? "marginal"
          : "unstable";

  return {
    data,
    gainCrossing,
    phaseCrossing,
    phaseMargin,
    gainMargin,
    stability,
  };
}
