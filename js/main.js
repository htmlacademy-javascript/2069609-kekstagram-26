function getRandomNumber (minRange, maxRange) {
  let randomNumber;
  if (minRange < 0 || minRange > maxRange) {
    randomNumber = null;
    throw new RangeError('!!Проверьте значения диапазона!!');
  }

  const min = Math.ceil(minRange);
  const max = Math.floor(maxRange);

  if (min > max) {
    randomNumber = null;
    throw new RangeError('!!Проверьте значения диапазона!!');
  }
  if (min === max) {
    randomNumber = min;
    return randomNumber;
  }

  randomNumber = Math.random() * (max - min + 1);
  return Math.floor(randomNumber) + min;
}

function isLengthValid (str, maxLength) {
  if (typeof str !== 'string') {
    throw new RangeError('!!Проверяемое значениме не является строкой!!');
  }
  return str.length <= maxLength;
}

isLengthValid('Привет',3);

const DESCRIPTIONS = [
  'Мой завтрак',
  'Как я плаваю',
  'Гуляем!',
  'В огороде',
  'Наш урожай',
  'Ах!',
  'Как я плаваю',
  'На охоте',
  'На рыбалке',
  'Оч вкусно!',
  'Ах, ну какова красота!',
  'Подружки',
  'Защита',
  'Мой диплом',
  'С друзьями',
  'На работе',
  'Гуляем',
  'Наконец!',
  'УРРРРРАААА',
  'Поймали щучку!',
  'Учусь ...',
  'Собираем грибы',
  'Спорт, спорт!',
  'Настроение не очень ...',
  'Привет!'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
  'Софи',
  'Тони',
  'Робинсон',
  'Гаврюша',
  'Тони Старк',
  'Майкл Дуглас',
  'Анджелина Джоли',
  'Бред Питт',
  'Тор'
];

//Создаю массив до 1 до 100
const arrayOfNumbers100 = Array.from({length: 100}, (v, i) => i + 1);
//Перетасую элементы массива
const IDCOMMENTS = arrayOfNumbers100.sort(() => Math.random() - 0.5);

let j = 0;
//Функция для создания объекта Комментарий
const getComment = () => ({
  id: IDCOMMENTS[j++],
  avatar: `img/avatar-${getRandomNumber (1, 6)}.svg`,
  message: MESSAGES[getRandomNumber (0, 5)],
  nameComment: NAMES[getRandomNumber (0, 24)],
}
);

const createPhotoMocks = (count) => {
  let photoIndex = 1;
  let urlIndex = 1;
  let descriptionIndex = 0;
  const photos = [];
  while (photoIndex <= count) {
    photos.push({
      id: photoIndex++,
      url: `photos/${urlIndex++}.jpg`,
      description: DESCRIPTIONS[descriptionIndex++],
      likes: getRandomNumber (15, 200),
      comments: [getComment()]
    });
  }
  return photos;
};

const countPhotos = 25;
const similarPhotos = createPhotoMocks(countPhotos);
// eslint-disable-next-line no-console
console.log(similarPhotos);
