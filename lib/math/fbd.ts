export type AppliedForce = {
  id: string;
  label: string;
  magnitude: number;
  angleDeg: number;
  x: number;
  y: number;
};

export type ResolvedForce = AppliedForce & {
  fx: number;
  fy: number;
  momentNm: number;
};

export function resolveForce(force: AppliedForce): ResolvedForce {
  const radians = (force.angleDeg * Math.PI) / 180;
  const fx = force.magnitude * Math.cos(radians);
  const fy = force.magnitude * Math.sin(radians);
  const momentNm = force.x * fy - force.y * fx;

  return {
    ...force,
    fx,
    fy,
    momentNm,
  };
}

export function analyzeForceSystem(
  forces: AppliedForce[],
  coupleMomentNm = 0,
  tolerance = 0.25,
) {
  const resolvedForces = forces.map(resolveForce);
  const netFx = resolvedForces.reduce((sum, force) => sum + force.fx, 0);
  const netFy = resolvedForces.reduce((sum, force) => sum + force.fy, 0);
  const netMomentNm =
    resolvedForces.reduce((sum, force) => sum + force.momentNm, 0) + coupleMomentNm;
  const resultantMagnitude = Math.hypot(netFx, netFy);
  const resultantAngleDeg =
    resultantMagnitude > 0 ? (Math.atan2(netFy, netFx) * 180) / Math.PI : 0;

  return {
    resolvedForces,
    netFx,
    netFy,
    netMomentNm,
    resultantMagnitude,
    resultantAngleDeg,
    isBalanced:
      Math.abs(netFx) <= tolerance &&
      Math.abs(netFy) <= tolerance &&
      Math.abs(netMomentNm) <= tolerance,
  };
}
