import {renderPictures, setUserPhotoListener} from './picture.js';
import {setUserFormSubmit} from './submit-form.js';
import {closeImgUploadForm} from './upload-form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {setFilterListener} from './filters.js';
import './big-picture.js';

setUserFormSubmit(closeImgUploadForm);

function showGetDataError() {
  showAlert('Ошибка загрузки данных с сервера');
}

getData((photos) => {
  renderPictures(photos);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  setUserPhotoListener(photos);
  setFilterListener(photos);
},
showGetDataError
);
