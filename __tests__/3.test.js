import calcShipping, { russianPost, dhl } from '../src/calcShipping.js';

describe('Is time interval valid ?', () => {
  const russianPostSuite = [
    [1, 100],
    [10, 100],
    [11, 1000],
    [100, 1000],
  ];
  const dhlSuite = [
    [1, 100],
    [5, 500],
    [11, 1100],
    [100, 10000],
  ];
  const inValidWeight = [
    ['10'],
    [null],
    [undefined],
    [NaN],
    [{}],
    [() => {}],
  ];

  test.each(russianPostSuite)('RussianPost - %p kg.', (weight, result) => {
    expect(calcShipping(weight, russianPost)).toEqual(result);
  });

  test.each(dhlSuite)('DHL - %p kg.', (weight, result) => {
    expect(calcShipping(weight, dhl)).toEqual(result);
  });

  test.each(inValidWeight)('Invalid weight - %p kg.', (weight) => {
    expect(() => calcShipping(weight, russianPost)).toThrow();
    expect(() => calcShipping(weight, dhl)).toThrow();
  });
});
