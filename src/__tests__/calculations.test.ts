import { describe, expect, it } from 'vitest';
import { calculateDecarbonization } from '../utils/calculations';

describe('calculateDecarbonization', () => {
  it('calculates annual emissions and savings using the dashboard defaults', () => {
    const result = calculateDecarbonization(2, 2.15, 0.6);
    expect(result.bfBofAnnualMt).toBeCloseTo(4.3);
    expect(result.eafAnnualMt).toBeCloseTo(1.2);
    expect(result.avoidedAnnualMt).toBeCloseTo(3.1);
    expect(result.reductionPercent).toBeCloseTo(72.093);
    expect(result.passengerVehicles).toBe(673913);
  });

  it('rejects invalid calculator inputs', () => {
    expect(() => calculateDecarbonization(-1, 2.15, 0.6)).toThrow(RangeError);
    expect(() => calculateDecarbonization(1, 0, 0.6)).toThrow(RangeError);
  });
});
