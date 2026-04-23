export type QuantityId =
  | "length"
  | "mass"
  | "force"
  | "pressure"
  | "energy"
  | "power"
  | "temperature"
  | "angle"
  | "frequency"
  | "voltage"
  | "current"
  | "resistance";

export type UnitDefinition = {
  id: string;
  label: string;
  symbol: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};

export type QuantityDefinition = {
  id: QuantityId;
  label: string;
  units: UnitDefinition[];
};

function linearUnit(id: string, label: string, symbol: string, factor: number): UnitDefinition {
  return {
    id,
    label,
    symbol,
    toBase: (value) => value * factor,
    fromBase: (value) => value / factor,
  };
}

export const quantities: QuantityDefinition[] = [
  {
    id: "length",
    label: "Length",
    units: [
      linearUnit("m", "meter", "m", 1),
      linearUnit("mm", "millimeter", "mm", 1e-3),
      linearUnit("cm", "centimeter", "cm", 1e-2),
      linearUnit("km", "kilometer", "km", 1e3),
      linearUnit("in", "inch", "in", 0.0254),
      linearUnit("ft", "foot", "ft", 0.3048),
      linearUnit("yd", "yard", "yd", 0.9144),
      linearUnit("mi", "mile", "mi", 1609.344),
    ],
  },
  {
    id: "mass",
    label: "Mass",
    units: [
      linearUnit("kg", "kilogram", "kg", 1),
      linearUnit("g", "gram", "g", 1e-3),
      linearUnit("lbm", "pound mass", "lbm", 0.45359237),
      linearUnit("slug", "slug", "slug", 14.59390294),
    ],
  },
  {
    id: "force",
    label: "Force",
    units: [
      linearUnit("N", "newton", "N", 1),
      linearUnit("kN", "kilonewton", "kN", 1e3),
      linearUnit("lbf", "pound-force", "lbf", 4.4482216152605),
      linearUnit("kip", "kip", "kip", 4448.2216152605),
    ],
  },
  {
    id: "pressure",
    label: "Pressure",
    units: [
      linearUnit("Pa", "pascal", "Pa", 1),
      linearUnit("kPa", "kilopascal", "kPa", 1e3),
      linearUnit("bar", "bar", "bar", 1e5),
      linearUnit("psi", "pounds per square inch", "psi", 6894.757293168),
      linearUnit("atm", "atmosphere", "atm", 101325),
    ],
  },
  {
    id: "energy",
    label: "Energy",
    units: [
      linearUnit("J", "joule", "J", 1),
      linearUnit("kJ", "kilojoule", "kJ", 1e3),
      linearUnit("Wh", "watt-hour", "Wh", 3600),
      linearUnit("kWh", "kilowatt-hour", "kWh", 3.6e6),
      linearUnit("BTU", "British thermal unit", "BTU", 1055.05585262),
      linearUnit("lb-ft", "pound-foot", "lb-ft", 1.3558179483314),
    ],
  },
  {
    id: "power",
    label: "Power",
    units: [
      linearUnit("W", "watt", "W", 1),
      linearUnit("kW", "kilowatt", "kW", 1e3),
      linearUnit("MW", "megawatt", "MW", 1e6),
      linearUnit("hp", "horsepower", "hp", 745.6998715823),
    ],
  },
  {
    id: "temperature",
    label: "Temperature",
    units: [
      {
        id: "C",
        label: "Celsius",
        symbol: "°C",
        toBase: (value) => value,
        fromBase: (value) => value,
      },
      {
        id: "F",
        label: "Fahrenheit",
        symbol: "°F",
        toBase: (value) => ((value - 32) * 5) / 9,
        fromBase: (value) => (value * 9) / 5 + 32,
      },
      {
        id: "K",
        label: "Kelvin",
        symbol: "K",
        toBase: (value) => value - 273.15,
        fromBase: (value) => value + 273.15,
      },
    ],
  },
  {
    id: "angle",
    label: "Angle",
    units: [
      linearUnit("rad", "radian", "rad", 1),
      linearUnit("deg", "degree", "°", Math.PI / 180),
      linearUnit("rev", "revolution", "rev", 2 * Math.PI),
    ],
  },
  {
    id: "frequency",
    label: "Frequency",
    units: [
      linearUnit("Hz", "hertz", "Hz", 1),
      linearUnit("kHz", "kilohertz", "kHz", 1e3),
      linearUnit("MHz", "megahertz", "MHz", 1e6),
      linearUnit("rpm", "revolutions per minute", "rpm", 1 / 60),
      linearUnit("rad/s", "radians per second", "rad/s", 1 / (2 * Math.PI)),
    ],
  },
  {
    id: "voltage",
    label: "Voltage",
    units: [
      linearUnit("mV", "millivolt", "mV", 1e-3),
      linearUnit("V", "volt", "V", 1),
      linearUnit("kV", "kilovolt", "kV", 1e3),
    ],
  },
  {
    id: "current",
    label: "Current",
    units: [
      linearUnit("uA", "microampere", "μA", 1e-6),
      linearUnit("mA", "milliampere", "mA", 1e-3),
      linearUnit("A", "ampere", "A", 1),
    ],
  },
  {
    id: "resistance",
    label: "Resistance",
    units: [
      linearUnit("ohm", "ohm", "Ω", 1),
      linearUnit("kohm", "kilo-ohm", "kΩ", 1e3),
      linearUnit("Mohm", "mega-ohm", "MΩ", 1e6),
    ],
  },
];

export function getQuantity(quantityId: QuantityId) {
  return quantities.find((quantity) => quantity.id === quantityId)!;
}

export function convertValue({
  quantityId,
  value,
  fromUnitId,
  toUnitId,
}: {
  quantityId: QuantityId;
  value: number;
  fromUnitId: string;
  toUnitId: string;
}) {
  const quantity = getQuantity(quantityId);
  const fromUnit = quantity.units.find((unit) => unit.id === fromUnitId);
  const toUnit = quantity.units.find((unit) => unit.id === toUnitId);

  if (!fromUnit || !toUnit) {
    return null;
  }

  const baseValue = fromUnit.toBase(value);
  const convertedValue = toUnit.fromBase(baseValue);
  const factor = fromUnit.toBase(1);
  const reverseFactor = toUnit.fromBase(factor);

  return {
    convertedValue,
    factor: reverseFactor,
    baseValue,
  };
}

