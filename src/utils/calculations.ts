export interface DecarbonizationResult {
  bfBofAnnualMt: number;
  eafAnnualMt: number;
  avoidedAnnualMt: number;
  reductionPercent: number;
  passengerVehicles: number;
}

/** Inputs use million tonnes of steel per year and tonnes CO₂ per tonne steel. */
export function calculateDecarbonization(
  annualProductionMt: number,
  bfBofIntensity: number,
  eafIntensity: number,
  vehicleTonnesPerYear = 4.6
): DecarbonizationResult {
  if (![annualProductionMt, bfBofIntensity, eafIntensity, vehicleTonnesPerYear].every(Number.isFinite)) {
    throw new RangeError('All calculator inputs must be finite numbers.');
  }
  if (annualProductionMt < 0 || bfBofIntensity <= 0 || eafIntensity < 0 || vehicleTonnesPerYear <= 0) {
    throw new RangeError('Production and intensities must be non-negative, with positive BF-BOF and vehicle factors.');
  }
  const bfBofAnnualMt = annualProductionMt * bfBofIntensity;
  const eafAnnualMt = annualProductionMt * eafIntensity;
  const avoidedAnnualMt = bfBofAnnualMt - eafAnnualMt;
  return {
    bfBofAnnualMt,
    eafAnnualMt,
    avoidedAnnualMt,
    reductionPercent: ((bfBofIntensity - eafIntensity) / bfBofIntensity) * 100,
    passengerVehicles: Math.round((avoidedAnnualMt * 1_000_000) / vehicleTonnesPerYear)
  };
}
