import {haveSameElements} from './util.js';

const MAX_HASHTAG_LENGTH = 20;
const MAX_COUNT_HASHTAG = 5;
const MAX_DESCRIPTION_LENGTH = 140;

const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const HashtagRules = {
  FIRST_SYMBOL_IS_HASH: 'хэш-тег начинается с символа # (решётка)',
  NO_SPECIAL_SYMBOLS: 'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  NOT_ONLY_HASHTAG: 'хеш-тег не может состоять только из одной решётки',
  MAX_LENGTH: 'максимальная длина одного хэш-тега 20 символов, включая решётку',
  MAX_COUNT: 'нельзя указать больше пяти хэш-тегов',
  NO_SAME_HASHTAGS: 'один и тот же хэш-тег не может быть использован дважды',
  NO_ERROR: 'jjjj'
};

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__error',
  errorTextTag: 'div'
}, true);

let errorHashtags = HashtagRules.NO_ERROR;

function validateHashtag(hashtag) {
  const reHashtag =  /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
  if (!reHashtag.test(hashtag)) {
    if (hashtag[0] !== '#') {
      errorHashtags = HashtagRules.FIRST_SYMBOL_IS_HASH;
      return false;
    }
    if (hashtag === '#') {
      errorHashtags = HashtagRules.NOT_ONLY_HASHTAG;
      return false;
    }
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      errorHashtags = HashtagRules.MAX_LENGTH;
      return false;
    }
    errorHashtags = HashtagRules.NO_SPECIAL_SYMBOLS;
    return false;
  }
  return true;
}

function validateHashtags(value) {
  value = value.trim();
  if (value) {
    const hashtags = value.toLowerCase().split(' ');
    if (hashtags.length > MAX_COUNT_HASHTAG) {
      errorHashtags = HashtagRules.MAX_COUNT;
      return false;
    }
    if (haveSameElements(hashtags)) {
      errorHashtags = HashtagRules.NO_SAME_HASHTAGS;
      return false;
    }
    for (let i = 0; i < hashtags.length; i++) {
      if (!validateHashtag(hashtags[i])) {
        return false;
      }
    }
  }
  return true;
}
const getHashtagErrorMessage = () => errorHashtags;

pristine.addValidator(textHashtags, validateHashtags, getHashtagErrorMessage);

function validateDescription(value) {
  if (value.length <= MAX_DESCRIPTION_LENGTH) {
    return (value.length <= MAX_DESCRIPTION_LENGTH);
  }
}
const descriptionError = 'Длина комментария не может составлять больше 140 символов';
pristine.addValidator(textDescription, validateDescription, descriptionError);

export {pristine};
