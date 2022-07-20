import { debounce } from './util.js';
import {shuffle} from './util.js';
import {deletePictures, renderPictures} from './picture.js';
const MAX_RANDOM_PHOTOS = 10;
const TIME_OF_DELAY = 500;

const filterForm = document.querySelector('.img-filters__form');

function compareCountComments(a, b) {
  return b.comments.length - a.comments.length;
}

function renderFilterPictures(filterId, userPhotos){
  let currentUserPhotos = userPhotos.slice();
  deletePictures();
  if (filterId === 'filter-random') {
    currentUserPhotos = shuffle(currentUserPhotos).slice(0, MAX_RANDOM_PHOTOS);
  }
  if (filterId === 'filter-discussed') {
    currentUserPhotos = (currentUserPhotos).sort(compareCountComments);
  }
  renderPictures(currentUserPhotos);
}

function deleteActiveClass(){
  const filterButtons = document.querySelectorAll('.img-filters__button');
  filterButtons.forEach((filterButton) => {
    filterButton.classList.remove('img-filters__button--active');
  });
}

function setFilterListener(userPhotos) {
  function onFilterClick(event) {
    const filterButton = event.target.closest('.img-filters__button');
    if(filterButton) {
      const filterId = event.target.id;
      getActiveclass(event);
      if (event.target && filterButton !== null) {
        renderFilterPictures(filterId, userPhotos);
      }
    }
  }
  const debounceOnFilterClick = debounce(onFilterClick, TIME_OF_DELAY);
  filterForm.addEventListener('click', debounceOnFilterClick);
}

function getActiveclass(event) {
  deleteActiveClass();
  if (event.target.className === 'img-filters__button') {
    event.target.classList.add('img-filters__button--active');
  }
}

filterForm.addEventListener('click', getActiveclass);
export{setFilterListener};
