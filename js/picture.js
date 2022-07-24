import {createBigPicture} from './big-picture.js';

const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picturesСontainer = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

function deletePictures() {
  const pictures = picturesСontainer.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
}

function createPictureElement(userPhoto) {
  const {likes, url, comments, id} = userPhoto;
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.dataset.id = id;
  return pictureElement;

}

function renderPictures (userPhotos) {
  userPhotos.forEach((userPhoto) => {
    const pictureElement = createPictureElement(userPhoto);
    picturesFragment.appendChild(pictureElement);
  });
  picturesСontainer.appendChild(picturesFragment);
}

function setUserPhotoListener (userPhotos) {
  function onPictureClick(event) {
    const pictureElement = event.target.closest('.picture');
    if (pictureElement) {
      const idPicture = pictureElement.dataset.id;
      const bigPictireObject = userPhotos.find((userPhoto) => userPhoto.id === Number(idPicture));
      createBigPicture(bigPictireObject);
    }
  }
  picturesСontainer.addEventListener('click', onPictureClick);
}

export {renderPictures, setUserPhotoListener, deletePictures};
