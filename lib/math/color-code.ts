export type ResistorBandColor =
  | "black"
  | "brown"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "violet"
  | "gray"
  | "white"
  | "gold"
  | "silver";

export type ResistorBandCount = 4 | 5;

type BandInfo = {
  color: ResistorBandColor;
  label: string;
  hex: string;
  digit?: number;
  multiplier?: number;
  tolerance?: number;
};

export const resistorBandCatalog: BandInfo[] = [
  { color: "black", label: "Black", hex: "#20262f", digit: 0, multiplier: 1 },
  { color: "brown", label: "Brown", hex: "#6e4b3a", digit: 1, multiplier: 10, tolerance: 1 },
  { color: "red", label: "Red", hex: "#c94b4b", digit: 2, multiplier: 100, tolerance: 2 },
  { color: "orange", label: "Orange", hex: "#dc7f2a", digit: 3, multiplier: 1_000 },
  { color: "yellow", label: "Yellow", hex: "#d7b226", digit: 4, multiplier: 10_000 },
  { color: "green", label: "Green", hex: "#3f8c55", digit: 5, multiplier: 100_000, tolerance: 0.5 },
  { color: "blue", label: "Blue", hex: "#2f6db2", digit: 6, multiplier: 1_000_000, tolerance: 0.25 },
  { color: "violet", label: "Violet", hex: "#7348a5", digit: 7, multiplier: 10_000_000, tolerance: 0.1 },
  { color: "gray", label: "Gray", hex: "#80858f", digit: 8, multiplier: 100_000_000, tolerance: 0.05 },
  { color: "white", label: "White", hex: "#f1f3f6", digit: 9, multiplier: 1_000_000_000 },
  { color: "gold", label: "Gold", hex: "#caa64b", multiplier: 0.1, tolerance: 5 },
  { color: "silver", label: "Silver", hex: "#bcc4cf", multiplier: 0.01, tolerance: 10 },
];

const bandByColor = new Map(resistorBandCatalog.map((band) => [band.color, band]));
const digitBands = resistorBandCatalog.filter((band) => band.digit !== undefined);
const multiplierBands = resistorBandCatalog.filter(
  (band) => band.multiplier !== undefined,
);
const toleranceBands = resistorBandCatalog.filter((band) => band.tolerance !== undefined);

export function getBandInfo(color: ResistorBandColor) {
  return bandByColor.get(color)!;
}

export function getDigitBandOptions() {
  return digitBands;
}

export function getMultiplierBandOptions() {
  return multiplierBands;
}

export function getToleranceBandOptions() {
  return toleranceBands;
}

export function decodeResistorBands({
  bandCount,
  bands,
}: {
  bandCount: ResistorBandCount;
  bands: ResistorBandColor[];
}) {
  const required = bandCount;

  if (bands.length < required) {
    return null;
  }

  const digitCount = bandCount === 4 ? 2 : 3;
  const digitBandsSelected = bands.slice(0, digitCount).map((color) => getBandInfo(color));
  const multiplierBand = getBandInfo(bands[digitCount]);
  const toleranceBand = getBandInfo(bands[digitCount + 1]);

  if (
    digitBandsSelected.some((band) => band.digit === undefined) ||
    multiplierBand.multiplier === undefined ||
    toleranceBand.tolerance === undefined
  ) {
    return null;
  }

  const significantDigits = Number(
    digitBandsSelected.map((band) => band.digit).join(""),
  );
  const resistance = significantDigits * multiplierBand.multiplier;
  const tolerance = toleranceBand.tolerance;

  return {
    resistance,
    tolerance,
    minimum: resistance * (1 - tolerance / 100),
    maximum: resistance * (1 + tolerance / 100),
    significantDigits,
    multiplier: multiplierBand.multiplier,
  };
}

function findToleranceColor(tolerance: number) {
  const match = toleranceBands.find((band) => band.tolerance === tolerance);
  return match?.color ?? "gold";
}

function findMultiplierColor(multiplier: number) {
  const match = multiplierBands.find((band) => band.multiplier === multiplier);
  return match?.color ?? null;
}

export function encodeResistorValue({
  resistance,
  tolerance,
  bandCount,
}: {
  resistance: number;
  tolerance: number;
  bandCount: ResistorBandCount;
}) {
  if (!Number.isFinite(resistance) || resistance <= 0) {
    return null;
  }

  const significantDigitsTarget = bandCount === 4 ? 2 : 3;
  let exponent = Math.floor(Math.log10(resistance)) - (significantDigitsTarget - 1);
  let scaled = Math.round(resistance / 10 ** exponent);

  if (scaled >= 10 ** significantDigitsTarget) {
    scaled /= 10;
    exponent += 1;
  }

  const multiplier = 10 ** exponent;
  const multiplierColor = findMultiplierColor(multiplier);

  if (!multiplierColor) {
    return null;
  }

  const digits = String(scaled)
    .padStart(significantDigitsTarget, "0")
    .split("")
    .map((digit) =>
      digitBands.find((band) => band.digit === Number(digit))?.color,
    );

  if (digits.some((digit) => !digit)) {
    return null;
  }

  return [...digits, multiplierColor, findToleranceColor(tolerance)] as ResistorBandColor[];
}

export function formatResistance(resistance: number) {
  const absolute = Math.abs(resistance);

  if (absolute >= 1_000_000) {
    return `${(resistance / 1_000_000).toFixed(3).replace(/\.?0+$/, "")} MΩ`;
  }

  if (absolute >= 1_000) {
    return `${(resistance / 1_000).toFixed(3).replace(/\.?0+$/, "")} kΩ`;
  }

  if (absolute >= 1) {
    return `${resistance.toFixed(3).replace(/\.?0+$/, "")} Ω`;
  }

  return `${resistance.toExponential(2)} Ω`;
}

