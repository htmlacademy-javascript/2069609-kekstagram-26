import {haveSameHashTags, isEscapeKey} from './util.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('#upload-cancel');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

//Какие могут быть ошибки в оформлении хэштегов
const HashtagRules = {
  FirstSymbolIsHash: 'хэш-тег начинается с символа # (решётка)',
  NoSpecialSymbols: 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  NotOnlyHashtag: 'хеш-тег не может состоять только из одной решётки',
  MaxLength: 'максимальная длина одного хэш-тега 20 символов, включая решётку',
  MaxCount: 'нельзя указать больше пяти хэш-тегов',
  NoSameHashtags: 'один и тот же хэш-тег не может быть использован дважды',
  NoError: 'нет ошибок'
};

function openForm() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
}

function onButtonCloseClick() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFile.innerHTML = '';
  textHashtags.innerHTML = '';
  textDescription.innerHTML = '';
}

function onEscapeClick(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadFile.innerHTML = '';
    textHashtags.innerHTML = '';
    textDescription.innerHTML = '';
  }
}

//Открытие формы редактирования изображения
uploadFile.addEventListener('change', openForm);

//Закрытие формы редактирования изображения при клике мышкой на Х
uploadCancel.addEventListener('click', onButtonCloseClick);

//Закрытие формы при нажатии клавишы Escape
document.addEventListener('keydown', onEscapeClick);

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
  errorTextTag: 'div'
}, false);

let errorHashtags = HashtagRules.NoError;
const re =  /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;

// true - если все правила выполнены, false - если есть ошибка
function validateHashtags(value) {
  const hashtags = value.toLowerCase().split(' ');
  if (hashtags.length > 5) {
    errorHashtags = HashtagRules.MaxCount;
    return false;
  }
  if (haveSameHashTags(hashtags)) {
    errorHashtags = HashtagRules.NoSameHashtags;
    return false;
  }
  for (let i = 0; i < hashtags.length; i++) {
    if (!re.test(hashtags[i])) {
      if (hashtags[i][0] !== '#') {
        errorHashtags = HashtagRules.FirstSymbolIsHash;
        return false;
      }
      if (hashtags[i] === '#') {
        errorHashtags = HashtagRules.NotOnlyHashtag;
        return false;
      }
      if (hashtags[i].length > 20) {
        errorHashtags = HashtagRules.MaxLength;
        return false;
      }
      errorHashtags = HashtagRules.NoSpecialSymbols;
      return false;
    }
  }
  return true;
}
// Функция отрисовки текста ошибки
const getHashtagErrorMessage = () => errorHashtags;

pristine.addValidator(textHashtags, validateHashtags, getHashtagErrorMessage);

function validateDescription(value) {
  if (value.length <= 140) {
    return true;
  }
  return false;
}
const descriptionError = 'Длина комментария не может составлять больше 140 символов';
pristine.addValidator(textDescription, validateDescription, descriptionError);

imgUploadForm.addEventListener('submit', pristine.validate());
