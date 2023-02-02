import { expect, describe, it } from 'vitest';
import { calculateCost } from '../cost';

describe('Cost calculation for', () => {
  it('Lowest tier (<= 10 MB) - Cost is $4 per MB', () => {
    const storage = 10;

    const cost = 4000;
    const expectedCost = calculateCost(storage);

    expect(cost).toEqual(expectedCost);
  });

  it('Middle tier (> 10 MB && <= 100 MB) - Cost is $2 per MB', () => {
    const storage = 100;

    const cost = 20000;
    const expectedCost = calculateCost(storage);

    expect(cost).toEqual(expectedCost);
  });

  it('Highest tier (greater than 100 MB) - Cost is $1 per MB', () => {
    const storage = 101;

    const cost = 10100;
    const expectedCost = calculateCost(storage);

    expect(cost).toEqual(expectedCost);
  });
});
