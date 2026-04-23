export type FourierWaveform =
  | "square"
  | "sawtooth"
  | "triangle"
  | "half-wave-rectified";

export type FourierCoefficient = {
  harmonic: number;
  a: number;
  b: number;
  magnitude: number;
};

export function waveformLabel(waveform: FourierWaveform) {
  return {
    square: "Square",
    sawtooth: "Sawtooth",
    triangle: "Triangle",
    "half-wave-rectified": "Half-wave rectified sine",
  }[waveform];
}

export function sampleWaveform(waveform: FourierWaveform, angle: number) {
  const wrapped = ((angle + Math.PI) % (2 * Math.PI)) - Math.PI;

  switch (waveform) {
    case "square":
      return wrapped >= 0 ? 1 : -1;
    case "sawtooth":
      return wrapped / Math.PI;
    case "triangle":
      return 1 - (2 * Math.abs(wrapped)) / Math.PI;
    case "half-wave-rectified":
      return Math.max(0, Math.sin(wrapped));
  }
}

export function computeFourierCoefficients(
  waveform: FourierWaveform,
  harmonics: number,
  samples = 2048,
) {
  const delta = (2 * Math.PI) / samples;
  let a0Accumulator = 0;
  const coefficients: FourierCoefficient[] = [];

  for (let index = 0; index < samples; index += 1) {
    const angle = -Math.PI + index * delta;
    a0Accumulator += sampleWaveform(waveform, angle);
  }

  const a0 = (2 * a0Accumulator) / samples;

  for (let harmonic = 1; harmonic <= harmonics; harmonic += 1) {
    let aAccumulator = 0;
    let bAccumulator = 0;

    for (let index = 0; index < samples; index += 1) {
      const angle = -Math.PI + index * delta;
      const value = sampleWaveform(waveform, angle);
      aAccumulator += value * Math.cos(harmonic * angle);
      bAccumulator += value * Math.sin(harmonic * angle);
    }

    const a = (2 * aAccumulator) / samples;
    const b = (2 * bAccumulator) / samples;

    coefficients.push({
      harmonic,
      a,
      b,
      magnitude: Math.hypot(a, b),
    });
  }

  return { a0, coefficients };
}

export function evaluateFourierSeriesAt(
  angle: number,
  coefficients: { a0: number; coefficients: FourierCoefficient[] },
  harmonics: number,
) {
  let sum = coefficients.a0 / 2;

  for (const coefficient of coefficients.coefficients.slice(0, harmonics)) {
    sum +=
      coefficient.a * Math.cos(coefficient.harmonic * angle) +
      coefficient.b * Math.sin(coefficient.harmonic * angle);
  }

  return sum;
}

export function createFourierTimeSeries(
  waveform: FourierWaveform,
  coefficients: { a0: number; coefficients: FourierCoefficient[] },
  harmonics: number,
  points = 240,
) {
  const series = [];
  let squaredError = 0;

  for (let index = 0; index <= points; index += 1) {
    const angle = -Math.PI + (2 * Math.PI * index) / points;
    const target = sampleWaveform(waveform, angle);
    const approximation = evaluateFourierSeriesAt(angle, coefficients, harmonics);
    squaredError += (target - approximation) ** 2;

    const harmonicLines = coefficients.coefficients.slice(0, Math.min(harmonics, 4)).reduce(
      (accumulator, coefficient) => {
        accumulator[`h${coefficient.harmonic}`] =
          coefficient.a * Math.cos(coefficient.harmonic * angle) +
          coefficient.b * Math.sin(coefficient.harmonic * angle);

        return accumulator;
      },
      {} as Record<string, number>,
    );

    series.push({
      angle,
      target,
      approximation,
      ...harmonicLines,
    });
  }

  return {
    points: series,
    rmsError: Math.sqrt(squaredError / (points + 1)),
  };
}

