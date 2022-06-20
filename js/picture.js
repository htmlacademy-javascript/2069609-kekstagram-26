import {similarPhotos} from './data.js';
const userPictures = similarPhotos;
//Элемент-шаблон
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
//Контейнер для изображений от других пользователей
const picturesList = document.querySelector('.pictures');
//Создаю черный квадрат
const picturesFragment = document.createDocumentFragment();
//Для каждой фотки
userPictures.forEach((userPicture) => {
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__comments').textContent = userPicture.comments;
  pictureElement.querySelector('.picture__likes').textContent = userPicture.likes;
  pictureElement.querySelector('.picture__img').src = userPicture.url;
  picturesFragment.appendChild(pictureElement);

});
picturesList.appendChild(picturesFragment);
