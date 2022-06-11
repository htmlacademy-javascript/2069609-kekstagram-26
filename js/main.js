function getRandomNumber (minRange, maxRange) {
  let randomNumber;
  if (minRange < 0 || minRange > maxRange) {
    randomNumber = null;
    throw '!!Проверьте значения диапазона!!';
  }

  const min = Math.ceil(minRange);
  const max = Math.floor(maxRange);

  if (min > max) {
    randomNumber = null;
    throw '!!Проверьте значения диапазона!!';
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
    throw '!!Проверяемое значениме не является строкой!!';
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
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
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

// Создаю массив  из 25-ти случайных неповторяющихся чисел в диапозоне (0; 100].
const idComment = [];
while (idComment.length < 25) {
  const randomNumber = Math.ceil(Math.random() * 100);
  let found = false;
  for (let i = 0; i < idComment.length; i++) {
    if (idComment[i] === randomNumber || idComment[i]===0){
      found = true;
      break;
    }
  }
  if (!found) {
    idComment[idComment.length]=randomNumber;
  }
}

let j = 0;
const COMMENTS = () => ({
  id: idComment[j++],
  avatar: `img/avatar-${getRandomNumber (1, 6)}.svg`,
  message: MESSAGES[getRandomNumber (0, 5)],
  nameComment: NAMES[getRandomNumber (0, 24)],
}
);

let photoIndex = 1;
let urlIndex = 1;
let descriptionIndex = 0;
const createPhoto = () => ({
  id: photoIndex++,
  url: `photos/${urlIndex++}.jpg`,
  description: DESCRIPTIONS[descriptionIndex++],
  likes: getRandomNumber (15, 200),
  comments: COMMENTS()
}
);

// eslint-disable-next-line no-unused-vars
const similarPhotos = Array.from({length: 25}, createPhoto);

//console.log(similarPhotos);
