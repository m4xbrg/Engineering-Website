export type DeviceCurvePoint = Record<string, number>;

export type DiodeCurveInput = {
  saturationCurrentNanoAmp: number;
  idealityFactor: number;
  thermalVoltageMilliVolt: number;
  supplyVoltage: number;
  loadResistanceOhms: number;
  points?: number;
};

export type BjtCurveInput = {
  beta: number;
  selectedBaseCurrentMicroAmp: number;
  collectorResistanceOhms: number;
  supplyVoltage: number;
  points?: number;
};

export type OperatingPoint = {
  voltage: number;
  currentMilliAmp: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function diodeCurrentMilliAmp(
  voltage: number,
  saturationCurrentAmp: number,
  idealityFactor: number,
  thermalVoltageVolt: number,
) {
  const exponent = clamp(
    voltage / Math.max(idealityFactor * thermalVoltageVolt, 1e-9),
    -40,
    40,
  );
  return saturationCurrentAmp * (Math.exp(exponent) - 1) * 1000;
}

function bjtCollectorCurrentMilliAmp(
  voltage: number,
  baseCurrentAmp: number,
  beta: number,
) {
  const activeCurrentMilliAmp = beta * baseCurrentAmp * 1000;
  const saturationFactor = 1 - Math.exp(-Math.max(voltage, 0) / 0.14);
  const earlyEffect = 1 + Math.max(voltage, 0) / 120;
  return Math.max(activeCurrentMilliAmp * saturationFactor * earlyEffect, 0);
}

export function generateDiodeCurve(input: DiodeCurveInput) {
  const points = input.points ?? 220;
  const saturationCurrentAmp = input.saturationCurrentNanoAmp * 1e-9;
  const thermalVoltageVolt = input.thermalVoltageMilliVolt / 1000;
  const maxVoltage = Math.max(1.1, input.supplyVoltage + 0.1);
  const data: DeviceCurvePoint[] = [];
  let bestPoint: OperatingPoint = { voltage: 0, currentMilliAmp: 0 };
  let smallestGap = Number.POSITIVE_INFINITY;

  for (let index = 0; index < points; index += 1) {
    const voltage = (maxVoltage * index) / (points - 1);
    const deviceCurrentMilliAmp = diodeCurrentMilliAmp(
      voltage,
      saturationCurrentAmp,
      input.idealityFactor,
      thermalVoltageVolt,
    );
    const loadCurrentMilliAmp = Math.max(
      ((input.supplyVoltage - voltage) / input.loadResistanceOhms) * 1000,
      0,
    );
    const chartCurrentMilliAmp = clamp(deviceCurrentMilliAmp, -1, 80);

    if (Math.abs(deviceCurrentMilliAmp - loadCurrentMilliAmp) < smallestGap) {
      smallestGap = Math.abs(deviceCurrentMilliAmp - loadCurrentMilliAmp);
      bestPoint = {
        voltage,
        currentMilliAmp: Math.max(deviceCurrentMilliAmp, 0),
      };
    }

    data.push({
      voltage,
      diodeCurrentMilliAmp: chartCurrentMilliAmp,
      loadLineMilliAmp: loadCurrentMilliAmp,
    });
  }

  const thresholdVoltage =
    data.find((point) => point.diodeCurrentMilliAmp >= 1)?.voltage ?? bestPoint.voltage;

  return {
    data,
    qPoint: bestPoint,
    thresholdVoltage,
  };
}

export function generateBjtCurves(input: BjtCurveInput) {
  const points = input.points ?? 240;
  const maxVoltage = Math.max(0.5, input.supplyVoltage);
  const baseCurrentsMicroAmp = [
    Math.max(input.selectedBaseCurrentMicroAmp * 0.4, 5),
    Math.max(input.selectedBaseCurrentMicroAmp * 0.7, 10),
    input.selectedBaseCurrentMicroAmp,
    input.selectedBaseCurrentMicroAmp * 1.3,
    input.selectedBaseCurrentMicroAmp * 1.6,
  ];
  const curveKeys = baseCurrentsMicroAmp.map((value, index) => ({
    key: `ib${index + 1}`,
    label: `${value.toFixed(0)} uA`,
    baseCurrentMicroAmp: value,
  }));

  const data: DeviceCurvePoint[] = [];
  let bestPoint: OperatingPoint = { voltage: 0, currentMilliAmp: 0 };
  let smallestGap = Number.POSITIVE_INFINITY;

  for (let index = 0; index < points; index += 1) {
    const voltage = (maxVoltage * index) / (points - 1);
    const row: DeviceCurvePoint = {
      voltage,
      loadLineMilliAmp: Math.max(
        ((input.supplyVoltage - voltage) / input.collectorResistanceOhms) * 1000,
        0,
      ),
    };

    for (const curve of curveKeys) {
      const currentMilliAmp = bjtCollectorCurrentMilliAmp(
        voltage,
        curve.baseCurrentMicroAmp * 1e-6,
        input.beta,
      );
      row[curve.key] = clamp(currentMilliAmp, 0, 120);

      if (curve.baseCurrentMicroAmp === input.selectedBaseCurrentMicroAmp) {
        const gap = Math.abs(currentMilliAmp - row.loadLineMilliAmp);
        if (gap < smallestGap) {
          smallestGap = gap;
          bestPoint = { voltage, currentMilliAmp };
        }
      }
    }

    data.push(row);
  }

  const operatingRegion =
    bestPoint.currentMilliAmp < 0.05
      ? "cutoff"
      : bestPoint.voltage < 0.25
        ? "saturation"
        : "active";

  return {
    data,
    curves: curveKeys,
    qPoint: bestPoint,
    operatingRegion,
  };
}
