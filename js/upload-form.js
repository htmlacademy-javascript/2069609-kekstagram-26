import {isEscapeKey} from './util.js';
import {onOriginalFilterClick, onChangeFilter} from './effects.js';
import {updateScale, VALUE_DEFAULT, getBigger, getSmaller} from './scale.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const buttonSmaller = document.querySelector('.scale__control--smaller');
const buttonBigger = document.querySelector('.scale__control--bigger');
const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview').querySelector('img');

//Контейнер, в котором сидят все фильтры
const effectsList = document.querySelector('.effects__list');

function getPreviewPhoto() {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
}

function openImgUploadForm() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  //Закрытие формы редактирования изображения при клике мышкой на Х
  uploadCancel.addEventListener('click', onButtonCloseClick);
  //Закрытие формы загрузки изо при нажатии клавишы Escape
  document.addEventListener('keydown', onEscapeClick);
  buttonSmaller.addEventListener('click', getSmaller);
  buttonBigger.addEventListener('click', getBigger);
  // Обработчик событий на изменение фильтра
  effectsList.addEventListener('change', onChangeFilter);
}

function closeImgUploadForm() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.value = '';
  preview.src = '';
  textHashtags.value = '';
  textDescription.value = '';
  onOriginalFilterClick();
  updateScale(VALUE_DEFAULT);

  uploadCancel.removeEventListener('click', onButtonCloseClick);
  document.removeEventListener('keydown', onEscapeClick);
  buttonSmaller.removeEventListener('click', getSmaller);
  buttonBigger.removeEventListener('click', getBigger);
  effectsList.removeEventListener('change', onChangeFilter);
}

function onButtonCloseClick() {
  closeImgUploadForm();
}

function onEscapeClick(evt) {
  if (!document.querySelector('.error')) {
    if (isEscapeKey(evt) && textHashtags !== document.activeElement) {
      if (textDescription !== document.activeElement) {
        evt.preventDefault();
        closeImgUploadForm();
      }
    }
  }
}

//Открытие формы редактирования изображения
uploadFile.addEventListener('change', openImgUploadForm);

fileChooser.addEventListener('change', getPreviewPhoto);
export{closeImgUploadForm, openImgUploadForm};
