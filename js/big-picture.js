import {isEscapeKey} from './util.js';

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
const DEFAULT_COMMENT_COUNT = 5;
let currentCommentCount = DEFAULT_COMMENT_COUNT;

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

// Функция отрисовки фото в полноэкранном режиме
function createBigPicture (userPhoto) {
  commentsLoader.classList.remove('hidden');
  currentCommentCount = DEFAULT_COMMENT_COUNT;
  const {url, likes, comments, description} = userPhoto;

  function onCommentsLoaderButtonClick() {
    createCommentsBlock(comments.slice(currentCommentCount, currentCommentCount + DEFAULT_COMMENT_COUNT));
    currentCommentCount += DEFAULT_COMMENT_COUNT;
    commentCount.textContent = `${currentCommentCount} из ${comments.length} комментариев`;
    if (currentCommentCount > comments.length) {
      commentsLoader.classList.add('hidden');
      commentCount.textContent = `${comments.length} из ${comments.length} комментариев`;
    }
  }

  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent  = description;
  body.classList.add('modal-open');

  commentsBlock.innerHTML = '';
  if (comments.length > 0) {
    if (comments.length <= 5) {
      createCommentsBlock(comments);
      commentsLoader.classList.add('hidden');
      commentCount.textContent = `${comments.length} из ${comments.length} комментариев`;
    } else {
      createCommentsBlock(comments.slice(0, 5));
      commentCount.textContent = `5 из ${comments.length} комментариев`;
      commentsLoader.addEventListener('click', onCommentsLoaderButtonClick);
    }
  } else {
    commentCount.textContent = '';
  }
  // Функция выхода из полноэкранного режима фотогафии (при нажатии на клавишу ESC)
  function onEscapeClick(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      body.classList.remove('modal-open');
      commentCount.classList.remove('hidden');
      commentsLoader.classList.remove('hidden');
      bigPicture.classList.add('hidden');
      commentsLoader.removeEventListener('click', onCommentsLoaderButtonClick);
    }
  }

  document.addEventListener('keydown', onEscapeClick);
  // Функция выхода из полноэкранного режима фотогафии (при нажатии на кнопку Х)
  function onButtonCloseClick() {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    commentCount.classList.remove('hidden');
    currentCommentCount = 0;
    commentsLoader.removeEventListener('click', onCommentsLoaderButtonClick);
  }
  bigPictureCancel.addEventListener('click', onButtonCloseClick);
}


export {createBigPicture};

