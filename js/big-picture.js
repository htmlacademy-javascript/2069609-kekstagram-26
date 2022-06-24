// Окно большой фотки
const bigPicture = document.querySelector('.big-picture');
// Кнопка для выхода из полноэкранного просмотра изображения
const bigPictureCancel = document.querySelector('.big-picture__cancel');
// Блок счётчика комментариев
const commentCount = document.querySelector('.social__comment-count');
// Блок загрузки новых комментариев
const commentsLoader = document.querySelector('.comments-loader');
// Блок для списка комментариев под фотографией
const commentsBlock = document.querySelector('.social__comments');
const body = document.querySelector('body');
const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');

//Функция создания одного элемента комментария
function createComment (comment) {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.nameComment;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
}

// Функция отрисовки целого блока комментарии
function createCommentsBlock(comments) {
  comments.forEach((comment) => {
    commentsBlock.appendChild(createComment(comment));
  });
}

// Функция выхода из полноэкранного режима фотогафии (при нажатии на кнопку Х)
function onButtonCloseClick() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
}

// Функция выхода из полноэкранного режима фотогафии (при нажатии на клавишу ESC)
function onEscapeClick(evt) {
  if (evt.keyCode === 27) {
    body.classList.remove('modal-open');
    commentCount.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
    bigPicture.classList.add('hidden');
  }
}

// Функция отрисовки фото в полноэкранном режиме
function createBigPicture (userPhoto) {
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = userPhoto.url;
  bigPicture.querySelector('.likes-count').textContent = userPhoto.likes;
  bigPicture.querySelector('.comments-count').textContent  = userPhoto.comments.length;
  bigPicture.querySelector('.social__caption').textContent  = userPhoto.description;

  commentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');

  commentsBlock.innerHTML = '';
  createCommentsBlock(userPhoto.comments);

  document.addEventListener('keydown', onEscapeClick);
  bigPictureCancel.addEventListener('click', onButtonCloseClick);
}

export {createBigPicture};
