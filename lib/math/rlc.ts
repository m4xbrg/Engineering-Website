import { generateBodeData, type TransferModel } from "@/lib/math/transfer-fn";

export type CircuitResponseKind = "rc" | "rl" | "rlc";

export type ResponseMetrics = {
  tau: number | null;
  omega0: number | null;
  dampingRatio: number | null;
  qFactor: number | null;
  settlingTime: number | null;
  overshootPercent: number;
};

export function buildCircuitTransferModel({
  kind,
  resistance,
  inductance,
  capacitance,
}: {
  kind: CircuitResponseKind;
  resistance: number;
  inductance: number;
  capacitance: number;
}): TransferModel {
  if (kind === "rc") {
    const cutoff = 1 / Math.max(resistance * capacitance, 1e-12);
    return {
      gain: 1,
      zeros: [],
      poles: [{ id: "p1", kind: "real", frequency: cutoff }],
    };
  }

  if (kind === "rl") {
    const cutoff = resistance / Math.max(inductance, 1e-12);
    return {
      gain: 1,
      zeros: [],
      poles: [{ id: "p1", kind: "real", frequency: cutoff }],
    };
  }

  const omega0 = 1 / Math.sqrt(Math.max(inductance * capacitance, 1e-18));
  const dampingRatio =
    (resistance / 2) * Math.sqrt(capacitance / Math.max(inductance, 1e-12));

  return {
    gain: 1,
    zeros: [],
    poles: [
      {
        id: "pPair",
        kind: "pair",
        frequency: omega0,
        damping: dampingRatio,
      },
    ],
  };
}

export function getResponseMetrics({
  kind,
  resistance,
  inductance,
  capacitance,
}: {
  kind: CircuitResponseKind;
  resistance: number;
  inductance: number;
  capacitance: number;
}): ResponseMetrics {
  if (kind === "rc") {
    const tau = resistance * capacitance;
    return {
      tau,
      omega0: 1 / Math.max(tau, 1e-12),
      dampingRatio: null,
      qFactor: null,
      settlingTime: 4 * tau,
      overshootPercent: 0,
    };
  }

  if (kind === "rl") {
    const tau = inductance / Math.max(resistance, 1e-12);
    return {
      tau,
      omega0: 1 / Math.max(tau, 1e-12),
      dampingRatio: null,
      qFactor: null,
      settlingTime: 4 * tau,
      overshootPercent: 0,
    };
  }

  const omega0 = 1 / Math.sqrt(Math.max(inductance * capacitance, 1e-18));
  const dampingRatio =
    (resistance / 2) * Math.sqrt(capacitance / Math.max(inductance, 1e-12));
  const qFactor = dampingRatio === 0 ? Infinity : 1 / (2 * dampingRatio);
  const overshootPercent =
    dampingRatio >= 1
      ? 0
      : Math.exp((-dampingRatio * Math.PI) / Math.sqrt(1 - dampingRatio ** 2)) *
        100;

  return {
    tau: dampingRatio > 0 ? 1 / (dampingRatio * omega0) : null,
    omega0,
    dampingRatio,
    qFactor,
    settlingTime: dampingRatio > 0 ? 4 / (dampingRatio * omega0) : null,
    overshootPercent,
  };
}

export function createStepResponse({
  kind,
  resistance,
  inductance,
  capacitance,
  points = 240,
}: {
  kind: CircuitResponseKind;
  resistance: number;
  inductance: number;
  capacitance: number;
  points?: number;
}) {
  const metrics = getResponseMetrics({
    kind,
    resistance,
    inductance,
    capacitance,
  });

  const finalTime =
    metrics.settlingTime && Number.isFinite(metrics.settlingTime)
      ? metrics.settlingTime * 1.5
      : kind === "rc"
        ? resistance * capacitance * 6
        : kind === "rl"
          ? (inductance / Math.max(resistance, 1e-12)) * 6
          : 0.02;
  const timeSeries = [];

  for (let index = 0; index <= points; index += 1) {
    const time = (finalTime * index) / points;
    let response = 0;

    if (kind === "rc") {
      const tau = resistance * capacitance;
      response = 1 - Math.exp(-time / Math.max(tau, 1e-12));
    } else if (kind === "rl") {
      const tau = inductance / Math.max(resistance, 1e-12);
      response = 1 - Math.exp(-time / Math.max(tau, 1e-12));
    } else {
      const omega0 = metrics.omega0 ?? 0;
      const dampingRatio = metrics.dampingRatio ?? 1;

      if (dampingRatio < 1) {
        const omegaD = omega0 * Math.sqrt(1 - dampingRatio ** 2);
        response =
          1 -
          Math.exp(-dampingRatio * omega0 * time) *
            (Math.cos(omegaD * time) +
              (dampingRatio / Math.sqrt(1 - dampingRatio ** 2)) *
                Math.sin(omegaD * time));
      } else if (Math.abs(dampingRatio - 1) < 1e-6) {
        response = 1 - Math.exp(-omega0 * time) * (1 + omega0 * time);
      } else {
        const alpha = Math.sqrt(dampingRatio ** 2 - 1);
        const s1 = -omega0 * (dampingRatio - alpha);
        const s2 = -omega0 * (dampingRatio + alpha);
        response = 1 - (s2 * Math.exp(s1 * time) - s1 * Math.exp(s2 * time)) / (s2 - s1);
      }
    }

    timeSeries.push({
      time,
      response,
    });
  }

  return {
    points: timeSeries,
    finalTime,
    metrics,
  };
}

export function createFrequencyResponse({
  kind,
  resistance,
  inductance,
  capacitance,
  startDecade = 0,
  endDecade = 6,
}: {
  kind: CircuitResponseKind;
  resistance: number;
  inductance: number;
  capacitance: number;
  startDecade?: number;
  endDecade?: number;
}) {
  return generateBodeData({
    model: buildCircuitTransferModel({
      kind,
      resistance,
      inductance,
      capacitance,
    }),
    startDecade,
    endDecade,
  });
}

