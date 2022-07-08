import {isEscapeKey} from './util.js';
import {desctroySlider, renderSlider} from './slider.js';

const imgPreview = document.querySelector('.img-upload__preview');
//через стили это поле невидимое
const effectValueInput = document.querySelector('.effect-level__value');
//Контейнер, в котором сидят все фильтры
const effectsList = document.querySelector('.effects__list');
const uploadCancel = document.querySelector('#upload-cancel');

//Описываем фильтры
const SliderConfigs = {
  NONE: {
    filterId: 'effect-none',
    filterName: '',
    filterEffect: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    formatValue: ''
  },
  CHROME: {
    filterId: 'effect-chrome',
    filterName: 'chrome',
    filterEffect: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    formatValue: ''
  },
  SEPIA: {
    filterId: 'effect-sepia',
    filterName: 'sepia',
    filterEffect: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1,
    formatValue: ''
  },
  MARVIN: {
    filterId: 'effect-marvin',
    filterName: 'marvin',
    filterEffect: 'invert',
    min: 0,
    max: 100,
    step: 1,
    start: 100,
    formatValue: '%'
  },
  PHOBOS: {
    filterId: 'effect-phobos',
    filterName: 'phobos',
    filterEffect: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3,
    formatValue: 'px'
  },
  HEAT: {
    filterId: 'effect-heat',
    filterName: 'heat',
    filterEffect: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3,
    formatValue: ''
  }
};

effectValueInput.setAttribute('value', '1');

function onFilterClick(evt) {
  const currentNameFilter = evt.target.value.toUpperCase();
  const currentFilter = SliderConfigs[currentNameFilter];
  renderSlider(evt, currentNameFilter, SliderConfigs);
  imgPreview.className = `img-upload__preview effects__preview--${currentFilter.filterName}`;
}

function onOriginalFilterClick() {
  desctroySlider();
  imgPreview.className = 'img-upload__preview';
  imgPreview.style.filter = '';
  effectValueInput.setAttribute('value', '1');
}

// Действия, при нажатии на один из фильтров
function onChangeFilter(evt) {
  if (evt.target.id !== 'effect-none') {
    onFilterClick(evt);
  } else {
    onOriginalFilterClick();
  }
}

function onButtonCloseClick() {
  onOriginalFilterClick();
}

function onEscapeClick(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onOriginalFilterClick();
  }
}

// Обработчик событий на изменение фильтра
effectsList.addEventListener('change', onChangeFilter);

//Закрытие формы редактирования изображения при клике мышкой на Х
uploadCancel.addEventListener('click', onButtonCloseClick);

//Закрытие формы загрузки изо при нажатии клавишы Escape
document.addEventListener('keydown', onEscapeClick);
