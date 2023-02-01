import { expect, describe, it } from 'vitest';
import { capitalize } from '../stringLib';

describe('String capitalization for', () => {
  // when all lowercase
  it("'payment' should be 'Payment'", () => {
    const input = 'payment';
    const expectedOutput = 'Payment';
    const output = capitalize(input);

    expect(output).toEqual(expectedOutput);
  });

  //  when all uppercase
  it("'PAYMENT' should be 'Payment'", () => {
    const input = 'PAYMENT';
    const expectedOutput = 'Payment';
    const output = capitalize(input);

    expect(output).toEqual(expectedOutput);
  });

  //  when already capitalized
  it("'Payment' should be 'Payment'", () => {
    const input = 'Payment';
    const expectedOutput = 'Payment';
    const output = capitalize(input);

    expect(output).toEqual(expectedOutput);
  });
});
