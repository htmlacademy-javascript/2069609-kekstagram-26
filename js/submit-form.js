import {pristine} from './valid-form.js';
import {isEscapeKey} from './util.js';
import './scale.js';
import './effects.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

function openImgUploadForm() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

function closeImgUploadForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  textHashtags.value = '';
  textDescription.value = '';
}

function onButtonCloseClick() {
  closeImgUploadForm();
}

function onEscapeClick(evt) {
  if (isEscapeKey(evt) && textHashtags !== document.activeElement) {
    if (textDescription !== document.activeElement) {
      evt.preventDefault();
      closeImgUploadForm();
    }
  }
}

//Открытие формы редактирования изображения
uploadFile.addEventListener('change', openImgUploadForm);

//Закрытие формы редактирования изображения при клике мышкой на Х
uploadCancel.addEventListener('click', onButtonCloseClick);

//Закрытие формы загрузки изо при нажатии клавишы Escape
document.addEventListener('keydown', onEscapeClick);

//Функция - что будет, если нажать на кнопку Отправить
function onSubmit(evt) {
  evt.preventDefault();
  if (pristine.validate()) {
    // eslint-disable-next-line no-console
    console.log ('Форма отправлена');
  } else {
    // eslint-disable-next-line no-console
    console.log ('Форма не отправлена');
  }
}

imgUploadForm.addEventListener('submit', onSubmit);
