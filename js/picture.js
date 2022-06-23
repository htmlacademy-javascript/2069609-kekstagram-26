import {createBigPicture} from './big-picture.js';
import {similarPhotos} from './data.js';

const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesСontainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

function createPictureElement(userPhoto) {
  const {likes, url, comments} = userPhoto;
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__img').src = url;
  // СЮДА ДОБАВИМ ДАТА-АТРИБУТ
  pictureElement.dataset.id = userPhoto.id;
  return pictureElement;

}

function renderPictures (userPhotos) {
  userPhotos.forEach((userPhoto) => {
    const pictureElement = createPictureElement(userPhoto);
    picturesFragment.appendChild(pictureElement);
  });
  picturesСontainer.appendChild(picturesFragment);
}

export {renderPictures};

function getBigPicture(event) {
  const userPhotos = similarPhotos;
  const pictureElement = event.target.closest('.picture');
  if (event.target && pictureElement !== null) {
    createBigPicture(event, userPhotos);
  }
}

picturesСontainer.addEventListener('click', getBigPicture);
