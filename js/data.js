import {getRandomNumber} from './util.js';

const MAX_PHOTO_COUNT = 25;
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

const arrayOfNumbers100 = Array.from({length: 100}, (v, i) => i + 1);
const idComments = arrayOfNumbers100.sort(() => Math.random() - 0.5);

let commentIndex = 0;

const getComment = () => ({
  id: idComments[commentIndex++],
  avatar: `img/avatar-${getRandomNumber (1, 6)}.svg`,
  message: MESSAGES[getRandomNumber (0, 5)],
  nameComment: NAMES[getRandomNumber (0, 24)],
}
);

const createCommentList = () => {
  const countComments = getRandomNumber(1,5);
  return Array.from({length: countComments}, getComment);
};

const createPhotoMocks = (count) => {
  const photos = new Array(count).fill('').map((item, index) => ({
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: DESCRIPTIONS[index],
    likes: getRandomNumber (15, 200),
    comments: createCommentList()
  }
  ));
  return photos;
};
const similarPhotos = createPhotoMocks(MAX_PHOTO_COUNT);

export {similarPhotos};
