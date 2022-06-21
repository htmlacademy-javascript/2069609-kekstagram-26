//Элемент-шаблон
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
//Контейнер для изображений от других пользователей
const picturesСontainer = document.querySelector('.pictures');
//Создаю черный квадрат
const picturesFragment = document.createDocumentFragment();

//Функция создания реальной фотки c помощью шаблона, параметром которой является объект Фотография
function createPictureElement(userPhoto) {
  const {likes, url, comments} = userPhoto;
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__img').src = url;
  return pictureElement;
}

//Функция отрисовки всех фотографий пользователей
function renderPictures (userPictures) {
  userPictures.forEach((userPicture) => {
    const pictureElement = createPictureElement(userPicture);
    picturesFragment.appendChild(pictureElement);
  });
  return picturesСontainer.appendChild(picturesFragment);
}

export {renderPictures};

