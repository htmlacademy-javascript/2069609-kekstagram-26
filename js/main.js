import {renderPictures, onUserPhotoClick} from './picture.js';
import {setUserFormSubmit} from './submit-form.js';
import {closeImgUploadForm} from './upload-form.js';
import {getData} from './api.js';
import {showAlert} from './util.js';


setUserFormSubmit(closeImgUploadForm);

getData((photos) => {
  renderPictures(photos);
  onUserPhotoClick(photos);
},
() => {
  showAlert('Ошибка загрузки данных с сервера');
});
