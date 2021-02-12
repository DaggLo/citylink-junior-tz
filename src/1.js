const areas = [
  '5-й поселок',
  'Голиковка',
  'Древлянка',
  'Заводская',
  'Зарека',
  'Ключевая',
  'Кукковка',
  'Новый сайнаволок',
  'Октябрьский',
  'Первомайский',
  'Перевалка',
  'Сулажгора',
  'Университетский городок',
  'Центр',
];

const nearby = [
  [12, 11],
  [5, 7, 6, 8],
  [11, 13],
  [10, 9, 12],
  [2, 6, 7, 8],
  [5, 2, 7, 8],
  [2, 5, 6, 8],
  [6, 2, 7, 5],
  [10, 14],
  [9, 14, 12],
  [13, 3, 1, 12],
  [1, 10],
  [11, 1, 12],
  [9, 10],
];

const workers = [
  {
    login: 'login1',
    area_name: 'Октябрьский',
  },
  {
    login: 'login2',
    area_name: 'Зарека',
  },
  {
    login: 'login3',
    area_name: 'Сулажгора',
  },
  {
    login: 'login4',
    area_name: 'Древлянка',
  },
  {
    login: 'login5',
    area_name: 'Центр',
  },
];

export default (district) => {
  const fullMatched = workers.find(({ area_name }) => area_name === district);

  if (fullMatched) {
    return fullMatched.login;
  }

  const districtIndex = areas.indexOf(district) + 1;
  const filteredNearby = nearby
    .filter((e) => e.includes(districtIndex));

  for (const group of filteredNearby) { // eslint-disable-line
    for (const value of group) { // eslint-disable-line
      const currentDistrict = areas[value - 1];
      const currentWorker = workers.find(({ area_name }) => area_name === currentDistrict);
      if (currentWorker) {
        return currentWorker.login;
      }
    }
  }

  return null;
};
