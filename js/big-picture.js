import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const commentsBlock = document.querySelector('.social__comments');
const body = document.querySelector('body');
const commentTemplate = document.querySelector('#comments').content.querySelector('.social__comment');
const DEFAULT_COMMENT_COUNT = 5;
let currentCommentCount = DEFAULT_COMMENT_COUNT;

function createComment (comment) {
  const newComment = commentTemplate.cloneNode(true);
  newComment.querySelector('.social__picture').src = comment.avatar;
  newComment.querySelector('.social__picture').alt = comment.nameComment;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
}

function createCommentsBlock(comments) {
  comments.forEach((comment) => {
    commentsBlock.appendChild(createComment(comment));
  });
}

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

  function getComments(){
    if (comments.length === 0) {
      commentCount.textContent = '';
      return;
    }
    if (comments.length <= DEFAULT_COMMENT_COUNT) {
      createCommentsBlock(comments);
      commentsLoader.classList.add('hidden');
      commentCount.textContent = `${comments.length} из ${comments.length} комментариев`;
      return;
    }
    createCommentsBlock(comments.slice(0, 5));
    commentCount.textContent = `5 из ${comments.length} комментариев`;
    commentsLoader.addEventListener('click', onCommentsLoaderButtonClick);
  }

  getComments();

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
