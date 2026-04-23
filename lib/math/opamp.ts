export type OpAmpMode =
  | "inverting"
  | "non-inverting"
  | "follower"
  | "integrator"
  | "differentiator"
  | "comparator";

export type OpAmpAnalysisInput = {
  mode: OpAmpMode;
  inputVoltage: number;
  secondaryInputVoltage: number;
  referenceVoltage: number;
  inputResistanceOhms: number;
  feedbackResistanceOhms: number;
  capacitanceFarads: number;
  signalFrequencyHz: number;
  gainBandwidthHz: number;
  positiveRailVoltage: number;
  negativeRailVoltage: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function analyzeOpAmp(input: OpAmpAnalysisInput) {
  const omega = 2 * Math.PI * Math.max(input.signalFrequencyHz, 1e-6);
  const cornerFrequencyHz =
    1 / (2 * Math.PI * Math.max(input.inputResistanceOhms * input.capacitanceFarads, 1e-12));

  switch (input.mode) {
    case "inverting": {
      const gain = -input.feedbackResistanceOhms / input.inputResistanceOhms;
      const outputVoltage = clamp(
        gain * input.inputVoltage,
        input.negativeRailVoltage,
        input.positiveRailVoltage,
      );

      return {
        closedLoopGain: gain,
        magnitudeGain: Math.abs(gain),
        phaseDeg: 180,
        outputVoltage,
        bandwidthHz: input.gainBandwidthHz / Math.max(Math.abs(gain), 1),
        cornerFrequencyHz,
        transferExpression: "Vout / Vin = -Rf / Rin",
        outputExpression: `Vout = ${gain.toFixed(3)} x Vin`,
        stateLabel: "linear",
      };
    }
    case "non-inverting": {
      const gain = 1 + input.feedbackResistanceOhms / input.inputResistanceOhms;
      const outputVoltage = clamp(
        gain * input.inputVoltage,
        input.negativeRailVoltage,
        input.positiveRailVoltage,
      );

      return {
        closedLoopGain: gain,
        magnitudeGain: gain,
        phaseDeg: 0,
        outputVoltage,
        bandwidthHz: input.gainBandwidthHz / Math.max(gain, 1),
        cornerFrequencyHz,
        transferExpression: "Vout / Vin = 1 + Rf / Rg",
        outputExpression: `Vout = ${gain.toFixed(3)} x Vin`,
        stateLabel: "linear",
      };
    }
    case "follower": {
      const outputVoltage = clamp(
        input.inputVoltage,
        input.negativeRailVoltage,
        input.positiveRailVoltage,
      );

      return {
        closedLoopGain: 1,
        magnitudeGain: 1,
        phaseDeg: 0,
        outputVoltage,
        bandwidthHz: input.gainBandwidthHz,
        cornerFrequencyHz,
        transferExpression: "Vout / Vin = 1",
        outputExpression: "Vout = Vin",
        stateLabel: "buffer",
      };
    }
    case "integrator": {
      const magnitudeGain =
        1 / Math.max(omega * input.inputResistanceOhms * input.capacitanceFarads, 1e-9);
      const outputVoltage = clamp(
        -magnitudeGain * input.inputVoltage,
        input.negativeRailVoltage,
        input.positiveRailVoltage,
      );

      return {
        closedLoopGain: null,
        magnitudeGain,
        phaseDeg: -90,
        outputVoltage,
        bandwidthHz: Math.min(input.gainBandwidthHz, cornerFrequencyHz),
        cornerFrequencyHz,
        transferExpression: "Vout / Vin = -1 / (s Rin C)",
        outputExpression: `|Vout| = ${magnitudeGain.toFixed(3)} x |Vin| at ${input.signalFrequencyHz.toFixed(1)} Hz`,
        stateLabel: "integrating",
      };
    }
    case "differentiator": {
      const magnitudeGain =
        omega * input.feedbackResistanceOhms * input.capacitanceFarads;
      const outputVoltage = clamp(
        -magnitudeGain * input.inputVoltage,
        input.negativeRailVoltage,
        input.positiveRailVoltage,
      );

      return {
        closedLoopGain: null,
        magnitudeGain,
        phaseDeg: -90,
        outputVoltage,
        bandwidthHz: Math.min(input.gainBandwidthHz, Math.max(cornerFrequencyHz, 1)),
        cornerFrequencyHz,
        transferExpression: "Vout / Vin = -s Rf C",
        outputExpression: `|Vout| = ${magnitudeGain.toFixed(3)} x |Vin| at ${input.signalFrequencyHz.toFixed(1)} Hz`,
        stateLabel: "differentiating",
      };
    }
    case "comparator":
    default: {
      const outputVoltage =
        input.inputVoltage >= input.referenceVoltage
          ? input.positiveRailVoltage
          : input.negativeRailVoltage;

      return {
        closedLoopGain: null,
        magnitudeGain: Number.POSITIVE_INFINITY,
        phaseDeg: 0,
        outputVoltage,
        bandwidthHz: input.gainBandwidthHz,
        cornerFrequencyHz,
        transferExpression: "Vout = +Vsat when Vin > Vref, else -Vsat",
        outputExpression: `Vin ${input.inputVoltage >= input.referenceVoltage ? ">=" : "<"} Vref`,
        stateLabel:
          input.inputVoltage >= input.referenceVoltage ? "high output" : "low output",
      };
    }
  }
}
