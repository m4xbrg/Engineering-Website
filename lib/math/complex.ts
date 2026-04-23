export type Complex = {
  re: number;
  im: number;
};

export function complex(re: number, im = 0): Complex {
  return { re, im };
}

export function addComplex(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}

export function subtractComplex(a: Complex, b: Complex): Complex {
  return { re: a.re - b.re, im: a.im - b.im };
}

export function multiplyComplex(a: Complex, b: Complex): Complex {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

export function divideComplex(a: Complex, b: Complex): Complex {
  const denominator = b.re * b.re + b.im * b.im;

  if (denominator === 0) {
    return complex(Number.NaN, Number.NaN);
  }

  return {
    re: (a.re * b.re + a.im * b.im) / denominator,
    im: (a.im * b.re - a.re * b.im) / denominator,
  };
}

export function conjugateComplex(value: Complex): Complex {
  return { re: value.re, im: -value.im };
}

export function absComplex(value: Complex) {
  return Math.hypot(value.re, value.im);
}

export function phaseRadians(value: Complex) {
  return Math.atan2(value.im, value.re);
}

export function phaseDegrees(value: Complex) {
  return (phaseRadians(value) * 180) / Math.PI;
}

export function fromPolar(magnitude: number, angleRadians: number): Complex {
  return {
    re: magnitude * Math.cos(angleRadians),
    im: magnitude * Math.sin(angleRadians),
  };
}

export function complexFromPhase(magnitude: number, angleDegrees: number): Complex {
  return fromPolar(magnitude, (angleDegrees * Math.PI) / 180);
}

export function isFiniteComplex(value: Complex) {
  return Number.isFinite(value.re) && Number.isFinite(value.im);
}

