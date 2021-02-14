import searchWorkers from '../src/findWorker.js';

describe('Standard cases.', () => {
  const fullMatched = [
    ['Октябрьский', 'login1'],
    ['Зарека', 'login2'],
    ['Сулажгора', 'login3'],
    ['Древлянка', 'login4'],
    ['Центр', 'login5'],
  ];

  const partialMatched = [
    ['5-й поселок', 'login4'],
    ['Голиковка', 'login2'],
    ['Заводская', null],
    ['Ключевая', 'login2'],
    ['Кукковка', 'login2'],
    ['Новый сайнаволок', 'login2'],
    ['Первомайский', 'login1'],
    ['Перевалка', 'login3'],
    ['Университетский городок', 'login4'],
  ];

  test.each(fullMatched)('Full matched - %p.', (district, worker) => {
    expect(searchWorkers(district)).toEqual(worker);
  });

  test.each(partialMatched)('Partial matched - %p.', (district, worker) => {
    expect(searchWorkers(district)).toEqual(worker);
  });
});
