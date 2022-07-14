import {pristine} from './valid-form.js';
import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {openImgUploadForm} from './upload-form.js';

const body = document.querySelector('body');
const imgUploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');
const successForm = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorForm = document.querySelector('#error')
  .content
  .querySelector('.error');

function closeSuccessForm() {
  body.removeChild(successForm);
  const successButton = successForm.querySelector('.success__button');
  successButton.removeEventListener('click', onSuccessButtonClick);
  document.removeEventListener('keydown', onEscapeClickSuccessForm);
  document.removeEventListener('click', onOutSuccessFormClick);
}

function onSuccessButtonClick() {
  closeSuccessForm();
}

function onErrorButtonClick() {
  closeErrorForm();
}

function closeErrorForm() {
  openImgUploadForm();
  body.removeChild(errorForm);
  const errorButton = successForm.querySelector('.error__button');
  if (errorButton) {
    errorButton.removeEventListener('click', onErrorButtonClick);
  }
  document.removeEventListener('keydown', onEscapeClickErrorForm);
  document.removeEventListener('click', onOutErrorFormClick);
}

function onEscapeClickSuccessForm(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessForm();
  }
}

function onOutSuccessFormClick(evt) {
  if (evt.target.className !== 'success__inner') {
    closeSuccessForm();
  }
}

function onEscapeClickErrorForm(evt){
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorForm();
  }
}

function onOutErrorFormClick(evt) {
  if (evt.target.className !== 'error__inner') {
    closeErrorForm();
  }
}

function showSuccessForm() {
  body.appendChild(successForm);
  const successButton = successForm.querySelector('.success__button');
  successButton.addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onEscapeClickSuccessForm);
  document.addEventListener('click', onOutSuccessFormClick);
}

function showErrorForm() {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  body.classList.remove('modal-open');
  body.appendChild(errorForm);
  const errorButton = successForm.querySelector('.error__button');
  if (errorButton){
    errorButton.addEventListener('click', onErrorButtonClick);
  }
  document.addEventListener('keydown', onEscapeClickErrorForm);
  document.addEventListener('click', onOutErrorFormClick);
}

function toggleModalStatus(status) {
  submitButton.disabled = status;
  if (status) {
    submitButton.textContent = 'Публикую...';
  } else {
    submitButton.textContent = 'Опубликовать';
  }
}

const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    function showSuccessMessageSendData() {
      onSuccess();
      toggleModalStatus(false);
      showSuccessForm();
    }

    function showErrorMessageSendData() {
      showErrorForm();
      toggleModalStatus(false);
    }

    if (isValid) {
      toggleModalStatus(true);
      sendData(
        showSuccessMessageSendData,
        showErrorMessageSendData,
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit};
