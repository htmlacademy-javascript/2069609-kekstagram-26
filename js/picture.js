import {similarPhotos} from './data.js';

const userPictures = similarPhotos;
//Элемент-шаблон
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
//Контейнер для изображений от других пользователей
const picturesСontainer = document.querySelector('.pictures');
//Создаю черный квадрат
const picturesFragment = document.createDocumentFragment();
//Функция создания реальной фотки из шаблона
function createPictureElement(likes, comments, path) {
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__img').src = path;
  return pictureElement;
}
//Функция отрисовки
function renderPictures (userPhotos) {
  userPhotos.forEach((userPhoto) => {
    const {likes, url, comments} = userPhoto;
    const pictureElement = createPictureElement(likes, comments, url);
    picturesFragment.appendChild(pictureElement);
  });
  return picturesСontainer.appendChild(picturesFragment);
}
const allPictires = renderPictures(userPictures);
export {allPictires};

