const baseIntervals = [
  '10:00-14:00',
  '16:00-20:00',
];

const isValidTimeInterval = (interval) => interval
  .split('-')
  .map((e) => e.split(':'))
  .every(([hours, minutes]) => parseInt(hours, 10) < 24 && parseInt(minutes, 10) < 60);

const hasIntersections = (interval) => {
  const [
    [beginHour, beginMinutes], [endHour, endMinutes],
  ] = interval
    .split('-')
    .map((e) => e.split(':'))
    .map(([hours, minutes]) => [parseInt(hours, 10), parseInt(minutes, 10)]);

  for (const current of baseIntervals) { // eslint-disable-line
    const [
      [currentBeginHour, currentBeginMinutes], [currentEndHour, currentEndMinutes],
    ] = current
      .split('-')
      .map((e) => e.split(':'))
      .map(([hours, minutes]) => [parseInt(hours, 10), parseInt(minutes, 10)]);

    if (beginHour < currentEndHour && endHour > currentBeginHour) {
      return true;
    }

    if (beginHour === currentEndHour || endHour === currentBeginHour) {
      if (beginMinutes < currentBeginMinutes || endMinutes > currentEndMinutes) {
        return true;
      }
    }
  }

  return false;
};

export { isValidTimeInterval, hasIntersections };
