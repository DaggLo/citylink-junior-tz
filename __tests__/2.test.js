import { isValidTimeInterval, hasIntersections } from '../src/2.js';

describe('Is time interval valid ?', () => {
  const validTimeIntervals = [
    ['09:00-11:00'],
    ['11:00-13:00'],
    ['15:00-16:00'],
    ['17:00-20:00'],
    ['20:30-21:30'],
    ['21:30-22:30'],
  ];
  const invalidTimeIntervals = [
    ['09:00 -11:00'],
    ['11:00- 13:00'],
    ['15 :00 - 16 :00'],
    ['37:00_20:00'],
    ['200:30-21:90'],
    ['as1:30-22:3h0'],
  ];

  test.each(validTimeIntervals)('Valid interval - %p.', (interval) => {
    expect(isValidTimeInterval(interval)).toBeTruthy();
  });

  test.each(invalidTimeIntervals)('Not valid interval - %p.', (interval) => {
    expect(isValidTimeInterval(interval)).toBeFalsy();
  });
});

describe('Has intersections between time intervals ?', () => {
  const newIntervals = [
    ['09:00-11:00', true],
    ['11:00-13:00', true],
    ['14:00-16:00', false],
    ['14:00-15:00', false],
  ];

  test.each(newIntervals)('Has intersections - %p.', (interval, result) => {
    expect(hasIntersections(interval)).toEqual(result);
  });
});
