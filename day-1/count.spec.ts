import { describe, expect, test } from 'bun:test';
import { count } from './count';

describe('count crossings', () => {
  test.each([
    { r: ['L39'], c: 0, p: 1 },
    { r: ['L40'], c: 1, p: 0 },
    { r: ['L41'], c: 1, p: 99 },
    { r: ['L139'], c: 1, p: 1 },
    { r: ['L140'], c: 2, p: 0 },
    { r: ['L141'], c: 2, p: 99 },
    { r: ['R59'], c: 0, p: 99 },
    { r: ['R60'], c: 1, p: 0 },
    { r: ['R61'], c: 1, p: 1 },
    { r: ['R159'], c: 1, p: 99 },
    { r: ['R160'], c: 2, p: 0 },
    { r: ['R161'], c: 2, p: 1 },
  ])('from 40, rotations: $r results in $c crossings', ({ r, c, p }) => {
    const { crossedZeroCount, finalPosition } = count(40, r);
    expect(finalPosition).toEqual(p);
    expect(crossedZeroCount).toEqual(c);
  });

  test.each([
    { r: ['L1'], c: 0, p: 99 },
    { r: ['L99'], c: 0, p: 1 },
    { r: ['L100'], c: 1, p: 0 },
    { r: ['L101'], c: 1, p: 99 },
    { r: ['L199'], c: 1, p: 1 },
    { r: ['L200'], c: 2, p: 0 },
    { r: ['L201'], c: 2, p: 99 },
    { r: ['R1'], c: 0, p: 1 },
    { r: ['R99'], c: 0, p: 99 },
    { r: ['R100'], c: 1, p: 0 },
    { r: ['R101'], c: 1, p: 1 },
    { r: ['R199'], c: 1, p: 99 },
    { r: ['R200'], c: 2, p: 0 },
    { r: ['R201'], c: 2, p: 1 },
  ])('from 0, rotations: $r results in $c crossings', ({ r, c, p }) => {
    const { crossedZeroCount, finalPosition } = count(0, r);
    expect(finalPosition).toEqual(p);
    expect(crossedZeroCount).toEqual(c);
  });
});
