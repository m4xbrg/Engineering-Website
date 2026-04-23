import {
  absComplex,
  addComplex,
  complex,
  conjugateComplex,
  divideComplex,
  multiplyComplex,
  phaseDegrees,
} from "@/lib/math/complex";

export type ACCircuitTopology = "series" | "parallel";

export type ACAnalysis = {
  impedance: {
    rectangular: { re: number; im: number };
    magnitude: number;
    angleDeg: number;
  };
  current: {
    magnitude: number;
    angleDeg: number;
    rectangular: { re: number; im: number };
  };
  sourceVoltage: {
    magnitude: number;
    angleDeg: number;
  };
  componentVoltages: {
    resistor: number;
    inductor: number;
    capacitor: number;
  };
  componentCurrents: {
    resistor: number;
    inductor: number;
    capacitor: number;
  };
  powers: {
    real: number;
    reactive: number;
    apparent: number;
    powerFactor: number;
    powerFactorMode: "leading" | "lagging" | "unity";
  };
  resonanceHz: number;
  sourceCurrentComplex: { re: number; im: number };
};

function safeReactanceInductive(omega: number, inductance: number) {
  return omega * inductance;
}

function safeReactanceCapacitive(omega: number, capacitance: number) {
  return omega === 0 || capacitance === 0 ? Number.POSITIVE_INFINITY : 1 / (omega * capacitance);
}

export function resonantFrequencyHz(inductance: number, capacitance: number) {
  if (inductance <= 0 || capacitance <= 0) {
    return 0;
  }

  return 1 / (2 * Math.PI * Math.sqrt(inductance * capacitance));
}

export function analyzeACCircuit({
  topology,
  resistance,
  inductance,
  capacitance,
  voltageRms,
  frequencyHz,
}: {
  topology: ACCircuitTopology;
  resistance: number;
  inductance: number;
  capacitance: number;
  voltageRms: number;
  frequencyHz: number;
}): ACAnalysis {
  const omega = 2 * Math.PI * frequencyHz;
  const xL = safeReactanceInductive(omega, inductance);
  const xC = safeReactanceCapacitive(omega, capacitance);
  const sourceVoltage = complex(voltageRms, 0);

  if (topology === "series") {
    const impedance = complex(resistance, xL - xC);
    const current = divideComplex(sourceVoltage, impedance);
    const resistorVoltage = multiplyComplex(current, complex(resistance, 0));
    const inductorVoltage = multiplyComplex(current, complex(0, xL));
    const capacitorVoltage = multiplyComplex(current, complex(0, -xC));
    const complexPower = multiplyComplex(sourceVoltage, conjugateComplex(current));
    const apparent = voltageRms * absComplex(current);
    const powerFactor = apparent === 0 ? 0 : complexPower.re / apparent;

    return {
      impedance: {
        rectangular: impedance,
        magnitude: absComplex(impedance),
        angleDeg: phaseDegrees(impedance),
      },
      current: {
        magnitude: absComplex(current),
        angleDeg: phaseDegrees(current),
        rectangular: current,
      },
      sourceVoltage: {
        magnitude: voltageRms,
        angleDeg: 0,
      },
      componentVoltages: {
        resistor: absComplex(resistorVoltage),
        inductor: absComplex(inductorVoltage),
        capacitor: absComplex(capacitorVoltage),
      },
      componentCurrents: {
        resistor: absComplex(current),
        inductor: absComplex(current),
        capacitor: absComplex(current),
      },
      powers: {
        real: complexPower.re,
        reactive: complexPower.im,
        apparent,
        powerFactor: Math.abs(powerFactor),
        powerFactorMode:
          Math.abs(powerFactor) > 0.999
            ? "unity"
            : complexPower.im >= 0
              ? "lagging"
              : "leading",
      },
      resonanceHz: resonantFrequencyHz(inductance, capacitance),
      sourceCurrentComplex: current,
    };
  }

  const branchResistorCurrent =
    resistance > 0 ? divideComplex(sourceVoltage, complex(resistance, 0)) : complex(0, 0);
  const branchInductorCurrent =
    xL > 0 ? divideComplex(sourceVoltage, complex(0, xL)) : complex(0, 0);
  const branchCapacitorCurrent = Number.isFinite(xC)
    ? divideComplex(sourceVoltage, complex(0, -xC))
    : complex(0, 0);
  const totalCurrent = addComplex(
    addComplex(branchResistorCurrent, branchInductorCurrent),
    branchCapacitorCurrent,
  );
  const impedance = divideComplex(sourceVoltage, totalCurrent);
  const complexPower = multiplyComplex(sourceVoltage, conjugateComplex(totalCurrent));
  const apparent = voltageRms * absComplex(totalCurrent);
  const powerFactor = apparent === 0 ? 0 : complexPower.re / apparent;

  return {
    impedance: {
      rectangular: impedance,
      magnitude: absComplex(impedance),
      angleDeg: phaseDegrees(impedance),
    },
    current: {
      magnitude: absComplex(totalCurrent),
      angleDeg: phaseDegrees(totalCurrent),
      rectangular: totalCurrent,
    },
    sourceVoltage: {
      magnitude: voltageRms,
      angleDeg: 0,
    },
    componentVoltages: {
      resistor: voltageRms,
      inductor: voltageRms,
      capacitor: voltageRms,
    },
    componentCurrents: {
      resistor: absComplex(branchResistorCurrent),
      inductor: absComplex(branchInductorCurrent),
      capacitor: absComplex(branchCapacitorCurrent),
    },
    powers: {
      real: complexPower.re,
      reactive: complexPower.im,
      apparent,
      powerFactor: Math.abs(powerFactor),
      powerFactorMode:
        Math.abs(powerFactor) > 0.999
          ? "unity"
          : complexPower.im >= 0
            ? "lagging"
            : "leading",
    },
    resonanceHz: resonantFrequencyHz(inductance, capacitance),
    sourceCurrentComplex: totalCurrent,
  };
}

